"use client";

import type { ProjectConfig, ProjectType } from '@/types/project';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface StepConfigProps {
    type: ProjectType;
    config: Partial<ProjectConfig>;
    onChange: (key: string, value: any) => void;
    onConfigChange: (section: 'storeConfig' | 'appConfig', key: string, value: any) => void;
}

const StepConfig = ({ type, config, onChange, onConfigChange }: StepConfigProps) => {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2 text-white">إعداد المشروع</h2>
                <p className="text-white/60">قم بتخصيص مشروعك الجديد.</p>
            </div>

            <Card className="bg-white/5 border-white/10">
                <CardContent className="p-6 space-y-6">
                    {/* General Settings */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white border-b border-white/10 pb-2">
                            بيانات أساسية
                        </h3>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name" className="text-white">اسم المشروع / المتجر</Label>
                                <Input
                                    id="name"
                                    placeholder="مثال: متجر الأناقة"
                                    value={config.name || ''}
                                    onChange={(e) => onChange('name', e.target.value)}
                                    className="bg-white/5 border-white/10 text-white"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="desc" className="text-white">وصف مختصر</Label>
                                <Input
                                    id="desc"
                                    placeholder="وصف لنشاطك التجاري..."
                                    value={config.description || ''}
                                    onChange={(e) => onChange('description', e.target.value)}
                                    className="bg-white/5 border-white/10 text-white"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Store Specific Config */}
                    {type === 'store' && (
                        <div className="space-y-4 pt-4">
                            <h3 className="text-xl font-semibold text-white border-b border-white/10 pb-2">
                                خصائص المتجر
                            </h3>

                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label className="text-white">نوع المخزون</Label>
                                    <Select
                                        onValueChange={(val) => onConfigChange('storeConfig', 'inventoryType', val)}
                                        defaultValue={config.storeConfig?.inventoryType || 'basic'}
                                    >
                                        <SelectTrigger className="bg-white/5 border-white/10 text-white">
                                            <SelectValue placeholder="اختر نوع المخزون" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="basic">مخزون بسيط (يدوي)</SelectItem>
                                            <SelectItem value="advanced_erp">ربط مع ERP (متقدم)</SelectItem>
                                            <SelectItem value="dropshipping">دروب شيبنج (تلقائي)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="grid gap-2">
                                    <Label className="text-white">بوابة الدفع</Label>
                                    <RadioGroup
                                        defaultValue="stripe"
                                        onValueChange={(val) => onChange('paymentGateway', val)}
                                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                                    >
                                        <div className="flex items-center space-x-2 space-x-reverse rounded-lg border border-white/10 p-4 bg-white/5">
                                            <RadioGroupItem value="stripe" id="stripe" />
                                            <Label htmlFor="stripe" className="text-white cursor-pointer">Stripe (عالمي)</Label>
                                        </div>
                                        <div className="flex items-center space-x-2 space-x-reverse rounded-lg border border-white/10 p-4 bg-white/5">
                                            <RadioGroupItem value="tamara" id="tamara" />
                                            <Label htmlFor="tamara" className="text-white cursor-pointer">Tamara / Tabby (تقسيط)</Label>
                                        </div>
                                        <div className="flex items-center space-x-2 space-x-reverse rounded-lg border border-white/10 p-4 bg-white/5">
                                            <RadioGroupItem value="my_gateway" id="my_gateway" />
                                            <Label htmlFor="my_gateway" className="text-white cursor-pointer">بوابتي الخاصة (Custom)</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* App Specific Config */}
                    {type === 'app' && (
                        <div className="space-y-4 pt-4">
                            <h3 className="text-xl font-semibold text-white border-b border-white/10 pb-2">
                                خصائص التطبيق
                            </h3>

                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label className="text-white">المنصات المستهدفة</Label>
                                    <div className="flex gap-4">
                                        <label className="flex items-center gap-2 text-white border border-white/10 p-3 rounded-lg flex-1 cursor-pointer bg-white/5">
                                            <input type="checkbox" defaultChecked className="rounded bg-transparent" />
                                            iOS (iPhone/iPad)
                                        </label>
                                        <label className="flex items-center gap-2 text-white border border-white/10 p-3 rounded-lg flex-1 cursor-pointer bg-white/5">
                                            <input type="checkbox" defaultChecked className="rounded bg-transparent" />
                                            Android
                                        </label>
                                    </div>
                                </div>

                                <div className="grid gap-2">
                                    <Label className="text-white">لون شاشة البداية (Splash)</Label>
                                    <Input
                                        type="color"
                                        className="h-12 w-full cursor-pointer bg-white/5 border-white/10"
                                        onChange={(e) => onConfigChange('appConfig', 'splashScreenColor', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default StepConfig;
