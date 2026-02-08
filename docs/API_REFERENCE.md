# API Reference — Gateway ↔ Workers

هذا الملف يوضّح الواجهات بين الـ API Gateway (FastAPI) وWorkers المتخصصة.

## 1. Flow العام
- Frontend يتصل بالـ Gateway عبر HTTPS.
- Gateway يتحقق من المصادقة/الصلاحية ثم يستدعي الـ Worker المناسب داخل الشبكة الداخلية.

## 2. Endpoints

### AI Proxy
- Path (Gateway): `POST /api/ai/generate`
  - Body: `{ "prompt": string, "options": object }`
  - Behavior: Gateway يعيد توجيه الطلب إلى `worker-ai` على `/internal/ai/generate`.
  - Response: يمرر Gateway نفس استجابة الـ Worker (JSON).

### Media Proxy (example)
- Path (Gateway): `POST /api/media/process`
  - Gateway يجب أن تمرر ملف multipart إلى `worker-media` `/internal/media/process`.

### Deploy Proxy (example)
- Path (Gateway): `POST /api/deploy/run`
  - Body: `{ "repo_url": string, "ref": string }`
  - Gateway يعيد توجيه الطلب إلى `worker-deploy` `/internal/deploy/run`.

## 3. الشبكة والأمان
- اعتماد: Workers تعمل داخل شبكة داخلية (Docker network). استخدم أسماء الخدمات (`worker-ai`) كـ host داخل docker-compose.
- Authentication: Gateway يتحقق من JWT/session قبل أي مكالمة لWorkers.
- Authorization between Gateway and Workers:
  - خيار بسيط: استخدام header سري داخلي `X-Internal-Token` (يقرأ من `workers/.env`) ويحققه الـ worker.
  - خيار أقوى: Gateway يصدر JWT مخصوصاً للـ Worker ويتحقق العامل من توقيع JWT.

## 4. Error handling
- Gateway يجب أن يعيد 502 Bad Gateway عند فشل الاتصال بالـ Worker.
- Gateway يمكنه تنفيذ retry بسيط (1 retry) قبل إرجاع الخطأ.

## 5. JSON الناتج للعميل (مثال `project config`)
```json
{
  "project_type": "site",
  "template": "landing-basic",
  "features": ["auth","payments"],
  "assets": {"logo":"/storage/logo.png"},
  "deployment": {"method":"docker-compose"}
}
```
