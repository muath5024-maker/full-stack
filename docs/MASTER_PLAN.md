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
| **الواجهة الأمامية**<br>(Frontend) | **React 19 + Vite**<br>TypeScript<br>Tailwind CSS (Shadcn/UI)<br>GSAP / Three.js | - إدارة الحالة المتقدمة (Zustand/TanStack Query)<br>- تحسين الأداء (Memoization, Lazy Loading)<br>- بناء واجهات ديناميكية (Server Driven UI) | الواجهة ضخمة جداً؛ يجب تقسيمها إلى موديولات (Micro-Frontends) منطقية داخل نفس الـ Repo. |
| **البوابة الخلفية**<br>(API Gateway) | **FastAPI (Python)** | - Async programming<br>- Pydantic Models<br>- Authentication (OAuth2/JWT)<br>- Rate Limiting | هذه هي النقطة الوحيدة التي تتحدث معها الواجهة الأمامية. ممنوع الاتصال المباشر بقاعدة البيانات. |
| **الذكاء والعمال**<br>(AI & Workers) | **CrewAI + Python**<br>LangChain<br>Redis (Queue) | - Prompt Engineering<br>- Agent Orchestration<br>- Python Scripting<br>- Docker Operations | العمال يعملون في الخلفية (Asynchronous). لا تنتظر الرد منهم مباشرة. |
| **قاعدة البيانات**<br>(Data Layer) | **PostgreSQL**<br>(Supabase) | - Database Design (Normalization)<br>- SQL Optimization<br>- JSONB fields (للبيانات المرنة) | قاعدة البيانات ستكون ضخمة. يجب تصميم الجداول بعناية فائقة (Indexes, FKs). |
| **البنية التحتية**<br>(DevOps) | **Docker**<br>Cloudflare<br>GitHub Actions | - Containerization<br>- CI/CD Pipelines<br>- DNS & Networking | النظام يجب أن يكون قابلاً للنشر بضغطة زر (One-Click Deploy). |

---

## 3. هيكلية المشروع (Project Architecture)

النظام يتبع معمارية **Modular Monolith** مدعومة بـ **Event-Driven Architecture** للمهام الخلفية.

### المخطط العام:
```mermaid
graph TD
    Client[Client Browser / Mobile] -->|HTTPS/JSON| Gateway[FastAPI Gateway]
    
    subgraph "The Core (Python)"
        Gateway -->|Auth & Validate| ServiceLayer[Service Logic]
        ServiceLayer -->|Query| DB[(Massive PostgreSQL)]
        ServiceLayer -->|Task| Redis[Redis Queue]
    end
    
    subgraph "AI Workforce"
        Redis -->|Consume| Worker1[Architect Agent]
        Redis -->|Consume| Worker2[Coder Agent]
        Redis -->|Consume| Worker3[Deployer Agent]
        Worker2 -->|Write| FileSys[FileSystem / R2]
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
*   [ ] إعداد PostgreSQL بتصميم Schema شامل.
*   [ ] بناء FastAPI Gateway مع نظام المصادقة (Auth).
*   [ ] إعداد الهيكل الأساسي للواجهة (Router & Layouts) للتبويبات الجديدة.

### المرحلة 2: محرك البناء (The Factory Engine)
*   [ ] برمجة وكلاء بناء الكود (Coder & Reviewer Agents).
*   [ ] إعداد خطوط الإنتاج (Pipelines) لبناء React و FastAPI.
*   [ ] ربط الـ Wizard بالـ Backend.

### المرحلة 3: السوق والاستوديو (Market & Studio)
*   [ ] بناء نظام تعدد البائعين (Vendor Dashboard).
*   [ ] تطوير أدوات الاستوديو (توليد الصور/النصوص).
*   [ ] دمج بوابات الدفع والمحافظ.

### المرحلة 4: الأتمتة والتشغيل (Ops & Scale)
*   [ ] أتمتة النشر على Cloudflare/Vercel.
*   [ ] إعداد نظام المراقبة (Monitoring) والسجلات.

---

## 6. قواعد العمل (Development Rules)
1.  **Source of Truth:** قاعدة البيانات هي المصدر الوحيد للحقيقة. لا تعتمد على الـ Frontend State في الأمور الحساسة.
2.  **Strict Typing:** يجب استخدام TypeScript في الواجهة و Pydantic في الباك اند بصرامة.
3.  **Security First:** كل API Endpoint يجب أن تتحقق من الصلاحيات.
4.  **Documentation:** أي ميزة جديدة يجب توثيقها في هذا المجلد قبل كتابة الكود.

---
*تم التحديث بتاريخ: 2026-02-06*
