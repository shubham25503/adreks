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

      {/* A Useful First Note Section (Light Section) */}
      <section
        style={{
          padding: "70px 0 100px",
          background: "radial-gradient(ellipse at 88% 0%, rgba(181, 0, 255, 0.05), transparent 45%), #f3eee6",
          color: "#161515",
        }}
      >
        <div className="container-custom">
          <div
            style={{
              padding: "clamp(28px, 4vw, 44px)",
              borderRadius: "1.8rem",
              background: "#ffffff",
              border: "1px solid rgba(22, 21, 21, 0.1)",
              boxShadow: "0 14px 40px -10px rgba(22, 21, 21, 0.08)",
              maxWidth: "880px",
              margin: "0 auto",
            }}
          >
            <SectionLabel index="NOTE" theme="light">A Useful First Note</SectionLabel>
            <p
              style={{
                marginTop: "16px",
                fontSize: "1.08rem",
                lineHeight: 1.75,
                color: "rgba(22, 21, 21, 0.8)",
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
