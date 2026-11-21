import React, { Fragment } from "react";

export const delay = (ms) => ({ "--d": `${ms}ms` });

/** 4-pointed sparkle star */
export function Star({ className = "", style }) {
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      className={className}
      style={{ display: "inline-block", ...style }}
      fill="currentColor"
    >
      <path d="M50 0 C55 35 65 45 100 50 C65 55 55 65 50 100 C45 65 35 55 0 50 C35 45 45 35 50 0Z" />
    </svg>
  );
}

/**
 * AdrexksLogo matching clean agency branding:
 * Crisp modern 'A' letterform with subtle curved purple swoosh, zero neon glow
 */
export function AdrexksLogo({ size = 32, showText = true, subtitle = "A DIGITAL MARKETING AGENCY" }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
      {/* SVG Icon Mark */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        <defs>
          <linearGradient id="swoosh-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="38%" stopColor="#9333ea" />
            <stop offset="68%" stopColor="#f43f5e" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
        </defs>

        {/* Sharp modern 'A' letterform */}
        <path
          d="M60 12 L95 104 L74 104 L60 66 L46 104 L25 104 Z"
          fill="#ffffff"
        />
        {/* Inner cutout triangle */}
        <polygon points="60,34 70,64 50,64" fill="#08020f" />

        {/* Curved swoosh cutting through the 'A' */}
        <path
          d="M12 92 C 34 82, 68 56, 114 62 C 90 70, 52 88, 12 92 Z"
          fill="url(#swoosh-grad)"
        />
      </svg>

      {/* Typography */}
      {showText && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            className="font-display"
            style={{
              fontSize: "1.2rem",
              fontWeight: 800,
              letterSpacing: "0.06em",
              lineHeight: 1,
              color: "#ffffff",
            }}
          >
            ADREXKS
          </span>
          {subtitle && (
            <span
              className="label-mono"
              style={{
                fontSize: "0.55rem",
                letterSpacing: "0.2em",
                color: "var(--lavender)",
                marginTop: "3px",
                opacity: 0.85,
              }}
            >
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
}



/**
 * PurpleWaveMesh:
 * Refined architectural contour wave lines, subtle & low-contrast (no neon glare)
 */
export function PurpleWaveMesh({ className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        width: "min(850px, 80vw)",
        height: "min(650px, 75vh)",
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 0,
      }}
    >
      <svg
        viewBox="0 0 800 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: "100%",
          height: "100%",
          opacity: 0.35,
        }}
      >
        <defs>
          <linearGradient id="wave-stroke-grad" x1="0%" y1="0%" x2="100%" y2="80%">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#7c3aed" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#4c1d95" stopOpacity="0" />
          </linearGradient>
        </defs>

        {[
          "M 200,0 C 350,120 480,80 800,240",
          "M 230,0 C 370,140 500,100 800,270",
          "M 260,0 C 390,160 520,120 800,300",
          "M 290,0 C 410,180 540,140 800,330",
          "M 320,0 C 430,200 560,160 800,360",
          "M 350,0 C 450,220 580,180 800,390",
          "M 380,0 C 470,240 600,200 800,420",
          "M 410,0 C 490,260 620,220 800,450",
          "M 440,0 C 510,280 640,240 800,480",
          "M 470,0 C 530,300 660,260 800,510",
          "M 500,0 C 550,320 680,280 800,540",
          "M 530,0 C 570,340 700,300 800,570",
          "M 560,0 C 590,360 720,320 800,600",
        ].map((d, idx) => (
          <path
            key={idx}
            d={d}
            stroke="url(#wave-stroke-grad)"
            strokeWidth={1}
            strokeLinecap="round"
          />
        ))}
      </svg>
    </div>
  );
}

/** Word-by-word roll reveal text */
export function RollText({
  parts,
  as: Tag = "h2",
  className = "",
  emClassName = "serif-em",
  step = 40,
  base = 0,
}) {
  let i = 0;
  return (
    <Tag data-roll className={className}>
      {parts.map((p, pi) => {
        const isEm = typeof p !== "string";
        const text = isEm ? p.em : p;
        return text
          .split(" ")
          .filter(Boolean)
          .map((w, wi) => {
            const d = base + i++ * step;
            return (
              <Fragment key={`${pi}-${wi}`}>
                <span className="roll-word">
                  <span className={isEm ? emClassName : undefined} style={delay(d)}>
                    {w}
                  </span>
                </span>{" "}
              </Fragment>
            );
          });
      })}
    </Tag>
  );
}

/** Watermark typography banner */
export function Watermark({
  className = "",
  speed = 0.12,
  text = "ADREXKS",
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
      className={className}
    >
      <div data-parallax={speed} className="watermark">
        {text}
      </div>
    </div>
  );
}

/** Section index label */
export function SectionLabel({ index, children, className = "" }) {
  return (
    <div
      data-reveal
      className={`label-mono ${className}`}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        color: "rgba(248, 247, 251, 0.55)",
      }}
    >
      <span style={{ color: "var(--acid-lime, #D6FF75)", fontWeight: 600 }}>({index})</span>
      <span
        style={{
          width: "32px",
          height: "1px",
          background: "linear-gradient(to right, rgba(244, 63, 94, 0.55), rgba(168, 85, 247, 0.25))",
        }}
      />
      <span>{children}</span>
    </div>
  );
}
