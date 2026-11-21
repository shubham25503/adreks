import React, { useEffect, useRef, useState } from "react";
import { delay, RollText, SectionLabel } from "./Primitives";

const NODES = [
  {
    key: "AD",
    index: "01",
    acronym: "AD",
    tag: "THE FOUNDATION",
    title: "Advertising & Design",
    meaning: "Brand Architecture & Visual Authority",
    headline: "Make your brand impossible to ignore.",
    description:
      "Every lasting customer relationship begins with visual authority. We craft distinctive identities, campaign systems, and high-conversion design that immediately separate ambitious brands from industry noise.",
    deliverables: [
      "Visual Identity Systems & Brand Guidelines",
      "Campaign Art Direction & Creative Strategy",
      "High-Impact Digital & Social Ad Formats",
      "Print, Packaging & Out-of-Home Collateral",
    ],
    accent: "#a78bfa",
    accentLight: "rgba(167, 139, 250, 0.15)",
    isAcidLime: false,
    textPosition: "right", // Helix curves LEFT, text on RIGHT
    u: 0.15,
  },
  {
    key: "RE",
    index: "02",
    acronym: "RE",
    tag: "THE DISTRIBUTION",
    title: "Reach & Engagement",
    meaning: "Audience Acquisition & Community",
    headline: "Creative without reach is completely invisible.",
    description:
      "Compelling design only generates business when placed in front of qualified eyes. We deploy precision multi-channel distribution across paid social, search, and content loops to build active momentum from day one.",
    deliverables: [
      "Paid Acquisition (Meta, Google, YouTube)",
      "Targeted Audience Architecture & Retargeting",
      "Organic Social Momentum & Content Cadence",
      "Community Building & High-Trust Engagement",
    ],
    accent: "#c084fc",
    accentLight: "rgba(192, 132, 252, 0.15)",
    isAcidLime: false,
    textPosition: "left", // Helix curves RIGHT, text on LEFT
    u: 0.40,
  },
  {
    key: "X",
    index: "03",
    acronym: "X",
    tag: "THE CATALYST",
    title: "The Multiplier",
    meaning: "eXperience & Conversion Acceleration",
    headline: "The X-Factor that turns clicks into compounding revenue.",
    description:
      "X is the multiplier in the ADREXKS formula. We eliminate friction across digital landing pages, conversion funnels, and customer journeys so every dollar of ad spend yields compounding returns.",
    deliverables: [
      "High-Conversion Landing Pages & Funnels",
      "Frictionless User Journeys & UX Design",
      "Conversion Rate Optimisation (CRO) Testing",
      "Interactive Digital Brand Touchpoints",
    ],
    accent: "#c084fc",
    accentLight: "rgba(192, 132, 252, 0.15)",
    textPosition: "right", // Helix curves LEFT, text on RIGHT
    u: 0.65,
  },
  {
    key: "KS",
    index: "04",
    acronym: "KS",
    tag: "THE COMPOUND",
    title: "Keep Scaling",
    meaning: "Sustainable Performance & Category Scale",
    headline: "Growth is an ongoing scientific discipline.",
    description:
      "Launch day is only the start of the journey. We continuously analyse performance data, iterate creative angles, expand proven marketing channels, and build retention systems to help brands dominate their space.",
    deliverables: [
      "Weekly Creative Testing & Angle Iteration",
      "Budget Scaling & ROAS Optimisation",
      "Customer Retention, LTV & Loyalty Loops",
      "Quarterly Market Expansion Strategy",
    ],
    accent: "#ddd6fe",
    accentLight: "rgba(221, 214, 254, 0.15)",
    textPosition: "left", // Helix curves RIGHT, text on LEFT
    u: 0.89,
  },
];

export function HelicalMethod() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const scrollYRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Single Background 3D Helix Canvas spanning the entire section
  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = window.devicePixelRatio || 1;
    let width = (canvas.width = section.offsetWidth * dpr);
    let height = (canvas.height = section.offsetHeight * dpr);
    canvas.style.width = `${section.offsetWidth}px`;
    canvas.style.height = `${section.offsetHeight}px`;

    const resize = () => {
      if (!section) return;
      dpr = window.devicePixelRatio || 1;
      width = canvas.width = section.offsetWidth * dpr;
      height = canvas.height = section.offsetHeight * dpr;
      canvas.style.width = `${section.offsetWidth}px`;
      canvas.style.height = `${section.offsetHeight}px`;
    };
    window.addEventListener("resize", resize);

    // Track page scroll to continuously rotate the single background helix
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

    // Floating chrome purple spheres placed along the single helix
    const spheres = [
      { u: 0.14, r: 52, offsetR: 35, phase: 0 }, // Near Node 1 (AD)
      { u: 0.18, r: 24, offsetR: -45, phase: 1.5 },
      { u: 0.38, r: 54, offsetR: -40, phase: 2.2 }, // Near Node 2 (RE)
      { u: 0.42, r: 26, offsetR: 50, phase: 3.5 },
      { u: 0.63, r: 50, offsetR: 35, phase: 4.1 }, // Near Node 3 (X)
      { u: 0.67, r: 28, offsetR: -45, phase: 5.2 },
      { u: 0.87, r: 48, offsetR: -35, phase: 1.0 }, // Near Node 4 (KS)
      { u: 0.91, r: 22, offsetR: 45, phase: 2.8 },
    ];

    let time = 0;

    const render = () => {
      time += 0.016;

      // Damped mouse movement
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.06;

      const cssW = section.offsetWidth;
      const cssH = section.offsetHeight;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, cssW, cssH);

      const cx = cssW * 0.5;
      const d = 600; // 3D Perspective distance

      // Single continuous helix configuration
      const NUM_SEGS = 240;
      const TOTAL_TURNS = 4.0; // 4 full loops down the section
      const R_BASE = Math.min(cssW * 0.38, 420); // Wide amplitude so it curves left and right!
      const RIBBON_W = Math.min(cssW * 0.10, 88); // Thick strips!

      // Scroll-driven rotation: as user scrolls down, helix rotates continuously!
      const scrollRotation = scrollYRef.current * 0.0022;
      const baseRotation = scrollRotation + mouseRef.current.x + time * 0.1;
      const rotX = mouseRef.current.y * 0.3;

      const queue = [];

      // 1. Generate the SINGLE continuous thick helical ribbon quads
      for (let i = 0; i < NUM_SEGS; i++) {
        const u0 = i / NUM_SEGS;
        const u1 = (i + 1) / NUM_SEGS;

        const theta0 = u0 * TOTAL_TURNS * Math.PI * 2 + baseRotation;
        const theta1 = u1 * TOTAL_TURNS * Math.PI * 2 + baseRotation;

        // Vertical position runs down the entire section
        const y0 = u0 * cssH;
        const y1 = u1 * cssH;

        // Constant uniform radius for a geometrically perfect helix
        const r0 = R_BASE;
        const r1 = R_BASE;

        const xCenter0 = r0 * Math.cos(theta0);
        const zCenter0 = r0 * Math.sin(theta0);
        const xCenter1 = r1 * Math.cos(theta1);
        const zCenter1 = r1 * Math.sin(theta1);

        const cosT0 = Math.cos(theta0);
        const sinT0 = Math.sin(theta0);
        const cosT1 = Math.cos(theta1);
        const sinT1 = Math.sin(theta1);

        const halfW = RIBBON_W * 0.5;

        // Project 3D points
        const proj = (x, y, z) => {
          const yRot = y * Math.cos(rotX) - z * Math.sin(rotX);
          const zRot = y * Math.sin(rotX) + z * Math.cos(rotX);
          const scale = d / (d + zRot + 400);
          return {
            x: cx + x * scale,
            y: y, // Vertical position pinned to section scroll
            z: zRot,
            scale,
          };
        };

        const pL0 = proj(xCenter0 - sinT0 * halfW, y0, zCenter0 + cosT0 * halfW);
        const pL1 = proj(xCenter1 - sinT1 * halfW, y1, zCenter1 + cosT1 * halfW);
        const pR0 = proj(xCenter0 + sinT0 * halfW, y0, zCenter0 - cosT0 * halfW);
        const pR1 = proj(xCenter1 + sinT1 * halfW, y1, zCenter1 - cosT1 * halfW);

        const avgZ = (pL0.z + pL1.z + pR0.z + pR1.z) / 4;

        queue.push({
          type: "quad",
          p0: pL0,
          p1: pL1,
          p2: pR1,
          p3: pR0,
          z: avgZ,
          u: u0,
        });
      }

      // 2. Add Floating Chrome Spheres along the single helix
      spheres.forEach((sph) => {
        const u = sph.u;
        const theta = u * TOTAL_TURNS * Math.PI * 2 + baseRotation;
        const r = R_BASE + sph.offsetR;
        const x = r * Math.cos(theta);
        const z = r * Math.sin(theta);
        const y = u * cssH + Math.sin(time * 2 + sph.phase) * 16;

        const yRot = y * Math.cos(rotX) - z * Math.sin(rotX);
        const zRot = y * Math.sin(rotX) + z * Math.cos(rotX);
        const scale = d / (d + zRot + 400);

        queue.push({
          type: "sphere",
          p: { x: cx + x * scale, y: y, scale },
          r: sph.r * scale,
          z: zRot,
          isAcidLime: sph.isAcidLime,
        });
      });

      // 3. Add 4 Milestone Nodes sitting DIRECTLY ON THE HELIX
      NODES.forEach((node, nIdx) => {
        const u = node.u;
        const theta = u * TOTAL_TURNS * Math.PI * 2 + baseRotation;
        const r = R_BASE;
        const x = r * Math.cos(theta);
        const z = r * Math.sin(theta);
        const y = u * cssH;

        const yRot = y * Math.cos(rotX) - z * Math.sin(rotX);
        const zRot = y * Math.sin(rotX) + z * Math.cos(rotX);
        const scale = d / (d + zRot + 400);

        queue.push({
          type: "node",
          p: { x: cx + x * scale, y: y, scale },
          node,
          z: zRot,
        });
      });

      // 4. Depth Sorting (Painter's algorithm)
      queue.sort((a, b) => b.z - a.z);

      // 5. Draw elements
      queue.forEach((item) => {
        if (item.type === "quad") {
          ctx.beginPath();
          ctx.moveTo(item.p0.x, item.p0.y);
          ctx.lineTo(item.p1.x, item.p1.y);
          ctx.lineTo(item.p2.x, item.p2.y);
          ctx.lineTo(item.p3.x, item.p3.y);
          ctx.closePath();

          const isFront = item.p0.z < 0;
          const depthAlpha = Math.max(0.2, Math.min(0.95, (item.z + 500) / 1000));

          if (isFront) {
            // Front side: Thick glossy metallic purple exterior (identical & consistent throughout)
            const grad = ctx.createLinearGradient(item.p0.x, item.p0.y, item.p2.x, item.p2.y);
            grad.addColorStop(0, "#7c3aed");
            grad.addColorStop(0.35, "#a855f7");
            grad.addColorStop(0.7, "#c084fc");
            grad.addColorStop(1, "#581c87");
            ctx.fillStyle = grad;
          } else {
            // Back/inside side: Silky silver-lavender satin interior
            const grad = ctx.createLinearGradient(item.p0.x, item.p0.y, item.p2.x, item.p2.y);
            grad.addColorStop(0, `rgba(221, 214, 254, ${0.85 * depthAlpha})`);
            grad.addColorStop(0.5, `rgba(196, 181, 253, ${0.75 * depthAlpha})`);
            grad.addColorStop(1, `rgba(109, 40, 217, ${0.65 * depthAlpha})`);
            ctx.fillStyle = grad;
          }

          ctx.fill();

          // Highlight outer spine edge
          ctx.strokeStyle = isFront
            ? `rgba(243, 232, 255, ${0.35 * depthAlpha})`
            : "rgba(139, 92, 246, 0.12)";
          ctx.lineWidth = isFront ? 1.5 : 0.8;
          ctx.stroke();
        } else if (item.type === "sphere") {
          // Draw metallic chrome purple spheres (identical throughout)
          const rad = Math.max(6, item.r);
          const grad = ctx.createRadialGradient(
            item.p.x - rad * 0.35,
            item.p.y - rad * 0.35,
            rad * 0.08,
            item.p.x,
            item.p.y,
            rad
          );

          grad.addColorStop(0, "#ffffff");
          grad.addColorStop(0.25, "#ede9fe");
          grad.addColorStop(0.55, "#a855f7");
          grad.addColorStop(0.85, "#6b21a8");
          grad.addColorStop(1, "#120224");

          ctx.beginPath();
          ctx.arc(item.p.x, item.p.y, rad, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();

          ctx.strokeStyle = "rgba(233, 213, 255, 0.45)";
          ctx.lineWidth = 1;
          ctx.stroke();
        } else if (item.type === "node") {
          // 3D Station Node sitting directly on the helix
          const { p, node } = item;
          const nodeRad = 28 * p.scale;

          // Glowing pulse ring
          ctx.beginPath();
          ctx.arc(p.x, p.y, nodeRad + 12 + Math.sin(time * 3) * 3, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(167, 139, 250, 0.55)";
          ctx.lineWidth = 2;
          ctx.stroke();

          // Main node circle
          ctx.beginPath();
          ctx.arc(p.x, p.y, nodeRad, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(22, 5, 38, 0.95)";
          ctx.fill();

          ctx.strokeStyle = "var(--brand-bright, #a78bfa)";
          ctx.lineWidth = 2.5;
          ctx.stroke();

          // Text label inside node
          ctx.font = `700 ${Math.round(12 * p.scale)}px "DM Mono", monospace`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = "#ffffff";
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
  }, []);

  return (
    <section
      ref={sectionRef}
      id="method"
      style={{
        paddingTop: "clamp(90px, 12vw, 150px)",
        paddingBottom: "clamp(100px, 14vw, 170px)",
        position: "relative",
        background: "var(--bg-deep)",
        overflow: "hidden",
      }}
    >
      {/* THE SINGLE 3D HELIX IN THE BACKGROUND */}
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

      {/* FOREGROUND CONTENT: Words alternating Right, Left, Right, Left */}
      <div className="container-custom" style={{ position: "relative", zIndex: 2 }}>
        {/* Master Header */}
        <div style={{ marginBottom: "clamp(60px, 10vw, 120px)" }}>
          <SectionLabel index="01">The Growth Helix</SectionLabel>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 0.8fr",
              gap: "32px",
              alignItems: "flex-end",
              marginTop: "20px",
            }}
            className="helix-intro-grid"
          >
            <div>
              <RollText
                as="h2"
                className="font-display"
                emClassName="serif-em"
                style={{
                  fontSize: "clamp(2.5rem, 5.2vw, 5.2rem)",
                  color: "#ffffff",
                  lineHeight: 1.05,
                  letterSpacing: "-0.04em",
                }}
                parts={["The name is our blueprint.", { em: "From vision to scale." }]}
              />
            </div>
            <div>
              <p
                style={{
                  fontSize: "1.05rem",
                  lineHeight: 1.7,
                  color: "rgba(248, 247, 251, 0.75)",
                  margin: 0,
                }}
              >
                ADREXKS is a single continuous growth helix. As you scroll, the thick background ribbon rotates and twists through all four phases, seamlessly linking creative vision to sustainable scale.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Alternating Chapters: Right, Left, Right, Left */}
        <div style={{ display: "grid", gap: "clamp(120px, 18vh, 220px)" }}>
          {NODES.map((node) => {
            const isTextOnRight = node.textPosition === "right";

            return (
              <div
                key={node.key}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "clamp(40px, 6vw, 90px)",
                  alignItems: "center",
                }}
                className={isTextOnRight ? "node-row-right" : "node-row-left"}
              >
                {/* When Text is on RIGHT: Left side is empty for the background helix */}
                {isTextOnRight ? (
                  <>
                    {/* Helix visible in the BG on the LEFT */}
                    <div style={{ minHeight: "280px" }} className="empty-helix-space" />

                    {/* Content on the RIGHT */}
                    <div>
                      <NodeContentCard node={node} />
                    </div>
                  </>
                ) : (
                  <>
                    {/* Content on the LEFT */}
                    <div>
                      <NodeContentCard node={node} />
                    </div>

                    {/* Helix visible in the BG on the RIGHT */}
                    <div style={{ minHeight: "280px" }} className="empty-helix-space" />
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .helix-intro-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .node-row-right,
          .node-row-left {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .empty-helix-space {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}

/**
 * Foreground Content Card with frosted glass styling so the background 3D helix is visible behind it
 */
function NodeContentCard({ node }) {
  return (
    <div
      style={{
        background: "rgba(14, 3, 26, 0.78)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: node.isAcidLime
          ? "1px solid rgba(214, 255, 117, 0.35)"
          : "1px solid rgba(139, 92, 246, 0.24)",
        borderRadius: "2.2rem",
        padding: "clamp(28px, 4vw, 44px)",
        boxShadow: "0 30px 80px -20px rgba(0, 0, 0, 0.9)",
        position: "relative",
      }}
    >
      {/* Node Eyebrow Pill */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "10px",
          padding: "6px 14px",
          borderRadius: "9999px",
          background: node.accentLight,
          border: `1px solid ${node.isAcidLime ? "rgba(214, 255, 117, 0.35)" : "rgba(168, 85, 247, 0.25)"}`,
          marginBottom: "18px",
        }}
      >
        <span
          style={{
            width: "7px",
            height: "7px",
            borderRadius: "50%",
            background: node.isAcidLime ? "var(--acid-lime)" : "var(--brand-bright)",
            boxShadow: node.isAcidLime
              ? "0 0 10px rgba(214, 255, 117, 0.8)"
              : "0 0 10px rgba(168, 85, 247, 0.8)",
          }}
        />
        <span
          className="label-mono font-mono"
          style={{
            color: node.isAcidLime ? "var(--acid-lime)" : "var(--paper)",
            fontWeight: 600,
            fontSize: "0.72rem",
          }}
        >
          PHASE {node.index} / 04 · {node.tag}
        </span>
      </div>

      {/* Giant Title */}
      <h3
        className="font-display"
        style={{
          fontSize: "clamp(2rem, 3.4vw, 3rem)",
          color: "#ffffff",
          lineHeight: 1.1,
          letterSpacing: "-0.035em",
          margin: "0 0 12px",
        }}
      >
        {node.acronym}:{" "}
        <span
          style={{
            color: node.isAcidLime ? "var(--acid-lime)" : "var(--lavender)",
            fontWeight: 400,
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontStyle: "italic",
          }}
        >
          {node.title}
        </span>
      </h3>

      {/* Meaning Subtitle */}
      <p
        style={{
          fontSize: "1.05rem",
          color: "rgba(248, 247, 251, 0.9)",
          fontWeight: 500,
          marginBottom: "14px",
        }}
      >
        {node.meaning}
      </p>

      {/* Headline & Description */}
      <p
        style={{
          fontSize: "0.98rem",
          color: node.isAcidLime ? "var(--acid-lime)" : "var(--lavender)",
          fontWeight: 600,
          marginBottom: "10px",
        }}
      >
        {node.headline}
      </p>
      <p
        style={{
          fontSize: "0.95rem",
          lineHeight: 1.7,
          color: "rgba(248, 247, 251, 0.72)",
          marginBottom: "24px",
        }}
      >
        {node.description}
      </p>

      {/* Deliverables Checklist */}
      <div
        style={{
          background: "rgba(10, 2, 18, 0.6)",
          border: node.isAcidLime
            ? "1px solid rgba(214, 255, 117, 0.22)"
            : "1px solid rgba(139, 92, 246, 0.16)",
          borderRadius: "1.2rem",
          padding: "18px 22px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "10px 16px",
        }}
        className="deliverables-grid"
      >
        {node.deliverables.map((item) => (
          <div
            key={item}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "8px",
              fontSize: "0.84rem",
              color: "rgba(248, 246, 252, 0.85)",
              lineHeight: 1.4,
            }}
          >
            <span
              style={{
                color: node.isAcidLime ? "var(--acid-lime)" : "var(--brand-bright)",
                fontSize: "0.95rem",
                fontWeight: 700,
                lineHeight: 1.1,
              }}
            >
              ✓
            </span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
