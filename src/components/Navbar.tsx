"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Link from 'next/link';

interface NavbarProps {
  startAnimation?: boolean;
}

const Navbar = ({ startAnimation = false }: NavbarProps) => {
  const navbarRef = useRef<HTMLElement>(null);
  const leftHalfRef = useRef<HTMLDivElement>(null);
  const rightHalfRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  const navItems = [
    { href: '#about', label: 'About' },
    { href: '#experience', label: 'Experience' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
  ];

  useEffect(() => {
    if (!startAnimation) return;

    const ctx = gsap.context(() => {
      // Split animation - navbar opens from middle synchronized with hero
      const timeline = gsap.timeline({ delay: 0 });

      timeline
        .set([leftHalfRef.current, rightHalfRef.current], {
          scaleX: 0,
        })
        .to([leftHalfRef.current, rightHalfRef.current], {
          scaleX: 1,
          duration: 1,
          ease: 'elastic.out(1,0.3)',
        })
        .fromTo(
          navItemsRef.current,
          {
            opacity: 0,
            y: -20,
            scale: 0.8,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'back.out(1.7)',
          },
          '-=0.4'
        );
    }, navbarRef);

    return () => ctx.revert();
  }, [startAnimation]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav
      ref={navbarRef}
      className="fixed top-6 z-50"
      style={{ 
        opacity: startAnimation ? 1 : 0,
        left: '14px',
        right: '14px',
      }}
    >
      <div className="relative">
        {/* Glass effect container - full width with rounded edges */}
        <div className="relative overflow-hidden rounded-2xl">
          {/* Left half for split animation */}
          <div
            ref={leftHalfRef}
            className="apple-glass absolute inset-0 rounded-2xl origin-left"
          />

          {/* Right half for split animation */}
          <div
            ref={rightHalfRef}
            className="apple-glass absolute inset-0 rounded-2xl origin-right"
          />

          {/* Nav items container */}
          <div className="relative flex items-center justify-center gap-1 px-8 py-4">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                ref={(el) => (navItemsRef.current[index] = el)}
                onClick={(e) => handleNavClick(e, item.href)}
                className="px-6 py-2.5 rounded-xl text-sm md:text-base font-medium transition-all duration-300 relative group text-slate-100 hover:text-white"
              >
                {/* Hover background */}
                <span
                  className="absolute inset-0 rounded-xl transition-all duration-300 opacity-0 group-hover:opacity-100"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                  }}
                />
                
                <span className="relative z-10">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
