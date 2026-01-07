"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Mail, Heart, Code2, Coffee } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in animation
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 90%',
            },
          }
        );
      }

      // Animate SVG elements
      const orbs = footerRef.current?.querySelectorAll('.footer-orb');
      orbs?.forEach((orb, i) => {
        gsap.to(orb, {
          y: i % 2 === 0 ? -20 : 20,
          x: i % 2 === 0 ? 10 : -10,
          duration: 3 + i,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const socialLinks = [
    { href: 'https://github.com', icon: <Github className="w-5 h-5" />, label: 'GitHub' },
    { href: 'https://linkedin.com', icon: <Linkedin className="w-5 h-5" />, label: 'LinkedIn' },
    { href: 'mailto:artharvind18@gmail.com', icon: <Mail className="w-5 h-5" />, label: 'Email' },
  ];

  return (
    <footer ref={footerRef} className="relative overflow-hidden bg-slate-950 border-t border-slate-800/50">
      {/* Animated Background SVG */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg
          className="absolute bottom-0 left-0 w-full h-64 opacity-30"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="footerGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#a855f7" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="footerGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#f43f5e" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          
          {/* Wave 1 */}
          <path
            fill="url(#footerGrad1)"
            d="M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,186.7C672,181,768,203,864,197.3C960,192,1056,160,1152,149.3C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          >
            <animate
              attributeName="d"
              dur="10s"
              repeatCount="indefinite"
              values="
                M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,186.7C672,181,768,203,864,197.3C960,192,1056,160,1152,149.3C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                M0,192L48,181.3C96,171,192,149,288,160C384,171,480,213,576,218.7C672,224,768,192,864,176C960,160,1056,160,1152,170.7C1248,181,1344,203,1392,213.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,186.7C672,181,768,203,864,197.3C960,192,1056,160,1152,149.3C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z
              "
            />
          </path>
          
          {/* Wave 2 */}
          <path
            fill="url(#footerGrad2)"
            d="M0,256L48,261.3C96,267,192,277,288,272C384,267,480,245,576,234.7C672,224,768,224,864,234.7C960,245,1056,267,1152,261.3C1248,256,1344,224,1392,208L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          >
            <animate
              attributeName="d"
              dur="8s"
              repeatCount="indefinite"
              values="
                M0,256L48,261.3C96,267,192,277,288,272C384,267,480,245,576,234.7C672,224,768,224,864,234.7C960,245,1056,267,1152,261.3C1248,256,1344,224,1392,208L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                M0,224L48,229.3C96,235,192,245,288,256C384,267,480,277,576,272C672,267,768,245,864,229.3C960,213,1056,203,1152,208C1248,213,1344,235,1392,245.3L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                M0,256L48,261.3C96,267,192,277,288,272C384,267,480,245,576,234.7C672,224,768,224,864,234.7C960,245,1056,267,1152,261.3C1248,256,1344,224,1392,208L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z
              "
            />
          </path>
        </svg>

        {/* Floating orbs */}
        <div className="footer-orb absolute top-10 left-[10%] w-20 h-20 bg-cyan-500/10 rounded-full blur-2xl" />
        <div className="footer-orb absolute top-20 right-[15%] w-16 h-16 bg-purple-500/10 rounded-full blur-2xl" />
        <div className="footer-orb absolute bottom-20 left-[20%] w-24 h-24 bg-rose-500/10 rounded-full blur-2xl" />
        <div className="footer-orb absolute top-16 right-[40%] w-12 h-12 bg-emerald-500/10 rounded-full blur-xl" />
      </div>

      {/* Content */}
      <div ref={contentRef} className="relative z-10 max-w-6xl mx-auto px-4 py-16">
        <div className="flex flex-col items-center text-center">
          {/* Logo/Name */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-rose-400 bg-clip-text text-transparent">
              Arth Arvind
            </h3>
            <p className="text-slate-500 text-sm mt-1">Fullstack Developer & AI Engineer</p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 mb-8">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="p-3 rounded-full bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:text-white hover:bg-slate-700/50 hover:border-slate-600 hover:scale-110 transition-all duration-300"
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>

          {/* Divider */}
          <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent mb-8" />

          {/* Made with love */}
          <p className="text-slate-500 text-sm flex items-center gap-2 mb-4">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-rose-500 animate-pulse" />
            <span>and</span>
            <Coffee className="w-4 h-4 text-amber-500" />
            <span>using</span>
            <Code2 className="w-4 h-4 text-cyan-500" />
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {['Next.js', 'React', 'TypeScript', 'Tailwind', 'GSAP', 'Three.js'].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs rounded-full bg-slate-800/50 border border-slate-700/50 text-slate-400"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-slate-600 text-sm">
            © {new Date().getFullYear()} Arth Arvind. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
