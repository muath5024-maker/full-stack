Write-Host "🧪 اختبار النقاط الطرفية..." -ForegroundColor Cyan

# إعداد المتغيرات
$BaseUrl = "http://localhost:8000"

# دالة مساعدة للاختبار
function Test-Endpoint {
    param (
        [string]$Url,
        [string]$Method = "GET",
        [hashtable]$Body = @{},
        [string]$Name
    )
    
    try {
        if ($Method -eq "GET") {
            $response = Invoke-RestMethod -Uri $Url -Method Get -ErrorAction Stop
        } else {
            $jsonBody = $Body | ConvertTo-Json
            $response = Invoke-RestMethod -Uri $Url -Method Post -Body $jsonBody -ContentType "application/json" -ErrorAction Stop
        }
        Write-Host "✅ $Name : متصل" -ForegroundColor Green
        return $true
    } catch {
        Write-Host "❌ $Name : غير متصل ($($_.Exception.Message))" -ForegroundColor Red
        return $false
    }
}

# 1. اختبار API الأساسي
Test-Endpoint -Url "$BaseUrl/" -Name "API الرئيسي"

# 2. اختبار الذكاء الاصطناعي
Test-Endpoint -Url "$BaseUrl/api/products/" -Name "المنتجات (DB)"

# 3. اختبار قاعدة البيانات (عبر Products لأننا لم ننشئ endpoint health مخصص)
# Test-Endpoint -Url "$BaseUrl/api/health/db" -Name "قاعدة البيانات"

Write-Host "✅ الاختبارات اكتملت!" -ForegroundColor Cyan
