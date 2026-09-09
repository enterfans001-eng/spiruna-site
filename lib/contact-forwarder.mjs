import { createCipheriv, createDecipheriv, randomBytes, randomUUID, timingSafeEqual } from 'node:crypto';

const PREFIX = 'spiruna:contact:v1';
const FIELDS = {
  name: 'お名前', kana: 'フリガナ', company: '会社名', department: '部署',
  email: 'メールアドレス', phone: '電話番号', zip: '郵便番号', prefecture: '都道府県',
  city: '市区町村', addressDetail: '番地・建物名', url: 'URL', snsUrl: 'SNSのURL',
  inquiryType: '項目', message: 'お問い合わせ内容',
};

export function makeSubmission(body, id = randomUUID(), now = new Date()) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) throw new Error('invalid_body');
  if (!['corporate', 'individual'].includes(body._formType)) throw new Error('invalid_form_type');
  const answers = {};
  for (const [key, label] of Object.entries(FIELDS)) {
    const value = body[label] ?? '';
    if (typeof value !== 'string' || value.length > (key === 'message' ? 20000 : 2000)) throw new Error('invalid_field');
    answers[key] = value.trim();
  }
  answers.customerType = body._formType === 'individual' ? '個人' : '法人';
  const required = ['name', 'kana', 'email', 'inquiryType', 'message'];
  if (body._formType === 'corporate') required.push('company', 'phone');
  if (required.some(key => !answers[key])) throw new Error('missing_field');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(answers.email)) throw new Error('invalid_email');
  const topics = body._formType === 'corporate' ? ['プロモーション依頼', '取材', 'その他'] : ['所属したい', '相談したい', 'その他'];
  if (!topics.includes(answers.inquiryType)) throw new Error('invalid_topic');
  return { siteId: 'spiruna', submissionId: id, submittedAt: now.toISOString(), answers };
}

export function seal(value, keyHex) {
  if (!/^[a-f\d]{64}$/i.test(keyHex || '')) throw new Error('queue_key_missing');
  const iv = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', Buffer.from(keyHex, 'hex'), iv);
  const encrypted = Buffer.concat([cipher.update(JSON.stringify(value), 'utf8'), cipher.final()]);
  return Buffer.concat([iv, cipher.getAuthTag(), encrypted]).toString('base64');
}

export function unseal(value, keyHex) {
  if (!/^[a-f\d]{64}$/i.test(keyHex || '')) throw new Error('queue_key_missing');
  const data = Buffer.from(value, 'base64');
  const decipher = createDecipheriv('aes-256-gcm', Buffer.from(keyHex, 'hex'), data.subarray(0, 12));
  decipher.setAuthTag(data.subarray(12, 28));
  return JSON.parse(Buffer.concat([decipher.update(data.subarray(28)), decipher.final()]).toString('utf8'));
}

export function cronAuthorized(header, secret) {
  if (!secret || secret.length < 32 || !header) return false;
  const expected = Buffer.from(`Bearer ${secret}`), actual = Buffer.from(header);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

export function createForwarder(env = process.env, fetcher = fetch, log = console.error) {
  const enabled = env.CONTACT_FORWARDING_ENABLED === 'true';
  // Never log contact data, response bodies, URLs, or credentials.
  const report = (event, id) => log('Contact forwarding:', event, id);
  async function redis(command) {
    const url = new URL(env.UPSTASH_REDIS_REST_URL || 'https://invalid.local');
    if (url.protocol !== 'https:' || !url.hostname.endsWith('.upstash.io') || url.username || url.password || !env.UPSTASH_REDIS_REST_TOKEN) throw new Error('queue_configuration');
    const response = await fetcher(url.origin, {
      method: 'POST', headers: { Authorization: `Bearer ${env.UPSTASH_REDIS_REST_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(command), signal: AbortSignal.timeout(5000), redirect: 'error', cache: 'no-store',
    });
    if (!response.ok) throw new Error('queue_transport');
    const result = await response.json();
    if (result.error) throw new Error('queue_command');
    return result.result;
  }
  const encode = item => seal(item, env.CONTACT_QUEUE_ENCRYPTION_KEY);
  const decode = item => unseal(item, env.CONTACT_QUEUE_ENCRYPTION_KEY);
  async function save(item, ready) {
    return redis(['EVAL', ready
      ? "redis.call('HSET',KEYS[1],ARGV[1],ARGV[2]);redis.call('ZADD',KEYS[2],ARGV[3],ARGV[1]);return 1"
      : "redis.call('HSET',KEYS[1],ARGV[1],ARGV[2]);return 1",
    '2', `${PREFIX}:records`, `${PREFIX}:due`, item.payload.submissionId, encode(item), String(Date.now())]);
  }
  async function remove(id) {
    return redis(['EVAL', "redis.call('HDEL',KEYS[1],ARGV[1]);redis.call('ZREM',KEYS[2],ARGV[1]);return 1", '2', `${PREFIX}:records`, `${PREFIX}:due`, id]);
  }
  async function deliver(payload) {
    const endpoint = new URL(env.CONTACT_GAS_URL || 'https://invalid.local');
    if (endpoint.origin !== 'https://script.google.com' || !/^\/macros\/s\/[\w-]+\/exec$/.test(endpoint.pathname) || endpoint.search || endpoint.hash || !env.CONTACT_GAS_API_KEY) throw new Error('gas_configuration');
    const body = JSON.stringify({ ...payload, apiKey: env.CONTACT_GAS_API_KEY });
    if (body.length > 60000) throw new Error('gas_body_limit');
    let response = await fetcher(endpoint.href, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body,
      signal: AbortSignal.timeout(25000), redirect: 'manual', cache: 'no-store',
    });
    if ([302, 303].includes(response.status)) {
      const next = new URL(response.headers.get('location') || '', endpoint);
      if (next.origin !== 'https://script.googleusercontent.com' || next.username || next.password) throw new Error('gas_redirect');
      response = await fetcher(next.href, { method: 'GET', redirect: 'error', signal: AbortSignal.timeout(10000), cache: 'no-store' });
    }
    if (!response.ok) throw new Error('gas_transport');
    const result = await response.json();
    if (result.ok !== true || result.submissionId !== payload.submissionId) throw new Error('gas_rejected');
    return true;
  }
  return {
    enabled,
    async stage(payload) {
      if (!enabled) return false;
      try { await save({ payload, state: 'awaiting_mail' }, false); return true; }
      catch { report('queue_stage_failed', payload.submissionId); return false; }
    },
    async stageReview(body) {
      if (!enabled) return;
      const id = randomUUID();
      try {
        if (JSON.stringify(body).length > 250000) throw new Error('review_body_limit');
        await save({ payload: { submissionId: id }, rawBody: body, state: 'input_manual_review' }, false);
        report('input_saved_for_manual_review', id);
      } catch { report('input_review_save_failed', id); }
    },
    async mailFailed(payload) {
      // Keep the encrypted record for manual reconciliation; never resend emails automatically.
      if (enabled) report('mail_unconfirmed_manual_review', payload.submissionId);
    },
    async mailSent(payload, mailId) {
      if (!enabled) return;
      const item = { payload, state: 'mail_sent', mailId };
      try { await save(item, true); }
      catch { report('queue_ready_failed_manual_review', payload.submissionId); }
    },
    async forward(payload) {
      if (!enabled) return;
      try {
        await deliver(payload);
        try { await remove(payload.submissionId); }
        catch { report('queue_cleanup_failed', payload.submissionId); }
      } catch { report('gas_pending', payload.submissionId); }
    },
    async retry() {
      if (!enabled) return { enabled: false };
      // Claim a bounded batch for 2 minutes; parallel requests fit the function duration.
      // GAS's lock and ID deduplication also cover overlapping/manual invocations.
      const ids = await redis(['EVAL', "local ids=redis.call('ZRANGEBYSCORE',KEYS[1],'-inf',ARGV[1],'LIMIT',0,3);for _,id in ipairs(ids) do redis.call('ZADD',KEYS[1],ARGV[2],id);end;return ids", '1', `${PREFIX}:due`, String(Date.now()), String(Date.now() + 120000)]);
      let sent = 0;
      await Promise.all(ids.map(async id => {
        try {
          const raw = await redis(['HGET', `${PREFIX}:records`, id]);
          if (!raw) { await redis(['ZREM', `${PREFIX}:due`, id]); return; }
          const item = decode(raw);
          if (item.state !== 'mail_sent' || item.payload.submissionId !== id) throw new Error('queue_state');
          await deliver(item.payload);
          await remove(id);
          sent++;
        } catch { report('retry_pending_manual_review_if_persistent', id); }
      }));
      const remaining = await redis(['HLEN', `${PREFIX}:records`]);
      if (remaining) report('records_remaining', remaining);
      return { enabled: true, sent, remaining };
    },
  };
}
