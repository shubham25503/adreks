import React, { useEffect, useRef } from "react";
import { delay, PurpleWaveMesh, Watermark } from "./Primitives";
import { Link } from "./Router";

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
      c.style.transform = `rotateY(${x * 15}deg) rotateX(${-y * 13}deg) translateZ(0)`;
      w.style.setProperty("--px", `${x * 24}px`);
      w.style.setProperty("--py", `${y * 24}px`);
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

      {/* Elegant purple wave mesh matching reference image */}
      <PurpleWaveMesh />

      {/* Glowing ambient radial light orbs */}
      <div
        className="glow-brand"
        style={{
          position: "absolute",
          right: "-10%",
          top: "10%",
          width: "55vmax",
          height: "55vmax",
          opacity: 0.45,
          zIndex: -2,
          animation: "glow-drift 14s ease-in-out infinite",
        }}
      />
      <div
        className="glow-lavender"
        style={{
          position: "absolute",
          left: "-15%",
          bottom: "-15%",
          width: "45vmax",
          height: "45vmax",
          opacity: 0.35,
          zIndex: -2,
        }}
      />

      {/* Orbit ring with glowing satellite */}
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
          border: "1px solid rgba(168, 85, 247, 0.08)",
          zIndex: -2,
          pointerEvents: "none",
        }}
      >
        <div style={{ position: "absolute", inset: 0, animation: "spin-slow 38s linear infinite" }}>
          <span
            style={{
              position: "absolute",
              left: "50%",
              top: "-5px",
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "var(--brand-bright)",
              boxShadow: "0 0 16px var(--brand-neon)",
            }}
          />
        </div>
      </div>

      {/* Background Watermark */}
      <Watermark speed={0.1} text="ADREKS" className="bottom-[-4vw] -z-10" />

      {/* Main Container */}
      <div className="container-custom" style={{ width: "100%", zIndex: 2 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.9fr",
            gap: "clamp(30px, 5vw, 70px)",
            alignItems: "center",
          }}
          className="hero-grid"
        >
          {/* Left Column: Headline & Value Prop */}
          <div>
            {/* Badge */}
            <div
              className="hero-fade label-mono"
              style={{
                ...delay(120),
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "8px 18px",
                borderRadius: "9999px",
                background: "rgba(22, 3, 38, 0.75)",
                border: "1px solid rgba(168, 85, 247, 0.28)",
                color: "var(--paper)",
                backdropFilter: "blur(12px)",
                marginBottom: "28px",
              }}
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#4ade80",
                  boxShadow: "0 0 10px #4ade80",
                }}
              />
              <span>Independent Digital & Creative Agency</span>
              <span style={{ color: "rgba(248, 246, 252, 0.4)" }}>· Ahmedabad</span>
            </div>

            {/* Main Headline */}
            <h1
              className="font-display"
              style={{
                fontSize: "clamp(2.8rem, 6.2vw, 6.6rem)",
                lineHeight: 1.02,
                color: "#ffffff",
                letterSpacing: "-0.05em",
                margin: 0,
              }}
            >
              <span className="hero-line">
                <span style={delay(100)}>Make your brand</span>
              </span>
              <span className="hero-line">
                <span className="serif-em" style={{ ...delay(220), color: "#d8b4fe" }}>
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
                fontSize: "clamp(1rem, 1.3vw, 1.2rem)",
                lineHeight: 1.7,
                color: "rgba(248, 246, 252, 0.75)",
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
                gap: "16px",
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

            {/* Founder Pill linking to Studio / About Us */}
            <div
              className="hero-fade"
              style={{
                ...delay(800),
                marginTop: "44px",
                display: "inline-flex",
                alignItems: "center",
                gap: "14px",
                padding: "10px 18px",
                borderRadius: "9999px",
                background: "rgba(22, 3, 38, 0.4)",
                border: "1px solid rgba(168, 85, 247, 0.15)",
              }}
            >
              <img
                src="/assets/kavan-desai.webp"
                alt="Kavan Desai"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "1px solid var(--brand)",
                }}
              />
              <Link to="/studio" style={{ textDecoration: "none", display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#fff" }}>
                  Kavan Desai ↗
                </span>
                <span className="label-mono" style={{ fontSize: "0.62rem", color: "var(--brand-bright)" }}>
                  Founder & Creative Strategist
                </span>
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Visual Studio Card in 3D Interactive Tilt */}
          <div className="hero-fade" style={{ ...delay(450), position: "relative" }}>
            <div
              ref={wrap}
              style={{
                position: "relative",
                maxWidth: "460px",
                margin: "0 auto",
                perspective: "1200px",
              }}
            >
              <div
                ref={card}
                className="spotlight"
                style={{
                  position: "relative",
                  borderRadius: "2.2rem",
                  overflow: "hidden",
                  border: "1px solid rgba(192, 132, 252, 0.35)",
                  boxShadow: "0 28px 70px -15px rgba(0,0,0,0.85), 0 0 50px -10px rgba(168, 85, 247, 0.35)",
                  transition: "transform 0.15s ease-out",
                  willChange: "transform",
                }}
              >
                <img
                  src="/assets/hero-visual.webp"
                  alt="Adreks Creative Work Visual"
                  style={{
                    display: "block",
                    width: "100%",
                    aspectRatio: "4/5",
                    objectFit: "cover",
                    filter: "contrast(1.05) brightness(0.95)",
                  }}
                />

                {/* Overlaid luxury gradient badge */}
                <div
                  style={{
                    position: "absolute",
                    inset: "auto 20px 20px 20px",
                    padding: "18px 22px",
                    borderRadius: "1.4rem",
                    background: "rgba(10, 1, 20, 0.88)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    border: "1px solid rgba(168, 85, 247, 0.3)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <p className="label-mono" style={{ color: "var(--brand-bright)" }}>
                      Adreks Studio
                    </p>
                    <p
                      className="font-display"
                      style={{ fontSize: "1.1rem", color: "#fff", marginTop: "3px" }}
                    >
                      Ideas into impact.
                    </p>
                  </div>
                  <Link
                    to="/services"
                    aria-label="Explore services"
                    style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, var(--brand), var(--brand-deep))",
                      display: "grid",
                      placeItems: "center",
                      color: "#fff",
                      fontSize: "1.2rem",
                      textDecoration: "none",
                    }}
                  >
                    ↗
                  </Link>
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
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}
