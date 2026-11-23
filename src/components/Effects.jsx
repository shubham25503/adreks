import React, { useEffect, useRef } from "react";

/**
 * SiteEffects orchestrates all interactive animations:
 * - Scroll reveals ([data-reveal], [data-roll], .draw-line)
 * - Scroll progress bar
 * - Typography watermark parallax
 * - Interactive card spotlight coordinates
 * - Magnetic CTA physics ([data-magnetic])
 * - Custom desktop magnetic cursor with hover & label states
 */
export function SiteEffects() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1024px)").matches;
    const cleanups = [];

    // 1. Reveal on scroll (IntersectionObserver)
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.setAttribute("data-shown", "");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" }
    );

    const observe = () => {
      document
        .querySelectorAll("[data-reveal]:not([data-shown]), [data-roll]:not([data-shown]), .draw-line:not([data-shown])")
        .forEach((el) => io.observe(el));
    };
    observe();

    const mo = new MutationObserver(observe);
    mo.observe(document.body, { childList: true, subtree: true });
    cleanups.push(() => {
      io.disconnect();
      mo.disconnect();
    });

    // 2. Top scroll progress + Watermark parallax
    const bar = document.getElementById("scroll-progress");
    let raf = 0;
    const update = () => {
      raf = 0;
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight || 1;
      if (bar) bar.style.transform = `scaleX(${h.scrollTop / max})`;
      if (reduce) return;

      const vh = window.innerHeight;
      document.querySelectorAll("[data-parallax]").forEach((el) => {
        const host = el.parentElement;
        if (!host) return;
        const r = host.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        const speed = Number(el.dataset["parallax"] || 0.12);
        const offset = (r.top + r.height / 2 - vh / 2) * speed;
        el.style.transform = `translate3d(${offset}px, 0, 0)`;
      });

      document.querySelectorAll("[data-parallax-lr]").forEach((el) => {
        const speed = Number(el.dataset["parallaxLr"] || 0.16);
        const offset = window.scrollY * speed;
        el.style.transform = `translate3d(${offset}px, 0, 0)`;
      });
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    cleanups.push(() => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    });

    // 3. Card spotlight dynamic coordinates
    const onPointer = (e) => {
      const card = e.target?.closest?.(".spotlight");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    document.addEventListener("pointermove", onPointer);
    cleanups.push(() => document.removeEventListener("pointermove", onPointer));

    // 4. Custom cursor & Magnetic physics for desktop
    if (fine && !reduce) {
      document.documentElement.classList.add("has-cursor");
      cleanups.push(() => document.documentElement.classList.remove("has-cursor"));

      // Magnetic CTAs
      document.querySelectorAll("[data-magnetic]").forEach((el) => {
        el.style.transition = "transform 0.5s cubic-bezier(0.16,1,0.3,1)";
        const move = (e) => {
          const r = el.getBoundingClientRect();
          const x = e.clientX - (r.left + r.width / 2);
          const y = e.clientY - (r.top + r.height / 2);
          el.style.transform = `translate3d(${x * 0.28}px, ${y * 0.35}px, 0)`;
        };
        const leave = () => {
          el.style.transform = "";
        };
        el.addEventListener("mousemove", move);
        el.addEventListener("mouseleave", leave);
        cleanups.push(() => {
          el.removeEventListener("mousemove", move);
          el.removeEventListener("mouseleave", leave);
        });
      });

      // Cursor movement & states
      let mx = -100, my = -100, rx = -100, ry = -100;
      let curRaf = 0;

      const isLightTarget = (target) => {
        if (!target || target === document.body || target === document.documentElement) return false;
        const themed = target.closest("[data-theme]");
        if (themed) {
          return themed.getAttribute("data-theme") === "light";
        }
        const lightEl = target.closest(".theme-light, [style*='#f3eee6'], [style*='rgb(243, 238, 230)']");
        return Boolean(lightEl);
      };

      const onMouseMove = (e) => {
        mx = e.clientX;
        my = e.clientY;
        if (dotRef.current) {
          dotRef.current.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
        }

        const target = e.target;
        const clickable = target?.closest("a, button, [role='button'], input, textarea, select");
        const cursorLabel = target?.closest("[data-cursor-label]");
        const isLight = isLightTarget(target);

        // Update light / dark contrast theme on cursor
        if (isLight) {
          if (dotRef.current?.getAttribute("data-theme") !== "light") {
            dotRef.current?.setAttribute("data-theme", "light");
            ringRef.current?.setAttribute("data-theme", "light");
          }
        } else {
          if (dotRef.current?.hasAttribute("data-theme")) {
            dotRef.current?.removeAttribute("data-theme");
            ringRef.current?.removeAttribute("data-theme");
          }
        }

        if (ringRef.current) {
          if (cursorLabel) {
            ringRef.current.setAttribute("data-state", "label");
            if (labelRef.current) {
              labelRef.current.textContent = cursorLabel.getAttribute("data-cursor-label") || "View";
            }
          } else if (clickable) {
            ringRef.current.setAttribute("data-state", "hover");
          } else {
            ringRef.current.removeAttribute("data-state");
          }
        }
      };

      const loop = () => {
        rx += (mx - rx) * 0.18;
        ry += (my - ry) * 0.18;
        if (ringRef.current) {
          ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
        }
        curRaf = requestAnimationFrame(loop);
      };
      curRaf = requestAnimationFrame(loop);

      window.addEventListener("mousemove", onMouseMove, { passive: true });
      cleanups.push(() => {
        window.removeEventListener("mousemove", onMouseMove);
        cancelAnimationFrame(curRaf);
      });
    }

    return () => {
      cleanups.forEach((c) => c());
    };
  }, []);

  return (
    <>
      <div id="scroll-progress" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true">
        <span ref={labelRef} className="cursor-label">View</span>
      </div>
    </>
  );
}
