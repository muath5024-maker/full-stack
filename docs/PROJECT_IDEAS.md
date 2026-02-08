## فكرة المشروع: Kimi Agent Website

**الملخص:**
الصفحة الرئيسية الحالية هي موقع تعريفي يعرض الأعمال، الخدمات، طرق التواصل، ومرجع للموقع. تحت هذا الاسم توجد مجموعة تبويبات تمثل مشاريع/خدمات تابعة للعلامة (ليست مواقع منفصلة)، كل تبويب يمثل مشروعاً أو خدمة قابلة للتهيئة والتسليم للعميل.

### الوظائف الأساسية

- الصفحة الرئيسية: صفحة تعريفية عن الأعمال، المنتجات، تواصل، ومرجع.
- تبويبات المشاريع (كل تبويب = مشروع تابع للعلامة):
  - إنشاء موقع إلكتروني: قالب جاهز (React + Vite + TypeScript + Tailwind) + Backend Worker (Python + Supabase) يحتفظ بالأسرار ويتواصل مع الواجهة. العميل يختار نوع المنتج (موقع، تطبيق ويب، منصة متعددة البائعين، صفحة هبوط، هوية بصرية، لوحة تحكم). بعد الاختيار يتم توليد JSON وصفي للمشروع وتسليمها للعميل.
  - الاستوديو: أتمتة توليد/تحرير محتوى (صور، فيديو، موشن جرافيك، UGC، شعارات، حملات إعلانية).
  - المتجر الإلكتروني: قوالب متاجر إلكترونية جاهزة وخيارات تخصيص.
  - المنتجات: صفحة تعرض خدماتنا بالتفصيل وأسعار مبدئية (إن أمكن).
  - دليل المنصة: وثائق وشروحات ومقاطع تعليمية لكل منتج/خدمة.
  - تواصل (أعمال): قسم ضمن الصفحة الرئيسية يعرض منصات التواصل والإيميل وطرق التواصل التجاري.

### المتطلبات التقنية (مقترح مختصر)

- Frontend:
  - React 19 + Vite + TypeScript + Tailwind CSS
  - i18n وRTL: `react-i18next` + إعداد `dir="rtl"` أو `tailwindcss-rtl`
  - State & Data: `@tanstack/react-query` (data fetching/caching) و`zustand` للحالة المحلية
  - Forms: `react-hook-form` + `zod` للـ validation
  - UI primitives: `shadcn/ui` (Radix + Tailwind) أو `Chakra UI` مع دعم RTL

- Backend / Workers:
  - Python + FastAPI (Gateway)
  - Supabase: Auth, PostgreSQL (DB), Storage
  - Worker service (Python) للتعامل مع مفاتيح السر (secrets) واستدعاء خدمات AI
  - ORM/Higher-level: `SQLModel` أو `SQLAlchemy` (مع Alembic للهجرات)
  - Queue / Tasks: Redis + `dramatiq` أو `rq` أو `celery`
  - WebSockets: FastAPI websockets + Redis pub/sub للـ scaling

- AI & Media:
  - واجهات: `crewai`, `google-generativeai`, `groq` (كما في المتطلبات الحالية)
  - واجهة تجريد (اختياري): `langchain` للتعامل الموحد مع النماذج
  - تخزين نتائج الوسائط: Supabase Storage أو Cloudflare R2

- Infra & DevOps:
  - Docker + docker-compose (ملفات موجودة في المشروع)
  - CI: GitHub Actions (build/test/deploy)
  - Migrations: Alembic

### تنسيق إخراج العميل

عند اكتمال تهيئة المشروع عبر واجهة الإنشاء، يولد النظام ملف JSON يتضمن:
- `project_type`: (site|webapp|multivendor|landing|branding|dashboard)
- `template`: قالب مختار
- `features`: قائمة ميزات وتكاملات (auth, payments, media)
- `assets`: مراجع للصور والشعارات (paths)
- `supabase_config`: إعدادات غير حساسة (endpoints) — المفاتيح الحساسة تبقى في backend worker
- `deployment`: تفضيلات النشر (docker-compose, cloud provider)

### بنية مقترحة للمجلدات (مختصر)

- `frontend/` — قوالب React جاهزة لكل نوع مشروع
- `backend/` — FastAPI gateway (Auth, API endpoints)
- `workers/` — خدمات agents وعمليات التوليد والتعامل مع مفاتيح السر
- `docs/` — الوثائق والدلائل (هذا الملف هنا)

### ملاحظات تنفيذية سريعة

- يجب أن يكون `worker` هو الوحيد الحاصل على مفاتيح الخدمات الخارجية؛ الواجهة تتعامل مع الـ worker عبر API / WebSocket.
- ابدأ بإنشاء قالب جاهز واحد (مثلاً: Landing + Admin dashboard) ثم عمّم الأنماط.

---

هذه المسودة محفوظة هنا كـ مرجع أولي. بعد تأكيدك أستطيع إنشاء ملفات scaffold للواجهة الفرعية `multivendor-platform/frontend` (ملف `package.json`، `App.jsx` ابتدائي، و`hooks/useWebSocket.js`) وتوثيق أوامر التشغيل.
