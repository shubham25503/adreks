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
        paddingTop: "clamp(96px, 11vw, 150px)",
        paddingBottom: "clamp(48px, 6vw, 90px)",
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

      {/* Background Watermark in Bottom Left, touching bottom with margin only on left side */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "0px",
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
            lineHeight: 0.78,
            letterSpacing: "-0.05em",
            marginBottom: "-0.06em",
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
              className="hero-fade hero-studio-badge label-mono"
              style={{
                ...delay(120),
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                borderRadius: "9999px",
                background: "rgba(18, 5, 30, 0.8)",
                border: "1px solid rgba(139, 92, 246, 0.2)",
                color: "var(--paper)",
                marginBottom: "20px",
                maxWidth: "100%",
              }}
            >
              <span
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: "var(--acid-lime, #D6FF75)",
                  boxShadow: "0 0 10px rgba(214, 255, 117, 0.6)",
                  flexShrink: 0,
                }}
              />
              <span className="hero-studio-text" style={{ whiteSpace: "nowrap" }}>
                Independent Creative Agency <span style={{ color: "rgba(248, 247, 251, 0.38)" }}>· Ahmedabad</span>
              </span>
            </div>

            {/* Main Headline */}
            <h1
              className="font-display hero-main-heading"
              style={{
                fontSize: "clamp(2.5rem, 6.2vw, 6.6rem)",
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
              className="hero-fade hero-subtitle"
              style={{
                ...delay(500),
                marginTop: "20px",
                maxWidth: "540px",
                fontSize: "clamp(0.95rem, 1.3vw, 1.15rem)",
                lineHeight: 1.65,
                color: "rgba(248, 247, 251, 0.72)",
              }}
            >
              We bring strategy, creative and performance marketing together to help ambitious businesses get noticed, earn attention and grow.
            </p>

            {/* CTAs */}
            <div
              className="hero-fade hero-cta-group"
              style={{
                ...delay(650),
                marginTop: "28px",
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
                alignItems: "center",
              }}
            >
              <Link to="/contact" className="btn-primary" data-magnetic>
                Start a project
              </Link>
              <Link to="/work" className="btn-secondary" data-magnetic>
                Explore our work
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
                  <svg viewBox="0 0 100 100" width="94" height="94" style={{ overflow: "visible" }}>
                    <defs>
                      <path
                        id="hero-stamp-circle"
                        d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                      />
                    </defs>
                    <text
                      fill="rgba(248, 247, 251, 0.78)"
                      fontSize="7.2"
                      fontFamily="'DM Sans', sans-serif"
                      letterSpacing="0.12em"
                      style={{ textTransform: "uppercase", fontWeight: 600 }}
                    >
                      <textPath
                        xlinkHref="#hero-stamp-circle"
                        href="#hero-stamp-circle"
                        startOffset="0%"
                        textLength="226"
                        lengthAdjust="spacing"
                      >
                        · IDEAS · INTO · IMPACT · ADREXKS ·&nbsp;
                      </textPath>
                    </text>
                    {/* Solid 4-Point Ninja Star in Center */}
                    <g transform="translate(50, 50) scale(0.13) translate(-100, -100)">
                      <polygon
                        points="100,4 128,72 196,100 128,128 100,196 72,128 4,100 72,72"
                        fill="var(--brand, #9f00f6)"
                      />
                    </g>
                  </svg>
                </div>
              </div>

              {/* Floating Badge 1: Top-Left White Goal Card (Negative Tilt) */}
              <div className="hero-badge-float-tl">
                <div className="hero-badge-card hero-badge-card-white">
                  <div className="hero-badge-sheen" />
                  <p className="hero-badge-label-dark">OUR GOAL</p>
                  <p className="hero-badge-value-dark">Think Beyond the Scroll</p>
                </div>
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

              {/* Floating Badge 2: Bottom-Right Purple Positioning Card (Positive Tilt) */}
              <div className="hero-badge-float-br">
                <div className="hero-badge-card hero-badge-card-purple">
                  <div className="hero-badge-sheen" />
                  <p className="hero-badge-label-purple">CORE POSITIONING</p>
                  <p className="hero-badge-value-purple">Strategy · Creative · Growth</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
          .hero-visual-card-col {
            display: block !important;
            width: 100% !important;
            max-width: min(340px, 86vw) !important;
            margin: 18px auto 0 !important;
            padding: 14px 8px !important;
          }
          .hero-badge-float-tl {
            top: -14px !important;
            left: -10px !important;
          }
          .hero-badge-float-br {
            bottom: -14px !important;
            right: -8px !important;
          }
          .hero-badge-card {
            padding: 8px 14px !important;
            border-radius: 1rem !important;
          }
          .hero-badge-label-dark,
          .hero-badge-label-purple {
            font-size: 0.52rem !important;
            letter-spacing: 0.18em !important;
            margin-bottom: 2px !important;
          }
          .hero-badge-value-dark {
            font-size: 0.76rem !important;
          }
          .hero-badge-value-purple {
            font-size: 0.74rem !important;
          }
          .hero-stamp-badge {
            top: -18px !important;
            right: -10px !important;
            transform: scale(0.8) !important;
            transform-origin: top right !important;
          }
        }
        @media (max-width: 540px) {
          .hero-main-heading {
            font-size: clamp(2.35rem, 8.4vw, 3.2rem) !important;
            line-height: 1.05 !important;
          }
          .hero-subtitle {
            font-size: 0.92rem !important;
            line-height: 1.58 !important;
            margin-top: 16px !important;
          }
          .hero-cta-group {
            display: flex !important;
            gap: 10px !important;
            width: 100% !important;
            margin-top: 22px !important;
          }
          .hero-cta-group .btn-primary,
          .hero-cta-group .btn-secondary {
            flex: 1 1 0 !important;
            text-align: center !important;
            justify-content: center !important;
            padding: 11px 12px !important;
            font-size: 0.85rem !important;
            white-space: nowrap !important;
          }
          .hero-studio-badge {
            padding: 5px 12px !important;
            margin-bottom: 16px !important;
          }
          .hero-studio-text {
            font-size: clamp(0.64rem, 2.8vw, 0.72rem) !important;
          }
        }
      `}</style>
    </section>
  );
}
