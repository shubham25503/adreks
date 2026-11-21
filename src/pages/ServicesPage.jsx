import React from "react";
import { PageTop } from "../components/PageTop";
import { CtaBand } from "../components/CtaBand";
import { delay, SectionLabel, Star } from "../components/Primitives";
import { Link } from "../components/Router";
import { SERVICES_DATA } from "../data/servicesData";

export function ServicesPage() {
  return (
    <div style={{ background: "var(--bg-deep)" }}>
      <PageTop
        eyebrow="SERVICES · STRATEGY THROUGH EXECUTION"
        title={
          <>
            A connected set<br />
            of <span className="serif-em" style={{ color: "#d8b4fe" }}>growth services.</span>
          </>
        }
        description="From the way your brand looks to the way it gets found, followed and chosen, Adrexks brings the right creative and marketing work together."
      />

      {/* Services Grid */}
      <section style={{ padding: "clamp(80px, 10vw, 130px) 0" }}>
        <div className="container-custom">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: "50px",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            <div>
              <SectionLabel index="01">All Disciplines</SectionLabel>
              <h2
                className="font-display"
                style={{ fontSize: "clamp(2rem, 3.8vw, 3.8rem)", color: "#fff", marginTop: "12px" }}
              >
                Comprehensive Creative & Marketing Scope
              </h2>
            </div>
            <p className="label-mono" style={{ color: "var(--brand-bright)" }}>
              07 DISCIPLINES / ONE CREATIVE PARTNER
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
              gap: "28px",
            }}
          >
            {SERVICES_DATA.map((service, i) => (
              <div
                key={service.slug}
                data-reveal
                className="spotlight"
                style={{
                  ...delay(i * 70),
                  padding: "clamp(28px, 3.5vw, 40px)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: "380px",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <span className="label-mono" style={{ color: "var(--brand-bright)" }}>
                      {service.kicker}
                    </span>
                    <span
                      className="font-mono label-mono"
                      style={{
                        color: "rgba(248, 246, 252, 0.4)",
                        background: "rgba(168, 85, 247, 0.1)",
                        padding: "4px 10px",
                        borderRadius: "9999px",
                      }}
                    >
                      0{i + 1}
                    </span>
                  </div>

                  <h3
                    className="font-display"
                    style={{
                      fontSize: "1.75rem",
                      color: "#ffffff",
                      lineHeight: 1.2,
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {service.title}
                  </h3>

                  <p
                    style={{
                      marginTop: "14px",
                      fontSize: "0.98rem",
                      lineHeight: 1.65,
                      color: "rgba(248, 246, 252, 0.72)",
                    }}
                  >
                    {service.short}
                  </p>

                  {/* Deliverables snippet */}
                  <ul
                    style={{
                      marginTop: "20px",
                      listStyle: "none",
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "6px",
                    }}
                  >
                    {service.deliverables.slice(0, 3).map((item) => (
                      <li
                        key={item}
                        style={{
                          fontSize: "0.8rem",
                          padding: "5px 12px",
                          borderRadius: "9999px",
                          background: "rgba(255, 255, 255, 0.04)",
                          border: "1px solid rgba(168, 85, 247, 0.16)",
                          color: "rgba(248, 246, 252, 0.8)",
                        }}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ marginTop: "32px", paddingTop: "20px", borderTop: "1px solid rgba(168, 85, 247, 0.15)" }}>
                  <Link
                    to={`/services/${service.slug}`}
                    style={{
                      color: "var(--brand-bright)",
                      textDecoration: "none",
                      fontSize: "0.92rem",
                      fontWeight: 600,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    Explore service in detail <span style={{ color: "var(--acid-lime, #D6FF75)" }}>↗</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform & Formats Ribbon */}
      <section
        style={{
          padding: "48px 0",
          background: "linear-gradient(90deg, #10021c 0%, #1e0338 50%, #10021c 100%)",
          borderTop: "1px solid rgba(168, 85, 247, 0.2)",
          borderBottom: "1px solid rgba(168, 85, 247, 0.2)",
          textAlign: "center",
        }}
      >
        <div className="container-custom">
          <p className="label-mono" style={{ color: "var(--brand-bright)", marginBottom: "16px" }}>
            CHANNELS & FORMATS WE WORK ACROSS
          </p>
          <div
            className="font-display"
            style={{
              fontSize: "clamp(1.1rem, 2.2vw, 1.8rem)",
              letterSpacing: "0.06em",
              color: "#fff",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "clamp(12px, 2vw, 24px)",
            }}
          >
            {[
              "INSTAGRAM",
              "FACEBOOK",
              "LINKEDIN",
              "GOOGLE ADS",
              "META ADS",
              "SEARCH",
              "PRINT",
              "SHORT-FORM VIDEO",
            ].map((channel, i) => (
              <span key={channel} style={{ display: "inline-flex", alignItems: "center", gap: "16px" }}>
                <span>{channel}</span>
                {i < 7 && <span style={{ color: "var(--brand)", opacity: 0.5 }}>·</span>}
              </span>
            ))}
          </div>
        </div>
      </section>

      <CtaBand compact />
    </div>
  );
}
