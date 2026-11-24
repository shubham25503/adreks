import React, { useEffect, useRef } from "react";
import { buildHelixRibbonQuads, projectHelixOrbitPoint } from "../../utils/helixGeometry";

const ORBIT_SPHERES = [
  { u: 0.14, r: 52, offsetR: 35, phase: 0 },
  { u: 0.18, r: 24, offsetR: -45, phase: 1.5 },
  { u: 0.38, r: 54, offsetR: -40, phase: 2.2 },
  { u: 0.42, r: 26, offsetR: 50, phase: 3.5 },
  { u: 0.63, r: 50, offsetR: 35, phase: 4.1 },
  { u: 0.67, r: 28, offsetR: -45, phase: 5.2 },
  { u: 0.87, r: 48, offsetR: -35, phase: 1.0 },
  { u: 0.91, r: 22, offsetR: 45, phase: 2.8 },
];

/**
 * Renders the single continuous hollow wireframe 3D helix canvas
 * behind the Growth Helix section.
 */
export function HelixCanvas({ sectionRef, nodes }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const scrollYRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = window.devicePixelRatio || 1;
    const resize = () => {
      if (!section) return;
      dpr = window.devicePixelRatio || 1;
      canvas.width = section.offsetWidth * dpr;
      canvas.height = section.offsetHeight * dpr;
      canvas.style.width = `${section.offsetWidth}px`;
      canvas.style.height = `${section.offsetHeight}px`;
    };
    resize();
    window.addEventListener("resize", resize);

    const onScroll = () => {
      scrollYRef.current = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const onMouseMove = (e) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      mouseRef.current.targetX = nx * 0.35;
      mouseRef.current.targetY = ny * 0.25;
    };
    window.addEventListener("mousemove", onMouseMove);

    let time = 0;

    const render = () => {
      time += 0.016;
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.06;

      const cssW = section.offsetWidth;
      const cssH = section.offsetHeight;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, cssW, cssH);

      const cx = cssW * 0.5;
      const NUM_SEGS = 240;
      const TOTAL_TURNS = 2.5;
      const R_BASE = Math.min(cssW * 0.34, 380);
      const RIBBON_W = Math.min(cssW * 0.16, 150);

      const scrollRotation = scrollYRef.current * 0.0022;
      const baseRotation = scrollRotation + mouseRef.current.x + time * 0.1;
      const rotX = mouseRef.current.y * 0.3;

      const queue = buildHelixRibbonQuads({
        numSegs: NUM_SEGS,
        totalTurns: TOTAL_TURNS,
        height: cssH,
        radius: R_BASE,
        ribbonWidth: RIBBON_W,
        baseRotation,
        rotX,
        cx,
      });

      ORBIT_SPHERES.forEach((sph) => {
        const pt = projectHelixOrbitPoint({
          u: sph.u,
          totalTurns: TOTAL_TURNS,
          radius: R_BASE + sph.offsetR,
          height: cssH,
          baseRotation,
          rotX,
          cx,
          yOffset: Math.sin(time * 2 + sph.phase) * 16,
        });
        queue.push({ type: "sphere", p: pt, r: sph.r * pt.scale, z: pt.z });
      });

      nodes.forEach((node) => {
        const pt = projectHelixOrbitPoint({
          u: node.u,
          totalTurns: TOTAL_TURNS,
          radius: R_BASE,
          height: cssH,
          baseRotation,
          rotX,
          cx,
        });
        queue.push({ type: "node", p: pt, node, z: pt.z });
      });

      queue.sort((a, b) => b.z - a.z);

      queue.forEach((item) => {
        if (item.type === "quad") {
          const isFront = item.p0.z < 0;
          const depthAlpha = Math.max(0.2, Math.min(0.95, (item.z + 500) / 1000));

          ctx.beginPath();
          ctx.moveTo(item.p0.x, item.p0.y);
          ctx.lineTo(item.p1.x, item.p1.y);
          ctx.lineTo(item.p2.x, item.p2.y);
          ctx.lineTo(item.p3.x, item.p3.y);
          ctx.closePath();
          ctx.fillStyle = isFront
            ? `rgba(181, 0, 255, ${0.035 * depthAlpha})`
            : `rgba(147, 51, 234, ${0.015 * depthAlpha})`;
          ctx.fill();

          ctx.beginPath();
          ctx.moveTo(item.p0.x, item.p0.y);
          ctx.lineTo(item.p3.x, item.p3.y);
          ctx.strokeStyle = isFront
            ? `rgba(147, 51, 234, ${0.55 * depthAlpha})`
            : `rgba(181, 0, 255, ${0.28 * depthAlpha})`;
          ctx.lineWidth = isFront ? 1.0 : 0.65;
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(item.p0.x, item.p0.y);
          ctx.lineTo(item.p1.x, item.p1.y);
          ctx.moveTo(item.p3.x, item.p3.y);
          ctx.lineTo(item.p2.x, item.p2.y);
          ctx.strokeStyle = isFront
            ? `rgba(124, 58, 237, ${0.92 * depthAlpha})`
            : `rgba(168, 85, 247, ${0.52 * depthAlpha})`;
          ctx.lineWidth = isFront ? 1.9 : 1.1;
          ctx.stroke();
        } else if (item.type === "sphere") {
          const rad = Math.max(6, item.r);

          ctx.beginPath();
          ctx.arc(item.p.x, item.p.y, rad, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(124, 58, 237, 0.55)";
          ctx.lineWidth = 1.3;
          ctx.fillStyle = "rgba(181, 0, 255, 0.03)";
          ctx.fill();
          ctx.stroke();

          ctx.beginPath();
          ctx.ellipse(item.p.x, item.p.y, rad, rad * 0.38, Math.PI / 4, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(181, 0, 255, 0.45)";
          ctx.lineWidth = 1;
          ctx.stroke();

          ctx.beginPath();
          ctx.ellipse(item.p.x, item.p.y, rad, rad * 0.38, -Math.PI / 4, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(168, 85, 247, 0.35)";
          ctx.lineWidth = 0.8;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(item.p.x, item.p.y, 2.5 * item.p.scale, 0, Math.PI * 2);
          ctx.fillStyle = "#b500ff";
          ctx.fill();
        } else if (item.type === "node") {
          const { p, node } = item;
          const nodeRad = 28 * p.scale;

          ctx.beginPath();
          ctx.arc(p.x, p.y, nodeRad + 12 + Math.sin(time * 3) * 3, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(181, 0, 255, 0.4)";
          ctx.lineWidth = 1.6;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(p.x, p.y, nodeRad, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
          ctx.fill();

          ctx.strokeStyle = "#b500ff";
          ctx.lineWidth = 2.2;
          ctx.stroke();

          ctx.font = `700 ${Math.round(12 * p.scale)}px "DM Mono", monospace`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = "#161515";
          ctx.fillText(node.acronym, p.x, p.y + 0.5);
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
  }, [sectionRef, nodes]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
      }}
      aria-hidden="true"
    />
  );
}
