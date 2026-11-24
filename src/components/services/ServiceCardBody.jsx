import React from "react";
import { NinjaStar } from "../Primitives";

/**
 * Shared inner card layout for both desktop orbiting cards and mobile deck cards.
 */
export function ServiceCardBody({ service, index, isHovered, isLaptop = false, showCounter = false }) {
  return (
    <>
      {/* Card Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: showCounter ? "12px" : isLaptop ? "10px" : "14px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            className="label-mono font-mono"
            style={{
              fontSize: showCounter ? "0.82rem" : isLaptop ? "0.78rem" : "0.85rem",
              fontWeight: 700,
              color: "var(--acid-lime, #D6FF75)",
              background: isHovered ? "rgba(214, 255, 117, 0.18)" : "rgba(214, 255, 117, 0.08)",
              padding: showCounter ? "3px 10px" : isLaptop ? "2px 9px" : "4px 12px",
              borderRadius: "9999px",
              border: isHovered
                ? "1px solid rgba(214, 255, 117, 0.45)"
                : "1px solid rgba(214, 255, 117, 0.22)",
              transform: isHovered ? "scale(1.06)" : "scale(1)",
              transition: "all 0.3s ease",
            }}
          >
            {service.n}
          </span>
          {showCounter && (
            <span className="label-mono" style={{ fontSize: "0.62rem", color: "rgba(248, 246, 252, 0.45)" }}>
              {index + 1} / 05
            </span>
          )}
        </div>
        <NinjaStar
          style={{
            width: showCounter ? "16px" : isLaptop ? "14px" : "16px",
            height: showCounter ? "16px" : isLaptop ? "14px" : "16px",
            color: isHovered ? "var(--acid-lime)" : "rgba(255, 255, 255, 0.35)",
            transform: isHovered ? "rotate(90deg) scale(1.2)" : "rotate(0deg) scale(1)",
            transition: "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), color 0.3s ease",
          }}
        />
      </div>

      {/* Title */}
      <h3
        className="font-display"
        style={{
          fontSize: showCounter
            ? "1.25rem"
            : isLaptop
              ? "clamp(1.05rem, 1.3vw, 1.25rem)"
              : "clamp(1.2rem, 1.55vw, 1.45rem)",
          letterSpacing: showCounter ? "-0.03em" : "-0.035em",
          color: "#ffffff",
          lineHeight: showCounter ? 1.2 : 1.18,
          textShadow: !showCounter && isHovered ? "0 2px 14px rgba(255, 255, 255, 0.15)" : "none",
          transition: "text-shadow 0.3s ease",
        }}
      >
        {service.title}
      </h3>

      {/* Body description */}
      <p
        style={{
          marginTop: showCounter ? "8px" : isLaptop ? "6px" : "10px",
          fontSize: showCounter ? "0.85rem" : isLaptop ? "0.78rem" : "0.86rem",
          lineHeight: showCounter ? 1.5 : 1.45,
          color: isHovered ? "rgba(248, 246, 252, 0.94)" : "rgba(248, 246, 252, 0.72)",
          transition: "color 0.3s ease",
        }}
      >
        {service.body}
      </p>

      {/* Bottom Divider + CTA */}
      <div
        style={{
          marginTop: showCounter ? "16px" : isLaptop ? "12px" : "18px",
          borderTop: isHovered ? "1px solid rgba(255, 255, 255, 0.14)" : "1px solid rgba(255, 255, 255, 0.08)",
          paddingTop: showCounter ? "12px" : isLaptop ? "10px" : "12px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          transition: "border-color 0.3s ease",
        }}
      >
        <span
          className="service-card-btn"
          style={{
            color: isHovered ? "var(--acid-lime)" : "#ffffff",
            fontFamily: "inherit",
            fontSize: showCounter ? "0.85rem" : isLaptop ? "0.78rem" : "0.84rem",
            fontWeight: 600,
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            transition: "color 0.25s ease",
          }}
        >
          <span>Discuss this service</span>
          <span
            style={{
              display: "inline-block",
              transform: isHovered ? "translateX(4px)" : "translateX(0)",
              transition: "transform 0.25s ease",
            }}
          >
            →
          </span>
        </span>
        <span
          className="label-mono"
          style={{
            fontSize: showCounter ? "0.58rem" : isLaptop ? "0.54rem" : "0.58rem",
            color: isHovered ? "rgba(248, 246, 252, 0.65)" : "rgba(248, 246, 252, 0.45)",
            transition: "color 0.3s ease",
          }}
        >
          {service.tag}
        </span>
      </div>
    </>
  );
}
