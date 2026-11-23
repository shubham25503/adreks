import React from "react";
import { PageTop } from "../components/PageTop";
import { CtaBand } from "../components/CtaBand";
import { delay, SectionLabel } from "../components/Primitives";
import { Link } from "../components/Router";

const PRINCIPLES = [
  {
    n: "01",
    title: "Start with people.",
    desc: "Useful work begins with understanding the customer, not just the platform.",
  },
  {
    n: "02",
    title: "Make it feel considered.",
    desc: "Every visual and every word should have a reason to be there.",
  },
  {
    n: "03",
    title: "Keep learning.",
    desc: "Notice what connects, share what we learn and use it to make the next round stronger.",
  },
];

export function StudioPage() {
  return (
    <div style={{ background: "var(--bg-deep)" }}>
      <PageTop
        eyebrow="THE STUDIO · THE PERSON · THE POINT OF VIEW"
        title={
          <>
            Independent by nature.<br />
            <span className="serif-em" style={{ color: "#ddd6fe" }}>Collaborative by choice.</span>
          </>
        }
        description="Adrexks is an advertising and design practice shaped around thoughtful creative, clear communication and the people behind the business."
      />

      {/* Main Studio Feature: Meet Kavan Desai (Light Section) */}
      <section
        data-theme="light"
        style={{
          padding: "clamp(80px, 10vw, 130px) 0",
          position: "relative",
          background: "radial-gradient(ellipse at 85% 0%, rgba(181, 0, 255, 0.05), transparent 45%), #f3eee6",
          color: "#161515",
        }}
      >
        <div className="container-custom" style={{ maxWidth: "1080px" }}>
          <div>
            <SectionLabel index="01" theme="light">A Person-First Practice</SectionLabel>
            <h2
              className="font-display"
              style={{
                marginTop: "20px",
                fontSize: "clamp(2.5rem, 5.2vw, 5.2rem)",
                color: "#161515",
                lineHeight: 1.05,
              }}
            >
              Meet Kavan<br />
              <span className="serif-em text-brand" style={{ color: "#b500ff" }}>Desai.</span>
            </h2>

            <div
              style={{
                marginTop: "28px",
                display: "flex",
                flexDirection: "column",
                gap: "18px",
                fontSize: "1.12rem",
                lineHeight: 1.8,
                color: "rgba(22, 21, 21, 0.8)",
                maxWidth: "860px",
              }}
            >
              <p data-reveal>
                Kavan is a digital marketer and creative strategist working across social media, advertising, and brand design. Adrexks brings these disciplines together through close collaboration, thoughtful execution, and a direct line from concept to rollout.
              </p>
              <p data-reveal style={delay(100)}>
                From a social post to a brand identity or a paid campaign, each project starts by understanding the people the work needs to reach.
              </p>
            </div>

            {/* Stats */}
            <div
              data-reveal
              style={{
                ...delay(200),
                display: "flex",
                gap: "clamp(24px, 5vw, 64px)",
                marginTop: "44px",
                paddingTop: "32px",
                borderTop: "1px solid rgba(22, 21, 21, 0.12)",
                flexWrap: "wrap",
              }}
            >
              <div>
                <strong className="font-display" style={{ fontSize: "2.4rem", color: "#b500ff" }}>
                  100+
                </strong>
                <p className="label-mono" style={{ color: "rgba(22, 21, 21, 0.5)", marginTop: "4px" }}>
                  Designs created
                </p>
              </div>
              <div>
                <strong className="font-display" style={{ fontSize: "2.4rem", color: "#b500ff" }}>
                  10+
                </strong>
                <p className="label-mono" style={{ color: "rgba(22, 21, 21, 0.5)", marginTop: "4px" }}>
                  Happy clients
                </p>
              </div>
              <div>
                <strong className="font-display" style={{ fontSize: "2.4rem", color: "#b500ff" }}>
                  1.5+
                </strong>
                <p className="label-mono" style={{ color: "rgba(22, 21, 21, 0.5)", marginTop: "4px" }}>
                  Years experience
                </p>
              </div>
            </div>

            {/* Action Button */}
            <div data-reveal style={{ ...delay(280), marginTop: "40px" }}>
              <Link
                to="/contact"
                className="btn-primary"
                data-magnetic
              >
                Start a conversation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Principles Section */}
      <section
        style={{
          padding: "clamp(70px, 9vw, 120px) 0",
          background: "var(--bg-surface)",
          borderTop: "1px solid rgba(139, 92, 246, 0.12)",
        }}
      >
        <div className="container-custom">
          <SectionLabel index="02">How We Think</SectionLabel>
          <h2
            className="font-display"
            style={{
              marginTop: "20px",
              fontSize: "clamp(2.2rem, 4.4vw, 4.4rem)",
              color: "#ffffff",
            }}
          >
            Core Studio Principles
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "24px",
              marginTop: "48px",
            }}
          >
            {PRINCIPLES.map((p, i) => (
              <div
                key={p.n}
                data-reveal
                className="spotlight"
                style={{
                  ...delay(i * 100),
                  padding: "36px 30px",
                  display: "flex",
                  flexDirection: "column",
                  borderTop: "2px solid var(--brand)",
                }}
              >
                <span className="label-mono font-mono" style={{ color: "var(--brand-bright)", fontSize: "1.1rem" }}>
                  {p.n}
                </span>
                <h3 className="font-display" style={{ fontSize: "1.45rem", color: "#fff", marginTop: "18px" }}>
                  {p.title}
                </h3>
                <p style={{ marginTop: "12px", fontSize: "0.98rem", lineHeight: 1.7, color: "rgba(248, 247, 251, 0.7)" }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand compact theme="light" />
    </div>
  );
}
