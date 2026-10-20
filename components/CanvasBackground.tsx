"use client";
import React, { useEffect, useRef } from "react";

export default function CanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    let prefersReducedMotion = false;

    // Check prefers-reduced-motion
    if (typeof window !== "undefined") {
      const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      prefersReducedMotion = motionQuery.matches;
      const motionListener = (e: MediaQueryListEvent) => {
        prefersReducedMotion = e.matches;
      };
      motionQuery.addEventListener("change", motionListener);
    }

    let width = 0;
    let height = 0;
    let mouseX = -1000;
    let mouseY = -1000;

    // Resize handler
    const resize = () => {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    // Track mouse
    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener("mousemove", onMouseMove);

    // Visibility change handler (pauses when tab is hidden)
    const onVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible && !prefersReducedMotion) {
        lastTime = performance.now();
        render(lastTime);
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    // Circuit Traces Setup
    interface Trace {
      points: { x: number; y: number }[];
      color: string;
      speed: number;
      pulseOffset: number;
      pulseLength: number;
      pulseColor: string;
    }

    const traces: Trace[] = [];
    const gridSize = 80;
    const cols = Math.ceil(1920 / gridSize) + 2;
    const rows = Math.ceil(1080 / gridSize) + 2;

    for (let i = 0; i < 35; i++) {
      const startCol = Math.floor(Math.random() * cols);
      const startRow = Math.floor(Math.random() * rows);
      let curX = startCol * gridSize;
      let curY = startRow * gridSize;

      const points = [{ x: curX, y: curY }];
      const segments = 3 + Math.floor(Math.random() * 4);

      for (let s = 0; s < segments; s++) {
        const dir = Math.floor(Math.random() * 4);
        const len = (1 + Math.floor(Math.random() * 2)) * gridSize;
        if (dir === 0) curX += len; // right
        else if (dir === 1) curY += len; // down
        else if (dir === 2) {
          // 45 degree jog
          curX += gridSize;
          curY += gridSize;
        } else {
          curX += len;
        }
        points.push({ x: curX, y: curY });
      }

      traces.push({
        points,
        color: "#1E293B",
        speed: 0.0003 + Math.random() * 0.0005,
        pulseOffset: Math.random(),
        pulseLength: 0.15 + Math.random() * 0.15,
        pulseColor: Math.random() > 0.4 ? "#00F2FE" : "#10B981",
      });
    }

    // Silicon Wafer Die Grid
    const drawWaferGrid = () => {
      ctx.strokeStyle = "#131B2E";
      ctx.lineWidth = 0.5;
      const step = 40;

      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    };

    let lastTime = performance.now();

    const render = (now: number) => {
      if (!isVisible) return;

      const dt = now - lastTime;
      lastTime = now;

      // Clear
      ctx.clearRect(0, 0, width, height);

      // 1. Draw wafer die background grid
      drawWaferGrid();

      // 2. Cursor radial ambient glow
      if (mouseX > -500 && mouseY > -500) {
        const glowRadius = 380;
        const radGrad = ctx.createRadialGradient(
          mouseX,
          mouseY,
          10,
          mouseX,
          mouseY,
          glowRadius
        );
        radGrad.addColorStop(0, "rgba(0, 242, 254, 0.08)");
        radGrad.addColorStop(0.5, "rgba(139, 92, 246, 0.03)");
        radGrad.addColorStop(1, "rgba(10, 13, 20, 0)");

        ctx.fillStyle = radGrad;
        ctx.fillRect(0, 0, width, height);
      }

      // 3. Draw circuit traces
      for (const trace of traces) {
        if (!prefersReducedMotion) {
          trace.pulseOffset = (trace.pulseOffset + trace.speed * dt) % 1;
        }

        // Draw static copper wire
        ctx.beginPath();
        ctx.strokeStyle = trace.color;
        ctx.lineWidth = 1;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";

        const pts = trace.points;
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length; i++) {
          ctx.lineTo(pts[i].x, pts[i].y);
        }
        ctx.stroke();

        // Draw circuit solder pads/junctions
        ctx.fillStyle = "#1E293B";
        ctx.beginPath();
        ctx.arc(pts[0].x, pts[0].y, 2.5, 0, Math.PI * 2);
        ctx.arc(pts[pts.length - 1].x, pts[pts.length - 1].y, 2.5, 0, Math.PI * 2);
        ctx.fill();

        // If reduced motion is true, do not draw moving pulse
        if (prefersReducedMotion) continue;

        // Draw moving packet pulse along the polyline
        // Calculate total length
        let totalLen = 0;
        const segLens: number[] = [];
        for (let i = 0; i < pts.length - 1; i++) {
          const dx = pts[i + 1].x - pts[i].x;
          const dy = pts[i + 1].y - pts[i].y;
          const l = Math.sqrt(dx * dx + dy * dy);
          segLens.push(l);
          totalLen += l;
        }

        const headDist = trace.pulseOffset * totalLen;
        const tailDist = Math.max(0, headDist - trace.pulseLength * totalLen);

        // Find position along polyline
        const getPointAtDist = (targetDist: number) => {
          let accumulated = 0;
          for (let i = 0; i < segLens.length; i++) {
            if (accumulated + segLens[i] >= targetDist) {
              const segFraction = (targetDist - accumulated) / segLens[i];
              return {
                x: pts[i].x + (pts[i + 1].x - pts[i].x) * segFraction,
                y: pts[i].y + (pts[i + 1].y - pts[i].y) * segFraction,
              };
            }
            accumulated += segLens[i];
          }
          return pts[pts.length - 1];
        };

        const headPt = getPointAtDist(headDist);
        const tailPt = getPointAtDist(tailDist);

        // Proximity glow to cursor
        const distToMouse = Math.hypot(headPt.x - mouseX, headPt.y - mouseY);
        const proximityBoost = distToMouse < 220 ? (1 - distToMouse / 220) * 0.7 : 0;

        ctx.beginPath();
        ctx.strokeStyle = trace.pulseColor;
        ctx.lineWidth = 1.75 + proximityBoost * 2;
        ctx.shadowColor = trace.pulseColor;
        ctx.shadowBlur = 8 + proximityBoost * 12;

        ctx.moveTo(tailPt.x, tailPt.y);
        ctx.lineTo(headPt.x, headPt.y);
        ctx.stroke();

        ctx.shadowBlur = 0; // reset
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    // First frame
    render(performance.now());

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-10 bg-die"
      aria-hidden="true"
    />
  );
}
