"use client";

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Building2, Calendar, Zap, Brain, TrendingUp, ArrowRight } from 'lucide-react';
import Bounded from '@/components/Bounded';

gsap.registerPlugin(ScrollTrigger);

interface HighlightCardProps {
  highlight: {
    title: string;
    description: string;
    icon: React.ReactNode;
  };
  index: number;
}

const HighlightCard = ({ highlight, index }: HighlightCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { 
          opacity: 0, 
          x: -30,
          scale: 0.95,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          delay: index * 0.15,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
          },
        }
      );
    });

    return () => ctx.revert();
  }, [index]);

  useEffect(() => {
    if (!cardRef.current) return;

    if (isHovered) {
      gsap.to(cardRef.current, {
        scale: 1.02,
        y: -5,
        duration: 0.3,
        ease: 'power2.out',
      });
    } else {
      gsap.to(cardRef.current, {
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  }, [isHovered]);

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="p-5 rounded-xl bg-slate-800/30 hover:bg-slate-800/50 transition-colors group cursor-pointer relative overflow-hidden"
    >
      {/* Animated background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-emerald-500/0 to-emerald-500/0 group-hover:from-emerald-500/5 group-hover:via-emerald-500/10 group-hover:to-emerald-500/5 transition-all duration-500" />
      
      <div className="flex items-start gap-4 relative z-10">
        <div className="p-3 rounded-xl bg-slate-900/50 group-hover:bg-emerald-500/10 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
          {highlight.icon}
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-slate-200 mb-2 group-hover:text-emerald-400 transition-colors">
            {highlight.title}
          </h4>
          <p className="text-sm text-slate-400 leading-relaxed">
            {highlight.description}
          </p>
        </div>
        <ArrowRight className="w-5 h-5 text-emerald-400 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300" />
      </div>
    </div>
  );
};

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const titleWordsRef = useRef<HTMLSpanElement[]>([]);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animated header with word-by-word reveal
      if (headerRef.current) {
        const words = headerRef.current.querySelectorAll('.word');
        gsap.fromTo(
          words,
          {
            opacity: 0,
            y: 50,
            rotationX: -90,
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'back.out(1.2)',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 80%',
            },
          }
        );
      }

      // Timeline line draw animation with glow effect
      gsap.fromTo(
        lineRef.current,
        { 
          scaleY: 0,
          opacity: 0,
        },
        {
          scaleY: 1,
          opacity: 1,
          duration: 2,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 70%',
            end: 'bottom 30%',
            scrub: 1.5,
          },
        }
      );

      // Animate timeline dot with pulse
      const dot = timelineRef.current?.querySelector('.timeline-dot');
      if (dot) {
        gsap.to(dot, {
          scale: 1.2,
          duration: 1,
          repeat: -1,
          yoyo: true,
          ease: 'power2.inOut',
        });
      }

      // Animate timeline card with 3D effect
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          {
            opacity: 0,
            x: -100,
            rotationY: -15,
          },
          {
            opacity: 1,
            x: 0,
            rotationY: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardRef.current,
              start: 'top 80%',
            },
          }
        );
      }

      // Parallax effect for background blobs
      const blobs = sectionRef.current?.querySelectorAll('.blob');
      blobs?.forEach((blob, i) => {
        gsap.to(blob, {
          y: i % 2 === 0 ? -50 : 50,
          x: i % 2 === 0 ? 30 : -30,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const experiences = [
    {
      company: 'Valstrand Solutions',
      role: 'Software Developer Intern',
      period: 'Nov 2025 - Current',
      location: 'Remote',
      highlights: [
        {
          title: 'Core Module Ownership',
          description: 'Own and maintain 4+ core modules across the platform, ensuring code quality, scalability, and seamless integration with existing systems.',
          icon: <Building2 className="w-5 h-5 text-orange-400" />,
        },
        {
          title: 'Real Estate Analytics & AI',
          description: 'Built a comprehensive Vancouver real-estate analytics pipeline tracking 10+ key metrics for data-driven investment decisions.',
          icon: <TrendingUp className="w-5 h-5 text-emerald-400" />,
        },
        {
          title: 'RAG System Engineering',
          description: 'Engineered an AI-powered RAG system using Vertex AI that analyzes 300+ pages of strata documents, transforming complex data into actionable insights.',
          icon: <Brain className="w-5 h-5 text-cyan-400" />,
        },
        {
          title: 'Lead Generation Automation',
          description: 'Developed automated lead fetching systems from Craigslist and Reddit, streamlining client acquisition and reducing manual research time by 40%.',
          icon: <Zap className="w-5 h-5 text-purple-400" />,
        },
      ],
    },
  ];

  return (
    <section id="experience" ref={sectionRef} className="relative overflow-hidden py-24 md:py-32">
      {/* Animated background blobs */}
      <div className="blob absolute top-1/4 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="blob absolute bottom-1/4 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <Bounded>
        {/* Section header with word animation */}
        <div ref={headerRef} className="text-center mb-20">
          <h2 className="section-heading">
            <span className="word inline-block text-slate-400">The</span>{' '}
            <span className="word inline-block bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Experience</span>
          </h2>
          <p className="section-subheading mx-auto mt-6">
            Engineering-led development with a focus on AI integration and scalable solutions
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative pl-8 md:pl-12 max-w-4xl mx-auto">
          {/* Animated line with gradient */}
          <div ref={lineRef} className="timeline-line relative">
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-500 via-cyan-400 to-transparent opacity-50 blur-sm" />
          </div>

          {experiences.map((exp, idx) => (
            <div key={idx} className="timeline-item relative pb-20 last:pb-0">
              {/* Animated timeline dot */}
              <div className="timeline-dot top-2 relative z-10" />

              {/* Content card with 3D effect */}
              <div ref={cardRef} className="glass-card p-8 md:p-10 ml-6 relative group">
                {/* Shine effect on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />

                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-4 mb-8 relative z-10">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-emerald-500/10">
                        <Building2 className="w-5 h-5 text-emerald-400" />
                      </div>
                      <span className="text-xl font-bold text-slate-200">{exp.company}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-slate-400">
                      <Calendar className="w-4 h-4" />
                      <span>{exp.period}</span>
                      <span className="text-emerald-400">•</span>
                      <span>{exp.location}</span>
                    </div>
                  </div>
                  <span className="px-4 py-2 text-xs font-mono rounded-full bg-gradient-to-r from-emerald-500/20 to-cyan-400/20 text-emerald-400 border border-emerald-500/30 backdrop-blur-sm">
                    Current
                  </span>
                </div>

                {/* Highlights grid with stagger animation */}
                <div className="space-y-4 relative z-10">
                  {exp.highlights.map((highlight, hIdx) => (
                    <HighlightCard key={hIdx} highlight={highlight} index={hIdx} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Bounded>
    </section>
  );
};

export default Experience;
