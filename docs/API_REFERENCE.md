# API Reference — Next.js API Routes

هذا الملف يوضّح واجهات الـ API المتاحة في التطبيق عبر Next.js API Routes.

## 1. Flow العام
- Client Components تتصل بالـ API Routes عبر `fetch` أو Server Actions.
- API Routes تتحقق من المصادقة/الصلاحية ثم تستدعي الخدمات الخارجية.
- Server Components يمكنها الوصول مباشرة لـ Supabase بدون API Routes.

## 2. Endpoints (مقترحة)

### AI Generation
- Path: `POST /api/ai/generate`
  - Body: `{ "prompt": string, "options": object }`
  - Behavior: يستدعي AI API (Gemini/etc) ويعيد النتيجة.
  - Response: JSON.

### Media Processing (مستقبلي)
- Path: `POST /api/media/process`
  - يعالج ملف multipart ويرفعه لـ Cloudflare R2.

### Project Configuration
- Path: `POST /api/project/create`
  - Body: `{ "type": string, "template": string, "features": string[] }`
  - يُنشئ تكوين مشروع جديد ويحفظه في Supabase.

## 3. الأمان
- Authentication: Next.js Middleware يتحقق من Supabase session.
- Authorization: RBAC على مستوى كل API Route.
- Rate Limiting: عبر Middleware أو خدمة خارجية.

## 4. Error Handling
- API Routes تعيد HTTP status codes مناسبة (400, 401, 403, 500).
- JSON response موحد: `{ "error": string, "details"?: object }`.

## 5. JSON الناتج للعميل (مثال `project config`)
```json
{
  "project_type": "site",
  "template": "landing-basic",
  "features": ["auth","payments"],
  "assets": {"logo":"/storage/logo.png"},
  "deployment": {"method":"vercel"}
}
```

---
*تم التحديث: 2026-02-11*
