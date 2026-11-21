import React from "react";
import { Link } from "./Router";

export function CtaBand({ compact = false }) {
  return (
    <section
      data-reveal
      style={{
        padding: compact ? "60px 0" : "clamp(80px, 10vw, 130px) 0",
        background: "linear-gradient(135deg, #18032d 0%, #0c0117 100%)",
        borderTop: "1px solid rgba(168, 85, 247, 0.18)",
        borderBottom: "1px solid rgba(168, 85, 247, 0.18)",
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
            <p className="label-mono" style={{ color: "var(--brand-bright)", marginBottom: "12px" }}>
              HAVE A GOOD BRIEF?
            </p>
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(2.4rem, 4.6vw, 4.8rem)",
                lineHeight: 1.05,
                color: "#ffffff",
              }}
            >
              Let’s make the next<br />
              <span className="serif-em" style={{ color: "#d8b4fe" }}>move count.</span>
            </h2>
          </div>

          <div>
            <p
              style={{
                fontSize: "1.05rem",
                lineHeight: 1.7,
                color: "rgba(248, 246, 252, 0.72)",
                marginBottom: "28px",
              }}
            >
              Tell us where you want to go. We’ll help work out the right creative and marketing steps to get there.
            </p>
            <Link to="/contact" className="btn-primary" data-magnetic>
              Talk to Adrexks <span>↗</span>
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
