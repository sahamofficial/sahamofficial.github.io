/**
 * Contact form — FormSubmit.co (AJAX)
 * -----------------------------------
 * The site is a static GitHub Pages page with no PHP backend, so the contact
 * form posts to FormSubmit's AJAX endpoint (see the form's `action`). FormSubmit
 * returns JSON like {"success":"true","message":"..."}. On the FIRST submission
 * it emails a one-time activation link to the target address — messages only
 * start arriving once that link is clicked.
 *
 * This replaces the bundled assets/vendor/php-email-form/validate.js, which
 * expected a PHP endpoint returning the plain text "OK" and would therefore
 * report failure on FormSubmit's JSON response.
 */
(function () {
  "use strict";

  const form = document.querySelector(".contact .php-email-form");
  if (!form) return;

  const loading = form.querySelector(".loading");
  const errorEl = form.querySelector(".error-message");
  const sentEl = form.querySelector(".sent-message");

  const show = (el) => { if (el) el.style.display = "block"; };
  const hide = (el) => { if (el) el.style.display = "none"; };

  const fail = (msg) => {
    hide(loading);
    if (errorEl) errorEl.textContent = msg;
    show(errorEl);
  };

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const action = form.getAttribute("action");
    if (!action) {
      fail("The form action is not set.");
      return;
    }

    hide(errorEl);
    hide(sentEl);
    show(loading);

    try {
      const response = await fetch(action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      const data = await response.json().catch(() => ({}));

      if (response.ok && (data.success === "true" || data.success === true)) {
        hide(loading);
        show(sentEl);
        form.reset();
      } else {
        fail(data.message || "Something went wrong. Please try again, or email directly.");
      }
    } catch (err) {
      fail("Network error. Please try again, or email directly.");
    }
  });
})();
