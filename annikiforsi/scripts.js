import { translations } from './translation.js';

// Change Screen Scripts

document.addEventListener("DOMContentLoaded", () => {
//   const savedLang = localStorage.getItem("lang") || "en";
//   changeLanguage(savedLang);

    const burgerBtn = document.querySelector('.burger-btn');
    const burgerImg = burgerBtn.querySelector('img');
    const buttonsPhone = document.querySelectorAll('.navbar .button:not(.burger-btn)');
    const fillAdaptive = document.querySelectorAll('.fill-adaptive');
    const overlay = document.querySelector('.overlay');

    let menuOpen = false

    function updateButtonsVisibility() {
        if (window.innerWidth <= 670) {
            if (!menuOpen) {
                buttonsPhone.forEach(btn => btn.classList.add('hide-btn'));
            } else {
                buttonsPhone.forEach(btn => btn.classList.remove('hide-btn'));
            }
        } else {
            buttonsPhone.forEach(btn => btn.classList.remove('hide-btn'));
        }
    }

    updateButtonsVisibility();
    window.addEventListener('resize', updateButtonsVisibility);

    burgerBtn.addEventListener('click', () => {
        menuOpen = !menuOpen

        buttonsPhone.forEach(btn => btn.classList.toggle('hide-btn'));
        fillAdaptive.forEach(el => el.classList.toggle('show'));

        if (burgerImg.src.includes('burger.png')) {
            burgerImg.src = 'img/cross.svg';
        } else {
            burgerImg.src = 'img/burger.png';
        }

        overlay.classList.toggle('active');
    });

const languageBtn = document.querySelector('.language-btn');
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

function handleLanguageBtnClick(e) {
    if (isTouchDevice) {
        languageBtn.classList.toggle('language-btn-pressed');
        e.stopPropagation(); 
    }
}

function handleDocumentClick(e) {
    // Закрываем плашку выбора языка, если клик вне languageBtn
    if (isTouchDevice && !languageBtn.contains(e.target)) {
        languageBtn.classList.remove('language-btn-pressed');
    }

    // Закрываем меню, если клик вне burgerBtn и languageBtn
    if (
        menuOpen &&
        !burgerBtn.contains(e.target) &&
        !languageBtn.contains(e.target)
    ) {
        menuOpen = false;
        buttonsPhone.forEach(btn => btn.classList.add('hide-btn'));
        fillAdaptive.forEach(el => el.classList.remove('show'));
        overlay.classList.toggle('active');
        burgerImg.src = 'img/burger.png';
    }
}

languageBtn.addEventListener('click', handleLanguageBtnClick);
document.addEventListener('click', handleDocumentClick);


    document.addEventListener('click', (e) => {
    if (isTouchDevice && window.innerWidth <= 670 && menuOpen) {
        if (!burgerBtn.contains(e.target)) {
            menuOpen = false;

            buttonsPhone.forEach(btn => btn.classList.add('hide-btn'));
            fillAdaptive.forEach(el => el.classList.remove('show'));
            burgerImg.src = 'img/burger.png';
        }
    }
});


    // Swipe for open/close munu
    let touchStartX = null;
let touchStartY = null;
let touchEndX = null;
let touchEndY = null;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    handleSwipeGesture();
});

function handleSwipeGesture() {
    if (
        touchStartX === null || touchEndX === null ||
        touchStartY === null || touchEndY === null
    ) return;

    const swipeDistanceX = touchEndX - touchStartX;
    const swipeDistanceY = touchEndY - touchStartY;

    if (Math.abs(swipeDistanceX) < Math.abs(swipeDistanceY) * 1.5) {
        resetTouch();
        return;
    }

    if (swipeDistanceX < -100 && window.innerWidth <= 670 && !menuOpen) {
        menuOpen = true;
        buttonsPhone.forEach(btn => btn.classList.remove('hide-btn'));
        fillAdaptive.forEach(el => el.classList.add('show'));
        burgerImg.src = 'img/cross.svg';
        overlay.classList.toggle('active');
    }

    if (swipeDistanceX > 100 && window.innerWidth <= 670 && menuOpen) {
        menuOpen = false;
        buttonsPhone.forEach(btn => btn.classList.add('hide-btn'));
        fillAdaptive.forEach(el => el.classList.remove('show'));
        burgerImg.src = 'img/burger.png';
        overlay.classList.toggle('active');
    }

    resetTouch();
}

function resetTouch() {
    touchStartX = null;
    touchEndX = null;
    touchStartY = null;
    touchEndY = null;
}



// Page changer

  const sections = document.querySelectorAll(".page-section");
  const buttons = {
    about: document.querySelector(".about-btn"),
    tiba: document.querySelector(".tiba-btn"),
    clients: document.querySelector(".clients-btn"),
  };

  function showSection(sectionClass) {
    sections.forEach(sec => sec.classList.remove("active"));
    document.querySelector(`.${sectionClass}-container`).classList.add("active");
     Object.values(buttons).forEach(btn => btn.classList.remove("active"));
    buttons[sectionClass].classList.add("active");
  }

  buttons.about.addEventListener("click", () => showSection("about"));
  buttons.tiba.addEventListener("click", () => showSection("tiba"));
  buttons.clients.addEventListener("click", () => showSection("clients"));

  showSection("about");
});

// Change Language Scripts

function changeLanguage(lang) {
    const elements = document.querySelectorAll("[data-key]");

    elements.forEach(el => {
        const key = el.getAttribute("data-key");
        if (translations[lang] && translations[lang][key]) {
            const button = el.closest('.button');
            if (button) {
                animateButtonResize(button, translations[lang][key]);
            } else {
                el.innerHTML = translations[lang][key];
            }
        }
    });

    document.querySelectorAll(".language-change-btn").forEach(btn => {
        btn.classList.remove("active-lang");
        if (btn.dataset.lang === lang) btn.classList.add("active-lang");
    });

    const activeSection = document.querySelector(".page-section.active");
    if (activeSection) {
        activeSection.style.animation = 'none';
        activeSection.offsetHeight;
        activeSection.style.animation = null;
    }
}


function animateButtonResize(button, newText) {
    const p = button.querySelector('p');
    const originalHTML = p.innerHTML;

    // ✅ Сброс фиксированной ширины перед новой анимацией
    button.style.width = '';

    // Замеряем текущую ширину
    const startWidth = button.offsetWidth;

    // Ставим новый текст для измерения
    p.innerHTML = newText;

    // Замеряем новую ширину
    const endWidth = button.offsetWidth;

    // Возвращаем старый текст для плавного старта
    p.innerHTML = originalHTML;

    // Фиксируем ширину
    button.style.width = startWidth + 'px';

    // Перерисовка + запуск анимации
    requestAnimationFrame(() => {
        p.innerHTML = newText;
        button.style.width = endWidth + 'px';
    });

    // Гарантированное снятие фиксации ширины после анимации
    const clearWidth = () => {
        button.style.width = '';
        button.removeEventListener('transitionend', clearWidth);
        clearTimeout(fallbackTimeout);
    };

    // Fallback таймер (чтобы снять фиксацию если transitionend не сработает)
    const fallbackTimeout = setTimeout(clearWidth, 600);

    button.addEventListener('transitionend', clearWidth);
}




document.querySelectorAll(".language-change-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        // Запрет клика по уже активной кнопке
        if (btn.classList.contains('active-lang')) return;

        const lang = btn.getAttribute("data-lang");
        changeLanguage(lang);
    });
});





