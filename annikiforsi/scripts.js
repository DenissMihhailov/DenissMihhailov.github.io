import { translations } from './translation.js';

// Change Screen Scripts

document.addEventListener("DOMContentLoaded", () => {
//   const savedLang = localStorage.getItem("lang") || "en";
//   changeLanguage(savedLang);

    document.getElementById('footer-year').textContent = new Date().getFullYear();

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

// function setResponsiveFrame() {
//   const img = document.getElementById("frame-img");
//   const wrapper = document.querySelector(".frame-wrapper");
//   const width = window.innerWidth;
//   const height = window.innerHeight;
//   const aspectRatio = width / height;

//   if (width <= 1024 && height >= 600 && aspectRatio <= 0.75) {
//     img.src = "img/frame-vertical-animated.svg";
//     wrapper.style.height = "90%";
//   } else {
//     img.src = "img/frame-animated.svg";
//     wrapper.style.height = "100%";
//   }
// }

// window.addEventListener("load", setResponsiveFrame);
// window.addEventListener("resize", setResponsiveFrame);

let prevScreenHeight = window.screen.height;
let prevScreenWidth = window.screen.width;

let prevInnerHeight = window.innerHeight;
let prevInnerWidth = window.innerWidth;

const targetEl = document.querySelector('.main-header-container');

function isElementVisible(el) {
  if (!el) return false;
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
}

function setRealVH() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  prevScreenHeight = window.screen.height;
  prevScreenWidth = window.screen.width;
  prevInnerHeight = window.innerHeight;
  prevInnerWidth = window.innerWidth;
}

function maybeSetRealVH() {
  if (!isElementVisible(targetEl)) return;

  const currScreenHeight = window.screen.height;
  const currScreenWidth = window.screen.width;
  const currInnerHeight = window.innerHeight;
  const currInnerWidth = window.innerWidth;

  const screenChanged =
    currScreenHeight !== prevScreenHeight || currScreenWidth !== prevScreenWidth;

  const innerChanged =
    Math.abs(currInnerHeight - prevInnerHeight) > 50 ||
    Math.abs(currInnerWidth - prevInnerWidth) > 50;

  if (screenChanged || innerChanged) {
    setRealVH();
  }
}

let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(maybeSetRealVH, 150);
});

window.addEventListener('load', () => {
  setRealVH();
  setTimeout(setRealVH, 100);
  setTimeout(setRealVH, 300);
});

window.addEventListener('scroll', () => {
  maybeSetRealVH()
});

window.addEventListener('orientationchange', () => {
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;

  setTimeout(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    setRealVH();
  }, 500);
});










// Page changer

function scrollToWrapperTopSmooth() {
  const wrapperTop = wrapper.getBoundingClientRect().top + window.pageYOffset;
  window.scrollTo({
    top: wrapperTop,
    behavior: 'smooth'
  });
}

  const wrapper = document.querySelector('.page-sections-wrapper');
const sections = document.querySelectorAll('.page-section');
const buttons = {
  about: document.querySelector('.about-btn'),
  tiba: document.querySelector('.tiba-btn'),
  clients: document.querySelector('.clients-btn'),
};

function updateWrapperHeight() {
  const activeSection = wrapper.querySelector('.page-section.active');
  if (activeSection) {
    wrapper.style.height = activeSection.scrollHeight + 'px';
  }
}

let isInitialLoad = true;

function showSection(sectionClass) {
  sections.forEach(sec => sec.classList.remove('active'));
  const next = document.querySelector(`.${sectionClass}-container`);
  next.classList.add('active');

  Object.values(buttons).forEach(btn => btn.classList.remove('active'));
  buttons[sectionClass].classList.add('active');

   setTimeout(() => {
      updateWrapperHeight();
  }, 100);

  if (!isInitialLoad) {
        scrollToWrapperTopSmooth();    
  }

  isInitialLoad = false;
}

window.addEventListener('load', updateWrapperHeight);
window.addEventListener('resize', updateWrapperHeight);

buttons.about.addEventListener('click', () => showSection('about'));
buttons.tiba.addEventListener('click', () => showSection('tiba'));
buttons.clients.addEventListener('click', () => showSection('clients'));

showSection('about');
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
    button.style.width = '';
    const startWidth = button.offsetWidth;
    p.innerHTML = newText;
    const endWidth = button.offsetWidth;
    p.innerHTML = originalHTML;

    button.style.width = startWidth + 'px';

    requestAnimationFrame(() => {
        p.innerHTML = newText;
        button.style.width = endWidth + 'px';
    });

    const clearWidth = () => {
        button.style.width = '';
        button.removeEventListener('transitionend', clearWidth);
        clearTimeout(fallbackTimeout);
    };

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

// function applyLandscapeStyles() {
//   const isLandscape = window.matchMedia("(orientation: landscape)").matches;
//   const isMobile = window.matchMedia("(pointer: coarse) and (hover: none)").matches;
//   const isSmallWidth = window.innerWidth <= 896;

//   if (isLandscape && isMobile && isSmallWidth) {
//     const style = document.createElement("style");
//     style.id = "landscape-style"; // чтобы не дублировать

//     style.textContent = `
//       .clients-container p, .about-container p, .tiba-container p {
//         font-size: 12px !important;
//       }
//       h1, h2 {
//         font-size: 20px !important;
//       }
//       .tiba-container h3 {
//         font-size: 14px !important;
//       }
//     `;

//     // Удаляем предыдущий стиль, если есть
//     document.getElementById("landscape-style")?.remove();
//     document.head.appendChild(style);
//   } else {
//     // Удаляем стиль, если условия больше не выполняются
//     document.getElementById("landscape-style")?.remove();
//   }
// }

// window.addEventListener("load", applyLandscapeStyles);
// window.addEventListener("resize", applyLandscapeStyles);
// window.addEventListener("orientationchange", applyLandscapeStyles);






