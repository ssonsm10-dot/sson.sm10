/* =========================================================
   Portfolio — main.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  initSmoothScroll();
  initMobileMenu();
  initAnchorNavigation();
  initProfileDeepLink();

  initRevealAnimations();
  initLocalTime();
  initHeaderBehavior();

  initHeroTitleParallax();
  initLocationGlobe();

  initAboutAnimation();
  initProfileAnimation();
  initWorkReveal();

  initContactCurve();
  initGetInTouchButton();

  initContactPageTransition();
  initContactPageReveal();

  initProjectDetail();
});

/* =========================================================
   SMOOTH SCROLL — LENIS
   ========================================================= */

let lenis = null;

function initSmoothScroll() {

  if (typeof Lenis === "undefined") return;

  if (prefersReducedMotion()) return;


  lenis = new Lenis({

    duration: 1.15,

    easing: (t) =>
      Math.min(
        1,
        1.001 - Math.pow(2, -10 * t)
      ),

    smoothWheel: true,

    wheelMultiplier: 0.9,

    touchMultiplier: 1
  });


  function raf(time) {

    lenis.raf(time);

    requestAnimationFrame(raf);

  }


  requestAnimationFrame(raf);

}
/* =========================================================
   1. MOBILE MENU
   ========================================================= */

function initMobileMenu() {
  const menuButton = document.querySelector(".menu-button");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (!menuButton || !mobileMenu) return;

  const mobileLinks = mobileMenu.querySelectorAll("a");

  const openMenu = () => {
    document.body.classList.add("menu-open");

    menuButton.setAttribute(
      "aria-expanded",
      "true"
    );

    menuButton.setAttribute(
      "aria-label",
      "Close menu"
    );
  };


  const closeMenu = () => {
    document.body.classList.remove("menu-open");

    menuButton.setAttribute(
      "aria-expanded",
      "false"
    );

    menuButton.setAttribute(
      "aria-label",
      "Open menu"
    );
  };


  menuButton.addEventListener("click", () => {
    const isOpen =
      document.body.classList.contains(
        "menu-open"
      );

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });


  mobileLinks.forEach((link) => {
    link.addEventListener(
      "click",
      closeMenu
    );
  });


  document.addEventListener(
    "keydown",
    (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    }
  );


  window.addEventListener(
    "resize",
    () => {
      if (window.innerWidth > 760) {
        closeMenu();
      }
    }
  );
}


/* =========================================================
   2. INTERNAL ANCHOR NAVIGATION
   ========================================================= */

function initAnchorNavigation() {
  const links =
    document.querySelectorAll(
      'a[href^="#"]'
    );


  links.forEach((link) => {
    link.addEventListener(
      "click",
      (event) => {
        const href =
          link.getAttribute("href");


        if (
          !href ||
          href === "#"
        ) {
          return;
        }


        const target =
          document.querySelector(href);


        if (!target) return;


        event.preventDefault();


        /* -----------------------------------------
           ABOUT
           Profile 중앙
        ----------------------------------------- */

        if (href === "#profile") {
          target.scrollIntoView({
            behavior:
              prefersReducedMotion()
                ? "auto"
                : "smooth",

            block: "center"
          });

          return;
        }


        /* -----------------------------------------
           PROJECTS
           Projects 시작점
        ----------------------------------------- */

        if (href === "#work") {
          target.scrollIntoView({
            behavior:
              prefersReducedMotion()
                ? "auto"
                : "smooth",

            block: "start"
          });

          return;
        }


        /* -----------------------------------------
           CONTACT
           Contact 핵심 문구 중앙
        ----------------------------------------- */

        if (href === "#contact") {
          const contactTop =
            document.querySelector(
              ".contact-top"
            );


          if (contactTop) {
            contactTop.scrollIntoView({
              behavior:
                prefersReducedMotion()
                  ? "auto"
                  : "smooth",

              block: "center"
            });
          }

          return;
        }


        /* -----------------------------------------
           OTHER
        ----------------------------------------- */

        target.scrollIntoView({
          behavior:
            prefersReducedMotion()
              ? "auto"
              : "smooth",

          block: "start"
        });
      }
    );
  });
}


/* =========================================================
   2-1. PROFILE DEEP LINK
   Contact 페이지 → index.html#profile
   ========================================================= */

function initProfileDeepLink() {
  if (
    window.location.hash !== "#profile"
  ) {
    return;
  }


  const profile =
    document.querySelector("#profile");


  if (!profile) return;


  const alignProfile = () => {
    profile.scrollIntoView({
      behavior: "auto",
      block: "center"
    });
  };


  /*
    브라우저의 기본 hash 이동이 끝난 뒤
    Profile을 다시 중앙으로 보정
  */

  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(
      alignProfile
    );
  });


  /*
    이미지 / 폰트 로딩 후 높이가 달라질 경우
    한 번 더 위치 보정
  */

  window.addEventListener(
    "load",
    alignProfile,
    {
      once: true
    }
  );
}


/* =========================================================
   3. GENERAL SCROLL REVEAL
   ========================================================= */
/* =========================================================
   GENERAL REPLAY REVEAL
   How I work / Contact / Footer
   위·아래 어느 방향으로 진입해도 다시 재생
   ========================================================= */

function initRevealAnimations() {

  const targets =
    document.querySelectorAll(
      [
        /* ABOUT */
        ".about-copy h2",
        ".about-copy .body-copy",
        ".round-link",

        /* HOW I WORK */
        ".skills-heading",
        ".skill-row",

        /* CONTACT */
        ".contact-top",
        ".contact-actions",

        /* FOOTER */
        ".site-footer"
      ].join(",")
    );


  if (!targets.length) return;


  /* -----------------------------------------
     모션 감소 설정
     ----------------------------------------- */

  if (prefersReducedMotion()) {

    targets.forEach((element) => {

      element.classList.add(
        "page-reveal",
        "page-reveal-visible"
      );

    });

    return;
  }


  /* -----------------------------------------
     초기 상태
     ----------------------------------------- */

  targets.forEach((element) => {

    element.classList.add(
      "page-reveal"
    );

  });


  /* -----------------------------------------
     화면 진입 / 이탈
     ----------------------------------------- */

  const observer =
    new IntersectionObserver(

      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              "page-reveal-visible"
            );

          } else {

            /*
              화면 밖으로 완전히 빠지면 초기화.
              다시 위/아래 어느 방향에서 들어와도
              애니메이션이 다시 실행됨.
            */

            entry.target.classList.remove(
              "page-reveal-visible"
            );

          }

        });

      },

      {
        threshold: 0.08,

        /*
          위쪽과 아래쪽 모두 조금 안쪽을
          trigger 영역으로 사용
        */
        rootMargin:
          "-5% 0px -5% 0px"
      }

    );


  targets.forEach((element) => {

    observer.observe(element);

  });

}

/* =========================================================
   4. SEOUL LOCAL TIME
   ========================================================= */

function initLocalTime() {
  const timeElement =
    document.querySelector(
      "#local-time"
    );


  if (!timeElement) return;


  const updateTime = () => {
    const now = new Date();


    const formatter =
      new Intl.DateTimeFormat(
        "en-GB",
        {
          timeZone: "Asia/Seoul",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false
        }
      );


    timeElement.textContent =
      `${formatter.format(now)} KST`;
  };


  updateTime();


  window.setInterval(
    updateTime,
    1000
  );
}


/* =========================================================
   5. CUSTOM CURSOR
   현재 호출하지 않음
   ========================================================= */

function initCustomCursor() {
  const cursor =
    document.querySelector(
      ".custom-cursor"
    );


  if (!cursor) return;


  const canHover =
    window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;


  if (
    !canHover ||
    prefersReducedMotion()
  ) {
    return;
  }


  cursor.style.display = "block";


  let mouseX = -100;
  let mouseY = -100;

  let currentX = -100;
  let currentY = -100;


  document.addEventListener(
    "mousemove",
    (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    }
  );


  const animateCursor = () => {
    currentX +=
      (mouseX - currentX) * 0.18;

    currentY +=
      (mouseY - currentY) * 0.18;


    cursor.style.left =
      `${currentX}px`;

    cursor.style.top =
      `${currentY}px`;


    requestAnimationFrame(
      animateCursor
    );
  };


  animateCursor();


  const interactiveElements =
    document.querySelectorAll(
      "a, button, .project"
    );


  interactiveElements.forEach(
    (element) => {
      element.addEventListener(
        "mouseenter",
        () => {
          cursor.style.width =
            "34px";

          cursor.style.height =
            "34px";

          cursor.style.opacity =
            "0.18";
        }
      );


      element.addEventListener(
        "mouseleave",
        () => {
          cursor.style.width =
            "12px";

          cursor.style.height =
            "12px";

          cursor.style.opacity =
            "1";
        }
      );
    }
  );


  document.addEventListener(
    "mouseleave",
    () => {
      cursor.style.opacity = "0";
    }
  );


  document.addEventListener(
    "mouseenter",
    () => {
      cursor.style.opacity = "1";
    }
  );
}


/* =========================================================
   6. HEADER BEHAVIOR
   ========================================================= */

function initHeaderBehavior() {
  const header =
    document.querySelector(
      ".site-header"
    );


  if (!header) return;


  let lastScrollY =
    window.scrollY;

  let ticking = false;


  header.style.transition =
    "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)";


  const updateHeader = () => {
    const currentScrollY =
      window.scrollY;


    const menuIsOpen =
      document.body.classList.contains(
        "menu-open"
      );


    if (
      menuIsOpen ||
      currentScrollY < 80
    ) {
      header.style.transform =
        "translateY(0)";

      lastScrollY =
        currentScrollY;

      ticking = false;

      return;
    }


    const delta =
      currentScrollY -
      lastScrollY;


    if (Math.abs(delta) > 5) {
      if (delta > 0) {
        header.style.transform =
          "translateY(-110%)";
      } else {
        header.style.transform =
          "translateY(0)";
      }


      lastScrollY =
        currentScrollY;
    }


    ticking = false;
  };


  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(
          updateHeader
        );

        ticking = true;
      }
    },
    {
      passive: true
    }
  );
}


/* =========================================================
   7. HELPER
   ========================================================= */

function prefersReducedMotion() {
  return window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
}


/* =========================================================
   HERO TITLE PARALLAX
   ========================================================= */

function initHeroTitleParallax() {
  const heroTitleWrap =
    document.querySelector(
      ".hero-title-wrap"
    );

  const heroLocation =
    document.querySelector(
      ".hero-location"
    );

  const heroScroll =
    document.querySelector(
      ".hero-scroll"
    );

  const heroSection =
    document.querySelector(
      ".hero-section"
    );


  if (
    !heroTitleWrap ||
    !heroLocation ||
    !heroScroll ||
    !heroSection
  ) {
    return;
  }


  let targetY = 0;
  let currentY = 0;


  const updateTarget = () => {
    const scrollY =
      window.scrollY;

    const heroHeight =
      heroSection.offsetHeight;


    if (scrollY <= heroHeight) {
      targetY = Math.min(
        scrollY * 0.28,
        180
      );
    } else {
      targetY = 180;
    }
  };


  const animate = () => {
    currentY +=
      (targetY - currentY) *
      0.08;


    heroTitleWrap.style.transform =
      `translateY(-${currentY}px)`;


    heroLocation.style.transform =
      `translateY(-${currentY}px)`;


    heroScroll.style.transform =
      `translateY(-${currentY}px)`;


    requestAnimationFrame(
      animate
    );
  };


  window.addEventListener(
    "scroll",
    updateTarget,
    {
      passive: true
    }
  );


  updateTarget();
  animate();
}


/* =========================================================
   ROTATING LOCATION GLOBE
   ========================================================= */

function initLocationGlobe() {
  const canvas =
    document.getElementById(
      "location-globe-canvas"
    );


  if (!canvas) return;


  const ctx =
    canvas.getContext("2d");


  const width =
    canvas.width;

  const height =
    canvas.height;


  const centerX =
    width / 2;

  const centerY =
    height / 2;


  const radius = 29;

  let rotation = 0;


  function drawEllipse(
    x,
    y,
    radiusX,
    radiusY,
    lineWidth = 2,
    opacity = 1
  ) {
    ctx.beginPath();


    ctx.ellipse(
      x,
      y,
      radiusX,
      radiusY,
      0,
      0,
      Math.PI * 2
    );


    ctx.strokeStyle =
      `rgba(255,255,255,${opacity})`;


    ctx.lineWidth =
      lineWidth;


    ctx.stroke();
  }


  function drawOuterSphere() {
    ctx.beginPath();


    ctx.arc(
      centerX,
      centerY,
      radius,
      0,
      Math.PI * 2
    );


    ctx.strokeStyle =
      "#ffffff";


    ctx.lineWidth =
      2.6;


    ctx.stroke();
  }


  function drawLatitudes() {
    drawEllipse(
      centerX,
      centerY - 10,
      25,
      5,
      3.5,
      0.95
    );


    drawEllipse(
      centerX,
      centerY,
      28,
      5.5,
      3.5,
      0.95
    );


    drawEllipse(
      centerX,
      centerY + 10,
      25,
      5,
      3.5,
      0.95
    );
  }


  function drawLongitudes() {
    const phases = [
      0,
      Math.PI / 2
    ];


    phases.forEach((phase) => {
      const wave =
        Math.abs(
          Math.cos(
            rotation + phase
          )
        );


      const radiusX =
        3 + wave * 15;


      drawEllipse(
        centerX,
        centerY,
        radiusX,
        27.5,
        3.5,
        0.95
      );
    });
  }


  function draw() {
    ctx.clearRect(
      0,
      0,
      width,
      height
    );


    drawLatitudes();
    drawLongitudes();
    drawOuterSphere();


    rotation += 0.012;


    requestAnimationFrame(draw);
  }


  draw();
}


/* =========================================================
   ABOUT SECTION ANIMATION
   ========================================================= */

function initAboutAnimation() {
  const aboutSection =
    document.querySelector(
      ".about-section"
    );


  const aboutButton =
    document.querySelector(
      ".about-button-wrap"
    );


  const nodes =
    document.querySelectorAll(
      ".bridge-node"
    );


  if (
    !aboutSection ||
    !aboutButton
  ) {
    return;
  }


  /* -----------------------------------------
     ENTER / EXIT
  ----------------------------------------- */

  const observer =
    new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            aboutSection.classList.add(
              "about-inview"
            );
          } else {
            aboutSection.classList.remove(
              "about-inview"
            );
          }
        });
      },
      {
        threshold: 0.22
      }
    );


  observer.observe(
    aboutSection
  );


  /* -----------------------------------------
     PARALLAX
  ----------------------------------------- */

  let targetProgress = 0;
  let currentProgress = 0;


  function updateTarget() {
    const rect =
      aboutSection.getBoundingClientRect();


    const windowHeight =
      window.innerHeight;


    targetProgress =
      (
        windowHeight * 0.5 -
        (
          rect.top +
          rect.height * 0.5
        )
      ) /
      windowHeight;


    targetProgress =
      Math.max(
        -1,
        Math.min(
          1,
          targetProgress
        )
      );
  }


  function animate() {
    currentProgress +=
      (
        targetProgress -
        currentProgress
      ) * 0.06;


    const buttonY =
      currentProgress * -40;


    aboutButton.style.transform =
      `translate3d(
        0,
        ${buttonY}px,
        0
      )`;


    nodes.forEach(
      (node, index) => {
        const speeds = [
          14,
          24,
          38
        ];


        const speed =
          speeds[index] ??
          speeds[
            speeds.length - 1
          ];


        const moveY =
          currentProgress *
          -speed;


        const moveX =
          currentProgress *
          speed *
          0.15;


        node.style.transform =
          `translate3d(
            ${moveX}px,
            ${moveY}px,
            0
          )`;
      }
    );


    requestAnimationFrame(
      animate
    );
  }


  window.addEventListener(
    "scroll",
    updateTarget,
    {
      passive: true
    }
  );


  window.addEventListener(
    "resize",
    updateTarget
  );


  updateTarget();
  animate();
}

/* =========================================================
   PROFILE — BIDIRECTIONAL SCROLL ANIMATION
   ========================================================= */

/* =========================================================
   PROFILE — REPLAY SCROLL ANIMATION
   ========================================================= */

function initProfileAnimation() {

  const section =
    document.querySelector("#profile");

  if (!section) return;


  section.classList.add(
    "profile-animation-ready"
  );


  if (prefersReducedMotion()) {

    section.classList.add(
      "profile-is-visible"
    );

    return;
  }


  const observer =
    new IntersectionObserver(

      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            section.classList.add(
              "profile-is-visible"
            );

          } else {

            section.classList.remove(
              "profile-is-visible"
            );

          }

        });

      },

      {
        threshold: 0.08,
        rootMargin: "0px 0px -5% 0px"
      }

    );


  observer.observe(section);

}

/* =========================================================
   PROJECT LIST — ONE TIME REVEAL
   ========================================================= */

/* =========================================================
   PROJECTS — ONE TIME SCROLL ANIMATION
   ========================================================= */

/* =========================================================
   PROJECTS — BIDIRECTIONAL SCROLL ANIMATION
   ========================================================= */

/* =========================================================
   PROJECTS — REPLAY SCROLL ANIMATION
   ========================================================= */

function initWorkReveal() {

  const heading =
    document.querySelector(".work-heading");

  const cards =
    document.querySelectorAll(".work-card");


  if (
    !heading ||
    !cards.length
  ) return;


  const items = [
    heading,
    ...cards
  ];


  items.forEach((item) => {

    item.classList.add(
      "work-animation-ready"
    );

  });


  if (prefersReducedMotion()) {

    items.forEach((item) => {

      item.classList.add(
        "work-is-visible"
      );

    });

    return;
  }


  const observer =
    new IntersectionObserver(

      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              "work-is-visible"
            );

          } else {

            entry.target.classList.remove(
              "work-is-visible"
            );

          }

        });

      },

      {
        threshold: 0.1,
        rootMargin: "0px 0px -5% 0px"
      }

    );


  items.forEach((item) => {

    observer.observe(item);

  });

}


/* =========================================================
   CONTACT CURVE
   ========================================================= */

function initContactCurve() {
  const contact =
    document.querySelector(
      ".contact-section"
    );


  const svg =
    document.querySelector(
      ".contact-curve"
    );


  const path =
    document.querySelector(
      ".contact-curve-path"
    );


  if (
    !contact ||
    !svg ||
    !path
  ) {
    return;
  }


  if (
    prefersReducedMotion()
  ) {
    return;
  }


  let target = 0;
  let current = 0;


  function updateTarget() {
    const rect =
      contact.getBoundingClientRect();


    const vh =
      window.innerHeight;


    let progress =
      (vh - rect.top) /
      (vh * 0.7);


    target =
      Math.max(
        0,
        Math.min(
          1,
          progress
        )
      );
  }


  function animate() {
    current +=
      (
        target -
        current
      ) * 0.055;


    const depth =
      190 -
      current * 120;


    const edge =
      40 -
      current * 18;


    path.setAttribute(
      "d",
      `
        M0,0
        L1000,0
        L1000,${edge}
        Q500,${depth} 0,${edge}
        Z
      `
    );


    const y =
      current * -55;


    svg.style.transform =
      `translate3d(
        0,
        ${y}px,
        0
      )`;


    requestAnimationFrame(
      animate
    );
  }


  window.addEventListener(
    "scroll",
    updateTarget,
    {
      passive: true
    }
  );


  window.addEventListener(
    "resize",
    updateTarget
  );


  updateTarget();
  animate();
}


/* =========================================================
   GET IN TOUCH — MAGNETIC BUTTON
   ========================================================= */

function initGetInTouchButton() {
  const wrap =
    document.querySelector(
      ".get-in-touch-wrap"
    );


  const button =
    document.querySelector(
      ".get-in-touch-button"
    );


  if (
    !wrap ||
    !button
  ) {
    return;
  }


  const canHover =
    window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;


  if (
    !canHover ||
    prefersReducedMotion()
  ) {
    return;
  }


  let targetX = 0;
  let targetY = 0;

  let currentX = 0;
  let currentY = 0;

  let targetScale = 1;
  let currentScale = 1;


  wrap.addEventListener(
    "mousemove",
    (event) => {
      const rect =
        wrap.getBoundingClientRect();


      const x =
        event.clientX -
        (
          rect.left +
          rect.width / 2
        );


      const y =
        event.clientY -
        (
          rect.top +
          rect.height / 2
        );


      targetX =
        x * 0.18;

      targetY =
        y * 0.18;


      targetScale =
        1.06;
    }
  );


  wrap.addEventListener(
    "mouseleave",
    () => {
      targetX = 0;
      targetY = 0;

      targetScale = 1;
    }
  );


  function animate() {
    currentX +=
      (
        targetX -
        currentX
      ) * 0.09;


    currentY +=
      (
        targetY -
        currentY
      ) * 0.09;


    currentScale +=
      (
        targetScale -
        currentScale
      ) * 0.09;


    button.style.transform =
      `
        translate3d(
          ${currentX}px,
          ${currentY}px,
          0
        )
        scale(${currentScale})
      `;


    requestAnimationFrame(
      animate
    );
  }


  animate();
}


/* =========================================================
   CONTACT PAGE TRANSITION
   ========================================================= */

function initContactPageTransition() {
  const links =
    document.querySelectorAll(
      ".js-contact-link"
    );


  if (!links.length) return;


  const transition =
    document.createElement(
      "div"
    );


  transition.className =
    "page-transition";


  transition.innerHTML = `
    <div class="page-transition-inner">

      <span class="page-transition-dot"></span>

      <span class="page-transition-text">
        Contact
      </span>

      <span
        class="page-transition-loader"
        aria-hidden="true"
      ></span>

    </div>
  `;


  document.body.appendChild(
    transition
  );


  /*
    뒤로가기로 메인 페이지로 돌아왔을 때
    검은 transition 화면 제거
  */

  window.addEventListener(
    "pageshow",
    () => {
      transition.classList.remove(
        "is-active"
      );
    }
  );


  links.forEach((link) => {
    link.addEventListener(
      "click",
      (event) => {
        if (
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        ) {
          return;
        }


        event.preventDefault();


        const target =
          link.getAttribute(
            "href"
          );


        if (!target) return;


        transition.classList.add(
          "is-active"
        );


        window.setTimeout(
          () => {
            window.location.href =
              target;
          },
          850
        );
      }
    );
  });
}


/* =========================================================
   CONTACT PAGE ENTER
   ========================================================= */

function initContactPageReveal() {
  const body =
    document.querySelector(
      ".contact-page-body"
    );


  if (!body) return;


  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      body.classList.add(
        "contact-page-ready"
      );
    });
  });
}


/* =========================================================
   8. PROJECT DETAIL PAGE
   ========================================================= */

function initProjectDetail() {
  const page =
    document.querySelector(
      ".project-page"
    );


  if (!page) return;


  initDetailProgressBar();
  initDetailReveal();
}


/* =========================================================
   8-1. READING PROGRESS BAR
   ========================================================= */

function initDetailProgressBar() {
  const header =
    document.querySelector(
      ".detail-header"
    );


  if (
    !header ||
    prefersReducedMotion()
  ) {
    return;
  }


  const bar =
    document.createElement(
      "span"
    );


  bar.className =
    "detail-progress";


  bar.setAttribute(
    "aria-hidden",
    "true"
  );


  header.appendChild(bar);


  let ticking = false;


  const update = () => {
    const doc =
      document.documentElement;


    const max =
      doc.scrollHeight -
      window.innerHeight;


    const ratio =
      max > 0
        ? window.scrollY / max
        : 0;


    const clamped =
      Math.min(
        1,
        Math.max(
          0,
          ratio
        )
      );


    bar.style.transform =
      `scaleX(${clamped})`;


    ticking = false;
  };


  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(
          update
        );

        ticking = true;
      }
    },
    {
      passive: true
    }
  );


  window.addEventListener(
    "resize",
    update
  );


  update();
}


/* =========================================================
   8-2. PROJECT DETAIL — REPLAY SCROLL REVEAL
   Project 01 ~ 05 공통
   ========================================================= */

function initDetailReveal() {

  const page =
    document.querySelector(".project-page");

  if (!page) return;


  /* =======================================================
     1. HERO
     페이지 진입 시 한 번 재생
     ======================================================= */

  const heroTargets =
    Array.from(
      document.querySelectorAll(
        [
          ".detail-hero .detail-kicker",
          ".detail-hero .detail-title",
          ".detail-hero .detail-subtitle",
          ".detail-hero .detail-lead-text"
        ].join(",")
      )
    );


  const factItems =
    Array.from(
      document.querySelectorAll(
        ".detail-facts .detail-fact"
      )
    );


  /* =======================================================
     2. 여러 요소가 연속된 영역
     각 아이템을 약간의 시간차로 등장
     ======================================================= */

  const groupConfigs = [

    /* 업무 흐름 */
    {
      root: ".flow",
      item: ":scope > *",
      step: 45
    },

    /* 대표 지표 */
    {
      root: ".metric-band",
      item: ":scope > .metric",
      step: 90
    },

    /* 요약 카드 */
    {
      root: ".detail-summary",
      item: ":scope > .summary-card",
      step: 80
    },

    /* 문제 → 해결 */
    {
      root: ".map-list",
      item: ":scope > .map-row",
      step: 65
    },

    /* 좌우 기능 블록 */
    {
      root: ".feature",
      item:
        ":scope > .feature-body, :scope > .feature-figure",
      step: 100
    },

    /* Before / After */
    {
      root: ".flow-compare",
      item: ":scope > .flow-track",
      step: 110
    },

    /* 기본 갤러리 */
    {
      root: ".detail-gallery",
      item: ":scope > .detail-gallery-image",
      step: 90
    },

    /* TAM / SAM / SOM */
    {
      root: ".funnel",
      item: ":scope > .funnel-row",
      step: 55
    },

    /* 5점 척도 */
    {
      root: ".scale-group",
      item: ":scope > .scale-item",
      step: 80
    },

    /* 막대 목록 */
    {
      root: ".barlist",
      item: ":scope > .barlist-row",
      step: 45
    },

    /* 도메인 카드 */
    {
      root: ".domain-grid",
      item: ":scope > .domain-item",
      step: 40
    },

    /* 가설 / 시나리오 목록 */
    {
      root: ".spec-list",
      item: ":scope > .spec-row",
      step: 50
    }
  ];


  /* =======================================================
     HELPERS
     ======================================================= */

  const unique = (elements) =>
    Array.from(
      new Set(
        elements.filter(Boolean)
      )
    );


  const prepare = (
    elements,
    step = 0,
    base = 0
  ) => {

    elements.forEach(
      (element, index) => {

        element.classList.add(
          "detail-reveal"
        );


        element.style.setProperty(
          "--detail-reveal-delay",
          `${
            base +
            index * step
          }ms`
        );

      }
    );

  };


  const show = (elements) => {

    elements.forEach((element) => {

      element.classList.add(
        "detail-reveal-visible"
      );

    });

  };


  const hide = (elements) => {

    elements.forEach((element) => {

      element.classList.remove(
        "detail-reveal-visible"
      );

    });

  };


  /* =======================================================
     3. GROUP 수집
     ======================================================= */

  const groupEntries = [];

  const groupRoots =
    new Set();


  /*
    detail-copy / subsection 바로 아래에 있는 그룹만
    내부 아이템을 stagger 처리.

    figure 안쪽처럼 깊게 들어간 커스텀 구조는
    figure 전체를 하나의 블록으로 띄운다.
  */

  const isTopLevelGroup = (root) => {

    const parent =
      root.parentElement;


    if (!parent) return false;


    return parent.matches(
      ".detail-copy, .subsection, .feature"
    );

  };


  groupConfigs.forEach((config) => {

    document
      .querySelectorAll(config.root)
      .forEach((root) => {

        /*
          Before / After 안쪽의 .flow는
          .flow-track 자체에서 처리
        */

        if (
          config.root === ".flow" &&
          root.closest(".flow-track")
        ) {
          return;
        }


        /*
          너무 깊은 곳의 그룹은
          부모 블록 전체를 애니메이션
        */

        if (!isTopLevelGroup(root)) {
          return;
        }


        const items =
          Array.from(
            root.querySelectorAll(
              config.item
            )
          );


        if (!items.length) return;


        groupRoots.add(root);


        groupEntries.push({
          root,
          items,
          step: config.step
        });

      });

  });


  /* =======================================================
     4. SOLO TARGETS
     최근 추가한 Project 03~05 커스텀 요소도
     자동으로 포함됨
     ======================================================= */

  const soloCandidates =
    Array.from(
      document.querySelectorAll(
        [
          ".detail-visual > .detail-figure",

          /* 각 챕터의 바로 아래 요소 */
          ".detail-copy > *",

          /* 001 / 002 등의 하위 챕터 */
          ".subsection > *",

          /* 마지막 다음 프로젝트 */
          ".next-project-label",
          ".next-project-link"
        ].join(",")
      )
    );


  const soloTargets =
    unique(
      soloCandidates.filter((element) => {

        /*
          subsection은 껍데기이므로
          내부 요소를 각각 움직임
        */

        if (
          element.matches(".subsection")
        ) {
          return false;
        }


        /*
          stagger 그룹 자체에는
          reveal을 중복 적용하지 않음
        */

        if (
          groupRoots.has(element)
        ) {
          return false;
        }


        /*
          HERO / FACT 중복 방지
        */

        if (
          heroTargets.includes(element) ||
          factItems.includes(element)
        ) {
          return false;
        }


        return true;

      })
    );


  /* =======================================================
     REDUCED MOTION
     ======================================================= */

  if (prefersReducedMotion()) {

    const allTargets = [
      ...heroTargets,
      ...factItems,
      ...soloTargets
    ];


    groupEntries.forEach(
      ({ items }) => {

        allTargets.push(...items);

      }
    );


    unique(allTargets).forEach(
      (element) => {

        element.classList.add(
          "detail-reveal",
          "detail-reveal-visible"
        );

      }
    );


    return;
  }


  /* =======================================================
     5. HERO
     처음 페이지를 열었을 때 한 번
     ======================================================= */

  prepare(
    heroTargets,
    100,
    60
  );


  prepare(
    factItems,
    55,
    430
  );


  window.requestAnimationFrame(() => {

    window.requestAnimationFrame(() => {

      show(heroTargets);
      show(factItems);

    });

  });


  /* =======================================================
     6. SOLO
     ======================================================= */

  prepare(
    soloTargets,
    0
  );


  const soloObserver =
    new IntersectionObserver(

      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              "detail-reveal-visible"
            );

          } else {

            /*
              화면 밖으로 빠지면 초기화.
              다시 들어올 때 재생.
            */

            entry.target.classList.remove(
              "detail-reveal-visible"
            );

          }

        });

      },

      {
        threshold: 0.01,

        /*
          화면 아래쪽 약 8% 안으로 들어왔을 때
          애니메이션 시작
        */

        rootMargin:
          "0px 0px -8% 0px"
      }

    );


  soloTargets.forEach((element) => {

    soloObserver.observe(element);

  });


  /* =======================================================
     7. GROUPS
     ======================================================= */

  groupEntries.forEach(
    ({ items, step }) => {

      prepare(
        items,
        step
      );

    }
  );


  const groupObserver =
    new IntersectionObserver(

      (entries) => {

        entries.forEach((entry) => {

          const items =
            entry.target.__detailRevealItems ||
            [];


          if (entry.isIntersecting) {

            show(items);

          } else {

            hide(items);

          }

        });

      },

      {
        threshold: 0.01,
        rootMargin:
          "0px 0px -8% 0px"
      }

    );


  groupEntries.forEach(
    ({ root, items }) => {

      root.__detailRevealItems =
        items;


      groupObserver.observe(root);

    }
  );

}