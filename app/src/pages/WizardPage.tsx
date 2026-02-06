import { useState } from 'react';
import { useProject } from '@/hooks/use-project';
import type { ProjectConfig, ProjectType } from '@/types/project';
import StepSelection from '@/components/wizard/StepSelection';
import StepConfig from '@/components/wizard/StepConfig';
import StepReview from '@/components/wizard/StepReview';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

const WizardPage = () => {
    const [step, setStep] = useState(1);
    const [config, setConfig] = useState<Partial<ProjectConfig>>({
        createdAt: new Date(),
        deploymentStatus: 'draft',
    });
    const [isDeploying, setIsDeploying] = useState(false);
    const { saveProject } = useProject();

    const handleTypeSelect = (type: ProjectType) => {
        setConfig(prev => ({ ...prev, type }));
        setStep(2);
    };

    const handleConfigChange = (key: string, value: any) => {
        setConfig(prev => ({ ...prev, [key]: value }));
    };

    const handleNestedConfigChange = (section: 'storeConfig' | 'appConfig', key: string, value: any) => {
        setConfig(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [key]: value
            }
        }));
    };

    const handleDeploy = async () => {
        setIsDeploying(true);
        // Simulation of API call
        console.log('Deploying Project:', config);
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Save to Engine (Local Persistence)
        const finalConfig = {
            ...config,
            deploymentStatus: 'active',
            id: crypto.randomUUID()
        } as ProjectConfig;

        saveProject(finalConfig);
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleNext = () => {
        if (step === 2) setStep(3);
    };

    return (
        <div className="min-h-screen bg-brand-dark pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Decorational Background */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
                <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-brand-blue/10 rounded-full blur-3xl opacity-30" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-purple/10 rounded-full blur-3xl opacity-30" />
            </div>

            <div className="max-w-5xl mx-auto">
                {/* Progress Bar */}
                <div className="mb-12 relative flex justify-between max-w-2xl mx-auto">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -translate-y-1/2 -z-10" />
                    {[1, 2, 3].map((s) => (
                        <div
                            key={s}
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300
                ${step >= s ? 'bg-brand-blue text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-brand-dark border-2 border-white/20 text-white/40'}
              `}
                        >
                            {s}
                        </div>
                    ))}
                </div>

                {/* Content */}
                <div className="min-h-[500px]">
                    {step === 1 && (
                        <StepSelection
                            onSelect={handleTypeSelect}
                            selectedType={config.type || null}
                        />
                    )}

                    {step === 2 && config.type && (
                        <StepConfig
                            type={config.type}
                            config={config}
                            onChange={handleConfigChange}
                            onConfigChange={handleNestedConfigChange}
                        />
                    )}

                    {step === 3 && (
                        <StepReview
                            config={config}
                            onDeploy={handleDeploy}
                            isDeploying={isDeploying}
                        />
                    )}
                </div>

                {/* Navigation Buttons */}
                <div className="mt-8 flex justify-between max-w-2xl mx-auto">
                    {step > 1 && (
                        <Button variant="ghost" className="text-white hover:text-white/80" onClick={handleBack}>
                            <ChevronRight className="ml-2 h-4 w-4" />
                            سابق
                        </Button>
                    )}

                    {step === 2 && (
                        <Button onClick={handleNext} className="mr-auto bg-white/10 hover:bg-white/20 text-white">
                            التالي
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WizardPage;
