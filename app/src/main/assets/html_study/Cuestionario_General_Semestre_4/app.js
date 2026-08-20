/**
 * StudyHub · 4° Semestre - Interactive Quiz & Learning Engine
 * High-performance, fully persistent, accessible, and responsive client-side engine.
 */

(function () {
  'use strict';

  // --- STORAGE KEYS ---
  const STORAGE_THEME_KEY = 'studyhub_theme_mode';
  const STORAGE_PROGRESS_KEY = 'studyhub_quiz_progress_v3';

  // --- STATE MANAGEMENT ---
  const AppState = {
    currentCategory: 'all',
    searchQuery: '',
    allQuestions: Array.isArray(QUESTION_BANK) ? [...QUESTION_BANK] : [],
    filteredQuestions: [],
    currentIndex: 0,
    userAnswers: {}, // { [questionId]: { selectedIndex: number, isCorrect: boolean } }
    discardedOptions: {}, // { [questionId]: Set<number> }
    streak: 0,
    maxStreak: 0,
    isShuffle: false,
    isDark: localStorage.getItem(STORAGE_THEME_KEY) === 'dark'
  };

  // --- DOM REFERENCES ---
  const elCategoryList = document.getElementById('categoryList');
  const elSearchFilter = document.getElementById('searchFilter');
  const elStatScore = document.getElementById('statScore');
  const elStatAccuracy = document.getElementById('statAccuracy');
  const elStatStreak = document.getElementById('statStreak');
  const elStatAnswered = document.getElementById('statAnswered');
  const elBtnResetProgress = document.getElementById('btnResetProgress');

  const elHudBar = document.getElementById('hudBar');
  const elQuestionCounter = document.getElementById('questionCounter');
  const elProgressPercent = document.getElementById('progressPercent');
  const elProgressFill = document.getElementById('progressFill');
  const elStreakBadge = document.getElementById('streakBadge');

  const elQuestionCard = document.getElementById('questionCard');
  const elTagCategory = document.getElementById('tagCategory');
  const elTagDifficulty = document.getElementById('tagDifficulty');
  const elQuestionIdBadge = document.getElementById('questionIdBadge');
  const elContextBox = document.getElementById('contextBox');
  const elContextContent = document.getElementById('contextContent');
  const elQuestionText = document.getElementById('questionText');
  const elCodeSnippet = document.getElementById('codeSnippet');
  const elOptionsGrid = document.getElementById('optionsGrid');
  const elHintBox = document.getElementById('hintBox');
  const elHintText = document.getElementById('hintText');
  const elFeedbackBox = document.getElementById('feedbackBox');
  const elFeedbackHeader = document.getElementById('feedbackHeader');
  const elFeedbackExplanation = document.getElementById('feedbackExplanation');

  const elBtnShowHint = document.getElementById('btnShowHint');
  const elBtnPrev = document.getElementById('btnPrev');
  const elBtnNext = document.getElementById('btnNext');

  const elResultsScreen = document.getElementById('resultsScreen');
  const elFinalScore = document.getElementById('finalScore');
  const elFinalTotal = document.getElementById('finalTotal');
  const elResultsBreakdown = document.getElementById('resultsBreakdown');
  const elBtnRestart = document.getElementById('btnRestart');
  const elBtnRetryWrong = document.getElementById('btnRetryWrong');

  const elBtnOpenTheory = document.getElementById('btnOpenTheory');
  const elTheoryModal = document.getElementById('theoryModal');
  const elBtnCloseTheory = document.getElementById('btnCloseTheory');
  const elTheorySubjectSelect = document.getElementById('theorySubjectSelect');
  const elTheoryModalBody = document.getElementById('theoryModalBody');

  const elBtnToggleShuffle = document.getElementById('btnToggleShuffle');
  const elShuffleIcon = document.getElementById('shuffleIcon');
  const elShuffleText = document.getElementById('shuffleText');
  const elBtnThemeToggle = document.getElementById('btnThemeToggle');
  const elThemeIcon = document.getElementById('themeIcon');

  // --- PERSISTENCE HELPERS ---
  function loadProgress() {
    try {
      const raw = localStorage.getItem(STORAGE_PROGRESS_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        if (data && typeof data === 'object') {
          AppState.userAnswers = data.userAnswers || {};
          AppState.maxStreak = data.maxStreak || 0;
          if (data.lastCategory) {
            AppState.currentCategory = data.lastCategory;
          }
          if (data.discardedOptions && typeof data.discardedOptions === 'object') {
            AppState.discardedOptions = {};
            Object.entries(data.discardedOptions).forEach(([qId, indices]) => {
              AppState.discardedOptions[qId] = new Set(indices);
            });
          }
        }
      }
    } catch (e) {
      console.warn('No se pudo cargar el progreso desde localStorage:', e);
    }
  }

  function saveProgress() {
    try {
      const serializableDiscarded = {};
      Object.entries(AppState.discardedOptions).forEach(([qId, setObj]) => {
        if (setObj && setObj.size > 0) {
          serializableDiscarded[qId] = Array.from(setObj);
        }
      });

      const data = {
        userAnswers: AppState.userAnswers,
        discardedOptions: serializableDiscarded,
        maxStreak: AppState.maxStreak,
        lastCategory: AppState.currentCategory
      };
      localStorage.setItem(STORAGE_PROGRESS_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('No se pudo guardar el progreso en localStorage:', e);
    }
  }

  // --- MARKDOWN & MATH FORMATTER ---
  function formatMarkdown(text) {
    if (!text) return '';
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code style="background: var(--slate-200); padding: 0.15rem 0.35rem; border-radius: 4px; font-family: monospace; font-size: 0.9em; color: var(--primary-dark);">$1</code>')
      .replace(/\n/g, '<br>');
  }

  function renderMath() {
    if (typeof renderMathInElement === 'function') {
      try {
        renderMathInElement(document.body, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false }
          ],
          throwOnError: false
        });
      } catch (err) {
        console.warn('KaTeX render warning:', err);
      }
    }
  }

  // --- SHUFFLE HELPER ---
  function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // --- CATEGORIES DEFINITION ---
  const CATEGORIES = [
    { id: 'all', label: '🌟 Todos los Temas (Examen)', icon: '🌟' },
    { id: 'moviles', label: '📱 Aplicaciones Móviles', icon: '📱' },
    { id: 'poo', label: '☕ Orientado a Objetos (Java)', icon: '☕' },
    { id: 'fullstack', label: '🌐 Fullstack 2 (Web & JS)', icon: '🌐' },
    { id: 'basedatos', label: '🗄️ Taller de Base de Datos', icon: '🗄️' },
    { id: 'estadistica', label: '📊 Estadística Descriptiva', icon: '📊' }
  ];

  function initCategories() {
    elCategoryList.innerHTML = '';

    CATEGORIES.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = `cat-btn ${AppState.currentCategory === cat.id ? 'active' : ''}`;
      btn.dataset.cat = cat.id;
      btn.id = `cat-btn-${cat.id}`;
      btn.innerHTML = `
        <span>${cat.label}</span>
        <span class="cat-badge" id="badge-${cat.id}">0</span>
      `;

      btn.addEventListener('click', () => {
        setCategory(cat.id);
      });

      elCategoryList.appendChild(btn);
    });

    updateCategoryBadges();
  }

  function updateCategoryBadges() {
    CATEGORIES.forEach(cat => {
      const badge = document.getElementById(`badge-${cat.id}`);
      if (!badge) return;

      let catQuestions = [];
      if (cat.id === 'all') {
        catQuestions = AppState.allQuestions;
      } else {
        catQuestions = AppState.allQuestions.filter(q => q.subjectId === cat.id);
      }

      const total = catQuestions.length;
      const answered = catQuestions.filter(q => AppState.userAnswers[q.id]).length;

      if (answered === 0) {
        badge.textContent = total;
        badge.style.background = '';
      } else if (answered === total) {
        badge.textContent = `✓ ${total}`;
        badge.style.background = 'var(--success)';
        badge.style.color = '#ffffff';
      } else {
        badge.textContent = `${answered}/${total}`;
        badge.style.background = 'var(--primary-light)';
        badge.style.color = 'var(--primary-dark)';
      }
    });
  }

  // --- FILTER QUESTIONS ---
  function filterQuestions(findFirstUnanswered = false) {
    let pool = [...AppState.allQuestions];

    // Filter by subject
    if (AppState.currentCategory !== 'all') {
      pool = pool.filter(q => q.subjectId === AppState.currentCategory);
    }

    // Filter by search query
    if (AppState.searchQuery.trim() !== '') {
      const query = AppState.searchQuery.toLowerCase();
      pool = pool.filter(q =>
        q.question.toLowerCase().includes(query) ||
        (q.context && q.context.toLowerCase().includes(query)) ||
        (q.explanation && q.explanation.toLowerCase().includes(query)) ||
        (q.categoryLabel && q.categoryLabel.toLowerCase().includes(query)) ||
        q.options.some(opt => opt.toLowerCase().includes(query))
      );
    }

    if (AppState.isShuffle) {
      pool = shuffleArray(pool);
    }

    AppState.filteredQuestions = pool;

    if (findFirstUnanswered && pool.length > 0) {
      const firstUnansweredIndex = pool.findIndex(q => !AppState.userAnswers[q.id]);
      AppState.currentIndex = firstUnansweredIndex !== -1 ? firstUnansweredIndex : 0;
    } else {
      if (AppState.currentIndex >= pool.length) {
        AppState.currentIndex = 0;
      }
    }
  }

  function setCategory(catId) {
    AppState.currentCategory = catId;
    saveProgress();

    const btns = elCategoryList.querySelectorAll('.cat-btn');
    btns.forEach(b => {
      b.classList.toggle('active', b.dataset.cat === catId);
    });

    filterQuestions(true);
    renderQuestion();
  }

  // --- HUD & STATS UPDATE (PER MODULE & PERSISTENT) ---
  function updateHUD() {
    const total = AppState.filteredQuestions.length;
    const answeredInModule = AppState.filteredQuestions.filter(q => AppState.userAnswers[q.id]).length;
    const correctInModule = AppState.filteredQuestions.filter(q => AppState.userAnswers[q.id]?.isCorrect).length;
    const scoreInModule = correctInModule * 10;

    // HUD Bar
    if (total === 0) {
      elQuestionCounter.textContent = 'Sin preguntas';
      elProgressPercent.textContent = '0%';
      elProgressFill.style.width = '0%';
    } else {
      elQuestionCounter.textContent = `Pregunta ${AppState.currentIndex + 1} de ${total}`;
      const pct = Math.round(((AppState.currentIndex + 1) / total) * 100);
      elProgressPercent.textContent = `${pct}%`;
      elProgressFill.style.width = `${pct}%`;
    }

    // Streak badge
    if (AppState.streak > 1) {
      elStreakBadge.textContent = `🔥 Racha: ${AppState.streak}`;
      elStreakBadge.style.display = 'inline-flex';
    } else {
      elStreakBadge.style.display = 'none';
    }

    // Sidebar Stats reflecting current module
    elStatScore.textContent = scoreInModule;
    const accuracy = answeredInModule > 0 ? Math.round((correctInModule / answeredInModule) * 100) : 0;
    elStatAccuracy.textContent = `${accuracy}%`;
    elStatStreak.textContent = AppState.maxStreak;
    elStatAnswered.textContent = `${answeredInModule}/${total}`;

    updateCategoryBadges();
  }

  // --- RENDER CURRENT QUESTION ---
  function renderQuestion() {
    const total = AppState.filteredQuestions.length;

    if (total === 0) {
      elResultsScreen.classList.remove('visible');
      elQuestionCard.style.display = 'block';
      elQuestionText.textContent = 'No se encontraron preguntas para este filtro o búsqueda.';
      elOptionsGrid.innerHTML = '';
      elContextBox.style.display = 'none';
      elCodeSnippet.style.display = 'none';
      elHintBox.classList.remove('visible');
      elFeedbackBox.classList.remove('visible');
      elBtnNext.disabled = true;
      elBtnPrev.style.display = 'none';
      updateHUD();
      return;
    }

    elResultsScreen.classList.remove('visible');
    elQuestionCard.style.display = 'block';
    elHudBar.style.display = 'flex';

    const q = AppState.filteredQuestions[AppState.currentIndex];

    // Meta tags
    elTagCategory.textContent = q.categoryLabel || q.subjectName;
    elTagDifficulty.textContent = q.difficulty || 'Intermedio';
    elTagDifficulty.className = `difficulty-tag ${q.difficulty === 'Fácil' ? 'diff-easy' : q.difficulty === 'Intermedio' ? 'diff-medium' : 'diff-hard'}`;
    elQuestionIdBadge.textContent = `#${q.id}`;

    // Context box
    if (q.context) {
      elContextContent.innerHTML = formatMarkdown(q.context);
      elContextBox.style.display = 'block';
    } else {
      elContextBox.style.display = 'none';
    }

    // Question prompt
    elQuestionText.innerHTML = formatMarkdown(q.question);

    // Optional Code Snippet
    if (q.code) {
      elCodeSnippet.innerHTML = q.code;
      elCodeSnippet.style.display = 'block';
    } else {
      elCodeSnippet.style.display = 'none';
    }

    // Options Grid
    elOptionsGrid.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D', 'E'];
    const alreadyAnswered = AppState.userAnswers[q.id];
    const isDiscardedSet = AppState.discardedOptions[q.id] || new Set();

    q.options.forEach((optText, idx) => {
      const row = document.createElement('div');
      row.className = 'option-row';
      if (!alreadyAnswered && isDiscardedSet.has(idx)) {
        row.classList.add('discarded');
      }

      row.innerHTML = `
        <button type="button" class="option-btn" aria-label="Seleccionar alternativa ${letters[idx]}">
          <div class="option-letter">${letters[idx]}</div>
          <div class="option-content">${formatMarkdown(optText)}</div>
        </button>
        <button type="button" class="btn-discard-outside" title="Descartar / Habilitar alternativa (${letters[idx]})" aria-label="Descartar alternativa ${letters[idx]}">✕</button>
      `;

      const optBtn = row.querySelector('.option-btn');
      const discardBtn = row.querySelector('.btn-discard-outside');

      if (alreadyAnswered) {
        optBtn.disabled = true;
        discardBtn.disabled = true;
        discardBtn.style.opacity = '0.3';
        if (idx === q.correctIndex) {
          optBtn.classList.add('correct');
          row.classList.remove('discarded');
        } else if (idx === alreadyAnswered.selectedIndex) {
          optBtn.classList.add('incorrect');
        }
      } else {
        // Clic en la equis externa para descartar / re-habilitar
        discardBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          if (!AppState.discardedOptions[q.id]) {
            AppState.discardedOptions[q.id] = new Set();
          }
          if (AppState.discardedOptions[q.id].has(idx)) {
            AppState.discardedOptions[q.id].delete(idx);
            row.classList.remove('discarded');
          } else {
            AppState.discardedOptions[q.id].add(idx);
            row.classList.add('discarded');
          }
          saveProgress();
        });

        // Clic en la alternativa para responder
        optBtn.addEventListener('click', () => {
          handleSelectOption(idx);
        });
      }

      elOptionsGrid.appendChild(row);
    });

    // Hint box
    elHintBox.classList.remove('visible');
    elHintText.innerHTML = formatMarkdown(q.hint || 'Analiza detalladamente los conceptos clave de la pregunta.');

    // Feedback box restoration
    if (alreadyAnswered) {
      showFeedback(alreadyAnswered.isCorrect, q.explanation);
      elBtnNext.disabled = false;
      elBtnShowHint.style.display = 'none';
    } else {
      elFeedbackBox.classList.remove('visible', 'correct', 'incorrect');
      elBtnNext.disabled = true;
      elBtnShowHint.style.display = 'inline-flex';
    }

    // Previous button visibility
    if (AppState.currentIndex > 0) {
      elBtnPrev.style.display = 'inline-flex';
    } else {
      elBtnPrev.style.display = 'none';
    }

    // Check if on last question
    if (AppState.currentIndex === total - 1) {
      elBtnNext.textContent = alreadyAnswered ? 'Ver Resultados 🏆' : 'Finalizar Cuestionario ➔';
    } else {
      elBtnNext.textContent = 'Siguiente Pregunta →';
    }

    updateHUD();
    renderMath();
  }

  // --- OPTION SELECTION & EVALUATION ---
  function handleSelectOption(selectedIndex) {
    const q = AppState.filteredQuestions[AppState.currentIndex];
    const isCorrect = (selectedIndex === q.correctIndex);

    AppState.userAnswers[q.id] = { selectedIndex, isCorrect };

    if (isCorrect) {
      AppState.streak++;
      if (AppState.streak > AppState.maxStreak) AppState.maxStreak = AppState.streak;

      // Confetti on 3+ streaks
      if (AppState.streak >= 3 && typeof confetti === 'function') {
        confetti({ particleCount: 35, spread: 65, origin: { y: 0.8 } });
      }
    } else {
      AppState.streak = 0;
    }

    saveProgress();

    // Visual button update
    const rows = elOptionsGrid.querySelectorAll('.option-row');
    rows.forEach((row, idx) => {
      const optBtn = row.querySelector('.option-btn');
      const discardBtn = row.querySelector('.btn-discard-outside');
      if (optBtn) optBtn.disabled = true;
      if (discardBtn) {
        discardBtn.disabled = true;
        discardBtn.style.opacity = '0.3';
      }

      if (idx === q.correctIndex) {
        if (optBtn) optBtn.classList.add('correct');
        row.classList.remove('discarded');
      } else if (idx === selectedIndex) {
        if (optBtn) optBtn.classList.add('incorrect');
      }
    });

    showFeedback(isCorrect, q.explanation);

    elBtnNext.disabled = false;
    elBtnShowHint.style.display = 'none';

    updateHUD();
    renderMath();
  }

  function showFeedback(isCorrect, explanation) {
    elFeedbackBox.classList.remove('correct', 'incorrect');
    elFeedbackBox.classList.add('visible', isCorrect ? 'correct' : 'incorrect');

    elFeedbackHeader.innerHTML = isCorrect
      ? '<span>✅</span> ¡Respuesta Correcta!'
      : '<span>❌</span> Respuesta Incorrecta';

    elFeedbackExplanation.innerHTML = formatMarkdown(explanation || 'Revisa la teoría correspondiente para reforzar este concepto.');
  }

  // --- RESULTS SCREEN ---
  function showResultsScreen() {
    elQuestionCard.style.display = 'none';
    elHudBar.style.display = 'none';
    elResultsScreen.classList.add('visible');

    const total = AppState.filteredQuestions.length;
    let correctCount = 0;
    const breakdown = {};

    AppState.filteredQuestions.forEach(q => {
      const ans = AppState.userAnswers[q.id];
      const isCorrect = ans && ans.isCorrect;
      if (isCorrect) correctCount++;

      const subName = q.subjectName || 'General';
      if (!breakdown[subName]) {
        breakdown[subName] = { total: 0, correct: 0 };
      }
      breakdown[subName].total++;
      if (isCorrect) breakdown[subName].correct++;
    });

    elFinalScore.textContent = correctCount;
    elFinalTotal.textContent = `de ${total} preguntas`;

    // Confetti celebration
    if (typeof confetti === 'function' && correctCount > 0) {
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.6 }
      });
    }

    // Category Breakdown rows
    elResultsBreakdown.innerHTML = '';
    Object.entries(breakdown).forEach(([name, stats]) => {
      const pct = Math.round((stats.correct / stats.total) * 100);
      const row = document.createElement('div');
      row.className = 'breakdown-row';
      row.innerHTML = `
        <span><strong>${name}</strong></span>
        <span>${stats.correct} / ${stats.total} (${pct}%)</span>
      `;
      elResultsBreakdown.appendChild(row);
    });

    const hasErrors = (correctCount < total);
    elBtnRetryWrong.style.display = hasErrors ? 'inline-flex' : 'none';

    document.getElementById('main-content')?.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // --- THEORY MODAL ---
  function initTheoryModal() {
    elTheorySubjectSelect.innerHTML = '';

    Object.values(SUBJECT_THEORY).forEach(sub => {
      const opt = document.createElement('option');
      opt.value = sub.id;
      opt.textContent = `${sub.icono} ${sub.nombre}`;
      elTheorySubjectSelect.appendChild(opt);
    });

    elTheorySubjectSelect.addEventListener('change', (e) => {
      renderTheoryContent(e.target.value);
    });
  }

  function renderTheoryContent(subjectId) {
    const sub = SUBJECT_THEORY[subjectId];
    if (!sub) return;

    elTheoryModalBody.innerHTML = '';

    const intro = document.createElement('div');
    intro.className = 'theory-section';
    intro.innerHTML = `
      <h4>${sub.icono} ${sub.nombre}</h4>
      <p style="color: var(--text-muted); font-size: 0.9rem;">${sub.descripcion || ''}</p>
    `;
    elTheoryModalBody.appendChild(intro);

    if (sub.temas && sub.temas.length > 0) {
      sub.temas.forEach((tema, idx) => {
        const sec = document.createElement('div');
        sec.className = 'theory-section';
        sec.innerHTML = `
          <h4>${idx + 1}. ${tema.titulo}</h4>
          <div>${tema.contenido}</div>
        `;
        elTheoryModalBody.appendChild(sec);
      });
    }

    renderMath();
  }

  function openTheoryModal() {
    const activeSub = AppState.currentCategory !== 'all' ? AppState.currentCategory : 'estadistica';
    if (SUBJECT_THEORY[activeSub]) {
      elTheorySubjectSelect.value = activeSub;
    }
    renderTheoryContent(elTheorySubjectSelect.value || 'estadistica');
    elTheoryModal.classList.add('visible');
  }

  function closeTheoryModal() {
    elTheoryModal.classList.remove('visible');
  }

  // --- THEME TOGGLE ---
  function initTheme() {
    if (AppState.isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      elThemeIcon.textContent = '☀️';
    } else {
      document.documentElement.removeAttribute('data-theme');
      elThemeIcon.textContent = '🌙';
    }
  }

  function toggleTheme() {
    AppState.isDark = !AppState.isDark;
    localStorage.setItem(STORAGE_THEME_KEY, AppState.isDark ? 'dark' : 'light');
    initTheme();
  }

  // --- EVENT LISTENERS ---
  elBtnShowHint.addEventListener('click', () => {
    elHintBox.classList.toggle('visible');
  });

  elBtnPrev.addEventListener('click', () => {
    if (AppState.currentIndex > 0) {
      AppState.currentIndex--;
      renderQuestion();
    }
  });

  elBtnNext.addEventListener('click', () => {
    if (AppState.currentIndex < AppState.filteredQuestions.length - 1) {
      AppState.currentIndex++;
      renderQuestion();
    } else {
      showResultsScreen();
    }
  });

  elBtnRestart.addEventListener('click', () => {
    // Reset answers for the current module only
    AppState.filteredQuestions.forEach(q => delete AppState.userAnswers[q.id]);
    AppState.streak = 0;
    saveProgress();
    AppState.currentIndex = 0;
    filterQuestions();
    renderQuestion();
  });

  elBtnRetryWrong.addEventListener('click', () => {
    const wrongQuestions = AppState.filteredQuestions.filter(q => {
      const ans = AppState.userAnswers[q.id];
      return ans && !ans.isCorrect;
    });

    if (wrongQuestions.length > 0) {
      AppState.filteredQuestions = wrongQuestions;
      AppState.currentIndex = 0;
      wrongQuestions.forEach(q => delete AppState.userAnswers[q.id]);
      saveProgress();
      renderQuestion();
    }
  });

  elBtnResetProgress.addEventListener('click', () => {
    const isAll = AppState.currentCategory === 'all';
    const msg = isAll
      ? '¿Deseas reiniciar todas tus respuestas y estadísticas guardadas?'
      : '¿Deseas reiniciar las respuestas y puntuación de este módulo?';

    if (confirm(msg)) {
      if (isAll) {
        AppState.userAnswers = {};
        AppState.maxStreak = 0;
      } else {
        AppState.filteredQuestions.forEach(q => delete AppState.userAnswers[q.id]);
      }
      AppState.streak = 0;
      AppState.currentIndex = 0;
      saveProgress();
      filterQuestions();
      renderQuestion();
    }
  });

  elSearchFilter.addEventListener('input', (e) => {
    AppState.searchQuery = e.target.value;
    filterQuestions();
    renderQuestion();
  });

  elBtnToggleShuffle.addEventListener('click', () => {
    AppState.isShuffle = !AppState.isShuffle;
    elShuffleText.textContent = `Aleatorio: ${AppState.isShuffle ? 'ON' : 'OFF'}`;
    elBtnToggleShuffle.style.background = AppState.isShuffle ? 'rgba(79, 70, 229, 0.4)' : 'rgba(255, 255, 255, 0.1)';
    filterQuestions(true);
    renderQuestion();
  });

  elBtnThemeToggle.addEventListener('click', toggleTheme);
  elBtnOpenTheory.addEventListener('click', openTheoryModal);
  elBtnCloseTheory.addEventListener('click', closeTheoryModal);

  elTheoryModal.addEventListener('click', (e) => {
    if (e.target === elTheoryModal) closeTheoryModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && elTheoryModal.classList.contains('visible')) {
      closeTheoryModal();
    }
  });

  // --- INITIALIZATION ---
  function init() {
    loadProgress();
    initTheme();
    initCategories();
    initTheoryModal();
    filterQuestions(true);
    renderQuestion();
  }

  init();
})();
