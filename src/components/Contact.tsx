"use client";

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Linkedin, Github, MapPin, Send, Phone, ExternalLink } from 'lucide-react';
import Bounded from '@/components/Bounded';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState("");

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

      // Socials animation
      if (socialsRef.current) {
        const socialItems = socialsRef.current.querySelectorAll('.social-item');
        gsap.fromTo(
          socialItems,
          { opacity: 0, x: -50, scale: 0.9 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: 'back.out(1.5)',
            scrollTrigger: {
              trigger: socialsRef.current,
              start: 'top 80%',
            },
          }
        );
      }

      // Form animation
      if (formRef.current) {
        const formElements = formRef.current.querySelectorAll('.form-element');
        gsap.fromTo(
          formElements,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: formRef.current,
              start: 'top 80%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const socials = [
    {
      name: 'Email',
      value: 'artharvind18@gmail.com',
      href: 'mailto:artharvind18@gmail.com',
      icon: <Mail className="w-6 h-6" />,
      iconColor: 'text-rose-400',
    },
    {
      name: 'LinkedIn',
      value: '/in/arth-arvind',
      href: 'https://linkedin.com/in/arth-arvind',
      icon: <Linkedin className="w-6 h-6" />,
      iconColor: 'text-blue-400',
    },
    {
      name: 'GitHub',
      value: '/anuj18x0',
      href: 'https://github.com/anuj18x0',
      icon: <Github className="w-6 h-6" />,
      iconColor: 'text-purple-400',
    },
    {
      name: 'Location',
      value: 'India',
      href: null,
      icon: <MapPin className="w-6 h-6" />,
      iconColor: 'text-cyan-400',
    },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult("Sending....");
    
    try {
      const formData = new FormData(e.currentTarget);
      const ACCESS_KEY = process.env.NEXT_PUBLIC_ACCESS_KEY || ""
      formData.append("access_key", ACCESS_KEY);
      
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setResult("Message sent successfully! I'll get back to you soon.");
        setFormData({ name: '', email: '', message: '' });
      } else {
        setResult(data.message || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setResult("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-rose-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -left-40 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />

      <Bounded>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div ref={headerRef} className="text-center mb-16">
            <h2 className="section-heading mb-6">
              <span className="text-slate-400">Let&apos;s</span>{' '}
              <span className="bg-gradient-to-r from-rose-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">Connect</span>
            </h2>
            <p className="section-subheading mx-auto">
              Have a project in mind? Let&apos;s build something amazing together
            </p>
          </div>

          {/* Main content grid */}
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Left side - Socials */}
            <div ref={socialsRef} className="lg:col-span-2 space-y-6">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-slate-200 mb-6">
                  Get in Touch
                </h3>
                <p className="text-slate-400 leading-relaxed mb-8">
                  I&apos;m always open to discussing new projects, creative ideas, or
                  opportunities to be part of your vision. Feel free to reach out!
                </p>
              </div>

              {/* Social links */}
              <div className="space-y-3">
                {socials.map((social) => {
                  const SocialWrapper = social.href ? 'a' : 'div';

                  return (
                    <SocialWrapper
                      key={social.name}
                      href={social.href || undefined}
                      target={social.href?.startsWith('http') ? '_blank' : undefined}
                      rel={social.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className={`social-item group relative block p-4 rounded-xl border border-slate-700/50 bg-slate-900/30 backdrop-blur-sm transition-all duration-300 ${
                        social.href ? 'cursor-pointer hover:border-slate-600 hover:bg-slate-800/50' : ''
                      }`}
                    >
                      <div className="relative flex items-center gap-4">
                        <div className={`${social.iconColor} group-hover:scale-110 transition-transform duration-300`}>
                          {social.icon}
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-slate-500 mb-0.5 uppercase tracking-wider">
                            {social.name}
                          </p>
                          <p className="font-medium text-slate-200 text-sm">
                            {social.value}
                          </p>
                        </div>
                        {social.href && (
                          <ExternalLink className="w-4 h-4 text-slate-500 opacity-0 group-hover:opacity-100 group-hover:text-slate-400 transition-all duration-300" />
                        )}
                      </div>
                    </SocialWrapper>
                  );
                })}
              </div>

              {/* Additional info box */}
              <div className="p-6 rounded-xl bg-gradient-to-br from-slate-900/80 to-slate-800/50 border border-slate-700/50 backdrop-blur-sm">
                <p className="text-sm text-slate-400 leading-relaxed">
                  <span className="text-slate-300 font-semibold">Available for:</span>
                  <br />
                  Full-time opportunities, Freelance projects, Consulting,
                  Open-source collaborations
                </p>
              </div>
            </div>

            {/* Right side - Contact Form */}
            <div className="lg:col-span-3">
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="glass-card p-8 rounded-2xl space-y-6"
              >
                <div className="form-element">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-slate-300 mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all"
                  />
                </div>

                <div className="form-element">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-slate-300 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all"
                  />
                </div>

                <div className="form-element">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-slate-300 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all resize-none"
                    placeholder="Tell me about your project or just say hi..."
                  />
                </div>

                <div className="form-element">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gradient-to-r from-rose-500 via-purple-500 to-cyan-500 text-white hover:opacity-90 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed group flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>

                {result && (
                  <div className={`form-element text-center p-4 rounded-lg ${
                    result.includes("success") 
                      ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400" 
                      : result.includes("Sending")
                      ? "bg-cyan-500/10 border border-cyan-500/30 text-cyan-400"
                      : "bg-rose-500/10 border border-rose-500/30 text-rose-400"
                  }`}>
                    <p className="text-sm font-medium">{result}</p>
                  </div>
                )}

                <p className="form-element text-xs text-slate-500 text-center">
                  I&apos;ll get back to you as soon as possible, usually within 24 hours.
                </p>
              </form>
            </div>
          </div>
        </div>
      </Bounded>
    </section>
  );
};

export default Contact;
