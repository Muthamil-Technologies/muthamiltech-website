// The JapanOne partner program, in English and Japanese (decided Nov 3, 2026).
// Every partner's first 6 months are free, counted from sign-up; billing starts only after we
// confirm it a month ahead (and never before April 2027, see memory: revenue strategy). Fees are flat
// advertising fees only: never per hire (有料職業紹介) or per booking (旅行業), and users never pay.
// Paid placements are labelled as advertising (広告 / PR).

import type { Lang } from "../lib/partnerLang";

export type T = Record<Lang, string>;

export const HERO = {
  title: { en: "Become a JapanOne partner", ja: "JapanOne パートナー募集" },
  line: {
    en: "Reach people who are learning Japanese and coming to Japan to study, work and travel. Your school, jobs, tours or products appear next to the guides they already use.",
    ja: "日本語を学び、留学・就労・旅行で日本を目指す人々へ。貴社の学校・求人・ツアー・商品を、利用者が毎日使うガイドの隣に掲載します。",
  },
  cta: { en: "Start your 6 months free", ja: "6か月無料で始める" },
} satisfies Record<string, T>;

export const FOUNDING = {
  title: { en: "Your first 6 months free", ja: "最初の6か月間は無料" },
  points: [
    { en: "Any plan, including Featured, free for your first 6 months", ja: "フィーチャーを含むすべてのプランを、最初の6か月間無料でご利用いただけます" },
    { en: "A Founding Partner badge for our first partners", ja: "初期パートナーには「創設パートナー」バッジを表示" },
    { en: "Founding partners then get 50% off their first paid year", ja: "創設パートナーは、その後の有料期間の最初の1年間50%割引" },
    { en: "No contract: leave at any time", ja: "契約期間の縛りはなく、いつでも退会できます" },
  ],
  note: {
    en: "The 6 months count from the day your partner account is approved. We will tell you at least one month before anything is charged, and nothing is charged unless you choose a paid plan.",
    ja: "6か月間は、パートナーアカウントの承認日から数えます。料金が発生する1か月以上前に必ずお知らせします。有料プランをお選びいただかない限り、料金は発生しません。",
  },
} satisfies { title: T; points: T[]; note: T };

export const WE_DO: T[] = [
  { en: "Check every partner and every listing before it goes live", ja: "掲載前に、すべての事業者と掲載内容を確認します" },
  { en: "Show your listings in the JapanOne app and on japanone.app, next to the guides for that topic", ja: "JapanOne アプリと japanone.app で、関連するガイドの隣に掲載します" },
  { en: "Send people straight to your website, email or phone", ja: "お問い合わせ・お申し込みは、貴社のサイト・メール・電話へ直接つなぎます" },
  { en: "Label every paid placement as advertising", ja: "有料の掲載には「広告」と明示します" },
];

export const WE_DONT: T[] = [
  { en: "Take applications, bookings, orders or payments for you", ja: "応募・予約・注文・決済の代行は行いません" },
  { en: "Charge per hire or per booking, or take a commission", ja: "成果報酬や手数料はいただきません" },
  { en: "Charge users: JapanOne stays open to everyone", ja: "利用者から料金はいただきません" },
];

export type Plan = {
  id: "basic" | "standard" | "featured";
  name: T;
  /** Monthly, tax excluded: schools, employers and tour agencies / shops. */
  price: number;
  shopPrice: number;
  line: T;
  features: T[];
};

export const PLANS: Plan[] = [
  {
    id: "basic",
    name: { en: "Basic", ja: "ベーシック" },
    price: 0,
    shopPrice: 0,
    line: { en: "Be found", ja: "まずは掲載" },
    features: [
      { en: "1 listing", ja: "掲載1件" },
      { en: "Your partner page", ja: "パートナーページ" },
      { en: "Checked and verified by our team", ja: "当社による確認・認証" },
    ],
  },
  {
    id: "standard",
    name: { en: "Standard", ja: "スタンダード" },
    price: 9800,
    shopPrice: 2980,
    line: { en: "Show everything you offer", ja: "すべての商品・サービスを掲載" },
    features: [
      { en: "Up to 10 listings", ja: "掲載10件まで" },
      { en: "Your logo and photos on your partner page", ja: "パートナーページにロゴ・写真を掲載" },
      { en: "A monthly report of views and clicks", ja: "閲覧数・クリック数の月次レポート" },
      { en: "Everything in Basic", ja: "ベーシックの全機能" },
    ],
  },
  {
    id: "featured",
    name: { en: "Featured", ja: "フィーチャー" },
    price: 29800,
    shopPrice: 9800,
    line: { en: "Be seen first", ja: "上位に表示" },
    features: [
      { en: "Unlimited listings", ja: "掲載数無制限" },
      { en: "Top of your section, labelled advertising", ja: "セクション上位に表示（「広告」表記）" },
      { en: "A spot on the JapanOne home page, labelled advertising", ja: "トップページに掲載（「広告」表記）" },
      { en: "2 posts a month on our Instagram, TikTok, YouTube and Facebook, labelled PR", ja: "当社の Instagram・TikTok・YouTube・Facebook で月2回紹介（「PR」表記）" },
      { en: "Everything in Standard", ja: "スタンダードの全機能" },
    ],
  },
];

export const PRICE_NOTE: T = {
  en: "After your first 6 months free. Monthly, excluding consumption tax (10%). Schools, employers and tour agencies pay the first price; shops pay the second. Founding partners get 50% off for their first paid year.",
  ja: "最初の6か月間の無料期間の後。月額・税抜（消費税10%別）。学校・企業・旅行会社は上段、ショップは下段の料金です。創設パートナーは有料期間の最初の1年間50%割引。",
};

export const STEPS: { title: T; text: T }[] = [
  { title: { en: "Create an account", ja: "アカウント作成" }, text: { en: "Sign in with Google or your email.", ja: "Google またはメールアドレスでログインします。" } },
  { title: { en: "Register your organisation", ja: "事業者登録" }, text: { en: "We verify it with your corporate number, school approval or travel agency registration.", ja: "法人番号・学校の認可・旅行業登録などで確認します。" } },
  { title: { en: "Add your listings", ja: "掲載内容を登録" }, text: { en: "Courses, jobs, tours or products. Our team checks each one.", ja: "コース・求人・ツアー・商品を登録。当社が1件ずつ確認します。" } },
  { title: { en: "People contact you directly", ja: "利用者から直接お問い合わせ" }, text: { en: "On your website, by email or by phone.", ja: "貴社のサイト・メール・電話へ直接ご連絡が届きます。" } },
];

export const FAQ: { q: T; a: T }[] = [
  {
    q: { en: "Why are the first 6 months free?", ja: "なぜ最初の6か月間は無料なのですか？" },
    a: {
      en: "So you can see the views, clicks and enquiries JapanOne brings before you pay anything. If it doesn't work for you, leave at no cost.",
      ja: "JapanOne からの閲覧数・クリック数・お問い合わせを、お支払いの前に実際にご確認いただくためです。ご期待に沿わない場合は、費用なしで退会できます。",
    },
  },
  {
    q: { en: "Do you charge per hire, per booking or per sale?", ja: "採用・予約・売上ごとの手数料はかかりますか？" },
    a: {
      en: "No. JapanOne is an advertising service: plans are a flat monthly fee. We don't take part in hiring, bookings or sales, and we never charge users.",
      ja: "かかりません。JapanOne は広告サービスで、料金は月額の定額制です。採用・予約・販売には関与せず、利用者から料金をいただくこともありません。",
    },
  },
  {
    q: { en: "Can I cancel?", ja: "解約できますか？" },
    a: { en: "Yes, at any time. There is no minimum contract period.", ja: "はい、いつでも解約できます。最低契約期間はありません。" },
  },
  {
    q: { en: "Which languages can listings be in?", ja: "掲載は何語で書けばよいですか？" },
    a: {
      en: "English, Japanese, or both. Listings are shown in the language you write them in; clear English reaches the most people.",
      ja: "英語・日本語のどちらでも、両方でも構いません。入力した言語のまま表示されます。わかりやすい英語で書くと、より多くの方に届きます。",
    },
  },
  {
    q: { en: "Who can become a partner?", ja: "どのような事業者が参加できますか？" },
    a: {
      en: "Japanese language schools on the Immigration Services Agency's list and accredited schools, employers and registered support organisations, registered travel agencies and licensed guides, and shops and makers in Japan. We decline listings that break Japanese law or mislead users.",
      ja: "出入国在留管理庁の告示校・認可校、企業・登録支援機関、登録旅行業者・通訳案内士、日本国内のショップ・作り手の皆さまです。法令に反する掲載や、利用者に誤解を与える掲載はお断りします。",
    },
  },
];

export const ASK: T = { en: "Questions first? Contact us", ja: "ご質問はお問い合わせフォームから" };

/** The partner kinds in both languages, by program slug. */
export const PROGRAM_JA: Record<string, { who: string; cardBody: string; cta: string }> = {
  study: { who: "日本語学校・教育機関", cardBody: "日本への留学を考える学習者に、日本語コースやプログラムを紹介できます。", cta: "学校として参加" },
  work: { who: "企業・登録支援機関", cardBody: "介護・建設・外食・製造・ホテルなど、日本で働きたい外国人に求人を届けます。", cta: "企業として参加" },
  travel: { who: "旅行会社・ガイド", cardBody: "日本旅行を計画中の旅行者に、ツアーや日帰り体験を紹介できます。", cta: "旅行会社として参加" },
  shop: { who: "日本のショップ・作り手", cardBody: "日本が好きな世界中の人々に、日本製の商品を届けます。", cta: "ショップとして参加" },
};

export const yen = (n: number, lang: Lang) => (n === 0 ? "¥0" : `¥${n.toLocaleString(lang === "ja" ? "ja-JP" : "en-US")}`);
