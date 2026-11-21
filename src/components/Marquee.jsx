import React from "react";
import { Star } from "./Primitives";

const CAPABILITIES = ["Strategy", "Creative", "Performance", "Content", "Branding", "Growth"];

export function Marquee() {
  return (
    <div
      aria-label="Capabilities ticker"
      style={{
        overflow: "hidden",
        borderTop: "1px solid rgba(168, 85, 247, 0.22)",
        borderBottom: "1px solid rgba(168, 85, 247, 0.22)",
        background: "linear-gradient(90deg, #090113 0%, #170329 50%, #090113 100%)",
        padding: "26px 0",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "max-content",
          animation: "marquee 28s linear infinite",
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
                style={{ display: "inline-flex", alignItems: "center" }}
              >
                <span
                  style={{
                    padding: "0 36px",
                    fontSize: "clamp(2rem, 4.5vw, 4rem)",
                    letterSpacing: "-0.04em",
                    fontFamily: idx % 2 === 1 ? "'Instrument Serif', Georgia, serif" : "'Bricolage Grotesque', sans-serif",
                    fontStyle: idx % 2 === 1 ? "italic" : "normal",
                    color: idx % 2 === 1 ? "#d8b4fe" : "#ffffff",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item}
                </span>
                <Star
                  style={{
                    width: "clamp(22px, 2.5vw, 36px)",
                    height: "clamp(22px, 2.5vw, 36px)",
                    color: "var(--brand)",
                    filter: "drop-shadow(0 0 8px rgba(168, 85, 247, 0.6))",
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
