import React from "react";
import { PageTop } from "../components/PageTop";
import { CtaBand } from "../components/CtaBand";
import { delay, SectionLabel, Star } from "../components/Primitives";

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
        description="Adreks is an advertising and design practice shaped around thoughtful creative, clear communication and the people behind the business."
      />

      {/* Main Studio Feature: Meet Kavan Desai */}
      <section
        style={{
          padding: "clamp(80px, 10vw, 130px) 0",
          position: "relative",
        }}
      >
        <div className="container-custom">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "0.85fr 1.15fr",
              gap: "clamp(40px, 6vw, 90px)",
              alignItems: "center",
            }}
            className="studio-grid"
          >
            {/* Kavan's Photo */}
            <div data-reveal="left" style={{ position: "relative", maxWidth: "460px", margin: "0 auto" }}>
              <div
                style={{
                  position: "relative",
                  borderRadius: "2.2rem",
                  overflow: "hidden",
                  border: "1px solid rgba(139, 92, 246, 0.22)",
                  boxShadow: "0 24px 60px -15px rgba(0, 0, 0, 0.85)",
                  background: "linear-gradient(180deg, #1f0433 0%, #0e021a 100%)",
                }}
              >
                <img
                  src="/assets/kavan-desai.webp"
                  alt="Kavan Desai, Founder of Adreks"
                  style={{
                    display: "block",
                    width: "100%",
                    aspectRatio: "4/5",
                    objectFit: "cover",
                    objectPosition: "50% 15%",
                  }}
                />
              </div>

              {/* Floating Badge */}
              <div
                style={{
                  position: "absolute",
                  bottom: "-14px",
                  right: "-14px",
                  padding: "14px 22px",
                  borderRadius: "1.1rem",
                  background: "rgba(12, 3, 22, 0.94)",
                  backdropFilter: "blur(14px)",
                  border: "1px solid rgba(139, 92, 246, 0.25)",
                  boxShadow: "0 12px 30px rgba(0, 0, 0, 0.6)",
                }}
              >
                <p className="label-mono" style={{ color: "var(--brand-bright)", fontSize: "0.65rem" }}>
                  Digital & Creative Lead
                </p>
                <p className="font-display" style={{ fontSize: "1.1rem", color: "#fff", marginTop: "2px" }}>
                  Kavan Desai
                </p>
              </div>

              <Star
                style={{
                  position: "absolute",
                  top: "-16px",
                  left: "-16px",
                  width: "44px",
                  height: "44px",
                  color: "var(--brand-bright)",
                  animation: "spin-slow 24s linear infinite",
                  opacity: 0.8,
                }}
              />
            </div>

            {/* Narrative */}
            <div>
              <SectionLabel index="01">A Person-First Practice</SectionLabel>
              <h2
                className="font-display"
                style={{
                  marginTop: "20px",
                  fontSize: "clamp(2.5rem, 5.2vw, 5.2rem)",
                  color: "#ffffff",
                  lineHeight: 1.05,
                }}
              >
                Meet Kavan<br />
                <span className="serif-em" style={{ color: "#ddd6fe" }}>Desai.</span>
              </h2>

              <div
                style={{
                  marginTop: "28px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "18px",
                  fontSize: "1.1rem",
                  lineHeight: 1.75,
                  color: "rgba(248, 247, 251, 0.8)",
                }}
              >
                <p data-reveal>
                  Kavan is a digital marketer and creative strategist who works across social media, advertising and design. Adreks is the studio for bringing those skills together—close collaboration, thoughtful work and a clear line from idea to execution.
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
                  gap: "clamp(20px, 4vw, 44px)",
                  marginTop: "36px",
                  paddingTop: "24px",
                  borderTop: "1px solid rgba(139, 92, 246, 0.15)",
                }}
              >
                <div>
                  <strong className="font-display" style={{ fontSize: "2.2rem", color: "var(--brand-bright)" }}>
                    100+
                  </strong>
                  <p className="label-mono" style={{ color: "rgba(248, 247, 251, 0.45)", marginTop: "4px" }}>
                    Designs created
                  </p>
                </div>
                <div>
                  <strong className="font-display" style={{ fontSize: "2.2rem", color: "var(--brand-bright)" }}>
                    10+
                  </strong>
                  <p className="label-mono" style={{ color: "rgba(248, 247, 251, 0.45)", marginTop: "4px" }}>
                    Happy clients
                  </p>
                </div>
                <div>
                  <strong className="font-display" style={{ fontSize: "2.2rem", color: "var(--brand-bright)" }}>
                    1.5+
                  </strong>
                  <p className="label-mono" style={{ color: "rgba(248, 247, 251, 0.45)", marginTop: "4px" }}>
                    Years experience
                  </p>
                </div>
              </div>

              {/* Portfolio Link */}
              <div data-reveal style={{ ...delay(280), marginTop: "36px" }}>
                <a
                  href="https://desaikavan03.github.io/kavan-desai-portfolio/"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary"
                  data-magnetic
                >
                  Explore Kavan’s full portfolio ↗
                </a>
              </div>
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

      <CtaBand compact />

      <style>{`
        @media (max-width: 900px) {
          .studio-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </div>
  );
}
