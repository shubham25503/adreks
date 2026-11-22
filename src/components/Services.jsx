import React from "react";
import { delay, RollText, SectionLabel, Star } from "./Primitives";

export const SERVICES = [
  {
    n: "01",
    title: "Social Media & Content",
    body: "Always-on social presence, planned with intent and made to stop the scroll.",
    items: [
      "Social media management",
      "Content planning and calendars",
      "Social media posts and carousels",
      "Reels and short-form video editing",
    ],
  },
  {
    n: "02",
    title: "Performance Marketing",
    body: "Paid campaigns built around the right audience, the right message and constant testing.",
    items: [
      "Meta advertising",
      "Google advertising",
      "Campaign planning",
      "Audience targeting & creative testing",
    ],
  },
  {
    n: "03",
    title: "Search & Digital Growth",
    body: "Get discovered where your customers search: on Google, on maps, and inside answer engines.",
    items: [
      "Search Engine Optimisation (SEO)",
      "Local SEO",
      "Answer Engine Optimisation (AEO)",
      "Generative Engine Optimisation (GEO)",
    ],
  },
  {
    n: "04",
    title: "Branding & Creative Design",
    body: "Identities and collateral that make a business look as good as it actually is.",
    items: [
      "Logo and brand identity",
      "Social post and carousel design",
      "Business cards and brochures",
      "Print and campaign collateral",
    ],
  },
  {
    n: "05",
    title: "Website Design & Development",
    body: "Fast, responsive digital experiences built to establish authority and convert visitors into clients.",
    items: [
      "Custom UI/UX design",
      "High-performance modern websites",
      "Landing pages & conversion funnels",
      "Mobile-first responsive development",
    ],
  },
];

export function Services() {
  const selectService = (title) => {
    window.dispatchEvent(new CustomEvent("adrexks:service", { detail: title }));
    const contact = document.getElementById("contact");
    if (contact) contact.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="services"
      style={{
        paddingTop: "clamp(90px, 11vw, 150px)",
        paddingBottom: "clamp(90px, 11vw, 140px)",
        position: "relative",
        background: "var(--bg-deep)",
      }}
    >
      <div className="container-custom">
        <SectionLabel index="03">Capabilities & Services</SectionLabel>
        <RollText
          as="h2"
          className="font-display"
          emClassName="serif-em"
          style={{
            marginTop: "32px",
            fontSize: "clamp(2.4rem, 5vw, 5rem)",
            color: "#ffffff",
          }}
          parts={["A connected set", { em: "of growth services." }]}
        />

        {/* Services Grid with Spotlight Glow */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "24px",
            marginTop: "56px",
          }}
          className="services-grid"
        >
          {SERVICES.map((service, i) => (
            <div
              key={service.n}
              data-reveal
              className="spotlight"
              style={{
                ...delay(i * 100),
                padding: "clamp(28px, 3.5vw, 44px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: "300px",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "28px",
                  }}
                >
                  <span
                    className="label-mono font-mono"
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      color: "var(--acid-lime, #D6FF75)",
                      background: "rgba(214, 255, 117, 0.08)",
                      padding: "6px 14px",
                      borderRadius: "9999px",
                      border: "1px solid rgba(214, 255, 117, 0.25)",
                    }}
                  >
                    {service.n}
                  </span>
                  <Star style={{ width: "22px", height: "22px", color: "var(--brand)", opacity: 0.6 }} />
                </div>

                <h3
                  className="font-display"
                  style={{
                    fontSize: "clamp(1.5rem, 2.2vw, 2.1rem)",
                    letterSpacing: "-0.04em",
                    color: "#ffffff",
                    lineHeight: 1.15,
                  }}
                >
                  {service.title}
                </h3>

                <p
                  style={{
                    marginTop: "16px",
                    fontSize: "0.98rem",
                    lineHeight: 1.65,
                    color: "rgba(248, 246, 252, 0.7)",
                  }}
                >
                  {service.body}
                </p>
              </div>

              {/* Action trigger */}
              <div style={{ marginTop: "32px", borderTop: "1px solid rgba(168, 85, 247, 0.15)", paddingTop: "20px" }}>
                <button
                  type="button"
                  onClick={() => selectService(service.title)}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "var(--brand-bright)",
                    fontFamily: "inherit",
                    fontSize: "0.92rem",
                    fontWeight: 500,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: 0,
                  }}
                >
                  Discuss this service
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
