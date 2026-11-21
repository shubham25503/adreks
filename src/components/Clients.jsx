import React from "react";
import { delay, RollText, SectionLabel, Star } from "./Primitives";

const CLIENTS = [
  { name: "Vama Insecticide Treatment Centre", sector: "Home services", logo: "/assets/vama-insecticide-treatment-centre.webp" },
  { name: "Treta Derma", sector: "Healthcare", logo: "/assets/treta-derma.webp" },
  { name: "Maninagar Physiotherapy Clinic", sector: "Healthcare", logo: "/assets/maninagar-physiotherapy-clinic.webp" },
  { name: "SFW The Gym", sector: "Fitness", logo: "/assets/sfw-the-gym-logo.webp" },
  { name: "Eventus Oncology", sector: "Healthcare", logo: "/assets/eventus-oncology.webp" },
  { name: "Sukhadia Khambhatwala", sector: "Food", logo: "/assets/sukhadia-khambhatwala.webp" },
  { name: "YV Products", sector: "Consumer goods", logo: "/assets/yv-products.webp" },
];

export function Clients() {
  return (
    <section
      id="clients"
      style={{
        paddingTop: "clamp(80px, 10vw, 130px)",
        paddingBottom: "clamp(90px, 11vw, 140px)",
        position: "relative",
        background: "var(--bg-surface)",
      }}
    >
      <div className="container-custom">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: "30px",
            alignItems: "flex-end",
            marginBottom: "56px",
          }}
          className="clients-head-grid"
        >
          <div>
            <SectionLabel index="03">Client Wall</SectionLabel>
            <RollText
              as="h2"
              className="font-display"
              emClassName="serif-em"
              style={{
                marginTop: "24px",
                fontSize: "clamp(2.2rem, 4.4vw, 4.4rem)",
                color: "#ffffff",
              }}
              parts={["Brands that trust us", { em: "to show up." }]}
            />
          </div>
          <p
            data-reveal
            style={{
              fontSize: "1.05rem",
              lineHeight: 1.7,
              color: "rgba(248, 246, 252, 0.65)",
              maxWidth: "440px",
              justifySelf: "end",
            }}
          >
            Healthcare, fitness, food and consumer businesses — different categories, the same need to be seen, understood and chosen.
          </p>
        </div>

        {/* Client Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "18px",
          }}
        >
          {CLIENTS.map((client, i) => (
            <div
              key={client.name}
              data-reveal
              className="spotlight"
              style={{
                ...delay((i % 4) * 80),
                minHeight: "190px",
                padding: "28px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                overflow: "hidden",
                position: "relative",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  className="label-mono"
                  style={{
                    color: "var(--brand-bright)",
                    background: "rgba(168, 85, 247, 0.12)",
                    padding: "4px 10px",
                    borderRadius: "9999px",
                  }}
                >
                  {client.sector}
                </span>
                <span className="label-mono" style={{ color: "rgba(248, 246, 252, 0.35)" }}>
                  0{i + 1}
                </span>
              </div>

              <div style={{ marginTop: "24px" }}>
                <h3
                  className="font-display"
                  style={{
                    fontSize: "1.35rem",
                    fontWeight: 600,
                    letterSpacing: "-0.03em",
                    color: "#ffffff",
                    lineHeight: 1.25,
                  }}
                >
                  {client.name}
                </h3>
              </div>

              {/* Decorative hover star */}
              <Star
                style={{
                  position: "absolute",
                  right: "-20px",
                  bottom: "-20px",
                  width: "80px",
                  height: "80px",
                  color: "rgba(168, 85, 247, 0.15)",
                  transition: "all 0.5s ease",
                  pointerEvents: "none",
                }}
              />
            </div>
          ))}

          {/* Callout Slot */}
          <div
            data-reveal
            style={{
              ...delay(240),
              minHeight: "190px",
              padding: "28px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              borderRadius: "var(--radius)",
              border: "1px dashed rgba(168, 85, 247, 0.35)",
              background: "rgba(168, 85, 247, 0.05)",
            }}
          >
            <p className="label-mono" style={{ color: "var(--brand-bright)" }}>Your Brand Next</p>
            <p className="font-display" style={{ fontSize: "1.2rem", color: "#fff", marginTop: "6px" }}>
              Ready to elevate your digital presence?
            </p>
            <a
              href="#contact"
              style={{
                marginTop: "12px",
                color: "var(--brand-bright)",
                textDecoration: "none",
                fontSize: "0.9rem",
                fontWeight: 500,
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              Start a project ↗
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 850px) {
          .clients-head-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }
      `}</style>
    </section>
  );
}
