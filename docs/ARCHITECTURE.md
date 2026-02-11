# وثيقة العمارة البرمجية (System Architecture)

بناءً على التوجيهات الاستراتيجية، تم اعتماد هيكلية تعتمد على **Next.js 15** كإطار عمل موحد للواجهة الأمامية والخلفية.

## 1. المكدس التقني (Tech Stack)

### الإطار الرئيسي (Core Framework)
*   **الإطار:** Next.js 15 (App Router).
*   **اللغة:** TypeScript.
*   **الاستضافة:** Vercel / Cloudflare Pages (Global CDN).
*   **المكونات:** shadcn/ui (Radix UI + Tailwind CSS).
*   **الحركة والتأثيرات:** GSAP + @gsap/react.
*   **الأيقونات:** Lucide React.

### طبقة البيانات والتخزين (Data & Storage Layer)
*   **البيانات العلائقية:** Supabase (PostgreSQL) - لتخزين المستخدمين، المشاريع، والبيانات النصية.
*   **تخزين الملفات:** Cloudflare R2 - للكود المولد، الصور، والنسخ الاحتياطية (Zero Egress Fees).
*   **بحث المتجهات (اختياري/مستقبلي):** pgvector داخل Supabase.

### التفاعل والمراقبة (Engagement & Ops)
*   **المصادقة:** Supabase Auth (Google/GitHub).
*   **الإشعارات:** Firebase Cloud Messaging (FCM).
*   **المراقبة:** لوحة تحكم إدارية (Admin Dashboard) مخصصة.

## 2. هيكلية المجلدات (Project Structure)

```text
/
├── app/                    # Next.js 15 Application
│   ├── src/
│   │   ├── app/            # App Router pages & layouts
│   │   ├── components/     # shadcn/ui & custom components
│   │   ├── sections/       # Page sections
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utilities & Supabase client
│   │   ├── utils/          # Helper functions
│   │   ├── types/          # TypeScript type definitions
│   │   └── views/          # View components
│   ├── public/             # Static assets
│   ├── next.config.ts      # Next.js configuration
│   ├── tailwind.config.js  # Tailwind CSS configuration
│   └── tsconfig.json       # TypeScript configuration
├── docs/                   # Documentation
└── .gitignore
```

## 3. تدفق البيانات (Data Flow)
1.  **العميل (Browser):** يرسل طلب → Next.js Server Components / API Routes.
2.  **Next.js Server:** يتعامل مع الطلب (Auth, Data Fetching) → Supabase / External APIs.
3.  **النتيجة:** Server Components ترسل HTML جاهز → Client Components تضيف التفاعلية.
4.  **البيانات اللحظية:** Supabase Realtime للتحديثات الفورية.

## 4. مبادئ التصميم
- **Server Components أولاً:** لأداء أفضل وتقليل حجم JavaScript المرسل للعميل.
- **Client Components عند الضرورة:** للتفاعلية (نماذج، أحداث، حالات) مع `"use client"`.
- **Next.js Image Optimization:** لتحسين أداء الصور تلقائياً.
- **TypeScript Strict Mode:** لضمان أمان الأنواع في جميع أنحاء المشروع.

---
*تم التحديث: 2026-02-11 — الانتقال الكامل إلى Next.js 15*
