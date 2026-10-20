"""Copies the JapTalk and JapTutor content the /learn pages use into public/learn/.

Run from the Website folder after the apps' content changes:
    python3 scripts/build_learn_content.py
Reads ../japtalk-mobile and ../japtutor-mobile (sibling repos); writes trimmed JSON.
"""
import json
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

# JapTutor: the validated N5 question bank, without the listening item types (no audio on the web yet).
bank = json.loads((MT / "japtutor-mobile/marketing/n5_shorts/validated_bank_n5.json").read_text())
bank = bank if isinstance(bank, list) else next(iter(bank.values()))
LISTENING = {"taskBasedListening", "pointComprehension", "verbalExpressions", "quickResponse"}
items = [{k: x[k] for k in ("key", "itemType", "instruction", "stem", "options", "correctIndex", "explanation", "passage")}
         for x in bank if x["itemType"] not in LISTENING]
(OUT / "japtutor_n5.json").write_text(json.dumps(items, ensure_ascii=False, separators=(",", ":")))
print(f"japtalk: {len(lessons)} lessons; japtutor N5: {len(items)} questions")
