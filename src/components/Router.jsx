import React, { useEffect, useState } from "react";

export function useLocation() {
  const [pathname, setPathname] = useState(
    typeof window !== "undefined" ? window.location.pathname : "/"
  );

  useEffect(() => {
    const onPop = () => setPathname(window.location.pathname);
    const onNav = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", onPop);
    window.addEventListener("adreks:navigate", onNav);
    return () => {
      window.removeEventListener("popstate", onPop);
      window.removeEventListener("adreks:navigate", onNav);
    };
  }, []);

  return { pathname };
}

export function navigate(to) {
  if (typeof window === "undefined") return;
  if (to.startsWith("http") || to.startsWith("mailto:")) {
    window.location.href = to;
    return;
  }
  window.history.pushState({}, "", to);
  window.dispatchEvent(new Event("adreks:navigate"));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function Link({ to, children, className = "", style = {}, onClick, ...props }) {
  const handleClick = (e) => {
    onClick?.(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return;
    }
    e.preventDefault();
    navigate(to);
  };

  return (
    <a href={to} className={className} style={style} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}

export function NavLink({ to, children, className = "", style = {}, activeStyle = {}, ...props }) {
  const { pathname } = useLocation();
  const isActive = pathname === to || (to !== "/" && pathname.startsWith(to));

  return (
    <Link
      to={to}
      className={className}
      aria-current={isActive ? "page" : undefined}
      style={{
        ...style,
        ...(isActive ? activeStyle : {}),
      }}
      {...props}
    >
      {children}
    </Link>
  );
}
