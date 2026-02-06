#!/bin/bash
echo "🚀 بدء نشر المنصة..."

# 1. تشغيل Docker Compose
docker-compose up -d

# 2. انتظار بدء الخدمات
sleep 10

# 3. تشغيل migrations
# Note: This implies backend/app/utils/db_migration.py exists. it currently does not.
docker-compose exec fastapi python -m app.utils.db_migration

# 4. نشر Worker على Cloudflare
cd workers/api-proxy
wrangler publish

# 5. بناء Frontend
cd ../../frontend
npm run build

echo "✅ النشر اكتمل!"
