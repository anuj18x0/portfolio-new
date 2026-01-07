"use client";

import { useState } from "react";
import Hero from "@/slices/Hero";
import Preloader from "@/components/Preloader";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import TechStack from "@/components/TechStack";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import gsap from "gsap";

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);

  const handlePreloaderComplete = () => {
    setIsLoading(false);

    // Animate content reveal
    gsap.fromTo(
      ".main-content",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        onStart: () => setContentVisible(true),
      }
    );
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Preloader */}
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Main content - hidden until preloader completes */}
      <div
        className="main-content"
        style={{
          visibility: contentVisible ? "visible" : "hidden",
          opacity: contentVisible ? 1 : 0,
        }}
      >
        {/* Main content */}
        <main className="relative z-10">
          <Hero startAnimation={contentVisible} />
          <About />
          <Experience />
          <Projects />
          <TechStack />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
