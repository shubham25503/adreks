import React from "react";
import { NinjaStar } from "./Primitives";

const CAPABILITIES = ["Strategy", "Creative", "Performance", "Content", "Branding", "Growth"];

export function Marquee() {
  return (
    <div
      aria-label="Capabilities ticker"
      className="marquee-wrapper"
      style={{
        overflow: "hidden",
        borderTop: "1px solid rgba(139, 92, 246, 0.14)",
        borderBottom: "1px solid rgba(139, 92, 246, 0.14)",
        background: "linear-gradient(90deg, #08020f 0%, #130422 50%, #08020f 100%)",
        padding: "24px 0",
        position: "relative",
      }}
    >
      <div
        className="marquee-track"
        style={{
          display: "flex",
          width: "max-content",
          animation: "marquee 32s linear infinite",
        }}
      >
        {[0, 1].map((k) => (
          <div
            key={k}
            style={{ display: "flex", alignItems: "center" }}
            aria-hidden={k === 1}
          >
            {[...CAPABILITIES, ...CAPABILITIES].map((item, idx) => (
              <span
                key={`${k}-${idx}`}
                className="marquee-item"
                style={{ display: "inline-flex", alignItems: "center", cursor: "default" }}
              >
                <span
                  className="marquee-text"
                  style={{
                    padding: "0 34px",
                    fontSize: "clamp(1.9rem, 4vw, 3.8rem)",
                    letterSpacing: "-0.04em",
                    fontFamily: idx % 2 === 1 ? "'Instrument Serif', Georgia, serif" : "'Bricolage Grotesque', sans-serif",
                    fontStyle: idx % 2 === 1 ? "italic" : "normal",
                    color: idx % 2 === 1 ? "#ddd6fe" : "#ffffff",
                    whiteSpace: "nowrap",
                    transition: "color 0.3s ease, text-shadow 0.3s ease",
                  }}
                >
                  {item}
                </span>
                <NinjaStar
                  className="marquee-star"
                  style={{
                    width: "clamp(18px, 2.2vw, 28px)",
                    height: "clamp(18px, 2.2vw, 28px)",
                    color: "var(--brand, #9f00f6)",
                    opacity: 0.85,
                    flexShrink: 0,
                    transition: "transform 0.4s ease, color 0.4s ease, filter 0.4s ease",
                  }}
                />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
