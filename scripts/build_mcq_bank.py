#!/usr/bin/env python3
"""
EBD 500-QUESTION MCQ BANK GENERATOR & VALIDATOR
Strictly grounded in the uploaded lecture files of Prof. Hadeel Farouk:
  - Lecture 1 (45 Qs): EBD_Lec_2.pdf (Slides 2–3: 5 A's Cycle & 5 Steps in EBD)
  - Lecture 2 (165 Qs): EBD_Lec_2.pdf (Slides 1–37: Research Question, Kombucha Scenario, Background vs Foreground, PICO/PICOT/PICOTS, Tables on Slides 16–17, FINER Criteria, Cases 1–5)
  - Lecture 3 (145 Qs): DOC-20261009-WA0017.pdf (Slides 1–18: Statement of Problem, Business vs Academic, 2-Step Strategy, 3 Parts, Vitamin D Example, Observational vs Clinical Trial, Slide 10 Phrasing, 5 Types of Questions: PO, PECO/PEO, PIRT, PICO/PIO)
  - Lecture 4 (145 Qs): DOC-20261016-WA0021.pdf (Slides 1–27: Sir William Osler Quote, Research Question vs Answer vs Hypothesis, Independent vs Dependent Variables, 3 Ways to Phrase, H0 vs H1/Ha, P-value <5%, Autism & 4 Table Examples, 10-Point Checklist, Simple/Complex/Statistical/Empirical/Directional/Non-Directional & 3 Study Examples)
"""

import json

questions = []

def add_q(lec, subtopic, qtype, diff, slide_ref, q_text, opts, correct_idx, exp, why_wrong):
    assert len(opts) == 4, f"Must have 4 options: {q_text}"
    assert len(set(opts)) == 4, f"Duplicate options in: {q_text} -> {opts}"
    assert 0 <= correct_idx <= 3
    qid = f"EBD-Q{len(questions)+1:03d}"
    questions.append({
        "id": qid,
        "number": len(questions) + 1,
        "lectureId": lec,
        "subtopic": subtopic,
        "questionType": qtype,
        "difficulty": diff,
        "slideRef": slide_ref,
        "question": q_text,
        "options": opts,
        "correctIndex": correct_idx,
        "correctLetter": ["A", "B", "C", "D"][correct_idx],
        "explanation": exp,
        "distractorRationale": why_wrong
    })

# ==============================================================================
# LECTURE 1: FOUNDATIONS & STEPS IN EVIDENCE-BASED DENTISTRY (45 QUESTIONS)
# Source: EBD_Lec_2.pdf (Slides 2–3)
# ==============================================================================

lec1_items = [
    # Topic 1A: The 5 A's Cycle (Slide 2)
    ("The 5 A's Cycle of EBD", "Definition & Recall", "easy", "EBD_Lec_2.pdf — Slide 2",
     "According to the 'Steps of Evidence-Based Dentistry' cycle diagram on Slide 2, which step is positioned at the very top and marked with a green arrow as the starting point?",
     ["Ask the question", "Acquire the evidence", "Appraise the evidence", "Apply the evidence"], 0,
     "Slide 2 illustrates the circular cycle of 'Steps of Evidence-Based Dentistry' starting at the top box 'Ask the question' (pointed to by a green arrow).",
     "Acquire, Appraise, and Apply follow sequentially clockwise after 'Ask the question'."),

    ("The 5 A's Cycle of EBD", "Sequence & Ordering", "easy", "EBD_Lec_2.pdf — Slide 2",
     "What is the exact clockwise sequence of the five boxes in the 'Steps of Evidence-Based Dentistry' cycle on Slide 2?",
     ["Ask the question → Acquire the evidence → Appraise the evidence → Apply the evidence → Assess the results",
      "Acquire the evidence → Ask the question → Appraise the evidence → Apply the evidence → Assess the results",
      "Ask the question → Appraise the evidence → Acquire the evidence → Assess the results → Apply the evidence",
      "Assess the results → Ask the question → Acquire the evidence → Apply the evidence → Appraise the evidence"], 0,
     "In Slide 2, the clockwise arrows move from 'Ask the question' to 'Acquire the evidence', then 'Appraise the evidence', then 'Apply the evidence', and finally 'Assess the results'.",
     "The other sequences reverse or scramble the clockwise order shown on Slide 2."),

    ("The 5 A's Cycle of EBD", "Sequence & Ordering", "easy", "EBD_Lec_2.pdf — Slide 2",
     "In the 'Steps of Evidence-Based Dentistry' diagram (Slide 2), which step immediately follows 'Ask the question'?",
     ["Acquire the evidence", "Appraise the evidence", "Apply the evidence", "Assess the results"], 0,
     "Following the clockwise arrow from 'Ask the question' leads directly to 'Acquire the evidence' (Step 2).",
     "Appraise is Step 3, Apply is Step 4, and Assess is Step 5."),

    ("The 5 A's Cycle of EBD", "Sequence & Ordering", "easy", "EBD_Lec_2.pdf — Slide 2",
     "In the 5 A's cycle of Evidence-Based Dentistry (Slide 2), which step immediately follows 'Acquire the evidence'?",
     ["Appraise the evidence", "Apply the evidence", "Assess the results", "Ask the question"], 0,
     "After acquiring the evidence (Step 2), the clinician must 'Appraise the evidence' (Step 3) before applying it.",
     "Apply is Step 4, Assess is Step 5, and Ask is Step 1."),

    ("The 5 A's Cycle of EBD", "Sequence & Ordering", "easy", "EBD_Lec_2.pdf — Slide 2",
     "In the 5 A's cycle of Evidence-Based Dentistry (Slide 2), which step comes immediately after 'Appraise the evidence'?",
     ["Apply the evidence", "Acquire the evidence", "Assess the results", "Ask the question"], 0,
     "Once the evidence has been appraised (Step 3), the next clockwise step in Slide 2 is 'Apply the evidence' (Step 4).",
     "Acquire precedes Appraise, while Assess follows Apply."),

    ("The 5 A's Cycle of EBD", "Sequence & Ordering", "easy", "EBD_Lec_2.pdf — Slide 2",
     "In the 'Steps of Evidence-Based Dentistry' cycle (Slide 2), which step comes immediately after 'Apply the evidence'?",
     ["Assess the results", "Acquire the evidence", "Appraise the evidence", "Ask the question"], 0,
     "After 'Apply the evidence' (Step 4), the fifth step on the left of the cycle is 'Assess the results'.",
     "Acquire is Step 2, Appraise is Step 3, and Ask is Step 1."),

    ("The 5 A's Cycle of EBD", "Comprehension", "medium", "EBD_Lec_2.pdf — Slide 2",
     "Why does the 'Steps of Evidence-Based Dentistry' diagram on Slide 2 depict an arrow pointing from 'Assess the results' back toward 'Ask the question'?",
     ["Because EBD is a continuous, iterative cycle where assessing results informs future clinical questions and improvements",
      "Because 'Assess the results' must always be performed before acquiring any evidence",
      "Because 'Ask the question' is the final step performed at the end of patient treatment",
      "Because clinical appraisal is skipped once results are assessed"], 0,
     "Slide 2 shows a continuous circular arrow connecting all 5 steps and returning from 'Assess the results' to 'Ask the question', reflecting continuous improvement.",
     "Assess is the 5th step, Ask is the 1st step, and appraisal is never skipped."),

    ("The 5 A's Cycle of EBD", "Terminology", "easy", "EBD_Lec_2.pdf — Slide 2",
     "In the Slide 2 diagram of Evidence-Based Dentistry, what is the exact noun phrase written underneath the verb 'Ask'?",
     ["the question", "the evidence", "the results", "the patient"], 0,
     "Slide 2 explicitly pairs each verb with its object: 'Ask the question', 'Acquire the evidence', 'Appraise the evidence', 'Apply the evidence', and 'Assess the results'.",
     "'the evidence' is paired with Acquire, Appraise, and Apply; 'the results' is paired with Assess."),

    ("The 5 A's Cycle of EBD", "Terminology", "easy", "EBD_Lec_2.pdf — Slide 2",
     "In the Slide 2 diagram of Evidence-Based Dentistry, what is the exact phrase written underneath the verb 'Assess'?",
     ["the results", "the evidence", "the question", "the literature"], 0,
     "The fifth box on Slide 2 reads: 'Assess / the results'.",
     "Acquire, Appraise, and Apply use 'the evidence', while Ask uses 'the question'."),

    ("The 5 A's Cycle of EBD", "Comparison", "medium", "EBD_Lec_2.pdf — Slide 2",
     "Which three verbs in the Slide 2 cycle of Evidence-Based Dentistry share the exact same object phrase 'the evidence'?",
     ["Acquire, Appraise, and Apply", "Ask, Acquire, and Appraise", "Appraise, Apply, and Assess", "Ask, Apply, and Assess"], 0,
     "On Slide 2, the three steps that act directly on 'the evidence' are 'Acquire the evidence', 'Appraise the evidence', and 'Apply the evidence'.",
     "Ask acts on 'the question', and Assess acts on 'the results'."),

    # Topic 1B: Detailed Steps in EBD (Slide 3)
    ("Detailed Steps in EBD", "Definition & Recall", "easy", "EBD_Lec_2.pdf — Slide 3",
     "According to Slide 3 ('Steps in EBD'), what is the first step in Evidence-Based Dentistry?",
     ["Formulate an answerable question.", "Track down the best evidence of outcomes available.", "Critically appraise the evidence.", "Apply the evidence."], 0,
     "Slide 3 lists 'Formulate an answerable question.' at the top as the first step in EBD.",
     "Tracking down, critically appraising, and applying evidence are Steps 2, 3, and 4 respectively."),

    ("Detailed Steps in EBD", "Definition & Recall", "easy", "EBD_Lec_2.pdf — Slide 3",
     "According to Slide 3 ('Steps in EBD'), what is the second step in Evidence-Based Dentistry?",
     ["Track down the best evidence of outcomes available.", "Formulate an answerable question.", "Critically appraise the evidence (ie find out how good it is).", "Evaluate the effectiveness and efficiency of the process."], 0,
     "After formulating an answerable question, the second step on Slide 3 is 'Track down the best evidence of outcomes available.'",
     "Formulating is Step 1, Critically appraising is Step 3, and Evaluating is Step 5."),

    ("Detailed Steps in EBD", "Definition & Recall", "easy", "EBD_Lec_2.pdf — Slide 3",
     "How does Slide 3 parenthetically define the third step, 'Critically appraise the evidence'?",
     ["(ie find out how good it is)", "(integrate the results with clinical expertise and patient values)", "(to improve next time)", "(formulate an answerable question)"], 0,
     "Slide 3 explicitly states: 'Critically appraise the evidence (ie find out how good it is).'",
     "Integrating results with expertise and patient values defines Step 4 (Apply), and 'to improve next time' defines Step 5 (Evaluate)."),

    ("Detailed Steps in EBD", "Definition & Recall", "easy", "EBD_Lec_2.pdf — Slide 3",
     "According to Slide 3, how is the fourth step ('Apply the evidence') defined?",
     ["Integrate the results with clinical expertise and patient values", "Find out how good the evidence is", "Track down the best evidence of outcomes available", "Evaluate the effectiveness and efficiency of the process"], 0,
     "Slide 3 defines Step 4 as: 'Apply the evidence (integrate the results with clinical expertise and patient values).'",
     "Finding out how good it is belongs to Step 3, tracking down evidence is Step 2, and evaluating effectiveness/efficiency is Step 5."),

    ("Detailed Steps in EBD", "Definition & Recall", "easy", "EBD_Lec_2.pdf — Slide 3",
     "According to Slide 3, what is the fifth and final step in the 'Steps in EBD' list?",
     ["Evaluate the effectiveness and efficiency of the process (to improve next time)",
      "Critically appraise the evidence (ie find out how good it is)",
      "Track down the best evidence of outcomes available",
      "Apply the evidence (integrate the results with clinical expertise and patient values)"], 0,
     "The fifth box on Slide 3 reads: 'Evaluate the effectiveness and efficiency of the process (to improve next time)'.",
     "The other options are Steps 3, 2, and 4 respectively."),

    ("Detailed Steps in EBD", "Comprehension", "medium", "EBD_Lec_2.pdf — Slide 3",
     "According to Slide 3, what is the stated goal of evaluating the effectiveness and efficiency of the EBD process in Step 5?",
     ["To improve next time", "To replace clinical expertise with statistical formulas", "To avoid formulating PICO questions in future cases", "To publish a stand-alone business document"], 0,
     "Slide 3 explicitly states the purpose in parentheses: 'Evaluate the effectiveness and efficiency of the process (to improve next time)'.",
     "EBD never replaces clinical expertise or avoids PICO formulation."),

    ("Detailed Steps in EBD", "Concept Mapping", "medium", "EBD_Lec_2.pdf — Slides 2–3",
     "When comparing Slide 2 (the 5 A's diagram) and Slide 3 ('Steps in EBD'), 'Acquire the evidence' corresponds to which statement on Slide 3?",
     ["Track down the best evidence of outcomes available.",
      "Formulate an answerable question.",
      "Critically appraise the evidence (ie find out how good it is).",
      "Evaluate the effectiveness and efficiency of the process (to improve next time)."], 0,
     "Step 2 in the 5 A's diagram ('Acquire the evidence') directly maps to Step 2 in the text list ('Track down the best evidence of outcomes available.').",
     "Formulate is Step 1 (Ask), Critically appraise is Step 3 (Appraise), and Evaluate is Step 5 (Assess)."),

    ("Detailed Steps in EBD", "Concept Mapping", "medium", "EBD_Lec_2.pdf — Slides 2–3",
     "When comparing Slide 2 and Slide 3, 'Ask the question' corresponds to which detailed step?",
     ["Formulate an answerable question.",
      "Track down the best evidence of outcomes available.",
      "Critically appraise the evidence (ie find out how good it is).",
      "Apply the evidence (integrate the results with clinical expertise and patient values)."], 0,
     "'Ask the question' (Step 1 on Slide 2) corresponds to 'Formulate an answerable question.' (Step 1 on Slide 3).",
     "The other choices correspond to Acquire, Appraise, and Apply."),

    ("Detailed Steps in EBD", "Concept Mapping", "medium", "EBD_Lec_2.pdf — Slides 2–3",
     "When comparing Slide 2 and Slide 3, 'Assess the results' in the 5 A's cycle corresponds to which detailed step on Slide 3?",
     ["Evaluate the effectiveness and efficiency of the process (to improve next time)",
      "Critically appraise the evidence (ie find out how good it is)",
      "Track down the best evidence of outcomes available",
      "Formulate an answerable question"], 0,
     "'Assess the results' (Step 5 on Slide 2) corresponds to 'Evaluate the effectiveness and efficiency of the process (to improve next time)' (Step 5 on Slide 3).",
     "Critically appraising the evidence is Step 3 ('Appraise the evidence')."),

    ("Detailed Steps in EBD", "Distinction", "medium", "EBD_Lec_2.pdf — Slide 3",
     "What is the key distinction between Step 3 ('Critically appraise the evidence') and Step 5 ('Evaluate the effectiveness and efficiency of the process') on Slide 3?",
     ["Step 3 judges how good the scientific evidence is before applying it, whereas Step 5 evaluates how effectively and efficiently the clinician executed the EBD process to improve next time",
      "Step 3 is performed after patient treatment, whereas Step 5 is performed before searching PubMed",
      "Step 3 integrates patient values, whereas Step 5 formulates the initial PICO question",
      "Step 3 only applies to business projects, whereas Step 5 only applies to laboratory studies"], 0,
     "Slide 3 defines Step 3 as finding out how good the evidence is, and Step 5 as evaluating the effectiveness and efficiency of the process to improve next time.",
     "Step 3 happens before Step 4 (Apply), and Step 4 is where patient values and clinical expertise are integrated."),

    ("Detailed Steps in EBD", "Application", "medium", "EBD_Lec_2.pdf — Slide 3",
     "A dentist reads a published clinical trial and carefully checks its methodology and validity to 'find out how good it is.' Which step of EBD is the dentist performing?",
     ["Step 3: Critically appraise the evidence", "Step 2: Track down the best evidence of outcomes available", "Step 4: Apply the evidence", "Step 5: Evaluate the effectiveness and efficiency of the process"], 0,
     "Slide 3 defines 'Critically appraise the evidence' specifically as '(ie find out how good it is)'.",
     "Tracking down is finding the paper (Step 2), applying is clinical integration (Step 4), and evaluating the process is Step 5."),

    ("Detailed Steps in EBD", "Application", "medium", "EBD_Lec_2.pdf — Slide 3",
     "A dentist combines the findings of a systematic review with her own surgical skill and the patient's preference regarding treatment cost and comfort. Which step of EBD is she performing?",
     ["Step 4: Apply the evidence", "Step 1: Formulate an answerable question", "Step 2: Track down the best evidence of outcomes available", "Step 3: Critically appraise the evidence"], 0,
     "Slide 3 states: 'Apply the evidence (integrate the results with clinical expertise and patient values).'",
     "Steps 1, 2, and 3 occur prior to integrating the evidence with clinical expertise and patient values."),

    ("Detailed Steps in EBD", "Application", "medium", "EBD_Lec_2.pdf — Slide 3",
     "According to Slide 3, what three components must be integrated when applying evidence in clinical practice?",
     ["The evidence results, clinical expertise, and patient values",
      "The null hypothesis, alternative hypothesis, and p-value",
      "The research background, research significance, and solution",
      "The index test, reference test, and target condition"], 0,
     "Slide 3 explicitly states: 'Apply the evidence (integrate the results with clinical expertise and patient values).'",
     "Null/alternative hypotheses belong to statistical testing (Lec 4); background/significance/solution belong to the problem statement (Lec 3); PIRT belongs to diagnosis questions (Lec 3)."),

    ("Detailed Steps in EBD", "Comprehension", "hard", "EBD_Lec_2.pdf — Slide 3",
     "If a clinician locates a high-quality study on PubMed and immediately forces the treatment on a patient without considering the patient's preferences or the clinician's own clinical expertise, which EBD step on Slide 3 was violated?",
     ["Apply the evidence (which requires integrating results with clinical expertise and patient values)",
      "Formulate an answerable question",
      "Track down the best evidence of outcomes available",
      "Critically appraise the evidence"], 0,
     "Slide 3 specifies that applying the evidence requires integrating the results with BOTH clinical expertise and patient values.",
     "The question was already formulated, the study was tracked down, and its quality was known, so Step 4 (Apply) was the step violated."),

    ("Detailed Steps in EBD", "Recall", "medium", "EBD_Lec_2.pdf — Slide 3",
     "In Step 2 of 'Steps in EBD' (Slide 3), the clinician tracks down the best evidence of what specific aspect available?",
     ["Outcomes", "Hypotheses", "Textbooks", "Anecdotes"], 0,
     "Slide 3 states verbatim: 'Track down the best evidence of outcomes available.'",
     "Hypotheses, textbooks, and anecdotes are not the term used in Step 2 on Slide 3."),

    ("Detailed Steps in EBD", "Recall", "medium", "EBD_Lec_2.pdf — Slide 3",
     "In Step 5 of 'Steps in EBD' (Slide 3), which two qualities of the EBD process are evaluated to improve next time?",
     ["Effectiveness and efficiency", "Prevalence and incidence", "Sensitivity and specificity", "Feasibility and novelty"], 0,
     "Slide 3 states verbatim: 'Evaluate the effectiveness and efficiency of the process (to improve next time)'.",
     "Prevalence/incidence are epidemiological measures; feasibility/novelty are FINER criteria."),

    ("Detailed Steps in EBD", "Comprehension", "easy", "EBD_Lec_2.pdf — Slide 3",
     "Why does Step 1 of EBD specify formulating an 'answerable' question rather than any general question?",
     ["Because a focused, answerable question allows the clinician to track down and appraise specific evidence of outcomes",
      "Because unanswerable questions are preferred for clinical trials",
      "Because answerable questions do not require literature searches",
      "Because answerable questions eliminate the need for patient values"], 0,
     "As shown across Slides 3, 10, and 12 of EBD_Lec_2, framing an answerable question is the key first step that enables searching for specific evidence of outcomes.",
     "Answerable questions still require searching and integrating patient values."),

    ("Detailed Steps in EBD", "Application", "medium", "EBD_Lec_2.pdf — Slides 2–3",
     "A dental student finishes treating a patient using an evidence-based protocol and reflects on whether her literature search and clinical application were effective and efficient so she can do better on future cases. Which EBD step is this?",
     ["Step 5: Assess the results / Evaluate the effectiveness and efficiency of the process",
      "Step 1: Ask the question / Formulate an answerable question",
      "Step 2: Acquire the evidence / Track down the best evidence",
      "Step 3: Appraise the evidence / Critically appraise the evidence"], 0,
     "Reflecting on the effectiveness and efficiency of the process 'to improve next time' is the exact definition of Step 5 on Slide 3 ('Assess the results' on Slide 2).",
     "Steps 1, 2, and 3 occur before clinical application."),

    ("Detailed Steps in EBD", "Application", "easy", "EBD_Lec_2.pdf — Slides 2–3",
     "Searching PubMed to find recent clinical studies on acidic drinks and enamel wear corresponds to which step in the 5 A's cycle?",
     ["Acquire the evidence", "Ask the question", "Apply the evidence", "Assess the results"], 0,
     "Searching PubMed to track down available studies is 'Acquire the evidence' (Step 2).",
     "Ask is formulating the question, Apply is clinical treatment integration, and Assess is post-application evaluation."),

    ("Detailed Steps in EBD", "Sequence & Ordering", "medium", "EBD_Lec_2.pdf — Slide 3",
     "Which step in EBD must occur IMMEDIATELY before 'Apply the evidence (integrate the results with clinical expertise and patient values)'?",
     ["Critically appraise the evidence (ie find out how good it is)",
      "Formulate an answerable question",
      "Track down the best evidence of outcomes available",
      "Evaluate the effectiveness and efficiency of the process (to improve next time)"], 0,
     "According to Slide 3, Step 3 ('Critically appraise the evidence') immediately precedes Step 4 ('Apply the evidence').",
     "You must never apply evidence before critically appraising how good it is."),

    ("Detailed Steps in EBD", "Sequence & Ordering", "medium", "EBD_Lec_2.pdf — Slide 3",
     "Which step in EBD must occur IMMEDIATELY after 'Formulate an answerable question'?",
     ["Track down the best evidence of outcomes available",
      "Critically appraise the evidence (ie find out how good it is)",
      "Apply the evidence (integrate the results with clinical expertise and patient values)",
      "Evaluate the effectiveness and efficiency of the process"], 0,
     "On Slide 3, Step 1 is 'Formulate an answerable question.' and Step 2 is 'Track down the best evidence of outcomes available.'",
     "Appraise is Step 3, Apply is Step 4, and Evaluate is Step 5."),

    ("Detailed Steps in EBD", "Comprehension", "medium", "EBD_Lec_2.pdf — Slides 2–3",
     "In Slide 2 of EBD_Lec_2.pdf, why is there a bright green arrow pointing specifically to the 'Ask the question' box?",
     ["Because Lecture 2 focuses specifically on Step 1 of EBD: formulating the Research Question",
      "Because 'Ask the question' is the only step in EBD that requires statistical software",
      "Because 'Ask the question' is the final step of the EBD cycle",
      "Because the other four steps of EBD are optional in dentistry"], 0,
     "EBD_Lec_2.pdf is titled 'RESEARCH QUESTION', and Slide 2 highlights 'Ask the question' with a green arrow to show where the lecture's topic sits as Step 1 of the EBD cycle.",
     "All 5 steps are essential in EBD, and 'Ask the question' is Step 1, not the final step."),

    ("Detailed Steps in EBD", "Concept Check", "easy", "EBD_Lec_2.pdf — Slide 3",
     "How many total steps are listed in the 'Steps in EBD' flowchart on Slide 3?",
     ["5 steps", "3 steps", "4 steps", "10 steps"], 0,
     "Both Slide 2 (the 5 A's cycle) and Slide 3 ('Steps in EBD') present exactly 5 steps.",
     "3 parts belong to the Problem Statement (Lec 3), 4 components belong to PICO, and 10 points belong to the Hypothesis Checklist (Lec 4)."),

    ("Detailed Steps in EBD", "Distinction", "medium", "EBD_Lec_2.pdf — Slide 3",
     "Which of the following is NOT one of the three elements integrated during Step 4 ('Apply the evidence') on Slide 3?",
     ["The publisher's subscription fee", "The results of the evidence", "Clinical expertise", "Patient values"], 0,
     "Slide 3 specifies integrating: (1) the results, (2) clinical expertise, and (3) patient values.",
     "Publisher subscription fees have nothing to do with clinical integration in Step 4."),

    ("Detailed Steps in EBD", "Application", "medium", "EBD_Lec_2.pdf — Slide 3",
     "When a dentist converts a patient's complaint about recurrent caries into a structured PICO question, which step of EBD is being executed?",
     ["Step 1: Formulate an answerable question", "Step 2: Track down the best evidence of outcomes available", "Step 3: Critically appraise the evidence", "Step 4: Apply the evidence"], 0,
     "Converting a clinical problem into a structured PICO question is Step 1: 'Formulate an answerable question.'",
     "Steps 2, 3, and 4 follow after the question is formulated."),

    ("Detailed Steps in EBD", "Application", "medium", "EBD_Lec_2.pdf — Slide 3",
     "Determining whether a published dental study is trustworthy and free from major bias corresponds to which parenthetical explanation on Slide 3?",
     ["(ie find out how good it is)", "(to improve next time)", "(integrate the results with clinical expertise and patient values)", "(track down the best evidence)"], 0,
     "Checking the quality and validity of evidence is Step 3: 'Critically appraise the evidence (ie find out how good it is).'",
     "'to improve next time' is Step 5, and 'integrate the results...' is Step 4."),

    ("Detailed Steps in EBD", "Recall", "easy", "EBD_Lec_2.pdf — Slide 2",
     "What is the central title written inside the circular arrows on Slide 2 of EBD_Lec_2.pdf?",
     ["Steps of Evidence-Based Dentistry", "Types of Research Hypothesis", "Three Important Parts of the Problem Statement", "FINER Evaluation Criteria"], 0,
     "The center of the cycle on Slide 2 reads: 'Steps of Evidence-Based Dentistry'.",
     "The other titles belong to other slides/lectures."),

    ("Detailed Steps in EBD", "Comprehension", "medium", "EBD_Lec_2.pdf — Slides 2–3",
     "Why must 'Critically appraise the evidence' (Step 3) take place BEFORE 'Apply the evidence' (Step 4)?",
     ["Because a dentist must first find out how good and reliable the evidence is before integrating its results into patient care",
      "Because patient values can only be measured before reading any research paper",
      "Because appraising the evidence automatically writes the research question",
      "Because clinical expertise is only used during literature database indexing"], 0,
     "In the EBD sequence (Slides 2–3), you must evaluate how good the evidence is (Step 3) before you apply it to patients (Step 4).",
     "Applying flawed or unappraised evidence could harm patients."),

    ("Detailed Steps in EBD", "Recall", "easy", "EBD_Lec_2.pdf — Slide 3",
     "In Slide 3, complete the missing word in Step 1: 'Formulate an __________ question.'",
     ["answerable", "unanswerable", "observational", "ambiguous"], 0,
     "Slide 3 states verbatim: 'Formulate an answerable question.'",
     "Questions in EBD must be answerable, specific, and focused."),

    ("Detailed Steps in EBD", "Recall", "easy", "EBD_Lec_2.pdf — Slide 3",
     "In Slide 3, complete the missing word in Step 3: 'Critically __________ the evidence (ie find out how good it is).'",
     ["appraise", "acquire", "ignore", "fabricate"], 0,
     "Slide 3 states verbatim: 'Critically appraise the evidence (ie find out how good it is).'",
     "Acquire is Step 2; ignore and fabricate are incorrect."),

    ("Detailed Steps in EBD", "Recall", "easy", "EBD_Lec_2.pdf — Slide 3",
     "In Slide 3, complete the missing word in Step 4: 'Apply the evidence (__________ the results with clinical expertise and patient values).'",
     ["integrate", "replace", "separate", "contrast"], 0,
     "Slide 3 states verbatim: 'Apply the evidence (integrate the results with clinical expertise and patient values).'",
     "EBD integrates rather than separates or replaces these three elements."),

    ("Detailed Steps in EBD", "Recall", "easy", "EBD_Lec_2.pdf — Slide 3",
     "In Slide 3, complete the missing words in Step 5: 'Evaluate the __________ and __________ of the process (to improve next time).'",
     ["effectiveness / efficiency", "prevalence / incidence", "null / alternative", "background / foreground"], 0,
     "Slide 3 states verbatim: 'Evaluate the effectiveness and efficiency of the process (to improve next time)'.",
     "The other pairs belong to epidemiology, hypothesis testing, and question types."),

    ("Detailed Steps in EBD", "Comprehensive Synthesis", "medium", "EBD_Lec_2.pdf — Slides 2–3",
     "Which row correctly pairs all five 'A' verbs from Slide 2 with their action descriptions from Slide 3?",
     ["Ask = Formulate question | Acquire = Track down evidence | Appraise = Find out how good it is | Apply = Integrate with expertise & patient values | Assess = Evaluate effectiveness & efficiency",
      "Ask = Track down evidence | Acquire = Formulate question | Appraise = Apply to patient | Apply = Find out how good it is | Assess = Write hypothesis",
      "Ask = Evaluate process | Acquire = Appraise quality | Appraise = Track down evidence | Apply = Formulate question | Assess = Integrate patient values",
      "Ask = Formulate question | Acquire = Find out how good it is | Appraise = Track down evidence | Apply = Evaluate process | Assess = Integrate expertise"], 0,
     "Comparing Slide 2 and Slide 3 directly confirms: 1. Ask = Formulate an answerable question; 2. Acquire = Track down the best evidence; 3. Appraise = Critically appraise (find out how good it is); 4. Apply = Integrate results with clinical expertise and patient values; 5. Assess = Evaluate effectiveness and efficiency.",
     "All other rows swap the definitions of the steps."),

    ("Detailed Steps in EBD", "Application", "medium", "EBD_Lec_2.pdf — Slides 3–5",
     "When a dentist notices a frustrating clinical trend in daily practice (such as severe tooth sensitivity and enamel wear) and turns that observation into a structured clinical question, which transition is taking place?",
     ["Moving from clinical observation into Step 1 of EBD ('Ask the question / Formulate an answerable question')",
      "Moving directly from Step 5 ('Assess the results') to Step 3 ('Appraise the evidence')",
      "Skipping literature search to perform statistical hypothesis testing",
      "Replacing patient values with laboratory in-vitro testing"], 0,
     "Slides 2–5 show how daily/clinical observation leads into formulating a research/clinical question (Step 1 of EBD).",
     "No steps are skipped or reversed."),

    ("Detailed Steps in EBD", "Comprehension", "medium", "EBD_Lec_2.pdf — Slide 3",
     "In Step 4 of EBD ('Apply the evidence'), why is 'patient values' explicitly included alongside 'the results' and 'clinical expertise'?",
     ["Because evidence-based dental care must respect the individual patient's preferences, needs, and values when making clinical decisions",
      "Because patients are responsible for calculating the p-value of the study",
      "Because patient values determine whether a study is cross-sectional or longitudinal",
      "Because patient values replace the need for critical appraisal of the evidence"], 0,
     "Slide 3 emphasizes that applying evidence is not automatic; it requires integrating research results with the dentist's clinical expertise and the patient's values.",
     "Patients do not calculate p-values or replace critical appraisal.")
]

for item in lec1_items:
    add_q(1, *item)

print(f"Lecture 1 count: {len(questions)}")
