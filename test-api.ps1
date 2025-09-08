# Caretaker API Test Script
Write-Host "🚀 Starting API Tests..." -ForegroundColor Green

$baseUrl = "http://localhost:3000/api"

try {
    # 1. Test Registration
    Write-Host "`n📝 Testing Registration..." -ForegroundColor Yellow
    $registerResponse = Invoke-WebRequest -Uri "$baseUrl/auth/register" -Method POST -Headers @{"Content-Type"="application/json"} -Body '{"email":"testuser@example.com","password":"password123","firstName":"Test","lastName":"User","phone":"+1234567890"}'
    $registerData = $registerResponse.Content | ConvertFrom-Json
    Write-Host "✅ Registration successful! User ID: $($registerData.user.id)" -ForegroundColor Green

    # 2. Test Login
    Write-Host "`n🔐 Testing Login..." -ForegroundColor Yellow
    $loginResponse = Invoke-WebRequest -Uri "$baseUrl/auth/login" -Method POST -Headers @{"Content-Type"="application/json"} -Body '{"email":"testuser@example.com","password":"password123"}'
    $loginData = $loginResponse.Content | ConvertFrom-Json
    $token = $loginData.access_token
    Write-Host "✅ Login successful! Got JWT token" -ForegroundColor Green

    # 3. Create Test Caretakers
    Write-Host "`n👥 Creating test caretakers..." -ForegroundColor Yellow
    
    $caretakers = @(
        '{"firstName":"Alice","lastName":"Johnson","email":"alice.johnson@example.com","phone":"+1234567891","qualifications":"Licensed RN with pediatric experience","experience":"5 years in pediatric care","hourlyRate":28.50}',
        '{"firstName":"Bob","lastName":"Smith","email":"bob.smith@example.com","phone":"+1234567892","qualifications":"Certified nursing assistant","experience":"3 years in elderly care","hourlyRate":22.00}',
        '{"firstName":"Carol","lastName":"Davis","email":"carol.davis@example.com","phone":"+1234567893","qualifications":"Licensed practical nurse","experience":"7 years in home healthcare","hourlyRate":25.75}'
    )

    foreach ($caretaker in $caretakers) {
        $response = Invoke-WebRequest -Uri "$baseUrl/caretakers" -Method POST -Headers @{"Content-Type"="application/json"; "Authorization"="Bearer $token"} -Body $caretaker
        $data = $response.Content | ConvertFrom-Json
        Write-Host "✅ Created caretaker: $($data.firstName) $($data.lastName)" -ForegroundColor Green
    }

    # 4. Test Search
    Write-Host "`n🔍 Testing Search..." -ForegroundColor Yellow
    $searchResponse = Invoke-WebRequest -Uri "$baseUrl/caretakers?search=pediatric" -Headers @{"Authorization"="Bearer $token"}
    $searchData = $searchResponse.Content | ConvertFrom-Json
    Write-Host "✅ Search for 'pediatric' found $($searchData.total) results" -ForegroundColor Green
    $searchData.data | ForEach-Object { Write-Host "   - $($_.firstName) $($_.lastName)" -ForegroundColor Cyan }

    # 5. Test Filtering
    Write-Host "`n🎯 Testing Filtering..." -ForegroundColor Yellow
    $filterResponse = Invoke-WebRequest -Uri "$baseUrl/caretakers?minHourlyRate=25&maxHourlyRate=30" -Headers @{"Authorization"="Bearer $token"}
    $filterData = $filterResponse.Content | ConvertFrom-Json
    Write-Host "✅ Filter by hourly rate (25-30) found $($filterData.total) results" -ForegroundColor Green
    $filterData.data | ForEach-Object { Write-Host "   - $($_.firstName) $($_.lastName): $($_.hourlyRate)/hour" -ForegroundColor Cyan }

    # 6. Test Pagination
    Write-Host "`n📄 Testing Pagination..." -ForegroundColor Yellow
    $pageResponse = Invoke-WebRequest -Uri "$baseUrl/caretakers?page=1&limit=2" -Headers @{"Authorization"="Bearer $token"}
    $pageData = $pageResponse.Content | ConvertFrom-Json
    Write-Host "✅ Pagination test: Page $($pageData.page) of $($pageData.totalPages), showing $($pageData.data.Count) of $($pageData.total) total" -ForegroundColor Green

    # 7. Test Sorting
    Write-Host "`n📊 Testing Sorting..." -ForegroundColor Yellow
    $sortResponse = Invoke-WebRequest -Uri "$baseUrl/caretakers?sortBy=hourlyRate&sortOrder=DESC" -Headers @{"Authorization"="Bearer $token"}
    $sortData = $sortResponse.Content | ConvertFrom-Json
    Write-Host "✅ Sorted by hourly rate (descending):" -ForegroundColor Green
    $sortData.data | ForEach-Object { Write-Host "   - $($_.firstName) $($_.lastName): $($_.hourlyRate)/hour" -ForegroundColor Cyan }

    # 8. Test Combined Filters
    Write-Host "`n🎛️ Testing Combined Filters..." -ForegroundColor Yellow
    $combinedResponse = Invoke-WebRequest -Uri "$baseUrl/caretakers?search=care&sortBy=firstName&sortOrder=ASC" -Headers @{"Authorization"="Bearer $token"}
    $combinedData = $combinedResponse.Content | ConvertFrom-Json
    Write-Host "✅ Combined search + sort found $($combinedData.total) results" -ForegroundColor Green

    Write-Host "`n🎉 All tests passed successfully!" -ForegroundColor Green

} catch {
    Write-Host "`n❌ Test failed: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Make sure your server is running on http://localhost:3000" -ForegroundColor Yellow
}
