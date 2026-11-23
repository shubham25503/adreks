import React, { useState } from "react";
import { delay, RollText, SectionLabel, Watermark } from "./Primitives";

export const WORK_FILTERS = ["All Work", "Campaigns", "Social Content", "Print & Branding"];

export const PROJECTS = [
  {
    client: "Lijjat Khaman House",
    type: "Campaign Creative",
    tags: ["Campaigns"],
    image: "/assets/work-khaman-campaign.webp",
    size: "tall",
  },
  {
    client: "Lijjat Food Solutions",
    type: "Print & Collateral",
    tags: ["Print & Branding"],
    image: "/assets/work-food-print.webp",
    size: "wide",
  },
  {
    client: "Sukhadia Khambhatwala",
    type: "Social Content",
    tags: ["Social Content"],
    image: "/assets/work-sweets-social.webp",
    size: "tall",
  },
  {
    client: "Lijjat Khaman House",
    type: "Outdoor & Vehicle Branding",
    tags: ["Print & Branding", "Campaigns"],
    image: "/assets/work-vehicle-branding.webp",
    size: "wide",
  },
  {
    client: "Treta Derma",
    type: "Healthcare Communication",
    tags: ["Social Content"],
    image: "/assets/work-derma.webp",
    size: "tall",
  },
  {
    client: "SFW The Gym",
    type: "Fitness & Promotional Creative",
    tags: ["Campaigns", "Social Content"],
    image: "/assets/work-gym.webp",
    size: "tall",
  },
];

export function Work() {
  const [filter, setFilter] = useState("All Work");
  const filtered = PROJECTS.filter(
    (p) => filter === "All Work" || p.tags.includes(filter)
  );

  return (
    <section
      id="work"
      data-theme="light"
      style={{
        paddingTop: "clamp(90px, 11vw, 150px)",
        paddingBottom: "clamp(90px, 11vw, 150px)",
        position: "relative",
        background: "radial-gradient(ellipse at 88% 0%, rgba(181, 0, 255, 0.05), transparent 45%), #f3eee6",
        color: "#161515",
        overflow: "hidden",
      }}
    >
      <div className="container-custom">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "24px",
            alignItems: "flex-end",
            marginBottom: "56px",
          }}
          className="work-head-grid"
        >
          <div>
            <SectionLabel index="06" theme="light">Selected Work</SectionLabel>
            <RollText
              as="h2"
              className="font-display"
              emClassName="serif-em text-brand"
              style={{
                marginTop: "24px",
                fontSize: "clamp(2.5rem, 5.5vw, 5.6rem)",
                color: "#161515",
              }}
              parts={["Work made", { em: "to be noticed." }]}
            />
          </div>

          {/* Filter Pills */}
          <div
            data-reveal
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              justifyContent: "flex-end",
            }}
          >
            {WORK_FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                style={{
                  padding: "9px 20px",
                  borderRadius: "9999px",
                  fontSize: "0.85rem",
                  fontFamily: "inherit",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  border: filter === f ? "1px solid #161515" : "1px solid rgba(22, 21, 21, 0.12)",
                  background: filter === f ? "#161515" : "#ffffff",
                  color: filter === f ? "#ffffff" : "rgba(22, 21, 21, 0.72)",
                  fontWeight: filter === f ? 600 : 400,
                  boxShadow: filter === f ? "0 4px 18px -2px rgba(22, 21, 21, 0.25)" : "0 2px 8px rgba(22, 21, 21, 0.04)",
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry / Grid */}
        <div
          key={filter}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
            gap: "32px",
          }}
          className="work-items-grid"
        >
          {filtered.map((item, i) => (
            <figure
              key={`${item.client}-${item.type}`}
              data-reveal
              data-cursor-label="View"
              style={{
                ...delay(i * 80),
                margin: 0,
                position: "relative",
                cursor: "pointer",
              }}
              className="group"
            >
              <div
                style={{
                  position: "relative",
                  borderRadius: "1.8rem",
                  overflow: "hidden",
                  background: "rgba(25, 4, 42, 0.8)",
                  border: "1px solid rgba(168, 85, 247, 0.22)",
                  boxShadow: "0 20px 50px -15px rgba(0, 0, 0, 0.7)",
                }}
              >
                <img
                  src={item.image}
                  alt={`${item.client}: ${item.type}`}
                  loading="lazy"
                  style={{
                    width: "100%",
                    display: "block",
                    aspectRatio: item.size === "wide" ? "16/10" : "4/5",
                    objectFit: "cover",
                    transition: "transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.06)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                />

                {/* Ambient vignette gradient */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(7, 1, 14, 0.85) 0%, transparent 55%)",
                    pointerEvents: "none",
                  }}
                />

                {/* Top sector badge */}
                <span
                  className="label-mono"
                  style={{
                    position: "absolute",
                    top: "18px",
                    left: "18px",
                    background: "rgba(10, 1, 20, 0.82)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    color: "var(--brand-bright)",
                    padding: "6px 14px",
                    borderRadius: "9999px",
                    border: "1px solid rgba(168, 85, 247, 0.3)",
                  }}
                >
                  {item.tags[0]}
                </span>

                {/* Bottom title pill */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "20px",
                    left: "20px",
                    right: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                  }}
                >
                  <span
                    style={{
                      background: "linear-gradient(135deg, var(--brand), var(--brand-deep))",
                      color: "#fff",
                      padding: "6px 14px",
                      borderRadius: "9999px",
                      fontSize: "0.82rem",
                      fontWeight: 500,
                    }}
                  >
                    {item.type}
                  </span>
                  <span
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "rgba(255, 255, 255, 0.15)",
                      backdropFilter: "blur(8px)",
                      display: "grid",
                      placeItems: "center",
                      color: "#fff",
                      fontSize: "1rem",
                    }}
                  >
                    ↗
                  </span>
                </div>
              </div>

              {/* Caption */}
              <figcaption
                style={{
                  marginTop: "16px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                }}
              >
                <span className="font-display" style={{ fontSize: "1.25rem", color: "#161515" }}>
                  {item.client}
                </span>
                <span className="label-mono" style={{ color: "rgba(22, 21, 21, 0.45)" }}>
                  0{PROJECTS.indexOf(item) + 1}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .work-head-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .work-items-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
