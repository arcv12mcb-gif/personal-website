import { useEffect, useRef } from "react";

const shaderSources = {
  rings: `
    precision highp float;
    uniform vec2 uResolution;
    uniform float uTime;
    uniform vec2 uPointer;

    float line(float value, float size) {
      return smoothstep(size, 0.0, abs(value));
    }

    void main() {
      vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution.xy) / min(uResolution.x, uResolution.y);
      vec2 pointer = (uPointer - 0.5) * vec2(0.6, -0.45);
      uv += pointer;

      float radius = length(uv);
      float angle = atan(uv.y, uv.x);
      float pulse = sin(radius * 20.0 - uTime * 1.8 + sin(angle * 5.0 + uTime) * 0.8);
      float rings = line(pulse, 0.08);
      float spokes = line(sin(angle * 10.0 + uTime * 0.45), 0.045) * smoothstep(0.65, 0.1, radius);
      float glow = smoothstep(0.75, 0.05, radius);

      vec3 base = mix(vec3(0.02, 0.08, 0.12), vec3(0.16, 0.10, 0.22), uv.x + 0.5);
      vec3 cyan = vec3(0.33, 0.92, 0.84);
      vec3 gold = vec3(0.98, 0.76, 0.18);
      vec3 rose = vec3(0.98, 0.44, 0.55);
      vec3 color = base + cyan * rings * 0.42 + gold * spokes * 0.28 + rose * glow * 0.12;

      gl_FragColor = vec4(color, 1.0);
    }
  `,
  waves: `
    precision highp float;
    uniform vec2 uResolution;
    uniform float uTime;
    uniform vec2 uPointer;

    float stroke(float value, float size) {
      return smoothstep(size, 0.0, abs(value));
    }

    void main() {
      vec2 uv = gl_FragCoord.xy / uResolution.xy;
      vec2 p = (uv - 0.5) * vec2(uResolution.x / uResolution.y, 1.0);
      p.x += (uPointer.x - 0.5) * 0.22;
      p.y -= (uPointer.y - 0.5) * 0.18;

      float stripes = 0.0;
      for (int i = 0; i < 7; i++) {
        float f = float(i);
        float wave = sin(p.x * (3.0 + f * 0.32) + uTime * (0.7 + f * 0.05) + f) * 0.08;
        stripes += stroke(p.y + wave + 0.28 - f * 0.095, 0.018 + f * 0.001);
      }

      float mosaic = floor(uv.x * 34.0) / 34.0 + floor(uv.y * 22.0) / 22.0;
      float shimmer = sin((mosaic + uTime * 0.18) * 12.0) * 0.5 + 0.5;
      vec3 base = mix(vec3(0.03, 0.08, 0.11), vec3(0.12, 0.16, 0.23), uv.y);
      vec3 color = base + vec3(0.36, 0.92, 0.84) * stripes * 0.4;
      color += vec3(0.98, 0.76, 0.18) * shimmer * stripes * 0.12;
      color += vec3(0.42, 0.33, 0.95) * smoothstep(0.75, 0.0, length(p)) * 0.13;

      gl_FragColor = vec4(color, 1.0);
    }
  `,
};

function MotionShaderPanel({ variant = "rings", title, label }) {
  const canvasRef = useRef(null);
  const pointerRef = useRef([0.5, 0.5]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const gl = canvas.getContext("webgl", { alpha: true, antialias: false });
    if (!gl) return undefined;

    const vertexSource = `
      attribute vec2 aPosition;
      void main() {
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

    const fragmentSource = shaderSources[variant] ?? shaderSources.rings;

    const compileShader = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(gl.VERTEX_SHADER, vertexSource);
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentSource);
    if (!vertexShader || !fragmentShader) return undefined;

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return undefined;

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, "aPosition");
    const resolutionLocation = gl.getUniformLocation(program, "uResolution");
    const timeLocation = gl.getUniformLocation(program, "uTime");
    const pointerLocation = gl.getUniformLocation(program, "uPointer");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frameId = 0;
    let start = performance.now();

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(1, Math.floor(rect.width * ratio));
      canvas.height = Math.max(1, Math.floor(rect.height * ratio));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const render = () => {
      const [pointerX, pointerY] = pointerRef.current;
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform1f(timeLocation, reduceMotion ? 0 : (performance.now() - start) / 1000);
      gl.uniform2f(pointerLocation, pointerX, pointerY);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      frameId = window.requestAnimationFrame(render);
    };

    const handlePointerMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      pointerRef.current = [
        Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width)),
        Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height)),
      ];
    };

    window.addEventListener("resize", resizeCanvas);
    canvas.addEventListener("pointermove", handlePointerMove, { passive: true });
    resizeCanvas();
    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("pointermove", handlePointerMove);
      window.cancelAnimationFrame(frameId);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, [variant]);

  return (
    <div className={`motionShaderPanel ${variant === "waves" ? "motionShaderPanelAlt" : ""}`}>
      <canvas ref={canvasRef} aria-hidden="true" />
      <div className="motionShaderOverlay">
        <span>{label}</span>
        <strong>{title}</strong>
      </div>
    </div>
  );
}

export default MotionShaderPanel;
