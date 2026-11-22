import React, { useEffect, useRef, useState } from "react";
import { NinjaStar, RollText, SectionLabel } from "./Primitives";

export const SERVICES = [
  {
    n: "01",
    title: "Social Media & Content",
    body: "Always-on social presence, planned with intent and made to stop the scroll.",
    tag: "Social · Content",
  },
  {
    n: "02",
    title: "Performance Marketing",
    body: "Paid campaigns built around the right audience, the right message and constant testing.",
    tag: "Google · Meta Ads",
  },
  {
    n: "03",
    title: "Search & Digital Growth",
    body: "Get discovered where your customers search: on Google, on maps, and inside answer engines.",
    tag: "SEO · AEO · GEO",
  },
  {
    n: "04",
    title: "Branding & Creative Design",
    body: "Identities and collateral that make a business look as good as it actually is.",
    tag: "Visual Identity",
  },
  {
    n: "05",
    title: "Website Design & Development",
    body: "Fast, responsive digital experiences built to establish authority and convert visitors into clients.",
    tag: "Modern Web · UI/UX",
  },
];

export function Services() {
  const sectionRef = useRef(null);
  const [step, setStep] = useState(0); // 0: initial circle, 1: phone up out of circle, 2-6: cards 1-5 out
  const [windowDimensions, setWindowDimensions] = useState({
    w: typeof window !== "undefined" ? window.innerWidth : 1200,
    h: typeof window !== "undefined" ? window.innerHeight : 800,
  });

  const stepRef = useRef(0);
  stepRef.current = step;

  const isFrozenRef = useRef(false);
  const completedRef = useRef(false);
  const cooldownRef = useRef(0);
  const deltaAccumulatorRef = useRef(0);
  const touchStartYRef = useRef(0);

  const unlockScroll = () => {
    isFrozenRef.current = false;
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
  };

  const lockScrollAtSection = () => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const targetTop = window.scrollY + rect.top;
    window.scrollTo({ top: targetTop, behavior: "auto" });
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    isFrozenRef.current = true;
  };

  const selectService = (title) => {
    unlockScroll();
    completedRef.current = true;
    window.dispatchEvent(new CustomEvent("adrexks:service", { detail: title }));
    const contact = document.getElementById("contact");
    if (contact) contact.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const onResize = () => {
      setWindowDimensions({ w: window.innerWidth, h: window.innerHeight });
    };

    // Scroll listener: catches fast momentum scrolling and locks screen the moment services is reached
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // If user scrolls back up near the top of the site, reset completed state so it locks again on next scroll down
      if (currentScrollY < 120) {
        completedRef.current = false;
      }

      if (completedRef.current || isFrozenRef.current) {
        return;
      }

      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();

      // Once section top reaches or crosses viewport top, completely freeze the screen if animation is not finished
      if (rect.top <= 10 && rect.bottom >= window.innerHeight * 0.25 && stepRef.current < 6) {
        lockScrollAtSection();
      }
    };

    // Wheel listener: intercepts scrolling and strictly prevents passing through until animation is complete
    const handleWheel = (e) => {
      if (!sectionRef.current) return;

      if (!isFrozenRef.current) {
        // If approaching section from above, immediately lock and do not let page scroll past
        if (!completedRef.current && stepRef.current < 6) {
          const rect = sectionRef.current.getBoundingClientRect();
          if (e.deltaY > 0 && rect.top <= 120 && rect.bottom >= window.innerHeight * 0.3) {
            e.preventDefault();
            lockScrollAtSection();
            return;
          }
        }
        return;
      }

      // FROZEN SCREEN MODE: Absolutely no page scroll allowed until all 6 steps are completed
      e.preventDefault();
      e.stopPropagation();

      const currentStep = stepRef.current;
      const delta = e.deltaY;
      const now = Date.now();

      // SCROLL DOWN
      if (delta > 0) {
        if (currentStep < 6) {
          // Drive animation step by step (no scrolling beyond allowed)
          if (now - cooldownRef.current < 320) return;
          deltaAccumulatorRef.current += delta;
          if (deltaAccumulatorRef.current > 25) {
            deltaAccumulatorRef.current = 0;
            cooldownRef.current = now;
            setStep((prev) => Math.min(prev + 1, 6));
          }
        } else {
          // Animation fully completed (step 6). Only now does downward scroll allow continuing to next section
          if (now - cooldownRef.current < 320) return;
          deltaAccumulatorRef.current += delta;
          if (deltaAccumulatorRef.current > 35) {
            deltaAccumulatorRef.current = 0;
            cooldownRef.current = now;
            unlockScroll();
            completedRef.current = true;
            window.scrollBy({ top: 120, behavior: "smooth" });
          }
        }
        return;
      }

      // SCROLL UP
      if (delta < 0) {
        if (currentStep > 0) {
          // Step backward through animation (no scrolling beyond allowed)
          if (now - cooldownRef.current < 320) return;
          deltaAccumulatorRef.current += delta;
          if (deltaAccumulatorRef.current < -25) {
            deltaAccumulatorRef.current = 0;
            cooldownRef.current = now;
            setStep((prev) => Math.max(prev - 1, 0));
          }
        } else {
          // At step 0 and scrolling up: user wants to navigate back up to About section
          if (now - cooldownRef.current < 320) return;
          deltaAccumulatorRef.current += delta;
          if (deltaAccumulatorRef.current < -35) {
            deltaAccumulatorRef.current = 0;
            cooldownRef.current = now;
            unlockScroll();
            window.scrollBy({ top: -120, behavior: "smooth" });
          }
        }
        return;
      }
    };

    // Touch support for mobile devices
    const handleTouchStart = (e) => {
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      if (!sectionRef.current) return;

      if (!isFrozenRef.current) {
        if (!completedRef.current && stepRef.current < 6) {
          const rect = sectionRef.current.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= window.innerHeight * 0.3) {
            lockScrollAtSection();
          }
        }
        return;
      }

      e.preventDefault();
      const touchY = e.touches[0].clientY;
      const diff = touchStartYRef.current - touchY; // positive = swipe up (scroll down)
      const currentStep = stepRef.current;
      const now = Date.now();

      if (diff > 25) {
        if (now - cooldownRef.current > 330) {
          cooldownRef.current = now;
          touchStartYRef.current = touchY;
          if (currentStep < 6) {
            setStep((prev) => Math.min(prev + 1, 6));
          } else {
            unlockScroll();
            completedRef.current = true;
            window.scrollBy({ top: 100, behavior: "smooth" });
          }
        }
      } else if (diff < -25) {
        if (now - cooldownRef.current > 330) {
          cooldownRef.current = now;
          touchStartYRef.current = touchY;
          if (currentStep > 0) {
            setStep((prev) => Math.max(prev - 1, 0));
          } else {
            unlockScroll();
            window.scrollBy({ top: -100, behavior: "smooth" });
          }
        }
      }
    };

    // Keyboard navigation (Arrow keys / Page keys)
    const handleKeyDown = (e) => {
      if (!isFrozenRef.current) return;
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        if (stepRef.current < 6) {
          setStep((prev) => Math.min(prev + 1, 6));
        } else {
          unlockScroll();
          completedRef.current = true;
          window.scrollBy({ top: 120, behavior: "smooth" });
        }
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        if (stepRef.current > 0) {
          setStep((prev) => Math.max(prev - 1, 0));
        } else {
          unlockScroll();
          window.scrollBy({ top: -120, behavior: "smooth" });
        }
      } else if (e.key === "Escape") {
        unlockScroll();
      }
    };

    // Clean up on route navigation or unload
    const handleUnlockEvent = () => unlockScroll();

    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("popstate", handleUnlockEvent);
    window.addEventListener("adrexks:unlock", handleUnlockEvent);

    return () => {
      unlockScroll();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("popstate", handleUnlockEvent);
      window.removeEventListener("adrexks:unlock", handleUnlockEvent);
    };
  }, []);

  const isMobile = windowDimensions.w < 860;
  const scaleRatio = Math.min(windowDimensions.w / 1400, 1) * Math.min(windowDimensions.h / 860, 1);

  // Desktop Target coordinates for the 5 cards fanning out around the phone
  const desktopCardTargets = [
    { x: -390 * scaleRatio, y: -135 * scaleRatio, r: -3.5 },
    { x: 390 * scaleRatio, y: -135 * scaleRatio, r: 3.5 },
    { x: -420 * scaleRatio, y: 105 * scaleRatio, r: -2.5 },
    { x: 420 * scaleRatio, y: 105 * scaleRatio, r: 2.5 },
    { x: 0, y: 245 * scaleRatio, r: 0 },
  ];

  const phoneUp = step >= 1;

  return (
    <section
      id="services"
      ref={sectionRef}
      style={{
        position: "relative",
        background: "var(--bg-deep)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        paddingTop: "clamp(24px, 3.5vw, 40px)",
        paddingBottom: "clamp(20px, 3vw, 36px)",
        overflow: "hidden",
        perspective: "1200px",
      }}
    >
      {/* Section Header */}
      <div className="container-custom" style={{ textAlign: "center", zIndex: 10, width: "100%" }}>
        <div style={{ display: "inline-block" }}>
          <SectionLabel index="03">Capabilities & Services</SectionLabel>
        </div>
        <RollText
          as="h2"
          className="font-display"
          emClassName="serif-em"
          style={{
            marginTop: "16px",
            fontSize: "clamp(2rem, 4.2vw, 4.2rem)",
            color: "#ffffff",
            lineHeight: 1.05,
          }}
          parts={["A connected set", { em: "of growth services." }]}
        />
      </div>

      {/* Central 3D Showcase Stage */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "1400px",
          margin: "0 auto",
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: isMobile ? "460px" : "550px",
        }}
      >
        {/* Phone + Circle Pedestal Unit */}
        <div
          className="services-center-unit"
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "clamp(230px, 20vw, 275px)",
            height: "clamp(450px, 38vw, 535px)",
          }}
        >
          {/* Glowing Circle Base: positioned UNDER the phone */}
          {/* 80% covered by phone body, 20% visible as a glowing pedestal at the bottom */}
          {/* Gradient starts strictly from bottom of circle with red & purple, fading into dark background */}
          <div
            aria-hidden="true"
            className="services-circle-base"
            style={{
              position: "absolute",
              bottom: "clamp(-65px, -5.5vw, -82px)",
              left: "50%",
              transform: "translateX(-50%)",
              width: "clamp(340px, 29vw, 420px)",
              height: "clamp(340px, 29vw, 420px)",
              borderRadius: "50%",
              border: "1.5px solid rgba(181, 0, 255, 0.45)",
              background:
                "radial-gradient(circle at 50% 100%, #e11d48 0%, #be185d 16%, #b500ff 36%, #7928ca 56%, rgba(15, 3, 28, 0.9) 76%, var(--bg-deep) 100%)",
              boxShadow: phoneUp
                ? "0 25px 85px 12px rgba(181, 0, 255, 0.52), 0 35px 80px 15px rgba(225, 29, 72, 0.45), inset 0 -25px 45px rgba(225, 29, 72, 0.35), 0 0 25px rgba(181, 0, 255, 0.25)"
                : "0 15px 50px 8px rgba(181, 0, 255, 0.32), 0 20px 45px 10px rgba(225, 29, 72, 0.28), inset 0 -15px 30px rgba(225, 29, 72, 0.22)",
              zIndex: 1,
              pointerEvents: "none",
              transition: "box-shadow 0.7s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.5s ease",
            }}
          >
            {/* Rotating dashed orbital ring */}
            <div
              style={{
                position: "absolute",
                inset: "-14px",
                borderRadius: "50%",
                border: "1px dashed rgba(244, 63, 94, 0.38)",
                animation: "spin-slow 32s linear infinite",
              }}
            />
            {/* Inner radiant halo ring */}
            <div
              style={{
                position: "absolute",
                inset: "16%",
                borderRadius: "50%",
                border: "1px solid rgba(168, 85, 247, 0.22)",
                boxShadow: "inset 0 -22px 35px rgba(225, 29, 72, 0.45), inset 0 -45px 55px rgba(181, 0, 255, 0.35)",
              }}
            />
          </div>

          {/* Smartphone rising out from the circle base */}
          <div
            className="services-phone-frame"
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              borderRadius: "44px",
              background: "linear-gradient(180deg, #150628 0%, #0c0217 100%)",
              border: "2.5px solid rgba(255, 255, 255, 0.24)",
              boxShadow:
                "0 32px 80px -10px rgba(0, 0, 0, 0.95), 0 0 0 1px rgba(0, 0, 0, 0.8), inset 0 0 0 2px rgba(255, 255, 255, 0.08)",
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
                width: "74px",
                height: "20px",
                background: "#000000",
                borderRadius: "9999px",
                margin: "10px auto 0",
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
                padding: "4px 22px 0",
                fontSize: "0.68rem",
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
                padding: "16px 20px 10px",
                borderBottom: "1px solid rgba(168, 85, 247, 0.18)",
              }}
            >
              <span style={{ fontSize: "0.85rem", color: "var(--brand-bright)", fontWeight: 700, cursor: "pointer" }}>
                ‹
              </span>
              <span
                className="font-display"
                style={{ fontSize: "0.88rem", fontWeight: 700, color: "#fff", letterSpacing: "0.08em" }}
              >
                ADREXKS
              </span>
              <NinjaStar style={{ width: "13px", height: "13px", color: "var(--acid-lime)" }} />
            </div>

            {/* In-Phone Stack Header */}
            <div style={{ padding: "14px 18px 8px" }}>
              <p
                className="label-mono font-mono"
                style={{ fontSize: "0.55rem", color: "var(--acid-lime)", letterSpacing: "0.18em" }}
              >
                GROWTH SUITE · 05 DISCIPLINES
              </p>
              <h4 className="font-display" style={{ fontSize: "1.05rem", color: "#fff", marginTop: "3px" }}>
                Active Stack
              </h4>
            </div>

            {/* In-Phone Mini Preview Cards */}
            <div
              style={{
                padding: "4px 14px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                overflowY: "hidden",
                flex: 1,
              }}
            >
              {SERVICES.map((srv, idx) => {
                const isActive = step >= idx + 2;
                return (
                  <div
                    key={srv.n}
                    style={{
                      padding: "8px 12px",
                      borderRadius: "14px",
                      background: isActive
                        ? "linear-gradient(135deg, rgba(168, 85, 247, 0.35) 0%, rgba(112, 0, 176, 0.28) 100%)"
                        : "rgba(255, 255, 255, 0.03)",
                      border: isActive
                        ? "1px solid rgba(214, 255, 117, 0.55)"
                        : "1px solid rgba(168, 85, 247, 0.12)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      transition: "all 0.4s ease",
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <span
                          className="font-mono"
                          style={{
                            fontSize: "0.55rem",
                            color: isActive ? "var(--acid-lime)" : "rgba(248, 246, 252, 0.5)",
                            fontWeight: 700,
                          }}
                        >
                          {srv.n}
                        </span>
                        <span style={{ fontSize: "0.72rem", color: "#fff", fontWeight: 600 }}>{srv.title}</span>
                      </div>
                      <span
                        className="label-mono"
                        style={{ fontSize: "0.5rem", color: "rgba(248, 246, 252, 0.45)", display: "block" }}
                      >
                        {srv.tag}
                      </span>
                    </div>
                    {isActive ? (
                      <div
                        style={{
                          width: "7px",
                          height: "7px",
                          borderRadius: "50%",
                          background: "var(--acid-lime)",
                          boxShadow: "0 0 8px var(--acid-lime)",
                        }}
                      />
                    ) : null}
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

        {/* ============================================================ */}
        {/* DESKTOP MODE: Cards Emerging from Phone Step by Step         */}
        {/* ============================================================ */}
        {!isMobile &&
          SERVICES.map((service, i) => {
            const isCardOut = step >= i + 2;
            const target = desktopCardTargets[i];

            return (
              <div
                key={service.n}
                className="service-floating-card spotlight"
                style={{
                  position: "absolute",
                  width: "clamp(280px, 24vw, 350px)",
                  transform: isCardOut
                    ? `translate3d(${target.x}px, ${target.y}px, 0) scale(1) rotate(${target.r}deg)`
                    : "translate3d(0, 0, 0) scale(0.25) rotate(0deg)",
                  opacity: isCardOut ? 1 : 0,
                  pointerEvents: isCardOut ? "auto" : "none",
                  zIndex: i === 4 ? 6 : 5,
                  padding: "24px 26px",
                  borderRadius: "1.5rem",
                  background: "rgba(16, 4, 28, 0.88)",
                  border: "1px solid rgba(168, 85, 247, 0.28)",
                  boxShadow: "0 24px 60px -10px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(255, 255, 255, 0.08)",
                  backdropFilter: "blur(18px)",
                  WebkitBackdropFilter: "blur(18px)",
                  cursor: "default",
                }}
              >
                {/* Card Header */}
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
                      fontSize: "0.88rem",
                      fontWeight: 700,
                      color: "var(--acid-lime, #D6FF75)",
                      background: "rgba(214, 255, 117, 0.1)",
                      padding: "4px 12px",
                      borderRadius: "9999px",
                      border: "1px solid rgba(214, 255, 117, 0.3)",
                    }}
                  >
                    {service.n}
                  </span>
                  <NinjaStar style={{ width: "18px", height: "18px", color: "var(--brand)" }} />
                </div>

                {/* Title */}
                <h3
                  className="font-display"
                  style={{
                    fontSize: "clamp(1.25rem, 1.7vw, 1.55rem)",
                    letterSpacing: "-0.035em",
                    color: "#ffffff",
                    lineHeight: 1.18,
                  }}
                >
                  {service.title}
                </h3>

                {/* Body description */}
                <p
                  style={{
                    marginTop: "10px",
                    fontSize: "0.88rem",
                    lineHeight: 1.55,
                    color: "rgba(248, 246, 252, 0.72)",
                  }}
                >
                  {service.body}
                </p>

                {/* Bottom Divider + Button */}
                <div
                  style={{
                    marginTop: "20px",
                    borderTop: "1px solid rgba(168, 85, 247, 0.18)",
                    paddingTop: "14px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => selectService(service.title)}
                    className="service-card-btn"
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "var(--brand-bright)",
                      fontFamily: "inherit",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      padding: 0,
                      transition: "color 0.2s ease",
                    }}
                  >
                    Discuss this service
                  </button>
                  <span className="label-mono" style={{ fontSize: "0.6rem", color: "rgba(248, 246, 252, 0.45)" }}>
                    {service.tag}
                  </span>
                </div>
              </div>
            );
          })}

        {/* ============================================================ */}
        {/* MOBILE MODE: Cards emerging from phone and sliding left     */}
        {/* ============================================================ */}
        {isMobile &&
          SERVICES.map((service, i) => {
            const activeIndex = step - 2;
            const isPast = activeIndex > i;
            const isActive = activeIndex === i;
            const isUpcoming = activeIndex < i;

            // Transform & opacity: upcoming emerges from phone, active rests in center, past slides left
            let transform = "translate3d(0, -50px, 0) scale(0.35) rotate(3deg)";
            let opacity = 0;
            let pointerEvents = "none";

            if (isActive) {
              transform = "translate3d(0, 0, 0) scale(1) rotate(0deg)";
              opacity = 1;
              pointerEvents = "auto";
            } else if (isPast) {
              // Previous card slides out to the left
              transform = "translate3d(-125%, 0, 0) scale(0.85) rotate(-6deg)";
              opacity = 0;
              pointerEvents = "none";
            } else if (isUpcoming) {
              // Waiting to emerge out of phone
              transform = "translate3d(0, -60px, 0) scale(0.3) rotate(4deg)";
              opacity = 0;
              pointerEvents = "none";
            }

            return (
              <div
                key={service.n}
                className="service-mobile-card"
                style={{
                  position: "absolute",
                  bottom: "8px",
                  width: "min(350px, 92vw)",
                  zIndex: isActive ? 8 : isPast ? 5 : 6,
                  padding: "20px 22px",
                  borderRadius: "1.4rem",
                  background: "rgba(16, 4, 28, 0.94)",
                  border: "1px solid rgba(168, 85, 247, 0.35)",
                  boxShadow: "0 22px 55px -8px rgba(0, 0, 0, 0.92), 0 0 0 1px rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  transform,
                  opacity,
                  pointerEvents,
                }}
              >
                {/* Active Mobile Card Header */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "12px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span
                      className="label-mono font-mono"
                      style={{
                        fontSize: "0.82rem",
                        fontWeight: 700,
                        color: "var(--acid-lime, #D6FF75)",
                        background: "rgba(214, 255, 117, 0.1)",
                        padding: "3px 10px",
                        borderRadius: "9999px",
                        border: "1px solid rgba(214, 255, 117, 0.3)",
                      }}
                    >
                      {service.n}
                    </span>
                    <span className="label-mono" style={{ fontSize: "0.62rem", color: "rgba(248, 246, 252, 0.45)" }}>
                      {i + 1} / 05
                    </span>
                  </div>
                  <NinjaStar style={{ width: "16px", height: "16px", color: "var(--brand)" }} />
                </div>

                <h3
                  className="font-display"
                  style={{
                    fontSize: "1.25rem",
                    letterSpacing: "-0.03em",
                    color: "#ffffff",
                    lineHeight: 1.2,
                  }}
                >
                  {service.title}
                </h3>

                <p
                  style={{
                    marginTop: "8px",
                    fontSize: "0.85rem",
                    lineHeight: 1.5,
                    color: "rgba(248, 246, 252, 0.72)",
                  }}
                >
                  {service.body}
                </p>

                <div
                  style={{
                    marginTop: "16px",
                    borderTop: "1px solid rgba(168, 85, 247, 0.18)",
                    paddingTop: "12px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => selectService(service.title)}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "var(--brand-bright)",
                      fontFamily: "inherit",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      padding: 0,
                    }}
                  >
                    Discuss this service
                  </button>
                  <span className="label-mono" style={{ fontSize: "0.58rem", color: "rgba(248, 246, 252, 0.45)" }}>
                    {service.tag}
                  </span>
                </div>
              </div>
            );
          })}
      </div>

      {/* Footer Step Indicator & Navigation */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          zIndex: 10,
        }}
      >
        {/* Navigation Indicator Dots */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {[0, 1, 2, 3, 4, 5, 6].map((st) => {
            const isCurrent = step === st;
            return (
              <button
                key={st}
                type="button"
                onClick={() => setStep(st)}
                aria-label={`Jump to stage ${st}`}
                style={{
                  width: isCurrent ? "28px" : "8px",
                  height: "8px",
                  borderRadius: "9999px",
                  background: isCurrent ? "var(--acid-lime, #D6FF75)" : "rgba(168, 85, 247, 0.35)",
                  boxShadow: isCurrent ? "0 0 10px rgba(214, 255, 117, 0.6)" : "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              />
            );
          })}
        </div>

        {/* Status Hint */}
        <p
          className="label-mono"
          style={{
            fontSize: "0.62rem",
            color: step === 6 ? "var(--acid-lime)" : "rgba(248, 246, 252, 0.5)",
            margin: 0,
            letterSpacing: "0.14em",
          }}
        >
          {step === 0 && "Scroll down to reveal phone"}
          {step === 1 && "Scroll down to emerge service cards (1 of 5)"}
          {step >= 2 && step < 6 && `Scroll to emerge next card (${step - 1} of 5)`}
          {step === 6 && "All services revealed · Scroll down to continue"}
        </p>
      </div>

      <style>{`
        .service-floating-card {
          transition: transform 0.75s cubic-bezier(0.16, 1, 0.3, 1),
                      opacity 0.5s ease,
                      box-shadow 0.35s ease,
                      border-color 0.35s ease;
          will-change: transform, opacity;
        }
        .service-mobile-card {
          transition: transform 0.65s cubic-bezier(0.16, 1, 0.3, 1),
                      opacity 0.5s ease,
                      box-shadow 0.35s ease;
          will-change: transform, opacity;
        }
        .services-phone-frame {
          transition: transform 0.85s cubic-bezier(0.16, 1, 0.3, 1),
                      opacity 0.6s ease;
          will-change: transform, opacity;
        }
        .services-circle-base {
          transition: box-shadow 0.7s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: box-shadow;
        }
        .service-floating-card:hover,
        .service-mobile-card:hover {
          border-color: rgba(168, 85, 247, 0.6) !important;
          box-shadow: 0 32px 75px -8px rgba(159, 0, 246, 0.65), 0 0 25px rgba(168, 85, 247, 0.35) !important;
        }
        .service-card-btn:hover {
          color: var(--acid-lime) !important;
        }
      `}</style>
    </section>
  );
}
