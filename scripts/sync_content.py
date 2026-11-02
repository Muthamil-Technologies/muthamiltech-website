"""Copy shared content into the website build.

- Guides (Study/Work facts) from japanone-poster/content/info/study_work.json, without the
  social captions.
- The daily five-kanji quiz from japtutor-mobile/marketing/jlpt_countdown/manifest5.json, the
  same set the 17:30 video uses each day.

Run from Website/: python3 scripts/sync_content.py
"""
import json
from pathlib import Path

MT = Path(__file__).resolve().parents[2]
OUT = Path(__file__).resolve().parents[1] / "src" / "data"

posts = json.loads((MT / "japanone-poster/content/info/study_work.json").read_text())
guides = [{k: v for k, v in p.items() if k != "captions"} for p in posts]
(OUT / "guides.json").write_text(json.dumps(guides, ensure_ascii=False, indent=1) + "\n")

days = json.loads((MT / "japtutor-mobile/marketing/jlpt_countdown/manifest5.json").read_text())
kanji = [{"date": d["date"], "level": d["level"], "words": [
    {k: w[k] for k in ("word", "reading", "meaning", "options", "answer_index")} for w in d["words"]]}
    for d in days]
(OUT / "dailyKanji.json").write_text(json.dumps(kanji, ensure_ascii=False, indent=1) + "\n")
print(f"{len(guides)} guides, {len(kanji)} kanji days")
