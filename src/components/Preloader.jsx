import React, { useEffect, useState } from "react";

const LETTERS = ["A", "D", "R", "E", "X", "K", "S"];
const MESSAGES = ["GOOD IDEAS", "CLEAR STRATEGY", "REAL GROWTH"];

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
      aria-label={`Loading Adrexks, ${Math.floor(pct)}%`}
    >
      <div className="preloader-content" style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        {/* Dedicated light architectural grid for preloader only */}
        <div className="preloader-grid" />

        {/* Ambient glow sweep */}
        <div
          className="preloader-sweep glow-brand"
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: "60vmax",
            height: "60vmax",
            opacity: 0.35,
          }}
        />

        {/* Circle in real radial fade moving from LEFT to RIGHT across ADREXKS */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: "min(520px, 72vmin)",
            height: "min(520px, 72vmin)",
            borderRadius: "50%",
            background:
              "radial-gradient(circle at center, rgba(168, 85, 247, 0.48) 0%, rgba(124, 58, 237, 0.28) 36%, rgba(88, 28, 135, 0.08) 58%, transparent 72%)",
            transform: `translate3d(calc(-50% + ${(-24 + (pct / 100) * 48).toFixed(2)}vw), -50%, 0)`,
            transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            pointerEvents: "none",
          }}
        />

        {/* Concentric orbit circle in soft fade */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: "70vmin",
            height: "70vmin",
            borderRadius: "50%",
            border: "1px solid rgba(248, 247, 251, 0.12)",
            pointerEvents: "none",
          }}
        >
          <div style={{ position: "absolute", inset: 0, animation: "spin-slow 28s linear infinite" }}>
            <span
              style={{
                position: "absolute",
                top: "-4px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "var(--brand, #8b5cf6)",
                boxShadow: "0 0 12px rgba(139, 92, 246, 0.8)",
              }}
            />
          </div>
        </div>

        {/* Inner concentric ring */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: "44vmin",
            height: "44vmin",
            borderRadius: "50%",
            border: "1px solid rgba(248, 247, 251, 0.06)",
            pointerEvents: "none",
          }}
        />



        {/* Center Letters */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 24px",
          }}
        >
          <h2
            className="font-display"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "clamp(3rem, 13.5vw, 11.5rem)",
              lineHeight: 1,
              letterSpacing: "-0.04em",
              color: "#ffffff",
              overflow: "visible",
              paddingRight: "0.35em",
            }}
          >
            {LETTERS.map((l, i) => (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  overflow: "hidden",
                  paddingBottom: "0.08em",
                  marginBottom: "-0.08em",
                  paddingRight: l === "S" ? "0.2em" : "0.02em",
                  paddingLeft: "0.02em",
                }}
              >
                <span
                  className="preloader-letter"
                  style={{
                    display: "inline-block",
                    "--d": `${80 + i * 70}ms`,
                  }}
                >
                  {l}
                </span>
              </span>
            ))}
          </h2>
        </div>

        {/* Bottom percentage & progress bar */}
        <div
          style={{
            position: "absolute",
            inset: "auto 32px 32px 32px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: "24px",
            }}
          >
            {/* Rolling Messages */}
            <div
              className="label-mono"
              style={{
                position: "relative",
                height: "22px",
                width: "240px",
                overflow: "hidden",
                color: "var(--lavender, #ddd6fe)",
                fontWeight: 600,
                letterSpacing: "0.14em",
              }}
            >
              {MESSAGES.map((m, i) => (
                <span
                  key={m}
                  className="preloader-msg"
                  style={{
                    position: "absolute",
                    inset: 0,
                    "--d": `${i * 800}ms`,
                  }}
                >
                  {m}
                </span>
              ))}
            </div>

            {/* Large Tabular Counter */}
            <div
              className="font-mono"
              style={{
                fontSize: "clamp(2.8rem, 6.5vw, 4.8rem)",
                lineHeight: 0.95,
                fontWeight: 500,
                letterSpacing: "-0.04em",
                fontVariantNumeric: "tabular-nums",
                color: "#ffffff",
              }}
            >
              {String(Math.floor(pct)).padStart(2, "0")}
              <span style={{ color: "var(--brand, #8b5cf6)" }}>%</span>
            </div>
          </div>

          {/* Bottom Progress Line */}
          <div
            style={{
              marginTop: "20px",
              height: "2px",
              width: "100%",
              background: "rgba(248, 247, 251, 0.1)",
              borderRadius: "9999px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                transformOrigin: "left",
                transform: `scaleX(${pct / 100})`,
                background: "linear-gradient(to right, #581c87, #8b5cf6, #ddd6fe)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Stage 2: smooth purple bloom wipe */}
      <div className="preloader-bloom" />
    </div>
  );
}
