import React from "react";
import { PageTop } from "../components/PageTop";
import { Contact } from "../components/Contact";
import { SectionLabel } from "../components/Primitives";

export function ContactPage() {
  return (
    <div style={{ background: "var(--bg-deep)" }}>
      <PageTop
        eyebrow="CONTACT · PROJECT ENQUIRIES"
        title={
          <>
            Have something<br />
            good in <span className="serif-em" style={{ color: "#d8b4fe" }}>mind?</span>
          </>
        }
        description="Tell us what you’re working on, what you want to change, or where you want to grow. We’ll start with a conversation."
      />

      <Contact />

      {/* A Useful First Note Section */}
      <section style={{ padding: "40px 0 90px" }}>
        <div className="container-custom">
          <div
            style={{
              padding: "clamp(28px, 4vw, 44px)",
              borderRadius: "1.8rem",
              background: "rgba(18, 3, 32, 0.6)",
              border: "1px solid rgba(168, 85, 247, 0.2)",
              maxWidth: "880px",
              margin: "0 auto",
            }}
          >
            <SectionLabel index="NOTE">A Useful First Note</SectionLabel>
            <p
              style={{
                marginTop: "16px",
                fontSize: "1.08rem",
                lineHeight: 1.75,
                color: "rgba(248, 246, 252, 0.8)",
              }}
            >
              Share your website or social links, which service you’re interested in, what you want to improve, and any timing you already have in mind. You don’t need a polished brief to get started.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
