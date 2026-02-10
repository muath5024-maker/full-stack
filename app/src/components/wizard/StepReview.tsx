"use client";

import type { ProjectConfig } from '@/types/project';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Rocket } from 'lucide-react';

interface StepReviewProps {
    config: Partial<ProjectConfig>;
    onDeploy: () => void;
    isDeploying: boolean;
}

const StepReview = ({ config, onDeploy, isDeploying }: StepReviewProps) => {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2 text-white">مراجعة وإطلاق</h2>
                <p className="text-white/60">راجع تفاصيل مشروعك قبل البدء في البناء.</p>
            </div>

            <Card className="bg-white/5 border-white/10">
                <CardContent className="p-6 space-y-6">
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white border-b border-white/10 pb-2">
                            ملخص المشروع
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <span className="text-white/40 text-sm">نوع المشروع</span>
                                <p className="text-brand-blue font-bold text-lg uppercase">{config.type}</p>
                            </div>
                            <div>
                                <span className="text-white/40 text-sm">اسم المشروع</span>
                                <p className="text-white font-medium text-lg">{config.name || 'لم يحدد'}</p>
                            </div>
                            <div className="col-span-2">
                                <span className="text-white/40 text-sm">الوصف</span>
                                <p className="text-white/80">{config.description || 'لا يوجد وصف'}</p>
                            </div>

                            {config.type === 'store' && config.storeConfig && (
                                <>
                                    <div>
                                        <span className="text-white/40 text-sm">المخزون</span>
                                        <p className="text-white">{config.storeConfig.inventoryType}</p>
                                    </div>
                                    <div>
                                        <span className="text-white/40 text-sm">بوابة الدفع</span>
                                        <p className="text-white">{config.paymentGateway || 'Default'}</p>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="rounded-lg bg-black/30 p-4 font-mono text-xs text-green-400 overflow-x-auto">
                        {JSON.stringify(config, null, 2)}
                    </div>
                </CardContent>
            </Card>

            <div className="flex flex-col items-center gap-4">
                <Button
                    size="lg"
                    onClick={onDeploy}
                    disabled={isDeploying || !config.name}
                    className="min-w-[200px] h-14 text-lg bg-brand-blue hover:bg-brand-blue/90"
                >
                    {isDeploying ? (
                        <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            جاري البناء...
                        </>
                    ) : (
                        <>
                            <Rocket className="mr-2 h-5 w-5" />
                            إطلاق المشروع
                        </>
                    )}
                </Button>
                <p className="text-white/40 text-sm">
                    بالنقر على إطلاق، توافق على شروط الخدمة وبدء الفترة التجريبية.
                </p>
            </div>
        </div>
    );
};

export default StepReview;
