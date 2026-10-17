/* ═══════════════════════════════════════════════════════════════════════════
   EBD UNDERSTANDING STUDIO — COMPLETE CURRICULUM DATA LAYER
   Strictly extracted from the uploaded lecture files of Prof. Hadeel Farouk:
     - Lecture 1: Foundations & Steps of Evidence-Based Dentistry (from EBD_Lec_2 Slides 2-3 & Revision doc; standalone Lec 1 PDF noted as pending upload)
     - Lecture 2: Research Question (EBD_Lec_2.pdf — 37 Slides)
     - Lecture 3: Statement of Problem & Types of Research Questions (DOC-20261009-WA0017.pdf — 18 Slides)
     - Lecture 4: Research Hypothesis (DOC-20261016-WA0021.pdf — 27 Slides)
   ═══════════════════════════════════════════════════════════════════════════ */

window.EBD_COURSE_META = {
  courseCode: "EBD-2026",
  courseTitle: "Evidence-Based Dentistry (EBD)",
  arabicTitle: "طب الأسنان المبني على الدليل العلمي",
  instructor: "Prof. Hadeel Farouk",
  instructorRole: "Professor of Conservative Dentistry",
  department: "Conservative & Restorative Dentistry / Evidence-Based Dentistry",
  academicYear: "2026 / 2027",
  totalLectures: 4,
  uploadedPdfCount: 3,
  totalMcqQuestions: 500,
  missingFileAlert: {
    hasMissingFile: true,
    missingLectureNumber: 1,
    missingLectureNote: "تم إرفاق 3 ملفات PDF رسمية للمحاضرات: (1) EBD_Lec_2.pdf بعنوان Research Question، (2) DOC-20261009-WA0017.pdf بعنوان Statement of Problem (المحاضرة الثالثة حسب نموذج الحضور المدمج في الشريحة 17)، (3) DOC-20261016-WA0021.pdf بعنوان Research Hypothesis (المحاضرة الرابعة). أما الملف المستقل للمحاضرة الأولى (Introduction to Evidence-Based Dentistry) فلم يكن ضمن المرفقات الثلاثة، ولذلك تم بناء محتوى المحاضرة الأولى هنا اعتمادًا فقط على الأساسيات والخطوات الخمس (Steps in EBD & 5 A's Cycle) الواردة فعليًا في مقدمة ملف EBD_Lec_2.pdf (الشرائح 2–3) دون اختلاق أي محتوى خارجي، مع إتاحة إرفاق ملف المحاضرة الأولى المستقل لاستكماله."
  }
};

window.EBD_LECTURES = [
  /* ═══════════════════════════════════════════════════════════════════════
     LECTURE 1: FOUNDATIONS & STEPS OF EVIDENCE-BASED DENTISTRY
     ═══════════════════════════════════════════════════════════════════════ */
  {
    id: 1,
    code: "LEC-01",
    title: "Foundations & Steps in Evidence-Based Dentistry (EBD)",
    arabicTitle: "أسس وخطوات طب الأسنان المبني على الدليل (5 A's & Steps in EBD)",
    instructor: "Prof. Hadeel Farouk",
    sourceFile: "EBD_Lec_2.pdf (Slides 2–3: Steps in EBD & 5 A's Cycle) + Course Introduction",
    pdfUrl: "assets/pdfs/EBD_Lec_2_Research_Question.pdf",
    slideCount: "Slides 2–3 (Core EBD Cycle in EBD_Lec_2.pdf) — Standalone Lec 1 PDF Pending",
    status: "core-extracted",
    statusBadge: "مستخرج من مقدمة EBD_Lec_2 (بانتظار ملف المحاضرة 1 المستقل)",
    mcqCount: 45,
    estimatedStudyTime: "25 دقيقة",
    overview: {
      summaryEn: "Evidence-Based Dentistry (EBD) is a systematic clinical process that begins with asking an answerable clinical question, tracking down the best available evidence of outcomes, critically appraising the validity and usefulness of that evidence, applying the results in integration with clinical expertise and patient values, and finally evaluating the effectiveness and efficiency of the process.",
      summaryAr: "يمثل طب الأسنان المبني على الدليل (EBD) منهجية علمية وإكلينيكية متكاملة تربط بين البحث العلمي والممارسة اليومية لطبيب الأسنان. وفقًا لما ورد في شرائح أ.د. هديل فاروق (EBD_Lec_2 الشرائح 2 و3)، يقوم EBD على خمس خطوات متتابعة في حلقة مستمرة تُعرف بدائرة الـ 5 A's: (Ask, Acquire, Appraise, Apply, Assess).",
      learningObjectives: [
        "Understand the 5 sequential steps in Evidence-Based Dentistry (Steps in EBD).",
        "Map each step of EBD to the 5 A's visual cycle (Ask, Acquire, Appraise, Apply, Assess).",
        "Recognize the three pillars integrated during the 'Apply' step: evidence results, clinical expertise, and patient values.",
        "Understand why 'Ask the question' (Formulating an answerable question) is highlighted as the foundational first step.",
        "Distinguish between critically appraising evidence (finding out how good it is) and evaluating the EBD process itself (effectiveness and efficiency to improve next time)."
      ],
      slideImages: [
        {
          src: "assets/slides/lec2_slide2_5As_cycle.png",
          caption: "Slide 2 (EBD_Lec_2.pdf): Steps of Evidence-Based Dentistry — The 5 A's Cycle (Ask, Acquire, Appraise, Apply, Assess)"
        }
      ]
    },
    sections: [
      {
        id: "lec1-sec1",
        title: "1. The 5 A's Cycle of Evidence-Based Dentistry (Slide 2)",
        slideRef: "EBD_Lec_2.pdf — Slide 2",
        contentEn: [
          "Step 1: Ask the question (highlighted with the green arrow as the starting point of the cycle).",
          "Step 2: Acquire the evidence.",
          "Step 3: Appraise the evidence.",
          "Step 4: Apply the evidence.",
          "Step 5: Assess the results."
        ],
        explanationAr: "توضح الشريحة الثانية في ملف المحاضرة مخططًا دائريًا (Cycle) لخطوات طب الأسنان المبني على الدليل، وتبدأ السلسلة من القمة عند (Ask the question) المشار إليها بالسهم الأخضر، ثم تتجه مع عقارب الساعة إلى (Acquire the evidence)، ثم (Appraise the evidence)، ثم (Apply the evidence)، وأخيرًا (Assess the results) لتعود الحلقة من جديد لتحسين الممارسة.",
        keyTakeaway: "Always remember the exact clockwise order of the 5 A's: Ask → Acquire → Appraise → Apply → Assess."
      },
      {
        id: "lec1-sec2",
        title: "2. Detailed Steps in EBD & Their Exact Definitions (Slide 3)",
        slideRef: "EBD_Lec_2.pdf — Slide 3",
        contentEn: [
          "1. Formulate an answerable question.",
          "2. Track down the best evidence of outcomes available.",
          "3. Critically appraise the evidence (i.e., find out how good it is).",
          "4. Apply the evidence (integrate the results with clinical expertise and patient values).",
          "5. Evaluate the effectiveness and efficiency of the process (to improve next time)."
        ],
        explanationAr: "في الشريحة الثالثة، تفصّل د. هديل فاروق المقصود الدقيق بكل خطوة من الخطوات الخمس:\n• الخطوة الأولى (Formulate): صياغة سؤال إكلينيكي قابل للإجابة (وهو محور المحاضرة الثانية).\n• الخطوة الثانية (Track down): البحث والوصول إلى أفضل دليل علمي متاح حول النتائج (Outcomes).\n• الخطوة الثالثة (Critically appraise): التقييم النقدي للدليل العلمي لمعرفة مدى جودته وموثوقيته (find out how good it is).\n• الخطوة الرابعة (Apply): تطبيق الدليل عمليًا من خلال دمج نتائج البحث مع الخبرة الإكلينيكية للطبيب (Clinical expertise) وقيم وتفضيلات المريض (Patient values).\n• الخطوة الخامسة (Evaluate): تقييم فعالية وكفاءة العملية ككل (Effectiveness and efficiency) بهدف التحسين في المرات القادمة.",
        keyTakeaway: "Applying evidence does NOT mean blindly following a paper; it requires integrating (1) research results, (2) clinical expertise, and (3) patient values."
      },
      {
        id: "lec1-sec3",
        title: "3. Bridging Clinical Practice and Scientific Literature (Slides 4–9)",
        slideRef: "EBD_Lec_2.pdf — Slides 4–9",
        contentEn: [
          "How a dentist transitions from daily practice to EBD inquiry: Clinical observation, reading dental literature (e.g., PubMed), attending scientific meetings/conferences, and discussions with colleagues.",
          "Critical thinking synthesizes these observations to identify a 'gap in the literature' and formulate an answerable question."
        ],
        explanationAr: "توضح المحاضرة كيف ينتقل طبيب الأسنان من مجرد ملاحظة مشكلة متكررة في العيادة إلى ممارس للطب المبني على الدليل: يبدأ بالملاحظة اليومية، يناقش زملاءه، يبحث في قواعد البيانات مثل PubMed، يحضر المؤتمرات العلمية، ثم يُعمل التفكير النقدي (Critical Thinking) لاكتشاف الفجوة في الأدبيات العلمية (Gap in the literature).",
        keyTakeaway: "PubMed is explicitly cited in the lecture slides as the primary dental literature search engine used when reading to expand knowledge."
      }
    ],
    difficultConcepts: [
      {
        title: "الفرق بين Appraise the Evidence و Assess/Evaluate the Process",
        difficulty: "متوسط — موضع سؤال امتحاني متكرر",
        curriculumFact: "In Slide 3: 'Critically appraise the evidence (ie find out how good it is)' is Step 3, whereas 'Evaluate the effectiveness and efficiency of the process (to improve next time)' is Step 5.",
        explanationAr: "يخلط كثير من الطلاب بين الخطوة الثالثة والخطوة الخامسة:\n• الخطوة الثالثة (Appraise the evidence): تقيس جودة البحث أو الدليل العلمي نفسه قبل تطبيقه.\n• الخطوة الخامسة (Evaluate/Assess): تأتي بعد التطبيق، وتقيس فعالية وكفاءة خطواتك أنت كطبيب في تطبيق العملية كاملة لتطوير أدائك في المرة القادمة."
      },
      {
        title: "الركائز الثلاث في خطوة التطبيق (Apply the Evidence)",
        difficulty: "أساسي ومهم جدًا",
        curriculumFact: "Apply the evidence (integrate the results with clinical expertise and patient values).",
        explanationAr: "تطبيق الدليل في EBD لا يعتمد على نتائج الأبحاث وحدها، بل يشترط دمج (Integrate) ثلاثة عناصر معًا: نتائج الدليل العلمي (Results) + الخبرة الإكلينيكية للطبيب (Clinical expertise) + قيم المريض (Patient values)."
      }
    ],
    comparisons: [
      {
        title: "مقارنة بين مصطلحات دائرة الـ 5 A's (Slide 2) والخطوات التفصيلية (Slide 3)",
        headers: ["الترتيب", "مصطلح الـ 5 A's (Slide 2)", "العبارة المقابلة في Steps in EBD (Slide 3)", "الهدف الأساسي في المنهج"],
        rows: [
          ["Step 1", "Ask the question", "Formulate an answerable question", "تحويل المشكلة الإكلينيكية إلى سؤال محدد (PICO)"],
          ["Step 2", "Acquire the evidence", "Track down the best evidence of outcomes available", "البحث في قواعد البيانات (مثل PubMed) عن أفضل دليل"],
          ["Step 3", "Appraise the evidence", "Critically appraise the evidence (ie find out how good it is)", "فحص جودة وموثوقية الدراسة العلمية"],
          ["Step 4", "Apply the evidence", "Apply the evidence (integrate results with clinical expertise & patient values)", "اتخاذ القرار الإكلينيكي بدمج النتائج والخبرة وقيم المريض"],
          ["Step 5", "Assess the results", "Evaluate the effectiveness and efficiency of the process (to improve next time)", "تقييم الفعالية والكفاءة لتحسين الأداء في المرات القادمة"]
        ]
      }
    ],
    keyTerms: [
      { term: "Evidence-Based Dentistry (EBD)", definitionEn: "A systematic approach to oral healthcare following 5 steps: Ask, Acquire, Appraise, Apply, and Assess.", explanationAr: "طب الأسنان المبني على الدليل العلمي.", slideRef: "EBD_Lec_2, Slides 2–3" },
      { term: "Ask the question", definitionEn: "The first step of EBD: Formulate an answerable clinical question.", explanationAr: "الخطوة الأولى: صياغة سؤال إكلينيكي قابل للإجابة.", slideRef: "EBD_Lec_2, Slides 2–3" },
      { term: "Acquire the evidence", definitionEn: "The second step of EBD: Track down the best evidence of outcomes available.", explanationAr: "الخطوة الثانية: البحث والوصول إلى أفضل دليل متاح حول النتائج.", slideRef: "EBD_Lec_2, Slides 2–3" },
      { term: "Critically appraise the evidence", definitionEn: "The third step of EBD: Find out how good the evidence is.", explanationAr: "الخطوة الثالثة: التقييم النقدي للدليل العلمي لمعرفة مدى جودته.", slideRef: "EBD_Lec_2, Slide 3" },
      { term: "Apply the evidence", definitionEn: "The fourth step of EBD: Integrate the results with clinical expertise and patient values.", explanationAr: "الخطوة الرابعة: تطبيق الدليل بدمج النتائج مع الخبرة الإكلينيكية وقيم المريض.", slideRef: "EBD_Lec_2, Slide 3" },
      { term: "Assess the results / Evaluate the process", definitionEn: "The fifth step of EBD: Evaluate the effectiveness and efficiency of the process to improve next time.", explanationAr: "الخطوة الخامسة: تقييم فعالية وكفاءة العملية لتحسينها في المرات القادمة.", slideRef: "EBD_Lec_2, Slides 2–3" }
    ],
    flashcards: [
      { id: "fc-1-1", front: "What are the 5 A's of Evidence-Based Dentistry in exact order?", back: "1. Ask the question\n2. Acquire the evidence\n3. Appraise the evidence\n4. Apply the evidence\n5. Assess the results\n(Ref: EBD_Lec_2, Slide 2)" },
      { id: "fc-1-2", front: "What does 'Critically appraise the evidence' mean according to Slide 3?", back: "It means finding out how good the evidence is (evaluating its quality and trustworthiness).\n(Ref: EBD_Lec_2, Slide 3)" },
      { id: "fc-1-3", front: "What three elements are integrated when you 'Apply the evidence'?", back: "1. The research results (evidence)\n2. Clinical expertise\n3. Patient values\n(Ref: EBD_Lec_2, Slide 3)" },
      { id: "fc-1-4", front: "What is the purpose of the 5th step in EBD ('Evaluate the effectiveness and efficiency of the process')?", back: "To improve next time.\n(Ref: EBD_Lec_2, Slide 3)" },
      { id: "fc-1-5", front: "Which step in the 5 A's cycle corresponds to 'Track down the best evidence of outcomes available'?", back: "Step 2: Acquire the evidence.\n(Ref: EBD_Lec_2, Slides 2–3)" }
    ],
    quickReview: [
      "يتكون EBD من 5 خطوات متتالية: Formulate question → Track down evidence → Critically appraise → Apply evidence → Evaluate process.",
      "مرادفات الـ 5 A's بالترتيب: Ask → Acquire → Appraise → Apply → Assess.",
      "معنى Critically appraise the evidence في المحاضرة هو: (find out how good it is).",
      "عند تطبيق الدليل (Apply)، يجب دمج النتائج (Results) مع الخبرة الإكلينيكية (Clinical expertise) وقيم المريض (Patient values).",
      "الهدف من تقييم فعالية وكفاءة العملية (Evaluate effectiveness and efficiency) في الخطوة الخامسة هو التحسين في المرة القادمة (to improve next time)."
    ]
  },

  /* ═══════════════════════════════════════════════════════════════════════
     LECTURE 2: RESEARCH QUESTION (EBD_Lec_2.pdf — 37 SLIDES)
     ═══════════════════════════════════════════════════════════════════════ */
  {
    id: 2,
    code: "LEC-02",
    title: "Research Question & PICO Clinical Cases",
    arabicTitle: "السؤال البحثي وإطار PICO والحالات الإكلينيكية الخمس",
    instructor: "Prof. Hadeel Farouk",
    sourceFile: "EBD_Lec_2.pdf (37 Slides — Complete Official File)",
    pdfUrl: "assets/pdfs/EBD_Lec_2_Research_Question.pdf",
    slideCount: "37 شريحة كاملة",
    status: "complete",
    statusBadge: "مكتمل 100% من الملف المرفق (37 شريحة)",
    mcqCount: 190,
    estimatedStudyTime: "50 دقيقة",
    overview: {
      summaryEn: "This lecture covers how a dentist identifies a research point (through clinical/daily observation, discussions, reading literature on PubMed, attending scientific meetings, and critical thinking), distinguishes between Background and Foreground clinical questions, structures clinical questions using PICO / PICOT / PICOTS across different question natures (Therapy/Prevention, Harm/Etiology, Diagnosis, Prognosis), evaluates research questions using the 5 FINER criteria (Feasible, Interesting, Novel, Ethical, Relevant), and applies PICO formulation to 5 authentic dental clinical cases.",
      summaryAr: "تتناول المحاضرة الثانية (37 شريحة) بالتفصيل كيفية العثور على نقطة بحثية (Research Point) من خلال سيناريو عملي لطبيب أسنان يلاحظ تآكل المينا وحساسية الأسنان لدى الشباب الذين يشربون مشروبات الطاقة المثلجة والكمبوتشا (Kombucha). ثم تشرح الفرق الجوهري بين أسئلة الخلفية (Background Questions) والأسئلة الأمامية (Foreground Questions)، وتفصّل مكونات PICO وPICOT وPICOTS وجداول الأسئلة الإكلينيكية حسب طبيعتها، ومعايير تقييم السؤال البحثي الخمسة (FINER)، وتختتم بخمس حالات إكلينيكية تطبيقية كاملة (Case 1 إلى Case 5).",
      learningObjectives: [
        "Identify the 5 ways to find a research point and apply them to the Kombucha & enamel wear scenario.",
        "Differentiate between Background Questions (foundational knowledge: definitions & mechanisms of action) and Foreground Questions (therapy/prevention, diagnosis, etiology, prognosis).",
        "Master the components of PICO, PICOT (+Time), and PICOTS (+Time of follow up & Study Design).",
        "Analyze the main components and dental examples of clinical questions across Therapy/Prevention, Harm/Etiology, Diagnosis, and Prognosis (Slides 16 & 17).",
        "Evaluate any research question using the 5 FINER criteria: Feasible, Interesting, Novel, Ethical, Relevant (Slide 19).",
        "Formulate complete PICO breakdowns and clinical questions for all 5 dental cases (Slides 21–36)."
      ],
      slideImages: [
        {
          src: "assets/slides/lec2_slide13_pico_table.png",
          caption: "Slide 13 (EBD_Lec_2.pdf): PICO Components Table (Population/Patient/Problem, Intervention/Exposure, Comparison, Outcome)"
        },
        {
          src: "assets/slides/lec2_slide14_picot_visual.png",
          caption: "Slide 14 (EBD_Lec_2.pdf): PICOT Framework Visual (Adding T = Time)"
        },
        {
          src: "assets/slides/lec2_slide15_picots_list.png",
          caption: "Slide 15 (EBD_Lec_2.pdf): PICOTS Extended Framework (Adding T = Time of follow up, S = Study Design)"
        },
        {
          src: "assets/slides/lec2_slide16_clinical_questions_table.png",
          caption: "Slide 16 (EBD_Lec_2.pdf): Main Components and Examples of Clinical Questions According to Their Natures"
        },
        {
          src: "assets/slides/lec2_slide17_table1_formulating_pico.png",
          caption: "Slide 17 (EBD_Lec_2.pdf): Table 1 — Formulating PICO Question Across Clinical Scenarios"
        }
      ]
    },
    sections: [
      {
        id: "lec2-sec1",
        title: "1. How Would You Find a Research Point? & The Kombucha Scenario (Slides 4–9)",
        slideRef: "EBD_Lec_2.pdf — Slides 4–9",
        contentEn: [
          "Sources for finding a research point (Slide 4): (1) Through clinical observation, (2) Through reading to expand your knowledge, (3) Attend scientific meetings, (4) Discussions, (5) Daily observation, culminating in 'The critical thinking'.",
          "Step-by-step Dental Scenario (Slides 5–9):",
          "• Daily/Clinical Observation (Slide 5): You are a dentist noticing a frustrating trend in daily practice — many patients complain of severe tooth sensitivity and enamel wear, and many are young adults who drink a lot of iced energy drinks and kombucha.",
          "• Discussions (Slide 6): You talk to your dental assistant and a colleague at lunch. Your colleague mentions seeing the same thing and wonders if it is related to the acidity of these drinks rather than just sugar.",
          "• Reading to expand knowledge (Slide 7): You search PubMed (dental literature). You find plenty of studies on sports drinks and enamel erosion, but very few recent studies specifically on newer trends like highly acidic iced teas.",
          "• Attend scientific meetings (Slide 8): You go to a dental conference where a speaker lectures on 'Modern Dietary Habits and Erosive Tooth Wear.' During Q&A, you ask if anyone has studied kombucha; the speaker says it is an 'emerging area of interest.'",
          "• The Critical Thinking (Slide 9): You put it all together, realize there is a gap in the literature, and formulate a research point: 'Is there a statistically significant correlation between the daily consumption of kombucha and accelerated enamel erosion in patients aged 18-30 compared to a control group?'"
        ],
        explanationAr: "تقدم الشرائح 4 إلى 9 قصة متكاملة توضح كيف يولد السؤال البحثي:\n1. الملاحظة اليومية/الإكلينيكية (Daily/Clinical Observation): ملاحظة حساسية شديدة وتآكل مينا (Enamel wear) لدى الشباب الذين يستهلكون مشروبات الطاقة المثلجة والكمبوتشا (Kombucha).\n2. النقاشات (Discussions): التحدث مع مساعد طبيب الأسنان وزميل في العمل وقت الغداء، والزميل يتساءل هل السبب هو حمضية المشروبات (Acidity) وليس السكر فقط.\n3. القراءة لتوسيع المعرفة (Reading to expand knowledge): البحث في PubMed، وإيجاد دراسات كثيرة عن المشروبات الرياضية (Sports drinks) وتآكل المينا، لكن دراسات قليلة جدًا عن المشروبات الحمضية الحديثة.\n4. حضور اللقاءات العلمية (Attend scientific meetings): حضور مؤتمر طب أسنان ومحاضرة بعنوان 'Modern Dietary Habits and Erosive Tooth Wear'، والسؤال في فقرة الأسئلة والأجوبة (Q&A) عن الكمبوتشا ليجيب المحاضر بأنها 'emerging area of interest'.\n5. التفكير النقدي (The Critical Thinking): الربط بين كل ما سبق واكتشاف فجوة في الأدبيات (Gap in the literature) وصياغة النقطة البحثية النهائية حول العلاقة بين الاستهلاك اليومي للكمبوتشا وتآكل المينا المتسارع في الفئة العمرية 18–30 سنة مقارنة بمجموعة ضابطة (Control group).",
        keyTakeaway: "In the Kombucha scenario: P = Patients aged 18–30, I/E = Daily consumption of kombucha, C = Control group, O = Accelerated enamel erosion."
      },
      {
        id: "lec2-sec2",
        title: "2. Background Questions vs. Foreground Questions (Slides 10–11)",
        slideRef: "EBD_Lec_2.pdf — Slides 10–11",
        contentEn: [
          "Framing the question is a key step in the process of searching for evidence to inform clinical decisions.",
          "Clinical Research questions are divided into two categories:",
          "1. Background Questions: Seek foundational knowledge, such as definitions and mechanisms of action.",
          "   • Lecture Examples (Slide 11): 'What is chronic periodontitis?' and 'How does the laser caries detection system work?'",
          "2. Foreground Questions: Address specific clinical knowledge to inform clinical decisions covering: Therapy and prevention, diagnosis, etiology, and prognosis.",
          "   • Lecture Examples (Slide 11): 'Are antibiotics effective as an adjunctive therapy for treating patients with chronic periodontitis?' or 'What is the diagnostic accuracy of the laser caries detection system?'"
        ],
        explanationAr: "تقسم المحاضرة الأسئلة الإكلينيكية إلى نوعين رئيسيين:\n• أسئلة الخلفية (Background Questions): تبحث عن المعرفة التأسيسية (Foundational knowledge) مثل التعريفات (Definitions) وآليات العمل (Mechanisms of action). وتبدأ عادةً بأدوات استفهام عامة مثل What is أو How does.\n• الأسئلة الأمامية (Foreground Questions): تبحث عن معرفة إكلينيكية محددة لاتخاذ قرار علاجي وتشمل 4 مجالات: (Therapy & prevention, Diagnosis, Etiology, Prognosis). لاحظ كيف تحول المثال نفسه من Background ('ما هو التهاب دواعم السن المزمن؟' / 'كيف يعمل جهاز الليزر؟') إلى Foreground ('هل المضادات الحيوية فعالة كعلاج مساعد لمرضى التهاب دواعم السن المزمن؟' / 'ما هي الدقة التشخيصية لجهاز الليزر لكشف التسوس؟').",
        keyTakeaway: "Definitions & mechanisms of action = Background Question. Therapy, Prevention, Diagnosis, Etiology, Prognosis = Foreground Question."
      },
      {
        id: "lec2-sec3",
        title: "3. PICO, PICOT, and PICOTS Components (Slides 12–15)",
        slideRef: "EBD_Lec_2.pdf — Slides 12–15",
        contentEn: [
          "All types of clinical questions typically have four main components (PICO):",
          "• P — Population / Patient / Problem / Participants: The patients relevant to the question (Who are the patients? What is the problem?).",
          "• I — Intervention (or Exposure / Variable): The treatment or prevention strategy, diagnostic test, or exposure that you are interested in (such as a drug, food, surgical procedure, diagnostic test, or exposure to a chemical) (What do we do to them? What are they exposed to?).",
          "• C — Comparison: The management strategy used as a reference against which to compare the intervention (What do we compare the intervention with?).",
          "• O — Outcomes: The consequences of the intervention we are interested in (What happens? What is the outcome?).",
          "Extended Acronyms:",
          "• PICOT (Slide 14): Adds T = Time.",
          "• PICOTS (Slide 15): P = Participants, I = Intervention, C = Comparison, O = Outcome, T = Time of follow up, S = Study Design."
        ],
        explanationAr: "يتكون سؤال PICO من 4 أركان أساسية:\n1. (P) Population / Patient / Problem / Participants: المرضى أو المجتمع أو المشكلة محل الدراسة.\n2. (I) Intervention / Exposure: التدخل العلاجي أو الوقائي أو الاختبار التشخيصي أو التعرض (مثل دواء، غذاء، إجراء جراحي، اختبار تشخيصي، أو تعرض لمادة كيميائية).\n3. (C) Comparison: استراتيجية التدبير المرجعية التي نقارن بها التدخل (أو Reference Standard في التشخيص).\n4. (O) Outcomes: النتائج أو العواقب التي نهتم بقياسها.\nوعند التوسيع:\n• في PICOT (الشريحة 14) نضيف (T = Time).\n• في PICOTS (الشريحة 15) نضيف (T = Time of follow up) أي مدة المتابعة، و(S = Study Design) أي تصميم الدراسة.",
        keyTakeaway: "In Slide 12, Intervention (I) explicitly includes five examples: drug, food, surgical procedure, diagnostic test, or exposure to a chemical."
      },
      {
        id: "lec2-sec4",
        title: "4. Clinical Questions According to Their Natures — Master Tables (Slides 16–17)",
        slideRef: "EBD_Lec_2.pdf — Slides 16 & 17",
        contentEn: [
          "Slide 16 Table — Main components and examples of clinical questions, according to their natures:",
          "1. Therapy or Prevention: 'What is the effectiveness of antibiotics in preventing complications such as postoperative infections after third-molar extractions?' | P: Patients undergoing third-molar extractions | I: Antibiotic prophylaxis | C: No prophylaxis | O: Alveolar osteitis, surgical wound infection.",
          "2. Harm or Etiology: 'Does giving toddlers milk instead of water to drink at night cause caries?' | P: Toddlers | I (Exposure): Drinking milk at night | C: Drinking water at night | O: Caries.",
          "3. Diagnosis: 'How useful is a periapical radiograph in detecting interproximal caries?' | P: Patients suspected of having interproximal caries | I (Diagnostic test): Periapical radiograph | C (Reference standard): Bitewing radiograph | O: Diagnostic accuracy (as assessed by means of true-positive, true-negative, false-positive and false-negative findings).",
          "4. Prognosis: 'Are patients with diabetes at higher risk of experiencing complications after third-molar extractions than are patients without diabetes?' | P: Patients undergoing third-molar extractions | I (Exposure): Presence of diabetes | C: Absence of diabetes | O: Pain, swelling, trismus, postoperative infections.",
          "Slide 17 Table 1 — Formulating PICO question:",
          "1. Therapy/Prevention Example: 'What is the effect of antibiotic in preventing pain and complications after root canal therapy in patients with diabetes mellitus?' | P: Patients with diabetes mellitus | I: Use of antibiotics after root canal therapy | C: No antibiotics/placebo after root canal therapy | O: Reduction in pain and complication.",
          "2. Harm or Etiology Example: 'Does bottle feeding at night cause caries in children?' | P: Children on bottle feeding | I: Bottle feeding at night | C: No bottle feeding at night/water consumption only | O: Incidence of caries.",
          "3. Diagnosis Example: 'Is laser fluorescent technique able to diagnose proximal caries more accurately than bitewing radiographs?' | P: Patients with high caries rate | I: Laser fluorescent | C: Bitewing radiographs | O: Diagnosis of proximal caries.",
          "4. Prognosis Example: 'Are patients with apical periodontitis at higher risk of failure of root canal therapy than the patients without apical periodontitis?' | P: Patient with and without apical periodontitis | I: Root canal therapy | C: NA (not applicable) | O: Success and failure of the treatment."
        ],
        explanationAr: "تُعد الشريحتان 16 و17 من أهم الشرائح الامتحانية في المنهج لأنها تحتوي على 8 أمثلة كاملة لطب الأسنان مقسمة إلى P, I, C, O. انتبه جيدًا للفروق الدقيقة فيها:\n• في سؤال التشخيص الأول (Slide 16): الاختبار محل التقييم (I) هو Periapical radiograph، والمرجع القياسي (C: Reference standard) هو Bitewing radiograph، والنتيجة (O) هي Diagnostic accuracy المقاسة بـ (True-positive, True-negative, False-positive, False-negative).\n• في سؤال التشخيص الثاني (Slide 17): التدخل (I) هو Laser fluorescent، والمقارنة (C) هي Bitewing radiographs لدى مرضى (P: Patients with high caries rate).\n• في سؤال المآل/التكهن (Prognosis) في الشريحة 17 حول Apical periodontitis وعلاج الجذور (Root canal therapy)، خانة المقارنة (C) كُتبت صراحةً (NA — Not Applicable) لأن المقارنة مدمجة داخل تعريف المجموعتين في P (Patient with and without apical periodontitis).",
        keyTakeaway: "Memorize both Slide 16 and Slide 17 tables thoroughly—every cell (P, I, C, O) is a high-yield MCQ target!"
      },
      {
        id: "lec2-sec5",
        title: "5. Evaluating a Research Question — The FINER Criteria (Slide 19)",
        slideRef: "EBD_Lec_2.pdf — Slide 19",
        contentEn: [
          "How to evaluate a research question? (FINER Criteria):",
          "• F — Feasible: Do you have the expertise, budget and resources to conduct and finish the study on time?",
          "• I — Interesting: Does the study address an important problem in your field? What are the possible future implications of your findings?",
          "• N — Novel: Is the study using a novel method or answering a novel question?",
          "• E — Ethical: Can the question be answered without harming the patient? Do the benefits outweigh the risks?",
          "• R — Relevant: Does the study aim at filling a gap in the literature? Will it guide further research or change clinical management?"
        ],
        explanationAr: "لتقييم جودة وصلاحية أي سؤال بحثي، نستخدم المعايير الخمسة الموجودة في الشريحة 19 (وتُعرف اختصارًا بـ FINER):\n1. Feasible (قابل للتنفيذ): هل تمتلك الخبرة (Expertise) والميزانية (Budget) والموارد (Resources) لإجراء الدراسة وإنهائها في الوقت المحدد (On time)؟\n2. Interesting (مثير للاهتمام): هل تعالج الدراسة مشكلة مهمة في مجالك؟ وما هي التطبيقات المستقبلية المحتملة لنتائجك؟\n3. Novel (جديد/مبتكر): هل تستخدم الدراسة طريقة جديدة (Novel method) أو تجيب عن سؤال جديد (Novel question)؟\n4. Ethical (أخلاقي): هل يمكن الإجابة عن السؤال دون إلحاق ضرر بالمريض (Without harming the patient)؟ وهل تفوق الفوائد المخاطر (Do the benefits outweigh the risks)؟\n5. Relevant (ذو صلة وأهمية): هل تهدف الدراسة إلى سد فجوة في الأدبيات العلمية (Filling a gap in the literature)؟ وهل ستوجه أبحاثًا مستقبلية أو تغير التدبير الإكلينيكي (Change clinical management)؟",
        keyTakeaway: "Filling a gap in the literature and changing clinical management belong to 'Relevant', whereas using a new method or answering a new question belongs to 'Novel'."
      },
      {
        id: "lec2-sec6",
        title: "6. Five Applied Dental Clinical Cases — PICO Practice (Slides 21–36)",
        slideRef: "EBD_Lec_2.pdf — Slides 21–36",
        contentEn: [
          "CASE 1 (Slides 21–23): A mother of a 5-year-old boy with rampant caries brings him due to severe pain in a previously treated tooth. She asks if the restoration can be redone using glass ionomer rather than the present composite one to avoid future recurrence of caries.",
          "  • P: Children with rampant caries | I: Glass-ionomer | C: Composite | O: Recurrence of caries.",
          "  • Clinical Question: 'In a child with rampant caries, does glass-ionomer work as well as composite in preventing recurrent caries?'",
          "CASE 2 (Slides 24–27): A 25-year-old man with aggressive periodontitis comes after extracting 4 teeth (Grade III mobility). He now has 2 lower incisors and 2 upper maxillary molars with Grade II mobility. Routine oral hygiene and conventional periodontal debridement have low chances of success; you review evidence on regeneration using PRF.",
          "  • P: Adult males with aggressive periodontitis / Grade II Mobile teeth in patients with aggressive periodontitis | I: Regeneration using PRF | C: Conventional periodontal debridement | O: Reduction of mobility.",
          "  • Clinical Question: 'In mobile teeth in patients with aggressive periodontitis, does PRF result in reduced tooth mobility?'",
          "CASE 3 (Slides 28–30): A 10-year-old boy treated for caries; his father asks: 'Doctor, we see a lot of ads about sugar-free chewing gums. Are they good for my child?'",
          "  • P: Children (or children with deciduous teeth) | I: Sugar-Free: Xylitol or sorbitol | C: Known standard of care: No xylitol, fluoride | O: Good: Lower caries incidence.",
          "  • Clinical Questions: 'In Children, does sugar-free gum / Xylitol gum lower the incidence of caries?' / 'Do children with deciduous teeth who consume xylitol chewing gum have a lower incidence of dental caries compared to children who don’t?'",
          "CASE 4 (Slides 31–33): A company representative visits your clinic to discuss a new powered toothbrush, claiming it is superior to a manual brush for oral hygiene.",
          "  • P: Adult patients | I: Powered toothbrush | C: Manual toothbrush | O: Reduction in plaque and/or gingivitis.",
          "  • Clinical Question: 'For adult patients, will the use of a powered toothbrush, compared to a manual toothbrush, result in a reduction in plaque and/or gingivitis?'",
          "CASE 5 (Slides 34–36): A new patient has a heart murmur with regurgitation and moderate periodontitis. In the past, his condition was pre-medicated with antibiotic prophylaxis, but new evidence reveals premedication is not necessary. You want to make sure periodontal scaling and root planing will not cause bacterial endocarditis.",
          "  • P: Cardiac patient with moderate periodontitis | I: No antibiotic prophylaxis | C: Antibiotic prophylaxis | O: Lower the risk of bacterial endocarditis.",
          "  • Clinical Question: 'For Cardiac patients with moderate periodontitis, will the use of Antibiotic prophylaxis differ from no antibiotic prophylaxis in reducing the risk of bacterial endocarditis?'"
        ],
        explanationAr: "تستعرض الشرائح 21–36 خمس حالات إكلينيكية تطبيقية، ويجب الانتباه فيها إلى كيفية استخراج P, I, C, O بدقة كما كتبتها أ.د. هديل فاروق:\n• في الحالة الأولى (Case 1): الطفل عمره 5 سنوات ولديه تسوس مستفحل (Rampant caries)، والتدخل الجديد المقترح (I) هو Glass-ionomer، والمقارنة (C) هي الحشوة الحالية Composite، والنتيجة (O) هي Recurrence of caries.\n• في الحالة الثانية (Case 2): المريض عمره 25 سنة ولديه Aggressive periodontitis وأسنان بحركة من الدرجة الثانية (Grade II mobility)، والتدخل (I) هو Regeneration using PRF، والمقارنة (C) هي Conventional periodontal debridement، والنتيجة (O) هي Reduction of mobility.\n• في الحالة الثالثة (Case 3): العلكة الخالية من السكر (I) فُسّرت علميًا بـ (Sugar-Free: Xylitol or sorbitol)، والمقارنة (C) هي المعيار المعروف للرعاية (Known standard of care: No xylitol, fluoride)، وكلمة 'Good' التي سأل عنها الأب تُرجمت إلى نتيجة قابلة للقياس (O) وهي (Lower caries incidence).\n• في الحالة الرابعة (Case 4): عبارة مندوب الشركة 'good for oral hygiene' تُرجمت علميًا في النتيجة (O) إلى: (Reduction in plaque and/or gingivitis).\n• في الحالة الخامسة (Case 5): انتبه جيدًا! لأن الممارسة القديمة كانت إعطاء مضاد حيوي وقائي بينما الدليل الجديد يقول بعدم ضرورته، وُضعت (No antibiotic prophylaxis) في خانة التدخل (I)، ووُضعت الممارسة القديمة (Antibiotic prophylaxis) في خانة المقارنة (C)!",
        keyTakeaway: "Crucial Exam Detail in Case 5: I = No antibiotic prophylaxis, and C = Antibiotic prophylaxis (because antibiotic prophylaxis was the historical standard of care being challenged)."
      }
    ],
    difficultConcepts: [
      {
        title: "لماذا وُضعت No Antibiotic Prophylaxis في خانة (I) في الحالة الخامسة (Case 5)؟",
        difficulty: "مرتفع — نقطة دقيقة جدًا في الشريحة 35",
        curriculumFact: "In Case 5 (Slide 35): P = Cardiac patient with moderate periodontitis, I = No antibiotic prophylaxis, C = Antibiotic prophylaxis, O = Lower the risk of bacterial endocarditis.",
        explanationAr: "عادةً ما يتوقع الطالب أن يكون إعطاء الدواء هو (I) وعدم إعطائه هو (C). لكن في الحالة الخامسة، كان المريض الذي يعاني من نفخة قلبية مع ارتجاع (Heart murmur with regurgitation) يُعطى في الماضي مضادًا حيويًا وقائيًا كإجراء روتيني، ثم ظهر توجه جديد يقترح عدم الحاجة للتغطية بالمضاد الحيوي قبل التلقيح وتسوية الجذور (Scaling and root planing). لذلك أصبح التوجه الجديد قيد الاختبار (I) هو (No antibiotic prophylaxis) مقارنةً بالممارسة التقليدية السابقة (C: Antibiotic prophylaxis)."
      },
      {
        title: "تحويل كلام المريض أو مندوب الشركة العام إلى Outcome علمي قابل للقياس",
        difficulty: "متوسط — Cases 3 & 4",
        curriculumFact: "In Case 3, the father asks 'Are they good for my child?' → O: 'Good: Lower caries incidence'. In Case 4, the rep claims 'very good for oral hygiene' → O: 'reduction in plaque and/or gingivitis'.",
        explanationAr: "في صياغة PICO، لا نكتب كلمات غامضة مثل 'جيد للطفل' أو 'ممتاز لنظافة الفم'. بل نحولها إلى نتائج إكلينيكية قابلة للقياس: في حالة العلكة الخالية من السكر (Xylitol/sorbitol) النتيجة هي خفض معدل حدوث التسوس (Lower caries incidence)، وفي حالة فرشاة الأسنان الكهربائية النتيجة هي تقليل البلاك و/أو التهاب اللثة (Reduction in plaque and/or gingivitis)."
      }
    ],
    comparisons: [
      {
        title: "مقارنة شاملة بين Background Questions و Foreground Questions (Slides 10–11)",
        headers: ["وجه المقارنة", "Background Questions (أسئلة الخلفية)", "Foreground Questions (الأسئلة الأمامية)"],
        rows: [
          ["الهدف المعرفي", "Foundational knowledge (معرفة تأسيسية عامة)", "Specific clinical evidence to inform clinical decisions"],
          ["المجالات التي تغطيها", "Definitions & Mechanisms of action (التعريفات وآليات العمل)", "Therapy/Prevention, Diagnosis, Etiology, and Prognosis"],
          ["صيغة السؤال المعتادة", "تبدأ بـ What is...? أو How does... work?", "تُصاغ بإطار PICO / PICOT وتقارن بين تدخلين أو تعرضين على نتيجة محددة"],
          ["مثال اللثة في المحاضرة", "What is chronic periodontitis?", "Are antibiotics effective as an adjunctive therapy for treating patients with chronic periodontitis?"],
          ["مثال الليزر في المحاضرة", "How does the laser caries detection system work?", "What is the diagnostic accuracy of the laser caries detection system?"]
        ]
      },
      {
        title: "ملخص الحالات الإكلينيكية الخمس (Cases 1–5) في المحاضرة الثانية (Slides 21–36)",
        headers: ["الحالة", "Population (P)", "Intervention (I)", "Comparison (C)", "Outcome (O)"],
        rows: [
          ["Case 1 (5yo boy, rampant caries)", "Children with rampant caries", "Glass-ionomer", "Composite", "Recurrence of caries"],
          ["Case 2 (25yo man, Grade II mobile teeth)", "Adult males with aggressive periodontitis / Grade II mobile teeth", "Regeneration using PRF", "Conventional periodontal debridement", "Reduction of mobility"],
          ["Case 3 (10yo boy, sugar-free gum)", "Children (with deciduous teeth)", "Sugar-Free: Xylitol or sorbitol", "Known standard of care: No xylitol, fluoride", "Good: Lower caries incidence"],
          ["Case 4 (Company rep, toothbrush)", "Adult patients", "Powered toothbrush", "Manual toothbrush", "Reduction in plaque and/or gingivitis"],
          ["Case 5 (Heart murmur, scaling)", "Cardiac patient with moderate periodontitis", "No antibiotic prophylaxis", "Antibiotic prophylaxis", "Lower the risk of bacterial endocarditis"]
        ]
      }
    ],
    keyTerms: [
      { term: "Background Questions", definitionEn: "Questions asking for foundational knowledge, such as definitions and mechanisms of action.", explanationAr: "أسئلة الخلفية المعرفية التي تسأل عن التعريفات وآليات العمل.", slideRef: "EBD_Lec_2, Slides 10–11" },
      { term: "Foreground Questions", definitionEn: "Questions asking for specific evidence on therapy and prevention, diagnosis, etiology, and prognosis to inform clinical decisions.", explanationAr: "الأسئلة الإكلينيكية الأمامية المتعلقة بالعلاج والوقاية والتشخيص والسببية والمآل.", slideRef: "EBD_Lec_2, Slides 10–11" },
      { term: "PICO", definitionEn: "Acronym for Population (P), Intervention (I), Comparison (C), and Outcomes (O).", explanationAr: "الإطار الرباعي لصياغة السؤال الإكلينيكي القابل للإجابة.", slideRef: "EBD_Lec_2, Slides 12–13" },
      { term: "PICOT / PICOTS", definitionEn: "Extended PICO frameworks adding T (Time / Time of follow up) and S (Study Design).", explanationAr: "إطار PICO الموسع بإضافة عامل الزمن (Time of follow up) وتصميم الدراسة (Study Design).", slideRef: "EBD_Lec_2, Slides 14–15" },
      { term: "Feasible (FINER)", definitionEn: "Having the expertise, budget, and resources to conduct and finish the study on time.", explanationAr: "القابلية للتنفيذ من حيث الخبرة والميزانية والموارد والوقت.", slideRef: "EBD_Lec_2, Slide 19" },
      { term: "Interesting (FINER)", definitionEn: "Addressing an important problem in the field with meaningful future implications.", explanationAr: "إثارة الاهتمام بمعالجة مشكلة مهمة ذات تطبيقات مستقبلية.", slideRef: "EBD_Lec_2, Slide 19" },
      { term: "Novel (FINER)", definitionEn: "Using a novel method or answering a novel question.", explanationAr: "الأصالة والحداثة باستخدام طريقة جديدة أو الإجابة عن سؤال جديد.", slideRef: "EBD_Lec_2, Slide 19" },
      { term: "Ethical (FINER)", definitionEn: "Answering the question without harming the patient, where benefits outweigh the risks.", explanationAr: "الالتزام الأخلاقي بعدم إلحاق الضرر بالمريض ورجحان الفوائد على المخاطر.", slideRef: "EBD_Lec_2, Slide 19" },
      { term: "Relevant (FINER)", definitionEn: "Aiming at filling a gap in the literature, guiding further research, or changing clinical management.", explanationAr: "الصلة والأهمية بسد فجوة بحثية أو توجيه الأبحاث أو تغيير التدبير الإكلينيكي.", slideRef: "EBD_Lec_2, Slide 19" },
      { term: "Diagnostic Accuracy", definitionEn: "Outcome of diagnostic studies assessed by means of true-positive, true-negative, false-positive, and false-negative findings.", explanationAr: "الدقة التشخيصية وتُقاس بالنتائج الإيجابية والسلبية الحقيقية والكاذبة.", slideRef: "EBD_Lec_2, Slide 16" }
    ],
    flashcards: [
      { id: "fc-2-1", front: "What is the difference between Background and Foreground questions?", back: "• Background: Foundational knowledge (definitions & mechanisms of action).\n• Foreground: Specific clinical questions covering Therapy/Prevention, Diagnosis, Etiology, and Prognosis.\n(Ref: EBD_Lec_2, Slides 10–11)" },
      { id: "fc-2-2", front: "What do T and S stand for in the PICOTS framework (Slide 15)?", back: "• P: Participants\n• I: Intervention\n• C: Comparison\n• O: Outcome\n• T: Time of follow up\n• S: Study Design\n(Ref: EBD_Lec_2, Slide 15)" },
      { id: "fc-2-3", front: "What are the 5 criteria for evaluating a research question (Slide 19)?", back: "1. Feasible (expertise, budget, resources, on time)\n2. Interesting (important problem, future implications)\n3. Novel (novel method or novel question)\n4. Ethical (no harm, benefits outweigh risks)\n5. Relevant (fills gap in literature, guides research, changes clinical management)" },
      { id: "fc-2-4", front: "In Case 2 (25-year-old man with aggressive periodontitis and Grade II mobility), what are I and C?", back: "• I (Intervention): Regeneration using PRF\n• C (Comparison): Conventional periodontal debridement\n• O (Outcome): Reduction of mobility\n(Ref: EBD_Lec_2, Slides 24–27)" },
      { id: "fc-2-5", front: "In Case 3 (10-year-old boy & sugar-free gum), what are I, C, and O?", back: "• I: Sugar-Free: Xylitol or sorbitol\n• C: Known standard of care: No xylitol, fluoride\n• O: Good: Lower caries incidence\n(Ref: EBD_Lec_2, Slides 28–30)" },
      { id: "fc-2-6", front: "In Slide 16, how is 'Diagnostic accuracy' assessed when comparing periapical to bitewing radiographs?", back: "By means of true-positive, true-negative, false-positive, and false-negative findings.\n(Ref: EBD_Lec_2, Slide 16)" }
    ],
    quickReview: [
      "تبدأ النقطة البحثية (Research Point) من: الملاحظة الإكلينيكية اليومية، النقاشات مع الزملاء، القراءة في PubMed، حضور المؤتمرات العلمية، والتفكير النقدي.",
      "Background questions = Definitions & mechanisms of action | Foreground questions = Therapy/Prevention, Diagnosis, Etiology, Prognosis.",
      "في PICOTS: الحرف T يرمز إلى Time of follow up، والحرف S يرمز إلى Study Design.",
      "معايير تقييم السؤال البحثي الخمسة (FINER): Feasible, Interesting, Novel, Ethical, Relevant.",
      "احفظ العناصر الأربعة (P, I, C, O) للحالات الخمس (Glass-ionomer vs Composite، PRF vs Conventional debridement، Xylitol/sorbitol vs No xylitol/fluoride، Powered vs Manual toothbrush، No antibiotic prophylaxis vs Antibiotic prophylaxis)."
    ]
  },

  /* ═══════════════════════════════════════════════════════════════════════
     LECTURE 3: STATEMENT OF PROBLEM & TYPES OF RESEARCH QUESTIONS
     ═══════════════════════════════════════════════════════════════════════ */
  {
    id: 3,
    code: "LEC-03",
    title: "Statement of Problem & Types of Research Questions",
    arabicTitle: "بيان المشكلة البحثية وأنواع الأسئلة البحثية وصياغتها",
    instructor: "Prof. Hadeel Farouk",
    sourceFile: "DOC-20261009-WA0017.pdf (18 Slides — Complete Official File)",
    pdfUrl: "assets/pdfs/EBD_Lec_3_Statement_of_Problem.pdf",
    slideCount: "18 شريحة كاملة",
    status: "complete",
    statusBadge: "مكتمل 100% من الملف المرفق (18 شريحة)",
    mcqCount: 135,
    estimatedStudyTime: "45 دقيقة",
    overview: {
      summaryEn: "This lecture explains when and how to write an effective Statement of Problem (in business vs. academic research), the two-step basic writing strategy, the three key parts of a problem statement (Research Background, Research Significance, and Solution) illustrated by the Vitamin D supplementation & breast cancer example, the fundamental division of research into Observational vs. Clinical Trials, the PICO phrasing templates (Slide 10), and the 5 types of research questions with their specific acronyms: Prevalence/Incidence (PO), Etiology (PECO/PEO), Diagnosis (PIRT), Therapy/Prevention (PICO/PIO), and Prognosis (PICO/PIO).",
      summaryAr: "تتناول المحاضرة الثالثة (ملف DOC-20261009-WA0017.pdf — 18 شريحة) شقين متكاملين:\nالشق الأول (الشرائح 1–8): كيفية كتابة بيان المشكلة (Statement of Problem)، والفرق بين كتابته في عالم الأعمال (وثيقة مستقلة Stand-alone document) وفي البحث الأكاديمي (عدة فقرات في المقترح البحثي Research proposal أو بضع جمل في المقدمة Introduction)، واستراتيجية الكتابة من خطوتين، والأجزاء الثلاثة الرئيسية (Research Background, Research Significance, Solution) مع المثال التطبيقي لمكملات فيتامين D والمناعة.\nالشق الثاني (الشرائح 9–16): تقسيم الأبحاث إلى دراسات رصدية (Observational) وتجارب سريرية (Clinical trials)، وقوالب صياغة PICO، والأنواع الخمسة للأسئلة البحثية مع اختصاراتها الدقيقة: Prevalence/Incidence (PO)، Etiology (PECO/PEO)، Diagnosis (PIRT)، Therapy/Prevention (PICO/PIO)، وPrognosis (PICO/PIO).",
      learningObjectives: [
        "Compare writing a problem statement in the business world (stand-alone document for an improvement project) vs. academic research (several paragraphs in a research proposal or a few sentences in the introduction).",
        "Apply the two-step approach for writing a problem statement: Step 1 (clarify reader's understanding & how to convey significance) and Step 2 (5-point organizational structure).",
        "Break down the Three Important Parts of the Problem Statement: Research Background, Research Significance, and Solution.",
        "Analyze the Vitamin D supplementation example and remember to avoid unnecessary details and absolute terms such as 'must'.",
        "Distinguish between Observational research (passive measurement) and Clinical trials (delivering an intervention and examining its effects).",
        "Master the 5 Types of Research Questions, their dental examples, and their exact acronyms: PO, PECO/PEO, PIRT, and PICO/PIO."
      ],
      slideImages: [
        {
          src: "assets/slides/lec3_slide10_how_to_phrase_pico.png",
          caption: "Slide 10 (DOC-20261009-WA0017.pdf): How to Phrase Your PICO Across Diagnosis, Therapy, Prognosis, Etiology/Harm, and Prevention"
        }
      ]
    },
    sections: [
      {
        id: "lec3-sec1",
        title: "1. When Should You Write a Problem Statement? (Slide 2)",
        slideRef: "DOC-20261009-WA0017.pdf — Slide 2",
        contentEn: [
          "There are various situations in which you might have to write a problem statement:",
          "1. In the business world: Writing a problem statement is often the first step in kicking off an improvement project. In this case, the problem statement is usually a stand-alone document.",
          "2. In academic research: Writing a problem statement can help you understand the significance of your research problem. It is often several paragraphs long and serves as the basis for your research proposal. Alternatively, it can be condensed into just a few sentences in your introduction."
        ],
        explanationAr: "توضح الشريحة الثانية متى نكتب بيان المشكلة في سياقين مختلفين:\n• في عالم الأعمال (Business world): يكون الخطوة الأولى لإطلاق مشروع تحسين (Improvement project)، ويكون عادةً وثيقة مستقلة بذاتها (Stand-alone document).\n• في البحث الأكاديمي (Academic research): يساعدك على فهم أهمية مشكلتك البحثية (Significance of your research problem)، ويكون غالبًا بطول عدة فقرات (Several paragraphs long) ليشكل الأساس لمقترحك البحثي (Research proposal)، أو بديلًا عن ذلك يمكن تكثيفه في بضع جمل فقط داخل المقدمة (Condensed into just a few sentences in your introduction).",
        keyTakeaway: "Business world = Stand-alone document for an improvement project. Academic research = Several paragraphs in a research proposal OR a few sentences in the introduction."
      },
      {
        id: "lec3-sec2",
        title: "2. Basic Writing Strategies: The Two-Step Approach (Slides 3–5)",
        slideRef: "DOC-20261009-WA0017.pdf — Slides 3–5",
        contentEn: [
          "The problem statement highlights the pressing issue the research intends to address. It should be concise and to the point.",
          "Researchers can follow a two-step approach (Elsevier strategy):",
          "• First: Think about the content of the problem statement. Before writing, clarify two points (Slide 4):",
          "  1. What is the reader's level of understanding of the research topic?",
          "  2. How can the significance of the research be effectively conveyed to the reader?",
          "• Second: Organize the writing framework. After addressing those two questions, organize the content according to this 5-point structure (Slide 5):",
          "  1. Clarify what you aim to achieve with your research.",
          "  2. Explore why the problem exists and explain how solving it helps reach the goal.",
          "  3. Outline the potential impact of the research, such as possible outcomes, challenges, and benefits.",
          "  4. Recommend a plan for your experiment that follows the rules of science.",
          "  5. Explain the potential consequences if the problem is not resolved (if applicable)."
        ],
        explanationAr: "لكتابة بيان مشكلة موجز ومباشر (Concise and to the point) يبرز القضية الملحة (Pressing issue)، يتبع الباحث نهجًا من خطوتين:\n• الخطوة الأولى (التفكير في المحتوى قبل الكتابة - Slide 4): توضيح نقطتين: (1) ما هو مستوى فهم القارئ لموضوع البحث؟ (2) كيف يمكن إيصال أهمية البحث للقارئ بفعالية؟\n• الخطوة الثانية (تنظيم هيكل الكتابة - Slide 5): تنظيم المحتوى في 5 نقاط متسلسلة: (1) توضيح ما تهدف لتحقيقه، (2) استكشاف سبب وجود المشكلة وكيف يساعد حلها في الوصول للهدف، (3) تحديد الأثر المحتمل للبحث (النتائج، التحديات، الفوائد)، (4) التوصية بخطة للتجربة تتبع قواعد العلم (Rules of science)، (5) شرح العواقب المحتملة في حال عدم حل المشكلة.",
        keyTakeaway: "Before writing (Step 1), always assess: (1) Reader's level of understanding, and (2) How to effectively convey research significance."
      },
      {
        id: "lec3-sec3",
        title: "3. Three Important Parts of the Problem Statement & Vitamin D Example (Slides 6–8)",
        slideRef: "DOC-20261009-WA0017.pdf — Slides 6–8",
        contentEn: [
          "Although there is no fixed format, it is helpful to include three key parts (Slides 6–7):",
          "1. Research Background: Explain clearly what problem your research focuses on. Describe how things would be better if this problem didn't exist. Also, talk about what other researchers have tried to do about this problem and what still needs to be figured out.",
          "2. Research Significance: Clarify the impact of the problem on the research field and society and analyze the cause of the problem. Explain who will benefit from solving the problem, thus demonstrating the relevance of the research and its contribution to the existing research system. To illustrate relevance, consider: geographical location or process where the problem occurs, the period during which it exists, and the severity of the problem.",
          "3. Solution: Describe the research objective and the expected solution or results.",
          "Applied Example — Vitamin D Supplementation on the Immune System (Slide 8):",
          "• Part 1 (Background): Review existing research on the role of vitamin D in the immune system, emphasizing potential impacts of vitamin D deficiency on the human body.",
          "• Part 2 (Significance/Obstacles): List the obstacles encountered when trying to increase vitamin D levels in the body through supplements, and briefly mention the physiological or molecular mechanisms behind these obstacles.",
          "• Part 3 (Solution/Benefits): Clarify feasible ways to overcome these obstacles, such as new methods to promote the absorption of vitamin D in the intestine. Then, focus on the benefits of these methods, such as helping postmenopausal women with breast cancer improve their blood vitamin D levels.",
          "Points to Note (Slide 8): Focus on essential details and avoid unnecessary information. Additionally, absolute terms such as 'must' should be avoided."
        ],
        explanationAr: "يتكون بيان المشكلة من 3 أجزاء رئيسية (Slides 6–7):\n1. خلفية البحث (Research Background): المشكلة التي يركز عليها البحث، كيف ستكون الأمور أفضل لو لم تكن موجودة، ماذا حاول الباحثون الآخرون، وما الذي لا يزال بحاجة للاكتشاف.\n2. أهمية البحث (Research Significance): أثر المشكلة على المجال العلمي والمجتمع، تحليل سبب المشكلة، من سيستفيد من حلها، وإظهار صلتها عبر تحديد (الموقع الجغرافي أو العملية، الفترة الزمنية، وشدة المشكلة Severity).\n3. الحل (Solution): وصف هدف البحث (Research objective) والحل أو النتائج المتوقعة.\nوفي الشريحة 8، طبّقت المحاضرة هذه الأجزاء على موضوع: فوائد مكملات فيتامين D على الجهاز المناعي (تحديدًا تحسين امتصاص فيتامين D في الأمعاء لمساعدة النساء بعد سن اليأس المصابات بسرطان الثدي Postmenopausal women with breast cancer). وختمت بتنبيه مهم جدًا للامتحان: تجنب التفاصيل غير الضرورية، وتجنب الكلمات المطلقة (Absolute terms) مثل كلمة 'must'.",
        keyTakeaway: "Never use absolute terms such as 'must' when crafting a problem statement (Slide 8)."
      },
      {
        id: "lec3-sec4",
        title: "4. Observational vs. Clinical Trial & How to Phrase Your PICO (Slides 9–10)",
        slideRef: "DOC-20261009-WA0017.pdf — Slides 9–10",
        contentEn: [
          "Remember (Slide 9): Research in general is either:",
          "• Observational: You are passive, taking measurements for the population.",
          "• Clinical trial: Where you deliver the intervention and examine its effects in a clinical trial.",
          "How to Phrase Your PICO Templates (Slide 10 Image):",
          "• Diagnosis: Are (is) ____ (I) more accurate in diagnosing ____ (P) compared with ____ (C) for ____ (O)?",
          "• Therapy: In ____ (P), what is the effect of ____ (I) on ____ (O) compared with ____ (C)?",
          "• Prognosis: Does ____ (I) influence ____ (O) in patients who have ____ (P)?",
          "• Etiology/Harm: Are ____ (P) who have ____ (I) at ____ (Increased/decreased) risk for/of ____ (O) compared with ____ (P) with/without ____ (C)?",
          "• Prevention: For ____ (P) does the use of ____ (I) reduce the future risk of ____ (O) compared with ____ (C)?"
        ],
        explanationAr: "في الشريحة 9 قاعدة ذهبية: البحث العلمي عمومًا إما أن يكون رصديًا (Observational) حيث يكون الباحث سلبيًا (Passive) يكتفي بأخذ القياسات للمجتمع دون تدخل، أو تجربة سريرية (Clinical trial) حيث يقدم الباحث التدخل (Deliver the intervention) ويفحص آثاره.\nوفي الشريحة 10 (صورة الجدول) قوالب جاهزة لصياغة أسئلة PICO للأنواع الخمسة: التشخيص، العلاج، المآل (Prognosis)، السببية/الضرر (Etiology/Harm)، والوقاية (Prevention).",
        keyTakeaway: "Observational = Researcher is PASSIVE (taking measurements). Clinical Trial = Researcher is ACTIVE (delivering the intervention)."
      },
      {
        id: "lec3-sec5",
        title: "5. The 5 Types of Research Questions & Their Specific Acronyms (Slides 11–16)",
        slideRef: "DOC-20261009-WA0017.pdf — Slides 11–16",
        contentEn: [
          "Slide 11 lists the 5 Types of Research Questions: (1) Prevalence/incidence, (2) Etiology, (3) Diagnosis, (4) Therapy/Prevention, (5) Prognosis.",
          "1. Prevalence / Incidence (Slide 12) — Acronym: PO",
          "   • Prevalence (frequency) of a disease: The proportion of people with the disease measured at one point in time. (cross-sectional).",
          "   • Incidence (rate): The proportion of people who are new cases of the disease within a specified period. (longitudinal).",
          "2. Etiology (Slide 13) — Acronyms: PECO, PEO",
          "   • 'The reverse of intervention questions because they deal with the harmful outcomes of an activity or exposure. (P: healthy, O: harm)'",
          "   • Causation Example: 'For healthy individuals (P)… having bruxism (E)… compared to those with no bruxism (C)… what is the risk of developing TMD (O)?'",
          "   • Association vs. Causation: 'But, if we survey how many TMD patients have bruxism, this is an association. Association Doesn't mean Causation.'",
          "3. Diagnosis (Slide 14) — Acronym: PIRT",
          "   • P: Patients | I: Index test | R: Reference test (control) | T: Target condition (outcome).",
          "   • Dental Example: 'In patients with undiagnosed oral lesions (P)… can clinical examination (I: index)… when compared to an oral biopsy (R: reference test/control)… effectively detect oral cancer (T: target condition/outcome)?'",
          "4. Therapy (Intervention) / Prevention (Slide 15) — Acronyms: PICO, PIO",
          "   • Intervention Example: 'For completely edentulous patients (P)… will antibiotic administration (I)… when compared to no intervention (C)… increase implant stability for overdenture (O)?'",
          "   • Prevention Example: 'For patients with high caries index (P)… will fissure sealant (I)… as compared to varnish (C)… prevent the development of dental caries (O)?'",
          "5. Prognosis (Slide 16) — Acronyms: PICO, PIO",
          "   • Definition: 'How likely is an outcome for a population with certain characteristics (risk factors)'",
          "   • Dental Example 1: 'In patients with implants (P)… who smokes (I)… compared to patients who don't smoke (C)… What is the proportion of implant loss at 10 years (O)?'",
          "   • Dental Example 2: 'In complete denture patients (P)… with a flat ridge (I)… compared to those with normal ridge (C)… what is the expected longevity of the denture (O)?'"
        ],
        explanationAr: "تُعد الشرائح 11–16 من أهم أجزاء المنهج على الإطلاق، حيث تربط كل نوع من أنواع الأسئلة الخمسة باختصاره ومثاله الإكلينيكي:\n1. الانتشار والحدوث (Prevalence & Incidence - Slide 12): اختصاره (PO) فقط (مجتمع + نتيجة). الانتشار (Prevalence = frequency) يقيس نسبة المصابين في نقطة زمنية واحدة (One point in time) بدراسة مقطعية (Cross-sectional). أما الحدوث (Incidence = rate) فيقيس الحالات الجديدة (New cases) خلال فترة محددة بدراسة طولية (Longitudinal).\n2. السببية (Etiology - Slide 13): اختصاره (PECO أو PEO). هو عكس أسئلة التدخل العلاجي (The reverse of intervention questions) لأنه يدرس النتائج الضارة لنشاط أو تعرض؛ فيبدأ بأشخاص أصحاء (P: healthy) وينتهي بضرر (O: harm). مثال: هل الجز على الأسنان (Bruxism) لدى الأصحاء يؤدي للإصابة باضطراب المفصل الصدغي الفكي (TMD)؟ (هذه سببية Causation). أما لو عملنا مسحًا (Survey) لمرضى TMD لنرى كم منهم لديه Bruxism فهذا مجرد ارتباط (Association)، والارتباط لا يعني السببية!\n3. التشخيص (Diagnosis - Slide 14): اختصاره (PIRT) حيث I = Index test (فحص إكلينيكي)، R = Reference test/control (خزعة الفم Oral biopsy)، T = Target condition/outcome (سرطان الفم Oral cancer).\n4. العلاج والوقاية (Therapy/Prevention - Slide 15): اختصاره (PICO أو PIO). مثال العلاج: إعطاء مضاد حيوي لمرضى الفم الأدرد الكامل (Completely edentulous) لزيادة ثبات الغرسات للـ Overdenture. مثال الوقاية: السادّات الشقية (Fissure sealant) مقارنة بالورنيش (Varnish) لدى مرضى مؤشر التسوس المرتفع.\n5. المآل/التكهن (Prognosis - Slide 16): اختصاره (PICO أو PIO). يدرس احتمالية حدوث نتيجة لمجتمع يمتلك خصائص أو عوامل خطورة معينة (Risk factors)، مثل فقدان الغرسات بعد 10 سنوات لدى المدخنين، أو العمر المتوقع للطقم الكامل لدى مرضى السنخ المسطح (Flat ridge) مقارنة بالسنخ الطبيعي (Normal ridge).",
        keyTakeaway: "Match the Acronyms strictly: Prevalence = PO | Etiology = PECO / PEO (P: healthy, O: harm) | Diagnosis = PIRT (Index, Reference, Target) | Therapy/Prevention & Prognosis = PICO / PIO."
      }
    ],
    difficultConcepts: [
      {
        title: "الفرق بين Causation و Association في مثال Bruxism & TMD (Slide 13)",
        difficulty: "مرتفع — سؤال فهم امتحاني كلاسيكي",
        curriculumFact: "Starting with healthy individuals having bruxism vs no bruxism to see the risk of developing TMD = Causation. Surveying how many TMD patients have bruxism = Association. Association Doesn't mean Causation.",
        explanationAr: "لماذا الأولى سببية والثانية ارتباط فقط؟\n• في السببية (Causation): نبدأ بأفراد أصحاء (Healthy individuals) ونقارن من لديهم التعرض (Bruxism) بمن ليس لديهم، لنتابع خطر تطور المرض (TMD) مستقبلًا؛ هنا التعرض سبق المرض زمنيًا.\n• في المسح (Survey): نأخذ مرضى مصابين فعلًا بـ TMD ونسأل كم منهم لديه Bruxism؛ هنا لا نعرف أيهما بدأ أولًا (هل الجز سبب ألم المفصل أم ألم المفصل سبب الجز؟)، ولذلك هو مجرد ارتباط (Association) وليس إثباتًا للسببية."
      },
      {
        title: "لماذا تُسمى أسئلة Etiology عكس أسئلة Intervention؟ (Slide 13)",
        difficulty: "متوسط",
        curriculumFact: "Etiology questions are 'The reverse of intervention questions because they deal with the harmful outcomes of an activity or exposure. (P: healthy, O: harm)'.",
        explanationAr: "في أسئلة التدخل العلاجي (Intervention)، يكون المريض مريضًا بالفعل ونقدم له علاجًا نافعًا لتحسين حالته. أما في أسئلة السببية (Etiology)، فنبدأ بأشخاص أصحاء (P: healthy) يتعرضون لعامل ضار (Exposure) ونقيس حدوث ضرر أو مرض (O: harm)."
      }
    ],
    comparisons: [
      {
        title: "مقارنة بين Prevalence و Incidence (Slide 12)",
        headers: ["وجه المقارنة", "Prevalence (الانتشار)", "Incidence (معدل الحدوث)"],
        rows: [
          ["المرادف بين القوسين", "Frequency (التكرار)", "Rate (المعدل)"],
          ["التعريف الدقيق", "Proportion of people with the disease measured at one point in time", "Proportion of people who are new cases of the disease within a specified period"],
          ["نوع الحالات", "جميع الحالات الموجودة في لحظة القياس", "الحالات الجديدة فقط (New cases) خلال فترة محددة"],
          ["تصميم الدراسة المرتبط", "Cross-sectional (دراسة مقطعية)", "Longitudinal (دراسة طولية)"],
          ["اختصار السؤال", "PO (Population, Outcome)", "PO (Population, Outcome)"]
        ]
      },
      {
        title: "جدول المقارنة الشامل للأنواع الخمسة للأسئلة البحثية واختصاراتها (Slides 11–16)",
        headers: ["نوع السؤال", "الاختصار المعتمد", "طبيعة العناصر", "المثال الإكلينيكي في المحاضرة"],
        rows: [
          ["Prevalence / Incidence", "PO", "P: Population, O: Disease frequency/rate", "نسبة انتشار المرض في نقطة زمنية (Cross-sectional) أو الحالات الجديدة في فترة (Longitudinal)"],
          ["Etiology", "PECO / PEO", "P: Healthy, E: Exposure, C: No exposure, O: Harm", "Healthy individuals with bruxism vs no bruxism → risk of developing TMD"],
          ["Diagnosis", "PIRT", "P: Patients, I: Index test, R: Reference test (control), T: Target condition (outcome)", "Undiagnosed oral lesions: Clinical examination (I) vs Oral biopsy (R) → detect oral cancer (T)"],
          ["Therapy / Prevention", "PICO / PIO", "P: Patients, I: Intervention/Prevention, C: Control, O: Benefit", "Therapy: Antibiotics in edentulous patients for overdenture implant stability | Prevention: Fissure sealant vs varnish in high caries index"],
          ["Prognosis", "PICO / PIO", "P: Patients with condition, I: Risk factor/Characteristic, C: Without factor, O: Future outcome", "Implants in smokers vs non-smokers → implant loss at 10 years | Complete denture in flat ridge vs normal ridge → denture longevity"]
        ]
      }
    ],
    keyTerms: [
      { term: "Statement of Problem", definitionEn: "A concise statement highlighting the pressing issue the research intends to address.", explanationAr: "بيان المشكلة البحثية الذي يسلط الضوء على القضية الملحة التي يعالجها البحث.", slideRef: "Lec 3 (WA0017), Slides 2–3" },
      { term: "Research Background", definitionEn: "First part of the problem statement: explains what problem the research focuses on, how things would be better without it, what others tried, and what still needs to be figured out.", explanationAr: "خلفية البحث: الجزء الأول من بيان المشكلة.", slideRef: "Lec 3 (WA0017), Slides 6–7" },
      { term: "Research Significance", definitionEn: "Second part of the problem statement: clarifies impact on field and society, analyzes cause, explains who benefits, and illustrates relevance (location/process, period, severity).", explanationAr: "أهمية البحث: الجزء الثاني من بيان المشكلة.", slideRef: "Lec 3 (WA0017), Slides 6–7" },
      { term: "Solution (in Problem Statement)", definitionEn: "Third part of the problem statement: describes the research objective and expected solution or results.", explanationAr: "الحل المتوقع وهدف البحث: الجزء الثالث من بيان المشكلة.", slideRef: "Lec 3 (WA0017), Slides 6–7" },
      { term: "Observational Research", definitionEn: "Research where the investigator is passive, taking measurements for the population.", explanationAr: "البحث الرصدي: يكتفي فيه الباحث بأخذ القياسات دون تقديم تدخل علاجي.", slideRef: "Lec 3 (WA0017), Slide 9" },
      { term: "Clinical Trial", definitionEn: "Research where the investigator delivers the intervention and examines its effects.", explanationAr: "التجربة السريرية: يقوم فيها الباحث بإعطاء التدخل العلاجي وفحص آثاره.", slideRef: "Lec 3 (WA0017), Slide 9" },
      { term: "Prevalence (frequency)", definitionEn: "The proportion of people with the disease measured at one point in time (cross-sectional).", explanationAr: "معدل الانتشار: نسبة المصابين بالمرض في نقطة زمنية واحدة (دراسة مقطعية).", slideRef: "Lec 3 (WA0017), Slide 12" },
      { term: "Incidence (rate)", definitionEn: "The proportion of people who are new cases of the disease within a specified period (longitudinal).", explanationAr: "معدل الحدوث: نسبة الحالات الجديدة للمرض خلال فترة زمنية محددة (دراسة طولية).", slideRef: "Lec 3 (WA0017), Slide 12" },
      { term: "PECO / PEO", definitionEn: "Acronyms for Etiology questions (Population [healthy], Exposure, Comparison, Outcome [harm]).", explanationAr: "اختصار عناصر سؤال السببية/الضرر.", slideRef: "Lec 3 (WA0017), Slide 13" },
      { term: "PIRT", definitionEn: "Acronym for Diagnostic studies: Population (P), Index test (I), Reference test/control (R), Target condition/outcome (T).", explanationAr: "اختصار عناصر دراسات التشخيص.", slideRef: "Lec 3 (WA0017), Slide 14" }
    ],
    flashcards: [
      { id: "fc-3-1", front: "How does a Problem Statement differ between the business world and academic research (Slide 2)?", back: "• Business world: First step in kicking off an improvement project; usually a stand-alone document.\n• Academic research: Helps understand significance; several paragraphs in a research proposal OR condensed into a few sentences in the introduction." },
      { id: "fc-3-2", front: "What are the Three Important Parts of a Problem Statement (Slides 6–7)?", back: "1. Research Background\n2. Research Significance (location/process, period, severity)\n3. Solution (research objective & expected results)" },
      { id: "fc-3-3", front: "What is the difference between Prevalence and Incidence (Slide 12)?", back: "• Prevalence (frequency): Proportion of people with the disease at ONE point in time (Cross-sectional).\n• Incidence (rate): Proportion of people who are NEW cases within a specified period (Longitudinal)." },
      { id: "fc-3-4", front: "What does PIRT stand for in Diagnostic studies, and what is the lecture example (Slide 14)?", back: "• P: Population (patients with undiagnosed oral lesions)\n• I: Index test (clinical examination)\n• R: Reference test / control (oral biopsy)\n• T: Target condition / outcome (oral cancer)" },
      { id: "fc-3-5", front: "Why are Etiology questions called 'the reverse of intervention questions' (Slide 13)?", back: "Because they deal with the harmful outcomes of an activity or exposure: P starts as HEALTHY individuals, and O is HARM (using PECO or PEO)." }
    ],
    quickReview: [
      "في عالم الأعمال يكون بيان المشكلة وثيقة مستقلة (Stand-alone document)، وفي البحث الأكاديمي عدة فقرات في الـ Proposal أو بضع جمل في الـ Introduction.",
      "الأجزاء الثلاثة لبيان المشكلة: Research Background + Research Significance + Solution.",
      "تجنب الكلمات المطلقة مثل 'must' عند كتابة بيان المشكلة (Slide 8).",
      "Observational = Passive (أخذ قياسات فقط) | Clinical trial = Delivering the intervention.",
      "احفظ اختصارات أنواع الأسئلة: Prevalence = PO | Etiology = PECO/PEO | Diagnosis = PIRT | Therapy/Prevention & Prognosis = PICO/PIO."
    ]
  },

  /* ═══════════════════════════════════════════════════════════════════════
     LECTURE 4: RESEARCH HYPOTHESIS (DOC-20261016-WA0021.pdf — 27 SLIDES)
     ═══════════════════════════════════════════════════════════════════════ */
  {
    id: 4,
    code: "LEC-04",
    title: "Research Hypothesis & Statistical Testing",
    arabicTitle: "الفرضية البحثية والمتغيرات وأنواع الفرضيات واختبارها الإحصائي",
    instructor: "Prof. Hadeel Farouk",
    sourceFile: "DOC-20261016-WA0021.pdf (27 Slides — Complete Official File)",
    pdfUrl: "assets/pdfs/EBD_Lec_4_Research_Hypothesis.pdf",
    slideCount: "27 شريحة كاملة",
    status: "complete",
    statusBadge: "مكتمل 100% من الملف المرفق (27 شريحة)",
    mcqCount: 130,
    estimatedStudyTime: "50 دقيقة",
    overview: {
      summaryEn: "Opening with Sir William Osler's quote ('Medicine is the science of uncertainty and the art of probability'), this lecture distinguishes between a Research Question, its Answer (written in length in the discussion section), and a Research Hypothesis. It covers Independent vs. Dependent variables, the 3 ways to phrase a hypothesis (including if...then form), Null Hypothesis (H0) vs. Alternative Hypothesis (H1/Ha), p-value interpretation (< 5% threshold), the 10-point Research Hypothesis Checklist, and all types of hypotheses (Simple, Complex, Null, Alternative, Statistical, Empirical, Directional, and Non-Directional) with concrete examples.",
      summaryAr: "تستهل المحاضرة الرابعة (ملف DOC-20261016-WA0021.pdf — 27 شريحة) بمقولة السير ويليام أوسلر الشهيرة: 'الطب هو علم عدم اليقين وفن الاحتمالات'. ثم تفرّق بدقة بين السؤال البحثي وإجابته (التي تُكتب بالتفصيل في قسم المناقشة Discussion) والفرضية البحثية. وتشرح المتغيرات (Independent vs Dependent)، والطرق الثلاث لصياغة الفرضية، والفرضية الصفرية (H0) والبديلة (H1/Ha)، وكيفية اتخاذ القرار الإحصائي باستخدام قيمة الاحتمالية (p-value < 5%)، وقائمة الفحص ذات النقاط العشر (10-Point Checklist)، وجميع أنواع الفرضيات (Simple, Complex, Statistical, Empirical, Directional, Non-Directional) مع كافة الأمثلة الواردة في الشرائح.",
      learningObjectives: [
        "Distinguish between Research Question, Answer (written in length in the discussion section), and Research Hypothesis (Slide 3).",
        "Define Independent Variable (what you change/control) and Dependent Variable (what you observe/measure) and identify them in 'if...then' statements (Slides 3, 7–8).",
        "Formulate hypotheses in 3 ways: 'if...then' prediction, effect/correlation statement, and group comparison statement (Slides 8–9).",
        "Differentiate Null Hypothesis (H0: default position of no association, differences due to random chance) from Alternative Hypothesis (H1 or Ha) and interpret p-values (< 5% reject H0 vs. high p-value fail to reject H0) (Slides 10–15).",
        "Master the 10-Point Research Hypothesis Checklist: Testable, Specific, Based on prior research, Falsifiable, Clear and concise, Logical, Relevant, Feasible, Reflects the population, Uncomplicated (Slides 16–17).",
        "Classify any hypothesis into Simple (2 variables) vs. Complex (>2 variables), Directional vs. Non-Directional, Statistical, Empirical, Null, or Alternative (Slides 18–26)."
      ],
      slideImages: [
        {
          src: "assets/slides/lec4_slide8_phrase_hypothesis_3ways.png",
          caption: "Slide 8 (DOC-20261016-WA0021.pdf): Phrase Your Hypothesis in Three Ways (If...then form: Independent vs Dependent Variable)"
        },
        {
          src: "assets/slides/lec4_slide18_types_of_hypothesis.png",
          caption: "Slide 18 (DOC-20261016-WA0021.pdf): Type of Hypothesis Diagram (Alternative, Null, Complex, Simple, Statistical, Empirical)"
        }
      ]
    },
    sections: [
      {
        id: "lec4-sec1",
        title: "1. Opening Quote & Research Question vs. Answer vs. Hypothesis (Slides 2–6)",
        slideRef: "DOC-20261016-WA0021.pdf — Slides 2–6",
        contentEn: [
          "Opening Quote (Slide 2): 'Medicine is the science of uncertainty and the art of probability.' — Sir William Osler (1849–1919).",
          "Core Triad (Slide 3):",
          "• Research Question: Is what a study aims to answer after data analysis and interpretation.",
          "• Answer: The answer is written in length in the discussion section of the paper.",
          "• Research Hypothesis: It is an educated statement of an expected outcome. This statement is based on background research and current knowledge. The research hypothesis makes a specific prediction about a new phenomenon or a formal statement on the expected relationship between an independent variable (What you change) and a dependent variable (What you measure).",
          "What is a hypothesis? (Slides 5–6):",
          "• The sole purpose of a hypothesis is to predict your paper's findings, data, and conclusion. It comes from a place of curiosity.",
          "• When you write a hypothesis, you're essentially making an educated guess based on scientific prejudices and evidence, which is further proven or disproven through the scientific method.",
          "• For some research projects, you might have to write several hypotheses that address different aspects of your research question.",
          "• A hypothesis is NOT just a guess: (1) It should be based on existing theories and knowledge, and (2) It must be testable, meaning you can support or disprove it through scientific research methods (such as experiments, observations, and statistical data analysis)."
        ],
        explanationAr: "تبدأ المحاضرة بمقولة السير ويليام أوسلر (1849–1919): 'الطب هو علم عدم اليقين وفن الاحتمالات'. ثم تضع في الشريحة 3 مقارنة ثلاثية بالغة الأهمية:\n1. السؤال البحثي (Research Question): هو ما تهدف الدراسة للإجابة عنه بعد تحليل البيانات وتفسيرها.\n2. الإجابة (Answer): تُكتب بالتفصيل (Written in length) في قسم المناقشة (Discussion section) من الورقة البحثية.\n3. الفرضية البحثية (Research Hypothesis): هي عبارة علمية مدروسة لنتيجة متوقعة (Educated statement of an expected outcome) مبنية على البحث المسبق والمعرفة الحالية، وتقدم تنبؤًا محددًا حول ظاهرة جديدة أو بيانًا رسميًا للعلاقة المتوقعة بين المتغير المستقل (Independent variable: What you change) والمتغير التابع (Dependent variable: What you measure).\nوفي الشريحتين 5 و6 تؤكد أن الغرض الوحيد للفرضية هو التنبؤ بنتائج الورقة البحثية وبياناتها واستنتاجاتها، وأنها ليست مجرد تخمين عشوائي (Not just a guess) بل يجب أن تستند إلى نظريات ومعرفة قائمة وأن تكون قابلة للاختبار (Testable) عبر التجارب (Experiments) والملاحظات (Observations) والتحليل الإحصائي للبيانات (Statistical data analysis).",
        keyTakeaway: "Where is the Answer to the Research Question written in length? In the DISCUSSION section of the paper (Slide 3)."
      },
      {
        id: "lec4-sec2",
        title: "2. Variables in Hypotheses & Phrasing in Three Ways (Slides 7–9)",
        slideRef: "DOC-20261016-WA0021.pdf — Slides 7–9",
        contentEn: [
          "Variables in hypotheses (Slide 7): Hypotheses propose a relationship between two or more types of variables:",
          "• Independent variable: Something the researcher changes or controls.",
          "• Dependent variable: Something the researcher observes and measures.",
          "Phrase your hypothesis in three ways (Slides 8–9):",
          "1. 'If…then' form (Simple prediction): The first part of the sentence states the independent variable, and the second part states the dependent variable.",
          "   • Example: 'If a first-year student starts attending more lectures, then their exam scores will improve.'",
          "2. Effect / Correlation statement: States the effect of one variable on another.",
          "   • Example: 'The number of lectures attended by first-year students has a positive effect on their exam scores.'",
          "3. Group Comparison statement: If comparing two groups, states what difference you expect to find between them.",
          "   • Example: 'First-year students who attended most lectures will have better exam scores than those who attended few lectures.'"
        ],
        explanationAr: "تقترح الفرضية علاقة بين متغيرين أو أكثر:\n• المتغير المستقل (Independent variable): هو الشيء الذي يغيره الباحث أو يتحكم فيه (Changes or controls). وفي مثال حضور المحاضرات هو: (Number of lectures attended).\n• المتغير التابع (Dependent variable): هو الشيء الذي يلاحظه الباحث ويقيسه (Observes and measures). وفي المثال هو: (Final exam scores).\nويمكن صياغة الفرضية بثلاث طرق (Slides 8–9):\n1. صيغة الشرط (If...then form): الجزء الأول من الجملة يذكر المتغير المستقل، والجزء الثاني يذكر المتغير التابع.\n2. صيغة التأثير المباشر: عدد المحاضرات له تأثير إيجابي على درجات الامتحان.\n3. صيغة المقارنة بين مجموعتين: الطلاب الذين حضروا معظم المحاضرات سيحصلون على درجات أفضل من الذين حضروا محاضرات قليلة.",
        keyTakeaway: "In an 'If...then' hypothesis: First part ('If...') = Independent Variable; Second part ('then...') = Dependent Variable (Slide 8)."
      },
      {
        id: "lec4-sec3",
        title: "3. Null Hypothesis (H0), Alternative Hypothesis (H1/Ha) & P-Value Rules (Slides 10–15)",
        slideRef: "DOC-20261016-WA0021.pdf — Slides 10–15",
        contentEn: [
          "Null Hypothesis (H0) vs. Alternative Hypothesis (H1 or Ha) (Slides 10–12):",
          "• If your research involves statistical hypothesis testing, you must write a null hypothesis.",
          "• The null hypothesis (H0) is the default position that there is no association between the variables.",
          "• Lecture Attendance Scenario (Slides 10–12):",
          "  - H0 (Null): 'The number of lectures attended by first-year students has no effect on their final exam scores.' (**Going to class makes zero difference. Any difference in scores is just due to random chance.)",
          "  - H1 / Ha (Alternative): 'The number of lectures attended by first-year students has a positive effect on their final exam scores.' (**Going to class actually helps students score higher.)",
          "P-Value Decision Rule (Slide 13):",
          "• You calculate the probability (p-value) of seeing your data if the Null Hypothesis were true:",
          "  - If the probability is very low (usually less than 5%): You REJECT the Null Hypothesis and say, 'The evidence supports the Alternative Hypothesis.'",
          "  - If the probability is high: You FAIL TO REJECT the Null Hypothesis (meaning, there isn't enough evidence to prove an effect).",
          "Autism Reinforcement Example (Slide 14):",
          "• An investigator examines three types of reinforcement for children with autism: verbal cues, a reward, and no reinforcement, collecting behavioral measures to assess social interaction with their siblings.",
          "• H0: 'There is no significant difference between the effects of verbal cues, rewards, and no reinforcement in terms of social interaction for children with autism and their siblings.'",
          "Four Classic Table Examples (Slide 15):",
          "1. Apple a day: Question: 'What are the health benefits of eating an apple a day?' | Hypothesis: 'Increasing apple consumption in over-60s will result in decreasing frequency of doctor's visits.' | Null Hypothesis: 'Increasing apple consumption in over-60s will have no effect on frequency of doctor's visits.'",
          "2. Airlines delays: Question: 'Which airlines have the most delays?' | Hypothesis: 'Low-cost airlines are more likely to have delays than premium airlines.' | Null Hypothesis: 'Low-cost and premium airlines are equally likely to have delays.'",
          "3. Flexible work: Question: 'Can flexible work arrangements improve job satisfaction?' | Hypothesis: 'Employees who have flexible working hours will report greater job satisfaction than employees who work fixed hours.' | Null Hypothesis: 'There is no relationship between working hour flexibility and job satisfaction.'",
          "4. Social media & attention span: Question: 'What effect does daily use of social media have on the attention span of under-16s?' | Hypothesis: 'There is a negative correlation between time spent on social media and attention span in under-16s.' | Null Hypothesis: 'There is no relationship between social media use and attention span in under-16s.'"
        ],
        explanationAr: "عند إجراء اختبار الفرضيات الإحصائي (Statistical hypothesis testing):\n• الفرضية الصفرية (Null Hypothesis — H0): هي الموقف الافتراضي (Default position) الذي ينص على عدم وجود ارتباط بين المتغيرات (No association/effect)، وأن أي فرق مُلاحظ في الدرجات يعود فقط إلى الصدفة العشوائية (Random chance).\n• الفرضية البديلة (Alternative Hypothesis — H1 or Ha): تنص على وجود علاقة أو أثر فعلي.\n• قاعدة الـ P-value (الشريحة 13):\n  - قيمة p-value هي احتمالية رؤية هذه البيانات بفرض أن الفرضية الصفرية H0 صحيحة.\n  - إذا كانت الاحتمالية منخفضة جدًا (عادةً أقل من 5% أي p < 0.05): نرفض الفرضية الصفرية (Reject H0) ونقول إن الدليل يدعم الفرضية البديلة (The evidence supports the Alternative Hypothesis).\n  - إذا كانت الاحتمالية مرتفعة (High): نفشل في رفض الفرضية الصفرية (Fail to reject H0)، مما يعني عدم وجود دليل كافٍ لإثبات وجود أثر.",
        keyTakeaway: "Low p-value (< 5%) → REJECT H0 (evidence supports H1). High p-value → FAIL TO REJECT H0 (not enough evidence to prove an effect)."
      },
      {
        id: "lec4-sec4",
        title: "4. The 10-Point Research Hypothesis Checklist (Slides 16–17)",
        slideRef: "DOC-20261016-WA0021.pdf — Slides 16–17",
        contentEn: [
          "Here is a 10-point checklist for a good research hypothesis:",
          "1. Testable: A research hypothesis should be able to be tested via experimentation or observation.",
          "2. Specific: A research hypothesis should clearly state the relationship between the variables being studied.",
          "3. Based on prior research: A research hypothesis should be based on existing knowledge and previous research in the field.",
          "4. Falsifiable: A research hypothesis should be able to be disproven through testing.",
          "5. Clear and concise: A research hypothesis should be stated clearly and concisely.",
          "6. Logical: A research hypothesis should be logical and consistent with the current understanding of the subject.",
          "7. Relevant: A research hypothesis should be relevant to the research question and objectives.",
          "8. Feasible: A research hypothesis should be feasible to test within the scope of the study.",
          "9. Reflects the population: A research hypothesis should consider the population or sample being studied.",
          "10. Uncomplicated: A good research hypothesis is written in a way that is easy for the target audience to understand."
        ],
        explanationAr: "تضم الشريحتان 16 و17 قائمة فحص مكونة من 10 معايير للفرضية البحثية الجيدة، ويجب التمييز الدقيق بين تعريف كل مصطلح فيها:\n1. Testable (قابلة للاختبار): يمكن اختبارها عبر التجربة أو الملاحظة.\n2. Specific (محددة): تذكر بوضوح العلاقة بين المتغيرات المدروسة.\n3. Based on prior research (مبنية على أبحاث سابقة): تستند إلى المعرفة القائمة والأبحاث السابقة.\n4. Falsifiable (قابلة للدحض/التكذيب): يمكن إثبات خطئها (Disproven) من خلال الاختبار.\n5. Clear and concise (واضحة وموجزة).\n6. Logical (منطقية): متسقة مع الفهم الحالي للموضوع.\n7. Relevant (ذات صلة): مرتبطة بالسؤال البحثي وأهدافه.\n8. Feasible (قابلة للتنفيذ): يمكن اختبارها ضمن نطاق الدراسة (Within the scope of the study).\n9. Reflects the population (تعكس المجتمع): تراعي المجتمع أو العينة المدروسة.\n10. Uncomplicated (غير معقدة): مكتوبة بطريقة يسهل على الجمهور المستهدف فهمها.",
        keyTakeaway: "Distinguish carefully: 'Testable' = can be tested via experimentation or observation; 'Falsifiable' = can be disproven through testing; 'Uncomplicated' = easy for the target audience to understand."
      },
      {
        id: "lec4-sec5",
        title: "5. Types of Hypotheses & Applied Examples (Slides 18–26)",
        slideRef: "DOC-20261016-WA0021.pdf — Slides 18–26",
        contentEn: [
          "Diagram of 6 Types of Hypothesis (Slide 18): Alternative Hypothesis, Null Hypothesis, Complex Hypothesis, Simple Hypothesis, Statistical Hypothesis, Empirical Hypothesis.",
          "Detailed Definitions & Examples (Slides 19–26):",
          "1. Simple Hypothesis (Slide 19): A hypothesis that reflects or shows a relationship between TWO variables — one Independent and one Dependent variable.",
          "   • Lecture Example: 'The higher the unemployment, the higher would be the rate of crime in society.' (2 variables: Unemployment [Independent] & Rate of crime [Dependent]).",
          "2. Complex Hypothesis (Slide 20): A hypothesis that reflects a relationship between MORE THAN TWO variables.",
          "   • Lecture Example: 'The higher the Poverty, the higher the illiteracy (الأمية) in society, higher will be the rate of crime (Three Variables - Two Independent and One Dependent).'",
          "3. Statistical Hypothesis (Slide 22): A hypothesis that can be verified statistically.",
          "4. Directional Hypothesis (Slide 23): Predicts the positivity or negativity of the effect of an intervention before the test is conducted.",
          "5. Non-Directional Hypothesis (Slide 24): Does NOT specify the predicted direction (e.g., positivity or negativity) of the effect of the independent variable on the dependent variable. These hypotheses predict an effect but stop short of saying what that effect will be.",
          "Three Closing Study Examples (Slides 25–26):",
          "• Example 1 (Effects of exercise on weight loss): H0: 'There is no significant difference in weight loss between individuals who engage in regular exercise and those who do not.' | H1: 'Individuals who engage in regular exercise will experience greater weight loss compared to those who do not exercise.'",
          "• Example 2 (Impact of social media on self-esteem): H0: 'There is no significant relationship between social media usage and self-esteem levels.' | H1: 'Increased social media usage is associated with lower self-esteem levels.'",
          "• Example 3 (Effectiveness of a new teaching method in improving student performance): H0: 'There is no significant difference in student performance between the traditional teaching method and the new teaching method.' | H1: 'The new teaching method leads to improved student performance compared to the traditional teaching method.'"
        ],
        explanationAr: "في الشرائح 18–26 تفصيل دقيق لأنواع الفرضيات مع أمثلتها النصية:\n• الفرضية البسيطة (Simple Hypothesis): تربط بين متغيرين اثنين فقط (متغير مستقل واحد ومتغير تابع واحد)، مثل: كلما ارتفعت البطالة (Unemployment)، ارتفع معدل الجريمة (Rate of crime).\n• الفرضية المركبة (Complex Hypothesis): تربط بين أكثر من متغيرين (More than two variables)، ومثال المحاضرة الشهير يحتوي على 3 متغيرات (متغيرين مستقلين هما الفقر Poverty والأمية Illiteracy، ومتغير تابع واحد هو معدل الجريمة Rate of crime).\n• الفرضية الإحصائية (Statistical Hypothesis): هي الفرضية التي يمكن التحقق منها إحصائيًا (Can be verified statistically).\n• الفرضية الاتجاهية (Directional Hypothesis): تتنبأ باتجاه الأثر (إيجابيًا أو سلبيًا — Positivity or negativity) قبل إجراء الاختبار.\n• الفرضية غير الاتجاهية (Non-Directional Hypothesis): تتنبأ بوجود أثر لكنها تتوقف عند ذلك ولا تحدد اتجاه هذا الأثر (هل هو إيجابي أم سلبي).",
        keyTakeaway: "Simple Hypothesis = 2 variables (Unemployment → Crime). Complex Hypothesis = >2 variables (Poverty + Illiteracy → Crime: 2 Independent + 1 Dependent)."
      }
    ],
    difficultConcepts: [
      {
        title: "لماذا نقول 'Fail to reject H0' ولا نقول 'Accept/Prove H0' عند ارتفاع الـ p-value؟ (Slide 13)",
        difficulty: "مرتفع — دقة إحصائية مهمة",
        curriculumFact: "Slide 13 states: 'If the probability is high, you fail to reject the Null Hypothesis (meaning, there isn't enough evidence to prove an effect).'",
        explanationAr: "عندما تكون قيمة الاحتمالية (p-value) مرتفعة (أكبر من 5%)، فإننا لا نثبت أن الفرضية الصفرية صحيحة بنسبة 100%، بل نقول: نفشل في رفض الفرضية الصفرية (Fail to reject the Null Hypothesis)؛ أي إنه لا يوجد في بياناتنا الحالية دليل كافٍ لإثبات وجود التأثير."
      },
      {
        title: "الفرق بين Directional Hypothesis و Non-Directional Hypothesis (Slides 23–24)",
        difficulty: "متوسط",
        curriculumFact: "Directional predicts the positivity or negativity of the effect before the test. Non-directional predicts an effect exists but does not specify its direction (positivity or negativity).",
        explanationAr: "كلاهما ينتمي للفرضية البديلة التي تتوقع وجود علاقة أو أثر، لكن:\n• إذا حددت الفرضية اتجاه الأثر بكلمات مثل (positive effect, negative correlation, greater weight loss, lower self-esteem, improved performance) فهي Directional.\n• إذا قالت الفرضية فقط 'يوجد فرق' أو 'يوجد تأثير' (There is a difference / effect) دون تحديد أيهما أكبر أو هل الأثر إيجابي أم سلبي فهي Non-Directional."
      }
    ],
    comparisons: [
      {
        title: "مقارنة بين Research Question و Research Hypothesis و Answer (Slide 3)",
        headers: ["العنصر", "التعريف والوظيفة حسب الشريحة 3", "موقعه أو صياغته في البحث"],
        rows: [
          ["Research Question (السؤال البحثي)", "What a study aims to answer after data analysis and interpretation", "صيغة استفهامية تحدد هدف الدراسة"],
          ["Answer (الإجابة)", "The detailed answer reached after data analysis and interpretation", "Written in length in the DISCUSSION section of the paper"],
          ["Research Hypothesis (الفرضية البحثية)", "An educated statement of an expected outcome based on background research and current knowledge", "تنبؤ محدد أو بيان رسمي للعلاقة المتوقعة بين المتغير المستقل والتابع"]
        ]
      },
      {
        title: "مقارنة بين أنواع الفرضيات في المحاضرة الرابعة (Slides 10–24)",
        headers: ["نوع الفرضية", "التعريف الدقيق في المحاضرة", "مثال من الشرائح"],
        rows: [
          ["Simple Hypothesis", "Reflects a relationship between TWO variables (1 Independent + 1 Dependent)", "The higher the unemployment, the higher would be the rate of crime in society"],
          ["Complex Hypothesis", "Reflects a relationship between MORE THAN TWO variables", "The higher the Poverty, the higher the illiteracy in society, higher will be the rate of crime (2 Independent + 1 Dependent)"],
          ["Null Hypothesis (H0)", "Default position that there is NO association/difference between variables (any difference is due to random chance)", "The number of lectures attended by first-year students has no effect on their final exam scores"],
          ["Alternative Hypothesis (H1/Ha)", "States that there IS an association, effect, or difference between variables", "The number of lectures attended by first-year students has a positive effect on their final exam scores"],
          ["Directional Hypothesis", "Predicts the positivity or negativity of the effect of an intervention before the test is conducted", "Increased social media usage is associated with lower self-esteem levels"],
          ["Non-Directional Hypothesis", "Predicts an effect on the dependent variable but does NOT specify the predicted direction (positivity or negativity)", "There is a difference in performance between the two methods (without specifying which is better)"],
          ["Statistical Hypothesis", "A hypothesis that can be verified statistically", "H0 and H1 tested via p-value (< 5%)"]
        ]
      }
    ],
    keyTerms: [
      { term: "Research Question", definitionEn: "What a study aims to answer after data analysis and interpretation.", explanationAr: "السؤال البحثي الذي تهدف الدراسة للإجابة عنه بعد تحليل البيانات وتفسيرها.", slideRef: "Lec 4 (WA0021), Slide 3" },
      { term: "Research Hypothesis", definitionEn: "An educated statement of an expected outcome based on background research and current knowledge, predicting the relationship between an independent and a dependent variable.", explanationAr: "الفرضية البحثية: بيان علمي مدروس لنتيجة متوقعة يحدد العلاقة بين المتغير المستقل والتابع.", slideRef: "Lec 4 (WA0021), Slide 3" },
      { term: "Independent Variable", definitionEn: "Something the researcher changes or controls ('What you change'). Stated in the first part of an 'if...then' hypothesis.", explanationAr: "المتغير المستقل: ما يغيره الباحث أو يتحكم فيه.", slideRef: "Lec 4 (WA0021), Slides 3, 7–8" },
      { term: "Dependent Variable", definitionEn: "Something the researcher observes and measures ('What you measure'). Stated in the second part of an 'if...then' hypothesis.", explanationAr: "المتغير التابع: ما يلاحظه الباحث ويقيسه.", slideRef: "Lec 4 (WA0021), Slides 3, 7–8" },
      { term: "Null Hypothesis (H0)", definitionEn: "The default position in statistical hypothesis testing that there is no association between the variables (any difference is due to random chance).", explanationAr: "الفرضية الصفرية (فرضية العدم): تفترض عدم وجود علاقة أو أثر بين المتغيرات.", slideRef: "Lec 4 (WA0021), Slides 10, 12" },
      { term: "Alternative Hypothesis (H1 or Ha)", definitionEn: "The hypothesis stating that there is an actual effect, association, or difference between variables.", explanationAr: "الفرضية البديلة: تفترض وجود علاقة أو أثر حقيقي بين المتغيرات.", slideRef: "Lec 4 (WA0021), Slides 10, 12" },
      { term: "p-value", definitionEn: "The probability of seeing your data if the Null Hypothesis were true. If very low (< 5%), reject H0; if high, fail to reject H0.", explanationAr: "قيمة الاحتمالية الإحصائية؛ إذا كانت أقل من 5% نرفض H0.", slideRef: "Lec 4 (WA0021), Slide 13" },
      { term: "Falsifiable", definitionEn: "A research hypothesis characteristic meaning it is able to be disproven through testing.", explanationAr: "القابلية للدحض: إمكانية إثبات خطأ الفرضية بالاختبار العلمي.", slideRef: "Lec 4 (WA0021), Slide 16" },
      { term: "Simple Hypothesis", definitionEn: "A hypothesis that reflects or shows a relationship between two variables (one independent and one dependent).", explanationAr: "الفرضية البسيطة: توضح علاقة بين متغيرين اثنين فقط.", slideRef: "Lec 4 (WA0021), Slide 19" },
      { term: "Complex Hypothesis", definitionEn: "A hypothesis that reflects a relationship between more than two variables.", explanationAr: "الفرضية المركبة: توضح علاقة بين أكثر من متغيرين.", slideRef: "Lec 4 (WA0021), Slide 20" },
      { term: "Directional Hypothesis", definitionEn: "A hypothesis that predicts the positivity or negativity of the effect of an intervention before the test is conducted.", explanationAr: "الفرضية الاتجاهية: تحدد اتجاه الأثر المتوقع (إيجابي أو سلبي) قبل الاختبار.", slideRef: "Lec 4 (WA0021), Slide 23" },
      { term: "Non-Directional Hypothesis", definitionEn: "A hypothesis that predicts an effect but does not specify the predicted direction (positivity or negativity) of the effect.", explanationAr: "الفرضية غير الاتجاهية: تتوقع وجود أثر دون تحديد اتجاهه.", slideRef: "Lec 4 (WA0021), Slide 24" }
    ],
    flashcards: [
      { id: "fc-4-1", front: "Who said 'Medicine is the science of uncertainty and the art of probability' (Slide 2)?", back: "Sir William Osler (1849–1919).\n(Ref: Lec 4, Slide 2)" },
      { id: "fc-4-2", front: "Where is the answer to the research question written in length (Slide 3)?", back: "In the DISCUSSION section of the paper.\n(Ref: Lec 4, Slide 3)" },
      { id: "fc-4-3", front: "In an 'if...then' hypothesis, which part states the independent variable and which part states the dependent variable (Slide 8)?", back: "• First part ('If...'): Independent variable (what you change/control)\n• Second part ('then...'): Dependent variable (what you observe/measure)\n(Ref: Lec 4, Slide 8)" },
      { id: "fc-4-4", front: "What is the decision rule for the p-value in hypothesis testing (Slide 13)?", back: "• If p-value is very low (usually < 5%): REJECT the Null Hypothesis (H0); evidence supports the Alternative Hypothesis (H1).\n• If p-value is high: FAIL TO REJECT the Null Hypothesis (H0)." },
      { id: "fc-4-5", front: "Compare Simple Hypothesis and Complex Hypothesis with the exact lecture examples (Slides 19–20).", back: "• Simple Hypothesis (2 variables: 1 Indep + 1 Dep): 'The higher the unemployment, the higher would be the rate of crime in society.'\n• Complex Hypothesis (>2 variables: 2 Indep + 1 Dep): 'The higher the Poverty, the higher the illiteracy in society, higher will be the rate of crime.'" },
      { id: "fc-4-6", front: "What are the 10 points of the Research Hypothesis Checklist (Slides 16–17)?", back: "1. Testable\n2. Specific\n3. Based on prior research\n4. Falsifiable\n5. Clear and concise\n6. Logical\n7. Relevant\n8. Feasible\n9. Reflects the population\n10. Uncomplicated" }
    ],
    quickReview: [
      "مقولة Sir William Osler: 'Medicine is the science of uncertainty and the art of probability'.",
      "الإجابة عن الـ Research Question تُكتب بالتفصيل في قسم الـ Discussion.",
      "Independent variable = What you change/control (الجزء الأول من جملة If...then) | Dependent variable = What you measure/observe (الجزء الثاني من جملة If...then).",
      "H0 (Null Hypothesis) = Default position of NO association (random chance) | H1/Ha = Alternative Hypothesis.",
      "إذا كانت p-value < 5% نرفض H0 (Reject H0)، وإذا كانت مرتفعة نفشل في رفض H0 (Fail to reject H0).",
      "Simple Hypothesis = متغيران فقط (Unemployment & Crime) | Complex Hypothesis = أكثر من متغيرين (Poverty + Illiteracy & Crime).",
      "Directional Hypothesis تحدد إيجابية أو سلبية الأثر قبل الاختبار، بينما Non-Directional تتوقع وجود أثر دون تحديد اتجاهه."
    ]
  }
];
