import React, { useState } from "react";
import { PageTop } from "../components/PageTop";
import { CtaBand } from "../components/CtaBand";
import { delay, NinjaStar, RollText, SectionLabel, Star } from "../components/Primitives";
import { Link } from "../components/Router";

const REASONS = [
  {
    n: "01",
    tag: "UNIFIED EXECUTION",
    title: "One connected team, zero handoffs.",
    desc: "Strategy, social content, paid ads, SEO/AEO/GEO, branding, and web development all happen under one roof so your message never fractures across vendors.",
  },
  {
    n: "02",
    tag: "DIRECT ACCESS",
    title: "Founder-led clarity & speed.",
    desc: "Work directly with Kavan Desai and the core creative team from first brief to final rollout. No telephone game, no slow agency layers.",
  },
  {
    n: "03",
    tag: "DESIGN + ROI",
    title: "Creative built to convert.",
    desc: "Good design earns attention; smart positioning turns it into enquiries. Every post, ad, and landing page is crafted for both brand authority and performance.",
  },
  {
    n: "04",
    tag: "COMPOUNDING GROWTH",
    title: "Honest numbers & weekly iteration.",
    desc: "We track what actually drives leads and revenue, test new creative angles consistently, and refine every round based on real customer response.",
  },
];

const COMPARISON = [
  {
    typical: "Separate vendors for design, ads, social, and web",
    adrexks: "One integrated team aligning brand, content, ads, and site",
  },
  {
    typical: "Layers of account managers slowing down feedback",
    adrexks: "Direct line to the creative and marketing lead",
  },
  {
    typical: "Recycled templates and vanity impressions",
    adrexks: "Distinctive creative tailored to qualified conversions",
  },
  {
    typical: "Set-and-forget campaigns that stall after week two",
    adrexks: "Continuous angle testing, CRO, and performance scaling",
  },
];

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

export function WhyUsPage() {
  const [hoveredReason, setHoveredReason] = useState(null);

  return (
    <div style={{ background: "var(--bg-deep)" }}>
      <PageTop
        eyebrow="WHY WE · ABOUT ADREXKS · VISION & MISSION"
        title={
          <>
            Why brands choose<br />
            <span className="serif-em" style={{ color: "#ddd6fe" }}>Adrexks.</span>
          </>
        }
        description="An independent digital marketing and creative agency in Ahmedabad - uniting strategy, design, and measurable performance under one accountable roof."
      />

      {/* Section 01: About Us & Meet Kavan Desai (Light Section) */}
      <section
        data-theme="light"
        style={{
          padding: "clamp(72px, 9vw, 120px) 0",
          position: "relative",
          background: "radial-gradient(ellipse at 85% 0%, rgba(181, 0, 255, 0.05), transparent 45%), #f3eee6",
          color: "#161515",
        }}
      >
        <div className="container-custom">
          <SectionLabel index="01" theme="light">About Us & Leadership</SectionLabel>

          <RollText
            as="h2"
            className="font-display"
            emClassName="serif-em text-brand"
            style={{
              marginTop: "20px",
              maxWidth: "980px",
              fontSize: "clamp(2.3rem, 4.8vw, 4.8rem)",
              color: "#161515",
              lineHeight: 1.04,
              letterSpacing: "-0.04em",
            }}
            parts={["A founder-led practice built around", { em: "people & results." }]}
          />

          <div
            className="why-intro-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1.05fr 0.95fr",
              gap: "clamp(28px, 4vw, 48px)",
              marginTop: "40px",
              alignItems: "stretch",
            }}
          >
            {/* About Adrexks */}
            <div
              data-reveal="left"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "20px",
                fontSize: "1.06rem",
                lineHeight: 1.78,
                color: "rgba(22, 21, 21, 0.8)",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <p style={{ margin: 0 }}>
                  <strong style={{ color: "#161515" }}>Adrexks</strong> is an independent advertising, creative design, and digital marketing agency built for businesses that want their brand to look sharp and perform harder.
                </p>
                <p style={{ margin: 0 }}>
                  Instead of splitting social media, paid ads, search visibility, branding, and website development across disconnected freelancers, we bring every piece into one cohesive growth system.
                </p>
              </div>

              {/* Stats */}
              <div
                style={{
                  display: "flex",
                  gap: "clamp(24px, 4vw, 48px)",
                  paddingTop: "24px",
                  borderTop: "1px solid rgba(22, 21, 21, 0.12)",
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <strong className="font-display" style={{ fontSize: "2.2rem", color: "#b500ff" }}>
                    100+
                  </strong>
                  <p className="label-mono" style={{ color: "rgba(22, 21, 21, 0.55)", marginTop: "4px" }}>
                    Designs created
                  </p>
                </div>
                <div>
                  <strong className="font-display" style={{ fontSize: "2.2rem", color: "#b500ff" }}>
                    10+
                  </strong>
                  <p className="label-mono" style={{ color: "rgba(22, 21, 21, 0.55)", marginTop: "4px" }}>
                    Happy clients
                  </p>
                </div>
                <div>
                  <strong className="font-display" style={{ fontSize: "2.2rem", color: "#b500ff" }}>
                    1.5+
                  </strong>
                  <p className="label-mono" style={{ color: "rgba(22, 21, 21, 0.55)", marginTop: "4px" }}>
                    Years experience
                  </p>
                </div>
              </div>
            </div>

            {/* Meet Kavan Desai Card (No Image) */}
            <div
              data-reveal="right"
              style={{
                padding: "clamp(26px, 3.5vw, 36px)",
                borderRadius: "1.8rem",
                background: "#ffffff",
                border: "1px solid rgba(22, 21, 21, 0.09)",
                boxShadow: "0 18px 48px -14px rgba(22, 21, 21, 0.08)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "18px",
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
                  <span
                    className="label-mono font-mono"
                    style={{
                      color: "#b500ff",
                      background: "rgba(181, 0, 255, 0.08)",
                      padding: "4px 12px",
                      borderRadius: "9999px",
                      fontWeight: 700,
                      fontSize: "0.72rem",
                    }}
                  >
                    FOUNDER · DIGITAL & CREATIVE LEAD
                  </span>
                  <Star
                    style={{
                      width: "20px",
                      height: "20px",
                      color: "#b500ff",
                      animation: "spin-slow 20s linear infinite",
                    }}
                  />
                </div>

                <h3
                  className="font-display"
                  style={{
                    fontSize: "clamp(1.7rem, 2.6vw, 2.3rem)",
                    color: "#161515",
                    marginTop: "18px",
                    lineHeight: 1.15,
                  }}
                >
                  Meet <span className="serif-em" style={{ color: "#b500ff" }}>Kavan Desai</span>
                </h3>

                <p style={{ marginTop: "14px", fontSize: "0.98rem", lineHeight: 1.72, color: "rgba(22, 21, 21, 0.78)" }}>
                  Kavan is a digital marketer and creative strategist working across social media, paid advertising, and brand design. At Adrexks, he leads strategy and execution with a direct line from first concept to final rollout.
                </p>
                <p style={{ marginTop: "12px", fontSize: "0.95rem", lineHeight: 1.7, color: "rgba(22, 21, 21, 0.68)" }}>
                  From a single social post to a complete brand identity or performance campaign, every project starts by understanding the people the work needs to reach.
                </p>
              </div>

              <div style={{ paddingTop: "16px", borderTop: "1px solid rgba(22, 21, 21, 0.08)" }}>
                <Link to="/contact" className="btn-primary" data-magnetic>
                  Work with Kavan & Team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 02: Our Vision, Our Mission & Core Principles (Dark Section) */}
      <section
        style={{
          padding: "clamp(72px, 9vw, 120px) 0",
          background: "var(--bg-surface)",
          borderTop: "1px solid rgba(139, 92, 246, 0.12)",
          position: "relative",
        }}
      >
        <div className="container-custom">
          <SectionLabel index="02">Vision, Mission & Principles</SectionLabel>
          <RollText
            as="h2"
            className="font-display"
            emClassName="serif-em"
            style={{
              marginTop: "20px",
              fontSize: "clamp(2.2rem, 4.4vw, 4.4rem)",
              color: "#ffffff",
              lineHeight: 1.06,
            }}
            parts={["Where we are heading", { em: "and how we build." }]}
          />

          {/* Vision & Mission Cards */}
          <div
            className="why-compare-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "24px",
              marginTop: "42px",
            }}
          >
            <div
              data-reveal="left"
              className="spotlight"
              style={{
                padding: "clamp(28px, 3.5vw, 38px)",
                borderRadius: "1.6rem",
                background: "linear-gradient(145deg, rgba(168, 85, 247, 0.12) 0%, rgba(16, 4, 28, 0.92) 100%)",
                border: "1px solid rgba(192, 132, 252, 0.28)",
              }}
            >
              <span className="label-mono font-mono" style={{ color: "var(--acid-lime)", fontSize: "0.75rem" }}>
                01 · OUR VISION
              </span>
              <h3 className="font-display" style={{ fontSize: "1.65rem", color: "#fff", marginTop: "14px", lineHeight: 1.25 }}>
                Creative authority & measurable growth, unified.
              </h3>
              <p style={{ marginTop: "14px", fontSize: "1rem", lineHeight: 1.75, color: "rgba(248, 247, 251, 0.76)" }}>
                To be the most trusted creative growth partner for ambitious businesses - where standout design, clear storytelling, and disciplined digital performance work seamlessly as one.
              </p>
            </div>

            <div
              data-reveal="right"
              className="spotlight"
              style={{
                padding: "clamp(28px, 3.5vw, 38px)",
                borderRadius: "1.6rem",
                background: "linear-gradient(145deg, rgba(168, 85, 247, 0.12) 0%, rgba(16, 4, 28, 0.92) 100%)",
                border: "1px solid rgba(192, 132, 252, 0.28)",
              }}
            >
              <span className="label-mono font-mono" style={{ color: "var(--acid-lime)", fontSize: "0.75rem" }}>
                02 · OUR MISSION
              </span>
              <h3 className="font-display" style={{ fontSize: "1.65rem", color: "#fff", marginTop: "14px", lineHeight: 1.25 }}>
                Turn attention into lasting customer trust.
              </h3>
              <p style={{ marginTop: "14px", fontSize: "1rem", lineHeight: 1.75, color: "rgba(248, 247, 251, 0.76)" }}>
                To help growing brands cut through industry noise with thoughtful strategy, cohesive visual identity, and continuous marketing execution that compounds over time.
              </p>
            </div>
          </div>

          {/* 3 Core Principles */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "24px",
              marginTop: "28px",
            }}
          >
            {PRINCIPLES.map((p, i) => (
              <div
                key={p.n}
                data-reveal
                className="spotlight"
                style={{
                  ...delay(i * 100),
                  padding: "30px 26px",
                  display: "flex",
                  flexDirection: "column",
                  borderTop: "2px solid var(--brand)",
                }}
              >
                <span className="label-mono font-mono" style={{ color: "var(--brand-bright)", fontSize: "1.05rem" }}>
                  {p.n}
                </span>
                <h3 className="font-display" style={{ fontSize: "1.35rem", color: "#fff", marginTop: "12px" }}>
                  {p.title}
                </h3>
                <p style={{ marginTop: "10px", fontSize: "0.95rem", lineHeight: 1.65, color: "rgba(248, 247, 251, 0.7)" }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 03: Why Select Adrexks + Comparison (Light Section) */}
      <section
        data-theme="light"
        style={{
          padding: "clamp(72px, 9vw, 120px) 0",
          position: "relative",
          background: "radial-gradient(ellipse at 15% 100%, rgba(181, 0, 255, 0.05), transparent 45%), #f3eee6",
          color: "#161515",
        }}
      >
        <div className="container-custom">
          <SectionLabel index="03" theme="light">Why Select Adrexks</SectionLabel>

          <RollText
            as="h2"
            className="font-display"
            emClassName="serif-em text-brand"
            style={{
              marginTop: "20px",
              marginBottom: "44px",
              maxWidth: "900px",
              fontSize: "clamp(2.2rem, 4.4vw, 4.4rem)",
              color: "#161515",
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
            }}
            parts={["Built to make your brand", { em: "impossible to overlook." }]}
          />

          {/* 4 Interactive Differentiator Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "20px",
            }}
          >
            {REASONS.map((r, i) => {
              const isHovered = hoveredReason === i;
              return (
                <div
                  key={r.n}
                  data-reveal
                  onMouseEnter={() => setHoveredReason(i)}
                  onMouseLeave={() => setHoveredReason(null)}
                  style={{
                    ...delay(i * 90),
                    padding: "28px 24px",
                    borderRadius: "1.6rem",
                    background: "#ffffff",
                    border: isHovered
                      ? "1px solid rgba(181, 0, 255, 0.4)"
                      : "1px solid rgba(22, 21, 21, 0.08)",
                    boxShadow: isHovered
                      ? "0 22px 50px -12px rgba(181, 0, 255, 0.14)"
                      : "0 12px 35px -10px rgba(22, 21, 21, 0.06)",
                    transform: isHovered ? "translateY(-6px)" : "translateY(0)",
                    transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease, border-color 0.35s ease",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "16px",
                    }}
                  >
                    <span
                      className="label-mono font-mono"
                      style={{
                        color: "#b500ff",
                        background: "rgba(181, 0, 255, 0.08)",
                        padding: "4px 10px",
                        borderRadius: "9999px",
                        fontWeight: 700,
                        fontSize: "0.72rem",
                      }}
                    >
                      {r.n} · {r.tag}
                    </span>
                    <NinjaStar
                      style={{
                        width: "16px",
                        height: "16px",
                        color: isHovered ? "#b500ff" : "rgba(22, 21, 21, 0.25)",
                        transform: isHovered ? "rotate(90deg) scale(1.15)" : "rotate(0deg) scale(1)",
                        transition: "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), color 0.3s ease",
                      }}
                    />
                  </div>

                  <h3
                    className="font-display"
                    style={{
                      fontSize: "1.35rem",
                      color: "#161515",
                      lineHeight: 1.2,
                      letterSpacing: "-0.025em",
                    }}
                  >
                    {r.title}
                  </h3>

                  <p
                    style={{
                      marginTop: "10px",
                      fontSize: "0.94rem",
                      lineHeight: 1.65,
                      color: "rgba(22, 21, 21, 0.72)",
                    }}
                  >
                    {r.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Typical Agency vs ADREXKS Comparison */}
          <div
            className="why-compare-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "24px",
              marginTop: "32px",
            }}
          >
            <div
              data-reveal="left"
              style={{
                padding: "30px 26px",
                borderRadius: "1.6rem",
                background: "#ffffff",
                border: "1px solid rgba(22, 21, 21, 0.09)",
              }}
            >
              <p className="label-mono" style={{ color: "rgba(22, 21, 21, 0.5)", marginBottom: "16px" }}>
                TYPICAL AGENCY MODEL
              </p>
              <ul style={{ listStyle: "none", display: "grid", gap: "12px" }}>
                {COMPARISON.map((row) => (
                  <li
                    key={row.typical}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "12px",
                      color: "rgba(22, 21, 21, 0.68)",
                      fontSize: "0.95rem",
                      lineHeight: 1.55,
                    }}
                  >
                    <span style={{ color: "rgba(22, 21, 21, 0.35)", fontWeight: 700 }}>×</span>
                    <span>{row.typical}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              data-reveal="right"
              style={{
                padding: "30px 26px",
                borderRadius: "1.6rem",
                background: "#161515",
                color: "#ffffff",
                border: "1px solid rgba(181, 0, 255, 0.35)",
                boxShadow: "0 20px 50px -15px rgba(22, 21, 21, 0.22)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <p className="label-mono" style={{ color: "var(--acid-lime)" }}>
                  WITH ADREXKS
                </p>
                <Star
                  style={{
                    width: "18px",
                    height: "18px",
                    color: "var(--acid-lime)",
                    animation: "spin-slow 18s linear infinite",
                  }}
                />
              </div>
              <ul style={{ listStyle: "none", display: "grid", gap: "12px" }}>
                {COMPARISON.map((row) => (
                  <li
                    key={row.adrexks}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "12px",
                      color: "#ffffff",
                      fontSize: "0.96rem",
                      lineHeight: 1.55,
                      fontWeight: 500,
                    }}
                  >
                    <span style={{ color: "var(--acid-lime)", fontWeight: 700 }}>✓</span>
                    <span>{row.adrexks}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CtaBand compact />

      <style>{`
        @media (max-width: 900px) {
          .why-intro-grid,
          .why-compare-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
