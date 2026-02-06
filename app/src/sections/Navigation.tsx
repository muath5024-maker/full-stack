import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { Menu, X, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navLinks = [
  { label: 'الرئيسية', href: '#hero' },
  { label: 'المنتجات', href: '#about' },
  { label: 'studio', href: '#services' },
  { label: 'التجارة الالكترونية', href: '#portfolio' },
  {
    label: 'البناء و التطوير',
    href: '#', // Placeholder or specific section
    subItems: [
      'موقع ويب',
      'لوحة تحكم',
      'قاعدة بيانات',
      'باك اند',
      'منصة متعددة البائعين',
      'صفحة هبوط',
      'هوية بصرية',
      'HTML/CSS/JS صفحة ويب',
      'تطبيق ويب',
    ],
  },
  { label: 'دليل المنصة', href: '#skills' },
  { label: 'تواصل (اعمال)', href: '#contact' },
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);

      // Determine active section
      const sections = navLinks.map((link) => link.href.slice(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: element, offsetY: 80 },
        ease: 'expo.inOut',
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
            ? 'bg-brand-dark/80 backdrop-blur-xl border-b border-white/10'
            : 'bg-transparent'
          }`}
        dir="rtl"
      >
        <div className="px-6 sm:px-8 lg:px-16 xl:px-24">
          <div className="max-w-[1600px] mx-auto flex items-center justify-between h-20">
            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, '#hero')}
              className="flex items-center gap-2"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-blue to-brand-orange flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="text-white font-bold text-xl">
                mbuy
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) =>
                link.subItems ? (
                  <DropdownMenu key={link.label}>
                    <DropdownMenuTrigger
                      className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${activeSection === link.label // Simple check, or maybe no active state for this
                          ? 'text-brand-blue bg-brand-blue/10'
                          : 'text-white/70 hover:text-white hover:bg-white/5'
                        }`}
                    >
                      {link.label}
                      <ChevronDown className="w-4 h-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-brand-dark/95 backdrop-blur-xl border-white/10 text-white" align="end">
                      {link.subItems.map((item) => (
                        <DropdownMenuItem
                          key={item}
                          className="focus:bg-brand-blue/20 focus:text-brand-blue cursor-pointer justify-end"
                          onClick={() => {
                            // Handle click - perhaps navigate to wizard
                            window.location.href = '/start';
                          }}
                        >
                          {item}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href!)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${activeSection === link.href?.slice(1)
                        ? 'text-brand-blue bg-brand-blue/10'
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                      }`}
                  >
                    {link.label}
                  </a>
                )
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-lg glass flex items-center justify-center text-white"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        dir="rtl"
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-brand-dark/95 backdrop-blur-xl"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Content */}
        <div className="relative h-full flex flex-col items-center justify-center gap-4 p-8">
          {navLinks.map((link) =>
            link.subItems ? (
              <div key={link.label} className="flex flex-col items-center gap-2 w-full">
                <span className="text-2xl font-medium text-brand-blue">{link.label}</span>
                <div className="flex flex-col items-center gap-2 bg-white/5 rounded-lg w-full p-4">
                  {link.subItems.map((item) => (
                    <a
                      key={item}
                      href="/start"
                      className="text-lg text-white/70 hover:text-white py-1"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => link.href && handleNavClick(e, link.href)}
                className={`text-2xl font-medium transition-all duration-300 ${activeSection === link.href?.slice(1)
                    ? 'text-brand-blue'
                    : 'text-white/70 hover:text-white'
                  }`}
              >
                {link.label}
              </a>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default Navigation;
