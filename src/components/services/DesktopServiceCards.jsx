import React from "react";
import { ServiceCardBody } from "./ServiceCardBody";

/**
 * 5 symmetrical floating service cards orbiting the phone on desktop & laptop.
 */
export function DesktopServiceCards({
  services,
  step,
  targets,
  hoveredIndex,
  setHoveredIndex,
  selectService,
  isLaptop,
}) {
  return services.map((service, i) => {
    const isCardOut = step >= i + 2;
    const target = targets[i];
    const isHovered = hoveredIndex === i;

    return (
      <div
        key={service.n}
        className="service-card-slot"
        onMouseEnter={() => setHoveredIndex(i)}
        onMouseLeave={() => setHoveredIndex(null)}
        onClick={() => selectService(service.title)}
        style={{
          position: "absolute",
          width: isLaptop ? "clamp(250px, 21vw, 290px)" : "clamp(280px, 23vw, 340px)",
          transform: isCardOut
            ? `translate3d(${target.x}px, ${target.y}px, 0) scale(1) rotate(${target.r}deg)`
            : "translate3d(0, 0, 0) scale(0.25) rotate(0deg)",
          opacity: isCardOut ? 1 : 0,
          pointerEvents: isCardOut ? "auto" : "none",
          zIndex: isHovered ? 20 : i === 4 ? 7 : 5,
          cursor: "pointer",
          transition: "transform 0.75s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease",
        }}
      >
        <div
          className="service-floating-card"
          style={{
            width: "100%",
            padding: isLaptop ? "16px 18px" : "22px 24px",
            borderRadius: isLaptop ? "1.2rem" : "1.4rem",
            background: isHovered ? "rgba(20, 8, 34, 0.98)" : "rgba(14, 5, 24, 0.94)",
            border: isHovered
              ? "1px solid rgba(255, 255, 255, 0.28)"
              : "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: isHovered
              ? "0 28px 70px -10px rgba(0, 0, 0, 0.95), 0 0 0 1px rgba(255, 255, 255, 0.12)"
              : "0 20px 50px -10px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            transform: isHovered ? "translateY(-6px) scale(1.025)" : "translateY(0) scale(1)",
            transition:
              "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease",
          }}
        >
          <ServiceCardBody service={service} index={i} isHovered={isHovered} isLaptop={isLaptop} />
        </div>
      </div>
    );
  });
}
