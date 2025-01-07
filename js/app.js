// ------------------------------------------------
// Project Name: Braxton - Personal Portfolio & Resume HTML Template
// Project Description: Show yourself brightly with Braxton - unique and creative portfolio and resume template!
// Tags: mix_design, resume, portfolio, personal page, cv, template, one page, responsive, html5, css3, creative, clean
// Version: 1.0.0
// Build Date: March 2024
// Last Update: March 2024
// This product is available exclusively on Themeforest
// Author: mix_design
// Author URI: https://themeforest.net/user/mix_design
// File name: app.js
// ------------------------------------------------

// ------------------------------------------------
// Table of Contents
// ------------------------------------------------
//
//  01. Loader & Loading Animation
//  02. Bootstrap Scroll Spy Plugin Settings
//  03. Lenis Scroll Plugin
//  04. Parallax
//  05. Scroll Animations
//  06. Smooth Scrolling
//  07. Swiper Slider
//  08. Contact Form
//  09. Modernizr SVG Fallback
//  10. Chrome Smooth Scroll
//  11. Images Moving Ban
//  12. Detecting Mobile/Desktop
//  13. PhotoSwipe Gallery Images Replace
//  14. Color Switch
//
// ------------------------------------------------
// Table of Contents End
// ------------------------------------------------

// 清除 localStorage 主題設定
localStorage.removeItem("template.theme");

function applyTheme() {
  // 偵測系統主題
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

  // 優先讀取 localStorage 中的主題
  const savedTheme = localStorage.getItem("template.theme") || systemTheme;

  // 將主題套用到 HTML 的 data-theme 屬性上
  document.documentElement.setAttribute("data-theme", savedTheme);
}

// 初始化主題
applyTheme();

// --------------------------------------------- //
// Loader & Loading Animation Start
// --------------------------------------------- //
$(window).on("load", function () {
  "use strict";

  const content = document.querySelector("body");
  const imgLoad = imagesLoaded(content);

  let imagesLoadedCompleted = false; // 標記圖片是否載入完成
  const TIMEOUT = 3000; // 超時設定為3秒

  // 定義進入頁面的函式
  function finishLoading() {
    console.log("進入頁面");
    $(".loader").fadeOut(500, function () {
      console.log("Loader 動畫完成");
      $(this).remove();
      $("#main").addClass("animate-in");
      $("#header").addClass("animate-in");

      // 初始化 GSAP 與 ScrollTrigger
      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.refresh();
    });
  }

  // 超時機制
  const timeout = setTimeout(() => {
    if (!imagesLoadedCompleted) {
      console.warn("圖片載入超時，直接進入頁面");
      finishLoading(); // 執行進入頁面邏輯
    }
  }, TIMEOUT);

  // 當所有圖片完成載入時
  imgLoad.on("done", function () {
    clearTimeout(timeout); // 清除超時計時器
    imagesLoadedCompleted = true;
    console.log("所有圖片載入完成");
    finishLoading(); // 執行進入頁面邏輯
  });
});

$(function () {
  "use strict";
  gsap.registerPlugin(ScrollTrigger);

  // --------------------------------------------- //
  // Loader & Loading Animation End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Bootstrap Scroll Spy Plugin Settings Start
  // --------------------------------------------- //
  const scrollSpy = new bootstrap.ScrollSpy(document.body, {
    target: "#menu",
    smoothScroll: true,
    rootMargin: "0px 0px -40%",
  });
  // --------------------------------------------- //
  // Bootstrap Scroll Spy Plugin Settings End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Lenis Scroll Plugin Start
  // --------------------------------------------- //
  const lenis = new Lenis();
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
  // --------------------------------------------- //
  // Lenis Scroll Plugin End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Scroll Animations Start 滾動動畫
  // --------------------------------------------- //
  // Animation In Up
  const animateInUp = document.querySelectorAll(".animate-in-up");
  animateInUp.forEach((element) => {
    gsap.fromTo(
      element,
      {
        opacity: 0,
        y: 50,
        ease: "sine",
      },
      {
        y: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: element,
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  // Animation Rotation
  const animateRotation = document.querySelectorAll(".animate-rotation");
  animateRotation.forEach((section) => {
    var value = $(section).data("value");
    gsap.fromTo(
      section,
      {
        ease: "sine",
        rotate: 0,
      },
      {
        rotate: value,
        scrollTrigger: {
          trigger: section,
          scrub: true,
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  // Animation Cards Stack
  // Grid 2x 2個一排時
  gsap.set(".animate-card-2", { y: 100, opacity: 0 });
  ScrollTrigger.batch(".animate-card-2", {
    interval: 0.1,
    batchMax: 2,
    duration: 6,
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        ease: "sine",
        stagger: { each: 0.15, grid: [1, 2] },
        overwrite: true,
      }),
    onLeave: (batch) => gsap.set(batch, { opacity: 1, y: 0, overwrite: true }),
    onEnterBack: (batch) =>
      gsap.to(batch, { opacity: 1, y: 0, stagger: 0.15, overwrite: true }),
    onLeaveBack: (batch) =>
      gsap.set(batch, { opacity: 0, y: 100, overwrite: true }),
  });

  // Grid 3x 3個一排時
  gsap.set(".animate-card-3", { y: 50, opacity: 0 });
  ScrollTrigger.batch(".animate-card-3", {
    interval: 0.1,
    batchMax: 3,
    duration: 3,
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        ease: "sine",
        stagger: { each: 0.15, grid: [1, 3] },
        overwrite: true,
      }),
    onLeave: (batch) => gsap.set(batch, { opacity: 1, y: 0, overwrite: true }),
    onEnterBack: (batch) =>
      gsap.to(batch, { opacity: 1, y: 0, stagger: 0.15, overwrite: true }),
    onLeaveBack: (batch) =>
      gsap.set(batch, { opacity: 0, y: 50, overwrite: true }),
  });

  // Grid 5x 5個一排時
  gsap.set(".animate-card-5", { y: 50, opacity: 0 });
  ScrollTrigger.batch(".animate-card-5", {
    interval: 0.1,
    batchMax: 5,
    delay: 1000,
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        ease: "sine",
        stagger: { each: 0.15, grid: [1, 5] },
        overwrite: true,
      }),
    onLeave: (batch) => gsap.set(batch, { opacity: 1, y: 0, overwrite: true }),
    onEnterBack: (batch) =>
      gsap.to(batch, { opacity: 1, y: 0, stagger: 0.15, overwrite: true }),
    onLeaveBack: (batch) =>
      gsap.set(batch, { opacity: 0, y: 50, overwrite: true }),
  });

  ScrollTrigger.addEventListener("refreshInit", () =>
    gsap.set(".animate-card-2", { y: 0, opacity: 1 })
  );
  ScrollTrigger.addEventListener("refreshInit", () =>
    gsap.set(".animate-card-3", { y: 0, opacity: 1 })
  );
  ScrollTrigger.addEventListener("refreshInit", () =>
    gsap.set(".animate-card-5", { y: 0, opacity: 1 })
  );
  // --------------------------------------------- //
  // Scroll Animations End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Smooth Scrolling Start
  // --------------------------------------------- //
  $('a[href*="#"]')
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function (event) {
      if (
        location.pathname.replace(/^\//, "") ==
          this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname
      ) {
        var target = $(this.hash);
        target = target.length
          ? target
          : $("[name=" + this.hash.slice(1) + "]");
        if (target.length) {
          event.preventDefault();
          $("html, body").animate(
            {
              scrollTop: target.offset().top,
            },
            1000,
            function () {
              var $target = $(target);
              $target.focus();
              if ($target.is(":focus")) {
                return false;
              } else {
                $target.attr("tabindex", "-1");
                $target.focus();
              }
            }
          );
        }
      }
    });
  // --------------------------------------------- //
  // Smooth Scrolling End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Buttons Hover Effect Start
  // --------------------------------------------- //
  $(
    ".hover-default, .hover-circle, .circle, .inner-video-trigger, .socials-cards__link"
  )
    .on("mouseenter", function (e) {
      var parentOffset = $(this).offset(),
        relX = e.pageX - parentOffset.left,
        relY = e.pageY - parentOffset.top;
      $(this).find("em").css({ top: relY, left: relX });
    })
    .on("mouseout", function (e) {
      var parentOffset = $(this).offset(),
        relX = e.pageX - parentOffset.left,
        relY = e.pageY - parentOffset.top;
      $(this).find("em").css({ top: relY, left: relX });
    });
  // --------------------------------------------- //
  // Buttons Hover Effect End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Swiper Slider Start
  // --------------------------------------------- //
  const toolsSlider = document.querySelector("tools-slider");
  const testimonialsSlider = document.querySelector("testimonials-slider");

  if (!toolsSlider) {
    const swiper = new Swiper(".swiper-tools", {
      spaceBetween: 20,
      autoplay: {
        delay: 1500,
        disableOnInteraction: false,
      },
      loop: true,
      grabCursor: true,
      loopFillGroupWithBlank: true,
      breakpoints: {
        1600: {
          slidesPerView: 5,
        },
        1200: {
          slidesPerView: 4,
        },
        768: {
          slidesPerView: 3,
        },
        576: {
          slidesPerView: 2,
        },
        0: {
          slidesPerView: 2,
        },
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  }

  if (!toolsSlider) {
    const swiper = new Swiper(".swiper-testimonials", {
      slidesPerView: 1,
      spaceBetween: 20,
      autoplay: true,
      speed: 1000,
      loop: true,
      loopFillGroupWithBlank: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }
  // --------------------------------------------- //
  // Swiper Slider Start
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Contact Form Start
  // --------------------------------------------- //
  $("#contact-form").submit(function () {
    //Change
    var th = $(this);
    $.ajax({
      type: "POST",
      url: "mail.php", //Change
      data: th.serialize(),
    }).done(function () {
      $(".contact").find(".form").addClass("is-hidden");
      $(".contact").find(".form__reply").addClass("is-visible");
      setTimeout(function () {
        // Done Functions
        $(".contact").find(".form__reply").removeClass("is-visible");
        $(".contact").find(".form").delay(300).removeClass("is-hidden");
        th.trigger("reset");
      }, 5000);
    });
    return false;
  });
  // --------------------------------------------- //
  // Contact Form End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Modernizr SVG Fallback Start
  // --------------------------------------------- //
  if (!Modernizr.svg) {
    $("img[src*='svg']").attr("src", function () {
      return $(this).attr("src").replace(".svg", ".png");
    });
  }
  // --------------------------------------------- //
  // Modernizr SVG Fallback End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Chrome Smooth Scroll Start
  // --------------------------------------------- //
  try {
    $.browserSelector();
    if ($("html").hasClass("chrome")) {
      $.smoothScroll();
    }
  } catch (err) {}
  // --------------------------------------------- //
  // Chrome Smooth Scroll End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Images Moving Ban Start
  // --------------------------------------------- //
  $("img, a").on("dragstart", function (event) {
    event.preventDefault();
  });
  // --------------------------------------------- //
  // Images Moving Ban End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Detecting Mobile/Desktop Start
  // --------------------------------------------- //
  var isMobile = false;
  if (
    /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    $("html").addClass("touch");
    isMobile = true;
  } else {
    $("html").addClass("no-touch");
    isMobile = false;
  }
  //IE, Edge
  var isIE =
    /MSIE 9/i.test(navigator.userAgent) ||
    /rv:11.0/i.test(navigator.userAgent) ||
    /MSIE 10/i.test(navigator.userAgent) ||
    /Edge\/\d+/.test(navigator.userAgent);
  // --------------------------------------------- //
  // Detecting Mobile/Desktop End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // PhotoSwipe Gallery Images Replace Start
  // --------------------------------------------- //
  $(".gallery__link").each(function () {
    $(this)
      .append('<div class="picture"></div>')
      .children(".picture")
      .css({
        "background-image": "url(" + $(this).find("img").attr("src") + ")",
      });
  });
  // --------------------------------------------- //
  // PhotoSwipe Gallery Images Replace End
  // --------------------------------------------- //
});

// --------------------------------------------- //
// Color Switch Start
// --------------------------------------------- //
const themeBtn = document.querySelector(".color-switcher");

function getCurrentTheme() {
  let theme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
  localStorage.getItem("template.theme")
    ? (theme = localStorage.getItem("template.theme"))
    : null;
  return theme;
}

function loadTheme(theme) {
  const root = document.querySelector(":root");
  if (theme === "light") {
    themeBtn.innerHTML = `<em></em><i class="ph-bold ph-moon-stars"></i>`;
  } else {
    themeBtn.innerHTML = `<em></em><i class="ph-bold ph-sun"></i>`;
  }
  root.setAttribute("color-scheme", `${theme}`);
}

themeBtn.addEventListener("click", () => {
  let theme = getCurrentTheme();
  if (theme === "dark") {
    theme = "light";
  } else {
    theme = "dark";
  }
  localStorage.setItem("template.theme", `${theme}`);
  loadTheme(theme);
});

window.addEventListener("DOMContentLoaded", () => {
  loadTheme(getCurrentTheme());
});
// --------------------------------------------- //
// Color Switch End
// --------------------------------------------- //

// --------------------------------------------- //
// 在彈窗內開啟其他彈窗 Start
// --------------------------------------------- //

$(".btn-circle-text").on("touchend click", function (e) {
  e.preventDefault(); // 防止預設的跳轉行為

  // 取得目標彈窗的 ID
  const targetPopup = $(this).attr("data-mfp-src");

  // 如果沒有指定目標彈窗
  if (!targetPopup) {
    console.error("未指定 data-mfp-src 屬性");
    return;
  }

  // 如果目標彈窗的內容不存在
  if ($(targetPopup).length === 0) {
    console.error(`目標彈窗內容未找到: ${targetPopup}`);
    return;
  }

  // 關閉當前彈窗
  $.magnificPopup.close();

  // 加一個短暫的延遲來避免插件衝突
  setTimeout(() => {
    $.magnificPopup.open({
      items: {
        src: targetPopup, // 指定目標內容
      },
      type: "inline", // 指定彈窗類型為內嵌內容
      midClick: true, // 支援中間點擊開啟
    });
  }, 300); // 延遲時間可以依實際需要調整
});

// --------------------------------------------- //
// 在彈窗內開啟其他彈窗 End
// --------------------------------------------- //

// --------------------------------------------- //
// 分享彈窗網址帶後綴 Start
// --------------------------------------------- //

// 獲取 URL 中的查詢參數
const urlParams = new URLSearchParams(window.location.search);
const popupId = urlParams.get("popup"); // 例如 portfolio-popup-1

// 如果存在指定的 popup ID，打開對應的彈窗
if (popupId) {
  $(document).ready(function () {
    const targetPopup = $(`#${popupId}`);
    if (targetPopup.length) {
      // 初始化 Magnific Popup 並打開彈窗
      $.magnificPopup.open({
        items: {
          src: `#${popupId}`, // 使用查詢參數中的 ID
        },
        type: "inline", // 指定彈窗類型
        midClick: true,
      });
    } else {
      console.error(`未找到對應的彈窗: #${popupId}`);
    }
  });
}

// --------------------------------------------- //
// 分享彈窗網址帶後綴 End
// --------------------------------------------- //
