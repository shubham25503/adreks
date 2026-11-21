import React from "react";

export function PageTop({ eyebrow, title, description }) {
  return (
    <section
      style={{
        paddingTop: "clamp(130px, 16vw, 190px)",
        paddingBottom: "clamp(48px, 6vw, 72px)",
        position: "relative",
        background: "radial-gradient(ellipse at 50% 0%, #200438 0%, #07010e 75%)",
        borderBottom: "1px solid rgba(168, 85, 247, 0.14)",
        overflow: "hidden",
      }}
    >
      {/* Background glow orb */}
      <div
        className="glow-brand"
        style={{
          position: "absolute",
          top: "-20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "50vmax",
          height: "35vmax",
          opacity: 0.35,
          zIndex: 0,
        }}
      />

      <div className="container-custom" style={{ position: "relative", zIndex: 1 }}>
        <p
          className="label-mono hero-fade"
          style={{
            color: "var(--brand-bright)",
            letterSpacing: "0.2em",
            marginBottom: "18px",
          }}
        >
          {eyebrow}
        </p>

        <h1
          className="font-display hero-fade"
          style={{
            fontSize: "clamp(2.6rem, 5.8vw, 5.8rem)",
            lineHeight: 1.04,
            color: "#ffffff",
            maxWidth: "960px",
          }}
        >
          {title}
        </h1>

        {description && (
          <p
            className="hero-fade"
            style={{
              marginTop: "22px",
              maxWidth: "680px",
              fontSize: "clamp(1.05rem, 1.4vw, 1.25rem)",
              lineHeight: 1.7,
              color: "rgba(248, 246, 252, 0.72)",
            }}
          >
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
