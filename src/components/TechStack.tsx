"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TechStack = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const row3Ref = useRef<HTMLDivElement>(null);

  const techStack = {
    row1: [
      { name: "React", icon: "⚛️", color: "from-cyan-400 to-blue-500" },
      { name: "Next.js", icon: "▲", color: "from-gray-700 to-gray-900" },
      { name: "TypeScript", icon: "TS", color: "from-blue-500 to-blue-700" },
      { name: "JavaScript", icon: "JS", color: "from-yellow-400 to-yellow-600" },
      { name: "Tailwind CSS", icon: "🎨", color: "from-cyan-400 to-blue-500" },
      { name: "GSAP", icon: "🟢", color: "from-green-400 to-emerald-600" },
      { name: "Three.js", icon: "🎲", color: "from-purple-500 to-pink-600" },
      { name: "Framer Motion", icon: "🎬", color: "from-pink-500 to-rose-600" },
    ],
    row2: [
      { name: "Node.js", icon: "🟩", color: "from-green-500 to-green-700" },
      { name: "Express", icon: "⚡", color: "from-gray-600 to-gray-800" },
      { name: "MongoDB", icon: "🍃", color: "from-green-500 to-emerald-600" },
      { name: "PostgreSQL", icon: "🐘", color: "from-blue-600 to-indigo-700" },
      { name: "Prisma", icon: "⚪", color: "from-indigo-500 to-purple-600" },
      { name: "Git", icon: "📦", color: "from-orange-500 to-red-600" },
      { name: "Docker", icon: "🐳", color: "from-blue-500 to-cyan-600" },
      { name: "AWS", icon: "☁️", color: "from-orange-400 to-yellow-500" },
    ],
    row3: [
      { name: "Python", icon: "🐍", color: "from-blue-500 to-yellow-500" },
      { name: "FastAPI", icon: "⚡", color: "from-teal-500 to-green-600" },
      { name: "Redux", icon: "🔄", color: "from-purple-600 to-purple-800" },
      { name: "GraphQL", icon: "◆", color: "from-pink-500 to-purple-600" },
      { name: "REST API", icon: "🔌", color: "from-blue-500 to-indigo-600" },
      { name: "Webpack", icon: "📦", color: "from-blue-400 to-blue-600" },
      { name: "Vite", icon: "⚡", color: "from-purple-500 to-yellow-500" },
    ],
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Infinite scroll animations for each row
      const animateRow = (
        row: HTMLDivElement | null,
        direction: number,
        duration: number
      ) => {
        if (!row) return;

        const items = row.children;
        const itemWidth = (items[0] as HTMLElement).offsetWidth;
        const totalWidth = itemWidth * items.length;

        gsap.set(row, { x: direction > 0 ? 0 : -totalWidth / 2 });

        const tl = gsap.timeline({
          repeat: -1,
          defaults: { ease: "none" },
        });

        tl.to(row, {
          x: direction > 0 ? -totalWidth / 2 : 0,
          duration: duration,
        });

        return tl;
      };

      // Create base animations
      const tl1 = animateRow(row1Ref.current, 1, 20); // Left to right
      const tl2 = animateRow(row2Ref.current, -1, 25); // Right to left
      const tl3 = animateRow(row3Ref.current, 1, 22); // Left to right

      // ScrollTrigger to control animation speed based on scroll
      let scrollVelocity = 0;
      let currentVelocity = 0;

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          scrollVelocity = self.getVelocity() / 1000;
        },
      });

      // Smooth velocity transition
      gsap.ticker.add(() => {
        currentVelocity = gsap.utils.interpolate(
          currentVelocity,
          scrollVelocity,
          0.1
        );

        const speedMultiplier = 1 + Math.abs(currentVelocity) * 0.5;

        if (tl1) tl1.timeScale(speedMultiplier);
        if (tl2) tl2.timeScale(speedMultiplier);
        if (tl3) tl3.timeScale(speedMultiplier);

        scrollVelocity *= 0.9; // Decay
      });

      // Entrance animation
      gsap.from(".tech-title", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const renderRow = (
    items: typeof techStack.row1,
    ref: React.RefObject<HTMLDivElement>
  ) => (
    <div ref={ref} className="flex gap-6 whitespace-nowrap">
      {/* Render items twice for seamless loop */}
      {[...items, ...items].map((tech, index) => (
        <div
          key={`${tech.name}-${index}`}
          className="group relative flex-shrink-0"
        >
          <div
            className={`
            relative overflow-hidden rounded-2xl
            bg-gradient-to-br ${tech.color}
            p-6 shadow-2xl
            transition-all duration-300
            hover:scale-110 hover:shadow-3xl hover:shadow-${tech.color}/50
            min-w-[140px] h-[140px]
            flex flex-col items-center justify-center gap-3
          `}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />

            {/* Icon */}
            <div className="text-5xl z-10 transform group-hover:rotate-12 transition-transform duration-300">
              {tech.icon}
            </div>

            {/* Name */}
            <div className="text-white font-bold text-sm z-10 text-center">
              {tech.name}
            </div>

            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="tech-title text-5xl md:text-6xl font-bold text-center mb-4 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
          Tech Stack
        </h2>
        <p className="tech-title text-gray-400 text-center mb-16 text-lg">
          Technologies I work with to bring ideas to life
        </p>
      </div>

      {/* Scrolling rows */}
      <div className="space-y-8">
        <div className="relative">
          <div className="overflow-hidden">
            {renderRow(techStack.row1, row1Ref)}
          </div>
          {/* Gradient overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-900 to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-900 to-transparent pointer-events-none" />
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            {renderRow(techStack.row2, row2Ref)}
          </div>
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-900 to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-900 to-transparent pointer-events-none" />
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            {renderRow(techStack.row3, row3Ref)}
          </div>
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-900 to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-900 to-transparent pointer-events-none" />
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-4 mt-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-slate-900/90 border border-slate-700/50 backdrop-blur-sm p-8 md:p-12">
          {/* Background glow effects */}
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
          
          <div className="relative z-10 text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-slate-200 mb-4">
              Let&apos;s Build Something{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                Extraordinary
              </span>
            </h3>
            <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
              Ready to turn your vision into reality? Whether it&apos;s a cutting-edge web app, 
              AI-powered solution, or full-stack platform — let&apos;s collaborate!
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:artharvind18@gmail.com"
                className="group px-8 py-4 rounded-lg font-medium bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 flex items-center gap-2"
              >
                <span>Get In Touch</span>
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
                className="group px-8 py-4 rounded-lg font-medium bg-slate-800 border border-slate-700 text-slate-200 hover:bg-slate-700 hover:border-slate-600 transition-all duration-300 hover:scale-105 flex items-center gap-2"
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
      </div>
    </section>
  );
};

export default TechStack;
