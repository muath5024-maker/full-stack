import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import About from './sections/About';
import Services from './sections/Services';
import Portfolio from './sections/Portfolio';
import Skills from './sections/Skills';
import Gallery from './sections/Gallery';
import CTA from './sections/CTA';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import StorePage from './pages/StorePage';
import WizardPage from './pages/WizardPage';
import RenderEngine from '@/components/engine/RenderEngine';
import { useSubdomain } from './hooks/use-subdomain';
import { useProject } from './hooks/use-project';
import { Spinner } from '@/components/ui/spinner';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function App() {
  const { isSubdomain } = useSubdomain();
  const { project, loading: projectLoading, clearProject } = useProject();

  useEffect(() => {
    // Initialize smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();

    // Handle reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.globalTimeline.timeScale(0);
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Check if we are on the wizard page
  const isWizard = window.location.pathname === '/start';

  if (isWizard) {
    return <WizardPage />;
  }

  // إذا كان دومين متجر فرعي، عرض صفحة المتجر
  if (isSubdomain) {
    return <StorePage />;
  }

  // Loading State
  if (projectLoading) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center">
        <Spinner className="w-8 h-8 text-brand-blue" />
      </div>
    );
  }

  // Active Project (SaaS Mode)
  if (project && project.deploymentStatus === 'active') {
    return <RenderEngine project={project} onReset={clearProject} />;
  }

  // الموقع الرئيسي
  return (
    <div className="relative min-h-screen bg-brand-dark text-white overflow-x-hidden">
      {/* Noise Overlay - Global */}
      <div className="fixed inset-0 pointer-events-none z-[100] noise-overlay opacity-50" />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Skills />
        <Gallery />
        <CTA />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
