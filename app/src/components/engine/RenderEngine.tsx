"use client";

import type { ProjectConfig } from '@/types/project';
import StorePage from '@/views/StorePage';
import Navigation from '@/sections/Navigation';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Services from '@/sections/Services';
import Portfolio from '@/sections/Portfolio';
import Skills from '@/sections/Skills';
import Gallery from '@/sections/Gallery';
import CTA from '@/sections/CTA';
import Contact from '@/sections/Contact';
import Footer from '@/sections/Footer';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface RenderEngineProps {
    project: ProjectConfig;
    onReset: () => void;
}

const RenderEngine = ({ project, onReset }: RenderEngineProps) => {

    // 1. Store Mode
    if (project.type === 'store') {
        // Inject the project data into the StorePage (simulated via subdomain hook usually, 
        // but here we might need to adjust StorePage to accept props or mocking)
        // For now, we will render StorePage. In a real app, we'd pass the config to it.
        return (
            <div className="relative">
                <StorePage />
                <ResetButton onReset={onReset} />
            </div>
        );
    }

    // 2. App Mode (Preview)
    if (project.type === 'app') {
        return (
            <div className="min-h-screen bg-neutral-900 flex items-center justify-center relative p-8">
                <ResetButton onReset={onReset} />

                <div className="max-w-4xl w-full grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h1 className="text-4xl font-bold text-white">مبروك! تطبيقك جاهز.</h1>
                        <p className="text-gray-400 text-lg">
                            تم إنشاء مسودة تطبيق
                            <span className="text-brand-blue font-bold mx-2">{project.name}</span>
                            بنجاح.
                        </p>

                        <div className="bg-white/5 p-6 rounded-xl border border-white/10 space-y-4">
                            <div className="flex justify-between border-b border-white/10 pb-4">
                                <span className="text-gray-400">المنصة</span>
                                <span className="text-white">iOS & Android</span>
                            </div>
                            <div className="flex justify-between border-b border-white/10 pb-4">
                                <span className="text-gray-400">الحالة</span>
                                <span className="text-green-500 font-bold">JIT Compilation Ready</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">الإصدار</span>
                                <span className="text-white">v1.0.0-alpha</span>
                            </div>
                        </div>

                        <Button className="w-full bg-brand-blue hover:bg-brand-blue/90 h-12 text-lg">
                            تحميل ملف APK التجريبي
                        </Button>
                    </div>

                    {/* Phone Mockup */}
                    <div className="relative mx-auto border-gray-800 bg-gray-900 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
                        <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
                        <div className="h-[32px] w-[3px] bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg"></div>
                        <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
                        <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
                        <div className="h-[64px] w-[3px] bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
                        <div className="rounded-[2rem] overflow-hidden w-full h-full bg-white dark:bg-gray-800 flex flex-col items-center justify-center relative">
                            {/* Splash Screen Simulation */}
                            <div
                                className="absolute inset-0 flex items-center justify-center"
                                style={{ backgroundColor: project.appConfig?.splashScreenColor || '#000' }}
                            >
                                <h2 className="text-white font-bold text-2xl">{project.name}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // 3. Fallback / Landing Mode (Normal Site but configured)
    return (
        <div className="relative min-h-screen bg-brand-dark text-white overflow-x-hidden">
            <div className="fixed inset-0 pointer-events-none z-[100] noise-overlay opacity-50" />

            {/* Reset for Demo Purpose */}
            <ResetButton onReset={onReset} />

            <Navigation />
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
            <Footer />
        </div>
    );
};

const ResetButton = ({ onReset }: { onReset: () => void }) => (
    <div className="fixed bottom-4 right-4 z-[9999]">
        <Button
            variant="destructive"
            size="sm"
            onClick={onReset}
            className="shadow-lg hover:scale-105 transition-transform"
        >
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset Demo
        </Button>
    </div>
);

export default RenderEngine;
