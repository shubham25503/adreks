import React from "react";
import { PageTop } from "../components/PageTop";
import { CtaBand } from "../components/CtaBand";
import { delay, SectionLabel } from "../components/Primitives";
import { Link } from "../components/Router";
import { SERVICES_DATA } from "../data/servicesData";

export function ServiceDetailPage({ slug }) {
  const service = SERVICES_DATA.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div style={{ padding: "140px 0", textAlign: "center", background: "var(--bg-deep)" }}>
        <h2 className="font-display" style={{ fontSize: "2.4rem", color: "#fff" }}>
          Service Not Found
        </h2>
        <Link to="/services" className="btn-primary" style={{ marginTop: "20px" }}>
          Back to all services ↗
        </Link>
      </div>
    );
  }

  const otherServices = SERVICES_DATA.filter((s) => s.slug !== slug);
  const serviceIndex = SERVICES_DATA.indexOf(service) + 1;

  return (
    <div style={{ background: "var(--bg-deep)" }}>
      <PageTop
        eyebrow={service.kicker}
        title={service.title}
        description={service.intro}
      />

      <section style={{ padding: "clamp(80px, 10vw, 130px) 0" }}>
        <div className="container-custom">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
              gap: "clamp(40px, 6vw, 80px)",
              alignItems: "flex-start",
            }}
            className="service-detail-grid"
          >
            {/* Left Sticky Sidebar */}
            <aside
              style={{
                position: "sticky",
                top: "120px",
                padding: "36px 30px",
                borderRadius: "1.8rem",
                background: "rgba(18, 3, 32, 0.75)",
                border: "1px solid rgba(168, 85, 247, 0.2)",
                boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
              }}
            >
              <p className="label-mono font-mono" style={{ color: "var(--brand-bright)" }}>
                ADREKS / SERVICE 0{serviceIndex}
              </p>
              <h2 className="font-display" style={{ fontSize: "1.8rem", color: "#fff", marginTop: "12px", lineHeight: 1.2 }}>
                {service.title}
              </h2>
              <p style={{ marginTop: "14px", fontSize: "0.95rem", lineHeight: 1.65, color: "rgba(248, 246, 252, 0.7)" }}>
                {service.short}
              </p>

              <div style={{ marginTop: "24px" }}>
                <Link
                  to={`/contact?service=${encodeURIComponent(service.title)}`}
                  className="btn-primary"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  Discuss this service <span>↗</span>
                </Link>
              </div>

              {/* Related Services */}
              <div style={{ marginTop: "36px", paddingTop: "24px", borderTop: "1px solid rgba(168, 85, 247, 0.15)" }}>
                <p className="label-mono" style={{ color: "rgba(248, 246, 252, 0.5)", marginBottom: "14px" }}>
                  EXPLORE OTHER SERVICES
                </p>
                <div style={{ display: "grid", gap: "10px" }}>
                  {otherServices.slice(0, 4).map((other) => (
                    <Link
                      key={other.slug}
                      to={`/services/${other.slug}`}
                      style={{
                        color: "rgba(248, 246, 252, 0.8)",
                        textDecoration: "none",
                        fontSize: "0.9rem",
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "6px 0",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--brand-bright)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(248, 246, 252, 0.8)")}
                    >
                      <span>{other.title}</span>
                      <span style={{ color: "var(--brand-bright)" }}>↗</span>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>

            {/* Right Main Content */}
            <main style={{ display: "grid", gap: "60px" }}>
              {/* Deliverables Section */}
              <section
                style={{
                  padding: "clamp(32px, 4vw, 48px)",
                  borderRadius: "2rem",
                  background: "rgba(18, 3, 32, 0.5)",
                  border: "1px solid rgba(168, 85, 247, 0.16)",
                }}
              >
                <SectionLabel index="01">What's Included</SectionLabel>
                <h3
                  className="font-display"
                  style={{ fontSize: "clamp(2rem, 3.5vw, 3.2rem)", color: "#fff", marginTop: "16px" }}
                >
                  Thought through.<br />
                  <span className="serif-em" style={{ color: "#d8b4fe" }}>Ready to use.</span>
                </h3>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                    gap: "18px",
                    marginTop: "36px",
                  }}
                >
                  {service.deliverables.map((item, idx) => (
                    <div
                      key={item}
                      className="spotlight"
                      style={{
                        padding: "22px 20px",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "16px",
                      }}
                    >
                      <span
                        className="font-mono label-mono"
                        style={{
                          color: "var(--brand-bright)",
                          fontSize: "1rem",
                          fontWeight: 600,
                          background: "rgba(168, 85, 247, 0.15)",
                          padding: "4px 8px",
                          borderRadius: "6px",
                        }}
                      >
                        0{idx + 1}
                      </span>
                      <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "rgba(248, 246, 252, 0.85)" }}>
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Execution Steps */}
              <section
                style={{
                  padding: "clamp(32px, 4vw, 48px)",
                  borderRadius: "2rem",
                  background: "rgba(18, 3, 32, 0.5)",
                  border: "1px solid rgba(168, 85, 247, 0.16)",
                }}
              >
                <SectionLabel index="02">How We Work</SectionLabel>
                <h3
                  className="font-display"
                  style={{ fontSize: "clamp(2rem, 3.5vw, 3.2rem)", color: "#fff", marginTop: "16px" }}
                >
                  Step by step execution.
                </h3>

                <div style={{ display: "grid", gap: "20px", marginTop: "36px" }}>
                  {service.steps.map(([n, title, copy], i) => (
                    <div
                      key={n}
                      style={{
                        ...delay(i * 70),
                        display: "grid",
                        gridTemplateColumns: "60px 1fr",
                        gap: "20px",
                        padding: "24px 0",
                        borderBottom: i < service.steps.length - 1 ? "1px solid rgba(168, 85, 247, 0.14)" : "none",
                      }}
                    >
                      <span className="font-mono label-mono" style={{ fontSize: "1.2rem", color: "var(--brand-bright)" }}>
                        {n}
                      </span>
                      <div>
                        <h4 className="font-display" style={{ fontSize: "1.35rem", color: "#fff" }}>
                          {title}
                        </h4>
                        <p style={{ marginTop: "8px", fontSize: "0.98rem", lineHeight: 1.65, color: "rgba(248, 246, 252, 0.7)" }}>
                          {copy}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Built Around Your Business */}
              <section
                style={{
                  padding: "36px 32px",
                  borderRadius: "1.8rem",
                  background: "linear-gradient(135deg, rgba(35, 6, 60, 0.6) 0%, rgba(14, 2, 26, 0.8) 100%)",
                  border: "1px solid rgba(192, 132, 252, 0.3)",
                }}
              >
                <SectionLabel index="03">Built Around Your Business</SectionLabel>
                <p style={{ marginTop: "14px", fontSize: "1.05rem", lineHeight: 1.75, color: "rgba(248, 246, 252, 0.85)" }}>
                  We’ll shape the scope around your audience, current materials and goals. We’ll agree the deliverables and review points before the work begins.
                </p>
              </section>
            </main>
          </div>
        </div>
      </section>

      <CtaBand compact />

      <style>{`
        @media (max-width: 900px) {
          .service-detail-grid {
            grid-template-columns: 1fr !important;
          }
          aside {
            position: static !important;
          }
        }
      `}</style>
    </div>
  );
}
