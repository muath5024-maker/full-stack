import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Linkedin, 
  Twitter, 
  Github, 
  Instagram,
  ArrowUp,
  Heart
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger animation for footer content
      gsap.fromTo(
        '.footer-item',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 95%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'الرئيسية', href: '#hero' },
    { label: 'من نحن', href: '#about' },
    { label: 'الخدمات', href: '#services' },
    { label: 'المشاريع', href: '#portfolio' },
    { label: 'المهارات', href: '#skills' },
    { label: 'التواصل', href: '#contact' },
  ];

  const socialLinks = [
    { icon: <Linkedin className="w-5 h-5" />, label: 'LinkedIn', href: '#' },
    { icon: <Twitter className="w-5 h-5" />, label: 'Twitter', href: '#' },
    { icon: <Github className="w-5 h-5" />, label: 'GitHub', href: '#' },
    { icon: <Instagram className="w-5 h-5" />, label: 'Instagram', href: '#' },
  ];

  return (
    <footer
      ref={footerRef}
      className="relative w-full bg-brand-dark border-t border-white/10"
      dir="rtl"
    >
      {/* Main Footer Content */}
      <div ref={contentRef} className="px-6 sm:px-8 lg:px-16 xl:px-24 py-16">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {/* Brand Column */}
            <div className="footer-item lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-blue to-brand-orange flex items-center justify-center">
                  <span className="text-white font-bold text-lg">M</span>
                </div>
                <span className="text-white font-bold text-2xl">mbuy</span>
              </div>
              <p className="text-white/60 mb-6 max-w-md">
                mbuy هي منصة تقنية متقدمة تقدم حلول الذكاء الاصطناعي، 
                الأمن السيبراني، والبرمجة المتخصصة لتطوير أعمالك.
              </p>
              
              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg glass flex items-center justify-center text-white/60 hover:text-white hover:bg-brand-blue/20 transition-all duration-300"
                    title={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-item">
              <h4 className="text-white font-medium mb-4">روابط سريعة</h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/60 hover:text-brand-blue transition-colors link-underline inline-block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="footer-item">
              <h4 className="text-white font-medium mb-4">تواصل معنا</h4>
              <ul className="space-y-3 text-white/60">
                <li>hello@mbuy.tech</li>
                <li>+966 50 123 4567</li>
                <li>الرياض، السعودية</li>
              </ul>
              
              {/* Availability Badge */}
              <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm text-white/70">متاحون للعمل</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 px-6 sm:px-8 lg:px-16 xl:px-24 py-6">
        <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm flex items-center gap-1">
            صنع بـ <Heart className="w-4 h-4 text-brand-orange fill-brand-orange" /> بواسطة mbuy
          </p>
          
          <div className="flex items-center gap-6">
            <a href="#" className="text-white/40 hover:text-white text-sm transition-colors">
              سياسة الخصوصية
            </a>
            <a href="#" className="text-white/40 hover:text-white text-sm transition-colors">
              شروط الخدمة
            </a>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-lg glass flex items-center justify-center text-white/60 hover:text-white hover:bg-brand-blue/20 transition-all duration-300"
            title="العودة للأعلى"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
