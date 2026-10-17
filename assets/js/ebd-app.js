/* ═══════════════════════════════════════════════════════════════════════════
   EBD ADVANCED LEARNING PLATFORM — CORE APPLICATION ENGINE (ebd-app.js)
   Features:
     1. Multi-Page Client-Side Router with URL Hash Support & Breadcrumbs
     2. EBD Smart Source Library (Filter by Lecture, Tier/Nationality, Language, Match Level, Sort, Favorites, Embedded Player with Timestamps & Notes)
     3. EBD Understanding Studio (7 Tabs per Lecture: Overview, Lecture Content, Difficult Concepts, Key Terms & Comparisons, Flashcards, Quick Review, Related Videos & Practice)
     4. EBD Exam & MCQ Center (500 Questions, Filter by Lecture/Subtopic/Difficulty, Instant Practice Mode vs Timed/Full Exam Mode, Question Navigator, Skip/Return, Wrong Answers Review, Retake Wrong/Unanswered, Coverage Map)
     5. Global Multi-Group Search Engine (Lectures, Subtopics, Scientific Terms, Videos/Instructors, and 500 MCQs with Typo Tolerance & Live Suggestions)
     6. Persistent Student Progress, Bookmarks, Completed Sections, & Personal Study Notes (localStorage)
   ═══════════════════════════════════════════════════════════════════════════ */

(() => {
  "use strict";

  const STORAGE_KEY = "ebd_platform_state_v1";

  const defaultState = {
    theme: "light",
    lastRoute: "home",
    lastLectureId: 2,
    lastStudioTab: "overview",
    favoriteSources: [],
    bookmarkedQuestions: [],
    completedSections: [],
    answeredQuestions: {}, // { [qid]: { selectedIndex, isCorrect, timestamp } }
    wrongQuestionIds: [],
    lectureNotes: {},      // { [lectureId]: "text" }
    sourceNotes: {},       // { [sourceId]: "text" }
    examHistory: []        // [{ date, mode, score, total, pct, lectureFilter }]
  };

  let state = loadState();

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { ...defaultState };
      const parsed = JSON.parse(raw);
      return { ...defaultState, ...parsed };
    } catch (e) {
      return { ...defaultState };
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      /* ignore quota errors */
    }
  }

  /* ══════════ UTILITY HELPERS ══════════ */
  const esc = (s) =>
    String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  function getLecture(id) {
    return (window.EBD_LECTURES || []).find((l) => Number(l.id) === Number(id)) || window.EBD_LECTURES[0];
  }

  function applyTheme() {
    document.documentElement.setAttribute("data-theme", state.theme || "light");
    const btn = document.getElementById("theme-toggle-btn");
    if (btn) btn.textContent = state.theme === "dark" ? "☀️" : "🌙";
  }

  function toggleTheme() {
    state.theme = state.theme === "dark" ? "light" : "dark";
    saveState();
    applyTheme();
  }

  /* ══════════ ROUTER & NAVIGATION ══════════ */
  let currentRoute = "home";
  let currentParams = {};

  // Active MCQ Session State
  let mcqSession = {
    active: false,
    mode: "practice", // "practice" | "exam"
    submitted: false,
    questions: [],
    currentIndex: 0,
    answers: {}, // { [qid]: selectedOptionIdx }
    skipped: {}, // { [qid]: true }
    filters: {
      lectureId: "all",
      subtopic: "all",
      difficulty: "all",
      count: "25",
      shuffle: true,
      poolMode: "all" // "all" | "wrong" | "unanswered" | "bookmarked"
    }
  };

  // Source Library Filter State
  let sourceFilter = {
    query: "",
    lectureId: "all",
    nationality: "all",
    language: "all",
    matchLevel: "all",
    sortBy: "priority", // "priority" (Egyptian -> Arab -> Int) | "match" | "quality" | "duration"
    onlyFavorites: false
  };

  function navigate(route, params = {}, updateHash = true) {
    currentRoute = route;
    currentParams = params || {};

    if (route.startsWith("lecture-")) {
      const lid = parseInt(route.split("-")[1], 10);
      if (lid >= 1 && lid <= 4) {
        state.lastLectureId = lid;
        if (params.tab) state.lastStudioTab = params.tab;
      }
    } else if (route === "studio" && params.lectureId) {
      state.lastLectureId = Number(params.lectureId);
      if (params.tab) state.lastStudioTab = params.tab;
    }

    state.lastRoute = route;
    saveState();

    if (updateHash) {
      let hash = `#${route}`;
      if (params.lectureId) hash += `?lec=${params.lectureId}`;
      if (params.tab) hash += (hash.includes("?") ? "&" : "?") + `tab=${params.tab}`;
      if (window.location.hash !== hash) {
        history.pushState(null, "", hash);
      }
    }

    // Close mobile menu if open
    const navLinks = document.getElementById("main-nav-links");
    if (navLinks) navLinks.classList.remove("open");

    renderNavbarActive();
    renderBreadcrumbs();
    renderMainView();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function parseHashAndNavigate() {
    const raw = (window.location.hash || "#home").replace(/^#/, "");
    const [routePart, queryPart] = raw.split("?");
    const params = {};
    if (queryPart) {
      const usp = new URLSearchParams(queryPart);
      if (usp.get("lec")) params.lectureId = Number(usp.get("lec"));
      if (usp.get("tab")) params.tab = usp.get("tab");
      if (usp.get("q")) params.q = usp.get("q");
    }
    navigate(routePart || "home", params, false);
  }

  function renderNavbarActive() {
    document.querySelectorAll("[data-route]").forEach((el) => {
      const r = el.getAttribute("data-route");
      const isLec = currentRoute.startsWith("lecture-") && r === "course";
      if (r === currentRoute || isLec) {
        el.classList.add("active");
      } else {
        el.classList.remove("active");
      }
    });

    document.querySelectorAll("[data-jump-lec]").forEach((el) => {
      const lid = Number(el.getAttribute("data-jump-lec"));
      if (currentRoute === `lecture-${lid}`) {
        el.classList.add("active");
      } else {
        el.classList.remove("active");
      }
    });
  }

  function renderBreadcrumbs() {
    const bc = document.getElementById("breadcrumbs-bar");
    if (!bc) return;

    const map = {
      home: [{ label: "الرئيسية (Dashboard)", route: "home" }],
      course: [
        { label: "الرئيسية", route: "home" },
        { label: "مقرر EBD (Course Overview)", route: "course" }
      ],
      "lecture-1": [
        { label: "الرئيسية", route: "home" },
        { label: "مقرر EBD", route: "course" },
        { label: "المحاضرة 1: Foundations & Steps in EBD", route: "lecture-1" }
      ],
      "lecture-2": [
        { label: "الرئيسية", route: "home" },
        { label: "مقرر EBD", route: "course" },
        { label: "المحاضرة 2: Research Question & PICO", route: "lecture-2" }
      ],
      "lecture-3": [
        { label: "الرئيسية", route: "home" },
        { label: "مقرر EBD", route: "course" },
        { label: "المحاضرة 3: Statement of Problem", route: "lecture-3" }
      ],
      "lecture-4": [
        { label: "الرئيسية", route: "home" },
        { label: "مقرر EBD", route: "course" },
        { label: "المحاضرة 4: Research Hypothesis", route: "lecture-4" }
      ],
      library: [
        { label: "الرئيسية", route: "home" },
        { label: "مكتبة مصادر الشرح الذكية (Smart Source Library)", route: "library" }
      ],
      studio: [
        { label: "الرئيسية", route: "home" },
        { label: "استوديو الفهم والمراجعة (Understanding Studio)", route: "studio" }
      ],
      mcq: [
        { label: "الرئيسية", route: "home" },
        { label: "مركز الاختبارات وبنك الـ 500 سؤال (MCQ Center)", route: "mcq" }
      ],
      progress: [
        { label: "الرئيسية", route: "home" },
        { label: "التقدم والمحفوظات (Progress & Bookmarks)", route: "progress" }
      ],
      search: [
        { label: "الرئيسية", route: "home" },
        { label: "محرك البحث الشامل (Global Search)", route: "search" }
      ]
    };

    const items = map[currentRoute] || map.home;
    bc.innerHTML = items
      .map((item, idx) => {
        if (idx === items.length - 1) {
          return `<span class="breadcrumb-current">${esc(item.label)}</span>`;
        }
        return `<span class="breadcrumb-item" onclick="window.EBDApp.navigate('${item.route}')">${esc(item.label)}</span> <span>/</span>`;
      })
      .join(" ");
  }

  /* ══════════ MAIN VIEW DISPATCHER ══════════ */
  function renderMainView() {
    const root = document.getElementById("app-main");
    if (!root) return;

    if (currentRoute === "home") renderHome(root);
    else if (currentRoute === "course") renderCoursePage(root);
    else if (currentRoute === "lecture-1") renderLecturePage(root, 1);
    else if (currentRoute === "lecture-2") renderLecturePage(root, 2);
    else if (currentRoute === "lecture-3") renderLecturePage(root, 3);
    else if (currentRoute === "lecture-4") renderLecturePage(root, 4);
    else if (currentRoute === "library") renderSourceLibrary(root);
    else if (currentRoute === "studio") renderUnderstandingStudio(root);
    else if (currentRoute === "mcq") renderMcqCenter(root);
    else if (currentRoute === "progress") renderProgressPage(root);
    else if (currentRoute === "search") renderSearchPage(root);
    else renderHome(root);
  }

  /* ═══════════════════════════════════════════════════════════════════════
     1. HOME / DASHBOARD VIEW
     ═══════════════════════════════════════════════════════════════════════ */
  function renderHome(root) {
    const totalAnswered = Object.keys(state.answeredQuestions || {}).length;
    const correctCount = Object.values(state.answeredQuestions || {}).filter((a) => a.isCorrect).length;
    const accuracyPct = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;
    const completedSecCount = (state.completedSections || []).length;
    const totalSecCount = (window.EBD_LECTURES || []).reduce((acc, l) => acc + l.sections.length, 0);
    const lastLec = getLecture(state.lastLectureId || 2);

    root.innerHTML = `
      <!-- Hero Banner -->
      <section class="page-hero">
        <div class="page-hero-content">
          <div class="hero-eyebrow">🦷 Evidence-Based Dentistry · Prof. Hadeel Farouk Curriculum</div>
          <h1 class="page-title">منصة EBD الجامعية المتكاملة — الفهم، المصادر الذكية، وبنك الـ 500 سؤال</h1>
          <p class="page-subtitle">
            منصة تعليمية أكاديمية مصممة خصيصًا لطلاب طب الأسنان لمذاكرة مادة <strong>Evidence-Based Dentistry (EBD)</strong> وفق شرائح ومحاضرات <strong>أ.د. هديل فاروق</strong>، مع فصل واضح ودقيق بين محتوى المنهج الرسمي ومصادر الشرح الخارجية.
          </p>
          <div class="hero-stats-row">
            <div class="stat-chip">
              <div class="stat-chip-value">4 محاضرات</div>
              <div class="stat-chip-label">منظمة في صفحات مستقلة</div>
            </div>
            <div class="stat-chip">
              <div class="stat-chip-value">500 سؤال</div>
              <div class="stat-chip-label">MCQ من ملفات المنهج فقط</div>
            </div>
            <div class="stat-chip">
              <div class="stat-chip-value">${(window.EBD_SOURCES || []).length} مصدرًا</div>
              <div class="stat-chip-label">تم التحقق منها (أولوية مصرية)</div>
            </div>
            <div class="stat-chip">
              <div class="stat-chip-value">${totalAnswered} / 500</div>
              <div class="stat-chip-label">تقدمك في الأسئلة (${accuracyPct}% دقة)</div>
            </div>
          </div>
        </div>
        <div style="display:flex; flex-direction:column; gap:0.65rem; min-width:240px;">
          <button class="btn btn-primary" onclick="window.EBDApp.navigate('lecture-${lastLec.id}')">
            ▶️ استكمال المذاكرة: ${esc(lastLec.code)}
          </button>
          <button class="btn btn-teal" onclick="window.EBDApp.navigate('mcq')">
            🧠 ابدأ التدريب أو الامتحان (500 MCQ)
          </button>
          <button class="btn btn-outline" onclick="window.EBDApp.navigate('library')">
            🎬 مكتبة مصادر الشرح الذكية
          </button>
        </div>
      </section>

      <!-- Three Information Types Classification Banner (Section 9 Compliance) -->
      <section class="info-Classification-banner">
        <div class="info-type-card type-curriculum">
          <div style="font-size:1.35rem;">📘</div>
          <div>
            <strong style="color:var(--brand-emerald); font-size:0.9rem;">النوع الأول: محتوى المنهج المعتمد (Curriculum Core)</strong>
            <p style="font-size:0.82rem; color:var(--text-secondary); margin-top:0.2rem;">
              مستخرج حرفيًا من شرائح محاضرات أ.د. هديل فاروق المرفقة، وهو الأساس الحصري للملخصات وبنك الـ 500 سؤال.
            </p>
          </div>
        </div>
        <div class="info-type-card type-external">
          <div style="font-size:1.35rem;">🎥</div>
          <div>
            <strong style="color:var(--brand-primary); font-size:0.9rem;">النوع الثاني: مصادر الشرح الخارجية (Verified Sources)</strong>
            <p style="font-size:0.82rem; color:var(--text-secondary); margin-top:0.2rem;">
              محاضرات وفيديوهات (مصريون ← عرب ← أجانب) تم التحقق من روابطها لمساعدة الطالب على الفهم المرئي والمسموع.
            </p>
          </div>
        </div>
        <div class="info-type-card type-supplementary">
          <div style="font-size:1.35rem;">💡</div>
          <div>
            <strong style="color:var(--brand-amber); font-size:0.9rem;">النوع الثالث: الشرح التوضيحي المساند (Supplementary Aid)</strong>
            <p style="font-size:0.82rem; color:var(--text-secondary); margin-top:0.2rem;">
              شروحات عربية مبسطة ومقارنات لتوضيح المصطلحات الإنجليزية الصعبة دون إدخال أي معلومات خارجية في الاختبارات.
            </p>
          </div>
        </div>
      </section>

      <!-- Three Core Platform Pillars -->
      <div class="section-header">
        <h2 class="section-title">✨ الميزات الثلاث الرئيسية للمنصة</h2>
      </div>
      <div class="grid-3" style="margin-bottom:2rem;">
        <div class="card">
          <div>
            <div class="card-badge-row">
              <span class="badge badge-teal">الميزة الأولى</span>
              <span class="badge badge-emerald">${(window.EBD_SOURCES || []).length} مصدرًا محققًا</span>
            </div>
            <h3 class="card-title">EBD Smart Source Library</h3>
            <p class="card-subtitle">مكتبة ذكية وشاملة لمصادر شرح المحاضرات الأربع مع أولوية للأساتذة والأطباء المصريين ثم العرب ثم الأجانب، ومشغل مدمج بالطوابع الزمنية.</p>
          </div>
          <div class="card-actions">
            <button class="btn btn-primary btn-sm" onclick="window.EBDApp.navigate('library')">فتح مكتبة المصادر ←</button>
          </div>
        </div>

        <div class="card">
          <div>
            <div class="card-badge-row">
              <span class="badge badge-primary">الميزة الثانية</span>
              <span class="badge badge-teal">${completedSecCount}/${totalSecCount} موضوع منجز</span>
            </div>
            <h3 class="card-title">EBD Understanding Studio</h3>
            <p class="card-subtitle">استوديو ذكي لفهم المحاضرات: نظرة عامة، الشرح العلمي بالعربية مع المصطلح الإنجليزي الأصلي، المفاهيم الصعبة، جداول المقارنة، وبطاقات Flashcards.</p>
          </div>
          <div class="card-actions">
            <button class="btn btn-primary btn-sm" onclick="window.EBDApp.navigate('studio')">دخول استوديو الفهم ←</button>
          </div>
        </div>

        <div class="card">
          <div>
            <div class="card-badge-row">
              <span class="badge badge-amber">الميزة الثالثة</span>
              <span class="badge badge-primary">500 MCQ مدقق</span>
            </div>
            <h3 class="card-title">EBD Exam & MCQ Center</h3>
            <p class="card-subtitle">بنك أسئلة جامعي يضم 500 سؤال اختيار من متعدد من ملفات المنهج فقط، مع وضع التدريب الفوري، وضع الامتحان التجريبي، وتفسير كل إجابة ومرجع الشريحة.</p>
          </div>
          <div class="card-actions">
            <button class="btn btn-teal btn-sm" onclick="window.EBDApp.navigate('mcq')">بدء الاختبارات (500 سؤال) ←</button>
          </div>
        </div>
      </div>

      <!-- The 4 Lectures Quick Access Cards -->
      <div class="section-header">
        <h2 class="section-title">📚 المحاضرات الأربع (EBD Curriculum Lectures)</h2>
        <button class="btn btn-outline btn-sm" onclick="window.EBDApp.navigate('course')">عرض خريطة المنهج الكاملة ←</button>
      </div>
      <div class="grid-2">
        ${(window.EBD_LECTURES || [])
          .map(
            (lec) => `
          <div class="card">
            <div>
              <div class="card-badge-row">
                <span class="badge badge-primary">${esc(lec.code)} · ${esc(lec.instructor)}</span>
                <span class="badge ${lec.status === "complete" ? "badge-emerald" : "badge-amber"}">${esc(lec.statusBadge)}</span>
              </div>
              <h3 class="card-title ltr">${esc(lec.title)}</h3>
              <p class="card-subtitle">${esc(lec.arabicTitle)}</p>
              <div class="card-meta">
                <span>📄 ${esc(lec.slideCount)}</span>
                <span>🧠 ${lec.mcqCount} سؤال MCQ</span>
                <span>⏱️ ${esc(lec.estimatedStudyTime)}</span>
              </div>
            </div>
            <div class="card-actions">
              <button class="btn btn-primary btn-sm" onclick="window.EBDApp.navigate('lecture-${lec.id}')">دراسة المحاضرة ←</button>
              <button class="btn btn-outline btn-sm" onclick="window.EBDApp.startLectureQuiz(${lec.id}, 'practice')">تدريب (${lec.mcqCount} سؤال)</button>
              <button class="btn btn-outline btn-sm" onclick="window.EBDApp.openLibraryForLecture(${lec.id})">فيديوهات الشرح</button>
              <a class="btn btn-outline btn-sm" href="${esc(lec.pdfUrl)}" target="_blank" rel="noopener">ملف PDF ↗</a>
            </div>
          </div>
        `
          )
          .join("")}
      </div>
    `;
  }

  /* ═══════════════════════════════════════════════════════════════════════
     2. EBD COURSE OVERVIEW & CURRICULUM MAP PAGE
     ═══════════════════════════════════════════════════════════════════════ */
  function renderCoursePage(root) {
    const meta = window.EBD_COURSE_META || {};
    root.innerHTML = `
      <section class="page-hero">
        <div class="page-hero-content">
          <div class="hero-eyebrow">📘 خريطة المنهج الرسمية · ${esc(meta.instructor)}</div>
          <h1 class="page-title">${esc(meta.courseTitle)} — ${esc(meta.arabicTitle)}</h1>
          <p class="page-subtitle">
            خريطة تفصيلية للمحاضرات الأربع وموضوعاتها الفرعية وتوزيع الـ 500 سؤال وأوراق الـ PDF الأصلية المرفقة.
          </p>
        </div>
      </section>

      <!-- Missing File Honesty Alert (Rule 2 Compliance) -->
      <div class="academic-notice">
        <strong>📌 ملاحظة أكاديمية دقيقة حول الملفات المرفقة (شفافية المنهج):</strong>
        ${esc(meta.missingFileAlert?.missingLectureNote || "")}
      </div>

      <div class="grid-2">
        ${(window.EBD_LECTURES || [])
          .map(
            (lec) => `
          <div class="card">
            <div>
              <div class="card-badge-row">
                <span class="badge badge-primary">${esc(lec.code)}</span>
                <span class="badge ${lec.status === "complete" ? "badge-emerald" : "badge-amber"}">${esc(lec.statusBadge)}</span>
              </div>
              <h3 class="card-title ltr">${esc(lec.title)}</h3>
              <p class="card-subtitle">${esc(lec.arabicTitle)}</p>
              <p style="font-size:0.84rem; color:var(--text-muted); margin-bottom:0.75rem;" class="ltr">
                <strong>Source File:</strong> ${esc(lec.sourceFile)}
              </p>
              <div style="background:var(--bg-subtle); padding:0.85rem 1rem; border-radius:var(--radius-sm); margin-bottom:0.85rem;">
                <strong style="font-size:0.83rem; display:block; margin-bottom:0.4rem;">الأقسام العلمية داخل المحاضرة:</strong>
                <ul style="padding-right:1.1rem; font-size:0.84rem; color:var(--text-secondary);">
                  ${lec.sections.map((s) => `<li class="ltr" style="margin-bottom:0.25rem;">${esc(s.title)} <span style="color:var(--text-muted);">(${esc(s.slideRef)})</span></li>`).join("")}
                </ul>
              </div>
            </div>
            <div class="card-actions">
              <button class="btn btn-primary btn-sm" onclick="window.EBDApp.navigate('lecture-${lec.id}')">فتح صفحة المحاضرة ${lec.id} ←</button>
              <button class="btn btn-teal btn-sm" onclick="window.EBDApp.startLectureQuiz(${lec.id}, 'practice')">حل أسئلة المحاضرة (${lec.mcqCount} سؤال)</button>
              <a class="btn btn-outline btn-sm" href="${esc(lec.pdfUrl)}" target="_blank" rel="noopener">عرض ملف PDF الأصلي ↗</a>
            </div>
          </div>
        `
          )
          .join("")}
      </div>
    `;
  }

  /* ═══════════════════════════════════════════════════════════════════════
     3. INDIVIDUAL LECTURE PAGE & UNDERSTANDING STUDIO
     ═══════════════════════════════════════════════════════════════════════ */
  function renderUnderstandingStudio(root) {
    const activeLecId = currentParams.lectureId || state.lastLectureId || 2;
    renderLecturePage(root, activeLecId, true);
  }

  function renderLecturePage(root, lectureId, isStudioWrapper = false) {
    const lec = getLecture(lectureId);
    const activeTab = currentParams.tab || state.lastStudioTab || "overview";
    const relatedSources = (window.EBD_SOURCES || []).filter((s) => s.lectureIds.includes(lec.id));

    const tabs = [
      { id: "overview", label: "1. Overview — نظرة عامة" },
      { id: "content", label: `2. Lecture Content — محتوى المحاضرة (${lec.sections.length})` },
      { id: "difficult", label: `3. Difficult Concepts — مفاهيم دقيقة (${lec.difficultConcepts.length})` },
      { id: "terms", label: `4. Key Terms & Comparisons (${lec.keyTerms.length})` },
      { id: "flashcards", label: `5. Flashcards — بطاقات التذكر (${lec.flashcards.length})` },
      { id: "review", label: "6. Quick Review — مراجعة سريعة" },
      { id: "videos", label: `7. Related Videos & Practice (${relatedSources.length})` }
    ];

    root.innerHTML = `
      <!-- Lecture Switcher Strip -->
      <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:0.65rem; margin-bottom:1rem;">
        <div style="display:flex; gap:0.45rem; flex-wrap:wrap;">
          ${(window.EBD_LECTURES || [])
            .map(
              (l) => `
            <button class="btn ${l.id === lec.id ? "btn-primary" : "btn-outline"} btn-sm"
              onclick="window.EBDApp.navigate('${isStudioWrapper ? "studio" : "lecture-" + l.id}', { lectureId: ${l.id}, tab: '${activeTab}' })">
              ${esc(l.code)}: ${esc(l.title.split("&")[0].trim())}
            </button>
          `
            )
            .join("")}
        </div>
        <div style="display:flex; gap:0.45rem;">
          <a class="btn btn-outline btn-sm" href="${esc(lec.pdfUrl)}" target="_blank" rel="noopener">📄 فتح PDF المحاضرة الأصلي ↗</a>
          <button class="btn btn-teal btn-sm" onclick="window.EBDApp.startLectureQuiz(${lec.id}, 'practice')">🧠 تدريب على المحاضرة (${lec.mcqCount} سؤال)</button>
        </div>
      </div>

      <!-- Lecture Header -->
      <section class="page-hero" style="padding:1.35rem 1.65rem;">
        <div class="page-hero-content">
          <div class="hero-eyebrow">${esc(lec.code)} · ${esc(lec.instructor)} · ${esc(lec.slideCount)}</div>
          <h1 class="page-title ltr" style="margin-bottom:0.25rem;">${esc(lec.title)}</h1>
          <p class="page-subtitle">${esc(lec.arabicTitle)}</p>
        </div>
      </section>

      ${
        lec.id === 1
          ? `<div class="academic-notice">
              <strong>📌 تنبيه أمانة علمية خاص بالمحاضرة الأولى:</strong>
              ${esc(window.EBD_COURSE_META.missingFileAlert.missingLectureNote)}
            </div>`
          : ""
      }

      <!-- 7 Organized Studio Tabs -->
      <nav class="studio-tabs" role="tablist">
        ${tabs
          .map(
            (t) => `
          <button class="studio-tab ${activeTab === t.id ? "active" : ""}"
            onclick="window.EBDApp.switchLectureTab(${lec.id}, '${t.id}', ${isStudioWrapper})">
            ${esc(t.label)}
          </button>
        `
          )
          .join("")}
      </nav>

      <!-- Tab Content Container -->
      <div id="lecture-tab-body">
        ${renderLectureTabContent(lec, activeTab, relatedSources)}
      </div>
    `;
  }

  function switchLectureTab(lectureId, tabId, isStudioWrapper) {
    state.lastStudioTab = tabId;
    saveState();
    const route = isStudioWrapper ? "studio" : `lecture-${lectureId}`;
    navigate(route, { lectureId, tab: tabId });
  }

  function renderLectureTabContent(lec, tabId, relatedSources) {
    if (tabId === "overview") {
      const noteVal = (state.lectureNotes && state.lectureNotes[lec.id]) || "";
      return `
        <div class="grid-2" style="margin-bottom:1.25rem;">
          <div class="card">
            <h3 class="card-title">🇻🇬 Academic Summary (English)</h3>
            <p class="en-block" style="font-size:0.95rem; color:var(--text-secondary); margin-top:0.5rem;">
              ${esc(lec.overview.summaryEn)}
            </p>
            <div style="margin-top:1rem; padding-top:0.85rem; border-top:1px solid var(--border-light);" class="en-block">
              <strong style="font-size:0.9rem; color:var(--brand-primary);">Learning Objectives:</strong>
              <ul style="padding-left:1.2rem; margin-top:0.45rem; font-size:0.88rem; color:var(--text-secondary);">
                ${lec.overview.learningObjectives.map((o) => `<li style="margin-bottom:0.3rem;">${esc(o)}</li>`).join("")}
              </ul>
            </div>
          </div>

          <div class="card">
            <h3 class="card-title">🇪🇬 الملخص الأكاديمي المبسط (بالعربية)</h3>
            <p style="font-size:0.95rem; color:var(--text-secondary); margin-top:0.5rem; white-space:pre-line;">
              ${esc(lec.overview.summaryAr)}
            </p>
            <div style="margin-top:1rem; padding-top:0.85rem; border-top:1px solid var(--border-light);">
              <label class="filter-label" style="display:block; margin-bottom:0.35rem;">📝 ملاحظاتك الشخصية على هذه المحاضرة (تُحفظ تلقائيًا):</label>
              <textarea class="filter-input" rows="4" style="width:100%; resize:vertical;"
                placeholder="اكتب أهم الملاحظات أو النقاط التي تريد مراجعتها ليلة الامتحان..."
                oninput="window.EBDApp.saveLectureNote(${lec.id}, this.value)">${esc(noteVal)}</textarea>
            </div>
          </div>
        </div>

        ${
          lec.overview.slideImages && lec.overview.slideImages.length
            ? `
          <div class="lecture-section-card">
            <h3 class="card-title">🖼️ الجداول والمخططات الأصلية المستخرجة من شرائح المحاضرة</h3>
            <div class="slide-gallery-grid">
              ${lec.overview.slideImages
                .map(
                  (img) => `
                <figure class="slide-figure">
                  <img src="${esc(img.src)}" alt="${esc(img.caption)}" onclick="window.open('${esc(img.src)}', '_blank')">
                  <figcaption class="slide-caption">${esc(img.caption)}</figcaption>
                </figure>
              `
                )
                .join("")}
            </div>
          </div>
        `
            : ""
        }
      `;
    }

    if (tabId === "content") {
      return `
        <div>
          ${lec.sections
            .map((sec) => {
              const isDone = (state.completedSections || []).includes(sec.id);
              return `
              <article class="lecture-section-card">
                <div class="lecture-section-header">
                  <div>
                    <span class="badge badge-primary ltr">${esc(sec.slideRef)}</span>
                    <h3 class="card-title ltr" style="margin-top:0.35rem;">${esc(sec.title)}</h3>
                  </div>
                  <button class="btn ${isDone ? "btn-teal" : "btn-outline"} btn-sm"
                    onclick="window.EBDApp.toggleSectionDone('${sec.id}', ${lec.id})">
                    ${isDone ? "✅ تم إنجاز هذا القسم" : "☑️ تحديد كمنجز"}
                  </button>
                </div>

                <!-- Original English Curriculum Points -->
                <div class="english-terms-box">
                  <div style="font-size:0.76rem; font-weight:800; color:var(--brand-primary); text-transform:uppercase; margin-bottom:0.4rem;">
                    📘 Original Lecture Slide Text (Curriculum Core — English)
                  </div>
                  <ul>
                    ${sec.contentEn.map((line) => `<li>${esc(line)}</li>`).join("")}
                  </ul>
                </div>

                <!-- Clear Arabic Explanation -->
                <div class="arabic-explanation-box">
                  <div style="font-size:0.8rem; font-weight:800; color:var(--brand-teal-dark); margin-bottom:0.35rem;">
                    💡 الشرح العلمي المبسط (توضيح المفهوم بالعربية مع الحفاظ على المصطلح الإنجليزي):
                  </div>
                  ${esc(sec.explanationAr)}
                </div>

                <!-- Key Exam Takeaway -->
                <div class="takeaway-banner">
                  🎯 High-Yield Exam Takeaway: ${esc(sec.keyTakeaway)}
                </div>
              </article>
            `;
            })
            .join("")}
        </div>
      `;
    }

    if (tabId === "difficult") {
      return `
        <div class="grid-2">
          ${lec.difficultConcepts
            .map(
              (dc) => `
            <div class="lecture-section-card" style="margin-bottom:0;">
              <div class="card-badge-row">
                <span class="badge badge-rose">⚠️ مفهوم دقيق / موضع سؤال امتحاني</span>
                <span class="badge badge-amber">${esc(dc.difficulty)}</span>
              </div>
              <h3 class="card-title">${esc(dc.title)}</h3>
              <div class="english-terms-box" style="margin-top:0.75rem;">
                <strong style="font-size:0.78rem; color:var(--brand-primary); display:block; margin-bottom:0.25rem;">Curriculum Reference Fact:</strong>
                <div style="font-size:0.9rem;">${esc(dc.curriculumFact)}</div>
              </div>
              <div class="arabic-explanation-box" style="margin-bottom:0;">
                ${esc(dc.explanationAr)}
              </div>
            </div>
          `
            )
            .join("")}
        </div>
      `;
    }

    if (tabId === "terms") {
      return `
        <!-- Comparison Tables -->
        <div style="margin-bottom:1.75rem;">
          <h3 class="section-title" style="margin-bottom:0.85rem;">📊 جداول المقارنة المنهجية (Comparisons)</h3>
          ${(lec.comparisons || [])
            .map(
              (cmp) => `
            <div class="lecture-section-card">
              <h4 class="card-title" style="margin-bottom:0.85rem;">${esc(cmp.title)}</h4>
              <div class="table-responsive" style="margin-bottom:0;">
                <table class="academic-table">
                  <thead>
                    <tr>
                      ${cmp.headers.map((h) => `<th>${esc(h)}</th>`).join("")}
                    </tr>
                  </thead>
                  <tbody>
                    ${cmp.rows
                      .map(
                        (row) => `
                      <tr>
                        ${row.map((cell, idx) => `<td class="${idx > 0 ? "ltr" : ""}"><strong>${idx === 0 ? esc(cell) : ""}</strong>${idx !== 0 ? esc(cell) : ""}</td>`).join("")}
                      </tr>
                    `
                      )
                      .join("")}
                  </tbody>
                </table>
              </div>
            </div>
          `
            )
            .join("")}
        </div>

        <!-- Key Terms Glossary -->
        <div>
          <h3 class="section-title" style="margin-bottom:0.85rem;">🔤 المصطلحات العلمية الأساسية كما وردت في الملف (Key Scientific Terms)</h3>
          <div class="grid-2">
            ${lec.keyTerms
              .map(
                (kt) => `
              <div class="card">
                <div>
                  <div class="card-badge-row">
                    <span class="badge badge-primary ltr">${esc(kt.term)}</span>
                    <span class="badge badge-teal ltr">${esc(kt.slideRef)}</span>
                  </div>
                  <p class="en-block" style="font-size:0.92rem; font-weight:600; color:var(--text-primary); margin-bottom:0.5rem;">
                    ${esc(kt.definitionEn)}
                  </p>
                  <p style="font-size:0.88rem; color:var(--text-secondary); background:var(--bg-subtle); padding:0.55rem 0.75rem; border-radius:var(--radius-sm);">
                    <strong>الشرح بالعربية:</strong> ${esc(kt.explanationAr)}
                  </p>
                </div>
              </div>
            `
              )
              .join("")}
          </div>
        </div>
      `;
    }

    if (tabId === "flashcards") {
      return `
        <div style="margin-bottom:1rem; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:0.5rem;">
          <p style="font-size:0.92rem; color:var(--text-secondary);">
            اضغط على أي بطاقة لقلبها وإظهار الإجابة النموذجية ومرجع الشريحة (Active Recall Flashcards):
          </p>
        </div>
        <div class="flashcards-grid">
          ${lec.flashcards
            .map(
              (fc, idx) => `
            <div class="flashcard-item" onclick="this.classList.toggle('flipped')">
              <div>
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
                  <span class="badge badge-primary">Flashcard #${idx + 1}</span>
                  <span style="font-size:0.75rem; color:var(--text-muted);">🔄 اضغط لقلب البطاقة</span>
                </div>
                <div style="font-size:1rem; font-weight:700; color:var(--text-primary);">
                  ${esc(fc.front)}
                </div>
                <div class="flashcard-answer">
                  <div style="font-size:0.75rem; color:var(--brand-teal-dark); text-transform:uppercase; margin-bottom:0.25rem;">Model Answer:</div>
                  ${esc(fc.back)}
                </div>
              </div>
            </div>
          `
            )
            .join("")}
        </div>
      `;
    }

    if (tabId === "review") {
      return `
        <div class="lecture-section-card">
          <div class="card-badge-row">
            <span class="badge badge-emerald">⚡ مراجعة ليلة الامتحان السريعة (Quick Exam Review)</span>
            <span class="badge badge-primary">${esc(lec.code)}</span>
          </div>
          <h3 class="card-title" style="margin-bottom:1rem;">أهم النقاط التي يجب استحضارها قبل دخول الامتحان — ${esc(lec.title)}</h3>
          <div style="display:flex; flex-direction:column; gap:0.65rem;">
            ${lec.quickReview
              .map(
                (point, idx) => `
              <div style="background:var(--bg-subtle); border-right:4px solid var(--brand-primary); padding:0.85rem 1.1rem; border-radius:var(--radius-sm); font-size:0.95rem;">
                <strong>${idx + 1}.</strong> ${esc(point)}
              </div>
            `
              )
              .join("")}
          </div>
          <div style="margin-top:1.25rem; display:flex; gap:0.65rem; flex-wrap:wrap;">
            <button class="btn btn-teal" onclick="window.EBDApp.startLectureQuiz(${lec.id}, 'practice')">
              🧠 اختبر نفسك الآن في أسئلة هذه المحاضرة (${lec.mcqCount} سؤال) ←
            </button>
            <button class="btn btn-outline" onclick="window.EBDApp.startLectureQuiz(${lec.id}, 'exam')">
              ⏱️ امتحان تجريبي محاكي على المحاضرة ${lec.id}
            </button>
          </div>
        </div>
      `;
    }

    if (tabId === "videos") {
      return `
        <div class="lecture-section-card" style="margin-bottom:1.25rem;">
          <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:0.75rem;">
            <div>
              <h3 class="card-title">🎬 مصادر الشرح المرئية والمسموعة المرتبطة بـ ${esc(lec.code)}</h3>
              <p style="font-size:0.88rem; color:var(--text-secondary);">
                مرتبة حسب الأولوية: الأساتذة والأطباء المصريون أولًا، ثم العرب، ثم المصادر الأجنبية المعتمدة.
              </p>
            </div>
            <div style="display:flex; gap:0.5rem;">
              <button class="btn btn-teal btn-sm" onclick="window.EBDApp.startLectureQuiz(${lec.id}, 'practice')">
                🧠 الانتقال إلى أسئلة المحاضرة (${lec.mcqCount} MCQ)
              </button>
              <button class="btn btn-outline btn-sm" onclick="window.EBDApp.openLibraryForLecture(${lec.id})">
                فتح في المكتبة الذكية الكاملة ←
              </button>
            </div>
          </div>
        </div>
        <div class="grid-2">
          ${relatedSources.map((src) => renderSourceCardHTML(src)).join("")}
        </div>
      `;
    }

    return "";
  }

  function toggleSectionDone(secId, lecId) {
    const arr = state.completedSections || [];
    const idx = arr.indexOf(secId);
    if (idx >= 0) arr.splice(idx, 1);
    else arr.push(secId);
    state.completedSections = arr;
    saveState();
    renderMainView();
  }

  function saveLectureNote(lecId, text) {
    if (!state.lectureNotes) state.lectureNotes = {};
    state.lectureNotes[lecId] = text;
    saveState();
  }

  /* ═══════════════════════════════════════════════════════════════════════
     4. EBD SMART SOURCE LIBRARY
     ═══════════════════════════════════════════════════════════════════════ */
  function openLibraryForLecture(lecId) {
    sourceFilter.lectureId = String(lecId);
    navigate("library");
  }

  function getFilteredSources() {
    let list = [...(window.EBD_SOURCES || [])];

    if (sourceFilter.onlyFavorites) {
      list = list.filter((s) => (state.favoriteSources || []).includes(s.id));
    }
    if (sourceFilter.lectureId !== "all") {
      const lid = Number(sourceFilter.lectureId);
      list = list.filter((s) => s.lectureIds.includes(lid));
    }
    if (sourceFilter.nationality !== "all") {
      list = list.filter((s) => s.nationality === sourceFilter.nationality);
    }
    if (sourceFilter.language !== "all") {
      list = list.filter((s) =>
        sourceFilter.language === "Arabic"
          ? s.language.toLowerCase().includes("arabic")
          : s.language.toLowerCase().includes("english")
      );
    }
    if (sourceFilter.matchLevel !== "all") {
      list = list.filter((s) => s.matchLevel === sourceFilter.matchLevel);
    }
    if (sourceFilter.query.trim()) {
      const q = sourceFilter.query.trim().toLowerCase();
      list = list.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.instructor.toLowerCase().includes(q) ||
          s.affiliation.toLowerCase().includes(q) ||
          s.whyRecommended.toLowerCase().includes(q) ||
          s.topics.some((t) => t.toLowerCase().includes(q))
      );
    }

    const parseDur = (d) => {
      const parts = String(d || "0:0").split(":").map(Number);
      return (parts[0] || 0) * 60 + (parts[1] || 0);
    };

    if (sourceFilter.sortBy === "priority") {
      list.sort((a, b) => a.tier - b.tier || b.matchScore - a.matchScore);
    } else if (sourceFilter.sortBy === "match") {
      list.sort((a, b) => b.matchScore - a.matchScore || a.tier - b.tier);
    } else if (sourceFilter.sortBy === "quality") {
      list.sort(
        (a, b) =>
          b.clarityScore + b.reliabilityScore - (a.clarityScore + a.reliabilityScore)
      );
    } else if (sourceFilter.sortBy === "duration") {
      list.sort((a, b) => parseDur(a.duration) - parseDur(b.duration));
    }

    return list;
  }

  function renderSourceCardHTML(src) {
    const isFav = (state.favoriteSources || []).includes(src.id);
    const tierBadgeClass =
      src.tier === 1 ? "badge-emerald" : src.tier === 2 ? "badge-primary" : "badge-teal";
    const flag = src.tier === 1 ? "🇪🇬" : src.tier === 2 ? "🌍" : "🌐";
    const matchBadgeClass =
      src.matchLevel === "high"
        ? "badge-emerald"
        : src.matchLevel === "partial"
        ? "badge-amber"
        : "badge-primary";

    return `
      <article class="source-card tier-${src.tier}">
        <div>
          <div class="card-badge-row">
            <span class="badge ${tierBadgeClass}">${flag} ${esc(src.tierLabel)}</span>
            <span class="badge ${matchBadgeClass}">${esc(src.matchLabel)} (${src.matchScore}%)</span>
          </div>

          <h3 class="card-title ltr" style="font-size:1.02rem;">${esc(src.title)}</h3>

          <div class="card-meta" style="margin-top:0.35rem; margin-bottom:0.5rem;">
            <span>👨‍⚕️ <strong>${esc(src.instructor)}</strong></span>
            <span>🏛️ ${esc(src.affiliation)}</span>
            <span>🗣️ ${esc(src.language)}</span>
            <span>⏱️ ${esc(src.duration)}</span>
            <span>📺 ${esc(src.platform)} (مجاني ✓)</span>
          </div>

          <!-- 5-Criteria Transparent Evaluation Scores -->
          <div class="source-metrics-row">
            <span class="metric-pill">المطابقة: ${src.matchScore}%</span>
            <span class="metric-pill">الموثوقية: ${src.reliabilityScore}%</span>
            <span class="metric-pill">وضوح الشرح: ${src.clarityScore}%</span>
            <span class="metric-pill">تغطية النقاط: ${src.coverageScore}%</span>
            <span class="metric-pill">المحاضرات: ${src.lectureIds.map((id) => "Lec " + id).join(", ")}</span>
          </div>

          <p style="font-size:0.87rem; color:var(--text-secondary); margin:0.55rem 0;">
            <strong>لماذا نرشحه للطالب؟</strong> ${esc(src.whyRecommended)}
          </p>

          <div style="display:flex; flex-wrap:wrap; gap:0.3rem; margin-bottom:0.55rem;" class="ltr">
            ${src.topics.map((t) => `<span class="badge badge-primary" style="font-size:0.7rem;">#${esc(t)}</span>`).join("")}
          </div>

          <!-- Timestamps -->
          ${
            src.timestamps && src.timestamps.length
              ? `
            <div class="timestamps-box">
              <div style="font-weight:700; color:var(--text-muted); margin-bottom:0.25rem;">
                ⏱️ الطوابع الزمنية لأهم النقاط (اضغط للتشغيل المباشر عند الدقيقة):
              </div>
              ${src.timestamps
                .map(
                  (ts) => `
                <button class="timestamp-chip" onclick="window.EBDApp.openVideoModal('${src.id}', ${ts.seconds})">
                  ▶ ${esc(ts.time)} — ${esc(ts.label)}
                </button>
              `
                )
                .join("")}
            </div>
          `
              : ""
          }
        </div>

        <div class="card-actions" style="justify-content:space-between;">
          <div style="display:flex; gap:0.45rem; flex-wrap:wrap;">
            <button class="btn btn-primary btn-sm" onclick="window.EBDApp.openVideoModal('${src.id}', 0)">
              🎬 مشاهدة داخل المنصة
            </button>
            <a class="btn btn-outline btn-sm" href="${esc(src.url)}" target="_blank" rel="noopener">
              فتح في YouTube ↗
            </a>
          </div>
          <div style="display:flex; align-items:center; gap:0.45rem;">
            <span style="font-size:0.72rem; color:var(--text-muted);">آخر تحقق: ${esc(src.lastVerified)} ✓</span>
            <button class="btn ${isFav ? "btn-teal" : "btn-outline"} btn-sm"
              onclick="window.EBDApp.toggleFavoriteSource('${src.id}')">
              ${isFav ? "⭐ محفوظ" : "☆ حفظ"}
            </button>
          </div>
        </div>
      </article>
    `;
  }

  function renderSourceLibrary(root) {
    const filtered = getFilteredSources();
    const allSources = window.EBD_SOURCES || [];
    const egCount = allSources.filter((s) => s.tier === 1).length;
    const arCount = allSources.filter((s) => s.tier === 2).length;
    const intCount = allSources.filter((s) => s.tier === 3).length;

    root.innerHTML = `
      <section class="page-hero">
        <div class="page-hero-content">
          <div class="hero-eyebrow">🎬 EBD Smart Source Library · مكتبة مصادر الشرح الذكية</div>
          <h1 class="page-title">مكتبة مصادر شرح المحاضرات الأربع (تم التحقق الفعلي من جميع الروابط)</h1>
          <p class="page-subtitle">
            تضم المكتبة <strong>${allSources.length} مصدرًا تعليميًا موثوقًا</strong> تم التحقق منها بتاريخ <strong>2026-10-17</strong> عبر YouTube oEmbed API، مرتبة حسب الأولوية: <strong>الفئة الأولى: الأساتذة والأطباء المصريون (${egCount})</strong> ← <strong>الفئة الثانية: الأساتذة العرب (${arCount})</strong> ← <strong>الفئة الثالثة: الجمعيات والجامعات الأجنبية مثل ADA وUBC وMental Dental (${intCount})</strong>.
          </p>
        </div>
      </section>

      <!-- Scope & Honesty Note -->
      <div class="academic-notice" style="background:var(--bg-teal-soft); border-color:var(--brand-teal); border-right-color:var(--brand-teal);">
        <strong style="color:var(--brand-teal-dark);">🔍 منهجية البحث والتحقق وحدود التغطية:</strong>
        تم إجراء بحث منهجي متعدد المستويات (المستوى الأول: مطابقة موضوعات المحاضرات الأربع، والمستوى الثاني: شرح المفاهيم الفرعية الدقيقة مثل FINER وPIRT وPECO وNull/Alternative Hypothesis). تغطي هذه المكتبة أفضل المصادر المتاحة علنًا ومجانًا التي أمكن التحقق من صلاحية روابطها وتضمينها قانونيًا وتقنيًا، وهي مصادر مساندة للفهم ولا تستبدل نص ملفات المنهج في الامتحان.
      </div>

      <!-- Filter Bar -->
      <div class="filter-bar">
        <div class="filter-group" style="flex:2; min-width:220px;">
          <label class="filter-label">🔍 بحث باسم المحاضر أو الموضوع أو المصطلح:</label>
          <input type="text" class="filter-input" placeholder="مثال: PICO, Hadeel, FINER, Toka, Hypothesis, PIRT..."
            value="${esc(sourceFilter.query)}"
            oninput="window.EBDApp.updateSourceFilter('query', this.value)">
        </div>

        <div class="filter-group">
          <label class="filter-label">📚 تصفية حسب المحاضرة:</label>
          <select class="filter-select" onchange="window.EBDApp.updateSourceFilter('lectureId', this.value)">
            <option value="all" ${sourceFilter.lectureId === "all" ? "selected" : ""}>جميع المحاضرات الأربع (${allSources.length})</option>
            <option value="1" ${sourceFilter.lectureId === "1" ? "selected" : ""}>Lecture 1: Steps in EBD & 5 A's</option>
            <option value="2" ${sourceFilter.lectureId === "2" ? "selected" : ""}>Lecture 2: Research Question & PICO</option>
            <option value="3" ${sourceFilter.lectureId === "3" ? "selected" : ""}>Lecture 3: Statement of Problem</option>
            <option value="4" ${sourceFilter.lectureId === "4" ? "selected" : ""}>Lecture 4: Research Hypothesis</option>
          </select>
        </div>

        <div class="filter-group">
          <label class="filter-label">🇪🇬 فئة المحاضر (الأولوية):</label>
          <select class="filter-select" onchange="window.EBDApp.updateSourceFilter('nationality', this.value)">
            <option value="all" ${sourceFilter.nationality === "all" ? "selected" : ""}>الكل (المصريون ← العرب ← الأجانب)</option>
            <option value="Egyptian" ${sourceFilter.nationality === "Egyptian" ? "selected" : ""}>🇪🇬 الفئة 1: دكاترة وأساتذة مصريون (${egCount})</option>
            <option value="Arab" ${sourceFilter.nationality === "Arab" ? "selected" : ""}>🌍 الفئة 2: أساتذة ومحاضرون عرب (${arCount})</option>
            <option value="International" ${sourceFilter.nationality === "International" ? "selected" : ""}>🌐 الفئة 3: مصادر أجنبية (ADA / جامعات) (${intCount})</option>
          </select>
        </div>

        <div class="filter-group">
          <label class="filter-label">🎯 درجة المطابقة للمحاضرة:</label>
          <select class="filter-select" onchange="window.EBDApp.updateSourceFilter('matchLevel', this.value)">
            <option value="all" ${sourceFilter.matchLevel === "all" ? "selected" : ""}>جميع درجات المطابقة</option>
            <option value="high" ${sourceFilter.matchLevel === "high" ? "selected" : ""}>مطابق بدرجة كبيرة (High Match)</option>
            <option value="partial" ${sourceFilter.matchLevel === "partial" ? "selected" : ""}>مطابق جزئيًا (Partial Match)</option>
            <option value="supplementary" ${sourceFilter.matchLevel === "supplementary" ? "selected" : ""}>تكميلي لتوسيع الفهم (Supplementary)</option>
          </select>
        </div>

        <div class="filter-group">
          <label class="filter-label">↕️ ترتيب النتائج حسب:</label>
          <select class="filter-select" onchange="window.EBDApp.updateSourceFilter('sortBy', this.value)">
            <option value="priority" ${sourceFilter.sortBy === "priority" ? "selected" : ""}>الأولوية (مصري ← عربي ← أجنبي)</option>
            <option value="match" ${sourceFilter.sortBy === "match" ? "selected" : ""}>الأعلى مطابقة للمحاضرة (%)</option>
            <option value="quality" ${sourceFilter.sortBy === "quality" ? "selected" : ""}>جودة الشرح والموثوقية</option>
            <option value="duration" ${sourceFilter.sortBy === "duration" ? "selected" : ""}>مدة الفيديو (الأقصر أولًا)</option>
          </select>
        </div>

        <button class="btn ${sourceFilter.onlyFavorites ? "btn-teal" : "btn-outline"}"
          onclick="window.EBDApp.updateSourceFilter('onlyFavorites', !${sourceFilter.onlyFavorites})">
          ⭐ المفضلة فقط (${(state.favoriteSources || []).length})
        </button>
      </div>

      <!-- Results Count & Grid -->
      <div class="section-header">
        <h2 class="section-title">نتائج المصادر المطابقة: ${filtered.length} مصدرًا</h2>
        ${
          sourceFilter.query || sourceFilter.lectureId !== "all" || sourceFilter.nationality !== "all" || sourceFilter.matchLevel !== "all" || sourceFilter.onlyFavorites
            ? `<button class="btn btn-outline btn-sm" onclick="window.EBDApp.resetSourceFilters()">إعادة ضبط الفلاتر ↺</button>`
            : ""
        }
      </div>

      ${
        filtered.length === 0
          ? `<div class="card" style="text-align:center; padding:2.5rem;">
              <h3 class="card-title">لا توجد مصادر تطابق معايير التصفية الحالية</h3>
              <p class="card-subtitle">جرّب تغيير عبارة البحث أو إظهار جميع المحاضرات والفئات.</p>
              <div style="margin-top:1rem;">
                <button class="btn btn-primary" onclick="window.EBDApp.resetSourceFilters()">عرض جميع المصادر (${allSources.length})</button>
              </div>
            </div>`
          : `<div class="grid-2" id="sources-results-grid">
              ${filtered.map((s) => renderSourceCardHTML(s)).join("")}
            </div>`
      }
    `;
  }

  function updateSourceFilter(key, val) {
    sourceFilter[key] = val;
    if (key === "query") {
      // Update only the grid to keep input focus smooth
      const grid = document.getElementById("sources-results-grid");
      if (grid) {
        const filtered = getFilteredSources();
        grid.innerHTML = filtered.map((s) => renderSourceCardHTML(s)).join("");
        return;
      }
    }
    renderMainView();
  }

  function resetSourceFilters() {
    sourceFilter = {
      query: "",
      lectureId: "all",
      nationality: "all",
      language: "all",
      matchLevel: "all",
      sortBy: "priority",
      onlyFavorites: false
    };
    renderMainView();
  }

  function toggleFavoriteSource(sourceId) {
    const arr = state.favoriteSources || [];
    const idx = arr.indexOf(sourceId);
    if (idx >= 0) arr.splice(idx, 1);
    else arr.push(sourceId);
    state.favoriteSources = arr;
    saveState();
    renderMainView();
  }

  /* ══════════ VIDEO PLAYER MODAL WITH TIMESTAMPS & NOTES ══════════ */
  function openVideoModal(sourceId, startSeconds = 0) {
    const src = (window.EBD_SOURCES || []).find((s) => s.id === sourceId);
    if (!src) return;

    const modal = document.getElementById("video-modal");
    const body = document.getElementById("video-modal-body");
    if (!modal || !body) return;

    const embedSrc = `${src.embedUrl}?autoplay=1&rel=0${startSeconds > 0 ? `&start=${startSeconds}` : ""}`;
    const noteText = (state.sourceNotes && state.sourceNotes[src.id]) || "";

    body.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:1rem; margin-bottom:0.85rem;">
        <div>
          <span class="badge badge-teal">${esc(src.tierLabel)} · مطابقة ${src.matchScore}%</span>
          <h3 class="card-title ltr" style="margin-top:0.35rem;">${esc(src.title)}</h3>
          <div style="font-size:0.84rem; color:var(--text-muted);">
            👨‍⚕️ ${esc(src.instructor)} · 🏛️ ${esc(src.affiliation)} · ⏱️ ${esc(src.duration)}
          </div>
        </div>
        <button class="btn btn-outline btn-sm" onclick="window.EBDApp.closeVideoModal()">✕ إغلاق المشغل</button>
      </div>

      <div class="video-iframe-wrap">
        <iframe id="active-yt-iframe" src="${esc(embedSrc)}" title="${esc(src.title)}"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen></iframe>
      </div>

      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.65rem; margin-bottom:0.85rem;">
        <div class="timestamps-box" style="margin:0; flex:1;">
          <strong>⏱️ الانتقال السريع للطوابع الزمنية داخل الفيديو:</strong>
          <div style="margin-top:0.35rem;">
            ${(src.timestamps || [])
              .map(
                (ts) => `
              <button class="timestamp-chip" onclick="window.EBDApp.seekVideoModal('${src.embedUrl}', ${ts.seconds})">
                ▶ ${esc(ts.time)} — ${esc(ts.label)}
              </button>
            `
              )
              .join("")}
          </div>
        </div>
        <a class="btn btn-primary btn-sm" href="${esc(src.url)}${startSeconds ? `&t=${startSeconds}s` : ""}" target="_blank" rel="noopener">
          فتح المصدر الأصلي في YouTube ↗
        </a>
      </div>

      <div>
        <label class="filter-label" style="display:block; margin-bottom:0.35rem;">📝 دوّن ملاحظاتك أثناء مشاهدة هذا الفيديو (تُحفظ تلقائيًا):</label>
        <textarea class="filter-input" rows="3" style="width:100%;"
          placeholder="اكتب النقاط المهمة أو الدقيقة الزمنية التي تريد العودة إليها..."
          oninput="window.EBDApp.saveSourceNote('${src.id}', this.value)">${esc(noteText)}</textarea>
      </div>
    `;

    modal.classList.add("open");
  }

  function seekVideoModal(embedUrl, seconds) {
    const iframe = document.getElementById("active-yt-iframe");
    if (iframe) {
      iframe.src = `${embedUrl}?autoplay=1&rel=0&start=${seconds}`;
    }
  }

  function closeVideoModal() {
    const modal = document.getElementById("video-modal");
    const body = document.getElementById("video-modal-body");
    if (body) body.innerHTML = "";
    if (modal) modal.classList.remove("open");
  }

  function saveSourceNote(sourceId, text) {
    if (!state.sourceNotes) state.sourceNotes = {};
    state.sourceNotes[sourceId] = text;
    saveState();
  }

  /* ═══════════════════════════════════════════════════════════════════════
     5. EBD EXAM & MCQ CENTER (500 VERIFIED QUESTIONS)
     ═══════════════════════════════════════════════════════════════════════ */
  function startLectureQuiz(lectureId, mode = "practice") {
    mcqSession.filters.lectureId = String(lectureId);
    mcqSession.filters.subtopic = "all";
    mcqSession.filters.difficulty = "all";
    mcqSession.filters.poolMode = "all";
    mcqSession.filters.count = "25";
    mcqSession.mode = mode;
    buildMcqSessionQuestions();
    navigate("mcq");
  }

  function getAvailableSubtopics(lectureId) {
    const bank = window.EBD_MCQ_BANK || [];
    const set = new Set();
    bank.forEach((q) => {
      if (lectureId === "all" || String(q.lectureId) === String(lectureId)) {
        set.add(q.subtopic);
      }
    });
    return Array.from(set);
  }

  function buildMcqSessionQuestions() {
    const bank = window.EBD_MCQ_BANK || [];
    const f = mcqSession.filters;

    let pool = bank.filter((q) => {
      if (f.lectureId !== "all" && String(q.lectureId) !== String(f.lectureId)) return false;
      if (f.subtopic !== "all" && q.subtopic !== f.subtopic) return false;
      if (f.difficulty !== "all" && q.difficulty !== f.difficulty) return false;
      if (f.poolMode === "wrong") {
        return (state.wrongQuestionIds || []).includes(q.id);
      }
      if (f.poolMode === "unanswered") {
        return !(state.answeredQuestions && state.answeredQuestions[q.id]);
      }
      if (f.poolMode === "bookmarked") {
        return (state.bookmarkedQuestions || []).includes(q.id);
      }
      return true;
    });

    if (f.shuffle) {
      pool = [...pool];
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }
    }

    if (f.count !== "all") {
      const limit = parseInt(f.count, 10) || 25;
      pool = pool.slice(0, limit);
    }

    mcqSession.active = true;
    mcqSession.submitted = false;
    mcqSession.questions = pool;
    mcqSession.currentIndex = 0;
    mcqSession.answers = {};
    mcqSession.skipped = {};
  }

  function renderMcqCenter(root) {
    if (!mcqSession.active || mcqSession.questions.length === 0) {
      buildMcqSessionQuestions();
    }

    const bank = window.EBD_MCQ_BANK || [];
    const f = mcqSession.filters;
    const subtopics = getAvailableSubtopics(f.lectureId);
    const totalAnsweredEver = Object.keys(state.answeredQuestions || {}).length;
    const wrongCountEver = (state.wrongQuestionIds || []).length;
    const bookmarkedCount = (state.bookmarkedQuestions || []).length;

    const qList = mcqSession.questions;
    const curQ = qList[mcqSession.currentIndex];
    const answeredInSession = Object.keys(mcqSession.answers).length;

    // Calculate session score
    let sessionCorrect = 0;
    Object.entries(mcqSession.answers).forEach(([qid, selIdx]) => {
      const qObj = bank.find((x) => x.id === qid);
      if (qObj && qObj.correctIndex === selIdx) sessionCorrect++;
    });
    const sessionPct =
      qList.length > 0 ? Math.round((sessionCorrect / qList.length) * 100) : 0;

    root.innerHTML = `
      <!-- Header -->
      <section class="page-hero" style="padding:1.35rem 1.65rem;">
        <div class="page-hero-content">
          <div class="hero-eyebrow">🧠 EBD Exam & MCQ Center · بنك الأسئلة الجامعي (500 سؤال مدقق)</div>
          <h1 class="page-title">مركز الاختبارات وبنك الـ 500 سؤال (مستند 100% إلى ملفات المحاضرات)</h1>
          <p class="page-subtitle">
            كل سؤال مرتبط بمرجع الشريحة الدقيق، مع تفسير علمي لسبب صحة الإجابة وسبب خطأ المشتتات الأخرى.
          </p>
        </div>
        <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
          <button class="btn ${mcqSession.mode === "practice" ? "btn-primary" : "btn-outline"} btn-sm"
            onclick="window.EBDApp.setMcqMode('practice')">
            ⚡ وضع التدريب الفوري (Practice Mode)
          </button>
          <button class="btn ${mcqSession.mode === "exam" ? "btn-teal" : "btn-outline"} btn-sm"
            onclick="window.EBDApp.setMcqMode('exam')">
            📝 وضع الامتحان التجريبي (Exam Mode)
          </button>
        </div>
      </section>

      <!-- Session Configuration & Filter Bar -->
      <div class="filter-bar">
        <div class="filter-group">
          <label class="filter-label">📚 المحاضرة:</label>
          <select class="filter-select" onchange="window.EBDApp.updateMcqFilter('lectureId', this.value)">
            <option value="all" ${f.lectureId === "all" ? "selected" : ""}>جميع المحاضرات الأربع (500 سؤال)</option>
            <option value="1" ${f.lectureId === "1" ? "selected" : ""}>Lecture 1: Steps in EBD (45 سؤال)</option>
            <option value="2" ${f.lectureId === "2" ? "selected" : ""}>Lecture 2: Research Question & PICO (190 سؤال)</option>
            <option value="3" ${f.lectureId === "3" ? "selected" : ""}>Lecture 3: Statement of Problem (135 سؤال)</option>
            <option value="4" ${f.lectureId === "4" ? "selected" : ""}>Lecture 4: Research Hypothesis (130 سؤال)</option>
          </select>
        </div>

        <div class="filter-group" style="flex:1.4;">
          <label class="filter-label">📂 الموضوع الفرعي (Subtopic):</label>
          <select class="filter-select" onchange="window.EBDApp.updateMcqFilter('subtopic', this.value)">
            <option value="all" ${f.subtopic === "all" ? "selected" : ""}>جميع الموضوعات الفرعية</option>
            ${subtopics
              .map(
                (st) => `<option value="${esc(st)}" ${f.subtopic === st ? "selected" : ""}>${esc(st)}</option>`
              )
              .join("")}
          </select>
        </div>

        <div class="filter-group">
          <label class="filter-label">🎚️ مستوى الصعوبة:</label>
          <select class="filter-select" onchange="window.EBDApp.updateMcqFilter('difficulty', this.value)">
            <option value="all" ${f.difficulty === "all" ? "selected" : ""}>جميع المستويات</option>
            <option value="easy" ${f.difficulty === "easy" ? "selected" : ""}>Easy — مباشر وتأسيسي</option>
            <option value="medium" ${f.difficulty === "medium" ? "selected" : ""}>Medium — فهم وتطبيق</option>
            <option value="hard" ${f.difficulty === "hard" ? "selected" : ""}>Hard — تمييز دقيق ومقارنات</option>
          </select>
        </div>

        <div class="filter-group">
          <label class="filter-label">🎯 نطاق الأسئلة:</label>
          <select class="filter-select" onchange="window.EBDApp.updateMcqFilter('poolMode', this.value)">
            <option value="all" ${f.poolMode === "all" ? "selected" : ""}>جميع الأسئلة (500)</option>
            <option value="unanswered" ${f.poolMode === "unanswered" ? "selected" : ""}>غير المحلولة بعد (${500 - totalAnsweredEver})</option>
            <option value="wrong" ${f.poolMode === "wrong" ? "selected" : ""}>أسئلة أخطأت فيها (${wrongCountEver})</option>
            <option value="bookmarked" ${f.poolMode === "bookmarked" ? "selected" : ""}>المحفوظة للمراجعة (${bookmarkedCount})</option>
          </select>
        </div>

        <div class="filter-group" style="min-width:130px;">
          <label class="filter-label">🔢 عدد أسئلة الجلسة:</label>
          <select class="filter-select" onchange="window.EBDApp.updateMcqFilter('count', this.value)">
            <option value="10" ${f.count === "10" ? "selected" : ""}>10 أسئلة</option>
            <option value="25" ${f.count === "25" ? "selected" : ""}>25 سؤالًا</option>
            <option value="50" ${f.count === "50" ? "selected" : ""}>50 سؤالًا</option>
            <option value="100" ${f.count === "100" ? "selected" : ""}>100 سؤال</option>
            <option value="all" ${f.count === "all" ? "selected" : ""}>كل الأسئلة المطابقة (${bank.length})</option>
          </select>
        </div>

        <button class="btn btn-primary" onclick="window.EBDApp.restartMcqSession()">
          🔄 بدء جلسة جديدة
        </button>
      </div>

      ${
        mcqSession.submitted
          ? renderExamSummaryBanner(sessionCorrect, qList.length, sessionPct)
          : ""
      }

      ${
        !curQ
          ? `<div class="card" style="text-align:center; padding:2.5rem;">
              <h3 class="card-title">لا توجد أسئلة في هذا النطاق حاليًا</h3>
              <p class="card-subtitle">إذا اخترت "أسئلة أخطأت فيها" أو "المحفوظة"، تأكد من وجود أسئلة مسجلة فيها، أو اختر "جميع الأسئلة".</p>
              <div style="margin-top:1rem;">
                <button class="btn btn-primary" onclick="window.EBDApp.updateMcqFilter('poolMode', 'all')">العودة إلى جميع الأسئلة (500 سؤال)</button>
              </div>
            </div>`
          : `
        <!-- Active MCQ Workspace -->
        <div class="mcq-workspace">
          <!-- Left: Question Card -->
          <div class="mcq-question-card">
            <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:0.5rem; padding-bottom:0.85rem; border-bottom:1px solid var(--border-light);">
              <div style="display:flex; align-items:center; gap:0.45rem; flex-wrap:wrap;">
                <span class="badge badge-primary">السؤال ${mcqSession.currentIndex + 1} من ${qList.length}</span>
                <span class="badge badge-teal ltr">${esc(curQ.id)} · Lec ${curQ.lectureId}</span>
                <span class="badge badge-amber ltr">${esc(curQ.subtopic)}</span>
                <span class="badge ${curQ.difficulty === "hard" ? "badge-rose" : curQ.difficulty === "medium" ? "badge-amber" : "badge-emerald"} ltr">
                  ${esc(curQ.difficulty.toUpperCase())}
                </span>
              </div>
              <div style="display:flex; gap:0.4rem;">
                <button class="btn ${(state.bookmarkedQuestions || []).includes(curQ.id) ? "btn-teal" : "btn-outline"} btn-sm"
                  onclick="window.EBDApp.toggleBookmarkQuestion('${curQ.id}')">
                  ${(state.bookmarkedQuestions || []).includes(curQ.id) ? "🔖 محفوظ للمراجعة" : "🔖 حفظ السؤال"}
                </button>
                <button class="btn btn-outline btn-sm" onclick="window.EBDApp.navigate('lecture-${curQ.lectureId}', { tab: 'content' })">
                  📘 مراجعة المحاضرة ${curQ.lectureId}
                </button>
              </div>
            </div>

            <!-- Question Stem -->
            <div class="mcq-q-text">${esc(curQ.question)}</div>

            <!-- 4 Options (A, B, C, D) -->
            <div class="mcq-options-list">
              ${curQ.options
                .map((optText, idx) => {
                  const letter = ["A", "B", "C", "D"][idx];
                  const userSel = mcqSession.answers[curQ.id];
                  const hasAnswered = userSel !== undefined;
                  const showCorrection =
                    (mcqSession.mode === "practice" && hasAnswered) ||
                    (mcqSession.mode === "exam" && mcqSession.submitted);

                  let btnCls = "mcq-option-btn";
                  if (showCorrection) {
                    if (idx === curQ.correctIndex) btnCls += " correct";
                    else if (idx === userSel && userSel !== curQ.correctIndex) btnCls += " wrong";
                  } else if (hasAnswered && idx === userSel) {
                    btnCls += " selected";
                  }

                  const disabledAttr =
                    (mcqSession.mode === "practice" && hasAnswered) ||
                    (mcqSession.mode === "exam" && mcqSession.submitted)
                      ? "disabled"
                      : "";

                  return `
                    <button class="${btnCls}" ${disabledAttr}
                      onclick="window.EBDApp.selectMcqOption('${curQ.id}', ${idx})">
                      <span class="mcq-option-letter">${letter}</span>
                      <span style="flex:1;">${esc(optText)}</span>
                    </button>
                  `;
                })
                .join("")}
            </div>

            <!-- Instant Feedback (in Practice Mode) or Post-Submit Review (in Exam Mode) -->
            ${renderMcqFeedbackBox(curQ)}

            <!-- Prev / Skip / Next / Submit Controls -->
            <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:0.65rem; margin-top:1.5rem; padding-top:1rem; border-top:1px solid var(--border-light);">
              <button class="btn btn-outline" ${mcqSession.currentIndex === 0 ? "disabled" : ""}
                onclick="window.EBDApp.goMcqIndex(${mcqSession.currentIndex - 1})">
                → السؤال السابق
              </button>

              <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
                ${
                  !mcqSession.submitted && mcqSession.answers[curQ.id] === undefined
                    ? `<button class="btn btn-outline btn-sm" onclick="window.EBDApp.skipCurrentQuestion('${curQ.id}')">
                        ⏭️ تخطي والعودة لاحقًا
                      </button>`
                    : ""
                }
                ${
                  mcqSession.mode === "exam" && !mcqSession.submitted
                    ? `<button class="btn btn-teal" onclick="window.EBDApp.submitExamSession()">
                        ✅ تسليم الامتحان وإظهار النتيجة (${answeredInSession}/${qList.length})
                      </button>`
                    : ""
                }
              </div>

              <button class="btn btn-primary" ${mcqSession.currentIndex >= qList.length - 1 ? "disabled" : ""}
                onclick="window.EBDApp.goMcqIndex(${mcqSession.currentIndex + 1})">
                السؤال التالي ←
              </button>
            </div>
          </div>

          <!-- Right: Navigator & Progress Panel -->
          <aside class="mcq-Navigator-panel">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
              <strong style="font-size:0.92rem;">📊 تقدم الجلسة الحالية</strong>
              <span class="badge badge-primary">${answeredInSession} / ${qList.length}</span>
            </div>
            <div style="width:100%; height:8px; background:var(--bg-subtle); border-radius:999px; overflow:hidden; margin-bottom:0.75rem;">
              <div style="width:${qList.length ? Math.round((answeredInSession / qList.length) * 100) : 0}%; height:100%; background:var(--brand-teal);"></div>
            </div>

            ${
              mcqSession.mode === "practice" || mcqSession.submitted
                ? `<div style="font-size:0.83rem; color:var(--text-secondary); margin-bottom:0.75rem;">
                    الإجابات الصحيحة: <strong style="color:var(--brand-emerald);">${sessionCorrect}</strong> من <strong>${answeredInSession}</strong>
                  </div>`
                : `<div style="font-size:0.8rem; color:var(--text-muted); margin-bottom:0.75rem;">
                    وضع الامتحان: تُحجب الإجابات الصحيحة حتى تضغط على زر "تسليم الامتحان".
                  </div>`
            }

            <strong style="font-size:0.82rem; color:var(--text-muted); display:block;">خريطة أرقام الأسئلة:</strong>
            <div class="mcq-nav-grid">
              ${qList
                .map((qItem, i) => {
                  const ans = mcqSession.answers[qItem.id];
                  const isSkipped = mcqSession.skipped[qItem.id];
                  let cls = "q-nav-dot";
                  if (i === mcqSession.currentIndex) cls += " current";
                  if (ans !== undefined) {
                    if (mcqSession.mode === "exam" && !mcqSession.submitted) {
                      cls += " answered-exam";
                    } else if (ans === qItem.correctIndex) {
                      cls += " answered-correct";
                    } else {
                      cls += " answered-wrong";
                    }
                  } else if (isSkipped) {
                    cls += " skipped";
                  }
                  return `<button class="${cls}" onclick="window.EBDApp.goMcqIndex(${i})">${i + 1}</button>`;
                })
                .join("")}
            </div>

            <div style="margin-top:1rem; padding-top:0.85rem; border-top:1px solid var(--border-light); display:flex; flex-direction:column; gap:0.45rem;">
              <button class="btn btn-outline btn-sm" onclick="window.EBDApp.updateMcqFilter('poolMode', 'wrong')">
                🔁 إعادة محاولة الأسئلة الخاطئة (${wrongCountEver})
              </button>
              <button class="btn btn-outline btn-sm" onclick="window.EBDApp.updateMcqFilter('poolMode', 'unanswered')">
                🆕 الأسئلة غير المحلولة (${500 - totalAnsweredEver})
              </button>
            </div>
          </aside>
        </div>
      `
      }

      <!-- Curriculum Coverage Map Table -->
      <div class="lecture-section-card" style="margin-top:2rem;">
        <h3 class="card-title" style="margin-bottom:0.75rem;">🗺️ خريطة تغطية المنهج لبنك الـ 500 سؤال (Curriculum Coverage Map)</h3>
        <p style="font-size:0.86rem; color:var(--text-secondary); margin-bottom:0.85rem;">
          توزيع الأسئلة الـ 500 المعتمدة على المحاضرات الأربع والموضوعات الفرعية الفعلية داخل ملفات أ.د. هديل فاروق:
        </p>
        <div class="grid-4">
          ${(window.EBD_LECTURES || [])
            .map((lec) => {
              const cov = (window.EBD_MCQ_COVERAGE && window.EBD_MCQ_COVERAGE[String(lec.id)]) || {
                totalQuestions: lec.mcqCount,
                subtopics: {}
              };
              return `
                <div style="background:var(--bg-subtle); padding:0.9rem; border-radius:var(--radius-sm); border:1px solid var(--border-light);">
                  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
                    <strong class="ltr" style="color:var(--brand-primary);">${esc(lec.code)}</strong>
                    <span class="badge badge-teal">${cov.totalQuestions} سؤال</span>
                  </div>
                  <ul style="list-style:none; font-size:0.78rem; color:var(--text-secondary);" class="ltr">
                    ${Object.entries(cov.subtopics || {})
                      .map(
                        ([stName, cnt]) =>
                          `<li style="display:flex; justify-content:space-between; padding:0.2rem 0; border-bottom:1px dashed var(--border-light);">
                            <span>${esc(stName)}</span>
                            <strong>${cnt}</strong>
                          </li>`
                      )
                      .join("")}
                  </ul>
                </div>
              `;
            })
            .join("")}
        </div>
      </div>
    `;
  }

  function renderMcqFeedbackBox(curQ) {
    const userSel = mcqSession.answers[curQ.id];
    const hasAnswered = userSel !== undefined;
    const showCorrection =
      (mcqSession.mode === "practice" && hasAnswered) ||
      (mcqSession.mode === "exam" && mcqSession.submitted);

    if (!showCorrection) return "";

    const isCorrect = userSel === curQ.correctIndex;
    const userLetter = hasAnswered ? ["A", "B", "C", "D"][userSel] : "لم تُجب";

    return `
      <div class="mcq-feedback-box">
        <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.55rem;">
          <strong style="color:${isCorrect ? "var(--brand-emerald)" : "var(--brand-rose)"}; font-size:0.98rem;">
            ${
              isCorrect
                ? `✅ إجابة صحيحة! (${curQ.correctLetter})`
                : `❌ إجابتك (${userLetter}) غير صحيحة — الإجابة الصحيحة هي (${curQ.correctLetter})`
            }
          </strong>
          <span class="badge badge-primary">📍 المرجع: ${esc(curQ.slideRef)}</span>
        </div>
        <p style="font-size:0.92rem; color:var(--text-primary); margin-bottom:0.45rem;">
          <strong>Why ${curQ.correctLetter} is Correct:</strong> ${esc(curQ.explanation)}
        </p>
        <p style="font-size:0.86rem; color:var(--text-secondary);">
          <strong>Why Other Options are Incorrect:</strong> ${esc(curQ.distractorRationale)}
        </p>
      </div>
    `;
  }

  function renderExamSummaryBanner(correct, total, pct) {
    return `
      <div class="lecture-section-card" style="border-left:5px solid var(--brand-teal); margin-bottom:1.25rem;">
        <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:1rem;">
          <div>
            <span class="badge badge-teal">🎓 نتيجة الامتحان التجريبي</span>
            <h3 class="card-title" style="margin-top:0.35rem;">
              حصلت على ${correct} من ${total} (${pct}%)
            </h3>
            <p style="font-size:0.9rem; color:var(--text-secondary);">
              يمكنك الآن تصفح الأسئلة أدناه لمراجعة إجاباتك وقراءة التفسير العلمي ومرجع الشريحة لكل سؤال، أو إعادة محاولة الأسئلة التي أخطأت فيها.
            </p>
          </div>
          <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
            <button class="btn btn-primary btn-sm" onclick="window.EBDApp.updateMcqFilter('poolMode', 'wrong')">
              🔁 مراجعة وحل الأسئلة الخاطئة فقط
            </button>
            <button class="btn btn-outline btn-sm" onclick="window.EBDApp.restartMcqSession()">
              🔄 بدء امتحان جديد
            </button>
          </div>
        </div>
      </div>
    `;
  }

  function selectMcqOption(qid, optIdx) {
    const curQ = mcqSession.questions[mcqSession.currentIndex];
    if (!curQ || curQ.id !== qid) return;
    if (mcqSession.mode === "practice" && mcqSession.answers[qid] !== undefined) return;
    if (mcqSession.mode === "exam" && mcqSession.submitted) return;

    mcqSession.answers[qid] = optIdx;
    delete mcqSession.skipped[qid];

    const isCorrect = optIdx === curQ.correctIndex;
    if (!state.answeredQuestions) state.answeredQuestions = {};
    state.answeredQuestions[qid] = {
      selectedIndex: optIdx,
      isCorrect,
      timestamp: Date.now()
    };

    if (!state.wrongQuestionIds) state.wrongQuestionIds = [];
    const wIdx = state.wrongQuestionIds.indexOf(qid);
    if (!isCorrect && wIdx === -1) {
      state.wrongQuestionIds.push(qid);
    } else if (isCorrect && wIdx >= 0) {
      state.wrongQuestionIds.splice(wIdx, 1);
    }

    saveState();
    renderMainView();
  }

  function skipCurrentQuestion(qid) {
    mcqSession.skipped[qid] = true;
    if (mcqSession.currentIndex < mcqSession.questions.length - 1) {
      mcqSession.currentIndex++;
    }
    renderMainView();
  }

  function goMcqIndex(idx) {
    if (idx >= 0 && idx < mcqSession.questions.length) {
      mcqSession.currentIndex = idx;
      renderMainView();
    }
  }

  function setMcqMode(mode) {
    mcqSession.mode = mode;
    mcqSession.submitted = false;
    mcqSession.answers = {};
    mcqSession.skipped = {};
    mcqSession.currentIndex = 0;
    renderMainView();
  }

  function updateMcqFilter(key, val) {
    mcqSession.filters[key] = val;
    if (key === "lectureId") {
      mcqSession.filters.subtopic = "all";
    }
    buildMcqSessionQuestions();
    renderMainView();
  }

  function restartMcqSession() {
    buildMcqSessionQuestions();
    renderMainView();
  }

  function submitExamSession() {
    mcqSession.submitted = true;
    const bank = window.EBD_MCQ_BANK || [];
    let correct = 0;
    mcqSession.questions.forEach((q) => {
      const sel = mcqSession.answers[q.id];
      if (sel === q.correctIndex) correct++;
      else if (sel === undefined) {
        // Unanswered in exam counts as wrong for review
        if (!state.wrongQuestionIds.includes(q.id)) {
          state.wrongQuestionIds.push(q.id);
        }
      }
    });
    const total = mcqSession.questions.length;
    const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
    if (!state.examHistory) state.examHistory = [];
    state.examHistory.unshift({
      date: new Date().toLocaleString("ar-EG"),
      lectureFilter: mcqSession.filters.lectureId,
      score: correct,
      total,
      pct
    });
    saveState();
    renderMainView();
  }

  function toggleBookmarkQuestion(qid) {
    if (!state.bookmarkedQuestions) state.bookmarkedQuestions = [];
    const idx = state.bookmarkedQuestions.indexOf(qid);
    if (idx >= 0) state.bookmarkedQuestions.splice(idx, 1);
    else state.bookmarkedQuestions.push(qid);
    saveState();
    renderMainView();
  }

  /* ═══════════════════════════════════════════════════════════════════════
     6. PROGRESS & BOOKMARKS PAGE
     ═══════════════════════════════════════════════════════════════════════ */
  function renderProgressPage(root) {
    const bank = window.EBD_MCQ_BANK || [];
    const sources = window.EBD_SOURCES || [];
    const favSources = sources.filter((s) => (state.favoriteSources || []).includes(s.id));
    const bookmarkedQs = bank.filter((q) => (state.bookmarkedQuestions || []).includes(q.id));
    const wrongQs = bank.filter((q) => (state.wrongQuestionIds || []).includes(q.id));
    const totalAnswered = Object.keys(state.answeredQuestions || {}).length;
    const totalCorrect = Object.values(state.answeredQuestions || {}).filter((x) => x.isCorrect).length;

    root.innerHTML = `
      <section class="page-hero">
        <div class="page-hero-content">
          <div class="hero-eyebrow">📊 Progress, Mistakes & Bookmarks · متابعة التقدم والمحفوظات</div>
          <h1 class="page-title">سجل تقدمك الدراسي، أخطائك، ومصادرك المحفوظة</h1>
          <p class="page-subtitle">
            يتم حفظ تقدمك وملاحظاتك تلقائيًا على متصفحك لتتمكن من العودة في أي وقت واستكمال المذاكرة من حيث توقفت.
          </p>
          <div class="hero-stats-row">
            <div class="stat-chip">
              <div class="stat-chip-value">${totalAnswered} / 500</div>
              <div class="stat-chip-label">إجمالي الأسئلة المحلولة</div>
            </div>
            <div class="stat-chip">
              <div class="stat-chip-value">${totalCorrect}</div>
              <div class="stat-chip-label">إجابات صحيحة</div>
            </div>
            <div class="stat-chip">
              <div class="stat-chip-value">${wrongQs.length}</div>
              <div class="stat-chip-label">أسئلة تحتاج لمراجعة</div>
            </div>
            <div class="stat-chip">
              <div class="stat-chip-value">${favSources.length}</div>
              <div class="stat-chip-label">فيديوهات شرح محفوظة</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Wrong Questions Review Section -->
      <div class="lecture-section-card">
        <div class="section-header">
          <h2 class="section-title">❌ الأسئلة التي أخطأت فيها وتحتاج إلى مراجعة (${wrongQs.length})</h2>
          ${
            wrongQs.length > 0
              ? `<button class="btn btn-primary btn-sm" onclick="window.EBDApp.updateMcqFilter('poolMode', 'wrong'); window.EBDApp.navigate('mcq');">
                  🔁 إعادة حل جميع الأسئلة الخاطئة في مركز الاختبارات ←
                </button>`
              : ""
          }
        </div>
        ${
          wrongQs.length === 0
            ? `<p style="color:var(--text-muted); font-size:0.92rem;">لا توجد أسئلة خاطئة مسجلة حاليًا. ابدأ بحل الأسئلة في مركز الاختبارات!</p>`
            : `<div style="display:flex; flex-direction:column; gap:0.65rem;">
                ${wrongQs
                  .slice(0, 15)
                  .map(
                    (q) => `
                  <div style="background:var(--bg-subtle); padding:0.9rem 1.1rem; border-radius:var(--radius-sm); border-left:4px solid var(--brand-rose);" class="ltr">
                    <div style="display:flex; justify-content:space-between; flex-wrap:wrap; gap:0.4rem; margin-bottom:0.35rem;">
                      <span class="badge badge-primary">${esc(q.id)} · Lecture ${q.lectureId} (${esc(q.subtopic)})</span>
                      <span class="badge badge-teal">${esc(q.slideRef)}</span>
                    </div>
                    <div style="font-weight:700; margin-bottom:0.35rem;">${esc(q.question)}</div>
                    <div style="font-size:0.86rem; color:var(--brand-emerald); font-weight:700;">
                      ✓ الإجابة الصحيحة (${q.correctLetter}): ${esc(q.options[q.correctIndex])}
                    </div>
                    <div style="font-size:0.83rem; color:var(--text-secondary); margin-top:0.2rem;">
                      ${esc(q.explanation)}
                    </div>
                  </div>
                `
                  )
                  .join("")}
              </div>`
        }
      </div>

      <!-- Bookmarked Questions -->
      <div class="lecture-section-card">
        <div class="section-header">
          <h2 class="section-title">🔖 الأسئلة المحفوظة بعلامة مرجعية (${bookmarkedQs.length})</h2>
          ${
            bookmarkedQs.length > 0
              ? `<button class="btn btn-teal btn-sm" onclick="window.EBDApp.updateMcqFilter('poolMode', 'bookmarked'); window.EBDApp.navigate('mcq');">
                  تدريب على الأسئلة المحفوظة ←
                </button>`
              : ""
          }
        </div>
        ${
          bookmarkedQs.length === 0
            ? `<p style="color:var(--text-muted); font-size:0.92rem;">لم تقم بحفظ أي سؤال بعد. يمكنك الضغط على "🔖 حفظ السؤال" داخل بنك الأسئلة.</p>`
            : `<div style="display:flex; flex-direction:column; gap:0.55rem;">
                ${bookmarkedQs
                  .map(
                    (q) => `
                  <div style="background:var(--bg-subtle); padding:0.8rem 1rem; border-radius:var(--radius-sm);" class="ltr">
                    <strong>${esc(q.id)} (Lec ${q.lectureId}):</strong> ${esc(q.question)}
                    <div style="font-size:0.82rem; color:var(--brand-primary); margin-top:0.2rem;">
                      Answer (${q.correctLetter}): ${esc(q.options[q.correctIndex])} — <em>${esc(q.slideRef)}</em>
                    </div>
                  </div>
                `
                  )
                  .join("")}
              </div>`
        }
      </div>

      <!-- Saved Video Sources -->
      <div class="lecture-section-card">
        <h2 class="section-title" style="margin-bottom:0.85rem;">⭐ مصادر الشرح المفضلة (${favSources.length})</h2>
        ${
          favSources.length === 0
            ? `<p style="color:var(--text-muted); font-size:0.92rem;">لم تقم بإضافة فيديوهات إلى المفضلة بعد.</p>`
            : `<div class="grid-2">${favSources.map((s) => renderSourceCardHTML(s)).join("")}</div>`
        }
      </div>
    `;
  }

  /* ═══════════════════════════════════════════════════════════════════════
     7. GLOBAL INTERNAL SEARCH ENGINE (WITH FUZZY / TYPO TOLERANCE)
     ═══════════════════════════════════════════════════════════════════════ */
  let globalSearchQuery = "";

  function normalizeForSearch(str) {
    return String(str || "")
      .toLowerCase()
      .replace(/[-_.,:;?()[\]"']/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function matchesQuery(text, query) {
    const normText = normalizeForSearch(text);
    const normQ = normalizeForSearch(query);
    if (!normQ) return false;
    if (normText.includes(normQ)) return true;
    const tokens = normQ.split(" ").filter(Boolean);
    if (tokens.length > 1 && tokens.every((t) => normText.includes(t))) return true;
    // Simple typo tolerance (subsequence / 1-char edit for tokens >= 4 chars)
    return tokens.some((tok) => {
      if (tok.length < 4) return false;
      const prefix = tok.slice(0, tok.length - 1);
      return normText.includes(prefix);
    });
  }

  function executeGlobalSearch(query) {
    const q = String(query || "").trim();
    if (!q) return { lectures: [], terms: [], sources: [], questions: [] };

    const lectures = [];
    const terms = [];

    (window.EBD_LECTURES || []).forEach((lec) => {
      if (
        matchesQuery(lec.title, q) ||
        matchesQuery(lec.arabicTitle, q) ||
        matchesQuery(lec.overview.summaryEn, q) ||
        matchesQuery(lec.overview.summaryAr, q)
      ) {
        lectures.push({
          type: "محاضرة",
          lectureId: lec.id,
          title: `${lec.code}: ${lec.title}`,
          subtitle: lec.arabicTitle,
          reason: "تطابق في عنوان المحاضرة أو الملخص العام"
        });
      }
      lec.sections.forEach((sec) => {
        if (
          matchesQuery(sec.title, q) ||
          matchesQuery(sec.explanationAr, q) ||
          sec.contentEn.some((c) => matchesQuery(c, q))
        ) {
          lectures.push({
            type: "موضوع فرعي",
            lectureId: lec.id,
            title: sec.title,
            subtitle: `${lec.code} — ${sec.slideRef}`,
            reason: `ورد في محتوى وشرح ${sec.slideRef}`
          });
        }
      });
      lec.keyTerms.forEach((kt) => {
        if (
          matchesQuery(kt.term, q) ||
          matchesQuery(kt.definitionEn, q) ||
          matchesQuery(kt.explanationAr, q)
        ) {
          terms.push({
            lectureId: lec.id,
            term: kt.term,
            definitionEn: kt.definitionEn,
            explanationAr: kt.explanationAr,
            slideRef: kt.slideRef
          });
        }
      });
    });

    const sources = (window.EBD_SOURCES || []).filter(
      (s) =>
        matchesQuery(s.title, q) ||
        matchesQuery(s.instructor, q) ||
        matchesQuery(s.affiliation, q) ||
        matchesQuery(s.whyRecommended, q) ||
        s.topics.some((t) => matchesQuery(t, q))
    );

    const questions = (window.EBD_MCQ_BANK || [])
      .filter(
        (item) =>
          matchesQuery(item.question, q) ||
          matchesQuery(item.subtopic, q) ||
          matchesQuery(item.explanation, q) ||
          item.options.some((o) => matchesQuery(o, q))
      )
      .slice(0, 25);

    return { lectures, terms, sources, questions };
  }

  function renderSearchPage(root) {
    if (currentParams.q !== undefined) {
      globalSearchQuery = currentParams.q;
    }
    const results = executeGlobalSearch(globalSearchQuery);
    const suggestions = [
      "PICO",
      "FINER",
      "PIRT",
      "PECO",
      "Prevalence vs Incidence",
      "Null Hypothesis H0",
      "p-value",
      "Simple vs Complex Hypothesis",
      "Directional",
      "Statement of Problem",
      "Kombucha",
      "PRF",
      "Xylitol",
      "Sir William Osler"
    ];

    root.innerHTML = `
      <section class="page-hero">
        <div class="page-hero-content" style="width:100%;">
          <div class="hero-eyebrow">🔍 Global Smart Search · محرك البحث الشامل داخل المنصة</div>
          <h1 class="page-title">ابحث في المحاضرات، المصطلحات العلمية، الفيديوهات، والـ 500 سؤال</h1>
          <div style="margin-top:1rem; display:flex; gap:0.5rem; flex-wrap:wrap;">
            <input id="global-search-input" type="text" class="filter-input"
              style="flex:1; min-width:260px; font-size:1rem; padding:0.75rem 1rem;"
              placeholder="اكتب مصطلحًا علميًا، اسم محاضر، حالة إكلينيكية، أو كلمة مفتاحية..."
              value="${esc(globalSearchQuery)}"
              oninput="window.EBDApp.onSearchInput(this.value)">
          </div>
          <div style="margin-top:0.75rem; display:flex; align-items:center; gap:0.35rem; flex-wrap:wrap;">
            <span style="font-size:0.8rem; color:var(--text-muted); font-weight:700;">اقتراحات بحث سريعة:</span>
            ${suggestions
              .map(
                (sug) => `
              <button class="jump-pill" onclick="window.EBDApp.onSearchInput('${sug}', true)">
                ${esc(sug)}
              </button>
            `
              )
              .join("")}
          </div>
        </div>
      </section>

      <div id="global-search-results">
        ${renderSearchResultsHTML(globalSearchQuery, results)}
      </div>
    `;
  }

  function renderSearchResultsHTML(query, results) {
    if (!String(query || "").trim()) {
      return `
        <div class="card" style="text-align:center; padding:2.5rem;">
          <h3 class="card-title">ابدأ الكتابة أعلاه للبحث الفوري في جميع أقسام المنصة</h3>
          <p class="card-subtitle">يعرض المحرك النتائج مقسمة إلى 4 مجموعات واضحة: (1) المحاضرات والموضوعات، (2) المصطلحات العلمية، (3) مصادر الشرح المرئية، (4) بنك الأسئلة.</p>
        </div>
      `;
    }

    const totalHits =
      results.lectures.length +
      results.terms.length +
      results.sources.length +
      results.questions.length;

    if (totalHits === 0) {
      return `
        <div class="card" style="text-align:center; padding:2.5rem;">
          <h3 class="card-title">لم يتم العثور على نتائج مطابقة لعبارة "${esc(query)}"</h3>
          <p class="card-subtitle">تأكد من الإملاء أو جرّب البحث بمصطلح أعم مثل PICO أو Hypothesis أو Problem أو FINER.</p>
        </div>
      `;
    }

    return `
      <!-- 1. Lectures & Subtopics -->
      <div class="lecture-section-card">
        <h3 class="card-title" style="margin-bottom:0.75rem;">📘 أولًا: المحاضرات والموضوعات الفرعية (${results.lectures.length})</h3>
        ${
          results.lectures.length === 0
            ? `<p style="font-size:0.86rem; color:var(--text-muted);">لا توجد موضوعات مطابقة مباشرة.</p>`
            : `<div class="grid-2">
                ${results.lectures
                  .map(
                    (item) => `
                  <div class="card" style="padding:1rem;">
                    <div>
                      <span class="badge badge-primary">${esc(item.type)} · Lec ${item.lectureId}</span>
                      <h4 class="card-title ltr" style="margin-top:0.35rem; font-size:0.98rem;">${esc(item.title)}</h4>
                      <p style="font-size:0.84rem; color:var(--text-secondary);">${esc(item.subtitle)}</p>
                      <p style="font-size:0.78rem; color:var(--brand-teal-dark); margin-top:0.25rem;">سبب الارتباط: ${esc(item.reason)}</p>
                    </div>
                    <div class="card-actions" style="margin-top:0.65rem; padding-top:0.55rem;">
                      <button class="btn btn-primary btn-sm" onclick="window.EBDApp.navigate('lecture-${item.lectureId}', { tab: 'content' })">فتح الموضوع ←</button>
                    </div>
                  </div>
                `
                  )
                  .join("")}
              </div>`
        }
      </div>

      <!-- 2. Scientific Terms -->
      <div class="lecture-section-card">
        <h3 class="card-title" style="margin-bottom:0.75rem;">🔤 ثانيًا: المصطلحات العلمية والتعريفات (${results.terms.length})</h3>
        ${
          results.terms.length === 0
            ? `<p style="font-size:0.86rem; color:var(--text-muted);">لا توجد مصطلحات مطابقة.</p>`
            : `<div class="grid-2">
                ${results.terms
                  .map(
                    (kt) => `
                  <div class="card" style="padding:1rem;">
                    <div class="card-badge-row">
                      <span class="badge badge-primary ltr">${esc(kt.term)}</span>
                      <span class="badge badge-teal ltr">${esc(kt.slideRef)}</span>
                    </div>
                    <p class="en-block" style="font-size:0.9rem; font-weight:600;">${esc(kt.definitionEn)}</p>
                    <p style="font-size:0.85rem; color:var(--text-secondary); margin-top:0.35rem;">${esc(kt.explanationAr)}</p>
                  </div>
                `
                  )
                  .join("")}
              </div>`
        }
      </div>

      <!-- 3. Video Sources -->
      <div class="lecture-section-card">
        <h3 class="card-title" style="margin-bottom:0.75rem;">🎬 ثالثًا: فيديوهات ومصادر الشرح (${results.sources.length})</h3>
        ${
          results.sources.length === 0
            ? `<p style="font-size:0.86rem; color:var(--text-muted);">لا توجد مصادر فيديو مطابقة.</p>`
            : `<div class="grid-2">
                ${results.sources.map((s) => renderSourceCardHTML(s)).join("")}
              </div>`
        }
      </div>

      <!-- 4. Matching MCQ Questions -->
      <div class="lecture-section-card">
        <h3 class="card-title" style="margin-bottom:0.75rem;">🧠 رابعًا: الأسئلة المرتبطة في بنك الـ 500 سؤال (أول ${results.questions.length} نتيجة)</h3>
        ${
          results.questions.length === 0
            ? `<p style="font-size:0.86rem; color:var(--text-muted);">لا توجد أسئلة مطابقة.</p>`
            : `<div style="display:flex; flex-direction:column; gap:0.65rem;">
                ${results.questions
                  .map(
                    (q) => `
                  <div style="background:var(--bg-subtle); padding:0.9rem 1.1rem; border-radius:var(--radius-sm);" class="ltr">
                    <div style="display:flex; justify-content:space-between; flex-wrap:wrap; gap:0.4rem; margin-bottom:0.3rem;">
                      <span class="badge badge-primary">${esc(q.id)} · Lecture ${q.lectureId} · ${esc(q.subtopic)}</span>
                      <span class="badge badge-teal">${esc(q.slideRef)}</span>
                    </div>
                    <div style="font-weight:700; margin-bottom:0.3rem;">${esc(q.question)}</div>
                    <div style="font-size:0.85rem; color:var(--brand-emerald); font-weight:700;">
                      ✓ Correct Answer (${q.correctLetter}): ${esc(q.options[q.correctIndex])}
                    </div>
                    <div style="font-size:0.82rem; color:var(--text-secondary); margin-top:0.2rem;">
                      ${esc(q.explanation)}
                    </div>
                  </div>
                `
                  )
                  .join("")}
              </div>`
        }
      </div>
    `;
  }

  function onSearchInput(val, syncInput = false) {
    globalSearchQuery = val;
    if (syncInput) {
      const inp = document.getElementById("global-search-input");
      if (inp) inp.value = val;
    }
    const container = document.getElementById("global-search-results");
    if (container) {
      const res = executeGlobalSearch(globalSearchQuery);
      container.innerHTML = renderSearchResultsHTML(globalSearchQuery, res);
    }
  }

  /* ══════════ INITIALIZATION ══════════ */
  function init() {
    applyTheme();
    window.addEventListener("hashchange", parseHashAndNavigate);

    const mobileBtn = document.getElementById("mobile-menu-toggle");
    const navLinks = document.getElementById("main-nav-links");
    if (mobileBtn && navLinks) {
      mobileBtn.addEventListener("click", () => {
        navLinks.classList.toggle("open");
      });
    }

    parseHashAndNavigate();
  }

  window.EBDApp = {
    navigate,
    toggleTheme,
    switchLectureTab,
    toggleSectionDone,
    saveLectureNote,
    openLibraryForLecture,
    updateSourceFilter,
    resetSourceFilters,
    toggleFavoriteSource,
    openVideoModal,
    seekVideoModal,
    closeVideoModal,
    saveSourceNote,
    startLectureQuiz,
    selectMcqOption,
    skipCurrentQuestion,
    goMcqIndex,
    setMcqMode,
    updateMcqFilter,
    restartMcqSession,
    submitExamSession,
    toggleBookmarkQuestion,
    onSearchInput
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
