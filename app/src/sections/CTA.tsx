"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Card reveal animation
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 80, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="cta"
      className="relative w-full py-24 lg:py-32 bg-brand-dark overflow-hidden"
      dir="rtl"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Kinetic Typography Background */}
        <div className="absolute inset-0 flex flex-col justify-center overflow-hidden opacity-10 pointer-events-none">
          <div
            ref={text1Ref}
            className="whitespace-nowrap text-[15vw] font-bold text-white/20 animate-marquee"
          >
            mbuy • ذكاء اصطناعي • أمن سيبراني • برمجة • mbuy • ذكاء اصطناعي • أمن سيبراني • برمجة •
          </div>
          <div
            ref={text2Ref}
            className="whitespace-nowrap text-[15vw] font-bold text-white/20 animate-marquee-reverse mt-4"
          >
            ابتكار • تقنية • مستقبل • تطوير • ابتكار • تقنية • مستقبل • تطوير •
          </div>
        </div>

        {/* Gradient Orbs */}
        <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-brand-blue/20 rounded-full blur-[150px] -translate-y-1/2" />
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-brand-orange/20 rounded-full blur-[120px] -translate-y-1/2" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 grid-pattern opacity-20" />
      </div>

      <div className="relative z-10 px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-[1600px] mx-auto flex items-center justify-center min-h-[60vh]">
          {/* CTA Card */}
          <div
            ref={cardRef}
            className="relative w-full max-w-2xl p-8 md:p-12 rounded-3xl glass-strong text-center"
          >
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-brand-blue rounded-tr-lg" />
            <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-brand-orange rounded-tl-lg" />
            <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-brand-orange rounded-br-lg" />
            <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-brand-blue rounded-bl-lg" />

            {/* Icon */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-blue to-brand-orange flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-white" />
            </div>

            {/* Content */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              جاهز لـ <span className="gradient-text">التحول الرقمي؟</span>
            </h2>
            <p className="text-white/60 text-lg mb-8 max-w-lg mx-auto">
              دعنا نساعدك في بناء حلول تقنية متقدمة. سواء كنت بحاجة إلى ذكاء اصطناعي 
              أو أمن سيبراني أو تطوير برمجي، mbuy هنا لخدمتك.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={scrollToContact}
                className="bg-brand-blue hover:bg-brand-blue/90 text-white px-8 py-6 text-base font-medium rounded-xl transition-all duration-300 hover:shadow-glow group"
              >
                ابدأ مشروعك
                <ArrowLeft className="mr-2 w-5 h-5 transition-transform group-hover:-translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => window.open('mailto:hello@mbuy.tech', '_blank')}
                className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-base font-medium rounded-xl transition-all duration-300"
              >
                راسلنا عبر البريد
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-10 pt-8 border-t border-white/10">
              <p className="text-white/40 text-sm mb-4">موثوق به من قادة الصناعة</p>
              <div className="flex justify-center gap-8 opacity-50">
                {['Google', 'Microsoft', 'Amazon', 'Meta'].map((company) => (
                  <span key={company} className="text-white/60 font-medium">
                    {company}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
