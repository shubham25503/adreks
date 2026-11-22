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
  const [hoveredIndex, setHoveredIndex] = useState(null);
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

  const isMobile = windowDimensions.w < 860;
  const isLaptop = !isMobile && (windowDimensions.w < 1340 || windowDimensions.h < 820);
  const scaleRatio = Math.min(windowDimensions.w / 1440, 1) * Math.min(windowDimensions.h / 900, 1);

  // Desktop & Laptop target coordinates: symmetrical 2-left, 2-right, and Card 05 anchored at bottom center
  const desktopCardTargets = isLaptop
    ? [
        { x: -340, y: -110, r: -2.5 }, // 01 Top Left
        { x: 340, y: -115, r: 2.5 },  // 02 Top Right
        { x: -350, y: 105, r: -1.5 }, // 03 Bottom Left
        { x: 350, y: 105, r: 1.5 },   // 04 Bottom Right
        { x: 0, y: 195, r: 0 },       // 05 Bottom Center
      ]
    : [
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
          minHeight: isMobile ? "460px" : isLaptop ? "490px" : "560px",
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
            width: isLaptop ? "205px" : "clamp(220px, 18vw, 260px)",
            height: isLaptop ? "410px" : "clamp(440px, 36vw, 500px)",
          }}
        >
          {/* Simple Matte Circle Base: positioned UNDER the phone */}
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
              {SERVICES.map((srv, idx) => {
                const isActive = step >= idx + 2 || hoveredIndex === idx;
                return (
                  <div
                    key={srv.n}
                    style={{
                      padding: isLaptop ? "5px 10px" : "8px 12px",
                      borderRadius: isLaptop ? "10px" : "14px",
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
                            fontSize: "0.52rem",
                            color: isActive ? "var(--acid-lime)" : "rgba(248, 246, 252, 0.5)",
                            fontWeight: 700,
                          }}
                        >
                          {srv.n}
                        </span>
                        <span style={{ fontSize: isLaptop ? "0.64rem" : "0.72rem", color: "#fff", fontWeight: 600 }}>{srv.title}</span>
                      </div>
                      <span
                        className="label-mono"
                        style={{ fontSize: "0.45rem", color: "rgba(248, 246, 252, 0.45)", display: "block" }}
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
        {/* DESKTOP & LAPTOP MODE: 5 Symmetrical Cards around Phone      */}
        {/* ============================================================ */}
        {!isMobile &&
          SERVICES.map((service, i) => {
            const isCardOut = step >= i + 2;
            const target = desktopCardTargets[i];
            const isHovered = hoveredIndex === i;

            return (
              <div
                key={service.n}
                className="service-card-slot"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => selectService(service.title)}
                style={{
                  position: "absolute",
                  width: isLaptop ? "clamp(250px, 21vw, 290px)" : "clamp(280px, 23vw, 340px)",
                  transform: isCardOut
                    ? `translate3d(${target.x}px, ${target.y}px, 0) scale(1) rotate(${target.r}deg)`
                    : "translate3d(0, 0, 0) scale(0.25) rotate(0deg)",
                  opacity: isCardOut ? 1 : 0,
                  pointerEvents: isCardOut ? "auto" : "none",
                  zIndex: isHovered ? 20 : i === 4 ? 7 : 5,
                  cursor: "pointer",
                  transition: "transform 0.75s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease",
                }}
              >
                {/* Inner Interactive Card with smooth micro-lift, border highlight, and depth */}
                <div
                  className="service-floating-card"
                  style={{
                    width: "100%",
                    padding: isLaptop ? "16px 18px" : "22px 24px",
                    borderRadius: isLaptop ? "1.2rem" : "1.4rem",
                    background: isHovered ? "rgba(20, 8, 34, 0.98)" : "rgba(14, 5, 24, 0.94)",
                    border: isHovered
                      ? "1px solid rgba(255, 255, 255, 0.28)"
                      : "1px solid rgba(255, 255, 255, 0.1)",
                    boxShadow: isHovered
                      ? "0 28px 70px -10px rgba(0, 0, 0, 0.95), 0 0 0 1px rgba(255, 255, 255, 0.12)"
                      : "0 20px 50px -10px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(18px)",
                    WebkitBackdropFilter: "blur(18px)",
                    transform: isHovered ? "translateY(-6px) scale(1.025)" : "translateY(0) scale(1)",
                    transition:
                      "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease",
                  }}
                >
                  {/* Card Header */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: isLaptop ? "10px" : "14px",
                    }}
                  >
                    <span
                      className="label-mono font-mono"
                      style={{
                        fontSize: isLaptop ? "0.78rem" : "0.85rem",
                        fontWeight: 700,
                        color: "var(--acid-lime, #D6FF75)",
                        background: isHovered ? "rgba(214, 255, 117, 0.18)" : "rgba(214, 255, 117, 0.08)",
                        padding: isLaptop ? "2px 9px" : "4px 12px",
                        borderRadius: "9999px",
                        border: isHovered
                          ? "1px solid rgba(214, 255, 117, 0.45)"
                          : "1px solid rgba(214, 255, 117, 0.22)",
                        transform: isHovered ? "scale(1.06)" : "scale(1)",
                        transition: "all 0.3s ease",
                      }}
                    >
                      {service.n}
                    </span>
                    <NinjaStar
                      style={{
                        width: isLaptop ? "14px" : "16px",
                        height: isLaptop ? "14px" : "16px",
                        color: isHovered ? "var(--acid-lime)" : "rgba(255, 255, 255, 0.35)",
                        transform: isHovered ? "rotate(90deg) scale(1.2)" : "rotate(0deg) scale(1)",
                        transition: "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), color 0.3s ease",
                      }}
                    />
                  </div>

                  {/* Title */}
                  <h3
                    className="font-display"
                    style={{
                      fontSize: isLaptop ? "clamp(1.05rem, 1.3vw, 1.25rem)" : "clamp(1.2rem, 1.55vw, 1.45rem)",
                      letterSpacing: "-0.035em",
                      color: "#ffffff",
                      lineHeight: 1.18,
                      textShadow: isHovered ? "0 2px 14px rgba(255, 255, 255, 0.15)" : "none",
                      transition: "text-shadow 0.3s ease",
                    }}
                  >
                    {service.title}
                  </h3>

                  {/* Body description */}
                  <p
                    style={{
                      marginTop: isLaptop ? "6px" : "10px",
                      fontSize: isLaptop ? "0.78rem" : "0.86rem",
                      lineHeight: 1.45,
                      color: isHovered ? "rgba(248, 246, 252, 0.94)" : "rgba(248, 246, 252, 0.72)",
                      transition: "color 0.3s ease",
                    }}
                  >
                    {service.body}
                  </p>

                  {/* Bottom Divider + Button */}
                  <div
                    style={{
                      marginTop: isLaptop ? "12px" : "18px",
                      borderTop: isHovered ? "1px solid rgba(255, 255, 255, 0.14)" : "1px solid rgba(255, 255, 255, 0.08)",
                      paddingTop: isLaptop ? "10px" : "12px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      transition: "border-color 0.3s ease",
                    }}
                  >
                    <span
                      className="service-card-btn"
                      style={{
                        color: isHovered ? "var(--acid-lime)" : "#ffffff",
                        fontSize: isLaptop ? "0.78rem" : "0.84rem",
                        fontWeight: 600,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        transition: "color 0.25s ease",
                      }}
                    >
                      <span>Discuss this service</span>
                      <span
                        style={{
                          display: "inline-block",
                          transform: isHovered ? "translateX(4px)" : "translateX(0)",
                          transition: "transform 0.25s ease",
                        }}
                      >
                        →
                      </span>
                    </span>
                    <span
                      className="label-mono"
                      style={{
                        fontSize: isLaptop ? "0.54rem" : "0.58rem",
                        color: isHovered ? "rgba(248, 246, 252, 0.65)" : "rgba(248, 246, 252, 0.45)",
                        transition: "color 0.3s ease",
                      }}
                    >
                      {service.tag}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}

        {/* ============================================================ */}
        {/* MOBILE MODE: Focused slide-left                              */}
        {/* ============================================================ */}
        {isMobile &&
          SERVICES.map((service, i) => {
            const activeIndex = step - 2;
            const isPast = activeIndex > i;
            const isActive = activeIndex === i;
            const isUpcoming = activeIndex < i;
            const isHovered = hoveredIndex === i;

            // Transform & opacity: upcoming emerges from phone, active rests in center, past slides left
            let transform = "translate3d(-50%, -40px, 0) scale(0.35) rotate(3deg)";
            let opacity = 0;
            let pointerEvents = "none";

            if (isActive) {
              transform = isHovered
                ? "translate3d(-50%, -6px, 0) scale(1.02) rotate(0deg)"
                : "translate3d(-50%, 0, 0) scale(1) rotate(0deg)";
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
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => selectService(service.title)}
                style={{
                  position: "absolute",
                  left: "50%",
                  bottom: "clamp(8px, 1.8vh, 24px)",
                  width: "clamp(290px, 88vw, 380px)",
                  zIndex: isActive ? (isHovered ? 20 : 8) : isPast ? 5 : 6,
                  padding: "20px 22px",
                  borderRadius: "1.4rem",
                  background: isHovered ? "rgba(20, 8, 34, 0.98)" : "rgba(14, 5, 24, 0.95)",
                  border: isHovered
                    ? "1px solid rgba(255, 255, 255, 0.28)"
                    : "1px solid rgba(255, 255, 255, 0.12)",
                  boxShadow: isHovered
                    ? "0 28px 70px -8px rgba(0, 0, 0, 0.96), 0 0 0 1px rgba(255, 255, 255, 0.12)"
                    : "0 24px 60px -8px rgba(0, 0, 0, 0.92), 0 0 0 1px rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  cursor: "pointer",
                  transform,
                  opacity,
                  pointerEvents,
                  transition:
                    "transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease, background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease",
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
                        background: isHovered ? "rgba(214, 255, 117, 0.18)" : "rgba(214, 255, 117, 0.08)",
                        padding: "3px 10px",
                        borderRadius: "9999px",
                        border: isHovered
                          ? "1px solid rgba(214, 255, 117, 0.45)"
                          : "1px solid rgba(214, 255, 117, 0.22)",
                        transform: isHovered ? "scale(1.06)" : "scale(1)",
                        transition: "all 0.3s ease",
                      }}
                    >
                      {service.n}
                    </span>
                    <span className="label-mono" style={{ fontSize: "0.62rem", color: "rgba(248, 246, 252, 0.45)" }}>
                      {i + 1} / 05
                    </span>
                  </div>
                  <NinjaStar
                    style={{
                      width: "16px",
                      height: "16px",
                      color: isHovered ? "var(--acid-lime)" : "rgba(255, 255, 255, 0.35)",
                      transform: isHovered ? "rotate(90deg) scale(1.2)" : "rotate(0deg) scale(1)",
                      transition: "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), color 0.3s ease",
                    }}
                  />
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
                    color: isHovered ? "rgba(248, 246, 252, 0.94)" : "rgba(248, 246, 252, 0.72)",
                    transition: "color 0.3s ease",
                  }}
                >
                  {service.body}
                </p>

                <div
                  style={{
                    marginTop: "16px",
                    borderTop: isHovered ? "1px solid rgba(255, 255, 255, 0.14)" : "1px solid rgba(255, 255, 255, 0.08)",
                    paddingTop: "12px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    transition: "border-color 0.3s ease",
                  }}
                >
                  <span
                    className="service-card-btn"
                    style={{
                      color: isHovered ? "var(--acid-lime)" : "#ffffff",
                      fontFamily: "inherit",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      transition: "color 0.25s ease",
                    }}
                  >
                    <span>Discuss this service</span>
                    <span
                      style={{
                        display: "inline-block",
                        transform: isHovered ? "translateX(4px)" : "translateX(0)",
                        transition: "transform 0.25s ease",
                      }}
                    >
                      →
                    </span>
                  </span>
                  <span className="label-mono" style={{ fontSize: "0.58rem", color: isHovered ? "rgba(248, 246, 252, 0.65)" : "rgba(248, 246, 252, 0.45)" }}>
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
