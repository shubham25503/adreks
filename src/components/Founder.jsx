import React from "react";
import { delay, RollText, SectionLabel, Star, Watermark } from "./Primitives";

export function Founder() {
  return (
    <section
      id="founder"
      style={{
        paddingTop: "clamp(90px, 12vw, 150px)",
        paddingBottom: "clamp(90px, 12vw, 150px)",
        position: "relative",
        background: "var(--bg-surface)",
        overflow: "hidden",
      }}
    >
      <Watermark speed={0.14} text="FOUNDER & STRATEGIST" className="bottom-[-3vw] -z-10" />

      <div className="container-custom">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "0.85fr 1.15fr",
            gap: "clamp(40px, 6vw, 90px)",
            alignItems: "center",
          }}
          className="founder-grid"
        >
          {/* Photo with floating badges */}
          <div data-reveal="left" style={{ position: "relative", maxWidth: "460px", margin: "0 auto" }}>
            <div
              style={{
                position: "relative",
                borderRadius: "2.4rem",
                overflow: "hidden",
                border: "1px solid rgba(192, 132, 252, 0.3)",
                boxShadow: "0 28px 70px -15px rgba(0, 0, 0, 0.8), 0 0 45px -10px rgba(168, 85, 247, 0.3)",
              }}
            >
              <img
                src="/assets/founder-kavan.webp"
                alt="Kavan Desai, Founder of Adreks"
                loading="lazy"
                style={{
                  display: "block",
                  width: "100%",
                  aspectRatio: "4/5",
                  objectFit: "cover",
                }}
              />
            </div>

            {/* Floating corner badge */}
            <div
              style={{
                position: "absolute",
                bottom: "-16px",
                right: "-16px",
                padding: "16px 22px",
                borderRadius: "1.2rem",
                background: "rgba(10, 1, 20, 0.92)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(168, 85, 247, 0.35)",
                boxShadow: "0 16px 40px rgba(0, 0, 0, 0.6)",
              }}
            >
              <p className="label-mono" style={{ color: "var(--brand-bright)" }}>
                Founder & CEO
              </p>
              <p className="font-display" style={{ fontSize: "1.15rem", color: "#fff", marginTop: "3px" }}>
                Kavan Desai
              </p>
            </div>

            {/* Rotating Star Badge */}
            <Star
              style={{
                position: "absolute",
                top: "-20px",
                left: "-20px",
                width: "56px",
                height: "56px",
                color: "var(--brand-neon)",
                animation: "spin-slow 20s linear infinite",
                filter: "drop-shadow(0 0 12px rgba(217, 70, 239, 0.7))",
              }}
            />
          </div>

          {/* Copy & Narrative */}
          <div>
            <SectionLabel index="07">Founder & CEO</SectionLabel>
            <RollText
              as="h2"
              className="font-display"
              emClassName="serif-em"
              style={{
                marginTop: "24px",
                fontSize: "clamp(2.6rem, 5.8vw, 5.8rem)",
                color: "#ffffff",
              }}
              parts={["Meet", { em: "Kavan Desai." }]}
            />

            <div
              style={{
                marginTop: "28px",
                display: "flex",
                flexDirection: "column",
                gap: "18px",
                fontSize: "1.08rem",
                lineHeight: 1.75,
                color: "rgba(248, 246, 252, 0.78)",
              }}
            >
              <p data-reveal>
                Kavan started Adreks to give ambitious businesses one accountable partner for strategy, creative and growth — an agency that thinks like an owner, not a vendor.
              </p>
              <p data-reveal style={delay(100)}>
                He sets the creative direction, shapes the business thinking behind every campaign and stays personally involved in client relationships, from the first conversation to the work that goes live.
              </p>
              <p data-reveal style={delay(200)} style={{ fontSize: "0.95rem", color: "rgba(248, 246, 252, 0.55)" }}>
                Adreks is the agency. Kavan’s own design and marketing work lives separately on his personal portfolio.
              </p>
            </div>

            {/* Stats Row */}
            <div
              data-reveal
              style={{
                ...delay(220),
                display: "flex",
                gap: "clamp(20px, 4vw, 44px)",
                marginTop: "36px",
                paddingTop: "24px",
                borderTop: "1px solid rgba(168, 85, 247, 0.18)",
              }}
            >
              <div>
                <strong className="font-display" style={{ fontSize: "2rem", color: "var(--brand-bright)" }}>
                  100+
                </strong>
                <p className="label-mono" style={{ color: "rgba(248, 246, 252, 0.5)", marginTop: "4px" }}>
                  Designs created
                </p>
              </div>
              <div>
                <strong className="font-display" style={{ fontSize: "2rem", color: "var(--brand-bright)" }}>
                  10+
                </strong>
                <p className="label-mono" style={{ color: "rgba(248, 246, 252, 0.5)", marginTop: "4px" }}>
                  Happy clients
                </p>
              </div>
              <div>
                <strong className="font-display" style={{ fontSize: "2rem", color: "var(--brand-bright)" }}>
                  1.5+
                </strong>
                <p className="label-mono" style={{ color: "rgba(248, 246, 252, 0.5)", marginTop: "4px" }}>
                  Years experience
                </p>
              </div>
            </div>

            {/* Actions */}
            <div
              data-reveal
              style={{
                ...delay(280),
                marginTop: "38px",
                display: "flex",
                flexWrap: "wrap",
                gap: "14px",
                alignItems: "center",
              }}
            >
              <a href="#contact" className="btn-primary" data-magnetic>
                Start a conversation ↗
              </a>
              <a
                href="https://desaikavan03.github.io/kavan-desai-portfolio/"
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
                data-magnetic
              >
                Kavan’s portfolio ↗
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .founder-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}
