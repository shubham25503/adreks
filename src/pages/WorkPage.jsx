import React from "react";
import { PageTop } from "../components/PageTop";
import { Work } from "../components/Work";
import { Clients } from "../components/Clients";
import { CtaBand } from "../components/CtaBand";

export function WorkPage() {
  return (
    <div style={{ background: "var(--bg-deep)" }}>
      <PageTop
        eyebrow="FEATURED CLIENT WORK · SELECTED PROJECTS"
        title={
          <>
            Good ideas,<br />
            <span className="serif-em" style={{ color: "#d8b4fe" }}>out in the world.</span>
          </>
        }
        description="A selection of campaign, social, and print creative produced for growing brands. Each project starts with customer understanding and brand character."
      />

      <Work />

      <Clients />
      <CtaBand compact />
    </div>
  );
}
