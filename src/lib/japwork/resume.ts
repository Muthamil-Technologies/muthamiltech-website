// 履歴書 (Japanese CV) data and its HTML rendering for the web. A port of
// japjob-mobile/lib/cv/resume.dart: same fields, same JIS/MHLW-style layout. The browser's own
// print dialog turns it into a PDF (Save as PDF), with the device's Japanese fonts.

export type HistoryRow = { y: number; m: number; t: string };

export type Resume = {
  name: string; // as in the passport, e.g. "NGUYEN VAN AN"
  nameKana: string; // katakana reading
  birthDate: string | null; // yyyy-mm-dd
  nationality: string;
  postcode: string;
  address: string;
  addressKana: string;
  phone: string;
  email: string;
  photo: string | null; // JPEG data URL, 3:4 portrait
  education: HistoryRow[];
  work: HistoryRow[];
  stillWorking: boolean; // adds 現在に至る after the last job
  licenses: HistoryRow[];
  motivation: string; // 志望動機
  selfPr: string; // 自己PR
  request: string; // 本人希望記入欄
};

export const EMPTY_RESUME: Resume = {
  name: "", nameKana: "", birthDate: null, nationality: "", postcode: "", address: "", addressKana: "",
  phone: "", email: "", photo: null, education: [], work: [], stillWorking: false, licenses: [],
  motivation: "", selfPr: "", request: "貴社の規定に従います。",
};

/** What's still missing for a complete CV. */
export function missing(r: Resume): string[] {
  return [
    !r.name.trim() && "Name",
    !r.nameKana.trim() && "Name in katakana",
    !r.birthDate && "Date of birth",
    !r.address.trim() && "Address",
    !r.phone.trim() && !r.email.trim() && "Phone or email",
    !r.photo && "Photo",
    r.education.length === 0 && "Education",
    !r.motivation.trim() && "Why you want this job",
  ].filter(Boolean) as string[];
}

export const sortRows = (rows: HistoryRow[]) => [...rows].sort((a, b) => a.y * 12 + a.m - (b.y * 12 + b.m));

/** Age in full years on `today`, as written on the form. */
function ageOn(birth: Date, today: Date) {
  let age = today.getFullYear() - birth.getFullYear();
  if (today.getMonth() < birth.getMonth() || (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())) age--;
  return age;
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/\n/g, "<br>");

/** The 学歴・職歴 rows in the order the form expects. */
function historyLines(r: Resume): [string, string, string, boolean][] {
  const lines: [string, string, string, boolean][] = [["", "", "学歴", true]];
  for (const e of r.education) lines.push([`${e.y}`, `${e.m}`, e.t, false]);
  lines.push(["", "", "職歴", true]);
  if (r.work.length === 0) lines.push(["", "", "なし", false]);
  else {
    for (const w of r.work) lines.push([`${w.y}`, `${w.m}`, w.t, false]);
    if (r.stillWorking) lines.push(["", "", "現在に至る", false]);
  }
  lines.push(["", "", "以上", false]);
  return lines;
}

export function resumeHtml(r: Resume, today = new Date()): string {
  const hist = historyLines(r);
  let rows = "";
  for (let i = 0; i < Math.max(hist.length, 16); i++) {
    if (i < hist.length) {
      const [y, m, t, heading] = hist[i];
      const align = heading ? "center" : t === "以上" ? "right" : "left";
      rows += `<tr><td class="ym">${y}</td><td class="ym">${m}</td><td style="text-align:${align}">${esc(t)}</td></tr>`;
    } else rows += `<tr><td class="ym">&nbsp;</td><td class="ym"></td><td></td></tr>`;
  }
  let lic = "";
  for (let i = 0; i < 5; i++) {
    const l = r.licenses[i];
    lic += `<tr><td class="ym">${l?.y ?? ""}</td><td class="ym">${l?.m ?? ""}</td><td>${esc(l?.t ?? "")}</td></tr>`;
  }
  const b = r.birthDate ? new Date(`${r.birthDate}T00:00:00`) : null;
  const birth = b
    ? `${b.getFullYear()}年 ${b.getMonth() + 1}月 ${b.getDate()}日生（満 ${ageOn(b, today)} 歳）`
    : "　　年　　月　　日生（満　　歳）";
  const photo = r.photo
    ? `<img class="photo" src="${r.photo}">`
    : `<div class="photo empty">写真をはる位置<br><small>縦 36〜40mm<br>横 24〜30mm</small></div>`;
  const pr = [r.motivation, r.selfPr].filter((s) => s.trim()).join("\n\n");

  return `<!doctype html><html lang="ja"><head><meta charset="utf-8"><title>履歴書 ${esc(r.name)}</title><style>
@page { size: A4; margin: 12mm; }
* { box-sizing: border-box; }
body { font-family: "Hiragino Mincho ProN", "Yu Mincho", "Noto Serif JP", serif; font-size: 10.5pt; color: #000; margin: 0; background: #fff; }
h1 { font-size: 20pt; letter-spacing: 1.2em; margin: 0 0 2mm; }
.date { text-align: right; font-size: 9.5pt; margin-bottom: 1mm; }
table { border-collapse: collapse; width: 100%; table-layout: fixed; }
html, body { width: 186mm; }
tr { height: 7.5mm; }
td, th { border: 0.8pt solid #000; padding: 1.2mm 2mm; vertical-align: middle; }
.small { font-size: 8pt; }
.name { font-size: 18pt; height: 16mm; }
.ym { width: 13mm; text-align: center; }
.head td { text-align: center; font-size: 9pt; }
.top { display: flex; gap: 4mm; align-items: flex-start; }
.photo { width: 30mm; height: 40mm; object-fit: cover; border: 0.8pt solid #000; flex: none; }
.photo.empty { border-style: dashed; display: block; padding-top: 13mm; text-align: center; font-size: 8pt; line-height: 1.5; color: #555; }
.box { height: 60mm; vertical-align: top; line-height: 1.8; }
.label { font-size: 9pt; vertical-align: top; height: auto; }
.page2 { page-break-before: always; break-before: page; }
</style></head><body>
<div class="top">
 <div style="flex:1">
  <h1>履歴書</h1>
  <div class="date">${today.getFullYear()}年 ${today.getMonth() + 1}月 ${today.getDate()}日現在</div>
  <table>
   <tr><td class="small">ふりがな　${esc(r.nameKana)}</td></tr>
   <tr><td class="name"><span class="small">氏名</span>　${esc(r.name)}</td></tr>
   <tr><td>${birth}${r.nationality ? `　国籍：${esc(r.nationality)}` : ""}</td></tr>
  </table>
 </div>
 ${photo}
</div>
<table style="margin-top:2mm">
 <tr><td class="small" colspan="2">ふりがな　${esc(r.addressKana)}</td><td class="small" style="width:52mm">電話　${esc(r.phone)}</td></tr>
 <tr><td colspan="2" style="height:16mm;vertical-align:top"><span class="small">現住所 〒${esc(r.postcode)}</span><br>${esc(r.address)}</td><td class="small">E-mail<br>${esc(r.email)}</td></tr>
</table>
<table style="margin-top:3mm">
 <tr class="head"><td class="ym">年</td><td class="ym">月</td><td>学歴・職歴（各別にまとめて書く）</td></tr>
 ${rows}
</table>
<div class="page2"></div>
<table>
 <tr class="head"><td class="ym">年</td><td class="ym">月</td><td>免許・資格</td></tr>
 ${lic}
</table>
<table style="margin-top:3mm">
 <tr><td class="label">志望の動機、特技、好きな学科、アピールポイントなど</td></tr>
 <tr><td class="box">${esc(pr)}</td></tr>
</table>
<table style="margin-top:3mm">
 <tr><td class="label">本人希望記入欄（特に給料・職種・勤務時間・勤務地・その他についての希望などがあれば記入）</td></tr>
 <tr><td class="box" style="height:30mm">${esc(r.request)}</td></tr>
</table>
</body></html>`;
}

/** Common licences and tests, written the way Japanese CVs show them. */
export const LICENSE_SUGGESTIONS = [
  "日本語能力試験 N5 合格",
  "日本語能力試験 N4 合格",
  "日本語能力試験 N3 合格",
  "国際交流基金日本語基礎テスト（JFT-Basic）合格",
  "介護技能評価試験 合格",
  "介護日本語評価試験 合格",
  "外食業特定技能1号技能測定試験 合格",
  "普通自動車第一種運転免許 取得",
];
