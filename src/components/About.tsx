"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Bounded from '@/components/Bounded';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const illustrationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 80%',
            },
          }
        );
      }

      // Content animation
      if (contentRef.current) {
        const paragraphs = contentRef.current.querySelectorAll('p');
        gsap.fromTo(
          paragraphs,
          { opacity: 0, x: 50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 80%',
            },
          }
        );
      }

      // Illustration animation
      if (illustrationRef.current) {
        gsap.fromTo(
          illustrationRef.current,
          { opacity: 0, scale: 0.8, x: -50 },
          {
            opacity: 1,
            scale: 1,
            x: 0,
            duration: 1,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: illustrationRef.current,
              start: 'top 80%',
            },
          }
        );

        // Animate SVG elements
        const circles = illustrationRef.current.querySelectorAll('.float-circle');
        circles.forEach((circle, i) => {
          gsap.to(circle, {
            y: -20,
            duration: 2 + i * 0.3,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: i * 0.2,
          });
        });

        const lines = illustrationRef.current.querySelectorAll('.code-line');
        gsap.fromTo(
          lines,
          { scaleX: 0, opacity: 0 },
          {
            scaleX: 1,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: illustrationRef.current,
              start: 'top 70%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -left-40 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />

      <Bounded>
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 md:mb-20">
          <h2 className="section-heading">
            <span className="text-slate-400">About</span>{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Me</span>
          </h2>
          <p className="section-subheading mx-auto mt-6">
            Building elegant solutions with modern technology
          </p>
        </div>

        {/* Main content - Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Animated SVG Illustration - LEFT */}
          <div ref={illustrationRef} className="relative order-2 md:order-1">
            <div className="relative w-full max-w-md mx-auto">
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-500/10 rounded-full blur-xl" />
              
              <div className="relative p-8 rounded-3xl bg-slate-900/50 backdrop-blur-sm border border-slate-800">
                <svg
                  viewBox="0 0 400 400"
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Animated background orbs */}
                  <circle className="float-circle" cx="200" cy="200" r="180" fill="url(#gradient1)" opacity="0.08">
                    <animate attributeName="r" values="180;190;180" dur="4s" repeatCount="indefinite" />
                  </circle>
                  <circle className="float-circle" cx="200" cy="200" r="140" fill="url(#gradient2)" opacity="0.1">
                    <animate attributeName="r" values="140;150;140" dur="3s" repeatCount="indefinite" />
                  </circle>
                  <circle className="float-circle" cx="200" cy="200" r="100" fill="url(#gradient1)" opacity="0.12">
                    <animate attributeName="r" values="100;110;100" dur="2.5s" repeatCount="indefinite" />
                  </circle>
                  
                  {/* Orbiting particles */}
                  <circle cx="200" cy="50" r="6" fill="#06b6d4">
                    <animateTransform attributeName="transform" type="rotate" from="0 200 200" to="360 200 200" dur="8s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="350" cy="200" r="4" fill="#a78bfa">
                    <animateTransform attributeName="transform" type="rotate" from="0 200 200" to="-360 200 200" dur="6s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="200" cy="350" r="5" fill="#22d3ee">
                    <animateTransform attributeName="transform" type="rotate" from="0 200 200" to="360 200 200" dur="10s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="50" cy="200" r="3" fill="#c084fc">
                    <animateTransform attributeName="transform" type="rotate" from="0 200 200" to="-360 200 200" dur="7s" repeatCount="indefinite" />
                  </circle>
                  
                  {/* Monitor */}
                  <rect x="70" y="120" width="260" height="160" rx="12" fill="#1e293b" stroke="#475569" strokeWidth="2" />
                  <rect x="80" y="130" width="240" height="135" rx="6" fill="#0f172a" />
                  
                  {/* Monitor stand */}
                  <rect x="175" y="280" width="50" height="30" fill="#1e293b" />
                  <rect x="140" y="305" width="120" height="10" rx="2" fill="#334155" />
                  
                  {/* Code lines with typing animation */}
                  <g className="code-line" style={{ transformOrigin: '100px 150px' }}>
                    <rect x="100" y="145" width="8" height="10" rx="1" fill="#f472b6" />
                    <line x1="115" y1="150" x2="180" y2="150" stroke="#06b6d4" strokeWidth="3" strokeLinecap="round" />
                    <line x1="190" y1="150" x2="220" y2="150" stroke="#a78bfa" strokeWidth="3" strokeLinecap="round" />
                  </g>
                  <g className="code-line" style={{ transformOrigin: '100px 170px' }}>
                    <rect x="110" y="165" width="6" height="10" rx="1" fill="#22d3ee" />
                    <line x1="125" y1="170" x2="250" y2="170" stroke="#a78bfa" strokeWidth="3" strokeLinecap="round" />
                  </g>
                  <g className="code-line" style={{ transformOrigin: '100px 190px' }}>
                    <rect x="110" y="185" width="6" height="10" rx="1" fill="#22d3ee" />
                    <line x1="125" y1="190" x2="200" y2="190" stroke="#06b6d4" strokeWidth="3" strokeLinecap="round" />
                    <line x1="210" y1="190" x2="280" y2="190" stroke="#c084fc" strokeWidth="3" strokeLinecap="round" />
                  </g>
                  <g className="code-line" style={{ transformOrigin: '100px 210px' }}>
                    <rect x="110" y="205" width="6" height="10" rx="1" fill="#22d3ee" />
                    <line x1="125" y1="210" x2="170" y2="210" stroke="#a78bfa" strokeWidth="3" strokeLinecap="round" />
                  </g>
                  <g className="code-line" style={{ transformOrigin: '100px 230px' }}>
                    <rect x="100" y="225" width="8" height="10" rx="1" fill="#f472b6" />
                    <line x1="115" y1="230" x2="160" y2="230" stroke="#06b6d4" strokeWidth="3" strokeLinecap="round" />
                  </g>
                  <g className="code-line" style={{ transformOrigin: '100px 250px' }}>
                    <line x1="100" y1="250" x2="230" y2="250" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeDasharray="4" />
                  </g>
                  
                  {/* Blinking cursor */}
                  <rect x="175" y="205" width="3" height="12" fill="#06b6d4">
                    <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />
                  </rect>
                  
                  {/* Floating elements */}
                  <text className="float-circle" x="30" y="80" fontSize="28" fill="#06b6d4" opacity="0.7" fontFamily="monospace">{'</>'}</text>
                  <text className="float-circle" x="330" y="90" fontSize="24" fill="#a78bfa" opacity="0.7" fontFamily="monospace">{'{ }'}</text>
                  <text className="float-circle" x="25" y="330" fontSize="22" fill="#22d3ee" opacity="0.6" fontFamily="monospace">fn()</text>
                  <text className="float-circle" x="320" y="340" fontSize="26" fill="#c084fc" opacity="0.7" fontFamily="monospace">[ ]</text>
                  <text className="float-circle" x="50" y="200" fontSize="20" fill="#06b6d4" opacity="0.5" fontFamily="monospace">const</text>
                  <text className="float-circle" x="330" y="220" fontSize="18" fill="#a78bfa" opacity="0.5" fontFamily="monospace">=&gt;</text>
                  
                  {/* Decorative circles */}
                  <circle cx="60" cy="140" r="8" fill="#06b6d4" opacity="0.3">
                    <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="340" cy="160" r="6" fill="#a78bfa" opacity="0.4">
                    <animate attributeName="opacity" values="0.4;0.7;0.4" dur="2.5s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="70" cy="280" r="5" fill="#22d3ee" opacity="0.3">
                    <animate attributeName="opacity" values="0.3;0.5;0.3" dur="3s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="330" cy="270" r="7" fill="#c084fc" opacity="0.35">
                    <animate attributeName="opacity" values="0.35;0.6;0.35" dur="2.2s" repeatCount="indefinite" />
                  </circle>
                  
                  {/* Connection lines */}
                  <line x1="60" y1="140" x2="80" y2="130" stroke="#06b6d4" strokeWidth="1" opacity="0.3" />
                  <line x1="340" y1="160" x2="320" y2="140" stroke="#a78bfa" strokeWidth="1" opacity="0.3" />
                  
                  {/* Gradients */}
                  <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#a78bfa" />
                    </linearGradient>
                    <linearGradient id="gradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#a78bfa" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>

          {/* Content - RIGHT */}
          <div ref={contentRef} className="space-y-6 order-1 md:order-2">
            <p className="text-slate-300 text-lg leading-relaxed">
              I&apos;m a <span className="text-cyan-400 font-semibold">Fullstack Developer</span> and{' '}
              <span className="text-purple-400 font-semibold">AI Engineer</span> passionate about creating
              intelligent, scalable solutions that make a difference.
            </p>
            
            <p className="text-slate-300 text-lg leading-relaxed">
              With expertise in modern web technologies and AI/ML, I build seamless experiences from
              frontend to backend. I specialize in <span className="text-cyan-400">React</span>,{' '}
              <span className="text-cyan-400">Next.js</span>, and{' '}
              <span className="text-purple-400">Python AI systems</span>.
            </p>

            <p className="text-slate-300 text-lg leading-relaxed">
              Currently pursuing <span className="text-cyan-400 font-semibold">B.E. in Computer Science</span> with
              an SPI of 9.03, I thrive on turning complex challenges into elegant solutions.
            </p>

            {/* Skills highlight */}
            <div className="flex flex-wrap gap-3 pt-6">
              <span className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium">
                Fullstack Development
              </span>
              <span className="px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium">
                AI/ML Engineering
              </span>
              <span className="px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium">
                System Architecture
              </span>
            </div>
          </div>
        </div>
      </Bounded>
    </section>
  );
};

export default About;

