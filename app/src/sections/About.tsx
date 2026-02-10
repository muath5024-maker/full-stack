"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Cloud, Code } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface AboutCardProps {
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
  index: number;
}

const AboutCard = ({ title, description, image, icon, index }: AboutCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const ctx = gsap.context(() => {
      // Scroll reveal animation
      gsap.fromTo(
        card,
        { opacity: 0, y: 80, rotateX: 15 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          delay: index * 0.15,
        }
      );
    }, card);

    return () => ctx.revert();
  }, [index]);

  // 3D tilt effect on hover
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative"
      style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
    >
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-white/5 to-white/[0.02] border border-white/10 transition-all duration-500 hover:border-brand-blue/30 hover:shadow-glow">
        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/50 to-transparent" />
          
          {/* Icon Badge */}
          <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-brand-blue/20 backdrop-blur-sm flex items-center justify-center border border-brand-blue/30">
            {icon}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-blue transition-colors">
            {title}
          </h3>
          <p className="text-white/60 text-sm leading-relaxed">
            {description}
          </p>
        </div>

        {/* Hover Glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/10 to-transparent" />
        </div>
      </div>
    </div>
  );
};

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const cards = [
    {
      title: 'الأمن السيبراني',
      description: 'حماية أنظمتك وبياناتك بأحدث تقنيات الأمان. نوفر جدران نارية متقدمة، تشفير قوي، ورصد مستمر للتهديدات لضمان أمان بنيتك التحتية الرقمية.',
      image: '/about-security.jpg',
      icon: <Shield className="w-6 h-6 text-brand-blue" />,
    },
    {
      title: 'البنية التحتية السحابية',
      description: 'بناء وإدارة بنية تحتية سحابية قوية وقابلة للتوسع. من مراكز البيانات إلى الخدمات السحابية الموزعة، نضمن أداءً عاليًا وتوافرًا مستمرًا.',
      image: '/about-cloud.jpg',
      icon: <Cloud className="w-6 h-6 text-brand-orange" />,
    },
    {
      title: 'التطوير البرمجي',
      description: 'تطوير حلول برمجية مخصصة بأحدث التقنيات. من تطبيقات الويب إلى الأنظمة المعقدة، نقدم كودًا نظيفًا وقابلًا للتطوير يحقق أهدافك.',
      image: '/about-coding.jpg',
      icon: <Code className="w-6 h-6 text-brand-blue" />,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full py-24 lg:py-32 bg-brand-dark overflow-hidden"
      dir="rtl"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-blue/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-[120px]" />
        <div className="absolute inset-0 dot-pattern opacity-30" />
      </div>

      <div className="relative z-10 px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-[1600px] mx-auto">
          {/* Section Header */}
          <div ref={titleRef} className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full glass text-sm text-brand-blue mb-4">
              من نحن
            </span>
            <h2 className="text-responsive-section font-bold text-white mb-4">
              mbuy - شريكك{' '}
              <span className="gradient-text">التقني الموثوق</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg">
              نقدم حلولًا تقنية متكاملة تجمع بين الذكاء الاصطناعي، الأمن السيبراني، 
              والبرمجة المتخصصة لدفع أعمالك نحو النجاح.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {cards.map((card, index) => (
              <AboutCard
                key={card.title}
                {...card}
                index={index}
              />
            ))}
          </div>

          {/* Bottom Stats Row */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '+500', label: 'عميل سعيد' },
              { value: '+1000', label: 'مشروع منجز' },
              { value: '99.9%', label: 'نسبة التوفر' },
              { value: '24/7', label: 'دعم فني' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="text-center p-6 rounded-xl glass hover:border-brand-blue/30 transition-colors"
              >
                <div className="text-2xl lg:text-3xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-white/50 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
