import React, { useEffect, useRef, useState } from "react";
import { RollText, SectionLabel } from "./Primitives";
import { ServicesPhoneMockup } from "./services/ServicesPhoneMockup";
import { DesktopServiceCards } from "./services/DesktopServiceCards";
import { MobileServicesDeck } from "./services/MobileServicesDeck";

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
        <ServicesPhoneMockup
          services={SERVICES}
          step={step}
          hoveredIndex={hoveredIndex}
          phoneUp={phoneUp}
          isLaptop={isLaptop}
        />

        {!isMobile && (
          <DesktopServiceCards
            services={SERVICES}
            step={step}
            targets={desktopCardTargets}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
            selectService={selectService}
            isLaptop={isLaptop}
          />
        )}

        {isMobile && (
          <MobileServicesDeck
            services={SERVICES}
            step={step}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
            selectService={selectService}
          />
        )}
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
