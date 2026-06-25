/**
* Template Name: iPortfolio
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Header toggle
   */
const headerToggleBtn = document.querySelector('.header-toggle');

if (headerToggleBtn) {
  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }

  headerToggleBtn.addEventListener('click', headerToggle);
}


  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');

window.addEventListener('load', () => {
    preloader.style.opacity = '0'; // Fade out effect
    setTimeout(() => preloader.remove(), 600); // Remove after fade-out
});


  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

/**
 * Collapse empty ad slots so the dark layout has no blank "black box" gaps.
 * - On localhost / file:// previews, ads never serve -> hide all slots.
 * - In production, hide only slots Google marks as unfilled (data-ad-status).
 * A served ad (has an <iframe>, status "filled") is NEVER hidden.
 */
(function () {
  "use strict";
  var isPreview = location.protocol === 'file:' ||
    /^(localhost|127\.0\.0\.1|0\.0\.0\.0|\[::1\])$/.test(location.hostname) ||
    location.hostname === '';

  function tidyAds() {
    document.querySelectorAll('ins.adsbygoogle').forEach(function (ins) {
      var status = ins.getAttribute('data-ad-status');
      if (status === 'filled') return;                    // a real ad served — keep it
      if (status === 'unfilled') { ins.classList.add('ad-empty'); return; }
      if (isPreview) ins.classList.add('ad-empty');       // preview never serves ads
    });
  }

  if (isPreview) document.addEventListener('DOMContentLoaded', tidyAds);
  window.addEventListener('load', function () {
    tidyAds();
    setTimeout(tidyAds, 2500);   // give AdSense time to fill before collapsing
    setTimeout(tidyAds, 6000);
  });
})();

/**
 * Cursor light-source shadows.
 * The cursor behaves like a light: each "lit" item casts a soft shadow
 * AWAY from the pointer, growing as the pointer nears. Pure transform of
 * CSS custom vars (--sx/--sy/--sblur/--salpha) consumed by .shadow-lit /
 * .shadow-lit-text in soft-light.css. Disabled on touch / reduced-motion.
 */
(function () {
  "use strict";
  var finePointer = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var BOX_SEL = [
    '.navmenu a', '.header .social-links a', '.header .header-toggle',
    '.btn-chrome', '.btn-ghost',
    '.about .content', '.stats .stats-item', '.services .service-item',
    '.resume .resume-item', '.contact .info-wrap', '.contact .php-email-form',
    '.portfolio .portfolio-content', '.scroll-top'
  ].join(',');
  var TEXT_SEL = '.hero h2, .section-title h2';

  function tag() {
    document.querySelectorAll(BOX_SEL).forEach(function (el) { el.classList.add('shadow-lit'); });
    document.querySelectorAll(TEXT_SEL).forEach(function (el) { el.classList.add('shadow-lit-text'); });
  }

  // cache element centres (viewport coords); refresh on scroll/resize/load
  var items = [];
  function measure() {
    items = [].map.call(document.querySelectorAll('.shadow-lit, .shadow-lit-text'), function (el) {
      var r = el.getBoundingClientRect();
      return { el: el, cx: r.left + r.width / 2, cy: r.top + r.height / 2 };
    });
  }

  var mx = window.innerWidth / 2, my = window.innerHeight / 2, ticking = false;

  function paint() {
    ticking = false;
    var REACH = 520;          // light radius (px)
    var MAX = 18;             // max shadow offset (px)
    for (var i = 0; i < items.length; i++) {
      var it = items[i];
      var dx = it.cx - mx, dy = it.cy - my;
      var dist = Math.sqrt(dx * dx + dy * dy) || 1;
      var near = Math.max(0, 1 - dist / REACH);     // 1 = under cursor, 0 = far
      var k = near * near;                          // ease — tighter pool of light
      var ox = (dx / dist) * MAX * k;
      var oy = (dy / dist) * MAX * k;
      var s = it.el.style;
      s.setProperty('--sx', ox.toFixed(1));
      s.setProperty('--sy', (oy + (1 - k) * 5).toFixed(1));   // gentle ambient drop when far
      s.setProperty('--sblur', (16 + 30 * k).toFixed(0) + 'px');
      s.setProperty('--salpha', (0.10 + 0.26 * k).toFixed(3));
    }
  }
  function onMove(e) {
    mx = e.clientX; my = e.clientY;
    if (!ticking) { ticking = true; requestAnimationFrame(paint); }
  }
  function onScrollResize() { measure(); if (!ticking) { ticking = true; requestAnimationFrame(paint); } }

  function init() {
    tag();
    if (!finePointer || reduceMotion) return;   // keep the static soft shadows
    measure();
    paint();
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('scroll', onScrollResize, { passive: true });
    window.addEventListener('resize', onScrollResize);
  }

  if (document.readyState !== 'loading') init();
  else document.addEventListener('DOMContentLoaded', init);
  window.addEventListener('load', measure);     // re-measure after fonts/images settle
})();

/**
 * Cursor trail.
 * A warm particle "comet" trails the pointer on a full-screen canvas: each
 * move spawns soft dots that drift, shrink, and fade (more dots the faster
 * you move). Purely visual (pointer-events:none); the native cursor stays.
 * The rAF loop idles when no particles remain and restarts on the next move.
 * Disabled on touch / reduced-motion.
 */
(function () {
  "use strict";
  var finePointer = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!finePointer || reduceMotion) return;

  var MAX = 240;                                   // hard cap on live particles
  var COLORS = ['192,96,58', '216,138,100', '164,76,43'];   // warm clay palette

  var canvas, ctx, dpr = Math.min(window.devicePixelRatio || 1, 2);
  var W = 0, H = 0, parts = [], lastX = null, lastY = null, running = false;

  function resize() {
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function spawn(x, y, speed) {
    var n = Math.min(4, 1 + Math.floor(speed / 14));   // faster move -> more dots
    for (var i = 0; i < n; i++) {
      parts.push({
        x: x + (Math.random() - 0.5) * 6,
        y: y + (Math.random() - 0.5) * 6,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6 - 0.2,         // slight upward drift
        r: 2 + Math.random() * 4,
        life: 1,
        decay: 0.012 + Math.random() * 0.02,
        c: COLORS[(Math.random() * COLORS.length) | 0]
      });
    }
    if (parts.length > MAX) parts.splice(0, parts.length - MAX);
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    for (var i = parts.length - 1; i >= 0; i--) {
      var p = parts[i];
      p.x += p.vx; p.y += p.vy; p.life -= p.decay;
      if (p.life <= 0) { parts.splice(i, 1); continue; }
      var a = p.life * 0.5;
      ctx.beginPath();
      ctx.fillStyle = 'rgba(' + p.c + ',' + a.toFixed(3) + ')';
      ctx.shadowColor = 'rgba(' + p.c + ',' + (a * 0.8).toFixed(3) + ')';
      ctx.shadowBlur = 6;
      ctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.shadowBlur = 0;
    if (parts.length) requestAnimationFrame(loop);
    else running = false;
  }
  function kick() { if (!running) { running = true; requestAnimationFrame(loop); } }

  function onMove(e) {
    var x = e.clientX, y = e.clientY;
    var speed = (lastX === null) ? 0 : Math.hypot(x - lastX, y - lastY);
    lastX = x; lastY = y;
    spawn(x, y, speed);
    kick();
  }

  function init() {
    canvas = document.createElement('canvas');
    canvas.className = 'cursor-canvas';
    document.body.appendChild(canvas);
    ctx = canvas.getContext('2d');
    resize();
    window.addEventListener('resize', resize);
    document.addEventListener('mousemove', onMove, { passive: true });
  }

  if (document.readyState !== 'loading') init();
  else document.addEventListener('DOMContentLoaded', init);
})();

/**
 * Click ripple ("water drop").
 * Every press anywhere spawns concentric rings that expand and decelerate, a
 * soft impact splash, and a central rebound jet — animated in CSS. The rings
 * carry an SVG turbulence/displacement filter so their edges ripple organically
 * (not perfect circles). Fires on pointerdown so it appears instantly (even
 * before a link navigates) and works for mouse, touch and pen. Each ripple
 * removes itself when its animation ends. Skipped for reduced-motion.
 */
(function () {
  "use strict";
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  var SVGNS = 'http://www.w3.org/2000/svg';

  // Inject the water displacement filter once (referenced by CSS: filter: url(#water-ripple)).
  function ensureFilter() {
    if (document.getElementById('water-ripple')) return;
    var svg = document.createElementNS(SVGNS, 'svg');
    svg.setAttribute('width', '0');
    svg.setAttribute('height', '0');
    svg.setAttribute('aria-hidden', 'true');
    svg.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';

    var filter = document.createElementNS(SVGNS, 'filter');
    filter.setAttribute('id', 'water-ripple');
    // generous region so displaced edges aren't clipped
    filter.setAttribute('x', '-50%');
    filter.setAttribute('y', '-50%');
    filter.setAttribute('width', '200%');
    filter.setAttribute('height', '200%');

    var turb = document.createElementNS(SVGNS, 'feTurbulence');
    turb.setAttribute('type', 'fractalNoise');
    turb.setAttribute('baseFrequency', '0.02');
    turb.setAttribute('numOctaves', '2');
    turb.setAttribute('seed', '3');
    turb.setAttribute('result', 'noise');

    var disp = document.createElementNS(SVGNS, 'feDisplacementMap');
    disp.setAttribute('in', 'SourceGraphic');
    disp.setAttribute('in2', 'noise');
    disp.setAttribute('scale', '6');
    disp.setAttribute('xChannelSelector', 'R');
    disp.setAttribute('yChannelSelector', 'G');

    filter.appendChild(turb);
    filter.appendChild(disp);
    svg.appendChild(filter);
    document.body.appendChild(svg);
  }

  function ringEl(mod) {
    var r = document.createElement('span');
    r.className = 'ripple__ring' + (mod ? ' ripple__ring--' + mod : '');
    return r;
  }

  function spawn(x, y) {
    var box = document.createElement('div');
    box.className = 'ripple';
    box.style.left = x + 'px';
    box.style.top = y + 'px';

    var drop = document.createElement('span'); drop.className = 'ripple__drop';
    var jet = document.createElement('span'); jet.className = 'ripple__jet';

    box.appendChild(drop);
    box.appendChild(ringEl(0));
    box.appendChild(ringEl(2));
    box.appendChild(ringEl(3));
    box.appendChild(jet);

    document.body.appendChild(box);
    setTimeout(function () { box.remove(); }, 2700);   // outlast the longest animation
  }

  function onDown(e) {
    // ignore non-primary presses; use viewport coords (fixed-positioned)
    if (e.button && e.button !== 0) return;
    spawn(e.clientX, e.clientY);
  }

  function init() {
    ensureFilter();
    document.addEventListener('pointerdown', onDown, { passive: true });
  }

  if (document.readyState !== 'loading') init();
  else document.addEventListener('DOMContentLoaded', init);
})();

/**
 * Hanging "Get in Touch" button.
 * The button dangles from a pinned chain and swings as a damped pendulum when
 * hovered or tapped, settling back upright. Physics: gravity restoring torque
 * (-g·sinθ) plus velocity damping, integrated on requestAnimationFrame; the
 * loop idles once it settles and restarts on the next nudge. Skipped for
 * reduced-motion (the button just hangs still).
 */
(function () {
  "use strict";
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  var GRAV = 26;     // restoring strength (natural freq ~5 rad/s)
  var DAMP = 1.7;    // velocity damping (higher = settles sooner)

  // each hanging button swings independently with its own state
  Array.prototype.forEach.call(document.querySelectorAll('.pendulum'), function (pend) {
    var hang = pend.closest('.hang') || pend;
    var pivot = hang.querySelector('.hang__pivot');
    var shadow = hang.querySelector('.hang__shadow');
    var btn = pend.querySelector('.btn-chrome, .btn-ghost');

    var angle = 0;     // radians; 0 = hanging straight (upright)
    var vel = 0;       // rad/s
    var last = 0, running = false;
    var L = 60;        // pivot -> button-centre distance (drives shadow tracking)

    function measure() {
      if (!btn) return;
      var pr = (pivot || hang).getBoundingClientRect();
      var br = btn.getBoundingClientRect();
      var d = (br.top + br.height / 2) - (pr.top + pr.height / 2);
      if (isFinite(d) && d > 20) L = d;
    }

    // light from above: shadow tracks under the bob, lifts away (widens + fades) as it swings
    function paintShadow() {
      if (!shadow) return;
      var rise = 1 - Math.cos(angle);
      // CSS rotate() moves the bob (below the pivot) by -L*sin(angle) in x, so the
      // shadow must shift the same way to stay under it — not the opposite way.
      var shift = -L * Math.sin(angle);
      var scale = 1 + rise * 1.8;
      var op = 0.8 * Math.max(0, 1 - rise * 3.0);
      shadow.style.transform = 'translateX(calc(-50% + ' + shift.toFixed(1) + 'px)) scale(' + scale.toFixed(3) + ')';
      shadow.style.opacity = op.toFixed(3);
    }

    function frame(t) {
      if (!last) last = t;
      var dt = Math.min(0.032, (t - last) / 1000); last = t;
      var acc = -GRAV * Math.sin(angle) - DAMP * vel;
      vel += acc * dt;
      angle += vel * dt;
      pend.style.transform = 'rotate(' + angle.toFixed(4) + 'rad)';
      paintShadow();
      if (Math.abs(angle) > 0.0009 || Math.abs(vel) > 0.0009) {
        requestAnimationFrame(frame);
      } else {
        angle = 0; vel = 0; last = 0; running = false;
        pend.style.transform = 'rotate(0rad)';
        paintShadow();
      }
    }
    function kick(v) {
      vel += v;
      if (!running) { running = true; last = 0; requestAnimationFrame(frame); }
    }

    measure();
    window.addEventListener('load', measure);
    window.addEventListener('resize', measure);

    // push the swing in the direction the pointer is travelling: entering from the
    // right shoves the button left, entering from the left shoves it right — like
    // nudging a real hanging sign. Defaults to a left swing if x is unknown.
    function kickFrom(e, mag) {
      var t = btn || hang, r = t.getBoundingClientRect();
      var dir = (e && e.clientX < r.left + r.width / 2) ? -1 : 1;
      kick(dir * mag);
    }

    // entering the hanging button (or its chain) sets it swinging; tapping nudges it
    hang.addEventListener('mouseenter', function (e) { kickFrom(e, 3.4); }, { passive: true });
    hang.addEventListener('pointerdown', function (e) { kickFrom(e, 2.6); }, { passive: true });
  });
})();
