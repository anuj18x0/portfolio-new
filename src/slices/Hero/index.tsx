"use client";
import { useEffect, useRef } from "react";
import { Shapes } from "@/slices/Hero/Shapes";
import Bounded from "@/components/Bounded";
import Navbar from "@/components/Navbar";
import gsap from "gsap";

/**
 * Hero Component.
 */
interface HeroProps {
  startAnimation?: boolean;
}

const Hero = ({ startAnimation = false }: HeroProps): JSX.Element => {
  const component = useRef(null);

  useEffect(() => {
    // Only start animation when startAnimation is true
    if (!startAnimation) return;

    let ctx = gsap.context(() => {
      // create as many GSAP animations and/or ScrollTriggers here as you want...
      gsap
        .timeline()
        .fromTo(
          ".name-animation",
          { x: -100, opacity: 0, rotate: -10 },
          {
            x: 0,
            opacity: 1,
            rotate: 0,

            ease: "elastic.out(1,0.3)",
            duration: 1,
            transformOrigin: "left top",
            stagger: { each: 0.1, from: "random" },
          },
        )
        .fromTo(
          ".job-title",
          {
            y: 20,
            opacity: 0,
            scale: 1.2,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scale: 1,
            ease: "elastic.out(1,0.3)",
          },
        )
        .fromTo(
          ".hero-cta",
          {
            y: 20,
            opacity: 0,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "fade",
          },
          "-=0.5",
        );
    }, component);
    return () => ctx.revert(); // cleanup!
  }, [startAnimation]);

  const renderLetters = (name: string, key: string) => {
    if (!name) return;
    return name.split("").map((letter, index) => (
      <span
        key={index}
        className={`name-animation name-animation-${key}-index inline-block opacity-0 `}
      >
        {letter}
      </span>
    ));
  };

  const first_name = "Arth";
  const last_name = "Arvind";

  return (
    <>
      <Navbar startAnimation={startAnimation} />
      <Bounded ref={component}>
        <div className="grid min-h-[70vh] grid-cols-1 items-center md:grid-cols-2">
          <Shapes />
          <div className="col-start-1 md:row-start-1 " data-speed=".2">
            <h1
              className="mb-8 text-[clamp(3rem,20vmin,20rem)] font-extrabold leading-none tracking-tighter"
              aria-label={
                first_name + " " + last_name
              }
            >
              <span className="block text-slate-300 ">
                {renderLetters(first_name, "first")}
              </span>
              <span className="-mt-[.2em] block text-slate-500  ">
                {renderLetters(last_name, "last")}
              </span>
            </h1>
            <span className="job-title block bg-gradient-to-tr from-yellow-500 via-yellow-200 to-yellow-500 bg-clip-text text-2xl font-bold uppercase tracking-[.2em] text-transparent opacity-0 md:text-4xl">
              Software Engineer
            </span>
            
            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">

              <a
                href="#contact"
                className="hero-cta group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-medium bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 text-slate-900 hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/25 opacity-0"
              >
                <span>Contact Me</span>
                <svg 
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              
              <a
                href="/resume.pdf"
                download
                className="hero-cta opacity-0 group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-medium bg-slate-800 border border-slate-700 text-slate-200 hover:bg-slate-700 hover:border-slate-600 transition-all duration-300 hover:scale-105"
              >
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Download Resume</span>
              </a>
            </div>
          </div>
        </div>
      </Bounded>
    </>
  );
};

export default Hero;
