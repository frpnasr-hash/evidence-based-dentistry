# 🦷 EBD Advanced Learning Platform — منصة طب الأسنان المبني على الدليل

منصة تعليمية جامعية متكاملة لمادة **Evidence-Based Dentistry (EBD)** وفق منهج وشرائح **أ.د. هديل فاروق (Prof. Hadeel Farouk)**، مصممة لتوفير تجربة مذاكرة ومراجعة واختبار احترافية وسريعة لطلاب طب الأسنان.

---

## ✨ الميزات الثلاث الرئيسية

1. **EBD Smart Source Library (مكتبة مصادر الشرح الذكية):**
   - تضم **29 مصدرًا تعليميًا مرئيًا ومسموعًا** تم التحقق الفعلي من روابطها عبر YouTube oEmbed API.
   - مرتبة حسب الأولوية: **الفئة الأولى: الأساتذة والأطباء المصريون (10 مصادر)** ← **الفئة الثانية: الأساتذة والمحاضرون العرب (7 مصادر)** ← **الفئة الثالثة: الجمعيات والجامعات الأجنبية مثل ADA وUBC وMental Dental (12 مصدرًا)**.
   - تدعم البحث، التصفية حسب المحاضرة والفئة ودرجة المطابقة، الحفظ في المفضلة، والمشاهدة داخل مشغل مدمج مزود بالطوابع الزمنية وتدوين الملاحظات.

2. **EBD Understanding Studio (استوديو فهم المحاضرات والمراجعة):**
   - صفحة مستقلة لكل محاضرة من المحاضرات الأربع مقسمة إلى **7 تبويبات منظمة**:
     1. `Overview` — نظرة عامة وأهداف التعلم والرسوم الأصلية من الشرائح.
     2. `Lecture Content` — النص الإنجليزي الأصلي للشرائح مشروحًا بالعربية بوضوح مع تمييز أهم نقاط الامتحان.
     3. `Difficult Concepts` — تفكيك المفاهيم الدقيقة ومواضع الأسئلة الامتحانية.
     4. `Key Terms & Comparisons` — جداول المقارنة المنهجية وقاموس المصطلحات العلمية.
     5. `Flashcards` — بطاقات التذكر النشط القابلة للقلب.
     6. `Quick Review` — ملخص نقاط ليلة الامتحان السريعة.
     7. `Related Videos & Practice` — الانتقال المباشر لفيديوهات المحاضرة وأسئلتها.

3. **EBD Exam & MCQ Center (بنك الأسئلة الجامعي — 500 سؤال مدقق):**
   - يضم **500 سؤال اختيار من متعدد (MCQ)** مستخرجة **حصريًا بنسبة 100%** من ملفات المحاضرات الرسمية دون أي إضافات خارج المنهج:
     - **Lecture 1 (45 سؤالًا):** *Foundations & Steps in EBD (5 A's Cycle & Detailed Steps)* — من الشرائح 2–3 في `EBD_Lec_2.pdf`.
     - **Lecture 2 (190 سؤالًا):** *Research Question, Background vs Foreground, PICO/PICOT/PICOTS, Tables 16–17, FINER Criteria & 5 Dental Cases* — من `EBD_Lec_2.pdf` (37 شريحة).
     - **Lecture 3 (135 سؤالًا):** *Statement of Problem, Business vs Academic, 2-Step Strategy, 3 Key Parts, Vitamin D Example, Observational vs Clinical Trial, PICO Phrasing & 5 Types of Questions (PO, PECO/PEO, PIRT, PICO/PIO)* — من `DOC-20261009-WA0017.pdf` (18 شريحة).
     - **Lecture 4 (130 سؤالًا):** *Research Hypothesis, Sir William Osler Quote, Question vs Answer vs Hypothesis, Independent vs Dependent Variables, 3 Ways to Phrase, H0 vs H1/Ha, P-value (<5%), 10-Point Checklist & All Hypothesis Types* — من `DOC-20261016-WA0021.pdf` (27 شريحة).
   - يدعم **وضع التدريب الفوري (Practice Mode)** و**وضع الامتحان التجريبي (Exam Mode)**، مع خريطة تغطية المنهج، حفظ التقدم، ومراجعة الأخطاء.

---

## 📁 هيكل المشروع

```text
├── index.html                        # الصفحة الرئيسية وهيكل التطبيق المتجاوب
├── vercel.json                       # إعدادات النشر المباشر على Vercel
├── package.json                      # إعدادات فحص وبناء المشروع
├── assets/
│   ├── css/
│   │   └── ebd-platform.css          # التنسيقات الأكاديمية المتجاوبة والوضع الليلي/النهاري
│   ├── js/
│   │   ├── ebd-sources.js            # بيانات الـ 29 مصدرًا المحققة لمكتبة الشرح
│   │   ├── ebd-curriculum.js         # محتوى المحاضرات الأربع واستوديو الفهم
│   │   ├── ebd-mcq-bank.js           # بنك الـ 500 سؤال MCQ المدقق وخريطة التغطية
│   │   └── ebd-app.js                # محرك التنقل، البحث الشامل، المشغل، والاختبارات
│   ├── pdfs/                         # ملفات الـ PDF الرسمية للمحاضرات
│   └── slides/                       # الجداول والمخططات المستخرجة من شرائح المحاضرات
└── scripts/
    ├── build_mcq_bank.py             # أسئلة المحاضرة الأولى (45 سؤالًا)
    ├── lec2_questions.py             # أسئلة المحاضرة الثانية (190 سؤالًا)
    ├── lec3_questions.py             # أسئلة المحاضرة الثالثة (135 سؤالًا)
    ├── lec4_questions.py             # أسئلة المحاضرة الرابعة (130 سؤالًا)
    └── compile_mcq_bank.py           # أداة التجميع والتحقق الآلي من الـ 500 سؤال
```

---

## 🚀 طريقة التشغيل والنشر على Vercel

### 1. التشغيل المحلي (Local Preview)
المشروع مبني ببنية قياسية متوافقة مع المتصفح وVercel دون تعقيدات خارجية:
```bash
npm run build
python3 -m http.server 3000
```
ثم افتح المتصفح على `http://localhost:3000`.

### 2. النشر على Vercel
- **عبر GitHub:** اربط مستودع `evidence-based-dentistry` بحسابك في Vercel واضغط **Deploy** (الإعدادات مضبوطة تلقائيًا عبر `vercel.json`: أمر البناء `npm run build` يولّد `assets/js/ebd-mcq-bank.js`، ومجلد الإخراج هو جذر المشروع `"."` لأن `index.html` و`assets/` موجودان في الجذر — لا يوجد مجلد `public`/`dist`).
- **أو عبر رفع حزمة ZIP:** فك ضغط حزمة `EBD_Learning_Platform_Vercel_Ready.zip` وارفع المجلد إلى Vercel أو عبر الأمر `npx vercel --prod`.
