import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import vm from 'node:vm';
import ts from 'typescript';
import { makeSubmission, seal, unseal, createForwarder, cronAuthorized } from '../lib/contact-forwarder.mjs';

const body = { _formType: 'individual', お名前: '動作確認テスト', フリガナ: 'テスト', メールアドレス: 'test@example.com', 項目: 'その他', お問い合わせ内容: '本文\n=1+1' };
const payload = makeSubmission(body, 'test-spiruna-0001', new Date('2026-09-09T00:00:00Z'));
const env = { CONTACT_FORWARDING_ENABLED: 'true', UPSTASH_REDIS_REST_URL: 'https://test.upstash.io', UPSTASH_REDIS_REST_TOKEN: 'test-only', CONTACT_QUEUE_ENCRYPTION_KEY: 'ab'.repeat(32), CONTACT_GAS_URL: 'https://script.google.com/macros/s/test/exec', CONTACT_GAS_API_KEY: 'test-only' };

function harness() {
  const records = new Map(), due = new Map(), logs = [], calls = [];
  const state = { gasFail: false, redisFail: false, redirect: 'https://script.googleusercontent.com/macros/echo?test=1' };
  async function fetcher(url, options) {
    calls.push({ url: String(url), ...options });
    if (String(url).includes('upstash.io')) {
      if (state.redisFail) throw Error('secret upstream error');
      const c = JSON.parse(options.body);
      let result;
      if (c[0] === 'EVAL') {
        if (c[1].includes('ZRANGEBYSCORE')) {
          result = [...due.keys()].filter(id => due.get(id) <= Number(c[4])).slice(0, 3);
          result.forEach(id => due.set(id, Number(c[5])));
        } else if (c[1].includes('HSET')) {
          records.set(c[5], c[6]);
          if (c[1].includes('ZADD')) due.set(c[5], Number(c[7]));
          result = 1;
        } else { records.delete(c[5]); due.delete(c[5]); result = 1; }
      } else if (c[0] === 'HGET') result = records.get(c[2]) || null;
      else if (c[0] === 'ZREM') { due.delete(c[2]); result = 1; }
      else if (c[0] === 'HLEN') result = records.size;
      else throw Error('unexpected command');
      return Response.json({ result });
    }
    if (String(url).includes('script.google.com')) return new Response(null, { status: 302, headers: { location: state.redirect } });
    return Response.json(state.gasFail ? { ok: false, error: 'busy', retryable: true } : { ok: true, duplicate: true, submissionId: payload.submissionId });
  }
  const create = () => createForwarder(env, fetcher, (...args) => logs.push(args));
  return { records, due, logs, calls, state, create };
}

test('individual phone optional; corporate requires company/phone; separate address components', () => {
  assert.equal(payload.answers.phone, '');
  assert.throws(() => makeSubmission({ ...body, _formType: 'corporate' }));
  const corporate = makeSubmission({ ...body, _formType: 'corporate', 会社名: '会社', 電話番号: '09000000000', 都道府県: '東京都', 市区町村: '港区', '番地・建物名': '1-2' });
  assert.equal(corporate.answers.prefecture, '東京都');
  assert.equal(corporate.answers.addressDetail, '1-2');
  assert.throws(() => makeSubmission({ ...body, 項目: '取材' }));
  assert.throws(() => makeSubmission({ ...body, お問い合わせ内容: 'a'.repeat(20001) }));
});

test('encrypted payload cannot be read or modified without the key', () => {
  const ciphertext = seal(payload, env.CONTACT_QUEUE_ENCRYPTION_KEY);
  assert.ok(!Buffer.from(ciphertext, 'base64').toString().includes('test@example.com'));
  assert.deepEqual(unseal(ciphertext, env.CONTACT_QUEUE_ENCRYPTION_KEY), payload);
  assert.throws(() => unseal(ciphertext, 'cd'.repeat(32)));
  const changed = Buffer.from(ciphertext, 'base64'); changed[30] ^= 1;
  assert.throws(() => unseal(changed.toString('base64'), env.CONTACT_QUEUE_ENCRYPTION_KEY));
});

test('GAS failure retains encrypted record; fresh worker retries same ID and deletes on duplicate success', async () => {
  const h = harness(), f = h.create();
  await f.stage(payload);
  assert.equal(h.due.size, 0);
  await f.mailSent(payload, 'mail-1');
  h.state.gasFail = true;
  await f.forward(payload);
  assert.equal(h.records.size, 1);
  h.state.gasFail = false;
  assert.deepEqual(await h.create().retry(), { enabled: true, sent: 1, remaining: 0 });
  assert.equal(h.records.size, 0);
  const posts = h.calls.filter(c => c.method === 'POST' && c.url.includes('script.google.com'));
  assert.equal(posts.length, 2);
  assert.equal(posts[0].body, posts[1].body);
  for (const call of h.calls.filter(c => c.url.includes('googleusercontent'))) {
    assert.equal(call.method, 'GET'); assert.equal(call.body, undefined); assert.equal(call.headers, undefined);
  }
});

test('unconfirmed email remains for review and is never automatically mailed or forwarded', async () => {
  const h = harness(), f = h.create(); await f.stage(payload); await f.mailFailed(payload);
  assert.deepEqual(await h.create().retry(), { enabled: true, sent: 0, remaining: 1 });
  assert.ok(h.calls.every(c => c.url.includes('upstash')));
});

test('oversized input is durably encrypted for manual review without automatic retry', async () => {
  const h = harness(), f = h.create();
  const raw = { ...body, お問い合わせ内容: '長'.repeat(20001) };
  await f.stageReview(raw);
  assert.equal(h.records.size, 1);
  const saved = unseal([...h.records.values()][0], env.CONTACT_QUEUE_ENCRYPTION_KEY);
  assert.deepEqual(saved.rawBody, raw);
  assert.equal(saved.state, 'input_manual_review');
  assert.equal(h.due.size, 0);
  assert.deepEqual(await h.create().retry(), { enabled: true, sent: 0, remaining: 1 });
  assert.ok(!JSON.stringify(h.logs).includes('test@example.com'));
});

test('Redis outage does not throw into email path and direct GAS forwarding still runs', async () => {
  const h = harness(), f = h.create(); h.state.redisFail = true;
  assert.equal(await f.stage(payload), false);
  await f.mailSent(payload, 'mail-1'); await f.forward(payload);
  assert.ok(h.calls.some(c => c.url.includes('googleusercontent')));
  assert.ok(!JSON.stringify(h.logs).includes('test@example.com'));
});

test('untrusted redirect is rejected without leaking the payload', async () => {
  const h = harness(); h.state.redirect = 'https://attacker.example/';
  await h.create().forward(payload);
  assert.ok(h.calls.every(c => !c.url.includes('attacker')));
});

test('disabled flag makes zero network calls; cron requires a strong configured secret', async () => {
  const f = createForwarder({}, () => { throw Error('network must not run'); });
  await f.stage(payload); await f.mailSent(payload, 'id'); await f.forward(payload);
  assert.deepEqual(await f.retry(), { enabled: false });
  assert.equal(cronAuthorized(null, undefined), false);
  assert.equal(cronAuthorized('Bearer short', 'short'), false);
  assert.equal(cronAuthorized('Bearer ' + 'x'.repeat(32), 'x'.repeat(32)), true);
  assert.equal(cronAuthorized('Bearer ' + 'y'.repeat(32), 'x'.repeat(32)), false);
});

test('Vercel Marketplace KV variable names work without copying integration secrets', async () => {
  const marketplace = { ...env, UPSTASH_REDIS_REST_URL: undefined, UPSTASH_REDIS_REST_TOKEN: undefined,
    KV_REST_API_URL: env.UPSTASH_REDIS_REST_URL, KV_REST_API_TOKEN: env.UPSTASH_REDIS_REST_TOKEN };
  const f = createForwarder(marketplace, async (url, options) => {
    assert.equal(String(url), 'https://test.upstash.io');
    assert.equal(options.headers.Authorization, 'Bearer test-only');
    return Response.json({ result: 1 });
  });
  assert.equal(await f.stage(payload), true);
});

async function runRoute(source, sendResult, enabled = true) {
  const mail = [], events = [], jobs = [];
  class Resend { emails = { send: async value => { mail.push(value); events.push('send'); return sendResult; } }; }
  const compiledModule = { exports: {} };
  vm.runInNewContext(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText, {
    exports: compiledModule.exports, module: compiledModule,
    require: name => name === 'resend' ? { Resend } : name === 'next/server'
      ? { NextResponse: { json: (data, init) => ({ data, status: init?.status || 200 }) }, after: fn => jobs.push(fn) }
      : { makeSubmission, createForwarder: () => ({ enabled, stage: async () => events.push('stage'), mailSent: async () => events.push('ready'), mailFailed: async () => events.push('failed'), forward: async () => events.push('gas') }) },
    process: { env: { RESEND_FROM_EMAIL: 'sender@example.com', CONTACT_TO_EMAIL: 'info@spiruna.jp' } }, console: { error() {} },
  });
  const response = await compiledModule.exports.POST({ json: async () => body });
  for (const job of jobs) await job();
  return { mail: JSON.parse(JSON.stringify(mail)), response, events };
}

test('route preserves original sender, recipient, subject and complete mail text', async () => {
  const original = execFileSync('git', ['show', 'ae6834f3a0a10a8fa696303866d8703d146f0555:app/api/contact/route.ts'], { encoding: 'utf8' });
  const updated = readFileSync(new URL('../app/api/contact/route.ts', import.meta.url), 'utf8');
  const baseline = await runRoute(original, { data: { id: 'mail-1' }, error: null });
  const actual = await runRoute(updated, { data: { id: 'mail-1' }, error: null });
  assert.deepEqual(actual.mail, baseline.mail);
  assert.deepEqual(actual.events, ['stage', 'send', 'ready', 'gas']);
  assert.equal(actual.response.status, 200);
});

test('Resend explicit error is not treated as success or forwarded', async () => {
  const source = readFileSync(new URL('../app/api/contact/route.ts', import.meta.url), 'utf8');
  const actual = await runRoute(source, { data: null, error: { message: 'private details' } });
  assert.equal(actual.response.status, 500);
  assert.deepEqual(actual.events, ['stage', 'send', 'failed']);
  assert.ok(!JSON.stringify(actual.response).includes('private details'));
});
