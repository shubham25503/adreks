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

      {/* Subtle purple wave mesh */}
      <PurpleWaveMesh />

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

      {/* Background Watermark */}
      <Watermark speed={0.1} text="ADREXKS" className="bottom-[-4vw] -z-10" />

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

          {/* Right Column: Studio Visual Card in 3D Interactive Tilt */}
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
                  borderRadius: "2rem",
                  overflow: "hidden",
                  border: "1px solid rgba(139, 92, 246, 0.22)",
                  boxShadow: "0 24px 60px -15px rgba(0, 0, 0, 0.85)",
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

                {/* Overlaid card badge */}
                <div
                  style={{
                    position: "absolute",
                    inset: "auto 18px 18px 18px",
                    padding: "16px 20px",
                    borderRadius: "1.2rem",
                    background: "rgba(12, 3, 20, 0.9)",
                    backdropFilter: "blur(14px)",
                    WebkitBackdropFilter: "blur(14px)",
                    border: "1px solid rgba(139, 92, 246, 0.2)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <p className="label-mono" style={{ color: "var(--acid-lime, #D6FF75)", fontSize: "0.65rem" }}>
                      Adrexks Studio
                    </p>
                    <p
                      className="font-display"
                      style={{ fontSize: "1.05rem", color: "#fff", marginTop: "2px" }}
                    >
                      Ideas into impact.
                    </p>
                  </div>
                  <Link
                    to="/services"
                    aria-label="Explore services"
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "50%",
                      background: "var(--brand)",
                      display: "grid",
                      placeItems: "center",
                      color: "#fff",
                      fontSize: "1.1rem",
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
