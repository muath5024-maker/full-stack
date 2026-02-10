"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight, ChevronLeft } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  {
    src: '/hero-ai-system.jpg',
    title: 'الذكاء الاصطناعي',
    description: 'شبكات عصبية متقدمة وتعلم آلي',
  },
  {
    src: '/about-security.jpg',
    title: 'الأمن السيبراني',
    description: 'حماية البنية التحتية الرقمية',
  },
  {
    src: '/about-cloud.jpg',
    title: 'الحوسبة السحابية',
    description: 'بنية تحتية موزعة وقابلة للتوسع',
  },
  {
    src: '/about-coding.jpg',
    title: 'التطوير البرمجي',
    description: 'برمجة متخصصة بأحدث التقنيات',
  },
  {
    src: '/gallery-ml.jpg',
    title: 'التعلم الآلي',
    description: 'نماذج ذكية للتحليل التنبؤي',
  },
  {
    src: '/gallery-blockchain.jpg',
    title: 'البلوكتشين',
    description: 'تقنية سلسلة الكتل المؤمنة',
  },
  {
    src: '/gallery-api.jpg',
    title: 'تكامل الأنظمة',
    description: 'ربط الخدمات عبر واجهات API',
  },
  {
    src: '/gallery-database.jpg',
    title: 'إدارة البيانات',
    description: 'حلول Big Data وقواعد البيانات',
  },
];

const Gallery = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragOffset = useRef(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    dragStartX.current = 'touches' in e ? e.touches[0].clientX : e.clientX;
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    dragOffset.current = currentX - dragStartX.current;
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    if (dragOffset.current > 50) {
      handleNext();
    } else if (dragOffset.current < -50) {
      handlePrev();
    }
    dragOffset.current = 0;
  };

  const getCardStyle = (index: number) => {
    const diff = index - currentIndex;
    const normalizedDiff = ((diff + galleryImages.length) % galleryImages.length);
    const adjustedDiff = normalizedDiff > galleryImages.length / 2 
      ? normalizedDiff - galleryImages.length 
      : normalizedDiff;

    const rotateY = adjustedDiff * -45;
    const translateZ = Math.abs(adjustedDiff) * -200;
    const translateX = adjustedDiff * -300;
    const opacity = Math.abs(adjustedDiff) > 2 ? 0 : 1 - Math.abs(adjustedDiff) * 0.3;
    const scale = 1 - Math.abs(adjustedDiff) * 0.15;

    return {
      transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
      opacity,
      zIndex: 10 - Math.abs(adjustedDiff),
    };
  };

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative w-full py-24 lg:py-32 bg-brand-dark overflow-hidden"
      dir="rtl"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-blue/10 rounded-full blur-[200px]" />
        <div className="absolute inset-0 dot-pattern opacity-20" />
      </div>

      <div className="relative z-10">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16 px-6">
          <span className="inline-block px-4 py-2 rounded-full glass text-sm text-brand-blue mb-4">
            المعرض
          </span>
          <h2 className="text-responsive-section font-bold text-white mb-4">
            تقنياتنا <span className="gradient-text">المتقدمة</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            استكشف مجموعة من تقنياتنا وحلولنا في مجال الذكاء الاصطناعي والأمن السيبراني والبرمجة.
          </p>
        </div>

        {/* 3D Carousel */}
        <div 
          ref={carouselRef}
          className="relative h-[500px] flex items-center justify-center"
          style={{ perspective: '1200px' }}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          <div 
            className="relative w-full h-full flex items-center justify-center"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="absolute w-[300px] md:w-[400px] h-[350px] md:h-[450px] cursor-grab active:cursor-grabbing transition-all duration-500 ease-out"
                style={getCardStyle(index)}
                onClick={() => setCurrentIndex(index)}
              >
                <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 group">
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-60" />
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-white mb-1">{image.title}</h3>
                    <p className="text-white/60 text-sm">{image.description}</p>
                  </div>

                  {/* Active Indicator */}
                  {index === currentIndex && (
                    <div className="absolute inset-0 border-2 border-brand-blue rounded-2xl pointer-events-none" />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={handleNext}
            className="absolute right-4 md:right-8 z-20 w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <button
            onClick={handlePrev}
            className="absolute left-4 md:left-8 z-20 w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {galleryImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'w-8 bg-brand-blue'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
