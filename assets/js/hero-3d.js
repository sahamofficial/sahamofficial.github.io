// =============================================================
// Slowly spinning, lit wireframe geodesic sphere on a fixed full-page canvas
// behind all content. Warm clay tone + soft depth fog to match soft-light.css.
//   - prefers-reduced-motion: renders one static frame, no animation loop
//   - tab hidden: pauses the loop (saves GPU / battery)
//   - no WebGL / Three.js fails to load: removes itself, page is unaffected
// Three.js is resolved from the import map declared in the page <head>.
// =============================================================
import * as THREE from 'three';

(function () {
  "use strict";

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Colours follow the active theme: read the CSS custom properties so the sphere
  // recolours when the user toggles themes (see the "themechange" listener below).
  function cssColor(name, fallback) {
    var v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    try { return new THREE.Color(v || fallback); } catch (e) { return new THREE.Color(fallback); }
  }
  function readThemeColors() {
    return {
      accent: cssColor('--accent', '#c0603a'),   // accent / wireframe
      bg: cssColor('--bg', '#ece9e3')             // bg — fog fades far edges into it
    };
  }
  var theme = readThemeColors();

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
  scene.fog = new THREE.Fog(theme.bg, 4.5, 9.5);   // far side of the sphere melts into the bg

  var camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(0, 0, 6);

  // geodesic sphere: faint lit facets + crisp warm triangle wireframe
  var geo = new THREE.IcosahedronGeometry(2.0, 1);   // detail 1 = geodesic look

  var faces = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({
    color: theme.accent, roughness: 0.85, metalness: 0.0,
    flatShading: true, transparent: true, opacity: 0.08, depthWrite: false
  }));
  var edges = new THREE.LineSegments(
    new THREE.WireframeGeometry(geo),
    new THREE.LineBasicMaterial({ color: theme.accent, transparent: true, opacity: 0.20 })
  );

  var group = new THREE.Group();
  group.add(faces);
  group.add(edges);
  group.rotation.set(0.5, 0.2, 0);   // pleasant starting tilt
  scene.add(group);

  // warm key + cool fill so the facets shimmer subtly as it turns
  var key = new THREE.DirectionalLight(0xfff1e6, 1.5);  key.position.set(3, 4, 5);
  var fill = new THREE.DirectionalLight(0xbfd0ff, 0.6); fill.position.set(-4, -2, 2);
  scene.add(key, fill, new THREE.AmbientLight(0xffffff, 0.4));

  function resize() {
    var w = window.innerWidth, h = window.innerHeight;
    renderer.setSize(w, h, false);   // false: CSS controls display size, buffer = w*h*dpr
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize);

  var running = false, rafId = 0;
  function tick() {
    group.rotation.y += 0.0016;
    group.rotation.x += 0.0006;
    renderer.render(scene, camera);
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

  // Recolour the sphere + fog when the theme switches; render a frame so the
  // change shows even while the loop is idle (paused tab / reduced motion).
  window.addEventListener('themechange', function () {
    var t = readThemeColors();
    faces.material.color.copy(t.accent);
    edges.material.color.copy(t.accent);
    scene.fog.color.copy(t.bg);
    renderer.render(scene, camera);
  });

  if (reduceMotion) renderer.render(scene, camera);   // one static frame
  else start();
})();
