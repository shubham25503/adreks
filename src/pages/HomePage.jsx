import React from "react";
import { Hero } from "../components/Hero";
import { Marquee } from "../components/Marquee";
import { AboutIntro } from "../components/AboutIntro";
import { Services } from "../components/Services";
import { Process } from "../components/Process";
import { Work } from "../components/Work";
import { Clients } from "../components/Clients";
import { CtaBand } from "../components/CtaBand";

export function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <AboutIntro />
      <Services />
      <Process />
      <Work />
      <Clients />
      <CtaBand />
    </>
  );
}
