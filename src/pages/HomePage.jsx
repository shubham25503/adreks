import React from "react";
import { Hero } from "../components/Hero";
import { HelicalMethod } from "../components/HelicalMethod";
import { Marquee } from "../components/Marquee";
import { AboutIntro } from "../components/AboutIntro";
import { Services } from "../components/Services";
import { Process } from "../components/Process";
import { CtaBand } from "../components/CtaBand";

export function HomePage() {
  return (
    <>
      <Hero />
      <HelicalMethod />
      <Marquee />
      <AboutIntro />
      <Services />
      <Process />
      <CtaBand />
    </>
  );
}
