import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Twitter, 
  Github, 
  Instagram,
  Send,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { icon: <Linkedin className="w-5 h-5" />, label: 'LinkedIn', href: '#', color: 'hover:bg-[#0077b5]' },
  { icon: <Twitter className="w-5 h-5" />, label: 'Twitter', href: '#', color: 'hover:bg-[#1da1f2]' },
  { icon: <Github className="w-5 h-5" />, label: 'GitHub', href: '#', color: 'hover:bg-[#333]' },
  { icon: <Instagram className="w-5 h-5" />, label: 'Instagram', href: '#', color: 'hover:bg-[#e4405f]' },
];

const contactInfo = [
  { icon: <Mail className="w-5 h-5" />, label: 'البريد الإلكتروني', value: 'hello@mbuy.tech' },
  { icon: <Phone className="w-5 h-5" />, label: 'الهاتف', value: '+966 50 123 4567' },
  { icon: <MapPin className="w-5 h-5" />, label: 'الموقع', value: 'الرياض، السعودية' },
];

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

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

      // Form animation
      gsap.fromTo(
        formRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Info animation
      gsap.fromTo(
        infoRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: infoRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full py-24 lg:py-32 bg-brand-dark overflow-hidden"
      dir="rtl"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-brand-blue/10 rounded-full blur-[150px]" />
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-brand-orange/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 grid-pattern opacity-20" />
      </div>

      <div className="relative z-10 px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-[1600px] mx-auto">
          {/* Section Header */}
          <div ref={titleRef} className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full glass text-sm text-brand-blue mb-4">
              التواصل
            </span>
            <h2 className="text-responsive-section font-bold text-white mb-4">
              دعنا <span className="gradient-text">نتواصل</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg">
              هل لديك مشروع في mind أو تريد معرفة المزيد عن خدمات mbuy؟ 
              نحن هنا لمساعدتك.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Contact Form */}
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="lg:col-span-3 space-y-6"
            >
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-white/70 mb-2">اسمك</label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="محمد أحمد"
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-brand-blue h-12 text-right"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/70 mb-2">بريدك الإلكتروني</label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="mohamed@example.com"
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-brand-blue h-12 text-right"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-white/70 mb-2">الموضوع</label>
                <Input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="استفسار عن خدمة"
                  required
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-brand-blue h-12 text-right"
                />
              </div>

              <div>
                <label className="block text-sm text-white/70 mb-2">الرسالة</label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="أخبرنا عن مشروعك..."
                  required
                  rows={6}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-brand-blue resize-none text-right"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitted}
                className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white py-6 text-base font-medium rounded-xl transition-all duration-300 hover:shadow-glow disabled:opacity-70"
              >
                {isSubmitted ? (
                  <>
                    <CheckCircle className="w-5 h-5 ml-2" />
                    تم إرسال الرسالة بنجاح!
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 ml-2" />
                    إرسال الرسالة
                  </>
                )}
              </Button>
            </form>

            {/* Contact Info */}
            <div ref={infoRef} className="lg:col-span-2 space-y-8">
              {/* Info Cards */}
              <div className="space-y-4">
                {contactInfo.map((info) => (
                  <div
                    key={info.label}
                    className="flex items-center gap-4 p-4 rounded-xl glass hover:border-brand-blue/30 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-brand-blue/20 flex items-center justify-center text-brand-blue">
                      {info.icon}
                    </div>
                    <div>
                      <div className="text-white/50 text-sm">{info.label}</div>
                      <div className="text-white font-medium">{info.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-white font-medium mb-4">تابعنا</h3>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-12 h-12 rounded-xl glass flex items-center justify-center text-white/70 transition-all duration-300 ${social.color} hover:text-white hover:scale-110`}
                      title={social.label}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="p-6 rounded-xl glass border-r-4 border-brand-blue">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-white font-medium">متاحون للمشاريع</span>
                </div>
                <p className="text-white/60 text-sm">
                  نحن نستقبل استفساراتكم ومشاريعكم على مدار الساعة. 
                  وقت الاستجابة: خلال 24 ساعة.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
