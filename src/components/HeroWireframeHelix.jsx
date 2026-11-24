import React, { useEffect, useRef } from "react";
import { buildHelixRibbonQuads, projectHelixOrbitPoint } from "../utils/helixGeometry";

/**
 * HeroWireframeHelix:
 * Renders the top portion of the single continuous 3D helix in the Hero background
 * as an elegant, low-contrast architectural outline / wireframe ribbon.
 * As the user scrolls into the Growth Helix section below, this outline seamlessly
 * transitions into the solid, metallic sculptural ribbon.
 */
export function HeroWireframeHelix() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const scrollYRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = window.devicePixelRatio || 1;
    let width = 0;
    let height = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      dpr = window.devicePixelRatio || 1;
      width = parent.offsetWidth;
      height = parent.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };
    resize();
    window.addEventListener("resize", resize);

    // Scroll tracking: perfectly matches the solid helix rotation below
    const onScroll = () => {
      scrollYRef.current = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Mouse parallax
    const onMouseMove = (e) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      mouseRef.current.targetX = nx * 0.35;
      mouseRef.current.targetY = ny * 0.25;
    };
    window.addEventListener("mousemove", onMouseMove);

    // Wireframe floating spheres (holographic orbital rings)
    const wireframeSpheres = [
      { u: 0.25, r: 42, offsetR: 35, phase: 0 },
      { u: 0.55, r: 48, offsetR: -45, phase: 2.1 },
      { u: 0.82, r: 34, offsetR: 40, phase: 4.2 },
    ];

    let time = 0;

    const render = () => {
      time += 0.016;

      // Mouse damping
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.06;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const cx = width * 0.5;
      const NUM_SEGS = 180;
      const TOTAL_TURNS = 2.0;
      const R_BASE = Math.min(width * 0.36, 420);
      const RIBBON_W = Math.min(width * 0.14, 130);

      // Scroll-driven rotation (identical speed & direction as HelicalMethod)
      const scrollRotation = scrollYRef.current * 0.0022;
      const baseRotation = scrollRotation + mouseRef.current.x + time * 0.1;
      const rotX = mouseRef.current.y * 0.3;

      const queue = buildHelixRibbonQuads({
        numSegs: NUM_SEGS,
        totalTurns: TOTAL_TURNS,
        height,
        radius: R_BASE,
        ribbonWidth: RIBBON_W,
        baseRotation,
        rotX,
        cx,
      });

      // 2. Add Wireframe Floating Spheres
      wireframeSpheres.forEach((sph) => {
        const pt = projectHelixOrbitPoint({
          u: sph.u,
          totalTurns: TOTAL_TURNS,
          radius: R_BASE + sph.offsetR,
          height,
          baseRotation,
          rotX,
          cx,
          yOffset: Math.sin(time * 2 + sph.phase) * 14,
        });

        queue.push({
          type: "wire-sphere",
          p: pt,
          r: sph.r * pt.scale,
          z: pt.z,
        });
      });

      // 3. Depth Sorting
      queue.sort((a, b) => b.z - a.z);

      // 4. Render OUTLINE / WIREFRAME STROKES ONLY (Low contrast, blueprint aesthetic)
      queue.forEach((item) => {
        if (item.type === "quad") {
          ctx.beginPath();
          ctx.moveTo(item.p0.x, item.p0.y);
          ctx.lineTo(item.p1.x, item.p1.y);
          ctx.lineTo(item.p2.x, item.p2.y);
          ctx.lineTo(item.p3.x, item.p3.y);
          ctx.closePath();

          const isFront = item.p0.z < 0;
          const depthAlpha = Math.max(0.15, Math.min(0.85, (item.z + 500) / 1000));

          // Pure hollow glass interior throughout
          ctx.fillStyle = `rgba(139, 92, 246, ${0.02 * depthAlpha})`;
          ctx.fill();

          // Outlines: Refined architectural stroke
          const strokeAlpha = isFront ? 0.45 : 0.22;

          ctx.strokeStyle = isFront
            ? `rgba(221, 214, 254, ${strokeAlpha * depthAlpha})`
            : `rgba(147, 51, 234, ${strokeAlpha * depthAlpha})`;
          ctx.lineWidth = isFront ? 1.4 : 0.8;
          ctx.stroke();

          // Architectural cross-rib line
          if (item.isRib) {
            ctx.beginPath();
            ctx.moveTo(item.p0.x, item.p0.y);
            ctx.lineTo(item.p3.x, item.p3.y);
            ctx.strokeStyle = `rgba(196, 181, 253, ${0.18 * depthAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        } else if (item.type === "wire-sphere") {
          // Holographic wireframe orbital rings
          const rad = Math.max(6, item.r);

          // Outer circle
          ctx.beginPath();
          ctx.arc(item.p.x, item.p.y, rad, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(196, 181, 253, 0.25)";
          ctx.lineWidth = 1;
          ctx.stroke();

          // Tilted orbital ellipse
          ctx.beginPath();
          ctx.ellipse(item.p.x, item.p.y, rad, rad * 0.4, Math.PI / 4, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(167, 139, 250, 0.2)";
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      });

      ctx.restore();
      animRef.current = requestAnimationFrame(render);
    };

    animRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
      aria-hidden="true"
    />
  );
}
