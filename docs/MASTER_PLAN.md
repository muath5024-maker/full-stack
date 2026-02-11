# 📘 المرجع الشامل للمطور: منصة التجارة بالبرمجيات
# The Comprehensive Developer Reference: Software Commerce Platform

هذا المستند هو المرجع الأساسي والحقيقة الواحدة (Source of Truth) لجميع المطورين العاملين على المشروع.

---

## 1. التعريف بالمشروع (Project Definition)
**النوع:** منصة تجارة برمجيات (Software Commerce Platform).
**الوصف:** نظام بيئي متكامل يسمح بإنشاء، بيع، إدارة، وتشغيل البرمجيات والمنتجات الرقمية باستخدام الذكاء الاصطناعي.
**النطاق:**
*   **🛒 التجارة (Commerce):** متجر متعدد البائعين (Multi-vendor Market).
*   **🏭 المصنع (Factory):** مولد تطبيقات (App Builder & SaaS Generator).
*   **🎨 الاستوديو (Studio):** أدوات تحرير وتوليد وسائط (AI Media Tools).
*   **⚙️ الإدارة (Management):** نظام ERP مصغر لإدارة العمليات والمبيعات.

---

## 2. جدول المهارات والتقنيات (Tech Stack & Skills Matrix)

هذا الجدول يوضح التقنيات المطلوبة والمهارات اللازمة لكل طبقة في النظام:

| الطبقة (Layer) | التقنية (Technology) | المهارات المطلوبة (Required Skills) | ملاحظات هامة |
| :--- | :--- | :--- | :--- |
| **الواجهة والخادم**<br>(Full-Stack) | **Next.js 15** (App Router)<br>TypeScript<br>Tailwind CSS (shadcn/ui)<br>GSAP | - Server Components & Client Components<br>- App Router & Layouts<br>- API Routes<br>- بناء واجهات ديناميكية (Server Driven UI) | Next.js يوفر حلاً متكاملاً للواجهة والـ API في مشروع واحد. |
| **قاعدة البيانات**<br>(Data Layer) | **PostgreSQL**<br>(Supabase) | - Database Design (Normalization)<br>- SQL Optimization<br>- JSONB fields (للبيانات المرنة) | قاعدة البيانات ستكون ضخمة. يجب تصميم الجداول بعناية فائقة (Indexes, FKs). |
| **البنية التحتية**<br>(DevOps) | **Vercel / Cloudflare**<br>GitHub Actions | - CI/CD Pipelines<br>- DNS & Networking<br>- Edge Functions | النظام يجب أن يكون قابلاً للنشر بضغطة زر (One-Click Deploy). |

---

## 3. هيكلية المشروع (Project Architecture)

النظام يعتمد على **Next.js 15 App Router** كإطار عمل موحد.

### المخطط العام:
```mermaid
graph TD
    Client[Client Browser / Mobile] -->|HTTPS| NextJS[Next.js App]

    subgraph "Next.js 15 Application"
        NextJS -->|Server Components| SSR[Server-Side Rendering]
        NextJS -->|API Routes| APILayer[API Layer]
        APILayer -->|Query| DB[(PostgreSQL / Supabase)]
        SSR -->|Data Fetch| DB
    end

    subgraph "External Services"
        APILayer -->|AI Requests| AI[AI APIs (Gemini/etc)]
        APILayer -->|Storage| R2[Cloudflare R2]
    end
```

---

## 4. تقسيم الأدوار (Roles & Permissions)

النظام يدعم تعدد الأدوار بصلاحيات دقيقة (RBAC):

1.  **المالك (Super Admin):** له تحكم كامل في المنصة، العمولات، الإعدادات، والموظفين.
2.  **الموظف (Staff):** (دعم فني، مبيعات، مراجع جودة) بصلاحيات محدودة حسب القسم.
3.  **البائع (Vendor):** له متجر خاص، لوحة تحكم بالمنتجات، ومحفظة مالية.
4.  **العميل (Customer/User):** يشتري، يبني مشروعه، ويدير منتجاته.
5.  **المطور (Developer):** (في حال فتح المنصة للمطورين) يبيع إضافات وقوالب.

---

## 5. خارطة الطريق ومراحل التنفيذ (Roadmap)

### المرحلة 1: التأسيس (The Core Foundation)
*   [ ] إعداد Next.js 15 مع App Router والتصميم الأساسي. ✅
*   [ ] إعداد Supabase (Auth + Database).
*   [ ] إعداد الهيكل الأساسي للصفحات (Router & Layouts) للتبويبات.

### المرحلة 2: محرك البناء (The Factory Engine)
*   [ ] برمجة واجهة المعالج (Wizard) لإنشاء المشاريع.
*   [ ] ربط AI APIs لتوليد الكود والمحتوى.
*   [ ] API Routes لمعالجة الطلبات.

### المرحلة 3: السوق والاستوديو (Market & Studio)
*   [ ] بناء نظام تعدد البائعين (Vendor Dashboard).
*   [ ] تطوير أدوات الاستوديو (توليد الصور/النصوص).
*   [ ] دمج بوابات الدفع والمحافظ.

### المرحلة 4: الأتمتة والتشغيل (Ops & Scale)
*   [ ] أتمتة النشر على Vercel/Cloudflare.
*   [ ] إعداد نظام المراقبة (Monitoring) والسجلات.

---

## 6. قواعد العمل (Development Rules)
1.  **Source of Truth:** قاعدة البيانات هي المصدر الوحيد للحقيقة. لا تعتمد على الـ Client State في الأمور الحساسة.
2.  **Strict Typing:** يجب استخدام TypeScript بصرامة في جميع أنحاء المشروع.
3.  **Security First:** كل API Route يجب أن تتحقق من الصلاحيات.
4.  **Server Components First:** استخدم Server Components افتراضياً، و `"use client"` فقط عند الضرورة.
5.  **Documentation:** أي ميزة جديدة يجب توثيقها في هذا المجلد قبل كتابة الكود.

---
*تم التحديث بتاريخ: 2026-02-11 — الانتقال الكامل إلى Next.js 15*
