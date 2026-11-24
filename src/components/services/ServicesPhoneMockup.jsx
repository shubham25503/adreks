import React from "react";
import { NinjaStar } from "../Primitives";

/**
 * 3D Smartphone & matte circle pedestal unit at the center of the Services showcase.
 */
export function ServicesPhoneMockup({ services, step, hoveredIndex, phoneUp, isLaptop }) {
  return (
    <div
      className="services-center-unit"
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: isLaptop ? "205px" : "clamp(220px, 18vw, 260px)",
        height: isLaptop ? "410px" : "clamp(440px, 36vw, 500px)",
      }}
    >
      {/* Understated matte dark plum/wine base, clean hairline border, zero neon */}
      <div
        aria-hidden="true"
        className="services-circle-base"
        style={{
          position: "absolute",
          bottom: isLaptop ? "-52px" : "clamp(-60px, -5vw, -78px)",
          left: "50%",
          transform: "translateX(-50%)",
          width: isLaptop ? "270px" : "clamp(300px, 26vw, 380px)",
          height: isLaptop ? "270px" : "clamp(300px, 26vw, 380px)",
          borderRadius: "50%",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          background:
            "radial-gradient(circle at 50% 115%, #38122d 0%, #200a2f 45%, #0d0317 80%, var(--bg-deep) 100%)",
          boxShadow: "0 24px 50px rgba(0, 0, 0, 0.8)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Smartphone rising out from the circle base */}
      <div
        className="services-phone-frame"
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          borderRadius: isLaptop ? "38px" : "44px",
          background: "linear-gradient(180deg, #120624 0%, #080112 100%)",
          border: "1.5px solid rgba(255, 255, 255, 0.14)",
          boxShadow: "0 24px 60px rgba(0, 0, 0, 0.85)",
          transform: phoneUp ? "translate3d(0, 0, 0) scale(1)" : "translate3d(0, 180px, 0) scale(0.76)",
          opacity: phoneUp ? 1 : 0.2,
          zIndex: 3,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Top Speaker / Dynamic Island */}
        <div
          style={{
            width: isLaptop ? "64px" : "74px",
            height: isLaptop ? "16px" : "20px",
            background: "#000000",
            borderRadius: "9999px",
            margin: isLaptop ? "7px auto 0" : "10px auto 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingRight: "6px",
            zIndex: 6,
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#161616",
              border: "1px solid rgba(255, 255, 255, 0.15)",
            }}
          />
        </div>

        {/* Status bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: isLaptop ? "3px 18px 0" : "4px 22px 0",
            fontSize: isLaptop ? "0.62rem" : "0.68rem",
            fontWeight: 600,
            color: "#ffffff",
            letterSpacing: "-0.01em",
          }}
        >
          <span>9:41</span>
          <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
            <span style={{ fontSize: "0.6rem" }}>5G</span>
            <div
              style={{
                width: "18px",
                height: "9px",
                border: "1px solid #fff",
                borderRadius: "3px",
                padding: "1px",
              }}
            >
              <div style={{ width: "80%", height: "100%", background: "#fff", borderRadius: "1px" }} />
            </div>
          </div>
        </div>

        {/* In-Phone App Navigation Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: isLaptop ? "10px 16px 6px" : "16px 20px 10px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <span style={{ fontSize: "0.85rem", color: "var(--brand-bright)", fontWeight: 700, cursor: "pointer" }}>
            ‹
          </span>
          <span
            className="font-display"
            style={{ fontSize: isLaptop ? "0.8rem" : "0.88rem", fontWeight: 700, color: "#fff", letterSpacing: "0.08em" }}
          >
            ADREXKS
          </span>
          <NinjaStar style={{ width: "13px", height: "13px", color: "var(--acid-lime)" }} />
        </div>

        {/* In-Phone Stack Header */}
        <div style={{ padding: isLaptop ? "10px 14px 4px" : "14px 18px 8px" }}>
          <p
            className="label-mono font-mono"
            style={{ fontSize: "0.52rem", color: "var(--acid-lime)", letterSpacing: "0.18em" }}
          >
            GROWTH SUITE · 05 DISCIPLINES
          </p>
          <h4 className="font-display" style={{ fontSize: isLaptop ? "0.95rem" : "1.05rem", color: "#fff", marginTop: "2px" }}>
            Active Stack
          </h4>
        </div>

        {/* In-Phone Mini Preview Cards */}
        <div
          style={{
            padding: isLaptop ? "2px 10px" : "4px 14px",
            display: "flex",
            flexDirection: "column",
            gap: isLaptop ? "5px" : "8px",
            overflowY: "hidden",
            flex: 1,
          }}
        >
          {services.map((srv, idx) => {
            const isActive = step >= idx + 2 || hoveredIndex === idx;
            return (
              <div
                key={srv.n}
                style={{
                  padding: isLaptop ? "5px 10px" : "8px 12px",
                  borderRadius: isLaptop ? "10px" : "14px",
                  background: isActive ? "rgba(255, 255, 255, 0.07)" : "rgba(255, 255, 255, 0.02)",
                  border: isActive
                    ? "1px solid rgba(255, 255, 255, 0.16)"
                    : "1px solid rgba(255, 255, 255, 0.05)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  transition: "all 0.35s ease",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span
                      className="font-mono"
                      style={{
                        fontSize: "0.52rem",
                        color: isActive ? "var(--acid-lime)" : "rgba(248, 246, 252, 0.5)",
                        fontWeight: 700,
                      }}
                    >
                      {srv.n}
                    </span>
                    <span style={{ fontSize: isLaptop ? "0.64rem" : "0.72rem", color: "#fff", fontWeight: 600 }}>
                      {srv.title}
                    </span>
                  </div>
                  <span
                    className="label-mono"
                    style={{ fontSize: "0.45rem", color: "rgba(248, 246, 252, 0.45)", display: "block" }}
                  >
                    {srv.tag}
                  </span>
                </div>
                {isActive && (
                  <div
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "var(--acid-lime)",
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Indicator Bar */}
        <div style={{ padding: "8px 0 10px", display: "flex", justifyContent: "center" }}>
          <div style={{ width: "96px", height: "4px", background: "rgba(255, 255, 255, 0.28)", borderRadius: "2px" }} />
        </div>
      </div>
    </div>
  );
}
