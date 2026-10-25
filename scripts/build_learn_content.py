"""Copies the JapTalk and JapTutor content the /learn pages use into public/learn/.

Run from the Website folder after the apps' content changes:
    python3 scripts/build_learn_content.py
Reads ../japtalk-mobile and ../japtutor-mobile (sibling repos); writes trimmed JSON.
"""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
MT = ROOT.parent
OUT = ROOT / "public" / "learn"
OUT.mkdir(parents=True, exist_ok=True)

# JapTalk: lessons with typed/spoken exercises.
content = json.loads((MT / "japtalk-mobile/assets/data/content.json").read_text())
levels = {l["id"]: l for l in content["speaking_levels"]}
lessons = []
for l in sorted(content["lessons"], key=lambda x: x["order_index"]):
    lessons.append({
        "id": l["id"],
        "title": l["title"],
        "mission": l["mission"],
        "description": l["mission_description"],
        "level": l["speaking_level_id"],
        "exercises": [{
            "id": e["id"],
            "prompt": e["prompt_en"],
            "context": e.get("context_line"),
            "answer": e["canonical_sentence"],
            "accepted": e["accepted_sentences"],
            "tokens": [[t["surface"], t.get("reading")] for t in e["canonical_sentence_tokens"]],
        } for e in sorted(l["exercises"], key=lambda x: x["order_index"])],
    })
(OUT / "japtalk.json").write_text(json.dumps({
    "levels": [{"id": v["id"], "name": v["display_name"], "jlpt": v.get("jlpt_equivalent"), "order": v["order_index"]}
               for v in sorted(levels.values(), key=lambda v: v["order_index"])],
    "lessons": lessons,
}, ensure_ascii=False, separators=(",", ":")))

# JapTutor: the validated question banks (N5 from the shorts kit, N4/N3 from marketing/web_bank),
# without the listening item types (no audio on the web yet).
BANKS = {
    "n5": MT / "japtutor-mobile/marketing/n5_shorts/validated_bank_n5.json",
    "n4": MT / "japtutor-mobile/marketing/web_bank/validated_bank_n4.json",
    "n3": MT / "japtutor-mobile/marketing/web_bank/validated_bank_n3.json",
}
LISTENING = {"taskBasedListening", "pointComprehension", "verbalExpressions", "quickResponse", "summaryComprehension"}
UNDERLINED = {"kanjiReading", "orthography", "paraphrase"}


def underline(x):
    """The tested word (shown underlined, JLPT style). The export drops the app's `underline`
    field, but every explanation names the word in 「」, so take the first one found in the stem."""
    if x["itemType"] not in UNDERLINED:
        return None
    return next((w for w in re.findall(r"「([^」]+)」", x.get("explanation") or "") if w in x["stem"]), None)


counts = {}
for level, src in BANKS.items():
    bank = json.loads(src.read_text())
    bank = bank if isinstance(bank, list) else next(iter(bank.values()))
    items = [{**{k: x[k] for k in ("key", "itemType", "instruction", "stem", "options", "correctIndex", "explanation", "passage")},
              "underline": underline(x)}
             for x in bank if x["itemType"] not in LISTENING]
    # An underlined question without its word can't be shown fairly; leave it out.
    dropped = [x["key"] for x in items if x["itemType"] in UNDERLINED and not x["underline"]]
    items = [x for x in items if x["key"] not in dropped]
    (OUT / f"japtutor_{level}.json").write_text(json.dumps(items, ensure_ascii=False, separators=(",", ":")))
    counts[level] = f"{len(items)} questions" + (f" ({len(dropped)} dropped: no underline)" if dropped else "")
print(f"japtalk: {len(lessons)} lessons; japtutor: {counts}")
