# Spiruna問い合わせ連携（反映承認前）

## 状態と変更範囲

2026-09-09。ブランチ `feat/contact-gas-forwarding`。本番基準コミット `ae6834f3a0a10a8fa696303866d8703d146f0555`。
本番へのpush、Vercelの環境変数変更、Upstash追加、実フォーム送信は未実施。

- 変更: `app/api/contact/route.ts`、追加: `lib/contact-forwarder.mjs`、`app/api/contact/retry/route.ts`、`vercel.json`。
- microCMS、フォーム画面、メールの宛先・送信元・件名・本文は変更なし。自動返信は追加しない。
- Resendがエラーを返した場合に成功表示となる既存処理を修正。個人情報を含む上流エラーは画面・ログへ出さない。
- `CONTACT_FORWARDING_ENABLED=true` のときのみ転送処理を実行する。

## 保存先と最新GASへの追従

スプシ `1dHN5UY-wpIOkTiHVKp4qAl_6RxXC-cc62_lMWkF-CGM`。
作成済み: `Vクリエイター事務所Spiruna` / シートID **470321115**。
A・B列は自由欄、C:Xが22項目。実回答はまだない。

共通GAS v1.6.0の「固定シートID＋見出し名」の方式を維持。
シート名・列順を変更しても対応する。管理対象の見出し名の変更・削除・重複は不可。
途中に独自列を追加しても値・数式を上書きしない。同一ID再送は重複判定し、途中失敗は同じ行で再開。
法人・個人で異なる項目、郵便番号・住所の各欄、URL・SNSを分けて保存する。
個人の電話番号は任意。同意チェック欄は存在しないため同意済みと記録しない。

GASの追加ファイルは隣接 `gas_hp_inquiry/Spiruna.js`。Receiverの2か所に振り分けを追加。
既存5サイトの処理は保持。GASの本番デプロイは未更新。

## メールと再送

1. 回答をAES-256-GCMで暗号化し、Upstash Redisへメール送信前の状態で保存。
2. 従来と同じメールをResendで送る。
3. メール送信成功後、保存状態を更新してGASへ転送。画面応答後の処理にNext.js `after`を使用。
4. GASの `ok:true` と受付IDを確認して保存データを削除する。通信結果が不明な場合は同じID・日時・回答で再送。
5. Vercel Hobby対応の毎日UTC 00時（日本時間09時台）に最大3件を並列再送。認証付き手動実行も可能。再送はメールを送らない。

Redisのrecords/due更新はLuaで同時実行。GASへの302/303は指定のGoogleホストのみGETで追従し、本文・キーを再送しない。
認証キー・暗号鍵・Redis資格情報はサーバー環境変数に置く。公開JS・ソース・ログへ含めない。

### 実運用上の限界

- メール送信自体を止めないためRedis障害時もメールを続行しGAS直接転送を試みる。RedisとGASが両方利用不能だと転送データを保持できない。既存メールを元に手動復旧が必要。
- メール送信前後にプロセスが終了し成功を確定できない場合、暗号化データを要確認として残す。メールの自動再送はしない。
- 本文20,000文字等、GAS受信上限を超える回答は暗号化して要確認保存（原文JSON250,000文字まで）。メールは従来どおり送信する。
- 完了データは削除。未完了・要確認データは期限削除しないので、ログの `records_remaining` / `manual_review` を見て対応する。暗号鍵を変更・削除すると既存キューを復号できなくなる。
- 定期再送は日次・最大3件。障害後に件数が多い場合は認証付き手動実行で解消する。常時監視や通知サービスは今回追加していない。

## 本番反映時の確認内容

承認後に次の順で実施する。

1. Vercelの対象プロジェクトにUpstash Redis **Free** を追加。料金が発生するプランは選ばない。
2. 次の変数を**Productionのみ**に登録（Previewへ本番の保存先・鍵を設定しない）。
   `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, `CONTACT_QUEUE_ENCRYPTION_KEY`（32byte hex）、`CONTACT_GAS_URL`, `CONTACT_GAS_API_KEY`, `CRON_SECRET`（32文字以上）、`CONTACT_FORWARDING_ENABLED=true`。
3. GASの現行リモートがバックアップと一致することを再確認して `gas_hp_inquiry` からpush・既存URLのデプロイ更新。`setupSpirunaSheetLayout`で幅・ハッシュ非表示を設定。
4. サイトのブランチ差分をGitHubへ反映しmainへマージ、VercelのProduction Readyと新コミットを確認。
5. 実フォームからのテストは別途許可を取得する。通知先は `info@spiruna.jp`、自動返信なし。
6. テスト後、メール受信・スプシの単一行・キュー削除を確認する。

GASの専用キーはワークスペース `.codex/hp-inquiry/spiruna-token.dpapi` に暗号化保管。Configにはハッシュのみ。
GAS反映前バックアップは `gas_hp_inquiry/backups/before-spiruna-20260909/`。

## 検証コマンド

検証済み: サイト側10件、GAS側24件PASS。変更ファイルのESLint・TypeScriptチェックPASS。
`npx next build --webpack`で19ページを含むビルドPASS（ローカルにはCMS資格情報を入れず、既存の空データfallbackを使用）。
通常のTurbopackビルドは日本語ワークスペース名のUTF-8境界で内部エラーとなったため、ローカル検証のみwebpackを使用。本番のビルドコマンドは変更していない。
リポジトリ全体のlintには今回触っていない既存画面の6件のエラーが残る。追加ファイルのlintエラーは修正済み。
本番のRedis・GAS実通信、メール到着は未検証であり、反映後の確認が必要。

```powershell
node --test tests/contact-forwarder.test.mjs
npx tsc --noEmit
npx eslint app/api/contact lib/contact-forwarder.mjs tests/contact-forwarder.test.mjs
# ワークスペース側
node gas_hp_inquiry/tests/receiver.vm.test.js
```

Upstashの無料枠・永続化: https://upstash.com/pricing/redis / https://upstash.com/docs/redis/features/durability
Vercelの日次制約: https://vercel.com/docs/cron-jobs/manage-cron-jobs
