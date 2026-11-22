import React, { useEffect, useRef } from "react";
import { delay } from "./Primitives";
import { Link } from "./Router";
import { HeroWireframeHelix } from "./HeroWireframeHelix";

function useTilt() {
  const wrap = useRef(null);
  const card = useRef(null);

  useEffect(() => {
    const w = wrap.current;
    const c = card.current;
    if (!w || !c) return;

    const ok =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!ok) return;

    const move = (e) => {
      const r = w.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      c.style.transform = `rotateY(${x * 12}deg) rotateX(${-y * 10}deg) translateZ(0)`;
      w.style.setProperty("--px", `${x * 18}px`);
      w.style.setProperty("--py", `${y * 18}px`);
    };

    const leave = () => {
      c.style.transform = "";
      w.style.setProperty("--px", "0px");
      w.style.setProperty("--py", "0px");
    };

    w.addEventListener("mousemove", move);
    w.addEventListener("mouseleave", leave);
    return () => {
      w.removeEventListener("mousemove", move);
      w.removeEventListener("mouseleave", leave);
    };
  }, []);

  return { wrap, card };
}

export function Hero() {
  const { wrap, card } = useTilt();

  return (
    <section
      id="top"
      className="purple-gradient-bg"
      style={{
        position: "relative",
        isolation: "isolate",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        paddingTop: "clamp(120px, 14vw, 160px)",
        paddingBottom: "clamp(60px, 8vw, 100px)",
        overflow: "hidden",
      }}
    >
      {/* Background grid lines */}
      <div
        className="grid-lines"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: -2,
          maskImage: "linear-gradient(to bottom, black 30%, transparent 88%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 30%, transparent 88%)",
        }}
      />

      {/* Outlined wireframe helix continuing seamlessly into the solid helix below */}
      <HeroWireframeHelix />

      {/* Deep ambient radial light (matte & soft, no neon) */}
      <div
        className="glow-brand"
        style={{
          position: "absolute",
          right: "-5%",
          top: "10%",
          width: "50vmax",
          height: "50vmax",
          opacity: 0.25,
          zIndex: -2,
        }}
      />

      {/* Orbit ring with clean satellite marker */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          right: "-8vmax",
          top: "45%",
          transform: "translateY(-50%)",
          width: "68vmax",
          height: "68vmax",
          borderRadius: "50%",
          border: "1px solid rgba(139, 92, 246, 0.06)",
          zIndex: -2,
          pointerEvents: "none",
        }}
      >
        <div style={{ position: "absolute", inset: 0, animation: "spin-slow 44s linear infinite" }}>
          <span
            style={{
              position: "absolute",
              left: "50%",
              top: "-4px",
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              background: "var(--lavender)",
              opacity: 0.7,
            }}
          />
        </div>
      </div>

      {/* Background Watermark in Bottom Left, translating Left to Right on scroll */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "clamp(12px, 2.5vw, 44px)",
          left: "clamp(24px, 4.5vw, 72px)",
          pointerEvents: "none",
          zIndex: 0,
          overflow: "visible",
          userSelect: "none",
        }}
      >
        <div
          data-parallax-lr="0.16"
          className="watermark"
          style={{
            textAlign: "left",
            fontSize: "clamp(5.5rem, 17vw, 16.5rem)",
            color: "rgba(248, 247, 251, 0.022)",
            WebkitTextStroke: "1px rgba(168, 85, 247, 0.12)",
            lineHeight: 0.85,
            letterSpacing: "-0.05em",
            willChange: "transform",
          }}
        >
          ADREXKS
        </div>
      </div>

      {/* Main Container */}
      <div className="container-custom" style={{ width: "100%", zIndex: 2 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.15fr 1fr",
            gap: "clamp(30px, 5vw, 70px)",
            alignItems: "center",
          }}
          className="hero-grid"
        >
          {/* Left Column: Headline & Value Prop */}
          <div>
            {/* Clean studio badge */}
            <div
              className="hero-fade label-mono"
              style={{
                ...delay(120),
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "8px 18px",
                borderRadius: "9999px",
                background: "rgba(18, 5, 30, 0.8)",
                border: "1px solid rgba(139, 92, 246, 0.2)",
                color: "var(--paper)",
                marginBottom: "28px",
              }}
            >
              <span
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: "var(--acid-lime, #D6FF75)",
                  boxShadow: "0 0 10px rgba(214, 255, 117, 0.6)",
                }}
              />
              <span>Independent Digital & Creative Agency</span>
              <span style={{ color: "rgba(248, 247, 251, 0.35)" }}>· Ahmedabad</span>
            </div>

            {/* Main Headline */}
            <h1
              className="font-display"
              style={{
                fontSize: "clamp(2.8rem, 6.2vw, 6.6rem)",
                lineHeight: 1.02,
                color: "#ffffff",
                letterSpacing: "-0.045em",
                margin: 0,
              }}
            >
              <span className="hero-line">
                <span style={delay(100)}>Make your brand</span>
              </span>
              <span className="hero-line">
                <span className="serif-em" style={{ ...delay(220), color: "#ddd6fe" }}>
                  impossible
                </span>
              </span>
              <span className="hero-line">
                <span style={delay(340)} className="text-gradient-purple">
                  to overlook.
                </span>
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className="hero-fade"
              style={{
                ...delay(500),
                marginTop: "24px",
                maxWidth: "540px",
                fontSize: "clamp(1rem, 1.3vw, 1.15rem)",
                lineHeight: 1.7,
                color: "rgba(248, 247, 251, 0.72)",
              }}
            >
              We bring strategy, creative and performance marketing together to help ambitious businesses get noticed, earn attention and grow.
            </p>

            {/* CTAs */}
            <div
              className="hero-fade"
              style={{
                ...delay(650),
                marginTop: "36px",
                display: "flex",
                flexWrap: "wrap",
                gap: "14px",
                alignItems: "center",
              }}
            >
              <Link to="/contact" className="btn-primary" data-magnetic>
                Start a project <span aria-hidden="true">↗</span>
              </Link>
              <Link to="/work" className="btn-secondary" data-magnetic>
                Explore our work
              </Link>
            </div>

            {/* Founder link pill */}
            <div
              className="hero-fade"
              style={{
                ...delay(800),
                marginTop: "44px",
                display: "inline-flex",
                alignItems: "center",
                gap: "14px",
                padding: "8px 16px",
                borderRadius: "9999px",
                background: "rgba(18, 5, 30, 0.6)",
                border: "1px solid rgba(139, 92, 246, 0.15)",
              }}
            >
              <img
                src="/assets/kavan-desai.webp"
                alt="Kavan Desai"
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
              <Link to="/studio" style={{ textDecoration: "none", display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#fff" }}>
                  Kavan Desai ↗
                </span>
                <span className="label-mono" style={{ fontSize: "0.6rem", color: "var(--brand-bright)" }}>
                  Founder & Creative Strategist
                </span>
              </Link>
            </div>
          </div>

          {/* Right Column: Studio Visual Card with Floating Positioning & Location Badges */}
          <div className="hero-fade hero-visual-card-col" style={{ ...delay(450), position: "relative" }}>
            <div
              ref={wrap}
              style={{
                position: "relative",
                maxWidth: "530px",
                margin: "0 auto",
                perspective: "1200px",
              }}
            >
              {/* Rotating Circular Ideas Into Impact Badge (Top Right) */}
              <div className="hero-stamp-badge">
                <div style={{ animation: "spin-slow 24s linear infinite" }}>
                  <svg viewBox="0 0 100 100" width="86" height="86" style={{ overflow: "visible" }}>
                    <defs>
                      <path
                        id="hero-stamp-circle"
                        d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                      />
                    </defs>
                    <text
                      fill="rgba(248, 247, 251, 0.72)"
                      fontSize="8.2"
                      fontFamily="'DM Sans', sans-serif"
                      letterSpacing="0.22em"
                      style={{ textTransform: "uppercase", fontWeight: 600 }}
                    >
                      <textPath xlinkHref="#hero-stamp-circle" href="#hero-stamp-circle" startOffset="0%">
                        · IDEAS INTO IMPACT · ADREXKS
                      </textPath>
                    </text>
                    <path
                      d="M50 38 C51.5 46 54 48.5 62 50 C54 51.5 51.5 54 50 62 C48.5 54 46 51.5 38 50 C46 48.5 48.5 46 50 38Z"
                      fill="var(--brand, #9f00f6)"
                    />
                  </svg>
                </div>
              </div>

              {/* Floating Badge 1: Top-Left White Positioning Card */}
              <div className="hero-badge-top-left">
                <p className="hero-badge-label-dark">CORE POSITIONING</p>
                <p className="hero-badge-value-dark">Strategy · Creative · Growth</p>
              </div>

              {/* 3D Interactive Tilt Card with Hero Visual */}
              <div
                ref={card}
                className="spotlight"
                style={{
                  position: "relative",
                  borderRadius: "2.2rem",
                  overflow: "hidden",
                  border: "1px solid rgba(139, 92, 246, 0.22)",
                  boxShadow: "0 28px 70px -15px rgba(0, 0, 0, 0.9)",
                  transition: "transform 0.15s ease-out",
                  willChange: "transform",
                }}
              >
                <img
                  src="/assets/hero-visual.webp"
                  alt="Adrexks Creative Work Visual"
                  style={{
                    display: "block",
                    width: "100%",
                    aspectRatio: "4/5",
                    objectFit: "cover",
                  }}
                />
              </div>

              {/* Floating Badge 2: Bottom-Right Purple Location Card */}
              <div className="hero-badge-bottom-right">
                <p className="hero-badge-label-purple">BASED IN</p>
                <p className="hero-badge-value-purple">Ahmedabad · Working everywhere</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .hero-visual-card-col {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
