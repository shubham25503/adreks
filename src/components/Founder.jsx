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
          {/* Photo with floating badge */}
          <div data-reveal="left" style={{ position: "relative", maxWidth: "460px", margin: "0 auto" }}>
            <div
              style={{
                position: "relative",
                borderRadius: "2.2rem",
                overflow: "hidden",
                border: "1px solid rgba(139, 92, 246, 0.22)",
                boxShadow: "0 24px 60px -15px rgba(0, 0, 0, 0.85)",
              }}
            >
              <img
                src="/assets/kavan-desai.webp"
                alt="Kavan Desai, Founder of Adrexks"
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
                bottom: "-14px",
                right: "-14px",
                padding: "14px 20px",
                borderRadius: "1.1rem",
                background: "rgba(12, 3, 22, 0.94)",
                backdropFilter: "blur(14px)",
                border: "1px solid rgba(139, 92, 246, 0.25)",
                boxShadow: "0 12px 30px rgba(0, 0, 0, 0.6)",
              }}
            >
              <p className="label-mono" style={{ color: "var(--brand-bright)", fontSize: "0.65rem" }}>
                Founder & CEO
              </p>
              <p className="font-display" style={{ fontSize: "1.1rem", color: "#fff", marginTop: "2px" }}>
                Kavan Desai
              </p>
            </div>

            {/* Minimal Star Badge (No Neon) */}
            <Star
              style={{
                position: "absolute",
                top: "-16px",
                left: "-16px",
                width: "44px",
                height: "44px",
                color: "var(--brand-bright)",
                animation: "spin-slow 24s linear infinite",
                opacity: 0.8,
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
                color: "rgba(248, 247, 251, 0.78)",
              }}
            >
              <p data-reveal>
                Kavan started Adrexks to give growing businesses a dedicated partner for creative strategy, brand building, and growth marketing. We approach every challenge with an owner’s mindset.
              </p>
              <p data-reveal style={delay(100)}>
                From initial brand direction to campaign execution, Kavan stays personally involved in the work, ensuring clear communication, purposeful design, and real business results.
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
                borderTop: "1px solid rgba(139, 92, 246, 0.15)",
              }}
            >
              <div>
                <strong className="font-display" style={{ fontSize: "2rem", color: "var(--acid-lime, #D6FF75)" }}>
                  100+
                </strong>
                <p className="label-mono" style={{ color: "rgba(248, 247, 251, 0.45)", marginTop: "4px" }}>
                  Designs created
                </p>
              </div>
              <div>
                <strong className="font-display" style={{ fontSize: "2rem", color: "var(--acid-lime, #D6FF75)" }}>
                  10+
                </strong>
                <p className="label-mono" style={{ color: "rgba(248, 247, 251, 0.45)", marginTop: "4px" }}>
                  Happy clients
                </p>
              </div>
              <div>
                <strong className="font-display" style={{ fontSize: "2rem", color: "var(--acid-lime, #D6FF75)" }}>
                  1.5+
                </strong>
                <p className="label-mono" style={{ color: "rgba(248, 247, 251, 0.45)", marginTop: "4px" }}>
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
                Start a conversation
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
