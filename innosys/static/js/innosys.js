/* =========================================
   GLOBAL JAVASCRIPT (OOP) – IT CONSULTING COMPANY
   ========================================= */

(function ($) {
  "use strict";

  class GlobalApp {
    constructor() {
      this.apiBase = "/api/v1/";
      this.scrollOffset = 80;
      this.init();
    }

    /* ===============================
       INITIALIZATION
       =============================== */
    init() {
      this.initSmoothScroll();
      this.initRevealAnimations();
      this.initAjaxForms();
      this.initBackToTop();
      this.initLazyLoad();
      this.logPerformance();
    }

    /* ===============================
       SMOOTH SCROLL
       =============================== */
    initSmoothScroll() {
      $('a[href*="#"]').on("click", (e) => {
        const target = $(e.currentTarget.hash);
        if (target.length) {
          e.preventDefault();
          $("html, body").animate(
            { scrollTop: target.offset().top - this.scrollOffset },
            600,
            "swing"
          );
        }
      });
    }

    /* ===============================
       SCROLL REVEAL ANIMATIONS
       =============================== */
    initRevealAnimations() {
      const revealElements = $(".reveal, .fade-in, .slide-up");

      const reveal = () => {
        const windowHeight = $(window).height();
        const scrollTop = $(window).scrollTop();

        revealElements.each(function () {
          const $el = $(this);
          if ($el.offset().top < scrollTop + windowHeight - 120) {
            $el.addClass("visible active");
          }
        });
      };

      $(window).on("scroll resize", reveal);
      reveal();
    }

    /* ===============================
       AJAX FORMS (JSON API)
       =============================== */
    initAjaxForms() {
      $("form[data-ajax='true']").on("submit", (e) => {
        e.preventDefault();
        const $form = $(e.currentTarget);
        const $button = $form.find('button[type="submit"]');
        const formData = new FormData($form[0]);

        $button.prop("disabled", true).text("Sending...");

        $.ajax({
          url: $form.attr("action") || `${this.apiBase}form/submit/`,
          method: $form.attr("method") || "POST",
          data: formData,
          processData: false,
          contentType: false,
          dataType: "json",
          success: (response) => {
            if (response.status === "success") {
              this.showAlert(response.message || "Submitted successfully!", "success");
              $form.trigger("reset");
            } else {
              this.showAlert(response.message || "An error occurred.", "danger");
            }
          },
          error: (xhr) => {
            let msg = "Server error. Please try again.";
            if (xhr.responseJSON && xhr.responseJSON.message) {
              msg = xhr.responseJSON.message;
            }
            this.showAlert(msg, "danger");
          },
          complete: () => {
            $button.prop("disabled", false).text("Submit");
          },
        });
      });
    }

    /* ===============================
       SHOW ALERT MESSAGE
       =============================== */
    showAlert(message, type = "info") {
      const $alert = $(`
        <div class="alert alert-${type} alert-dismissible fade show shadow-base" role="alert">
          ${message}
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      `);

      $(".alert-container").remove();
      const $container = $('<div class="alert-container position-fixed top-0 start-50 translate-middle-x mt-3" style="z-index:1080; width:90%; max-width:600px;"></div>');
      $("body").append($container);
      $container.append($alert);

      setTimeout(() => $alert.alert("close"), 4000);
    }

    /* ===============================
       BACK TO TOP BUTTON
       =============================== */
    initBackToTop() {
      const $btn = $('<button class="btn btn-primary back-to-top rounded-circle shadow-hover" aria-label="Back to top"><i class="bi bi-arrow-up"></i></button>');
      $btn.css({
        position: "fixed",
        bottom: "30px",
        right: "30px",
        display: "none",
        zIndex: 1050,
        width: "45px",
        height: "45px",
      });

      $("body").append($btn);

      $(window).on("scroll", () => {
        $(window).scrollTop() > 300 ? $btn.fadeIn(300) : $btn.fadeOut(300);
      });

      $btn.on("click", () => {
        $("html, body").animate({ scrollTop: 0 }, 600, "swing");
      });
    }

    /* ===============================
       LAZY IMAGE LOADING
       =============================== */
    initLazyLoad() {
      const lazyImages = $("img[data-src]");
      if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target;
              img.src = img.getAttribute("data-src");
              img.removeAttribute("data-src");
              $(img).addClass("fade-in visible");
              obs.unobserve(img);
            }
          });
        });
        lazyImages.each(function () {
          observer.observe(this);
        });
      } else {
        lazyImages.each(function () {
          $(this).attr("src", $(this).data("src")).removeAttr("data-src");
        });
      }
    }

    /* ===============================
       PERFORMANCE LOGGER
       =============================== */
    logPerformance() {
      $(window).on("load", () => {
        // Using modern performance API instead of deprecated timing API
        const perfEntries = performance.getEntriesByType("navigation");
        if (perfEntries.length > 0) {
          const loadTime = perfEntries[0].loadEventEnd - perfEntries[0].fetchStart;
          console.info(`✅ Site loaded in ${loadTime}ms`);
        } else {
          // Fallback for older browsers
          if (window.performance && window.performance.timing) {
            const perf = window.performance.timing;
            const loadTime = perf.domContentLoadedEventEnd - perf.navigationStart;
            console.info(`✅ Site loaded in ${loadTime}ms`);
          }
        }
      });
    }
  }

  /* ===============================
     INITIALIZE GLOBAL APP
     =============================== */
  $(document).ready(() => {
    window.GlobalApp = new GlobalApp();
  });

})(jQuery);
