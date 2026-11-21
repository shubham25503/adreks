import React, { useEffect, useState } from "react";

const LETTERS = ["A", "D", "R", "E", "K", "S"];

export function StarIcon({ className = "", style }) {
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

export function Preloader() {
  const [stage, setStage] = useState("load");
  const [pct, setPct] = useState(0);

  useEffect(() => {
    document.body.classList.add("preloader-active");
    const html = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const minDur = reduce ? 400 : 1500;
    const start = performance.now();
    let loaded = document.readyState === "complete";
    const onLoad = () => (loaded = true);
    window.addEventListener("load", onLoad);
    const force = window.setTimeout(() => (loaded = true), 5000);
    const timers = [];
    let p = 0;
    let raf = 0;

    const finish = () => {
      if (reduce) {
        html.dataset.ready = "true";
        setStage("fade");
        document.body.classList.remove("preloader-active");
        timers.push(window.setTimeout(() => setStage("done"), 400));
        return;
      }
      timers.push(window.setTimeout(() => setStage("bloom"), 150));
      timers.push(
        window.setTimeout(() => {
          setStage("reveal");
          html.dataset.ready = "true";
          document.body.classList.remove("preloader-active");
        }, 1300)
      );
      timers.push(window.setTimeout(() => setStage("done"), 2300));
    };

    const tick = (now) => {
      const t = Math.min(1, (now - start) / minDur);
      if (t < 1) p = (1 - Math.pow(1 - t, 3)) * 95;
      else if (loaded) p = p + (100 - p) * 0.22 + 0.5;
      else p = Math.max(p, 95);

      if (p >= 100) {
        setPct(100);
        finish();
        return;
      }
      setPct(p);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach((id) => window.clearTimeout(id));
      window.clearTimeout(force);
      window.removeEventListener("load", onLoad);
      document.body.classList.remove("preloader-active");
    };
  }, []);

  if (stage === "done") return null;

  return (
    <div
      className="preloader"
      data-stage={stage}
      role="status"
      aria-label={`Loading Adreks, ${Math.floor(pct)}%`}
    >
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        {/* Soft background ambient glow */}
        <div
          className="glow-brand"
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: "50vmax",
            height: "50vmax",
            opacity: 0.3,
          }}
        />

        {/* Orbit track & minimal satellite */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: "60vmin",
            height: "60vmin",
            borderRadius: "50%",
            border: "1px solid rgba(139, 92, 246, 0.12)",
          }}
        >
          <div style={{ position: "absolute", inset: 0, animation: "spin-slow 28s linear infinite" }}>
            <span
              style={{
                position: "absolute",
                top: "-4px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "var(--lavender)",
              }}
            />
          </div>
        </div>

        {/* Header details */}
        <div
          className="label-mono"
          style={{
            position: "absolute",
            inset: "24px 32px auto 32px",
            display: "flex",
            justifyContent: "space-between",
            color: "rgba(248, 247, 251, 0.4)",
          }}
        >
          <span>Independent Digital & Creative Agency</span>
          <span>Ahmedabad, India</span>
        </div>

        {/* Center Letters */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h2
            className="font-display"
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "clamp(3.5rem, 16vw, 13rem)",
              lineHeight: 0.85,
              letterSpacing: "-0.05em",
              color: "#fff",
            }}
          >
            {LETTERS.map((l, i) => (
              <span
                key={i}
                className="preloader-letter"
                style={{ "--d": `${80 + i * 65}ms` }}
              >
                {l}
              </span>
            ))}
            <StarIcon
              className="preloader-letter"
              style={{
                "--d": "520ms",
                width: "0.32em",
                height: "0.32em",
                marginLeft: "0.1em",
                color: "var(--brand-bright)",
              }}
            />
          </h2>
        </div>

        {/* Bottom percentage & progress bar */}
        <div
          style={{
            position: "absolute",
            inset: "auto 32px 32px 32px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div className="label-mono" style={{ color: "rgba(248, 247, 251, 0.35)" }}>
            <span>CREATIVE STRATEGY · BRANDING · PERFORMANCE</span>
          </div>
          <div
            className="label-mono font-mono"
            style={{
              fontSize: "1.1rem",
              fontWeight: 500,
              color: "var(--brand-bright)",
            }}
          >
            {String(Math.floor(pct)).padStart(2, "0")}%
          </div>
        </div>
      </div>
    </div>
  );
}
