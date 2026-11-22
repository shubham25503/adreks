import React, { useEffect, useState } from "react";
import { delay, RollText, SectionLabel, Watermark } from "./Primitives";

const SERVICE_OPTIONS = [
  "Social Media & Content",
  "Performance Marketing",
  "Search & Digital Growth",
  "Branding & Creative Design",
  "Website Design & Development",
  "Full Agency Partner",
];

export function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    business: "",
    service: SERVICE_OPTIONS[0],
    details: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | sent
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const onPick = (e) => {
      const title = e.detail;
      if (SERVICE_OPTIONS.includes(title)) {
        setForm((f) => ({ ...f, service: title }));
      }
    };
    window.addEventListener("adrexks:service", onPick);
    return () => window.removeEventListener("adrexks:service", onPick);
  }, []);

  const handleChange = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      setErrorMessage("Please share your name and email address so we can reach you.");
      return;
    }
    setStatus("sending");
    // Simulate brief send or mailto fallback
    setTimeout(() => {
      setStatus("sent");
    }, 900);
  };

  return (
    <section
      id="contact"
      style={{
        paddingTop: "clamp(90px, 12vw, 150px)",
        paddingBottom: "clamp(90px, 12vw, 150px)",
        position: "relative",
        background: "var(--bg-deep)",
        overflow: "hidden",
      }}
    >
      <div
        className="grid-lines"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.5,
          maskImage: "radial-gradient(ellipse at top right, black 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at top right, black 30%, transparent 75%)",
          zIndex: -2,
        }}
      />
      <div
        className="glow-brand"
        style={{
          position: "absolute",
          right: "-15%",
          top: "10%",
          width: "55vmax",
          height: "55vmax",
          opacity: 0.35,
          zIndex: -2,
          animation: "glow-drift 15s ease-in-out infinite",
        }}
      />
      <Watermark speed={-0.1} text="START A PROJECT" className="bottom-[-3vw] -z-10" />

      <div className="container-custom">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.15fr",
            gap: "clamp(36px, 6vw, 80px)",
          }}
          className="contact-grid"
        >
          {/* Left Column: Direct Info */}
          <div>
            <SectionLabel index="08">Contact & Project Enquiries</SectionLabel>
            <RollText
              as="h2"
              className="font-display"
              emClassName="serif-em"
              style={{
                marginTop: "24px",
                fontSize: "clamp(2.5rem, 5.5vw, 5.5rem)",
                color: "#ffffff",
              }}
              parts={["Have a good", { em: "move in mind?" }]}
            />

            <p
              data-reveal
              style={{
                marginTop: "24px",
                maxWidth: "460px",
                fontSize: "1.1rem",
                lineHeight: 1.7,
                color: "rgba(248, 246, 252, 0.7)",
              }}
            >
              Tell us about the business, what you want to achieve and where you feel stuck. We read every brief personally.
            </p>

            <div data-reveal style={{ ...delay(100), marginTop: "44px", display: "grid", gap: "20px" }}>
              <a
                href="mailto:hello@adrexks.in"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  fontSize: "1.15rem",
                  color: "#fff",
                  textDecoration: "none",
                  transition: "color 0.25s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--acid-lime, #D6FF75)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#fff")}
              >
                <span
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    display: "grid",
                    placeItems: "center",
                    border: "1px solid rgba(168, 85, 247, 0.3)",
                    background: "rgba(168, 85, 247, 0.1)",
                    color: "var(--acid-lime, #D6FF75)",
                  }}
                >
                  ✉
                </span>
                <span>hello@adrexks.in</span>
              </a>

              <p
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  fontSize: "1.05rem",
                  color: "rgba(248, 246, 252, 0.75)",
                }}
              >
                <span
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    display: "grid",
                    placeItems: "center",
                    border: "1px solid rgba(168, 85, 247, 0.3)",
                    background: "rgba(168, 85, 247, 0.1)",
                    color: "var(--brand-bright)",
                  }}
                >
                  📍
                </span>
                <span>Ahmedabad, India · Working everywhere</span>
              </p>
            </div>

            {/* 3 Step Process Outline */}
            <div
              data-reveal
              style={{
                ...delay(200),
                marginTop: "48px",
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "1px",
                background: "rgba(168, 85, 247, 0.2)",
                borderRadius: "1rem",
                overflow: "hidden",
                border: "1px solid rgba(168, 85, 247, 0.25)",
              }}
              className="brief-steps-row"
            >
              {[
                ["01", "Share your brief"],
                ["02", "We review it"],
                ["03", "First call"],
              ].map(([n, title]) => (
                <div
                  key={n}
                  style={{
                    padding: "18px 16px",
                    background: "rgba(14, 2, 26, 0.95)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <span className="label-mono font-mono" style={{ color: "var(--brand-bright)" }}>
                    {n}
                  </span>
                  <span style={{ fontSize: "0.9rem", color: "#fff", fontWeight: 500 }}>{title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div data-reveal style={{ ...delay(150) }}>
            <div
              style={{
                padding: "clamp(28px, 4vw, 44px)",
                borderRadius: "2rem",
                background: "rgba(18, 3, 32, 0.82)",
                border: "1px solid rgba(192, 132, 252, 0.25)",
                boxShadow: "0 28px 70px -15px rgba(0, 0, 0, 0.8)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
              }}
            >
              {status === "sent" ? (
                <div style={{ textAlign: "center", padding: "40px 10px" }}>
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                      background: "rgba(168, 85, 247, 0.2)",
                      border: "1px solid var(--brand-bright)",
                      display: "grid",
                      placeItems: "center",
                      margin: "0 auto 20px",
                      fontSize: "1.6rem",
                      color: "var(--brand-bright)",
                    }}
                  >
                    ✓
                  </div>
                  <h3 className="font-display" style={{ fontSize: "1.8rem", color: "#fff" }}>
                    Thank you, {form.name.split(" ")[0]}!
                  </h3>
                  <p
                    style={{
                      marginTop: "12px",
                      fontSize: "1.05rem",
                      lineHeight: 1.6,
                      color: "rgba(248, 246, 252, 0.75)",
                    }}
                  >
                    Your brief has been received. Kavan will review the details and respond within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setStatus("idle");
                      setForm({
                        name: "",
                        email: "",
                        business: "",
                        service: SERVICE_OPTIONS[0],
                        details: "",
                      });
                    }}
                    className="btn-secondary"
                    style={{ marginTop: "28px" }}
                  >
                    Send another note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "grid", gap: "24px" }}>
                  <div>
                    <label
                      className="label-mono"
                      style={{ display: "block", color: "var(--brand-bright)", marginBottom: "12px" }}
                    >
                      Service of interest
                    </label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {SERVICE_OPTIONS.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleChange("service", opt)}
                          style={{
                            padding: "7px 14px",
                            borderRadius: "9999px",
                            fontSize: "0.82rem",
                            fontFamily: "inherit",
                            cursor: "pointer",
                            transition: "all 0.25s",
                            border: form.service === opt ? "1px solid var(--acid-lime)" : "1px solid rgba(168, 85, 247, 0.16)",
                            background: form.service === opt ? "var(--acid-lime)" : "rgba(255, 255, 255, 0.04)",
                            color: form.service === opt ? "#08020f" : "rgba(248, 246, 252, 0.7)",
                            fontWeight: form.service === opt ? 600 : 400,
                          }}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="label-mono" style={{ display: "block", color: "rgba(248, 246, 252, 0.5)", marginBottom: "6px" }}>
                      Your name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={form.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      style={{
                        width: "100%",
                        background: "rgba(255, 255, 255, 0.03)",
                        border: "1px solid rgba(168, 85, 247, 0.2)",
                        borderRadius: "12px",
                        padding: "14px 18px",
                        fontSize: "1rem",
                        color: "#fff",
                        outline: "none",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "var(--brand-bright)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(168, 85, 247, 0.2)")}
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }} className="form-double-col">
                    <div>
                      <label className="label-mono" style={{ display: "block", color: "rgba(248, 246, 252, 0.5)", marginBottom: "6px" }}>
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="you@company.com"
                        value={form.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        style={{
                          width: "100%",
                          background: "rgba(255, 255, 255, 0.03)",
                          border: "1px solid rgba(168, 85, 247, 0.2)",
                          borderRadius: "12px",
                          padding: "14px 18px",
                          fontSize: "1rem",
                          color: "#fff",
                          outline: "none",
                        }}
                        onFocus={(e) => (e.target.style.borderColor = "var(--brand-bright)")}
                        onBlur={(e) => (e.target.style.borderColor = "rgba(168, 85, 247, 0.2)")}
                      />
                    </div>
                    <div>
                      <label className="label-mono" style={{ display: "block", color: "rgba(248, 246, 252, 0.5)", marginBottom: "6px" }}>
                        Business / Website
                      </label>
                      <input
                        type="text"
                        placeholder="Company name or URL"
                        value={form.business}
                        onChange={(e) => handleChange("business", e.target.value)}
                        style={{
                          width: "100%",
                          background: "rgba(255, 255, 255, 0.03)",
                          border: "1px solid rgba(168, 85, 247, 0.2)",
                          borderRadius: "12px",
                          padding: "14px 18px",
                          fontSize: "1rem",
                          color: "#fff",
                          outline: "none",
                        }}
                        onFocus={(e) => (e.target.style.borderColor = "var(--brand-bright)")}
                        onBlur={(e) => (e.target.style.borderColor = "rgba(168, 85, 247, 0.2)")}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="label-mono" style={{ display: "block", color: "rgba(248, 246, 252, 0.5)", marginBottom: "6px" }}>
                      Tell us about your project or challenge
                    </label>
                    <textarea
                      rows={4}
                      placeholder="What are your goals, current blockers, or target timeline?"
                      value={form.details}
                      onChange={(e) => handleChange("details", e.target.value)}
                      style={{
                        width: "100%",
                        background: "rgba(255, 255, 255, 0.03)",
                        border: "1px solid rgba(168, 85, 247, 0.2)",
                        borderRadius: "12px",
                        padding: "14px 18px",
                        fontSize: "1rem",
                        color: "#fff",
                        outline: "none",
                        resize: "vertical",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "var(--brand-bright)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(168, 85, 247, 0.2)")}
                    />
                  </div>

                  {errorMessage && (
                    <p style={{ color: "#f87171", fontSize: "0.9rem" }}>{errorMessage}</p>
                  )}

                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={status === "sending"}
                    style={{
                      width: "100%",
                      justifyContent: "center",
                      padding: "16px",
                      fontSize: "1rem",
                    }}
                  >
                    {status === "sending" ? "Sending brief..." : "Submit project enquiry"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
        @media (max-width: 580px) {
          .brief-steps-row {
            grid-template-columns: 1fr !important;
          }
          .form-double-col {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
