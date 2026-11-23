import React from "react";
import { Link } from "./Router";

export function CtaBand({ compact = false, theme = "dark" }) {
  const isLight = theme === "light";

  return (
    <section
      data-reveal
      data-theme={isLight ? "light" : "dark"}
      style={{
        padding: compact ? "60px 0" : "clamp(80px, 10vw, 130px) 0",
        background: isLight
          ? "radial-gradient(ellipse at 88% 0%, rgba(181, 0, 255, 0.05), transparent 45%), #f3eee6"
          : "linear-gradient(135deg, #18032d 0%, #0c0117 100%)",
        borderTop: isLight
          ? "1px solid rgba(22, 21, 21, 0.08)"
          : "1px solid rgba(168, 85, 247, 0.18)",
        borderBottom: isLight
          ? "1px solid rgba(22, 21, 21, 0.08)"
          : "1px solid rgba(168, 85, 247, 0.18)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="container-custom">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: "clamp(30px, 5vw, 60px)",
            alignItems: "center",
          }}
          className="cta-grid"
        >
          <div>
            <p
              className="label-mono"
              style={{
                color: isLight ? "var(--brand-purple, #b500ff)" : "var(--brand-bright)",
                fontWeight: isLight ? 700 : 500,
                marginBottom: "12px",
              }}
            >
              HAVE A GOOD BRIEF?
            </p>
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(2.4rem, 4.6vw, 4.8rem)",
                lineHeight: 1.05,
                color: isLight ? "#161515" : "#ffffff",
              }}
            >
              Let's make the next<br />
              <span className="serif-em" style={{ color: isLight ? "var(--brand-purple, #b500ff)" : "#d8b4fe" }}>
                move count.
              </span>
            </h2>
          </div>

          <div>
            <p
              style={{
                fontSize: "1.05rem",
                lineHeight: 1.7,
                color: isLight ? "rgba(22, 21, 21, 0.72)" : "rgba(248, 246, 252, 0.72)",
                marginBottom: "28px",
              }}
            >
              Tell us where you want to go. We'll help work out the right creative and marketing steps to get there.
            </p>
            <Link to="/contact" className="btn-primary" data-magnetic>
              Talk to Adrexks
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .cta-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </section>
  );
}
