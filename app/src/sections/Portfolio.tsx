import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  image: string;
  technologies: string[];
  stats: { label: string; value: string }[];
  links: { demo?: string; github?: string };
}

const projects: Project[] = [
  {
    id: 1,
    title: 'منصة السوق المدعومة بالذكاء الاصطناعي',
    category: 'التجارة الإلكترونية والذكاء الاصطناعي',
    description: 'سوق متعدد البائعين من الجيل التالي مع توصيات منتجات ذكية وإدارة بائعين آلية.',
    fullDescription: 'بناءت منصة سوق شاملة متعددة البائعين تستخدم الذكاء الاصطناعي لتقديم تجارب تسوق شخصية. تتميز المنصة بتوصيات منتجات ذكية، وإدراج بائعين آلي، وإدارة مخزون في الوقت الفعلي، ولوحات تحليلات متقدمة. تتعامل مع ملايين المعاملات شهريًا بنسبة تشغيل 99.9%.',
    image: '/project-marketplace.jpg',
    technologies: ['React', 'Node.js', 'Python', 'TensorFlow', 'PostgreSQL', 'AWS'],
    stats: [
      { label: 'البائعين النشطين', value: '+500' },
      { label: 'المعاملات الشهرية', value: '+100K' },
      { label: 'رضا المستخدمين', value: '4.9/5' },
    ],
    links: { demo: '#', github: '#' },
  },
  {
    id: 2,
    title: 'محرك التحليلات بالشبكات العصبية',
    category: 'الذكاء الاصطناعي',
    description: 'منصة تعلم عميق للتحليلات التنبؤية وذكاء الأعمال مع معالجة بيانات في الوقت الفعلي.',
    fullDescription: 'طورت محرك تحليلات متطور بالشبكات العصبية يعالج كميات ضخمة من بيانات الأعمال لتوليد رؤى قابلة للتنفيذ. يستخدم النظام خوارزميات تعلم آلي متقدمة للتنبؤ باتجاهات السوق وسلوك العملاء والطلبات المخزنية بدقة عالية.',
    image: '/project-ai-platform.jpg',
    technologies: ['Python', 'PyTorch', 'FastAPI', 'Redis', 'Docker', 'Kubernetes'],
    stats: [
      { label: 'نقاط البيانات المعالجة', value: '+1B' },
      { label: 'دقة التنبؤ', value: '94%' },
      { label: 'وقت استجابة API', value: '<50ms' },
    ],
    links: { demo: '#', github: '#' },
  },
  {
    id: 3,
    title: 'لوحة تحليلات في الوقت الفعلي',
    category: 'تصور البيانات',
    description: 'لوحة ذكاء أعمال تفاعلية مع تدفقات بيانات حية وتقارير قابلة للتخصيص.',
    fullDescription: 'أنشأت لوحة تحليلات شاملة توفر رؤية فورية في مقاييس الأعمال. تتضمن ميزات مثل عناصر واجهة قابلة للتخصيص، وتوليد تقارير آلي، وتنبيهات اكتشاف الشذوذ، وقدرات مشاركة تعاونية. تستخدمها الفرق التنفيذية لاتخاذ قرارات مدفوعة بالبيانات.',
    image: '/project-analytics.jpg',
    technologies: ['Next.js', 'D3.js', 'GraphQL', 'ClickHouse', 'Grafana'],
    stats: [
      { label: 'المستخدمين النشطين يوميًا', value: '+2K' },
      { label: 'التقارير المولدة', value: '+10K' },
      { label: 'مصادر البيانات', value: '+50' },
    ],
    links: { demo: '#', github: '#' },
  },
  {
    id: 4,
    title: 'نظام التوصيات الذكي',
    category: 'التعلم الآلي',
    description: 'محرك توصيات شخصي يستخدم التصفية التعاونية وخوارزميات قائمة على المحتوى.',
    fullDescription: 'هندست نظام توصيات هجين يجمع بين التصفية التعاونية والتقنيات القائمة على المحتوى. يحلل النظام سلوك المستخدم وتاريخ الشراء وسمات المنتج لتقديم توصيات ذات صلة عالية، مما زاد معدلات التحويل بنسبة 35%.',
    image: '/project-recommendation.jpg',
    technologies: ['Python', 'Scikit-learn', 'Apache Spark', 'MongoDB', 'Kafka'],
    stats: [
      { label: 'التوصيات/اليوم', value: '+5M' },
      { label: 'معدل النقر', value: '18%' },
      { label: 'زيادة الإيرادات', value: '35%' },
    ],
    links: { demo: '#', github: '#' },
  },
];

const Portfolio = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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

      // Project cards stagger animation
      gsap.fromTo(
        '.project-card',
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.projects-grid',
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
      id="portfolio"
      className="relative w-full py-24 lg:py-32 bg-brand-dark overflow-hidden"
      dir="rtl"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-brand-blue/10 rounded-full blur-[150px]" />
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-brand-orange/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 dot-pattern opacity-20" />
      </div>

      <div className="relative z-10 px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-[1600px] mx-auto">
          {/* Section Header */}
          <div ref={titleRef} className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full glass text-sm text-brand-blue mb-4">
              المشاريع
            </span>
            <h2 className="text-responsive-section font-bold text-white mb-4">
              أعمالي <span className="gradient-text">المميزة</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg">
              مجموعة من أهم أعمالي في مجال الذكاء الاصطناعي، تطوير منصات السوق، 
              والتحول الرقمي.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="projects-grid grid md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="project-card group relative rounded-2xl overflow-hidden cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <span className="inline-block px-3 py-1 rounded-full bg-brand-blue/20 text-brand-blue text-xs font-medium mb-3 w-fit">
                    {project.category}
                  </span>
                  <h3 className="text-xl lg:text-2xl font-bold text-white mb-2 group-hover:text-brand-blue transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-white/60 text-sm line-clamp-2 mb-4">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 rounded-md bg-white/10 text-white/70 text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-1 rounded-md bg-white/10 text-white/70 text-xs">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  {/* View Project Link */}
                  <div className="flex items-center gap-2 text-brand-blue text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                    عرض تفاصيل المشروع
                    <ArrowLeft className="w-4 h-4" />
                  </div>
                </div>

                {/* Border Glow */}
                <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-brand-blue/40 transition-colors pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Project Detail Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-3xl bg-brand-dark border-white/10 text-white max-h-[90vh] overflow-y-auto" dir="rtl">
          {selectedProject && (
            <>
              <div className="relative aspect-video rounded-lg overflow-hidden mb-6">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 to-transparent" />
              </div>

              <DialogHeader>
                <span className="inline-block px-3 py-1 rounded-full bg-brand-blue/20 text-brand-blue text-xs font-medium w-fit mb-2">
                  {selectedProject.category}
                </span>
                <DialogTitle className="text-2xl font-bold text-white">
                  {selectedProject.title}
                </DialogTitle>
                <DialogDescription className="text-white/60">
                  {selectedProject.fullDescription}
                </DialogDescription>
              </DialogHeader>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 my-6">
                {selectedProject.stats.map((stat) => (
                  <div key={stat.label} className="text-center p-4 rounded-lg glass">
                    <div className="text-xl font-bold gradient-text">{stat.value}</div>
                    <div className="text-white/50 text-xs">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Technologies */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-white/80 mb-3">التقنيات المستخدمة</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-lg bg-white/10 text-white/80 text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <Button
                  className="flex-1 bg-brand-blue hover:bg-brand-blue/90"
                  onClick={() => window.open(selectedProject.links.demo, '_blank')}
                >
                  <ExternalLink className="w-4 h-4 ml-2" />
                  المعاينة المباشرة
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-white/20 text-white hover:bg-white/10"
                  onClick={() => window.open(selectedProject.links.github, '_blank')}
                >
                  <Github className="w-4 h-4 ml-2" />
                  عرض الكود
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Portfolio;
