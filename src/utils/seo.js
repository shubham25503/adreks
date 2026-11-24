const SITE_URL = "https://adrexks.in";
const SITE_NAME = "ADREXKS";
const DEFAULT_IMAGE = `${SITE_URL}/assets/hero-visual.webp`;

const BASE_KEYWORDS = [
  "ADREXKS",
  "Adrexks",
  "Adreks",
  "Adrexks Agency",
  "Adrexks Digital",
  "Adrexks Creative",
  "Adrexks Studio",
  "Adrexks Marketing",
  "Adrexks Growth Studio",
  "Adrexks Ahmedabad",
  "Adrexks India",
  "Adreks Agency",
  "Adreks Digital Marketing",
  "Kavan Desai",
  "Kavan Desai Adrexks",
  "best digital marketing agency",
  "best digital marketing agency in Ahmedabad",
  "best digital marketing agency in India",
  "top creative agency",
  "advertising and design agency",
  "performance marketing agency",
  "social media marketing agency",
  "SEO AEO GEO agency",
  "Google Ads and Meta Ads agency",
  "brand identity and logo design",
  "website design and development agency",
];

function upsertMeta(selector, attrName, attrValue, content) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertCanonical(href) {
  let link = document.head.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
}

export function getRouteSeo(pathname, servicesData) {
  if (pathname === "/") {
    return {
      title: "ADREXKS | Best Digital Marketing & Creative Agency in Ahmedabad, India",
      description:
        "ADREXKS (Adreks) is an independent digital marketing and creative agency in Ahmedabad, India. We unite brand strategy, social media, Meta & Google Ads, SEO/AEO/GEO, and high-converting websites.",
      keywords: [
        ...BASE_KEYWORDS,
        "digital marketing services",
        "full service marketing agency",
        "creative growth partner",
        "D2C marketing agency",
      ].join(", "),
      canonical: `${SITE_URL}/`,
    };
  }

  if (pathname === "/studio") {
    return {
      title: "Studio & Leadership | ADREXKS Digital Marketing & Creative Agency",
      description:
        "Meet Kavan Desai and the ADREXKS creative studio in Ahmedabad. An independent advertising, branding, and performance marketing practice built around real customer insight.",
      keywords: [
        ...BASE_KEYWORDS,
        "about Adrexks",
        "Adrexks founder Kavan Desai",
        "independent creative studio Ahmedabad",
        "brand strategist India",
      ].join(", "),
      canonical: `${SITE_URL}/studio`,
    };
  }

  if (pathname === "/services") {
    return {
      title: "Services & Capabilities | ADREXKS - SEO, Meta Ads, Branding & Web",
      description:
        "Explore ADREXKS growth services: Social Media Management, Google & Meta Ads, SEO/AEO/GEO, Social Design, Reels Editing, Brand Identity, Print Collateral, and Web Development.",
      keywords: [
        ...BASE_KEYWORDS,
        "digital marketing packages",
        "social media management India",
        "paid advertising agency",
        "reels video editing agency",
        "corporate branding services",
      ].join(", "),
      canonical: `${SITE_URL}/services`,
    };
  }

  if (pathname.startsWith("/services/")) {
    const slug = pathname.split("/")[2];
    const match = servicesData.find((s) => s.slug === slug);
    if (match) {
      return {
        title: `${match.title} | ADREXKS Digital Marketing Agency`,
        description: `${match.short} ${match.intro}`,
        keywords: [
          ...BASE_KEYWORDS,
          match.title,
          ...match.kicker.split("·").map((k) => k.trim()),
          `best ${match.title.toLowerCase()} agency`,
        ].join(", "),
        canonical: `${SITE_URL}/services/${match.slug}`,
      };
    }
  }

  if (pathname === "/work") {
    return {
      title: "Selected Work & Case Studies | ADREXKS Creative Agency",
      description:
        "Featured advertising campaigns, social media creative, outdoor vehicle branding, healthcare communication, and print collateral crafted by ADREXKS.",
      keywords: [
        ...BASE_KEYWORDS,
        "Adrexks portfolio",
        "creative agency portfolio India",
        "brand campaign case studies",
        "print and outdoor branding Ahmedabad",
      ].join(", "),
      canonical: `${SITE_URL}/work`,
    };
  }

  if (pathname === "/contact") {
    return {
      title: "Contact ADREXKS | Start a Digital Marketing or Branding Project",
      description:
        "Get in touch with ADREXKS in Ahmedabad, India. Share your brief for social media, Google & Meta Ads, SEO/AEO/GEO, branding, or website development.",
      keywords: [
        ...BASE_KEYWORDS,
        "hire digital marketing agency",
        "contact Adrexks",
        "digital marketing consultation Ahmedabad",
      ].join(", "),
      canonical: `${SITE_URL}/contact`,
    };
  }

  return {
    title: "Page Not Found | ADREXKS",
    description:
      "The requested page could not be found on ADREXKS. Explore our digital marketing, branding, and web development services.",
    keywords: BASE_KEYWORDS.join(", "),
    canonical: `${SITE_URL}${pathname}`,
  };
}

export function applyRouteSeo(pathname, servicesData) {
  if (typeof document === "undefined") return;
  const seo = getRouteSeo(pathname, servicesData);

  document.title = seo.title;
  upsertMeta('meta[name="description"]', "name", "description", seo.description);
  upsertMeta('meta[name="keywords"]', "name", "keywords", seo.keywords);
  upsertCanonical(seo.canonical);

  upsertMeta('meta[property="og:title"]', "property", "og:title", seo.title);
  upsertMeta('meta[property="og:description"]', "property", "og:description", seo.description);
  upsertMeta('meta[property="og:url"]', "property", "og:url", seo.canonical);
  upsertMeta('meta[property="og:site_name"]', "property", "og:site_name", SITE_NAME);
  upsertMeta('meta[property="og:image"]', "property", "og:image", DEFAULT_IMAGE);

  upsertMeta('meta[name="twitter:title"]', "name", "twitter:title", seo.title);
  upsertMeta('meta[name="twitter:description"]', "name", "twitter:description", seo.description);
}
