// Japanese text for the partner pages (registration, company page, listing editor, sign-in).
// English stays in partnerTypes.ts and lib/listings.ts; these mirror it for Japanese businesses.
import type { ListingStatus, Product, ProviderKind } from "../lib/listings";
import type { Lang } from "../lib/partnerLang";

export type ProgramJa = {
  headline: string;
  intro: string;
  steps: [string, string][];
  note: string;
  registrationLabel: string;
  registrationHint: string;
  nameLabel: string;
};

export const PROGRAM_TEXT_JA: Record<"study" | "work" | "travel" | "shop", ProgramJa> = {
  study: {
    headline: "日本への留学を考える学習者に届ける",
    intro:
      "JapanOne は、JLPT対策、学校の種類、奨学金、留学ビザのルールなど、日本語学習と日本留学の準備を支援しています。学習者が計画を立てている段階で、貴校のコースを見つけてもらえるよう掲載できます。",
    steps: [
      ["学校を登録", "公式リスト（文部科学省の認可、または出入国在留管理庁の告示校）と照合し、確認後に公開します。"],
      ["コースを掲載", "期間・入学時期・学費・必要な日本語レベルを入力します。すべての掲載を当社が確認します。"],
      ["学生は貴校のサイトから出願", "JapanOne は貴校の出願ページへご案内します。出願の受付や費用の徴収は行いません。"],
    ],
    note: "コースは JapanOne（アプリとWebサイト）に、入力された言語で表示されます。最初の6か月間は無料です。",
    registrationLabel: "法人番号または学校コード",
    registrationHint: "各学校を確認してからコースを公開します。認可・告示の情報があると確認がスムーズです。",
    nameLabel: "学校名",
  },
  work: {
    headline: "日本で仕事を探す外国人に求人を届ける",
    intro:
      "JapanOne は、在留資格の選び方、日本語の履歴書、面接練習、職場での権利など、日本で働く準備をする人を支援しています。その利用者に貴社の求人を届けられます。",
    steps: [
      ["企業を登録", "法人番号で確認したうえで公開します。"],
      ["求人を掲載", "給与・勤務時間・休日・応募できる人を明記してください。すべての求人を当社が確認します。"],
      ["応募者から直接ご連絡", "貴社のリンク・メール・電話に直接連絡が届きます。当社は採用に関与せず、求職者から料金を受け取ることもありません。"],
    ],
    note: "求人は JapanOne（アプリとWebサイト）に、入力された言語で表示されます。最初の6か月間は無料です。",
    registrationLabel: "法人番号",
    registrationHint: "各企業を確認してから求人を公開します。法人番号があると確認がスムーズです。",
    nameLabel: "会社名",
  },
  travel: {
    headline: "日本旅行を計画中の旅行者に届ける",
    intro:
      "JapanOne は、日本を訪れる旅行者のために日ごとの旅程を作成します。旅行者が計画している段階で、貴社のツアーや体験を見つけてもらえます。",
    steps: [
      ["旅行会社を登録", "旅行業登録または通訳案内士の資格を確認してから公開します。"],
      ["ツアーを掲載", "所要時間・料金・集合場所・含まれるもの・ガイドの言語を入力します。すべての掲載を当社が確認します。"],
      ["旅行者は貴社のサイトで予約", "JapanOne は貴社の予約ページへご案内します。予約や決済の受付は行いません。"],
    ],
    note: "ツアーは JapanOne（アプリとWebサイト）に、入力された言語で表示されます。最初の6か月間は無料です。",
    registrationLabel: "旅行業登録番号",
    registrationHint: "各旅行会社を確認してからツアーを公開します。登録番号があると確認がスムーズです。",
    nameLabel: "会社名",
  },
  shop: {
    headline: "日本が好きな世界中の人に日本製品を届ける",
    intro:
      "JapanOne Shop では、日本の小さなショップや作り手の商品を、世界中の学習者・留学生・旅行者に紹介します。今ご登録いただくと、Shop の開始と同時に掲載できます。",
    steps: [
      ["ショップを登録", "事業者情報と取扱商品をお知らせください。公開前にすべてのショップを確認します。"],
      ["商品を登録", "写真・価格・発送先・購入方法を入力します。すべての掲載を当社が確認します。"],
      ["購入者から直接ご注文", "貴社のショップページやお問い合わせ先から直接注文が届きます。注文や決済の受付は行いません。"],
    ],
    note: "Shop は JapanOne の公開後に開始します。最初の6か月間は無料です。",
    registrationLabel: "法人番号（お持ちの場合）",
    registrationHint: "個人事業主の方も歓迎します。公開前に事業者情報をお伺いする場合があります。",
    nameLabel: "ショップ名",
  },
};

/** What each kind of partner is called, and what it lists, in Japanese. */
export const NOUN_JA: Record<ProviderKind, { one: string; lists: string }> = {
  employer: { one: "企業", lists: "求人" },
  tour_agency: { one: "旅行会社", lists: "ツアー" },
  seller: { one: "ショップ", lists: "商品" },
  school: { one: "学校", lists: "コース" },
};

export const KIND_JA: Record<ProviderKind, string> = { employer: "企業・登録支援機関", tour_agency: "旅行会社", seller: "ショップ", school: "学校・教育機関" };
export const PRODUCT_JA: Record<Product, string> = { job: "求人", tour: "ツアー", item: "商品", course: "コース" };
export const STATUS_JA: Record<ListingStatus, string> = {
  draft: "下書き",
  submitted: "審査中",
  published: "公開中",
  rejected: "修正が必要",
  expired: "期限切れ",
  removed: "削除済み",
};

/** Listing detail fields in Japanese, by field key: label and hint. */
export const FIELD_JA: Record<string, { label: string; hint?: string }> = {
  job_type: { label: "職種" },
  employment_type: { label: "雇用形態" },
  salary_min: { label: "給与（下限・円）", hint: "税引前。都道府県の最低賃金以上としてください。" },
  salary_max: { label: "給与（上限・円）" },
  salary_unit: { label: "給与の単位" },
  visa_types: { label: "応募できる在留資格" },
  jlpt_required: { label: "必要な日本語レベル" },
  work_hours: { label: "勤務時間", hint: "例：8:00〜17:00（休憩1時間）、シフト制、通常の残業時間" },
  days_off: { label: "休日", hint: "例：土日、年間休日 約105日" },
  dormitory: { label: "寮・社宅あり" },
  transport_paid: { label: "交通費支給" },
  apply_method: { label: "応募方法" },
  apply_target: { label: "応募先（リンク・メール・電話番号）", hint: "応募者から直接ご連絡が届きます。" },
  duration_days: { label: "所要日数" },
  price_from_jpy: { label: "料金（1名あたり・円〜）" },
  price_note: { label: "料金の補足", hint: "例：子どもは2,000円引き" },
  start_dates: { label: "催行日", hint: "空欄の場合は「毎日催行」になります" },
  meeting_point: { label: "集合場所" },
  group_size_max: { label: "最大人数" },
  includes: { label: "含まれるもの", hint: "1行に1つ：ガイド、昼食、交通など" },
  languages_guided: { label: "ガイドの言語" },
  booking_url: { label: "予約ページのリンク（貴社サイト）", hint: "旅行者は貴社のサイトで予約します。" },
  price: { label: "価格" },
  currency: { label: "通貨" },
  stock: { label: "在庫" },
  ships_to: { label: "発送先（国コード）", hint: "1行に1つ。例：JP, IN, US" },
  shipping_note: { label: "発送について" },
  category: { label: "カテゴリー" },
  brand: { label: "ブランド" },
  size: { label: "サイズ" },
  color: { label: "色" },
  contact_url: { label: "購入方法（ショップのリンクまたは WhatsApp）" },
  school_type: { label: "学校の種類" },
  course_type: { label: "コース" },
  duration_months: { label: "期間（か月）" },
  intakes: { label: "入学時期" },
  tuition_year_jpy: { label: "年間学費（円）", hint: "学費のみ。入学金などは「その他の費用」に記入してください。" },
  fees_note: { label: "その他の費用", hint: "入学金、教材費、保険、寮費など" },
  student_visa: { label: "留学ビザの申請に対応", hint: "公開前に公式リストと照合します。" },
  entry_level: { label: "入学時に必要な日本語" },
  support_languages: { label: "スタッフの対応言語" },
  apply_url: { label: "出願方法（貴校のサイト）" },
};

/** Option labels in Japanese, by "fieldKey.value". Options not listed keep their English label. */
export const OPTION_JA: Record<string, string> = {
  "job_type.caregiving": "介護",
  "job_type.construction": "建設",
  "job_type.food_service": "外食",
  "job_type.food_manufacturing": "飲食料品製造",
  "job_type.manufacturing": "製造・工場",
  "job_type.agriculture": "農業",
  "job_type.fishery": "漁業",
  "job_type.hotel": "宿泊",
  "job_type.cleaning": "ビルクリーニング",
  "job_type.logistics": "物流・倉庫",
  "job_type.retail": "小売・コンビニ",
  "job_type.other": "その他",
  "employment_type.full_time": "正社員・フルタイム",
  "employment_type.part_time": "パート・アルバイト",
  "employment_type.contract": "契約社員",
  "employment_type.temporary": "短期・臨時",
  "salary_unit.hour": "時給",
  "salary_unit.day": "日給",
  "salary_unit.month": "月給",
  "salary_unit.year": "年収",
  "visa_types.ssw1": "特定技能1号",
  "visa_types.ssw2": "特定技能2号",
  "visa_types.student": "留学（資格外活動）",
  "visa_types.dependent": "家族滞在",
  "visa_types.spouse": "配偶者等・定住者",
  "visa_types.pr": "永住者",
  "visa_types.working_holiday": "ワーキング・ホリデー",
  "visa_types.any": "就労可能な在留資格",
  "jlpt_required.none": "不要",
  "entry_level.none": "不要",
  "apply_method.url": "ウェブサイト・応募フォーム",
  "apply_method.email": "メール",
  "apply_method.phone": "電話",
  "school_type.language_school": "日本語学校",
  "school_type.vocational": "専門学校",
  "school_type.university": "大学・大学院",
  "school_type.junior_college": "短期大学",
  "school_type.other": "その他",
  "course_type.long_term": "長期（留学ビザ）",
  "course_type.short_term": "短期",
  "course_type.online": "オンライン",
  "course_type.university_prep": "進学コース",
  "course_type.business_japanese": "ビジネス日本語",
  "course_type.jlpt_prep": "JLPT対策",
  "course_type.other": "その他",
  "intakes.january": "1月",
  "intakes.april": "4月",
  "intakes.july": "7月",
  "intakes.october": "10月",
};

/** UI text on the partner pages. */
export const UI = {
  backToPartners: { en: "← Become a partner", ja: "← パートナー募集" },
  partners: { en: "Partners", ja: "パートナー" },
  plans: { en: "Plans and prices", ja: "料金プラン" },
  questions: { en: "Questions before you register?", ja: "登録前のご質問は" },
  contact: { en: "Contact us", ja: "お問い合わせ" },
  signIn: { en: "Sign in to register", ja: "ログインして登録" },
  verified: { en: "Verified", ja: "確認済み" },
  pending: { en: "Awaiting verification", ja: "確認中" },
  suspended: { en: "Suspended", ja: "停止中" },
  website: { en: "Website", ja: "ウェブサイト" },
  email: { en: "Contact email", ja: "連絡先メールアドレス" },
  phone: { en: "Phone", ja: "電話番号" },
  prefecture: { en: "Prefecture", ja: "都道府県" },
  registering: { en: "Registering…", ja: "登録中…" },
  register: { en: "Register", ja: "登録する" },
  // company page
  listings: { en: "Listings", ja: "掲載一覧" },
  noListings: { en: "No listings yet.", ja: "まだ掲載はありません。" },
  loading: { en: "Loading…", ja: "読み込み中…" },
  notMember: { en: "Company not found, or you're not a member of it.", ja: "事業者が見つからないか、この事業者のメンバーではありません。" },
  verifying: {
    en: "We're verifying your company. You can prepare and submit listings now; they go live once you're verified and each listing is approved.",
    ja: "現在、事業者情報を確認しています。掲載の準備と提出は今すぐ行えます。確認が完了し、各掲載が承認されると公開されます。",
  },
  suspendedMsg: {
    en: "This company is suspended, so its listings are hidden. Contact us from the contact page.",
    ja: "この事業者は停止中のため、掲載は表示されません。お問い合わせページからご連絡ください。",
  },
  // listing editor
  title: { en: "Title", ja: "タイトル" },
  description: { en: "Description", ja: "説明" },
  area: { en: "Area (prefecture / city)", ja: "地域（都道府県・市区町村）" },
  shipsFrom: { en: "Ships from (country)", ja: "発送元（国）" },
  writtenIn: { en: "Written in", ja: "記載言語" },
  writtenHint: { en: "(people see it in this language)", ja: "（この言語のまま表示されます）" },
  photos: { en: "Photos", ja: "写真" },
  saveFirst: { en: "Save the listing first, then add photos.", ja: "先に下書きを保存してから、写真を追加してください。" },
  saveDraft: { en: "Save draft", ja: "下書き保存" },
  submit: { en: "Submit for review", ja: "審査に提出" },
  changesNeeded: { en: "Changes needed", ja: "修正が必要です" },
  changesDefault: { en: "Please check the listing and submit it again.", ja: "掲載内容をご確認のうえ、再度提出してください。" },
  reviewing: { en: "This listing is being reviewed.", ja: "この掲載は審査中です。" },
  live: { en: "This listing is live.", ja: "この掲載は公開中です。" },
  cantEdit: { en: "This listing can't be edited.", ja: "この掲載は編集できません。" },
  withdraw: { en: "Withdraw to edit", ja: "取り下げて編集" },
  saved: { en: "Saved.", ja: "保存しました。" },
  sent: { en: "Sent for review. We usually check listings within 1–2 working days.", ja: "審査に提出しました。通常1〜2営業日以内に確認します。" },
  backToDraft: { en: "Back to draft. Edit it and submit again; it will be reviewed again.", ja: "下書きに戻しました。編集して再提出すると、再度審査されます。" },
  notFound: { en: "Listing not found.", ja: "掲載が見つかりません。" },
  rules: { en: "Listings must be accurate and legal.", ja: "掲載内容は正確かつ法令に沿ったものとしてください。" },
  noFees: { en: "Never charge applicants any fee.", ja: "応募者から料金を受け取ることは禁止です。" },
  remove: { en: "We may remove any listing that breaks our rules.", ja: "規約に反する掲載は削除する場合があります。" },
  // sign-in (partners)
  signInTitle: { en: "Sign in to JapanOne", ja: "JapanOne にログイン" },
  signInLine: {
    en: "Sign in to register and manage your listings. No password needed.",
    ja: "ログインすると、掲載の登録・管理ができます。パスワードは不要です。",
  },
  checkEmail: { en: "Check your email", ja: "メールをご確認ください" },
  emailSent: {
    en: "We sent a sign-in link to {email}. Open it on this device. It may take a minute; check spam if you don't see it.",
    ja: "{email} にログイン用のリンクを送信しました。この端末で開いてください。届くまで1分ほどかかる場合があります。見つからない場合は迷惑メールフォルダもご確認ください。",
  },
  google: { en: "Continue with Google", ja: "Google で続ける" },
  or: { en: "or", ja: "または" },
  emailLabel: { en: "Email", ja: "メールアドレス" },
  sending: { en: "Sending…", ja: "送信中…" },
  sendLink: { en: "Email me a sign-in link", ja: "ログイン用リンクをメールで受け取る" },
  agree: { en: "By signing in you agree to our", ja: "ログインすると、以下に同意したものとみなされます：" },
  terms: { en: "Terms of Use", ja: "利用規約" },
  and: { en: "and", ja: "・" },
  privacy: { en: "privacy policy", ja: "プライバシーポリシー" },
} satisfies Record<string, Record<Lang, string>>;

export const savedMissing = (lang: Lang, fields: string[]) =>
  lang === "ja"
    ? `下書きとして保存しました。提出前に必要な項目：${fields.join("、")}`
    : `Saved as draft. Still needed before submitting: ${fields.join(", ")}.`;
