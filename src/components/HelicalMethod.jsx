import React, { useRef } from "react";
import { RollText, SectionLabel } from "./Primitives";
import { HelixCanvas } from "./helix/HelixCanvas";

const NODES = [
  {
    key: "AD",
    index: "01",
    acronym: "AD",
    tag: "THE FOUNDATION",
    title: "Advertising & Design",
    meaning: "Brand Architecture & Visual Authority",
    summary:
      "Crafting distinctive identities, campaign systems, and high-conversion design that build immediate brand authority.",
    textPosition: "right",
    u: 0.15,
  },
  {
    key: "RE",
    index: "02",
    acronym: "RE",
    tag: "THE DISTRIBUTION",
    title: "Reach & Engagement",
    meaning: "Audience Acquisition & Community",
    summary:
      "Deploying multi-channel distribution across paid social, search, and content loops to capture qualified attention.",
    textPosition: "left",
    u: 0.40,
  },
  {
    key: "X",
    index: "03",
    acronym: "X",
    tag: "THE IMPLEMENTATION",
    title: "Execution",
    meaning: "Deployment & Conversion Engineering",
    summary:
      "Engineering frictionless landing pages, conversion funnels, and precision UX touchpoints built to perform under scale.",
    textPosition: "right",
    u: 0.65,
  },
  {
    key: "KS",
    index: "04",
    acronym: "KS",
    tag: "THE COMPOUND",
    title: "Keep Scaling",
    meaning: "Sustainable Performance & Scale",
    summary:
      "Continuously analyzing performance data, iterating creative angles, and optimizing channels for compounding growth.",
    textPosition: "left",
    u: 0.89,
  },
];

export function HelicalMethod() {
  const sectionRef = useRef(null);

  return (
    <section
      ref={sectionRef}
      id="method"
      data-theme="light"
      style={{
        paddingTop: "clamp(56px, 7vw, 88px)",
        paddingBottom: "clamp(64px, 8vw, 96px)",
        position: "relative",
        background: "radial-gradient(ellipse at 88% 0%, rgba(181, 0, 255, 0.05), transparent 45%), #f3eee6",
        color: "#161515",
        overflow: "hidden",
      }}
    >
      <HelixCanvas sectionRef={sectionRef} nodes={NODES} />

      <div className="container-custom" style={{ position: "relative", zIndex: 2 }}>
        <div style={{ marginBottom: "clamp(28px, 4vw, 48px)" }}>
          <SectionLabel index="01" theme="light">The Growth Helix</SectionLabel>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 0.8fr",
              gap: "32px",
              alignItems: "flex-end",
              marginTop: "16px",
            }}
            className="helix-intro-grid"
          >
            <div>
              <RollText
                as="h2"
                className="font-display"
                emClassName="serif-em text-brand"
                style={{
                  fontSize: "clamp(2.4rem, 4.8vw, 4.8rem)",
                  color: "#161515",
                  lineHeight: 1.05,
                  letterSpacing: "-0.04em",
                }}
                parts={["The name is our blueprint.", { em: "From vision to scale." }]}
              />
            </div>
            <div>
              <p
                style={{
                  fontSize: "1.02rem",
                  lineHeight: 1.65,
                  color: "rgba(22, 21, 21, 0.72)",
                  margin: 0,
                }}
              >
                ADREXKS is a single continuous growth helix. As you scroll, the background ribbon rotates and twists through all four phases, seamlessly linking creative vision to sustainable scale.
              </p>
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gap: "12px" }} className="helix-chapters-container">
          {NODES.map((node, idx) => {
            const isTextOnRight = node.textPosition === "right";

            return (
              <div
                key={node.key}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "clamp(20px, 3vw, 44px)",
                  alignItems: "center",
                }}
                className={`helix-chapter-row ${idx > 0 ? "helix-row-overlap" : ""} ${
                  isTextOnRight ? "node-row-right" : "node-row-left"
                }`}
              >
                {isTextOnRight ? (
                  <>
                    <div className="empty-helix-space" />
                    <div className="node-card-wrapper">
                      <NodeContentCard node={node} />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="node-card-wrapper">
                      <NodeContentCard node={node} />
                    </div>
                    <div className="empty-helix-space" />
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .helix-row-overlap {
          margin-top: -24px;
        }

        @media (max-width: 900px) {
          .helix-intro-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .helix-chapters-container {
            gap: 20px !important;
          }
          .helix-row-overlap {
            margin-top: 0 !important;
          }
          .node-row-right,
          .node-row-left {
            grid-template-columns: 1fr !important;
            gap: 0 !important;
          }
          .node-card-wrapper {
            max-width: 580px;
            margin: 0 auto;
            width: 100%;
          }
          .empty-helix-space {
            display: none !important;
          }
          .node-content-card {
            border-radius: 1.4rem !important;
            padding: 20px 18px !important;
            background: rgba(255, 255, 255, 0.95) !important;
            backdrop-filter: blur(16px) !important;
            -webkit-backdrop-filter: blur(16px) !important;
            border: 1px solid rgba(22, 21, 21, 0.1) !important;
            box-shadow: 0 12px 30px -8px rgba(22, 21, 21, 0.08) !important;
          }
        }

        @media (max-width: 640px) {
          .node-content-card {
            padding: 18px 16px !important;
          }
          .node-title {
            font-size: clamp(1.4rem, 5.5vw, 1.8rem) !important;
            margin-bottom: 8px !important;
          }
        }
      `}</style>
    </section>
  );
}

function NodeContentCard({ node }) {
  return (
    <div
      className="node-content-card"
      style={{
        background: "rgba(255, 255, 255, 0.92)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(22, 21, 21, 0.09)",
        borderRadius: "1.6rem",
        padding: "clamp(22px, 3vw, 30px)",
        boxShadow: "0 18px 45px -12px rgba(22, 21, 21, 0.08)",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "12px",
          marginBottom: "14px",
          flexWrap: "wrap",
        }}
      >
        <span
          className="label-mono font-mono"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            color: "#b500ff",
            fontWeight: 700,
            fontSize: "0.72rem",
            background: "rgba(181, 0, 255, 0.07)",
            padding: "4px 10px",
            borderRadius: "9999px",
            border: "1px solid rgba(181, 0, 255, 0.16)",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#b500ff",
            }}
          />
          PHASE {node.index} · {node.tag}
        </span>

        <span
          className="label-mono font-mono"
          style={{
            color: "rgba(22, 21, 21, 0.55)",
            fontSize: "0.72rem",
            letterSpacing: "0.06em",
          }}
        >
          {node.meaning}
        </span>
      </div>

      <h3
        className="font-display node-title"
        style={{
          fontSize: "clamp(1.5rem, 2.2vw, 2.1rem)",
          color: "#161515",
          lineHeight: 1.2,
          letterSpacing: "-0.03em",
          margin: "0 0 10px",
        }}
      >
        <span style={{ color: "#b500ff", fontFamily: "var(--font-mono, monospace)", marginRight: "8px" }}>
          {node.acronym}:
        </span>
        {node.title}
      </h3>

      <p
        className="node-desc"
        style={{
          fontSize: "0.95rem",
          lineHeight: 1.6,
          color: "rgba(22, 21, 21, 0.74)",
          margin: 0,
        }}
      >
        {node.summary}
      </p>
    </div>
  );
}
