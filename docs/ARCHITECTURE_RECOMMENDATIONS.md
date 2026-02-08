## توصيات معمارية لتنفيذ مشروع Kimi Agent

الهدف: تحويل المسودة الحالية إلى نظام قابل للإنتاج مع عزل الأسرار، اختبارات CI، وتدفق نشر موثوق.

1) فصل الأسرار وتخزينها
  - اجعل `workers` المصدر الوحيد للأسرار الحقيقية. لا تضع مفاتيح في أي ملف مشترك أو في `frontend` أو `backend`.
  - استخدم Vault (HashiCorp/Cloud provider secrets) أو GitHub Secrets لبيئات CI/CD.
  - أضف سياسة تدوير مفاتيح دورية (rotate keys) وعمليات إبطال (revoke) للمفتاح المتسرّب.

2) CI/CD واختبارات تلقائية
  - استعمل GitHub Actions للتجميع، الاختبار، وفحص الأمان (كتبت workflow أساسي).
  - أضف خطوتين: `build` (docker image) و`e2e` (اختبارات end-to-end) التي تعمل ضد بيئة اختبارية مؤقتة (docker-compose --env-file workers/.env.test).
  - شغّل `pre-commit` / `detect-secrets` في CI قبل الدمج.

3) Workers كخدمات معزولة
  - صمّم واجهات بسيطة (`/internal/ai/generate`, `/internal/media/process`) مع تحقق auth داخلي (API key أو mTLS بين Gateway وWorkers).
  - سجّل الوصول للأسرار ضمن Workers فقط ولا تمرّر المفاتيح إلى أي مكوّن آخر.

4) نشر وبيئات
  - أنشئ 3 بيئات: `dev` (local/docker), `staging` (preview)، `prod`.
  - استخدم docker-compose للتطوير المحلي وKubernetes أو Cloud Run / App Service للإنتاج حسب الحجم.

5) قواعد البيانات والهجرات
  - استعمل `SQLModel` أو `SQLAlchemy` مع `Alembic` للهجرات.
  - لا تخزن مفاتيح DB في repo؛ استوردها عبر متغيرات البيئة في Workers فقط.

6) المراقبة والتتبّع
  - أضف تجميع لوجز مركزي (e.g., Loki/LogDNA) وTracing (OpenTelemetry) لربط طلبات الـ Gateway بالعمليات في Workers.

7) الأمان والحد من الوصول
  - قيّد الوصول بين الخدمات عبر شبكات داخلية (Docker network أو VPC).
  - أضف rate-limiting وauth على Gateway (JWT/RBAC) لوقاية النظام.

8) اختبارات و جودة الكود
  - زيادة تغطية الاختبارات: backend unit tests, frontend unit + integration, worker unit tests (mock external APIs).
  - أضف linting/formatting (flake8/ruff, black) وVitest/RTL للواجهة.

9) قوالب جاهزة وميزات أساسية أولية
  - ابدأ بقالب واحد كامل (Landing + Admin) يشمل: auth بسيط، CRUD للـ project JSON، وCI لنشر نسخة تجريبية.
  - بعد استقرار القالب، صمّم قوالب إضافية كرزمة قابلة للتكرار.

10) خطة تصعيد (MVP → v1)
  - MVP: Landing + Admin + Worker AI (CrewAI integration) + Supabase backend + basic CI.
  - v1: E2E، media pipeline حقيقية، multi-tenant support، وثائق نشر مطوّلة.

ملف المراجع هذا يوفّر قائمة خطوات تنفيذية قصيرة؛ إذا توافق أبدأ بتنفيذ "قالب واحد كامل" وتهيئة CI/CD لنشر تجريبي على `staging`.
