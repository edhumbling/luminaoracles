"use client";

import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

/* ---------- GLSL Fragment Shader Generator ---------- */
/**
 * Generates a customizable psychedelic vortex shader with adjustable parameters
 * Based on polar coordinate transformations and Inigo Quilez color palette techniques
 */
const createFragmentShader = (params: ShaderParams) => `#version 300 es
precision highp float;

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

// Customizable color palette function by Inigo Quilez
// Creates smooth gradients based on an input value 't'
vec3 palette(float t) {
    vec3 a = vec3(${params.paletteA.join(", ")});
    vec3 b = vec3(${params.paletteB.join(", ")});
    vec3 c = vec3(${params.paletteC.join(", ")});
    vec3 d = vec3(${params.paletteD.join(", ")});
    return a + b * cos(6.28318 * (c * t + d));
}

void main() {
    // Center and normalize UV coordinates (-aspect, -1) to (aspect, 1)
    vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / resolution.y;

    // Convert cartesian coordinates to polar coordinates
    float angle = atan(uv.y, uv.x);
    float r = length(uv);

    // Apply rotation speed
    angle += time * ${params.rotationSpeed.toFixed(2)};

    // Create pulsating ring pattern
    float bands = mod(r * ${params.bandFrequency.toFixed(1)} + time * ${params.bandSpeed.toFixed(2)}, 1.0);
    
    // Create sharp, glowing pulse effect
    float glow = smoothstep(0.0, ${params.glowSoftness.toFixed(2)}, bands) * 
                 smoothstep(1.0, ${(1.0 - params.glowSoftness).toFixed(2)}, bands);

    // Add radial lines/spokes
    float spokes = mod(angle * ${params.spokeCount.toFixed(1)}, 6.28318);
    float spoke_value = sin(spokes) * 0.5 + 0.5;

    // Combine effects with adjustable mixing
    float final_v = (glow * ${params.glowMix.toFixed(2)} + spoke_value * ${(1.0 - params.glowMix).toFixed(2)});
    final_v = pow(final_v, ${params.contrast.toFixed(2)});

    // Color the pattern with cycling palette
    vec3 col = palette(final_v + time * ${params.colorCycleSpeed.toFixed(2)});

    // Add depth-based hue shift
    col *= (0.5 + 0.5 * cos(r * ${params.depthFrequency.toFixed(1)} + time * 0.5 + vec3(0, 1, 2)));

    // Apply vignette effect
    float vig = 1.0 - pow(r, 2.0) * ${params.vignetteStrength.toFixed(2)};
    col *= vig;

    fragColor = vec4(col, 1.0);
}
`;

/* ---------- TypeScript Interfaces ---------- */

/**
 * Shader parameter configuration for customizing the vortex effect
 */
export interface ShaderParams {
  /** Color palette parameter A - base offset [r, g, b] */
  paletteA: [number, number, number];
  /** Color palette parameter B - amplitude [r, g, b] */
  paletteB: [number, number, number];
  /** Color palette parameter C - frequency [r, g, b] */
  paletteC: [number, number, number];
  /** Color palette parameter D - phase shift [r, g, b] */
  paletteD: [number, number, number];
  /** Speed of vortex rotation (0.0 - 1.0) */
  rotationSpeed: number;
  /** Frequency of concentric bands (10.0 - 30.0) */
  bandFrequency: number;
  /** Speed of band pulsation (0.2 - 1.0) */
  bandSpeed: number;
  /** Softness of glow effect (0.05 - 0.2) */
  glowSoftness: number;
  /** Number of radial spokes (5.0 - 20.0) */
  spokeCount: number;
  /** Mix ratio between glow and spokes (0.0 - 1.0) */
  glowMix: number;
  /** Contrast/power adjustment (1.0 - 3.0) */
  contrast: number;
  /** Speed of color palette cycling (0.0 - 0.3) */
  colorCycleSpeed: number;
  /** Frequency of depth-based color shift (2.0 - 8.0) */
  depthFrequency: number;
  /** Strength of edge vignette effect (0.0 - 1.0) */
  vignetteStrength: number;
}

/**
 * Component props for PsychedelicVortexHero
 */
export interface PsychedelicVortexHeroProps {
  /** Additional CSS classes for the container */
  className?: string;
  /** Content to overlay on the shader background */
  children?: React.ReactNode;
  /** Custom shader parameters for effect customization */
  shaderParams?: Partial<ShaderParams>;
  /** Enable/disable automatic animation (default: true) */
  animated?: boolean;
  /** Performance mode: 'high' | 'balanced' | 'low' (default: 'balanced') */
  quality?: "high" | "balanced" | "low";
  /** Fallback content when WebGL2 is not supported */
  fallback?: React.ReactNode;
  /** Callback when component is ready */
  onReady?: () => void;
  /** Callback when WebGL error occurs */
  onError?: (error: string) => void;
}

/**
 * Default shader parameters - balanced psychedelic effect
 */
const DEFAULT_SHADER_PARAMS: ShaderParams = {
  paletteA: [0.5, 0.5, 0.5],
  paletteB: [0.5, 0.5, 0.5],
  paletteC: [1.0, 1.0, 1.0],
  paletteD: [0.0, 0.33, 0.67],
  rotationSpeed: 0.1,
  bandFrequency: 20.0,
  bandSpeed: 0.5,
  glowSoftness: 0.1,
  spokeCount: 10.0,
  glowMix: 0.6,
  contrast: 1.8,
  colorCycleSpeed: 0.1,
  depthFrequency: 4.0,
  vignetteStrength: 0.5,
};

/**
 * Preset shader configurations for easy remixing
 */
export const VORTEX_PRESETS: Record<string, ShaderParams> = {
  classic: DEFAULT_SHADER_PARAMS,
  intense: {
    ...DEFAULT_SHADER_PARAMS,
    rotationSpeed: 0.2,
    bandSpeed: 0.8,
    contrast: 2.5,
    colorCycleSpeed: 0.2,
  },
  calm: {
    ...DEFAULT_SHADER_PARAMS,
    rotationSpeed: 0.05,
    bandSpeed: 0.3,
    contrast: 1.4,
    glowSoftness: 0.15,
  },
  neon: {
    ...DEFAULT_SHADER_PARAMS,
    paletteA: [0.5, 0.5, 0.5],
    paletteB: [0.5, 0.5, 0.5],
    paletteC: [2.0, 1.0, 0.0],
    paletteD: [0.5, 0.2, 0.25],
    contrast: 2.2,
  },
  ocean: {
    ...DEFAULT_SHADER_PARAMS,
    paletteA: [0.5, 0.5, 0.5],
    paletteB: [0.5, 0.5, 0.5],
    paletteC: [1.0, 1.0, 0.5],
    paletteD: [0.8, 0.9, 0.3],
    rotationSpeed: 0.08,
    bandFrequency: 15.0,
  },
  fire: {
    ...DEFAULT_SHADER_PARAMS,
    paletteA: [0.5, 0.5, 0.5],
    paletteB: [0.5, 0.5, 0.5],
    paletteC: [1.0, 0.7, 0.4],
    paletteD: [0.0, 0.15, 0.2],
    rotationSpeed: 0.15,
    bandSpeed: 0.7,
  },
};



/* ---------- Enhanced WebGL2 Renderer Class ---------- */
/**
 * High-performance WebGL2 renderer with error handling and optimization
 */
class Renderer {
  canvas: HTMLCanvasElement;
  gl: WebGL2RenderingContext | null;
  program: WebGLProgram | null = null;
  uTime: WebGLUniformLocation | null = null;
  uRes: WebGLUniformLocation | null = null;
  isReady: boolean = false;

  constructor(canvas: HTMLCanvasElement, fragmentSource: string) {
    this.canvas = canvas;
    this.gl = canvas.getContext("webgl2", {
      alpha: true,
      antialias: false, // Disable for performance
      depth: false,
      stencil: false,
      preserveDrawingBuffer: false,
      powerPreference: "high-performance",
    });
    this._init(fragmentSource);
  }

  /**
   * Compile a shader with error handling
   */
  _compile(type: number, src: string): WebGLShader | null {
    const gl = this.gl;
    if (!gl) return null;

    const shader = gl.createShader(type);
    if (!shader) return null;

    gl.shaderSource(shader, src);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const info = gl.getShaderInfoLog(shader);
      console.error("Shader compilation error:", info);
      gl.deleteShader(shader);
      return null;
    }

    return shader;
  }

  /**
   * Initialize the WebGL2 program
   */
  _init(fragmentSource: string): void {
    const gl = this.gl;
    if (!gl) {
      console.error("WebGL2 not supported in this browser");
      return;
    }

    // Standard vertex shader for full-screen quad
    const vertexSrc = `#version 300 es
    precision highp float;
    in vec4 position;
    void main() {
      gl_Position = position;
    }`;

    const vs = this._compile(gl.VERTEX_SHADER, vertexSrc);
    const fs = this._compile(gl.FRAGMENT_SHADER, fragmentSource);

    if (!vs || !fs) {
      console.error("Failed to compile shaders");
      return;
    }

    this.program = gl.createProgram();
    if (!this.program) {
      console.error("Failed to create WebGL program");
      return;
    }

    gl.attachShader(this.program, vs);
    gl.attachShader(this.program, fs);
    gl.linkProgram(this.program);

    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
      const info = gl.getProgramInfoLog(this.program);
      console.error("Program linking error:", info);
      return;
    }

    // Create full-screen quad vertices
    const verts = new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);

    const posLoc = gl.getAttribLocation(this.program, "position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    // Get uniform locations
    this.uTime = gl.getUniformLocation(this.program, "time");
    this.uRes = gl.getUniformLocation(this.program, "resolution");

    this.isReady = true;
  }

  /**
   * Handle canvas resize with device pixel ratio support
   */
  resize(w: number, h: number, quality: "high" | "balanced" | "low" = "balanced"): void {
    let dpr = window.devicePixelRatio || 1;

    // Adjust DPR based on quality setting
    if (quality === "low") dpr = Math.min(dpr, 1);
    if (quality === "balanced") dpr = Math.min(dpr, 2);

    this.canvas.width = w * dpr;
    this.canvas.height = h * dpr;
    this.gl?.viewport(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Render a single frame
   */
  render(timeMs: number): void {
    const gl = this.gl;
    if (!this.program || !gl || !this.isReady) return;

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(this.program);

    // Pass uniforms to shader
    gl.uniform1f(this.uTime, timeMs * 0.001);
    gl.uniform2f(this.uRes, gl.canvas.width, gl.canvas.height);

    // Draw full-screen quad
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  /**
   * Clean up WebGL resources
   */
  dispose(): void {
    if (this.gl && this.program) {
      this.gl.deleteProgram(this.program);
      this.program = null;
    }
  }
}


/* ---------- Main Component ---------- */

/**
 * PsychedelicVortexHero - A professional WebGL2 shader component with a mesmerizing vortex effect
 *
 * Features:
 * - 🎨 Fully customizable shader parameters via props
 * - ⚡ High-performance WebGL2 rendering
 * - 📱 Responsive and mobile-friendly
 * - ♿ Accessible with proper ARIA labels
 * - 🎯 Multiple quality presets for different devices
 * - 🔧 TypeScript type safety
 * - 🎨 6 built-in visual presets
 * - 🚀 Easy to remix and customize
 *
 * @example
 * ```tsx
 * // Basic usage
 * <PsychedelicVortexHero>
 *   <h1>Welcome</h1>
 * </PsychedelicVortexHero>
 *
 * // With custom preset
 * <PsychedelicVortexHero shaderParams={VORTEX_PRESETS.neon}>
 *   <h1>Neon Dreams</h1>
 * </PsychedelicVortexHero>
 *
 * // With custom parameters
 * <PsychedelicVortexHero
 *   shaderParams={{ rotationSpeed: 0.3, contrast: 2.0 }}
 *   quality="high"
 * >
 *   <h1>Custom Effect</h1>
 * </PsychedelicVortexHero>
 * ```
 */
export function PsychedelicVortexHero({
  className,
  children,
  shaderParams,
  animated = true,
  quality = "balanced",
  fallback,
  onReady,
  onError,
}: PsychedelicVortexHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isWebGLSupported, setIsWebGLSupported] = React.useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check WebGL2 support
    const gl = canvas.getContext("webgl2");
    if (!gl) {
      console.warn("WebGL2 is not supported in this browser");
      setTimeout(() => setIsWebGLSupported(false), 0);
      onError?.("WebGL2 not supported");
      return;
    }

    // Merge custom params with defaults
    const finalParams: ShaderParams = {
      ...DEFAULT_SHADER_PARAMS,
      ...shaderParams,
    };

    // Generate shader with custom parameters
    const fragmentShader = createFragmentShader(finalParams);

    try {
      const renderer = new Renderer(canvas, fragmentShader);

      if (!renderer.isReady) {
        console.error("Failed to initialize renderer");
        setTimeout(() => setIsWebGLSupported(false), 0);
        onError?.("Renderer initialization failed");
        return;
      }

      let rafId: number;
      const container = canvas.parentElement;

      /**
       * Handle responsive canvas resizing
       */
      function onResize() {
        if (container) {
          renderer.resize(container.clientWidth, container.clientHeight, quality);
        } else {
          renderer.resize(window.innerWidth, window.innerHeight, quality);
        }
      }

      /**
       * Animation loop
       */
      function animate(time: number) {
        if (animated) {
          renderer.render(time);
          rafId = requestAnimationFrame(animate);
        }
      }

      // Initialize
      onResize();
      if (animated) {
        rafId = requestAnimationFrame(animate);
      } else {
        renderer.render(0);
      }

      // Notify ready
      onReady?.();

      // Setup resize listener
      const resizeObserver = new ResizeObserver(onResize);
      if (container) {
        resizeObserver.observe(container);
      } else {
        window.addEventListener("resize", onResize);
      }

      // Cleanup
      return () => {
        if (rafId) cancelAnimationFrame(rafId);
        resizeObserver.disconnect();
        window.removeEventListener("resize", onResize);
        renderer.dispose();
      };
    } catch (error) {
      console.error("Error initializing WebGL renderer:", error);
      setTimeout(() => setIsWebGLSupported(false), 0);
      onError?.(error instanceof Error ? error.message : "Unknown error");
    }
  }, [shaderParams, animated, quality, onReady, onError]);

  // Render fallback if WebGL2 is not supported
  if (!isWebGLSupported) {
    return (
      <div
        className={cn(
          "relative w-full h-full bg-gradient-to-br from-purple-600 via-pink-500 to-blue-600",
          className
        )}
        role="banner"
        aria-label="Hero section"
      >
        {fallback || children}
      </div>
    );
  }

  return (
    <section
      className={cn("relative w-full h-full overflow-hidden", className)}
      role="banner"
      aria-label="Psychedelic vortex hero section"
    >
      {/* WebGL Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block touch-none"
        aria-hidden="true"
      />

      {/* Content Overlay */}
      {children && (
        <div className="relative z-10 w-full h-full pointer-events-auto">
          {children}
        </div>
      )}
    </section>
  );
}

// Default export for easier importing
export default PsychedelicVortexHero;
