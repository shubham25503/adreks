import React from "react";
import { delay, RollText, SectionLabel } from "./Primitives";

export function AboutIntro() {
  return (
    <section
      id="about"
      style={{
        paddingTop: "clamp(90px, 12vw, 150px)",
        paddingBottom: "clamp(80px, 10vw, 130px)",
        position: "relative",
        background: "var(--bg-deep)",
      }}
    >
      <div className="container-custom">
        <SectionLabel index="02">The Agency</SectionLabel>

        {/* Word-by-word rolling headline */}
        <RollText
          as="h2"
          className="font-display"
          emClassName="serif-em"
          style={{
            marginTop: "36px",
            maxWidth: "1100px",
            fontSize: "clamp(2.2rem, 5vw, 5.2rem)",
            lineHeight: 1.05,
            color: "#ffffff",
          }}
          parts={[
            "From the first big idea to the campaign that moves it forward, we make the",
            { em: "pieces work together." },
          ]}
        />

        {/* Animated line draw */}
        <div
          className="draw-line"
          style={{
            height: "1px",
            background: "rgba(168, 85, 247, 0.25)",
            margin: "56px 0 44px",
          }}
        />

        {/* 3-column breakdown */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.3fr 1.2fr",
            gap: "clamp(24px, 4vw, 50px)",
          }}
          className="about-grid"
        >
          <div data-reveal className="label-mono" style={{ color: "var(--brand-bright)" }}>
            A connected creative partner
          </div>
          <p
            data-reveal
            style={{
              ...delay(100),
              fontSize: "clamp(1.1rem, 1.4vw, 1.35rem)",
              lineHeight: 1.7,
              color: "rgba(248, 246, 252, 0.9)",
            }}
          >
            Adreks brings strategy, content, advertising, branding, and design under one roof, keeping your message consistent from the first post to the last campaign.
          </p>
          <p
            data-reveal
            style={{
              ...delay(200),
              fontSize: "1rem",
              lineHeight: 1.75,
              color: "rgba(248, 246, 252, 0.6)",
            }}
          >
            No juggling five vendors. No ideas lost between departments. Just one founder-led agency that thinks about the whole picture and sweats the details.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </section>
  );
}
