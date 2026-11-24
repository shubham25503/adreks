import React from "react";
import { ServiceCardBody } from "./ServiceCardBody";

/**
 * Focused mobile card deck: upcoming emerges from phone, active rests centered, past slides left.
 */
export function MobileServicesDeck({ services, step, hoveredIndex, setHoveredIndex, selectService }) {
  const activeIndex = step - 2;

  return services.map((service, i) => {
    const isPast = activeIndex > i;
    const isActive = activeIndex === i;
    const isHovered = hoveredIndex === i;

    let transform = "translate3d(-50%, -50px, 0) scale(0.3) rotate(4deg)";
    let opacity = 0;
    let pointerEvents = "none";

    if (isActive) {
      transform = isHovered
        ? "translate3d(-50%, -6px, 0) scale(1.02) rotate(0deg)"
        : "translate3d(-50%, 0, 0) scale(1) rotate(0deg)";
      opacity = 1;
      pointerEvents = "auto";
    } else if (isPast) {
      transform = "translate3d(-175%, 0, 0) scale(0.88) rotate(-6deg)";
      opacity = 0;
      pointerEvents = "none";
    }

    return (
      <div
        key={service.n}
        className="service-compact-card"
        onMouseEnter={() => setHoveredIndex(i)}
        onMouseLeave={() => setHoveredIndex(null)}
        onClick={() => selectService(service.title)}
        style={{
          position: "absolute",
          left: "50%",
          bottom: "clamp(8px, 1.8vh, 24px)",
          width: "clamp(290px, 88vw, 380px)",
          zIndex: isActive ? (isHovered ? 20 : 8) : isPast ? 5 : 6,
          padding: "20px 22px",
          borderRadius: "1.4rem",
          background: isHovered ? "rgba(20, 8, 34, 0.98)" : "rgba(14, 5, 24, 0.95)",
          border: isHovered
            ? "1px solid rgba(255, 255, 255, 0.28)"
            : "1px solid rgba(255, 255, 255, 0.12)",
          boxShadow: isHovered
            ? "0 28px 70px -8px rgba(0, 0, 0, 0.96), 0 0 0 1px rgba(255, 255, 255, 0.12)"
            : "0 24px 60px -8px rgba(0, 0, 0, 0.92), 0 0 0 1px rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          cursor: "pointer",
          transform,
          opacity,
          pointerEvents,
          transition:
            "transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease, background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease",
        }}
      >
        <ServiceCardBody service={service} index={i} isHovered={isHovered} showCounter />
      </div>
    );
  });
}
