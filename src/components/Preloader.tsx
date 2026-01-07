import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const TARGET_TEXT = "Arth Arvind - The Developer you definitely need";
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

const Preloader = ({ onComplete }: PreloaderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const topHalfRef = useRef<HTMLDivElement>(null);
  const bottomHalfRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const [counter, setCounter] = useState(0);
  const [phase, setPhase] = useState<'counting' | 'scramble' | 'split'>('counting');
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Counter animation
      const counterTween = { value: 0 };
      
      gsap.to(counterTween, {
        value: 100,
        duration: 1.8,
        ease: 'power2.inOut',
        onUpdate: () => {
          setCounter(Math.floor(counterTween.value));
        },
        onComplete: () => {
          // Fade out counter
          gsap.to(textRef.current, {
            opacity: 0,
            scale: 0.8,
            duration: 0.5,
            ease: 'power2.in',
            onComplete: () => {
              setPhase('scramble');
            }
          });
        }
      });

      // Subtle pulsing animation for the counter
      gsap.to(counterRef.current, {
        scale: 1.02,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Text scramble effect
  useEffect(() => {
    if (phase !== 'scramble') return;

    let frame = 0;
    const totalFrames = 60; // Duration of scramble in frames
    const revealSpeed = TARGET_TEXT.length / totalFrames;
    let revealedCount = 0;

    const scrambleInterval = setInterval(() => {
      frame++;
      revealedCount = Math.min(Math.floor(frame * revealSpeed * 1.5), TARGET_TEXT.length);
      
      let result = '';
      for (let i = 0; i < TARGET_TEXT.length; i++) {
        if (TARGET_TEXT[i] === ' ') {
          result += ' ';
        } else if (i < revealedCount) {
          result += TARGET_TEXT[i];
        } else {
          result += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }
      setDisplayText(result);

      if (revealedCount >= TARGET_TEXT.length) {
        clearInterval(scrambleInterval);
        setDisplayText(TARGET_TEXT);
        
        // Hold for a moment then split
        setTimeout(() => {
          setPhase('split');
        }, 800);
      }
    }, 40);

    // Initial scrambled text
    setDisplayText(Array.from(TARGET_TEXT).map(c => c === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)]).join(''));

    // Fade in the tagline
    gsap.fromTo(taglineRef.current, 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
    );

    return () => clearInterval(scrambleInterval);
  }, [phase]);

  // Split animation
  useEffect(() => {
    if (phase !== 'split') return;

    const splitTimeline = gsap.timeline({
      onComplete: () => {
        gsap.set(containerRef.current, { visibility: 'hidden' });
        onComplete();
      }
    });

    splitTimeline
      .to(taglineRef.current, {
        scale: 1.1,
        duration: 0.3,
        ease: 'power2.in',
      })
      .to(topHalfRef.current, {
        yPercent: -100,
        duration: 1.2,
        ease: 'expo.inOut',
      }, '+=0.1')
      .to(bottomHalfRef.current, {
        yPercent: 100,
        duration: 1.2,
        ease: 'expo.inOut',
      }, '<');

  }, [phase, onComplete]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[9999] overflow-hidden"
    >
      {/* Top Half */}
      <div 
        ref={topHalfRef}
        className="absolute top-0 left-0 w-full h-1/2 flex items-end justify-center overflow-hidden"
        style={{ 
          background: 'linear-gradient(180deg, hsl(175 80% 50%) 0%, hsl(175 80% 40%) 100%)',
        }}
      >
        {/* Counter - only visible during counting phase */}
        {phase === 'counting' && (
          <div 
            ref={textRef}
            className="absolute bottom-0 left-0 right-0 flex items-center justify-center pb-4"
          >
            <span 
              ref={counterRef}
              className="text-[20vw] md:text-[15vw] font-bold leading-none tracking-tighter select-none"
              style={{ 
                color: 'hsl(220 20% 4%)',
                fontFamily: 'Space Grotesk, sans-serif',
              }}
            >
              {counter.toString().padStart(3, '0')}
            </span>
          </div>
        )}

        {/* Tagline - visible during scramble and split phases */}
        {(phase === 'scramble' || phase === 'split') && (
          <div 
            ref={taglineRef}
            className="absolute inset-0 flex items-center justify-center px-8"
          >
            <span 
              className="text-[4vw] md:text-[3vw] lg:text-[2.5vw] font-bold leading-tight tracking-tight select-none text-center font-mono"
              style={{ 
                color: 'hsl(220 20% 4%)',
              }}
            >
              {displayText}
            </span>
          </div>
        )}
        
        {/* Decorative text */}
        <div className="absolute top-8 left-8">
          <span 
            className="text-sm font-mono uppercase tracking-widest"
            style={{ color: 'hsl(220 20% 4% / 0.6)' }}
          >
            Loading Experience
          </span>
        </div>
        
        <div className="absolute top-8 right-8">
          <span 
            className="text-sm font-mono uppercase tracking-widest"
            style={{ color: 'hsl(220 20% 4% / 0.6)' }}
          >
            Arth Arvind
          </span>
        </div>
      </div>

      {/* Bottom Half */}
      <div 
        ref={bottomHalfRef}
        className="absolute bottom-0 left-0 w-full h-1/2 flex items-start justify-center overflow-hidden"
        style={{ 
          background: 'linear-gradient(0deg, hsl(175 80% 50%) 0%, hsl(175 80% 40%) 100%)',
        }}
      >
        {/* Mirror of the counter (clipped) - only during counting */}
        {phase === 'counting' && (
          <div className="absolute top-0 left-0 right-0 flex items-center justify-center pt-4">
            <span 
              className="text-[20vw] md:text-[15vw] font-bold leading-none tracking-tighter select-none opacity-30"
              style={{ 
                color: 'hsl(220 20% 4%)',
                fontFamily: 'Space Grotesk, sans-serif',
                transform: 'scaleY(-1)',
              }}
            >
              {counter.toString().padStart(3, '0')}
            </span>
          </div>
        )}

        {/* Mirror of tagline - during scramble and split */}
        {(phase === 'scramble' || phase === 'split') && (
          <div className="absolute inset-0 flex items-center justify-center px-8">
            <span 
              className="text-[4vw] md:text-[3vw] lg:text-[2.5vw] font-bold leading-tight tracking-tight select-none text-center font-mono opacity-30"
              style={{ 
                color: 'hsl(220 20% 4%)',
                transform: 'scaleY(-1)',
              }}
            >
              {displayText}
            </span>
          </div>
        )}
        
        {/* Bottom decorative elements */}
        <div className="absolute bottom-8 left-8">
          <span 
            className="text-sm font-mono uppercase tracking-widest"
            style={{ color: 'hsl(220 20% 4% / 0.6)' }}
          >
            Portfolio 2026
          </span>
        </div>
        
        <div className="absolute bottom-8 right-8">
          <span 
            className="text-sm font-mono uppercase tracking-widest"
            style={{ color: 'hsl(220 20% 4% / 0.6)' }}
          >
            Fullstack • AI
          </span>
        </div>
      </div>

      {/* Center line */}
      <div 
        className="absolute top-1/2 left-0 right-0 h-px -translate-y-1/2"
        style={{ background: 'hsl(220 20% 4% / 0.2)' }}
      />

      {/* Animated progress bar - only during counting */}
      {phase === 'counting' && (
        <div 
          className="absolute top-1/2 left-0 h-1 -translate-y-1/2 z-10"
          style={{ 
            width: `${counter}%`,
            background: 'hsl(220 20% 4%)',
            transition: 'width 0.1s ease-out',
          }}
        />
      )}
    </div>
  );
};

export default Preloader;
