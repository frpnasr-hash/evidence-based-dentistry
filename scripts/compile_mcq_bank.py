#!/usr/bin/env python3
"""
Combines and validates all 500 EBD MCQ questions across Lectures 1–4,
randomizes option positions deterministically so correct answers are balanced across A/B/C/D,
verifies zero duplicate questions or options, builds a topic coverage map,
and writes assets/js/ebd-mcq-bank.js.
"""

import json
import random
import sys
from collections import Counter, defaultdict
from pathlib import Path

# Resolve all paths relative to the repository root (scripts/ -> project root),
# so the build works identically on any machine / CI (e.g. Vercel) regardless of cwd.
SCRIPT_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = SCRIPT_DIR.parent
OUT_PATH = PROJECT_ROOT / "assets" / "js" / "ebd-mcq-bank.js"

# Ensure sibling question modules are importable even if invoked from another cwd.
if str(SCRIPT_DIR) not in sys.path:
    sys.path.insert(0, str(SCRIPT_DIR))

from build_mcq_bank import lec1_items
from lec2_questions import LEC2_ITEMS
from lec3_questions import LEC3_ITEMS
from lec4_questions import LEC4_ITEMS

random.seed(20261017)

all_raw = []
for item in lec1_items:
    all_raw.append((1, *item))
for item in LEC2_ITEMS:
    all_raw.append((2, *item))
for item in LEC3_ITEMS:
    all_raw.append((3, *item))
for item in LEC4_ITEMS:
    all_raw.append((4, *item))

assert len(all_raw) == 500, f"Expected 500 questions, got {len(all_raw)}"

seen_q_texts = set()
final_questions = []
coverage_map = defaultdict(lambda: {"count": 0, "subtopics": defaultdict(int)})

for idx, (lec, subtopic, qtype, diff, slide_ref, q_text, opts, correct_idx, exp, why_wrong) in enumerate(all_raw, start=1):
    norm_q = " ".join(q_text.lower().split())
    if norm_q in seen_q_texts:
        raise ValueError(f"Duplicate question text at #{idx}: {q_text}")
    seen_q_texts.add(norm_q)

    assert len(opts) == 4, f"Question #{idx} does not have 4 options"
    assert len(set(opts)) == 4, f"Question #{idx} has duplicate options: {opts}"

    correct_ans = opts[correct_idx]
    # Shuffle options deterministically so correct answers are evenly distributed across A, B, C, D
    shuffled_opts = list(opts)
    random.shuffle(shuffled_opts)
    new_correct_idx = shuffled_opts.index(correct_ans)
    correct_letter = ["A", "B", "C", "D"][new_correct_idx]

    coverage_map[lec]["count"] += 1
    coverage_map[lec]["subtopics"][subtopic] += 1

    final_questions.append({
        "id": f"EBD-Q{idx:03d}",
        "number": idx,
        "lectureId": lec,
        "subtopic": subtopic,
        "questionType": qtype,
        "difficulty": diff,
        "slideRef": slide_ref,
        "question": q_text,
        "options": shuffled_opts,
        "correctIndex": new_correct_idx,
        "correctLetter": correct_letter,
        "explanation": exp,
        "distractorRationale": why_wrong
    })

letter_dist = Counter(q["correctLetter"] for q in final_questions)
diff_dist = Counter(q["difficulty"] for q in final_questions)
lec_dist = Counter(q["lectureId"] for q in final_questions)

print("=== VALIDATION SUMMARY ===")
print(f"Total Questions: {len(final_questions)}")
print(f"Unique Question Texts: {len(seen_q_texts)}")
print(f"Distribution by Lecture: {dict(lec_dist)}")
print(f"Distribution by Difficulty: {dict(diff_dist)}")
print(f"Distribution by Correct Option Letter: {dict(letter_dist)}")

coverage_summary = {}
for lec, data in sorted(coverage_map.items()):
    coverage_summary[str(lec)] = {
        "totalQuestions": data["count"],
        "subtopics": dict(data["subtopics"])
    }
    print(f"\nLecture {lec} ({data['count']} Qs):")
    for st, cnt in data["subtopics"].items():
        print(f"  - {st}: {cnt} Qs")

out_path = OUT_PATH
out_path.parent.mkdir(parents=True, exist_ok=True)
with out_path.open("w", encoding="utf-8") as f:
    f.write("/* ═══════════════════════════════════════════════════════════════════════════\n")
    f.write("   EBD EXAM & MCQ CENTER — 500 VERIFIED UNIVERSITY MCQ BANK\n")
    f.write("   100% Strictly Sourced from Prof. Hadeel Farouk's Lecture PDFs:\n")
    f.write("     - Lecture 1 (45 Qs): EBD_Lec_2.pdf (Slides 2–3: Steps in EBD & 5 A's Cycle)\n")
    f.write("     - Lecture 2 (190 Qs): EBD_Lec_2.pdf (Slides 1–37: Research Question, PICO, FINER, Cases 1–5)\n")
    f.write("     - Lecture 3 (135 Qs): DOC-20261009-WA0017.pdf (Slides 1–18: Statement of Problem, PO, PECO, PIRT, PICO)\n")
    f.write("     - Lecture 4 (130 Qs): DOC-20261016-WA0021.pdf (Slides 1–27: Research Hypothesis, Variables, H0/H1, P-value, Checklist, Types)\n")
    f.write("   ═══════════════════════════════════════════════════════════════════════════ */\n\n")
    f.write("window.EBD_MCQ_COVERAGE = ")
    f.write(json.dumps(coverage_summary, ensure_ascii=False, indent=2))
    f.write(";\n\n")
    f.write("window.EBD_MCQ_BANK = ")
    f.write(json.dumps(final_questions, ensure_ascii=False, indent=2))
    f.write(";\n")

print(f"\nSuccessfully wrote {out_path}")
