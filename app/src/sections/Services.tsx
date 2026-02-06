import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Brain, 
  ShoppingCart, 
  Code2, 
  BarChart3, 
  Users, 
  Zap,
  ArrowUpLeft
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  index: number;
}

const ServiceCard = ({ title, description, icon, features, index }: ServiceCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
          delay: index * 0.1,
        }
      );
    }, card);

    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="group relative p-6 lg:p-8 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 hover:border-brand-blue/40 transition-all duration-500 hover:-translate-y-2"
    >
      {/* Icon */}
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-brand-blue/20 to-brand-blue/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-blue transition-colors">
        {title}
      </h3>
      <p className="text-white/60 text-sm mb-6 leading-relaxed">
        {description}
      </p>

      {/* Features List */}
      <ul className="space-y-2">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2 text-sm text-white/50">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
            {feature}
          </li>
        ))}
      </ul>

      {/* Hover Arrow */}
      <div className="absolute top-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity">
        <ArrowUpLeft className="w-5 h-5 text-brand-blue" />
      </div>

      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 to-transparent rounded-2xl" />
      </div>
    </div>
  );
};

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      title: 'استراتيجية الذكاء الاصطناعي والتنفيذ',
      description: 'الاستفادة من الذكاء الاصطناعي لتحويل العمليات التجارية وإنشاء حلول الأتمتة الذكية.',
      icon: <Brain className="w-7 h-7 text-brand-blue" />,
      features: [
        'تكامل التعلم الآلي',
        'التحليلات التنبؤية',
        'معالجة اللغة الطبيعية',
        'حلول الرؤية الحاسوبية',
      ],
    },
    {
      title: 'تطوير منصات السوق',
      description: 'بناء منصات متعددة البائعين قابلة للتطوير تربط بين المشترين والبائعين بتجارب سلسة.',
      icon: <ShoppingCart className="w-7 h-7 text-brand-orange" />,
      features: [
        'أنظمة إدارة البائعين',
        'تكامل الدفع',
        'إدارة المخزون',
        'تنفيذ الطلبات',
      ],
    },
    {
      title: 'تطوير Full-Stack',
      description: 'خدمات تطوير شاملة من واجهات المستخدم إلى البنية التحتية الخلفية القوية.',
      icon: <Code2 className="w-7 h-7 text-brand-blue" />,
      features: [
        'تطبيقات React و Next.js',
        'واجهات Node.js و Python',
        'البنية التحتية السحابية',
        'هندسة الخدمات المصغرة',
      ],
    },
    {
      title: 'تحليلات البيانات والرؤى',
      description: 'تحويل البيانات الخام إلى رؤى قابلة للتنفيذ التي تدفع قرارات العمل والنمو.',
      icon: <BarChart3 className="w-7 h-7 text-brand-orange" />,
      features: [
        'ذكاء الأعمال',
        'لوحات المعلومات في الوقت الفعلي',
        'تحليل سلوك المستخدم',
        'مؤشرات الأداء',
      ],
    },
    {
      title: 'قيادة الفريق',
      description: 'بناء وقيادة فرق هندسية عالية الأداء تقدم نتائج استثنائية.',
      icon: <Users className="w-7 h-7 text-brand-blue" />,
      features: [
        'بناء الفريق التقني',
        'المنهجيات الرشيقة',
        'الإرشاد والنمو',
        'التعاون متعدد الوظائف',
      ],
    },
    {
      title: 'تحسين المنصة',
      description: 'تعزيز أداء المنصة وقابلية التوسع وتجربة المستخدم لتحقيق أقصى تأثير.',
      icon: <Zap className="w-7 h-7 text-brand-orange" />,
      features: [
        'ضبط الأداء',
        'موازنة الحمل',
        'استراتيجيات التخزين المؤقت',
        'تحسين محركات البحث',
      ],
    },
  ];

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

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full py-24 lg:py-32 bg-brand-dark overflow-hidden"
      dir="rtl"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-brand-blue/10 rounded-full blur-[150px] -translate-y-1/2" />
        <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-brand-orange/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 grid-pattern opacity-20" />
      </div>

      <div className="relative z-10 px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-[1600px] mx-auto">
          {/* Section Header */}
          <div ref={titleRef} className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full glass text-sm text-brand-orange mb-4">
              الخدمات والخبرات
            </span>
            <h2 className="text-responsive-section font-bold text-white mb-4">
              ما <span className="gradient-text">أقدمه</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg">
              مجموعة شاملة من المهارات والخدمات التي تشمل تقنية الذكاء الاصطناعي، 
              تطوير منصات السوق، والتحول الرقمي.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <ServiceCard key={service.title} {...service} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
