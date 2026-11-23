import React from "react";
import { delay, RollText, SectionLabel } from "./Primitives";

const STEPS = [
  { n: "01", title: "Discover", body: "Understand the business, audience and challenge." },
  { n: "02", title: "Strategise", body: "Identify the correct direction, channels and creative approach." },
  { n: "03", title: "Create & Execute", body: "Turn the strategy into creative work, campaigns and digital activities." },
  { n: "04", title: "Learn & Optimise", body: "Review performance, learn from results and continuously improve." },
];

export function Process() {
  return (
    <section
      id="process"
      style={{
        paddingTop: "clamp(80px, 10vw, 130px)",
        paddingBottom: "clamp(80px, 10vw, 130px)",
        position: "relative",
        background: "radial-gradient(ellipse at 15% 100%, rgba(181, 0, 255, 0.05), transparent 45%), #f3eee6",
        color: "#161515",
      }}
    >
      <div className="container-custom">
        <SectionLabel index="04" theme="light">How We Work</SectionLabel>
        <RollText
          as="h2"
          className="font-display"
          emClassName="serif-em text-brand"
          style={{
            marginTop: "28px",
            fontSize: "clamp(2.2rem, 4.5vw, 4.6rem)",
            color: "#161515",
          }}
          parts={["A clear, accountable", { em: "way to build." }]}
        />

        {/* 4 Steps Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "20px",
            marginTop: "56px",
          }}
        >
          {STEPS.map((step, i) => (
            <div
              key={step.n}
              data-reveal
              style={{
                ...delay(i * 90),
                padding: "32px 28px",
                background: "#ffffff",
                border: "1px solid rgba(22, 21, 21, 0.09)",
                boxShadow: "0 12px 35px -8px rgba(22, 21, 21, 0.07)",
                borderRadius: "var(--radius)",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                transition: "transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease",
              }}
            >
              {/* Top Accent Line */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: "28px",
                  right: "28px",
                  height: "2px",
                  background: "linear-gradient(90deg, #b500ff, transparent)",
                }}
              />

              <span
                className="font-mono label-mono"
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  color: "#b500ff",
                  marginBottom: "24px",
                }}
              >
                {step.n}
              </span>

              <h3
                className="font-display"
                style={{
                  fontSize: "1.45rem",
                  letterSpacing: "-0.03em",
                  color: "#161515",
                  lineHeight: 1.2,
                }}
              >
                {step.title}
              </h3>

              <p
                style={{
                  marginTop: "14px",
                  fontSize: "0.95rem",
                  lineHeight: 1.65,
                  color: "rgba(22, 21, 21, 0.65)",
                }}
              >
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
