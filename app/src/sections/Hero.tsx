"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, Sparkles, Cpu, Shield, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set([titleRef.current, subtitleRef.current, buttonRef.current], {
        opacity: 0,
        y: 50,
      });
      gsap.set(imageRef.current, {
        opacity: 0,
        scale: 1.1,
        x: 50,
      });
      gsap.set(decorRef.current?.children || [], {
        opacity: 0,
        scale: 0,
      });

      // Animation timeline
      const tl = gsap.timeline({ delay: 0.3 });

      tl.to(imageRef.current, {
        opacity: 1,
        scale: 1,
        x: 0,
        duration: 1.2,
        ease: 'expo.out',
      })
      .to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'expo.out',
      }, '-=0.8')
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'expo.out',
      }, '-=0.6')
      .to(buttonRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'back.out(1.7)',
      }, '-=0.4')
      .to(decorRef.current?.children || [], {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'back.out(1.7)',
      }, '-=0.4');

      // Continuous floating animation for decorations
      gsap.to(decorRef.current?.children || [], {
        y: '+=15',
        duration: 2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: {
          each: 0.2,
          from: 'random',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!imageRef.current || !decorRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xPercent = (clientX / innerWidth - 0.5) * 2;
      const yPercent = (clientY / innerHeight - 0.5) * 2;

      gsap.to(imageRef.current, {
        rotateY: xPercent * 3,
        rotateX: -yPercent * 3,
        duration: 0.5,
        ease: 'power2.out',
      });

      gsap.to(decorRef.current?.children || [], {
        x: xPercent * 20,
        y: yPercent * 20,
        duration: 0.8,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen w-full flex items-center overflow-hidden bg-brand-dark"
      dir="rtl"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-brand-blue/20 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-brand-orange/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 grid-pattern opacity-50" />
        
        {/* Noise Overlay */}
        <div className="absolute inset-0 noise-overlay" />
      </div>

      {/* Decorative Elements */}
      <div ref={decorRef} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[15%] right-[10%] w-3 h-3 bg-brand-blue rounded-full" />
        <div className="absolute top-[25%] left-[15%] w-2 h-2 bg-brand-orange rounded-full" />
        <div className="absolute bottom-[20%] right-[20%] w-4 h-4 border border-brand-blue/30 rounded-full" />
        <div className="absolute top-[40%] right-[5%] w-20 h-px bg-gradient-to-l from-brand-blue/50 to-transparent" />
        <div className="absolute bottom-[30%] left-[10%] w-px h-20 bg-gradient-to-b from-brand-orange/50 to-transparent" />
        <Sparkles className="absolute top-[20%] left-[25%] w-5 h-5 text-brand-blue/40" />
      </div>

      <div className="relative z-10 w-full px-6 sm:px-8 lg:px-16 xl:px-24 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center max-w-[1600px] mx-auto">
          {/* Content */}
          <div className="order-2 lg:order-1 text-center lg:text-right">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <Sparkles className="w-4 h-4 text-brand-blue" />
              <span className="text-sm text-white/80">mbuy - حلول تقنية متكاملة</span>
            </div>

            <h1
              ref={titleRef}
              className="text-responsive-hero font-bold text-white mb-6 leading-tight"
            >
              نبني{' '}
              <span className="gradient-text">المستقبل</span>
              <br />
              بـ{' '}
              <span className="gradient-text">الذكاء الاصطناعي</span>
            </h1>

            <p
              ref={subtitleRef}
              className="text-lg sm:text-xl text-white/70 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              mbuy هي منصة تقنية متقدمة تقدم حلول الذكاء الاصطناعي، 
              الأمن السيبراني، والبرمجة المتخصصة لتطوير أعمالك.
            </p>

            <div ref={buttonRef} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                onClick={() => scrollToSection('portfolio')}
                className="bg-brand-blue hover:bg-brand-blue/90 text-white px-8 py-6 text-base font-medium rounded-xl transition-all duration-300 hover:shadow-glow hover:scale-105 group"
              >
                اكتشف خدماتنا
                <ArrowRight className="mr-2 w-5 h-5 transition-transform group-hover:-translate-x-1 rotate-180" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection('contact')}
                className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-base font-medium rounded-xl transition-all duration-300"
              >
                تواصل معنا
              </Button>
            </div>

            {/* Service Icons */}
            <div className="flex justify-center lg:justify-start gap-6 mt-12">
              <div className="flex items-center gap-2 text-white/60">
                <div className="w-10 h-10 rounded-lg bg-brand-blue/20 flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-brand-blue" />
                </div>
                <span className="text-sm">ذكاء اصطناعي</span>
              </div>
              <div className="flex items-center gap-2 text-white/60">
                <div className="w-10 h-10 rounded-lg bg-brand-orange/20 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-brand-orange" />
                </div>
                <span className="text-sm">أمن سيبراني</span>
              </div>
              <div className="flex items-center gap-2 text-white/60">
                <div className="w-10 h-10 rounded-lg bg-brand-blue/20 flex items-center justify-center">
                  <Code className="w-5 h-5 text-brand-blue" />
                </div>
                <span className="text-sm">برمجة</span>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-start" style={{ perspective: '1000px' }}>
            <div
              ref={imageRef}
              className="relative w-full max-w-lg lg:max-w-xl"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-bl from-brand-blue/30 to-brand-orange/20 rounded-3xl blur-3xl scale-90" />
              
              {/* Image Container */}
              <div className="relative rounded-3xl overflow-hidden border border-white/10">
                <img
                  src="/hero-ai-system.jpg"
                  alt="نظام ذكاء اصطناعي"
                  className="w-full h-auto object-cover"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-transparent" />
                
                {/* Floating Badge */}
                <div className="absolute bottom-6 right-6 left-6 glass rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-blue/20 flex items-center justify-center">
                      <Cpu className="w-5 h-5 text-brand-blue" />
                    </div>
                    <div>
                      <div className="text-white font-medium">نظام mbuy الذكي</div>
                      <div className="text-white/50 text-sm">حلول تقنية متقدمة</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Ring */}
              <div className="absolute -inset-4 border border-brand-blue/20 rounded-3xl pointer-events-none" />
              <div className="absolute -inset-8 border border-brand-blue/10 rounded-3xl pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
