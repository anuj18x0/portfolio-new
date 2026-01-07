"use client";

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, X, Sparkles } from 'lucide-react';
import Bounded from '@/components/Bounded';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  problem?: string;
  solution?: string;
  role?: string;
  challenges?: string;
  impact?: string;
  tech: string[];
  image: string;
  github?: string;
  live?: string;
  category: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: '3D Talking Avatar Therapist',
    description: 'Real-time voice-driven therapeutic conversations through a 3D avatar',
    longDescription: 'Architected a full-stack platform enabling real-time, voice-driven therapeutic conversations through a 3D avatar. Engineered backend services for speech recognition, TTS, and AI responses, integrating Google Gemini for structured dialogue, facial expressions, and animations.',
    problem: 'Mental health support often lacks accessibility and engagement. Traditional therapy faces barriers like cost, stigma, and limited availability.',
    solution: 'Created an AI-powered 3D avatar that conducts empathetic conversations, making therapy more accessible and engaging through voice interaction and realistic animations.',
    role: 'Full-stack Developer & AI Engineer - Led end-to-end development from architecture design to deployment.',
    challenges: 'Synchronized real-time speech processing with 3D animations while maintaining low latency (<2s response time). Integrated multiple AI services (speech recognition, NLP, TTS) seamlessly.',
    impact: '90% user satisfaction rate, <2s average response time, processed 1000+ conversations successfully.',
    tech: ['Python', 'Socket.IO', 'Google Cloud', 'React', 'Three.js', 'XGBoost'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
    live: '/avatar-demo',
    category: 'AI/ML',
  },
  {problem: 'Business analysis requires hours of manual research across multiple sources, delaying critical decision-making.',
    solution: 'Built a multi-agent AI system that orchestrates specialized AI agents to gather, analyze, and synthesize business intelligence in real-time.',
    role: 'Lead Developer - Architected the multi-agent system, implemented WebSocket communication, and designed the real-time dashboard.',
    challenges: 'Coordinating multiple AI agents simultaneously while managing API rate limits and ensuring data accuracy. Implemented robust error handling for agent failures.',
    impact: 'Reduced analysis time from 4-6 hours to 20 minutes (90% reduction), processed 100+ business analyses with 95% accuracy.',
    
    id: 2,
    title: 'AI Business Analysis Platform',
    description: 'Multi-agent system for real-time business insights',
    longDescription: 'Developed a full-stack AI application delivering real-time business analysis and strategic insights through a multi-agent system using CrewAI framework with Gemini 2.5 Pro API. Reduced analysis time by 90% compared to manual research.',
    tech: ['Next.js', 'FastAPI', 'WebSockets', 'CrewAI', 'Matplotlib'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    live: '/ai-agent-demo',
    category: 'AI/ML',
  },
  {
    id: 3,
    title: 'IPL Analysis with ML',
    description: 'Predictive analytics for cricket matches',
    longDescription: 'Built an interactive Streamlit dashboard to analyze IPL datasets and visualize match trends. Improved performance by raising score prediction R² from 0.69 → 0.80 and win prediction accuracy from 65% → 78% through hyperparameter tuning.',
    tech: ['Streamlit', 'Pandas', 'NumPy', 'Scikit-learn'],
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600&h=400&fit=crop',
    live: 'https://ipl-analysis-and-predictions.onrender.com/',
    category: 'Data Science',
  },
  {
    id: 4,
    title: 'AI Screen Assistant',
    description: '90% text recognition accuracy with intelligent analysis',
    longDescription: 'Built a desktop application achieving 90% text recognition accuracy through OCR, processing over 1000+ tests with an average response time of <10 seconds. Integrated Google\'s Generative AI for intelligent text analysis.',
    tech: ['Electron', 'React', 'Tesseract.js', 'Google Gen AI'],
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop',
    category: 'Desktop',
  },
  
  {
    id: 5,
    title: 'Vital Verse',
    description: 'Blood donation & healthcare platform with AI forecasting',
    longDescription: 'Developed a comprehensive platform featuring a Health Karma dashboard and live SOS alerts for urgent blood requests. Improved hospital response efficiency by reducing blood request-to-fulfillment time by ~60% through real-time alerts and smart inventory tracking.',
    tech: ['React', 'Vite', 'FastAPI', 'MongoDB', 'Scikit-learn'],
    image: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=600&h=400&fit=crop',
    category: 'Healthcare',
  },
  {
    id: 6,
    title: 'PayNexa',
    description: 'Smart attendance and payroll with facial recognition',
    longDescription: 'Engineered a smart attendance and payroll platform automating employee attendance, payroll, and leave workflows. Implemented a facial recognition module for automated and secure attendance tracking, reducing manual HR effort by ~70%.',
    tech: ['React.js', 'Python', 'MongoDB', 'Facial Recognition'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    category: 'Enterprise',
  },
];

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: () => void;
}

const ProjectCard = ({ project, index, onClick }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered entrance animation
      gsap.fromTo(
        cardRef.current,
        {
          opacity: 0,
          y: 80,
          rotationX: 15,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          scale: 1,
          duration: 1,
          delay: index * 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
          },
        }
      );

      // Tech tags animation
      const tags = cardRef.current?.querySelectorAll('.tech-tag');
      tags?.forEach((tag, i) => {
        gsap.fromTo(
          tag,
          {
            opacity: 0,
            scale: 0,
            rotation: -180,
          },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.5,
            delay: index * 0.15 + 0.5 + i * 0.1,
            ease: 'back.out(1.7)',
          }
        );
      });
    });

    return () => ctx.revert();
  }, [index]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;

    setTilt({ x: rotateX, y: rotateY });
    setMousePosition({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });

    // Magnetic effect
    gsap.to(card, {
      x: (x - centerX) * 0.1,
      y: (y - centerY) * 0.1,
      duration: 0.3,
      ease: 'power2.out',
    });

    // Image parallax
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        x: (x - centerX) * 0.2,
        y: (y - centerY) * 0.2,
        scale: 1.1,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;

    setTilt({ x: 0, y: 0 });
    setMousePosition({ x: 50, y: 50 });

    gsap.to(cardRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'power2.out',
    });

    if (imageRef.current) {
      gsap.to(imageRef.current, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  };

  return (
    <div
      ref={cardRef}
      className="group relative cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transformStyle: 'preserve-3d',
      }}
    >
      <div className="glass-card overflow-hidden h-full transform-gpu relative">
        {/* Animated gradient overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(251, 113, 133, 0.2) 0%, transparent 70%)`,
          }}
        />

        {/* Image with parallax */}
        <div className="relative h-48 overflow-hidden">
          <img
            ref={imageRef}
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent z-10" />
          
          {/* Category badge with animation */}
          <span className="absolute top-4 left-4 tech-tag z-20 transform group-hover:scale-110 transition-transform">
            {project.category}
          </span>

          {/* Sparkle effect on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
            <Sparkles className="absolute top-4 right-4 w-6 h-6 text-rose-400 animate-pulse" />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 relative z-10">
          <h3 className="text-xl font-bold text-slate-200 mb-2 group-hover:text-rose-400 transition-colors transform group-hover:translate-x-1 transition-transform">
            {project.title}
          </h3>
          <p className="text-slate-400 text-sm mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Tech stack with stagger */}
          <div className="flex flex-wrap gap-2">
            {project.tech.slice(0, 3).map((tech) => (
              <span key={tech} className="tech-tag text-xs">
                {tech}
              </span>
            ))}
            {project.tech.length > 3 && (
              <span className="tech-tag text-xs">+{project.tech.length - 3}</span>
            )}
          </div>
        </div>

        {/* Shine effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-rose-500/20 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
        </div>
      </div>
    </div>
  );
};

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const techRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [project]);

  const handleClose = () => {
    onClose();
  };

  if (!project || !mounted) return null;

  const modalContent = (
    <div
      ref={modalRef}
      className="fixed inset-0 flex items-center justify-center p-4"
      onClick={handleClose}
      style={{ 
        zIndex: 99999,
        backgroundColor: 'rgba(2, 6, 23, 0.95)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <div
        ref={contentRef}
        className="bg-slate-900 border border-slate-700 rounded-2xl max-w-3xl w-full relative shadow-2xl animate-fade-in"
        onClick={(e) => e.stopPropagation()}
        style={{ 
          maxHeight: 'calc(100vh - 2rem)',
          overflowY: 'auto',
        }}
      >
        {/* Header image */}
        <div className="relative h-72 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent" />
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 transition-all hover:scale-110 text-slate-200 backdrop-blur-sm"
          >
            <X className="w-5 h-5" />
          </button>
          <span className="absolute top-4 left-4 tech-tag">{project.category}</span>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-rose-400 to-orange-400 bg-clip-text text-transparent mb-4">
            {project.title}
          </h2>
          
          {/* Overview */}
          <p className="text-slate-400 mb-6 leading-relaxed text-base md:text-lg">
            {project.longDescription}
          </p>

          {/* Case Study Sections */}
          {project.problem && (
            <div className="mb-6 p-4 md:p-5 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <h4 className="text-sm font-semibold text-rose-400 mb-2 uppercase tracking-wider flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Problem
              </h4>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed">{project.problem}</p>
            </div>
          )}

          {project.solution && (
            <div className="mb-6 p-4 md:p-5 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <h4 className="text-sm font-semibold text-emerald-400 mb-2 uppercase tracking-wider flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Solution
              </h4>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed">{project.solution}</p>
            </div>
          )}

          {project.role && (
            <div className="mb-6 p-4 md:p-5 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <h4 className="text-sm font-semibold text-cyan-400 mb-2 uppercase tracking-wider flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                My Role
              </h4>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed">{project.role}</p>
            </div>
          )}

          {project.challenges && (
            <div className="mb-6 p-4 md:p-5 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <h4 className="text-sm font-semibold text-purple-400 mb-2 uppercase tracking-wider flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Challenges
              </h4>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed">{project.challenges}</p>
            </div>
          )}

          {project.impact && (
            <div className="mb-6 p-4 md:p-5 rounded-xl bg-gradient-to-br from-rose-900/30 to-orange-900/30 border border-rose-500/30">
              <h4 className="text-sm font-semibold text-orange-400 mb-2 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Impact & Results
              </h4>
              <p className="text-slate-200 text-sm md:text-base font-medium leading-relaxed">{project.impact}</p>
            </div>
          )}

          {/* Tech stack */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-slate-200 mb-4 uppercase tracking-wider flex items-center gap-2">
              <svg className="w-4 h-4 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-3">
              {project.tech.map((tech, i) => (
                <span
                  key={tech}
                  ref={(el) => (techRefs.current[i] = el)}
                  className="tech-tag text-sm px-4 py-2"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-4">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg glass-card hover:bg-rose-500/10 transition-all hover:scale-105 text-slate-200 group"
              >
                <Github className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                View Code
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-tr from-rose-500 via-orange-400 to-rose-500 text-white hover:opacity-90 transition-all hover:scale-105 font-medium group"
              >
                <ExternalLink className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animated header
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

      // Parallax background
      const bg = sectionRef.current?.querySelector('.parallax-bg');
      if (bg) {
        gsap.to(bg, {
          y: -100,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
      {/* Parallax background */}
      <div className="parallax-bg absolute inset-0 bg-gradient-to-b from-transparent via-slate-800/20 to-transparent" />

      <Bounded>
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 md:mb-20">
          <h2 className="section-heading">
            <span className="word inline-block text-slate-400">Featured</span>{' '}
            <span className="word inline-block bg-gradient-to-r from-rose-400 to-orange-400 bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="section-subheading mx-auto mt-6">
            A showcase of AI-powered applications and full-stack solutions
          </p>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </Bounded>

      {/* Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default Projects;
