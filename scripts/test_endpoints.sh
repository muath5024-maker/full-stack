#!/bin/bash
echo "🧪 اختبار النقاط الطرفية..."

# اختبار API الأساسي
curl -X GET "http://localhost:8000/" || echo "❌ API غير نشط"

# اختبار الذكاء الاصطناعي
curl -X POST "http://localhost:8000/api/ai/generate-description" \
  -H "Content-Type: application/json" \
  -d '{"product_name": "لابتوب جديد"}' || echo "❌ خدمة الذكاء الاصطناعي"

# اختبار قاعدة البيانات
curl -X GET "http://localhost:8000/api/health/db" || echo "❌ قاعدة البيانات"

echo "✅ الاختبارات اكتملت!"
