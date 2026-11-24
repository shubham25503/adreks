/**
 * Shared 3D perspective projection and wireframe ribbon geometry helpers
 * used by HeroWireframeHelix and HelicalMethod.
 */

export function projectHelixPoint(x, y, z, cx, rotX, perspective = 600) {
  const zRot = y * Math.sin(rotX) + z * Math.cos(rotX);
  const scale = perspective / (perspective + zRot + 400);
  return {
    x: cx + x * scale,
    y,
    z: zRot,
    scale,
  };
}

export function buildHelixRibbonQuads({
  numSegs,
  totalTurns,
  height,
  radius,
  ribbonWidth,
  baseRotation,
  rotX,
  cx,
  perspective = 600,
}) {
  const halfW = ribbonWidth * 0.5;
  const quads = [];

  for (let i = 0; i < numSegs; i++) {
    const u0 = i / numSegs;
    const u1 = (i + 1) / numSegs;

    const theta0 = u0 * totalTurns * Math.PI * 2 + baseRotation;
    const theta1 = u1 * totalTurns * Math.PI * 2 + baseRotation;

    const y0 = u0 * height;
    const y1 = u1 * height;

    const cosT0 = Math.cos(theta0);
    const sinT0 = Math.sin(theta0);
    const cosT1 = Math.cos(theta1);
    const sinT1 = Math.sin(theta1);

    const xC0 = radius * cosT0;
    const zC0 = radius * sinT0;
    const xC1 = radius * cosT1;
    const zC1 = radius * sinT1;

    const pL0 = projectHelixPoint(xC0 - sinT0 * halfW, y0, zC0 + cosT0 * halfW, cx, rotX, perspective);
    const pL1 = projectHelixPoint(xC1 - sinT1 * halfW, y1, zC1 + cosT1 * halfW, cx, rotX, perspective);
    const pR0 = projectHelixPoint(xC0 + sinT0 * halfW, y0, zC0 - cosT0 * halfW, cx, rotX, perspective);
    const pR1 = projectHelixPoint(xC1 + sinT1 * halfW, y1, zC1 - cosT1 * halfW, cx, rotX, perspective);

    quads.push({
      type: "quad",
      p0: pL0,
      p1: pL1,
      p2: pR1,
      p3: pR0,
      z: (pL0.z + pL1.z + pR0.z + pR1.z) * 0.25,
      u: u0,
      isRib: i % 4 === 0,
    });
  }

  return quads;
}

export function projectHelixOrbitPoint({
  u,
  totalTurns,
  radius,
  height,
  baseRotation,
  rotX,
  cx,
  perspective = 600,
  yOffset = 0,
}) {
  const theta = u * totalTurns * Math.PI * 2 + baseRotation;
  const x = radius * Math.cos(theta);
  const z = radius * Math.sin(theta);
  const y = u * height + yOffset;
  return projectHelixPoint(x, y, z, cx, rotX, perspective);
}
