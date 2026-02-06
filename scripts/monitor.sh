#!/bin/bash
echo "📊 مراقبة النظام..."

# 1. حالة الحاويات
docker-compose ps

# 2. سجلات FastAPI
docker-compose logs fastapi --tail=20

# 3. استخدام Redis
docker-compose exec redis redis-cli info memory

# 4. حالة Supabase
curl -f "http://localhost:5432/health" || echo "⚠️ Supabase"

echo "🔍 المراقبة نشطة..."
