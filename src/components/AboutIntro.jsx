import React from "react";
import { delay, RollText } from "./Primitives";

export function AboutIntro() {
  return (
    <section
      id="about"
      style={{
        paddingTop: "clamp(90px, 11vw, 150px)",
        paddingBottom: "clamp(80px, 10vw, 140px)",
        position: "relative",
        background: "radial-gradient(ellipse at 88% 0%, rgba(181, 0, 255, 0.06), transparent 45%), #f3eee6",
        color: "#161515",
      }}
    >
      <div className="container-custom" style={{ maxWidth: "1440px" }}>
        {/* Section Kicker */}
        <div
          data-reveal
          className="label-mono"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            color: "rgba(22, 21, 21, 0.6)",
          }}
        >
          <span style={{ color: "#b500ff", fontWeight: 700 }}>(02)</span>
          <span
            style={{
              width: "40px",
              height: "1px",
              background: "rgba(22, 21, 21, 0.25)",
            }}
          />
          <span style={{ letterSpacing: "0.18em", fontSize: "0.72rem" }}>The agency</span>
        </div>

        {/* Word-by-word rolling headline */}
        <RollText
          as="h2"
          className="display"
          emClassName="serif-em text-brand"
          style={{
            marginTop: "2.5rem",
            maxWidth: "1150px",
            fontSize: "clamp(2.2rem, 5.2vw, 5.4rem)",
            lineHeight: 1.02,
            letterSpacing: "-0.04em",
            color: "#161515",
            fontWeight: 700,
          }}
          parts={[
            "From the first big idea to the campaign that moves it forward, we make the",
            { em: "pieces work together." },
          ]}
        />

        {/* 3-column breakdown with top divider border */}
        <div
          className="about-agency-grid"
          style={{
            marginTop: "4rem",
            paddingTop: "2.5rem",
            borderTop: "1px solid rgba(22, 21, 21, 0.12)",
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gap: "2.5rem",
          }}
        >
          <p
            data-reveal
            className="label-mono"
            style={{
              gridColumn: "span 3",
              color: "rgba(22, 21, 21, 0.5)",
              fontSize: "0.72rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            A connected creative partner
          </p>
          <p
            data-reveal
            style={{
              ...delay(100),
              gridColumn: "span 5",
              fontSize: "1.25rem",
              lineHeight: 1.62,
              color: "rgba(22, 21, 21, 0.85)",
              margin: 0,
            }}
          >
            Adrexks is one team for strategy, content, advertising, branding and design - so your message stays consistent from the first post to the last campaign.
          </p>
          <p
            data-reveal
            style={{
              ...delay(200),
              gridColumn: "span 4",
              fontSize: "0.95rem",
              lineHeight: 1.65,
              color: "rgba(22, 21, 21, 0.62)",
              margin: 0,
            }}
          >
            No juggling five vendors. No ideas lost between departments. Just one founder-led agency that thinks about the whole picture and sweats the details.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-agency-grid {
            grid-template-columns: 1fr !important;
            gap: 1.8rem !important;
          }
          .about-agency-grid > p {
            grid-column: span 1 !important;
          }
        }
      `}</style>
    </section>
  );
}
