// =============================================================
// Theme-aware 3D background on a single fixed full-page canvas behind
// all content. ONE WebGL context, ONE render loop; the visible object
// swaps with the active theme (see assets/js/theme-toggle.js):
//
//   · dark   (Terminal)    -> spinning geodesic SPHERE  (phosphor green)
//   · light  (Soft Light)  -> tumbling icosahedron GEM  (warm clay)
//   · bento  (Bento Grid)  -> drifting wireframe BOXES   (violet)
//   · glass  (Smoke Glass) -> drifting translucent BUBBLES (steel)
//   · aurum  (Aurum)       -> one slow amber wireframe TORUS KNOT
//   · neo    (Neomorphism) -> a soft indigo BLOB that breathes (morphs)
//   · clay   (Claymorphism)-> a matte teal puffy BALL that squishes (bounces)
//   · maximal(Maximalism)  -> a SCROLL-DRIVEN PARALLAX FIELD of faceted shapes that
//                             cycles the four accents (mustard->rust->teal->plum)
//
// Each object recolours itself from the active theme's --accent / --bg.
//   - prefers-reduced-motion: renders one static frame, no animation loop
//   - tab hidden: pauses the loop (saves GPU / battery)
//   - no WebGL / Three.js fails to load: removes itself, page is unaffected
// Three.js is resolved from the import map declared in the page <head>.
// =============================================================
import * as THREE from 'three';

(function () {
  "use strict";

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function cssColor(name, fallback) {
    var v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    try { return new THREE.Color(v || fallback); } catch (e) { return new THREE.Color(fallback); }
  }

  // canvas sits behind content (see .bg-3d-canvas in soft-light.css)
  var canvas = document.createElement('canvas');
  canvas.className = 'bg-3d-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.appendChild(canvas);

  var renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  } catch (e) {
    canvas.remove();   // no WebGL — leave just the gradient background
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  var scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x000000, 5, 12);

  var camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(0, 0, 6);

  // warm key + cool fill so the lit facets (sphere / gem) shimmer as they turn
  var key = new THREE.DirectionalLight(0xfff1e6, 1.5);  key.position.set(3, 4, 5);
  var fill = new THREE.DirectionalLight(0xbfd0ff, 0.6); fill.position.set(-4, -2, 2);
  scene.add(key, fill, new THREE.AmbientLight(0xffffff, 0.4));

  // ---- objects (built once; only the active theme's object is visible) -------

  // dark: faint lit facets + crisp triangle wireframe, slow geodesic spin
  function makeSphere() {
    var g = new THREE.IcosahedronGeometry(2.0, 1);
    var fm = new THREE.MeshStandardMaterial({ roughness: 0.85, metalness: 0.0, flatShading: true, transparent: true, opacity: 0.08, depthWrite: false });
    var em = new THREE.LineBasicMaterial({ transparent: true, opacity: 0.20 });
    var group = new THREE.Group();
    group.add(new THREE.Mesh(g, fm));
    group.add(new THREE.LineSegments(new THREE.WireframeGeometry(g), em));
    group.rotation.set(0.5, 0.2, 0);
    return {
      group: group,
      recolor: function (p) { fm.color.copy(p.accent); em.color.copy(p.accent); },
      animate: function () { group.rotation.y += 0.0016; group.rotation.x += 0.0006; }
    };
  }

  // light: sharp-faceted gem that tumbles on two axes and gently bobs
  function makeGem() {
    var g = new THREE.IcosahedronGeometry(1.7, 0);   // detail 0 = crisp gem facets
    var fm = new THREE.MeshStandardMaterial({ roughness: 0.4, metalness: 0.1, flatShading: true, transparent: true, opacity: 0.12, depthWrite: false });
    var em = new THREE.LineBasicMaterial({ transparent: true, opacity: 0.30 });
    var group = new THREE.Group();
    group.add(new THREE.Mesh(g, fm));
    group.add(new THREE.LineSegments(new THREE.WireframeGeometry(g), em));
    return {
      group: group,
      recolor: function (p) { fm.color.copy(p.accent); em.color.copy(p.accent); },
      animate: function (now) {
        var t = (now || 0) * 0.001;
        group.rotation.x += 0.0030;
        group.rotation.y += 0.0022;
        group.position.y = Math.sin(t * 0.6) * 0.18;
      }
    };
  }

  // bento: a scattered cloud of wireframe cubes drifting in 3D
  function makeBoxes() {
    var group = new THREE.Group();
    var items = [];
    for (var i = 0; i < 16; i++) {
      var s = 0.6 + Math.random() * 1.8;
      var g = new THREE.BoxGeometry(s, s, s);
      var fm = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.06, depthWrite: false });
      var em = new THREE.LineBasicMaterial({ transparent: true, opacity: 0.32 });
      var box = new THREE.Group();
      box.add(new THREE.Mesh(g, fm));
      box.add(new THREE.LineSegments(new THREE.EdgesGeometry(g), em));
      box.position.set(
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8 - 2
      );
      box.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      box.userData = { spin: (Math.random() - 0.5) * 0.004, float: 0.2 + Math.random() * 0.5, phase: Math.random() * Math.PI * 2 };
      items.push({ box: box, em: em, fm: fm, ci: i % 3 });
      group.add(box);
    }
    return {
      group: group,
      parallax: true,
      recolor: function (p) {
        var pal = [p.accent, p.accentSoft, p.blue];
        items.forEach(function (it) { it.em.color.copy(pal[it.ci]); it.fm.color.copy(pal[it.ci]); });
      },
      animate: function (now) {
        var t = (now || 0) * 0.001;
        group.rotation.y += 0.0008;
        group.rotation.x = Math.sin(t * 0.1) * 0.06;
        items.forEach(function (it) {
          it.box.rotation.x += it.box.userData.spin;
          it.box.rotation.y += it.box.userData.spin * 0.7;
          it.box.position.y += Math.sin(t * 0.4 + it.box.userData.phase) * 0.0015 * it.box.userData.float;
        });
      }
    };
  }

  // glass: a cloud of soft translucent bubbles that drift and glow (additive)
  function makeBubbles() {
    var group = new THREE.Group();
    var items = [];
    for (var i = 0; i < 14; i++) {
      var r = 0.45 + Math.random() * 1.25;
      var g = new THREE.SphereGeometry(r, 24, 16);
      var fm = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.10, depthWrite: false, blending: THREE.AdditiveBlending });
      var em = new THREE.LineBasicMaterial({ transparent: true, opacity: 0.18 });
      var bubble = new THREE.Group();
      bubble.add(new THREE.Mesh(g, fm));
      bubble.add(new THREE.LineSegments(new THREE.WireframeGeometry(g), em));
      bubble.position.set(
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 9,
        (Math.random() - 0.5) * 7 - 2
      );
      bubble.userData = { float: 0.3 + Math.random() * 0.6, phase: Math.random() * Math.PI * 2, drift: (Math.random() - 0.5) * 0.0006 };
      items.push({ bubble: bubble, em: em, fm: fm, ci: i % 3 });
      group.add(bubble);
    }
    return {
      group: group,
      parallax: true,
      recolor: function (p) {
        var pal = [p.accent, p.accentSoft, p.blue];
        items.forEach(function (it) { it.em.color.copy(pal[it.ci]); it.fm.color.copy(pal[it.ci]); });
      },
      animate: function (now) {
        var t = (now || 0) * 0.001;
        group.rotation.y += 0.0004;
        items.forEach(function (it) {
          it.bubble.position.y += Math.sin(t * 0.4 + it.bubble.userData.phase) * 0.0016 * it.bubble.userData.float;
          it.bubble.position.x += it.bubble.userData.drift;
        });
      }
    };
  }

  // aurum: a single large, slow, fine amber wireframe torus knot — quiet + premium
  function makeAurum() {
    var g = new THREE.TorusKnotGeometry(1.7, 0.34, 140, 18);
    var fm = new THREE.MeshStandardMaterial({ roughness: 0.5, metalness: 0.3, flatShading: true, transparent: true, opacity: 0.05, depthWrite: false });
    var em = new THREE.LineBasicMaterial({ transparent: true, opacity: 0.16 });
    var group = new THREE.Group();
    group.add(new THREE.Mesh(g, fm));
    group.add(new THREE.LineSegments(new THREE.WireframeGeometry(g), em));
    group.rotation.set(0.4, 0.2, 0);
    return {
      group: group,
      recolor: function (p) { fm.color.copy(p.accent); em.color.copy(p.accent); },
      animate: function () { group.rotation.y += 0.0012; group.rotation.x += 0.0004; }
    };
  }

  // neo: a soft indigo BLOB that *breathes* — its surface swells and relaxes as
  // layered sine waves push each vertex along its own direction. Unlike every other
  // theme's object (all rigid bodies that only spin/drift), this one deforms live.
  // One shared geometry drives both a faint lit fill and a wireframe skin, so the
  // wireframe morphs for free (no per-frame WireframeGeometry rebuild).
  function makeNeo() {
    var R = 1.9;
    var g = new THREE.IcosahedronGeometry(R, 3);        // detail 3 (~1.3k tris): smooth + cheap to morph
    var fm = new THREE.MeshStandardMaterial({ roughness: 0.7, metalness: 0.1, flatShading: false, transparent: true, opacity: 0.05, depthWrite: false });
    var wm = new THREE.MeshBasicMaterial({ wireframe: true, transparent: true, opacity: 0.12 });
    var group = new THREE.Group();
    group.add(new THREE.Mesh(g, fm));
    group.add(new THREE.Mesh(g, wm));                   // same geometry -> morphs in lockstep
    group.rotation.set(0.4, 0.2, 0);

    var posAttr = g.attributes.position;
    var pos = posAttr.array;
    var base = new Float32Array(pos);                   // cached rest pose (all verts at radius R)

    // push verts out/in along their direction by a sum of sines keyed to base coords + time
    function morph(t) {
      for (var i = 0; i < pos.length; i += 3) {
        var bx = base[i], by = base[i + 1], bz = base[i + 2];
        var d = Math.sin(bx * 1.8 + t * 0.9) * 0.14
              + Math.sin(by * 2.3 + t * 1.15) * 0.10
              + Math.sin(bz * 1.5 - t * 0.75) * 0.12;
        var s = (R + d) / R;                            // scale factor keeps displacement seamless across shared verts
        pos[i] = bx * s; pos[i + 1] = by * s; pos[i + 2] = bz * s;
      }
      posAttr.needsUpdate = true;
      g.computeVertexNormals();                          // keep the faint fill lit correctly
    }
    morph(0);                                            // organic even in the static (reduced-motion) frame

    return {
      group: group,
      recolor: function (p) { fm.color.copy(p.accent); wm.color.copy(p.accent); },
      animate: function (now) {
        morph((now || 0) * 0.001);
        group.rotation.y += 0.0012;
        group.rotation.x += 0.0004;
      }
    };
  }

  // clay: a soft MATTE puffy ball that *squishes* — a slow squash-and-stretch bounce
  // (scale down on Y while bulging X/Z, then back) keeps its volume roughly constant, so
  // it reads as a lump of clay being gently pressed. Unlike neo's translucent morphing
  // wireframe, this is a near-opaque smooth solid with only a whisper of wire skin.
  function makeClay() {
    var g = new THREE.IcosahedronGeometry(1.8, 4);   // detail 4: smooth, no facets
    var fm = new THREE.MeshStandardMaterial({ roughness: 0.9, metalness: 0.0, flatShading: false, transparent: true, opacity: 0.14, depthWrite: false });
    var wm = new THREE.MeshBasicMaterial({ wireframe: true, transparent: true, opacity: 0.12 });
    var group = new THREE.Group();
    group.add(new THREE.Mesh(g, fm));
    group.add(new THREE.Mesh(g, wm));                 // same geometry -> wire hugs the fill
    group.rotation.set(0.3, 0.2, 0);
    return {
      group: group,
      recolor: function (p) { fm.color.copy(p.accent); wm.color.copy(p.accent); },
      animate: function (now) {
        var t = (now || 0) * 0.001;
        var s = Math.sin(t * 1.1) * 0.10;             // squash amount
        group.scale.set(1 + s * 0.5, 1 - s, 1 + s * 0.5);   // bulge X/Z as Y flattens
        group.rotation.y += 0.0011;
        group.rotation.x += 0.0004;
      }
    };
  }

  // maximal: a SCROLL-REACTIVE PARALLAX FIELD — a scattered cloud of bold faceted
  // shapes (dodecahedra, gems, octahedra, cubes) spread across three depth bands.
  // It does NOT spin on its own; SCROLL drives it (see applyScroll below): as you
  // move down the page the near shapes travel far while the distant ones barely
  // budge (parallax by depth), and the whole field's colour walks the four-way
  // maximalist clash — mustard -> rust -> teal -> plum — tracking how far down you
  // are. Idle: only a whisper of drift. Reduced motion: colour still tracks scroll,
  // but the parallax travel / rotation is switched off (no vestibular motion).
  function makeMaximal() {
    var group = new THREE.Group();
    var items = [];

    // three depth bands — index 0 = far, 1 = mid, 2 = near
    var Z      = [-6.5, -3.0, -0.5];   // depth (world z)
    var SIZE   = [0.75, 1.15, 1.70];   // base radius
    var SPREAD = [15,   11,   8];      // horizontal scatter
    var FILL_O = [0.05, 0.09, 0.13];   // fill opacity (nearer = bolder)
    var WIRE_O = [0.16, 0.26, 0.36];   // wireframe opacity
    var PAR    = [1.4,  3.0,  5.2];    // parallax travel over a full scroll (nearer = faster)

    // eclectic low-detail polyhedra -> crisp retro facets
    function geom(kind, s) {
      if (kind === 0) return new THREE.DodecahedronGeometry(s, 0);
      if (kind === 1) return new THREE.IcosahedronGeometry(s, 0);
      if (kind === 2) return new THREE.OctahedronGeometry(s, 0);
      return new THREE.BoxGeometry(s * 1.4, s * 1.4, s * 1.4);
    }

    for (var i = 0; i < 12; i++) {
      var band = i % 3;
      var s = SIZE[band] * (0.8 + Math.random() * 0.6);
      var g = geom(i % 4, s);
      var fm = new THREE.MeshStandardMaterial({ roughness: 0.55, metalness: 0.15, flatShading: true, transparent: true, opacity: FILL_O[band], depthWrite: false });
      var em = new THREE.LineBasicMaterial({ transparent: true, opacity: WIRE_O[band] });
      var shape = new THREE.Group();
      shape.add(new THREE.Mesh(g, fm));
      shape.add(new THREE.LineSegments(new THREE.WireframeGeometry(g), em));
      var phase = Math.random() * Math.PI * 2;
      shape.position.set((Math.random() - 0.5) * SPREAD[band], (Math.random() - 0.5) * 9, Z[band]);
      shape.rotation.set(phase, phase * 0.7, 0);
      shape.userData = {
        baseY: shape.position.y,
        par: PAR[band],                        // vertical travel over the full scroll
        spin: 0.8 + Math.random() * 1.6,       // rotation (radians) over the full scroll
        drift: (Math.random() - 0.5) * 0.0006, // tiny idle life for full-motion users
        hueOffset: (i % 3 === 0) ? 1 : 0,      // ~1/3 of shapes sit one accent ahead -> clash
        phase: phase
      };
      items.push({ shape: shape, fm: fm, em: em, ud: shape.userData });
      group.add(shape);
    }

    // the four-way accent clash + wire tint, cached by recolor() and applied per-scroll
    var pal = [new THREE.Color(), new THREE.Color(), new THREE.Color(), new THREE.Color()];
    var wireTint = new THREE.Color();

    return {
      group: group,
      recolor: function (p) {
        pal[0].copy(p.accent);
        pal[1].copy(p.accent2 || p.accent);
        pal[2].copy(p.accent3 || p.accent);
        pal[3].copy(p.accent4 || p.accent);
        wireTint.copy(p.accentSoft || p.accent);
      },
      // idle drift only — SCROLL (applyScroll) is the real driver
      animate: function () {
        for (var k = 0; k < items.length; k++) items[k].shape.rotation.z += items[k].ud.drift;
      },
      // s in [0,1]: 0 = top of page (mustard) -> 1 = bottom (plum)
      applyScroll: function (s) {
        var seg = s * 3, bi = Math.min(2, Math.floor(seg)), bf = seg - bi;   // 3 colour segments over 4 stops
        for (var k = 0; k < items.length; k++) {
          var it = items[k], ud = it.ud;
          // colour: offset shapes take the next stop -> a two-tone clash at any scroll depth
          var ci = Math.min(2, bi + ud.hueOffset);
          it.fm.color.lerpColors(pal[ci], pal[ci + 1], bf);
          it.em.color.copy(it.fm.color).lerp(wireTint, 0.5);
          // motion is gated off for reduced-motion users (colour above still tracks scroll)
          if (!reduceMotion) {
            it.shape.position.y = ud.baseY + (s - 0.5) * ud.par;   // parallax: near band travels farther
            it.shape.rotation.x = ud.phase + s * ud.spin;
            it.shape.rotation.y = ud.phase * 0.7 + s * ud.spin * 0.8;
          }
        }
      }
    };
  }

  var sphere = makeSphere();
  var gem = makeGem();
  var boxes = makeBoxes();
  var bubbles = makeBubbles();
  var aurum = makeAurum();
  var neo = makeNeo();
  var clay = makeClay();
  var maximal = makeMaximal();
  scene.add(sphere.group, gem.group, boxes.group, bubbles.group, aurum.group, neo.group, clay.group, maximal.group);

  // theme -> object + camera/fog framing
  var CONFIG = {
    dark:  { obj: sphere,  fov: 45, camZ: 6,  fogNear: 4.5, fogFar: 9.5 },
    light: { obj: gem,     fov: 45, camZ: 6,  fogNear: 4.5, fogFar: 11 },
    bento: { obj: boxes,   fov: 50, camZ: 11, fogNear: 6,   fogFar: 18 },
    glass: { obj: bubbles, fov: 50, camZ: 10, fogNear: 6,   fogFar: 18 },
    aurum: { obj: aurum,   fov: 48, camZ: 8,  fogNear: 5,   fogFar: 13 },
    neo:   { obj: neo,     fov: 45, camZ: 6,  fogNear: 4.5, fogFar: 11 },
    clay:  { obj: clay,    fov: 45, camZ: 6,  fogNear: 4.5, fogFar: 11 },
    maximal: { obj: maximal, fov: 52, camZ: 8.5, fogNear: 6, fogFar: 20 }
  };

  function themeName() {
    var t = document.documentElement.getAttribute('data-theme');
    return CONFIG[t] ? t : 'light';   // absent/unknown -> default Soft Light
  }

  var current = CONFIG.light;
  var parallaxOn = false;

  function applyTheme() {
    current = CONFIG[themeName()];
    sphere.group.visible = (current.obj === sphere);
    gem.group.visible = (current.obj === gem);
    boxes.group.visible = (current.obj === boxes);
    bubbles.group.visible = (current.obj === bubbles);
    aurum.group.visible = (current.obj === aurum);
    neo.group.visible = (current.obj === neo);
    clay.group.visible = (current.obj === clay);
    maximal.group.visible = (current.obj === maximal);

    current.obj.recolor({
      accent: cssColor('--accent', '#9b8cff'),
      accentSoft: cssColor('--accent-soft', '#f0a6d6'),
      blue: new THREE.Color('#78a0ff'),
      accent2: cssColor('--accent-2', '#d2603a'),
      accent3: cssColor('--accent-3', '#2a9d8f'),
      accent4: cssColor('--accent-4', '#7a3b69')
    });

    scene.fog.color.copy(cssColor('--bg', '#0b0e17'));
    scene.fog.near = current.fogNear;
    scene.fog.far = current.fogFar;

    camera.fov = current.fov;
    camera.position.set(0, 0, current.camZ);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();

    parallaxOn = !!current.obj.parallax;
  }

  // pointer parallax target (used only by the bento boxes)
  var px = 0, py = 0, tx = 0, ty = 0;
  window.addEventListener('pointermove', function (e) {
    tx = (e.clientX / window.innerWidth) - 0.5;
    ty = (e.clientY / window.innerHeight) - 0.5;
  });

  // scroll drives the maximal parallax field: 0 = top of page, 1 = bottom.
  // rAF-throttled passive listener (mirrors theme-toggle.js's .nav-scrolled sync);
  // when the render loop is idle (reduced motion / hidden tab) we paint one frame
  // so the background still tracks scroll.
  var scrollNorm = 0, scrollQueued = false;
  function computeScrollNorm() {
    var max = (document.documentElement.scrollHeight || 0) - window.innerHeight;
    var y = window.scrollY || window.pageYOffset || 0;
    scrollNorm = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
  }
  window.addEventListener('scroll', function () {
    if (scrollQueued) return;
    scrollQueued = true;
    requestAnimationFrame(function () {
      scrollQueued = false;
      computeScrollNorm();
      if (!running && current.obj.applyScroll) { current.obj.applyScroll(scrollNorm); render(); }
    });
  }, { passive: true });

  function resize() {
    var w = window.innerWidth, h = window.innerHeight;
    renderer.setSize(w, h, false);   // false: CSS controls display size
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    computeScrollNorm();             // page height / viewport changed
  }
  resize();
  window.addEventListener('resize', resize);

  function render() { renderer.render(scene, camera); }

  var running = false, rafId = 0;
  function tick(now) {
    current.obj.animate(now);
    if (current.obj.applyScroll) current.obj.applyScroll(scrollNorm);
    if (parallaxOn) {
      px += (tx - px) * 0.04;
      py += (ty - py) * 0.04;
      camera.position.x = px * 2.2;
      camera.position.y = -py * 1.4;
      camera.lookAt(0, 0, 0);
    }
    render();
    rafId = requestAnimationFrame(tick);
  }
  function start() {
    if (running || reduceMotion || document.hidden) return;
    running = true;
    rafId = requestAnimationFrame(tick);
  }
  function stop() {
    running = false;
    if (rafId) { cancelAnimationFrame(rafId); rafId = 0; }
  }

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) stop(); else start();
  });

  // swap object + palette when the user switches themes; render a frame so the
  // change shows even while the loop is idle (paused tab / reduced motion)
  window.addEventListener('themechange', function () {
    applyTheme();
    if (current.obj.applyScroll) current.obj.applyScroll(scrollNorm);
    render();
    start();
  });

  // initial state
  applyTheme();
  computeScrollNorm();
  if (current.obj.applyScroll) current.obj.applyScroll(scrollNorm);   // colour the field before first paint
  if (reduceMotion) render();
  else start();
})();
