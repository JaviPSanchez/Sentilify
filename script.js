"use strict";

const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");
const nav = document.querySelector(".nav");
const header = document.querySelector(".header");
const allSections = document.querySelectorAll(".section");
const imageTargets = document.querySelectorAll("img[data-src");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const slides = document.querySelectorAll(".slide");
const dotContainer = document.querySelector(".dots");

const modalBtns = document.querySelectorAll(".modal-open");
const closeBtns = document.querySelectorAll(".modal-close");

//////////////////////MODAL WINDOW SECONDARY/////////////////

modalBtns.forEach(function (btn) {
  btn.onclick = function () {
    const modal = btn.getAttribute("data-modal");
    document.getElementById(modal).style.display = "block";
    overlay.classList.remove("hidden");
  };
});

closeBtns.forEach(function (btn) {
  btn.onclick = function () {
    const modal = (btn.closest(".modal-s").style.display = "none");
    overlay.classList.add("hidden");
  };
});

window.onclick = function (e) {
  if (e.target.classList.contains("modal")) {
    e.target.style.display = "none";
  }
};

//////////////////////MODAL WINDOW PRINCIPAL/////////////////

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);

overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

///////////SMOOTH SCROWLING/////////////

// btnScrollTo.addEventListener("click", function (e) {
//   e.preventDefault();
//   section1.scrollIntoView({ behavior: "smooth" });
// });

///////////PAGE NAVIGATION/////////////

document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

///////////TABBED COMPONENT/////////////

tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");

  if (!clicked) return;
  tabs.forEach((eachTab) =>
    eachTab.classList.remove("operations__tab--active")
  );
  tabsContent.forEach((content) =>
    content.classList.remove("operations__content--active")
  );
  clicked.classList.add("operations__tab--active");

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

///////////////MENU FADE ANIMATION/////////////

const handleHover = function (event, opacity) {
  if (event.target.classList.contains("nav__link")) {
    const link = event.target;
    //Seleccionamos todos los SIBLINGS subiendo al PARENT ELEMENT
    const siblings = link.closest(".nav").querySelectorAll(".nav__link"); //Buscamos el nav__link
    const logo = link.closest(".nav").querySelector("img"); //Buscamos la img TAG

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

/////////////STICKY NAVIGATION///////////////

const stickyNav = function (entries) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};
const navHeight = nav.getBoundingClientRect().height;
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
  // rootMargin: '-50%',
});
headerObserver.observe(header);

//////////REVEAL SECTIONS////////////

const createSectionObserver = function () {
  const revealSection = function (entries, observer) {
    const [entry] = entries;
    if (entry.isIntersecting) {
      entry.target.classList.remove("section--hidden");
      observer.unobserve(entry.target);
    }
  };
  return new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
  });
};

allSections.forEach((section) => {
  section.classList.add("section--hidden");
  createSectionObserver().observe(section);
});

/////////////LAZY LOADING ////////////

const loadImg = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
  observer.unobserve(entry.target);
};
const imageObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});
imageTargets.forEach((img) => imageObserver.observe(img));

/////////////SLIDE BAR////////////
const slider = function () {
  let currentSlide = 0;
  const maxSlide = slides.length;
  //FUNCTIONS
  const createDots = function () {
    slides.forEach(function (slide, index) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${index}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (slide, index) =>
        (slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`)
    );
  };

  const nextSlide = function () {
    if (currentSlide === maxSlide - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };
  const previousSlide = function () {
    if (currentSlide === 0) {
      currentSlide = maxSlide - 1;
    } else {
      currentSlide--;
    }
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };
  const startTop = function () {
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };
  };
  const init = function () {
    startTop();
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  //EVENT HANDLERS

  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", previousSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") previousSlide();
    //Podemos hacer lo mismo con el right botton pero usando SHORT CIRCUITING:
    e.key === "ArrowRight" && nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      currentSlide = +e.target.dataset.slide;
      goToSlide(currentSlide);
      activateDot(currentSlide);
    }
  });
};
slider();
