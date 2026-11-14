import { useEffect, useRef } from "react";

const VERT = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2  u_res;
uniform float u_time;
uniform vec2  u_mouse;
uniform float u_intensity;

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 4; i++) {
    v += a * snoise(p);
    p = rot * p * 2.0 + vec2(3.1, 1.7);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_res) / min(u_res.x, u_res.y);
  float t = u_time * 0.16;

  // Fluid mouse disturbance with valid GLSL syntax
  vec2 mouseUV = (u_mouse - 0.5) * vec2(u_res.x, u_res.y) / min(u_res.x, u_res.y);
  vec2 mDiff = uv - mouseUV;
  float mDist = length(mDiff);
  float mInfluence = exp(-mDist * 3.5) * 0.4;
  vec2 mDir = vec2(0.0);
  if (mDist > 0.001) {
    mDir = normalize(mDiff);
  }

  vec2 p = uv * 1.5 + mDir * mInfluence;

  // Domain warping for organic suminagashi marbling currents
  vec2 q = vec2(
    fbm(p + vec2(0.0, 0.0) + t * 0.8),
    fbm(p + vec2(5.2, 1.3) - t * 0.7)
  );

  vec2 r = vec2(
    fbm(p + 2.5 * q + vec2(1.7, 9.2) + 0.2 * t),
    fbm(p + 2.5 * q + vec2(8.3, 2.8) - 0.16 * t)
  );

  float f = fbm(p + 3.0 * r);
  f = f * 0.5 + 0.5;

  // Fluid palette
  vec3 cream     = vec3(0.965, 0.948, 0.915);   /* #f6f2e9 paper base */
  vec3 sand      = vec3(0.905, 0.865, 0.795);   /* warm sand currents */
  vec3 ink       = vec3(0.12, 0.10, 0.08);      /* sumi ink marbling */
  vec3 ember     = vec3(0.89, 0.29, 0.06);      /* vibrant amber/ember */

  // Swirling paper currents
  vec3 col = mix(cream, sand, smoothstep(0.1, 0.85, f) * 0.85);

  // Distinct flowing ink tendrils
  float band1 = 1.0 - smoothstep(0.0, 0.06, abs(f - 0.52 - 0.07 * q.x));
  col = mix(col, ink, band1 * 0.35 * u_intensity);

  float band2 = 1.0 - smoothstep(0.0, 0.04, abs(f - 0.68 + 0.05 * r.y));
  col = mix(col, ink, band2 * 0.25 * u_intensity);

  // Luminous ember currents
  float hot = smoothstep(0.72, 0.96, f * (0.6 + 0.5 * length(q)));
  col = mix(col, ember, hot * 0.45 * u_intensity);

  gl_FragColor = vec4(col, 1.0);
}
`;

interface Props {
  className?: string;
  intensity?: number;
  parallax?: number;
}

/** Robust fluid background with WebGL + 2D Canvas fallback */
export default function ShaderBackground({
  className = "",
  intensity = 1,
  parallax = 0.4,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let destroyed = false;
    let animId = 0;

    // Prevent context loss default crash screen
    const handleContextLost = (e: Event) => {
      e.preventDefault();
      start2DFallback();
    };
    canvas.addEventListener("webglcontextlost", handleContextLost, false);

    // Mouse tracking
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    const onMove = (e: PointerEvent) => {
      mouse.tx = e.clientX / window.innerWidth;
      mouse.ty = 1 - e.clientY / window.innerHeight;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    // Fallback 2D Canvas Fluid Simulation
    function start2DFallback() {
      if (destroyed) return;
      const ctx = canvas?.getContext("2d");
      if (!ctx) return;

      let time = 0;
      const resize2D = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      resize2D();
      window.addEventListener("resize", resize2D);

      const render2D = () => {
        if (destroyed) return;
        time += 0.015;
        mouse.x += (mouse.tx - mouse.x) * 0.05;
        mouse.y += (mouse.ty - mouse.y) * 0.05;

        const w = canvas.width;
        const h = canvas.height;

        // Base gradient
        const bgGrad = ctx.createRadialGradient(
          w * mouse.x, h * (1 - mouse.y), 100,
          w * 0.5, h * 0.5, Math.max(w, h)
        );
        bgGrad.addColorStop(0, "#f8f5ee");
        bgGrad.addColorStop(0.5, "#f1ece0");
        bgGrad.addColorStop(1, "#e6ddcc");
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, w, h);

        // Fluid marbling waves
        ctx.save();
        for (let j = 0; j < 3; j++) {
          ctx.beginPath();
          ctx.moveTo(0, h);
          for (let x = 0; x <= w; x += 40) {
            const wave1 = Math.sin(x * 0.003 + time + j) * 80;
            const wave2 = Math.cos(x * 0.005 - time * 0.8 + j * 2) * 50;
            const mDist = Math.abs(x - w * mouse.x);
            const mBump = Math.max(0, 100 - mDist * 0.4) * Math.sin(time * 3);
            const y = h * (0.35 + j * 0.22) + wave1 + wave2 + mBump;
            ctx.lineTo(x, y);
          }
          ctx.lineTo(w, h);
          ctx.closePath();
          ctx.fillStyle = j === 0 
            ? "rgba(225, 73, 14, 0.06)" 
            : j === 1 
            ? "rgba(23, 19, 14, 0.05)" 
            : "rgba(215, 195, 170, 0.25)";
          ctx.fill();
        }
        ctx.restore();

        animId = requestAnimationFrame(render2D);
      };
      render2D();
    }

    // Try WebGL initialization
    let gl: WebGLRenderingContext | null = null;
    try {
      gl = (canvas.getContext("webgl", {
        alpha: false,
        depth: false,
        stencil: false,
        antialias: false,
        powerPreference: "high-performance",
      }) || canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    } catch {
      gl = null;
    }

    if (!gl) {
      start2DFallback();
      return () => {
        destroyed = true;
        cancelAnimationFrame(animId);
        window.removeEventListener("pointermove", onMove);
      };
    }

    // Compile shaders safely
    const compile = (type: number, src: string) => {
      const s = gl!.createShader(type);
      if (!s) return null;
      gl!.shaderSource(s, src);
      gl!.compileShader(s);
      if (!gl!.getShaderParameter(s, gl!.COMPILE_STATUS)) {
        console.warn("Shader compile error:", gl!.getShaderInfoLog(s));
        gl!.deleteShader(s);
        return null;
      }
      return s;
    };

    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);

    if (!vs || !fs) {
      start2DFallback();
      return () => {
        destroyed = true;
        cancelAnimationFrame(animId);
        window.removeEventListener("pointermove", onMove);
      };
    }

    const prog = gl.createProgram();
    if (!prog) {
      start2DFallback();
      return () => {
        destroyed = true;
        cancelAnimationFrame(animId);
        window.removeEventListener("pointermove", onMove);
      };
    }

    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);

    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.warn("Program link error:", gl.getProgramInfoLog(prog));
      start2DFallback();
      return () => {
        destroyed = true;
        cancelAnimationFrame(animId);
        window.removeEventListener("pointermove", onMove);
      };
    }

    gl.useProgram(prog);

    // Full screen triangle
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");
    const uInt = gl.getUniformLocation(prog, "u_intensity");

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.max(10, Math.floor((canvas.clientWidth || window.innerWidth) * dpr));
      const h = Math.max(10, Math.floor((canvas.clientHeight || window.innerHeight) * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl?.viewport(0, 0, w, h);
      }
    };
    resize();
    window.addEventListener("resize", resize);

    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);

    const start = performance.now();
    let lastY = window.scrollY;

    const frame = (now: number) => {
      if (destroyed) return;
      animId = requestAnimationFrame(frame);

      // Verify canvas dimensions
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const expectedW = Math.max(10, Math.floor((canvas.clientWidth || window.innerWidth) * dpr));
      const expectedH = Math.max(10, Math.floor((canvas.clientHeight || window.innerHeight) * dpr));
      if (canvas.width !== expectedW || canvas.height !== expectedH) {
        canvas.width = expectedW;
        canvas.height = expectedH;
        gl?.viewport(0, 0, expectedW, expectedH);
      }

      const dy = window.scrollY - lastY;
      lastY = window.scrollY;
      mouse.ty += dy * 0.00035 * parallax;

      mouse.x += (mouse.tx - mouse.x) * 0.08;
      mouse.y += (mouse.ty - mouse.y) * 0.08;

      gl?.uniform2f(uRes, canvas.width, canvas.height);
      gl?.uniform1f(uTime, (now - start) / 1000);
      gl?.uniform2f(uMouse, mouse.x, mouse.y);
      gl?.uniform1f(uInt, intensity);
      gl?.drawArrays(gl.TRIANGLES, 0, 3);
    };
    animId = requestAnimationFrame(frame);

    return () => {
      destroyed = true;
      cancelAnimationFrame(animId);
      ro.disconnect();
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, [intensity, parallax]);

  return (
    <canvas 
      ref={canvasRef} 
      className={`block ${className}`} 
      style={{ display: "block" }}
      aria-hidden="true" 
    />
  );
}
