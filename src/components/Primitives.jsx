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

/** Solid 4-pointed Ninja Star */
export function NinjaStar({ className = "", style }) {
  return (
    <svg
      viewBox="0 0 200 200"
      aria-hidden="true"
      className={className}
      style={{ display: "inline-block", ...style }}
      fill="currentColor"
    >
      <polygon points="100,4 128,72 196,100 128,128 100,196 72,128 4,100 72,72" />
    </svg>
  );
}

/**
 * AdrexksMark:
 * The official vector emblem mark for ADREXKS.
 * Sourced directly from brand vector assets (1.svg / 2.svg).
 * Stylized modern forward 'A' mark with distinctive red orbital swoosh (#bf2020).
 */
function AdrexksMark({
  size = 32,
  width,
  height,
  color = "#ffffff",
  swooshColor = "#bf2020",
  className = "",
  style = {},
}) {
  const isNumeric = typeof size === "number";
  const w = width || (isNumeric ? Math.round(size * 1.33) : undefined);
  const h = height || (isNumeric ? size : undefined);

  const mergedStyle = isNumeric
    ? { display: "inline-block", verticalAlign: "middle", flexShrink: 0, ...style }
    : {
        display: "inline-block",
        verticalAlign: "middle",
        flexShrink: 0,
        width: size,
        height: "auto",
        aspectRatio: "1145 / 860",
        ...style,
      };

  return (
    <svg
      width={w}
      height={h}
      viewBox="185 325 1145 860"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={mergedStyle}
      aria-hidden="true"
    >
      {/* Left pillar & apex */}
      <path
        fill={color}
        d="M 815.273438 342.503906 L 674.097656 343.097656 L 268.960938 1063.164062 C 356.75 981.3125 454.625 921.40625 559.613281 858.53125 L 743.5 534.085938 L 862.132812 745.242188 L 1022.289062 716.179688 Z M 815.273438 342.503906"
        fillOpacity="1"
        fillRule="nonzero"
      />
      {/* Right leg */}
      <path
        fill={color}
        d="M 932.722656 929.117188 L 1066.183594 1169.929688 L 1276.167969 1169.335938 L 1092.878906 852.601562 Z M 932.722656 929.117188"
        fillOpacity="1"
        fillRule="nonzero"
      />
      {/* Orbital swoosh */}
      <path
        fill={swooshColor}
        d="M 1323.621094 748.800781 C 1288.03125 737.53125 1252.441406 732.195312 1216.257812 731.601562 C 1151.601562 729.230469 1092.285156 731.007812 1047.203125 736.347656 C 979.582031 744.058594 926.195312 754.734375 881.113281 764.816406 C 807.5625 780.832031 754.175781 800.40625 719.773438 814.640625 C 656.300781 835.992188 602.917969 861.5 556.054688 888.191406 C 505.042969 916.660156 457.589844 945.128906 425.558594 966.484375 C 377.511719 999.105469 333.023438 1035.878906 295.058594 1068.503906 C 258.875 1100.53125 224.472656 1137.308594 199.558594 1174.082031 L 416.660156 1174.675781 C 448.691406 1140.867188 475.382812 1111.800781 501.484375 1089.261719 C 521.652344 1072.0625 545.378906 1051.300781 567.917969 1039.441406 C 595.207031 1013.933594 621.304688 1000.292969 648.589844 989.617188 C 677.0625 973.601562 709.09375 956.398438 741.125 942.164062 C 789.765625 919.625 843.152344 898.867188 895.351562 880.480469 L 904.25 884.039062 L 919.671875 908.949219 C 946.363281 894.714844 979.582031 876.328125 1013.984375 859.125 C 1059.066406 835.992188 1105.335938 818.199219 1149.230469 802.183594 C 1193.125 785.578125 1234.644531 771.339844 1273.203125 757.105469 C 1295.148438 753.546875 1311.757812 750.582031 1323.621094 748.800781 Z M 1323.621094 748.800781"
        fillOpacity="1"
        fillRule="nonzero"
      />
    </svg>
  );
}

/**
 * AdrexksLogo matching authentic agency branding:
 * Official vector emblem mark with typography
 */
export function AdrexksLogo({
  size = 32,
  showText = true,
  subtitle = "A DIGITAL MARKETING AGENCY",
  color = "#ffffff",
  swooshColor = "#bf2020",
}) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
      <AdrexksMark size={size} color={color} swooshColor={swooshColor} />

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
              color: color,
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
                color: "var(--lavender, #c4b5fd)",
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



/** Word-by-word roll reveal text */
export function RollText({
  parts,
  as: Tag = "h2",
  className = "",
  emClassName = "serif-em",
  step = 40,
  base = 0,
  style,
}) {
  let i = 0;
  return (
    <Tag data-roll className={className} style={style}>
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
export function SectionLabel({ index, children, className = "", style = {}, theme = "dark" }) {
  const isLight = theme === "light";
  return (
    <div
      data-reveal
      className={`label-mono ${className}`}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        color: isLight ? "rgba(22, 21, 21, 0.6)" : "rgba(248, 247, 251, 0.55)",
        ...style,
      }}
    >
      <span style={{ color: isLight ? "var(--brand-purple, #b500ff)" : "var(--acid-lime, #D6FF75)", fontWeight: 600 }}>({index})</span>
      <span
        style={{
          width: "32px",
          height: "1px",
          background: isLight ? "rgba(22, 21, 21, 0.2)" : "linear-gradient(to right, rgba(244, 63, 94, 0.55), rgba(168, 85, 247, 0.25))",
        }}
      />
      <span>{children}</span>
    </div>
  );
}
