"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Brain, 
  ShoppingCart, 
  Code, 
  Database, 
  Cloud, 
  LineChart,
  Users,
  Lightbulb,
  Workflow
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: { name: string; level: number }[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'الذكاء الاصطناعي',
    icon: <Brain className="w-6 h-6" />,
    skills: [
      { name: 'التعلم الآلي', level: 95 },
      { name: 'التعلم العميق', level: 90 },
      { name: 'معالجة اللغة الطبيعية', level: 88 },
      { name: 'الرؤية الحاسوبية', level: 85 },
      { name: 'TensorFlow/PyTorch', level: 92 },
    ],
  },
  {
    title: 'التجارة الإلكترونية والسوق',
    icon: <ShoppingCart className="w-6 h-6" />,
    skills: [
      { name: 'منصات متعددة البائعين', level: 98 },
      { name: 'أنظمة الدفع', level: 92 },
      { name: 'إدارة المخزون', level: 90 },
      { name: 'تنفيذ الطلبات', level: 88 },
      { name: 'إدراج البائعين', level: 95 },
    ],
  },
  {
    title: 'تطوير الواجهة الأمامية',
    icon: <Code className="w-6 h-6" />,
    skills: [
      { name: 'React/Next.js', level: 96 },
      { name: 'TypeScript', level: 94 },
      { name: 'Tailwind CSS', level: 95 },
      { name: 'تصميم UI/UX', level: 88 },
      { name: 'WebGL/Three.js', level: 82 },
    ],
  },
  {
    title: 'الخلفية وقواعد البيانات',
    icon: <Database className="w-6 h-6" />,
    skills: [
      { name: 'Node.js', level: 94 },
      { name: 'Python/FastAPI', level: 92 },
      { name: 'PostgreSQL', level: 90 },
      { name: 'MongoDB', level: 88 },
      { name: 'GraphQL', level: 85 },
    ],
  },
  {
    title: 'السحابة وDevOps',
    icon: <Cloud className="w-6 h-6" />,
    skills: [
      { name: 'AWS', level: 92 },
      { name: 'Docker/Kubernetes', level: 88 },
      { name: 'خطوط CI/CD', level: 90 },
      { name: 'الخدمات المصغرة', level: 87 },
      { name: 'الخوادم بدون خادم', level: 85 },
    ],
  },
  {
    title: 'البيانات والتحليلات',
    icon: <LineChart className="w-6 h-6" />,
    skills: [
      { name: 'تصور البيانات', level: 92 },
      { name: 'ذكاء الأعمال', level: 90 },
      { name: 'معالجة البيانات الضخمة', level: 85 },
      { name: 'التحليلات التنبؤية', level: 88 },
      { name: 'اختبار A/B', level: 87 },
    ],
  },
];

const softSkills = [
  { icon: <Users className="w-5 h-5" />, title: 'قيادة الفريق', desc: 'بناء فرق عالية الأداء' },
  { icon: <Lightbulb className="w-5 h-5" />, title: 'التفكير الاستراتيجي', desc: 'رؤية طويلة المدى وتخطيط' },
  { icon: <Workflow className="w-5 h-5" />, title: 'الإدارة الرشيقة', desc: 'منهجيات سكروم وكانبان' },
  { icon: <Brain className="w-5 h-5" />, title: 'حل المشكلات', desc: 'حلول تحليلية وإبداعية' },
];

const SkillBar = ({ name, level, delay }: { name: string; level: number; delay: number }) => {
  const barRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fill = fillRef.current;
    if (!fill) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        fill,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: barRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
          delay: delay,
        }
      );
    });

    return () => ctx.revert();
  }, [delay]);

  return (
    <div ref={barRef} className="mb-4">
      <div className="flex justify-between mb-1.5">
        <span className="text-sm text-white/80">{name}</span>
        <span className="text-sm text-brand-blue font-medium">{level}%</span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          ref={fillRef}
          className="h-full rounded-full bg-gradient-to-r from-brand-blue to-brand-orange origin-right"
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  );
};

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);

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

      // Categories stagger animation
      gsap.fromTo(
        '.skill-category',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: categoriesRef.current,
            start: 'top 80%',
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
      id="skills"
      className="relative w-full py-24 lg:py-32 bg-brand-dark overflow-hidden"
      dir="rtl"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-brand-orange/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 grid-pattern opacity-20" />
      </div>

      <div className="relative z-10 px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-[1600px] mx-auto">
          {/* Section Header */}
          <div ref={titleRef} className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full glass text-sm text-brand-orange mb-4">
              المهارات والخبرات
            </span>
            <h2 className="text-responsive-section font-bold text-white mb-4">
              الكفاءة <span className="gradient-text">التقنية</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg">
              مجموعة شاملة من المهارات في مجال الذكاء الاصطناعي والتجارة الإلكترونية وتطوير Full-Stack 
              تم بناؤها على مدى سنوات من الخبرة العملية.
            </p>
          </div>

          {/* Skills Grid */}
          <div ref={categoriesRef} className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-16">
            {skillCategories.map((category, catIndex) => (
              <div
                key={category.title}
                className="skill-category p-6 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 hover:border-brand-blue/30 transition-colors"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-brand-blue/20 flex items-center justify-center text-brand-blue">
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white">{category.title}</h3>
                </div>

                {/* Skills */}
                <div>
                  {category.skills.map((skill, skillIndex) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      delay={catIndex * 0.1 + skillIndex * 0.05}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Soft Skills */}
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-white mb-6">القيادة والمهارات الشخصية</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {softSkills.map((skill) => (
              <div
                key={skill.title}
                className="p-4 rounded-xl glass text-center hover:border-brand-blue/30 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-brand-blue/20 flex items-center justify-center text-brand-blue mx-auto mb-3 group-hover:scale-110 transition-transform">
                  {skill.icon}
                </div>
                <h4 className="text-white font-medium text-sm mb-1">{skill.title}</h4>
                <p className="text-white/50 text-xs">{skill.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
