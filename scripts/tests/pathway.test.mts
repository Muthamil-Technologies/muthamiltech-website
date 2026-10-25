// Same cases as japjob-mobile/test/pathway_test.dart, against the web port.
// Run: node --experimental-strip-types scripts/tests/pathway.test.mts
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { findPaths, type Field } from "../../src/lib/japwork/pathway.ts";

const fields: Field[] = JSON.parse(readFileSync(new URL("../../public/learn/japwork_fields.json", import.meta.url), "utf8")).fields;
const f = (id: string) => fields.find((x) => x.id === id)!;
let n = 0;
const t = (name: string, fn: () => void) => { fn(); n++; console.log("ok -", name); };

t("16 fields", () => assert.equal(fields.length, 16));
t("spouse/resident: one ready path with study tip below N4", () => {
  const r = findPaths("spouseOrResident", "n5", f("caregiving"));
  assert.equal(r.paths.length, 1); assert.equal(r.paths[0].fit, "ready"); assert.ok(r.paths[0].steps.some((s) => s.studyLink));
});
t("abroad below N4", () => {
  const r = findPaths("abroad", "n5", f("construction")); const ssw = r.paths[0];
  assert.match(ssw.title, /Specified Skilled Worker \(i\)/); assert.match(ssw.steps[0].text, /Construction Skills Evaluation Test/);
  const lang = ssw.steps.find((s) => s.text.includes("JFT-Basic"))!; assert.equal(!!lang.done, false); assert.equal(lang.studyLink, true);
  assert.match(ssw.steps.at(-1)!.text, /Certificate of Eligibility/); assert.match(r.warnings[0], /Never pay big fees/);
});
t("abroad with N4: language done", () => assert.equal(findPaths("abroad", "n4", f("construction")).paths[0].steps.find((s) => s.text.includes("JFT-Basic"))!.done, true));
t("caregiving extras", () => {
  const r = findPaths("abroad", "n4", f("caregiving"));
  assert.ok(r.paths[0].steps.some((s) => s.text.includes("介護日本語評価試験"))); assert.ok(r.warnings.some((w) => w.includes("介護福祉士")));
});
t("taxi/bus needs N3 + licence", () => {
  const s = findPaths("abroad", "n4", f("auto_transport")).paths[0].steps;
  assert.equal(!!s.find((x) => x.text.includes("N3"))!.done, false); assert.ok(s.some((x) => x.text.includes("driving licence")));
});
t("intern: nothing pre-ticked", () => {
  const r = findPaths("technicalIntern", "n5", f("construction")); const s = r.paths[0].steps;
  assert.match(s[0].text, /Complete Technical Intern Training \(ii\)/); assert.equal(s.filter((x) => x.done).length, 0);
  assert.match(s[1].text, /only if your intern job matches/); assert.match(s.at(-1)!.text, /immigration office/); assert.match(r.paths[0].notes![0], /監理団体/);
});
t("intern with N4: only language ticked", () => {
  const done = findPaths("technicalIntern", "n4", f("construction")).paths[0].steps.filter((x) => x.done);
  assert.equal(done.length, 1); assert.match(done[0].text, /^Japanese test/);
});
t("student paths", () => {
  const r = findPaths("student", "n4", f("food_service"));
  assert.match(r.paths[0].title, /28 hours/); assert.match(r.paths[0].summary, /40 hours/); assert.match(r.paths.map((p) => p.title).join(" "), /After graduation/);
});
t("SSW (i): SSW (ii) only where it exists", () => {
  assert.match(findPaths("ssw1", "n4", f("construction")).paths[1].title, /SSW \(ii\)/);
  assert.equal(findPaths("ssw1", "n4", f("caregiving")).paths[1].fit, "limited");
});
console.log(`${n} passed`);
