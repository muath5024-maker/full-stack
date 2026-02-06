# نظام الدومينات الفرعية الديناميكية - mbuy

## 📋 نظرة عامة

تم إعداد نظام دومينات فرعية ديناميكية يسمح بإنشاء متاجر مستقلة لكل تاجر.

---

## 🌐 بنية الدومينات

### الموقع الرئيسي:
- `https://mbuy.pro` - الصفحة الرئيسية

### دومينات المتاجر:
- `https://store1.mbuy.pro` - متجر 1
- `https://ahmed-shop.mbuy.pro` - متجر أحمد
- `https://any-name.mbuy.pro` - أي اسم متجر

### دومينات خاصة:
- `https://dashboard.mbuy.pro` - لوحة التحكم
- `https://admin.mbuy.pro` - الإدارة
- `https://api.mbuy.pro` - API Backend

---

## ✅ الخطوات المنفذة:

### 1. الملفات المنشأة:
- ✅ `src/utils/subdomain.ts` - وظائف التعامل مع الدومينات
- ✅ `src/hooks/use-subdomain.ts` - React Hook للدومينات
- ✅ `src/pages/StorePage.tsx` - صفحة المتجر الفرعي
- ✅ `src/App.tsx` - تحديث للتوجيه التلقائي

### 2. التعديلات:
- ✅ App.tsx يتحقق من نوع الدومين
- ✅ يعرض StorePage للدومينات الفرعية
- ✅ يعرض الموقع الرئيسي للدومين الأساسي

---

## 🚀 كيفية الاستخدام:

### للتطوير المحلي:
```bash
# الموقع الرئيسي
http://localhost:5173

# متجر تجريبي
http://localhost:5173?store=ahmed
http://localhost:5173?store=test-shop
```

### على الإنتاج:
```bash
# الموقع الرئيسي
https://mbuy.pro

# المتاجر
https://ahmed.mbuy.pro
https://store1.mbuy.pro
```

---

## ⚙️ إعدادات Cloudflare DNS المطلوبة:

### في صفحة DNS، أضف:

```
Type: CNAME
Name: *
Target: mbuy-website.pages.dev
Proxy: ✅ Proxied (برتقالي)
```

هذا يسمح بأي دومين فرعي!

---

## 📊 بنية بيانات المتجر (Store Data):

يجب أن يرجع API البيانات بهذا الشكل:

```json
{
  "id": "123",
  "name": "متجر أحمد",
  "slug": "ahmed",
  "logo": "https://example.com/logo.png",
  "banner": "https://example.com/banner.jpg",
  "description": "أفضل المنتجات الإلكترونية",
  "owner": {
    "name": "أحمد محمد",
    "email": "ahmed@example.com"
  },
  "contact": {
    "phone": "+966501234567",
    "email": "info@ahmed-shop.com",
    "address": "الرياض، السعودية"
  },
  "products": [],
  "settings": {
    "theme": "dark",
    "currency": "SAR"
  }
}
```

---

## 🔧 التخصيص:

### تغيير API endpoint:

في `src/utils/subdomain.ts`:
```typescript
const response = await fetch(`https://api.mbuy.pro/stores/${storeName}`);
```

استبدل `https://api.mbuy.pro` بـ API الخاص بك.

---

## 🎨 التصميم:

يمكن تخصيص صفحة المتجر في:
- `src/pages/StorePage.tsx`

كل متجر يحصل على:
- ✅ شعار خاص
- ✅ بانر خاص
- ✅ معلومات مخصصة
- ✅ منتجات خاصة

---

## 🧪 الاختبار:

### 1. اختبار محلي:
```bash
npm run dev

# افتح:
http://localhost:5173?store=test
```

### 2. بناء ورفع:
```bash
npm run build
wrangler pages deploy dist --project-name mbuy-website
```

### 3. اختبار الإنتاج:
- افتح أي دومين فرعي: `https://test.mbuy.pro`

---

## 📝 ملاحظات:

1. **الدومينات الخاصة محجوزة:**
   - www, dashboard, admin, api, app
   - لن تظهر كمتاجر

2. **التحقق من صحة الاسم:**
   - فقط أحرف صغيرة، أرقام، وشرطة (-)
   - من 3 إلى 30 حرف

3. **معالجة الأخطاء:**
   - متجر غير موجود → رسالة خطأ + زر العودة
   - مشكلة تحميل → رسالة خطأ

---

## 🔐 الأمان:

- ✅ التحقق من صحة أسماء المتاجر
- ✅ معالجة أخطاء API
- ✅ Cloudflare Proxy للحماية
- ✅ SSL تلقائي لكل دومين فرعي

---

## 🎯 الخطوات التالية:

1. ✅ **Cloudflare DNS** - إضافة Wildcard CNAME
2. ⏳ **Backend API** - بناء API لإدارة المتاجر
3. ⏳ **قاعدة البيانات** - تخزين بيانات المتاجر
4. ⏳ **لوحة التحكم** - إنشاء/تعديل المتاجر
5. ⏳ **نظام المنتجات** - إضافة المنتجات
6. ⏳ **نظام الدفع** - Moyasar/Tap integration

---

تم الإعداد بنجاح! 🎉
