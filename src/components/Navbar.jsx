import React, { useEffect, useState } from "react";
import { AdrexksLogo } from "./Primitives";
import { Link, NavLink, useLocation } from "./Router";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/studio", label: "Studio" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 900,
          padding: scrolled ? "14px 0" : "24px 0",
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          background: scrolled ? "rgba(7, 1, 14, 0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(168, 85, 247, 0.15)" : "1px solid transparent",
        }}
      >
        <div
          className="container-custom"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Brand Logo */}
          <Link to="/" style={{ textDecoration: "none" }} aria-label="Adrexks Home">
            <AdrexksLogo size={36} />
          </Link>

          {/* Desktop Nav */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              padding: "6px 10px",
              borderRadius: "9999px",
              background: "rgba(20, 3, 36, 0.7)",
              border: "1px solid rgba(168, 85, 247, 0.2)",
              backdropFilter: "blur(14px)",
            }}
            className="desktop-nav"
          >
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                style={{
                  padding: "8px 18px",
                  fontSize: "0.88rem",
                  fontWeight: 500,
                  color: "rgba(248, 246, 252, 0.75)",
                  textDecoration: "none",
                  borderRadius: "9999px",
                  transition: "all 0.25s ease",
                }}
                activeStyle={{
                  color: "#ffffff",
                  background: "linear-gradient(135deg, rgba(147, 51, 234, 0.32) 0%, rgba(225, 29, 72, 0.18) 100%)",
                  border: "1px solid rgba(244, 63, 94, 0.35)",
                  boxShadow: "0 2px 14px -3px rgba(225, 29, 72, 0.22)",
                }}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Action + Hamburger */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Link
              to="/contact"
              className="btn-primary desktop-cta"
              data-magnetic
              style={{ fontSize: "0.85rem", padding: "10px 22px" }}
            >
              Start a project
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
              className="mobile-toggle"
              style={{
                display: "none",
                alignItems: "center",
                justifyContent: "center",
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                background: "rgba(35, 6, 60, 0.7)",
                border: "1px solid rgba(168, 85, 247, 0.3)",
                color: "#fff",
                cursor: "pointer",
                fontSize: "1.2rem",
              }}
            >
              {open ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {open && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 890,
            background: "rgba(7, 1, 14, 0.96)",
            backdropFilter: "blur(24px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "40px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className="font-display"
                style={{
                  fontSize: "2rem",
                  color: "#fff",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(168, 85, 247, 0.15)",
                  paddingBottom: "12px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                activeStyle={{
                  color: "var(--brand-bright)",
                }}
              >
                {link.label}
              </NavLink>
            ))}
            <div style={{ marginTop: "20px" }}>
              <Link
                to="/contact"
                className="btn-primary"
                style={{ width: "100%", justifyContent: "center" }}
              >
                Start a project
              </Link>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .desktop-cta { display: none !important; }
          .mobile-toggle { display: inline-flex !important; }
        }
      `}</style>
    </>
  );
}
