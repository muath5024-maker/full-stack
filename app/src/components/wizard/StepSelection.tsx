"use client";

import type { ProjectType } from '@/types/project';
import { Card, CardContent } from '@/components/ui/card';
import { ShoppingBag, Smartphone, Globe, Database, Link } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepSelectionProps {
    onSelect: (type: ProjectType) => void;
    selectedType: ProjectType | null;
}

const PROJECT_TYPES: { id: ProjectType; title: string; desc: string; icon: any }[] = [
    {
        id: 'store',
        title: 'متجر إلكتروني',
        desc: 'بيع المنتجات المادية أو الرقمية مع نظام دفع ومخزون متكامل.',
        icon: ShoppingBag,
    },
    {
        id: 'app',
        title: 'تطبيق جوال',
        desc: 'تطبيق احترافي لنظامي iOS و Android مع إشعارات وخصائص متقدمة.',
        icon: Smartphone,
    },
    {
        id: 'landing_page',
        title: 'صفحة هبوط / موقع',
        desc: 'موقع تعريفي لشركتك أو منتجك لعرض الخدمات والمعلومات.',
        icon: Globe,
    },
    {
        id: 'database',
        title: 'قاعدة بيانات',
        desc: 'استضافة وإدارة قواعد بيانات آمنة لمشروعك البرمجي.',
        icon: Database,
    },
    {
        id: 'domain',
        title: 'ربط نطاق',
        desc: 'إدارة وربط النطاقات الخاصة بك بخوادمنا.',
        icon: Link,
    },
];

const StepSelection = ({ onSelect, selectedType }: StepSelectionProps) => {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center">
                <h2 className="text-3xl font-bold mb-2 text-white">اختر نوع مشروعك</h2>
                <p className="text-white/60">ما الذي تريد بناءه اليوم؟ سنقوم بتجهيز كل شيء لك.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {PROJECT_TYPES.map((type) => {
                    const Icon = type.icon;
                    const isSelected = selectedType === type.id;

                    return (
                        <Card
                            key={type.id}
                            className={cn(
                                "cursor-pointer transition-all duration-300 hover:scale-[1.02] border-2 bg-white/5 backdrop-blur-sm",
                                isSelected
                                    ? "border-brand-blue bg-brand-blue/10 shadow-[0_0_30px_rgba(59,130,246,0.2)]"
                                    : "border-transparent hover:border-white/20"
                            )}
                            onClick={() => onSelect(type.id)}
                        >
                            <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                                <div
                                    className={cn(
                                        "w-16 h-16 rounded-2xl flex items-center justify-center transition-colors",
                                        isSelected
                                            ? "bg-brand-blue text-white"
                                            : "bg-white/10 text-white/70 group-hover:bg-white/20"
                                    )}
                                >
                                    <Icon className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-2">{type.title}</h3>
                                    <p className="text-sm text-white/50 leading-relaxed">
                                        {type.desc}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
};

export default StepSelection;
