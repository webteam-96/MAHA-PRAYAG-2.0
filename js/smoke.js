/* Animated red smoke background — vanilla WebGL2, domain-warped fractal noise.
   Renders into .page-smoke over the still smoke image; skipped when WebGL2 is
   missing or the visitor prefers reduced motion (the still image remains). */
(function () {
  'use strict';
  var host = document.querySelector('.page-smoke');
  if (!host || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var OPTS = {
    base: '#1C0404', mid: '#8A1212', hi: '#E8482E',   // shadow, body and lit edge of the smoke
    speed: 0.045, scale: 1.6, opacity: 1.0, grain: 0.04, parallax: 0.12,
    octaves: innerWidth < 900 ? 5 : 6
  };

  var canvas = document.createElement('canvas');
  var gl = canvas.getContext('webgl2', { alpha: true, premultipliedAlpha: true, antialias: false, powerPreference: 'low-power' });
  if (!gl) return;

  var VERT = '#version 300 es\nin vec2 position;void main(){gl_Position=vec4(position,0.,1.);}';
  var FRAG = '#version 300 es\nprecision highp float;\n' +
    'uniform vec2 iResolution,uMouse;uniform float iTime,uSpeed,uScale,uOpacity,uGrain,uParallax;uniform int uOct;uniform vec3 uBase,uMid,uHi;out vec4 fragColor;\n' +
    'float hash(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}\n' +
    'float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);float a=hash(i),b=hash(i+vec2(1,0)),c=hash(i+vec2(0,1)),d=hash(i+vec2(1,1));return mix(mix(a,b,f.x),mix(c,d,f.x),f.y);}\n' +
    'float fbm(vec2 p){float v=0.,a=.5;mat2 m=mat2(1.6,1.2,-1.2,1.6);for(int i=0;i<8;i++){if(i>=uOct)break;v+=a*noise(p);p=m*p;a*=.5;}return v;}\n' +
    'void main(){vec2 uv=gl_FragCoord.xy/iResolution.xy;vec2 p=uv;p.x*=iResolution.x/iResolution.y;p*=uScale;p+=(uMouse-.5)*uParallax;float t=iTime*uSpeed;' +
    'vec2 q=vec2(fbm(p+vec2(0.,t*.9)),fbm(p+vec2(5.2,1.3)-t*.6));' +
    'vec2 r=vec2(fbm(p+3.2*q+vec2(1.7,9.2)+t*.45),fbm(p+3.2*q+vec2(8.3,2.8)-t*.38));' +
    'float f=fbm(p+3.4*r+vec2(t*.2,-t*.12));' +
    'float dens=smoothstep(.32,.92,f);' +
    'vec3 col=mix(uBase,uMid,smoothstep(.28,.66,f));col=mix(col,uHi,smoothstep(.6,.98,f)*.85);' +
    'float edge=smoothstep(0.,.35,uv.y)*smoothstep(1.,.75,uv.y)*.35+.65;' +   // slightly thinner at the very top and bottom
    'float a=dens*uOpacity*edge;' +
    'if(uGrain>0.){float g=hash(gl_FragCoord.xy+mod(iTime,64.)*11.);a+=(g-.5)*uGrain;}' +
    'a=clamp(a,0.,1.);fragColor=vec4(col*a,a);}';

  function shader(type, src) {
    var sh = gl.createShader(type); gl.shaderSource(sh, src); gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) { console.warn('smoke shader:', gl.getShaderInfoLog(sh)); return null; }
    return sh;
  }
  var vs = shader(gl.VERTEX_SHADER, VERT), fs = shader(gl.FRAGMENT_SHADER, FRAG);
  if (!vs || !fs) return;
  var prog = gl.createProgram(); gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
  gl.useProgram(prog);

  var buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  var loc = gl.getAttribLocation(prog, 'position'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  var U = {}; ['iResolution', 'iTime', 'uMouse', 'uSpeed', 'uScale', 'uOpacity', 'uGrain', 'uParallax', 'uOct', 'uBase', 'uMid', 'uHi'].forEach(function (n) { U[n] = gl.getUniformLocation(prog, n); });
  function rgb(hex) { var m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex); return m ? [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255] : [1, 1, 1]; }
  gl.uniform1f(U.uSpeed, OPTS.speed); gl.uniform1f(U.uScale, OPTS.scale); gl.uniform1f(U.uOpacity, OPTS.opacity); gl.uniform1f(U.uGrain, OPTS.grain); gl.uniform1f(U.uParallax, OPTS.parallax); gl.uniform1i(U.uOct, OPTS.octaves);
  gl.uniform3fv(U.uBase, rgb(OPTS.base)); gl.uniform3fv(U.uMid, rgb(OPTS.mid)); gl.uniform3fv(U.uHi, rgb(OPTS.hi));

  host.appendChild(canvas); host.classList.add('has-gl'); document.body.classList.add('gl-on');

  function size() {
    var scale = Math.min(devicePixelRatio || 1, 1.5) * (innerWidth < 900 ? 0.5 : 0.6);   // smoke does not need full resolution
    canvas.width = Math.max(1, Math.floor(innerWidth * scale)); canvas.height = Math.max(1, Math.floor(innerHeight * scale));
    gl.viewport(0, 0, canvas.width, canvas.height); gl.uniform2f(U.iResolution, canvas.width, canvas.height);
  }
  var rt; addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(size, 120); }, { passive: true }); size();

  var target = [0.5, 0.5], cur = [0.5, 0.5];
  if (matchMedia('(hover:hover)').matches) addEventListener('pointermove', function (e) { target[0] = e.clientX / innerWidth; target[1] = 1 - e.clientY / innerHeight; }, { passive: true });

  var raf = 0, t0 = performance.now();
  function loop(t) {
    gl.uniform1f(U.iTime, (t - t0) * 0.001);
    cur[0] += 0.04 * (target[0] - cur[0]); cur[1] += 0.04 * (target[1] - cur[1]);
    gl.uniform2f(U.uMouse, cur[0], cur[1]);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    raf = requestAnimationFrame(loop);
  }
  function start() { if (!raf && !document.hidden) raf = requestAnimationFrame(loop); }
  function stop() { if (raf) { cancelAnimationFrame(raf); raf = 0; } }
  document.addEventListener('visibilitychange', function () { document.hidden ? stop() : start(); });
  start();
})();
