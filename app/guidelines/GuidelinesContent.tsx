"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function GuidelinesContent() {
  const sectionStyle: React.CSSProperties = { marginBottom: "2.5rem" };
  const headingStyle: React.CSSProperties = {
    fontSize: "0.85rem", fontWeight: 700, color: "var(--red)",
    marginBottom: "0.75rem", letterSpacing: "0.05em",
  };
  const textStyle: React.CSSProperties = {
    fontSize: "0.8rem", lineHeight: 2, color: "rgba(255,255,255,0.65)",
  };
  const listStyle: React.CSSProperties = {
    ...textStyle, paddingLeft: "1.25rem", listStyleType: "disc",
  };
  const subHeadingStyle: React.CSSProperties = {
    fontFamily: "var(--font-serif)",
    fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
    fontWeight: 700, marginBottom: "2rem",
  };
  const dividerStyle: React.CSSProperties = {
    height: 1,
    background: "linear-gradient(to right, var(--red), transparent 60%)",
    marginTop: "3rem", marginBottom: "3rem",
  };

  return (
    <>
      <Header />
      <main style={{ background: "var(--bg)", minHeight: "100vh", paddingTop: "8rem", paddingBottom: "5rem" }}>
        <div style={{ maxWidth: "48rem", margin: "0 auto", padding: "0 1.5rem" }}>
          {/* Back link */}
          <a
            href="/"
            style={{
              display: "inline-block", fontSize: "0.75rem", color: "var(--text-muted)",
              textDecoration: "none", marginBottom: "2rem", transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
          >
            ← トップページに戻る
          </a>

          {/* Page title */}
          <p style={{ fontSize: "0.65rem", letterSpacing: "0.3em", color: "var(--red)", marginBottom: "0.75rem" }}>
            FAN CREATION GUIDELINES
          </p>
          <h1 style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 700, marginBottom: "3rem",
          }}>
            二次創作ガイドライン
          </h1>

          {/* ============================== */}
          {/* 全般ガイドライン */}
          {/* ============================== */}
          <h2 style={subHeadingStyle}>全般ガイドライン</h2>

          <div style={sectionStyle}>
            <h3 style={headingStyle}>はじめに</h3>
            <p style={textStyle}>
              Vクリエイター事務所スピルナ（以下「当事務所」とします）は、当事務所の提供するコンテンツを、より多くのファンの皆様が、より多様な形で、安心して楽しめることを願い、本ガイドライン（以下「全般ガイドライン」とします）を制定いたします。
            </p>
            <p style={{ ...textStyle, marginTop: "0.75rem" }}>
              全般ガイドラインを遵守しているものであれば、当事務所コンテンツの二次創作に際し、当事務所に対する個別のお問い合わせは不要です。
            </p>
            <p style={{ ...textStyle, marginTop: "0.75rem" }}>
              なお、当事務所の音楽コンテンツ又は切り抜き動画に関しては、後述の各追加ガイドラインを併せてご参照ください。現時点で追加ガイドラインが存在しない二次創作については、全般ガイドラインをご参照ください。
            </p>
          </div>

          <div style={sectionStyle}>
            <h3 style={headingStyle}>2次創作の範囲</h3>
            <p style={textStyle}>
              2次創作とは、当事務所のコンテンツに依拠しつつも、皆様の創意工夫・アイデアによって生み出される創作活動であると、当事務所は考えます。
            </p>
            <p style={{ ...textStyle, marginTop: "0.75rem" }}>
              2次創作に該当し、全般ガイドラインを遵守しているものであれば、皆様の創作活動について、当事務所より権利行使をすることはございません。皆様の2次創作については、所属ライバーが配信でサムネイルとしての利用や、SNS活動において取り上げたりすることがございますので、予めご了承ください。
            </p>
            <p style={{ ...textStyle, marginTop: "0.75rem", fontSize: "0.75rem" }}>
              ※当事務所コンテンツをそのまま利用するもの、単なる改変の域を出ないもの等の創作性に欠けるものは、2次創作とはいえず、全般ガイドラインの適用はございません。
            </p>
          </div>

          <div style={sectionStyle}>
            <h3 style={headingStyle}>お願い</h3>
            <p style={{ ...textStyle, marginBottom: "0.75rem" }}>
              2次創作にあたっては、下記の事項を遵守していただくようお願いいたします。
            </p>
            <ul style={listStyle}>
              <li>所属Vライバーの心情にご配慮いただき、Vライバーが不快と感じる創作活動はお控えください</li>
              <li>いわゆる同人活動や趣味の範囲でお願いいたします。営利目的と認められるもの、法人による利用（個人名義であっても法人が制作費等を負担する場合を含めます）はお断りしております。</li>
              <li>適用される法令、規則や利用プラットフォームの規約その他規定を遵守してください</li>
              <li style={{ marginTop: "0.5rem" }}>次のような表現を伴う創作活動はお控えください
                <ul style={{ ...listStyle, marginTop: "0.25rem" }}>
                  <li>公式と詐称、または公式と誤解・誤認されうるもの</li>
                  <li>公序良俗に反するもの、反社会的なもの</li>
                  <li>特定の思想・信条や宗教的、政治的な内容を含むもの</li>
                  <li>所属Vライバー、当事務所または当事務所コンテンツのイメージを著しく損なうもの</li>
                  <li>第3者の名誉・品位等を傷つけるもの、第3者の権利を侵害するもの</li>
                  <li>その他当社が不適切と判断するもの</li>
                </ul>
              </li>
            </ul>
          </div>

          <div style={sectionStyle}>
            <h3 style={headingStyle}>その他</h3>
            <p style={textStyle}>
              当事務所は、全般ガイドラインによって、当事務所コンテンツの著作権及び著作隣接権を放棄したものではなく、これらの権利を留保しております。当事務所は、当事務所コンテンツ及びその2次的利用について、第3者の権利を侵害しないことを含め、何ら保証するものではありません。当事務所コンテンツの利用及び2次的著作物の制作、投稿等により第3者との間でいかなる紛争が生じたとしても、当事務所は一切の責任を負いません。全般ガイドラインは、予告なしに修正することがございます。常に最新のものをご確認願います。
            </p>
          </div>

          <div style={dividerStyle} />

          {/* ============================== */}
          {/* 切り抜き動画 */}
          {/* ============================== */}
          <h2 style={subHeadingStyle}>切り抜き動画に関するガイドライン</h2>

          <div style={sectionStyle}>
            <h3 style={headingStyle}>はじめに</h3>
            <p style={textStyle}>
              当事務所は、当事務所Vライバーや当事務所の映像コンテンツを用いて作成される、いわゆる「切り抜き動画」について、遵守いただきたい事項を明らかにすることを通じて、当事務所Vライバーや当事務所コンテンツが、より多様な形で広がることを期待し、本ガイドライン（以下「切り抜きガイドライン」とします）を制定いたします。
            </p>
            <p style={{ ...textStyle, marginTop: "0.75rem" }}>
              切り抜き動画は、切り抜きガイドラインに加えて、全般ガイドラインの適用を受けますので、そちらも併せてご確認ください。
            </p>
            <p style={{ ...textStyle, marginTop: "0.75rem" }}>
              切り抜き動画内に、当事務所が著作権その他権利を保有しないコンテンツが含まれる場合は、当該コンテンツ権利者の利用規約等の定めを遵守してください。なお、当事務所から第3者の利用規約等の解釈について個別に回答することはございませんので、予めご了承ください。
            </p>
            <p style={{ ...textStyle, marginTop: "0.75rem" }}>
              メンバーシップ限定動画やチケット制ライブ動画その他の有料コンテンツについては、当該有料コンテンツにおいて特別に許可がなされていない限り、切り抜きガイドライン及び全般ガイドラインいずれの適用もないため、禁止とさせていただきます。
            </p>
          </div>

          <div style={sectionStyle}>
            <h3 style={headingStyle}>お願い</h3>
            <p style={{ ...textStyle, marginBottom: "0.75rem" }}>
              切り抜き動画の制作・投稿にあたっては、全般ガイドラインの「お願い」に加えて、下記の事項についても併せて遵守いただくようお願いいたします。
            </p>
            <ul style={listStyle}>
              <li>切り抜き動画概要欄の冒頭に、下記の情報を明記してください。
                <ul style={{ ...listStyle, marginTop: "0.25rem" }}>
                  <li>切り抜き動画の元となった動画（以下「元動画」とします）のURL</li>
                  <li>元動画のタイトル</li>
                </ul>
              </li>
              <li>元動画の配信が終了しアーカイブが公開されるより前の切り抜き動画投稿はご遠慮ください。</li>
              <li>切り抜き動画の内容、サムネイルその他事情により、削除手続きを行うことがございますので、予めご了承ください。</li>
            </ul>
          </div>

          <div style={sectionStyle}>
            <h3 style={headingStyle}>収益化について</h3>
            <p style={textStyle}>
              切り抜き動画は、上記「お願い」を遵守いただけることに加えて、投稿プラットフォームの利用規約、元動画に含まれる第3者コンテンツ権利者の利用規約等その他関係する規約に抵触しないことを前提に、YouTube、ニコニコ動画、Bilibili、その他の動画共有サイトが提供するパートナープログラムやクリエイタープログラム等を活用した広告収益を含むいわゆる収益化機能をご利用頂いて差し支えありません。
            </p>
            <p style={{ ...textStyle, marginTop: "0.75rem", fontSize: "0.75rem" }}>
              ※制作・投稿した切り抜き動画について、コンテンツID等の登録を含む自己の著作物としての自動識別機能の登録は禁止させていただきます。
            </p>
          </div>

          <div style={sectionStyle}>
            <h3 style={headingStyle}>その他</h3>
            <p style={textStyle}>全般ガイドライン記載の「その他」を準用いたします。</p>
          </div>

          <div style={dividerStyle} />

          {/* ============================== */}
          {/* 応援広告 */}
          {/* ============================== */}
          <h2 style={subHeadingStyle}>応援広告に関するガイドライン</h2>

          <div style={sectionStyle}>
            <h3 style={headingStyle}>はじめに</h3>
            <p style={textStyle}>
              当事務所は、ファンの皆様が、駅や街中のビジョン、その他の場所、方法において、当事務所Vライバーに関する広告媒体を掲示すること、いわゆる「応援広告」について、遵守いただきたい事項を明らかにすることを通じて、当事務所Vライバーや当事務所コンテンツについて、より多様な形でお楽しみいただけることを願い、本ガイドライン（以下「応援広告ガイドライン」とします）を制定いたします。
            </p>
            <p style={{ ...textStyle, marginTop: "0.75rem" }}>
              応援広告ガイドラインを遵守した応援広告であれば、当事務所に個別の問合せをいただくことなく、掲示いただけます。
            </p>
            <p style={{ ...textStyle, marginTop: "0.75rem" }}>
              なお、応援広告は、応援広告ガイドラインに加えて、全般ガイドラインの適用を受けますので、そちらも併せてご確認ください。
            </p>
            <p style={{ ...textStyle, marginTop: "0.75rem" }}>
              また、応援広告内に、当事務所が著作権その他権利を保有しないコンテンツが含まれる場合は、当該コンテンツ権利者の利用規約等の定めを遵守してください。なお、当事務所から第3者の利用規約等の解釈について個別に回答することはございませんので、予めご了承ください。
            </p>
          </div>

          <div style={sectionStyle}>
            <h3 style={headingStyle}>お願い</h3>
            <p style={{ ...textStyle, marginBottom: "0.75rem" }}>
              応援広告の制作・掲示にあたっては、全般ガイドラインの「お願い」に加えて、下記の事項についても併せて遵守いただくようお願いいたします。
            </p>
            <ul style={listStyle}>
              <li>当事務所の公式広告、又は当事務所の公認の広告と誤解される表現はご遠慮ください。</li>
              <li>応援広告内に、応援広告である旨を明記してください。</li>
              <li>当事務所コンテンツをそのまま利用するもの、単なる改変の域を出ないもの等の創作性に欠けるものは、応援広告として使用しないでください。</li>
              <li>第3者の権利を侵害しないようにしてください。応援広告に使用する素材が、第3者の作成したものである場合、その方の許可を取った上でご使用ください。</li>
              <li>応援広告の掲示にあたっては、掲示先のルール、手続きに従ってください。</li>
            </ul>
          </div>

          <div style={sectionStyle}>
            <h3 style={headingStyle}>その他</h3>
            <p style={textStyle}>全般ガイドライン記載の「その他」を準用いたします。</p>
          </div>

          <div style={dividerStyle} />

          {/* ============================== */}
          {/* 音楽利用 */}
          {/* ============================== */}
          <h2 style={subHeadingStyle}>音楽利用に関するガイドライン</h2>

          <div style={sectionStyle}>
            <h3 style={headingStyle}>はじめに</h3>
            <p style={textStyle}>
              当事務所は、当事務所の提供する音楽コンテンツ（以下「当事務所楽曲」とします）の利用について、安心して当事務所楽曲の利用ができるよう、音楽利用に関するガイドライン（以下「音楽利用ガイドライン」とします）を制定いたします。当事務所楽曲の利用は、音楽利用ガイドラインに加えて、全般ガイドラインの適用を受けますので、そちらも併せてご確認ください。
            </p>
          </div>

          <div style={sectionStyle}>
            <h3 style={headingStyle}>対象楽曲</h3>
            <p style={textStyle}>
              音楽利用ガイドラインの対象は、各種音楽配信プラットフォームで配信されているリニア所属Vライバーが歌っているオリジナル曲（以下「対象楽曲」とします）となります。
            </p>
          </div>

          <div style={sectionStyle}>
            <h3 style={headingStyle}>楽曲の二次創作</h3>
            <p style={textStyle}>
              対象楽曲については、カバーソングとしての「歌ってみた」や、対象楽曲を翻案しリミックス等の2次的著作物（以下、対象楽曲を利用した「歌ってみた」またはリミックス等の作品を「2次的楽曲著作物」とします）を制作することができます。
            </p>
            <p style={{ ...textStyle, marginTop: "0.75rem", fontSize: "0.75rem" }}>
              ※2次創作とは、当事務所楽曲に依拠しつつも、皆様の創意工夫・アイデアによって生み出される創作活動であると、当事務所は考えます。そのため、当事務所楽曲をそのまま複製したもの、改変に創作性の欠けるものは2次創作に該当せず音楽利用ガイドライン及び全般ガイドラインの対象外となります。
            </p>
            <p style={{ ...textStyle, marginTop: "0.75rem" }}>
              DJプレイにおける利用の場合は、上記の定めにかかわらず、当事務所楽曲をご利用いただくことができます。ただし、YouTube等の動画共有サイトにおいて利用する場合、当事務所が登録しているコンテンツIDに検知されることがあります。予めご承知おきください。
            </p>
            <p style={{ ...textStyle, marginTop: "0.75rem" }}>
              なお、当事務所楽曲から所属ライバーの音声を抽出しセリフ生成をしたものは2次的楽曲著作物に該当しないものとし、お断りしております。
            </p>
          </div>

          <div style={sectionStyle}>
            <h3 style={headingStyle}>利用上のご案内</h3>
            <p style={textStyle}>
              2次的楽曲著作物は、YouTube、ニコニコ動画、Bilibili、その他の動画共有サイトであったり、SoundCloud等の音楽共有サイト（以下、これらを併せて「共有サイト」とします）に投稿する等で2次的楽曲著作物を利用していただいて問題ありません。
            </p>
            <p style={{ ...textStyle, marginTop: "0.75rem" }}>
              制作・投稿された2次的楽曲著作物が、音楽利用ガイドラインを遵守しているものであれば、当事務所より著作隣接権を含む著作権権利行使をすることはございません。
            </p>
            <p style={{ ...textStyle, marginTop: "0.75rem" }}>
              共有サイトへの投稿に関しては、当該共有サイトが提供するパートナープログラムやクリエイタープログラム等を活用した広告収益を含むいわゆる収益化機能をご利用頂いて差し支えありません。
            </p>
            <p style={{ ...textStyle, marginTop: "0.75rem", fontSize: "0.75rem" }}>
              ※制作・投稿した2次的楽曲著作物について、コンテンツID等の登録を含む自己の著作物としての自動識別機能の登録は禁止させていただきます。2次的楽曲著作物の投稿に際しては、下記のクレジット表記をしてください。
            </p>
            <div style={{
              marginTop: "0.75rem", padding: "1rem 1.25rem",
              background: "var(--surface)", border: "1px solid var(--border)",
            }}>
              <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "0.25rem" }}>＜記載例＞</p>
              <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.65)" }}>
                曲：abcdefg<br />アーティスト：hijk
              </p>
            </div>
            <p style={{ ...textStyle, marginTop: "0.75rem" }}>
              なお、「歌ってみた」等の楽曲2次創作の音源として、YouTube ShortsやTikTok等の共有サイトにおいて、当事務所が登録しているライブラリ音源を利用する場合は、収益化機能をご利用頂いて差し支えありません。
            </p>
            <p style={{ ...textStyle, marginTop: "0.75rem" }}>
              DJプレイによる演奏および共有サイトへの投稿をする場合は、一般社団法人日本音楽著作権協会（JASRAC）または株式会社NexToneに対する著作権利用料の支払いが適切に行われていることを確認してください。もし、何らかの処理が必要な場合は、著作権利用料の支払い処理を適切に行っていただくようお願いします。
            </p>
            <p style={{ ...textStyle, marginTop: "0.75rem" }}>
              2次的楽曲著作物をCD、レコードその他物理媒体に収録し販売する、音楽ストリーミングサービスで配信する等の、共有サイトに投稿する以外の行為は音楽利用ガイドラインの対象外となります。このような利用を希望される場合は、個別に代表出版者経由でご確認いただくよう、お願いいたします。
            </p>
          </div>

          <div style={sectionStyle}>
            <h3 style={headingStyle}>公式関連コンテンツでの使用</h3>
            <p style={textStyle}>
              共有サイトに投稿された2次的楽曲著作物について、当事務所が運営するチャンネルにおける番組や放送その他当事務所に関連するコンテンツ等にて使用する場合がございます。
            </p>
            <p style={{ ...textStyle, marginTop: "0.75rem" }}>
              使用に際しては、制作者様にご連絡させていただきますので、予めご承知おきください。
            </p>
            <p style={{ ...textStyle, marginTop: "0.75rem" }}>
              なお、ガイドライン違反や応募要項違反その他事情が後日判明した際は、当事務所判断により削除させていただくことがございます。
            </p>
          </div>

          <div style={sectionStyle}>
            <h3 style={headingStyle}>お願い</h3>
            <p style={{ ...textStyle, marginBottom: "0.75rem" }}>
              楽曲の2次創作にあたっては、下記の事項を遵守していただくようお願いいたします。
            </p>
            <ul style={listStyle}>
              <li>所属Vライバーの心情にご配慮いただき、ライバーが不快と感じる創作活動はお控えください。</li>
              <li>いわゆる同人活動や趣味の範囲でお願いいたします。「利用上のご案内」にて規定した広告料等の徴収を逸脱し、営利目的と認められるもの、法人による利用はお断りしております。なお、法人に所属する方であっても、音楽利用ガイドラインを遵守いただくことを前提に、「歌ってみた」をはじめとする楽曲2次創作をしていただき差し支えございません。</li>
              <li style={{ marginTop: "0.5rem" }}>次のような表現を伴う創作活動はお控えください。
                <ul style={{ ...listStyle, marginTop: "0.25rem" }}>
                  <li>公式と詐称、または公式と誤解・誤認されうるもの</li>
                  <li>公序良俗に反するもの、反社会的なもの</li>
                  <li>特定の思想・信条や宗教的、政治的な内容を含むもの</li>
                  <li>所属Vライバー、当事務所または当事務所コンテンツのイメージを著しく損なうもの</li>
                  <li>第3者の名誉・品位等を傷つけるもの、第3者の権利を侵害するもの</li>
                  <li>その他当事務所が不適切と判断するもの</li>
                </ul>
              </li>
            </ul>
          </div>

          <div>
            <h3 style={headingStyle}>その他</h3>
            <p style={textStyle}>全般ガイドライン記載の「その他」を準用いたします。</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
