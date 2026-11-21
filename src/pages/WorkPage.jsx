import React from "react";
import { PageTop } from "../components/PageTop";
import { Work } from "../components/Work";
import { Clients } from "../components/Clients";
import { CtaBand } from "../components/CtaBand";

export function WorkPage() {
  return (
    <div style={{ background: "var(--bg-deep)" }}>
      <PageTop
        eyebrow="COMPANY PORTFOLIO · SELECTED PROJECTS"
        title={
          <>
            Good ideas,<br />
            <span className="serif-em" style={{ color: "#d8b4fe" }}>out in the world.</span>
          </>
        }
        description="A selection of campaign, social and print work from Kavan’s portfolio. Each project starts with the needs of its audience and the character of its brand."
      />

      <Work />

      {/* External Portfolio Banner */}
      <section style={{ padding: "40px 0 80px", textAlign: "center" }}>
        <div className="container-custom">
          <a
            href="https://desaikavan03.github.io/kavan-desai-portfolio/#work"
            target="_blank"
            rel="noreferrer"
            className="btn-secondary"
            data-magnetic
            style={{ fontSize: "1rem", padding: "16px 36px" }}
          >
            See every project in Kavan’s full portfolio ↗
          </a>
        </div>
      </section>

      <Clients />
      <CtaBand compact />
    </div>
  );
}
