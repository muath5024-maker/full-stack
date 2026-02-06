# وثيقة العمارة البرمجية (System Architecture)

بناءً على التوجيهات الاستراتيجية، تم اعتماد هيكلية تعتمد على **فصل المهام (Separation of Concerns)** لضمان الأداء العالي، الأمان، وقابلية التوسع.

## 1. المكدس التقني (Tech Stack)

### الواجهة الأمامية (Frontend Layer)
*   **الإطار:** React 19 + Vite.
*   **اللغة:** TypeScript.
*   **الاستضافة:** Cloudflare Pages (Global CDN).
*   **المكونات:** shadcn/ui (Radix UI + Tailwind CSS).
*   **إدارة الحالة:** Supabase Realtime (للشرائط التقدم والإشعارات).
*   **المحرر:** Tiptap (لكتابة الكود/المحتوى).

### البوابة الخلفية (API Gateway Layer)
*   **الإطار:** FastAPI (Python).
*   **الوظيفة:**
    *   نقطة الدخول الموحدة (Gateway).
    *   مُصادقة المستخدمين (Auth Guard).
    *   إدارة طوابير الانتظار (Rate Limiting & Queuing).
*   **الاستضافة:** (مبدئياً Local/Docker، مستقبلاً Cloud Run أو مشابه).

### طبقة العمال والذكاء (Worker / Agentic Layer) - "القلب"
*   **اللغة:** Python.
*   **المحرك:** CrewAI + Google Gemini API.
*   **إدارة المهام الخلفية:** Trigger.dev (بديل Celery الحديث).
*   **الوظيفة:** تنفيذ سلاسل التفكير، توليد الكود، اتخاذ القرارات.

### طبقة البيانات والتخزين (Data & Storage Layer)
*   **البيانات العلائقية:** Supabase (PostgreSQL) - لتخزين المستخدمين، المشاريع، والبيانات النصية.
*   **تخزين الملفات:** Cloudflare R2 - للكود المولد، الصور، والنسخ الاحتياطية (Zero Egress Fees).
*   **بحث المتجهات (اختياري/مستقبلي):** pgvector داخل Supabase.

### التفاعل والمراقبة (Engagement & Ops)
*   **المصادقة:** Supabase Auth (Google/GitHub).
*   **الإشعارات:** Firebase Cloud Messaging (FCM).
*   **المراقبة:** لوحة تحكم إدارية (Admin Dashboard) مخصصة.

## 2. هيكلية المجلدات المقترحة (Project Structure)

```text
/
├── frontend/           # React 19 + Vite App
│   ├── src/
│   │   ├── components/ # shadcn/ui components
│   │   ├── lib/        # Supabase client, utils
│   │   └── pages/      # Client & Admin Dashboards
│   └── ...
├── backend/            # FastAPI Gateway
│   ├── app/
│   │   ├── routers/    # API Endpoints
│   │   └── core/       # Config & Security
│   └── ...
├── worker/             # Python AI Agents (CrewAI)
│   ├── agents/         # Agent definitions
│   ├── tasks/          # Task definitions
│   └── trigger/        # Trigger.dev jobs
├── docs/               # Documentation
└── docker-compose.yml  # Local Development Orchestration
```

## 3. تدفق البيانات (Data Flow)
1.  **العميل (Frontend):** يرسل طلب "إنشاء مشروع" -> API Gateway.
2.  **البوابة (API):** تتحقق من التوكن (Supabase Auth) -> تسجل الطلب في DB -> تدفع المهمة لـ Trigger.dev.
3.  **العامل (Worker):** يلتقط المهمة -> يشغل وكلاء CrewAI (Gemini) -> يكتب النتيجة في Cloudflare R2 -> يحدث الحالة في Supabase.
4.  **العميل (Frontend):** يتلقى تحديث لحظي (Realtime) باكتمال المهمة.
