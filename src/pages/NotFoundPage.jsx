import React from "react";
import { PageTop } from "../components/PageTop";
import { Link } from "../components/Router";

export function NotFoundPage() {
  return (
    <div style={{ background: "var(--bg-deep)", minHeight: "80vh" }}>
      <PageTop
        eyebrow="404 · NOT THE RIGHT PAGE"
        title={
          <>
            Let’s find<br />
            <span className="serif-em" style={{ color: "#d8b4fe" }}>the right one.</span>
          </>
        }
        description="That page isn’t here. Explore Adreks services or return to the homepage."
      />

      <div style={{ padding: "80px 0", textAlign: "center" }}>
        <div className="container-custom">
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/" className="btn-primary" data-magnetic>
              Return home ↗
            </Link>
            <Link to="/services" className="btn-secondary" data-magnetic>
              Explore services
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
