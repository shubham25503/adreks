import React from "react";
import { AdrexksLogo } from "./Primitives";
import { NAV_LINKS } from "./Navbar";
import { SERVICES } from "./Services";

export function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      style={{
        background: "#05010a",
        borderTop: "1px solid rgba(168, 85, 247, 0.16)",
        position: "relative",
        overflow: "hidden",
        paddingTop: "clamp(60px, 8vw, 100px)",
        paddingBottom: "40px",
      }}
    >
      <div className="container-custom">
        {/* Top Big Banner CTA */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: "28px",
            paddingBottom: "clamp(40px, 6vw, 70px)",
            borderBottom: "1px solid rgba(168, 85, 247, 0.15)",
          }}
        >
          <div>
            <p className="label-mono" style={{ color: "var(--brand-bright)", marginBottom: "8px" }}>
              Ready for what's next?
            </p>
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(2.5rem, 5.2vw, 5.2rem)",
                lineHeight: 1,
                color: "#ffffff",
              }}
            >
              Ideas into <span className="serif-em" style={{ color: "#d8b4fe" }}>impact.</span>
            </h2>
          </div>

          <a href="#contact" className="btn-primary" data-magnetic style={{ padding: "14px 32px" }}>
            Start a project
          </a>
        </div>

        {/* 4-column Links Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 0.8fr 1fr 0.8fr",
            gap: "clamp(30px, 4vw, 60px)",
            padding: "60px 0",
          }}
          className="footer-links-grid"
        >
          {/* Brand info */}
          <div>
            <AdrexksLogo size={34} />
            <p
              style={{
                marginTop: "20px",
                maxWidth: "340px",
                fontSize: "0.95rem",
                lineHeight: 1.7,
                color: "rgba(248, 246, 252, 0.65)",
              }}
            >
              An independent digital & creative agency bringing strategy, creative and growth together for ambitious businesses.
            </p>
            <p className="label-mono" style={{ color: "rgba(248, 246, 252, 0.4)", marginTop: "24px" }}>
              Ahmedabad, India · Working everywhere
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="label-mono" style={{ color: "var(--brand-bright)" }}>
              Navigate
            </p>
            <ul style={{ listStyle: "none", marginTop: "16px", display: "grid", gap: "10px" }}>
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    style={{
                      color: "rgba(248, 246, 252, 0.75)",
                      textDecoration: "none",
                      fontSize: "0.92rem",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(248, 246, 252, 0.75)")}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Capabilities */}
          <div>
            <p className="label-mono" style={{ color: "var(--brand-bright)" }}>
              Capabilities
            </p>
            <ul style={{ listStyle: "none", marginTop: "16px", display: "grid", gap: "10px" }}>
              {SERVICES.map((s) => (
                <li key={s.n} style={{ color: "rgba(248, 246, 252, 0.75)", fontSize: "0.92rem" }}>
                  {s.title}
                </li>
              ))}
            </ul>
          </div>

          {/* Say hello */}
          <div>
            <p className="label-mono" style={{ color: "var(--brand-bright)" }}>
              Say Hello
            </p>
            <div style={{ marginTop: "16px", display: "grid", gap: "10px" }}>
              <a
                href="mailto:hello@adrexks.in"
                style={{
                  color: "#fff",
                  textDecoration: "none",
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--acid-lime, #D6FF75)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#fff")}
              >
                hello@adrexks.in
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: "1px solid rgba(168, 85, 247, 0.12)",
            paddingTop: "28px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <p className="label-mono" style={{ color: "rgba(248, 246, 252, 0.4)" }}>
            © {year} ADREXKS. ALL RIGHTS RESERVED.
          </p>
          <button
            type="button"
            onClick={scrollToTop}
            className="label-mono"
            style={{
              background: "transparent",
              border: "1px solid rgba(168, 85, 247, 0.25)",
              color: "rgba(248, 246, 252, 0.7)",
              borderRadius: "9999px",
              padding: "6px 14px",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--brand-bright)";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(168, 85, 247, 0.25)";
              e.currentTarget.style.color = "rgba(248, 246, 252, 0.7)";
            }}
          >
            Back to top ↑
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 850px) {
          .footer-links-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 32px !important;
          }
        }
        @media (max-width: 520px) {
          .footer-links-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
