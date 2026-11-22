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
  const unlockCooldownRef = useRef(0);
  const cooldownRef = useRef(0);
  const deltaAccumulatorRef = useRef(0);
  const touchStartYRef = useRef(0);
  const lastScrollYRef = useRef(0);

  const unlockScroll = () => {
    isFrozenRef.current = false;
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    unlockCooldownRef.current = Date.now();
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
    window.dispatchEvent(new CustomEvent("adrexks:service", { detail: title }));
    const contact = document.getElementById("contact");
    if (contact) contact.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const onResize = () => {
      setWindowDimensions({ w: window.innerWidth, h: window.innerHeight });
    };

    // Scroll listener: catches fast momentum scrolling and locks screen whether entering from above or below
    const handleScroll = () => {
      if (isFrozenRef.current || !sectionRef.current) return;
      if (Date.now() - unlockCooldownRef.current < 450) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const currentScrollY = window.scrollY;
      const prevScrollY = lastScrollYRef.current;
      lastScrollYRef.current = currentScrollY;

      // Scrolling DOWN from above into services: lock if animation is not finished (step < 6)
      if (prevScrollY <= currentScrollY && rect.top <= 10 && rect.bottom >= window.innerHeight * 0.25 && stepRef.current < 6) {
        lockScrollAtSection();
        return;
      }

      // Scrolling UP from below into services: lock if animation has not reversed to 0 (step > 0)
      if (prevScrollY >= currentScrollY && rect.top <= 10 && rect.bottom >= window.innerHeight * 0.35 && stepRef.current > 0) {
        lockScrollAtSection();
        return;
      }
    };

    // Wheel listener: intercepts scrolling bidirectionally with hard freeze and full animation reversal
    const handleWheel = (e) => {
      if (!sectionRef.current) return;

      if (!isFrozenRef.current) {
        if (Date.now() - unlockCooldownRef.current < 450) return;
        const rect = sectionRef.current.getBoundingClientRect();

        // Approaching section from above (scrolling down): lock if step < 6
        if (e.deltaY > 0 && rect.top <= 120 && rect.bottom >= window.innerHeight * 0.3 && stepRef.current < 6) {
          e.preventDefault();
          lockScrollAtSection();
          return;
        }

        // Approaching section from below (scrolling up): lock if step > 0
        if (e.deltaY < 0 && rect.bottom >= window.innerHeight * 0.3 && rect.top <= 80 && stepRef.current > 0) {
          e.preventDefault();
          lockScrollAtSection();
          return;
        }
        return;
      }

      // FROZEN SCREEN MODE: Absolutely no page scroll allowed until animation reaches boundary
      e.preventDefault();
      e.stopPropagation();

      const currentStep = stepRef.current;
      const delta = e.deltaY;
      const now = Date.now();

      // SCROLL DOWN
      if (delta > 0) {
        if (currentStep < 6) {
          // Advance forward through animation (0 -> 6)
          if (now - cooldownRef.current < 320) return;
          deltaAccumulatorRef.current += delta;
          if (deltaAccumulatorRef.current > 25) {
            deltaAccumulatorRef.current = 0;
            cooldownRef.current = now;
            setStep((prev) => Math.min(prev + 1, 6));
          }
        } else {
          // At step 6: forward animation complete! Continue scrolling down to next section
          if (now - cooldownRef.current < 320) return;
          deltaAccumulatorRef.current += delta;
          if (deltaAccumulatorRef.current > 35) {
            deltaAccumulatorRef.current = 0;
            cooldownRef.current = now;
            unlockScroll();
            window.scrollBy({ top: 120, behavior: "smooth" });
          }
        }
        return;
      }

      // SCROLL UP
      if (delta < 0) {
        if (currentStep > 0) {
          // Reverse animation backward (6 -> 0)
          if (now - cooldownRef.current < 320) return;
          deltaAccumulatorRef.current += delta;
          if (deltaAccumulatorRef.current < -25) {
            deltaAccumulatorRef.current = 0;
            cooldownRef.current = now;
            setStep((prev) => Math.max(prev - 1, 0));
          }
        } else {
          // At step 0: reverse animation complete! Continue scrolling up to section above
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
        if (Date.now() - unlockCooldownRef.current < 450) return;
        const rect = sectionRef.current.getBoundingClientRect();
        const touchY = e.touches[0].clientY;
        const diff = touchStartYRef.current - touchY;

        // Swiping up (moving down into section): lock if step < 6
        if (diff > 0 && rect.top <= 100 && rect.bottom >= window.innerHeight * 0.3 && stepRef.current < 6) {
          lockScrollAtSection();
        }
        // Swiping down (moving up into section from below): lock if step > 0
        if (diff < 0 && rect.bottom >= window.innerHeight * 0.3 && rect.top <= 80 && stepRef.current > 0) {
          lockScrollAtSection();
        }
        return;
      }

      e.preventDefault();
      const touchY = e.touches[0].clientY;
      const diff = touchStartYRef.current - touchY; // positive = swipe up (scroll down), negative = swipe down (scroll up)
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

  const isCompact = windowDimensions.w < 1340 || windowDimensions.h < 850;
  const scaleRatio = Math.min(windowDimensions.w / 1440, 1) * Math.min(windowDimensions.h / 900, 1);

  // Desktop target coordinates: symmetrical 2-left, 2-right, and Card 05 anchored at bottom center
  const desktopCardTargets = [
    { x: -440 * scaleRatio, y: -130 * scaleRatio, r: -3 }, // 01 Top Left
    { x: 440 * scaleRatio, y: -140 * scaleRatio, r: 3 },  // 02 Top Right
    { x: -450 * scaleRatio, y: 130 * scaleRatio, r: -2 }, // 03 Bottom Left
    { x: 450 * scaleRatio, y: 130 * scaleRatio, r: 2 },   // 04 Bottom Right
    { x: 0, y: 245 * scaleRatio, r: 0 },                  // 05 Bottom Center
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
          minHeight: isCompact ? "460px" : "550px",
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
            width: "clamp(220px, 19vw, 270px)",
            height: "clamp(440px, 37vw, 520px)",
          }}
        >
          {/* Simple Matte Circle Base: positioned UNDER the phone */}
          {/* Understated matte dark plum/wine base, clean hairline border, zero neon */}
          <div
            aria-hidden="true"
            className="services-circle-base"
            style={{
              position: "absolute",
              bottom: "clamp(-60px, -5vw, -78px)",
              left: "50%",
              transform: "translateX(-50%)",
              width: "clamp(320px, 28vw, 400px)",
              height: "clamp(320px, 28vw, 400px)",
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
              borderRadius: "44px",
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
                borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
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
                        ? "rgba(255, 255, 255, 0.07)"
                        : "rgba(255, 255, 255, 0.02)",
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
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          background: "var(--acid-lime)",
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
        {/* DESKTOP MODE (Wide Screens): Cards spread in left/right cols */}
        {/* ============================================================ */}
        {!isCompact &&
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
                  zIndex: i === 4 ? 7 : 5,
                  padding: "24px 26px",
                  borderRadius: "1.5rem",
                  background: "rgba(14, 5, 24, 0.94)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  boxShadow: "0 22px 55px -10px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(255, 255, 255, 0.05)",
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
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      color: "var(--acid-lime, #D6FF75)",
                      background: "rgba(214, 255, 117, 0.08)",
                      padding: "4px 12px",
                      borderRadius: "9999px",
                      border: "1px solid rgba(214, 255, 117, 0.22)",
                    }}
                  >
                    {service.n}
                  </span>
                  <NinjaStar style={{ width: "16px", height: "16px", color: "rgba(255, 255, 255, 0.35)" }} />
                </div>

                {/* Title */}
                <h3
                  className="font-display"
                  style={{
                    fontSize: "clamp(1.2rem, 1.6vw, 1.5rem)",
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
                    borderTop: "1px solid rgba(255, 255, 255, 0.08)",
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
                      color: "#ffffff",
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
        {/* COMPACT MODE (Laptops, Tablets & Mobile): Focused slide-left */}
        {/* ============================================================ */}
        {isCompact &&
          SERVICES.map((service, i) => {
            const activeIndex = step - 2;
            const isPast = activeIndex > i;
            const isActive = activeIndex === i;
            const isUpcoming = activeIndex < i;

            // Transform & opacity: upcoming emerges from phone, active rests in center, past slides left
            let transform = "translate3d(-50%, -40px, 0) scale(0.35) rotate(3deg)";
            let opacity = 0;
            let pointerEvents = "none";

            if (isActive) {
              transform = "translate3d(-50%, 0, 0) scale(1) rotate(0deg)";
              opacity = 1;
              pointerEvents = "auto";
            } else if (isPast) {
              // Previous card slides out smoothly to the left
              transform = "translate3d(-175%, 0, 0) scale(0.88) rotate(-6deg)";
              opacity = 0;
              pointerEvents = "none";
            } else if (isUpcoming) {
              // Waiting inside/behind phone
              transform = "translate3d(-50%, -50px, 0) scale(0.3) rotate(4deg)";
              opacity = 0;
              pointerEvents = "none";
            }

            return (
              <div
                key={service.n}
                className="service-compact-card"
                style={{
                  position: "absolute",
                  left: "50%",
                  bottom: "clamp(8px, 1.8vh, 24px)",
                  width: "clamp(290px, 88vw, 380px)",
                  zIndex: isActive ? 8 : isPast ? 5 : 6,
                  padding: "20px 22px",
                  borderRadius: "1.4rem",
                  background: "rgba(14, 5, 24, 0.95)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  boxShadow: "0 24px 60px -8px rgba(0, 0, 0, 0.92), 0 0 0 1px rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  transform,
                  opacity,
                  pointerEvents,
                }}
              >
                {/* Active Card Header */}
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
                        background: "rgba(214, 255, 117, 0.08)",
                        padding: "3px 10px",
                        borderRadius: "9999px",
                        border: "1px solid rgba(214, 255, 117, 0.22)",
                      }}
                    >
                      {service.n}
                    </span>
                    <span className="label-mono" style={{ fontSize: "0.62rem", color: "rgba(248, 246, 252, 0.45)" }}>
                      {i + 1} / 05
                    </span>
                  </div>
                  <NinjaStar style={{ width: "16px", height: "16px", color: "rgba(255, 255, 255, 0.35)" }} />
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
                    borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                    paddingTop: "12px",
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
                      color: "#ffffff",
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
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {[0, 1, 2, 3, 4, 5, 6].map((st) => {
            const isCurrent = step === st;
            return (
              <button
                key={st}
                type="button"
                onClick={() => setStep(st)}
                aria-label={`Jump to stage ${st}`}
                style={{
                  width: isCurrent ? "24px" : "6px",
                  height: "6px",
                  borderRadius: "9999px",
                  background: isCurrent ? "#ffffff" : "rgba(255, 255, 255, 0.2)",
                  boxShadow: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              />
            );
          })}
        </div>
      </div>

      <style>{`
        .service-floating-card {
          transition: transform 0.75s cubic-bezier(0.16, 1, 0.3, 1),
                      opacity 0.5s ease,
                      box-shadow 0.35s ease,
                      border-color 0.35s ease;
          will-change: transform, opacity;
        }
        .service-compact-card {
          transition: transform 0.65s cubic-bezier(0.16, 1, 0.3, 1),
                      opacity 0.5s ease,
                      box-shadow 0.35s ease,
                      border-color 0.35s ease;
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
        .service-compact-card:hover {
          border-color: rgba(255, 255, 255, 0.24) !important;
          box-shadow: 0 28px 65px rgba(0, 0, 0, 0.9) !important;
        }
        .service-card-btn:hover {
          color: var(--acid-lime) !important;
        }
      `}</style>
    </section>
  );
}
