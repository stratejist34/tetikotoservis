# final-fix-all.ps1
# Tüm config ve blog dosyalarını güncelle

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  KOMPLE SISTEM GUNCELLEMESI" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

$errors = 0
$success = 0

# ADIM 1: config.ts güncelle
Write-Host "[1/3] config.ts guncelleniyor..." -ForegroundColor Yellow

$configPath = "src\content\config.ts"
$newConfigPath = "config.ts"  # İndirilen dosya

if (Test-Path $newConfigPath) {
    if (Test-Path $configPath) {
        # Yedek al
        Copy-Item $configPath "$configPath.backup" -Force
        Write-Host "      Yedek alindi: $configPath.backup" -ForegroundColor Gray
    }
    
    # Yeni config'i kopyala
    Copy-Item $newConfigPath $configPath -Force
    Write-Host "      [OK] config.ts guncellendi" -ForegroundColor Green
    Write-Host "      Desteklenen formatlar:" -ForegroundColor Cyan
    Write-Host "        - date / pubDate (her ikisi)" -ForegroundColor White
    Write-Host "        - category / categories (her ikisi)" -ForegroundColor White
    Write-Host "        - image / coverImage (her ikisi)" -ForegroundColor White
    $success++
} else {
    Write-Host "      [HATA] Yeni config.ts bulunamadi!" -ForegroundColor Red
    Write-Host "      Once indirin: config.ts" -ForegroundColor Yellow
    $errors++
}

# ADIM 2: slug.astro güncelle
Write-Host "`n[2/3] slug.astro guncelleniyor..." -ForegroundColor Yellow

$slugPath = "src\pages\blog\[slug].astro"
$newSlugPath = "slug-FINAL-HATASIZ.astro"  # İndirilen dosya

if (Test-Path $newSlugPath) {
    if (Test-Path $slugPath) {
        # Yedek al
        Copy-Item $slugPath "$slugPath.backup" -Force
        Write-Host "      Yedek alindi: $slugPath.backup" -ForegroundColor Gray
    }
    
    # Yeni slug'ı kopyala
    Copy-Item $newSlugPath $slugPath -Force
    Write-Host "      [OK] slug.astro guncellendi" -ForegroundColor Green
    Write-Host "      Ozellikler:" -ForegroundColor Cyan
    Write-Host "        - Hem coverImage hem image destegi" -ForegroundColor White
    Write-Host "        - Hem date hem pubDate destegi" -ForegroundColor White
    Write-Host "        - Hem category hem categories destegi" -ForegroundColor White
    Write-Host "        - Turkce karakter slug destegi" -ForegroundColor White
    $success++
} else {
    Write-Host "      [HATA] Yeni slug.astro bulunamadi!" -ForegroundColor Red
    Write-Host "      Once indirin: slug-FINAL-HATASIZ.astro" -ForegroundColor Yellow
    $errors++
}

# ADIM 3: Schema component'leri güncelle
Write-Host "`n[3/3] Schema component'leri guncelleniyor..." -ForegroundColor Yellow

$schemaFiles = @(
    @{
        New = "LocalBusinessSchema-DUZELTILMIS.astro"
        Old = "src\components\LocalBusinessSchema.astro"
    },
    @{
        New = "FAQSchema.astro"
        Old = "src\components\FAQSchema.astro"
    },
    @{
        New = "BreadcrumbSchema.astro"
        Old = "src\components\BreadcrumbSchema.astro"
    }
)

foreach ($file in $schemaFiles) {
    if (Test-Path $file.New) {
        $dir = Split-Path $file.Old -Parent
        if (-not (Test-Path $dir)) {
            New-Item -ItemType Directory -Path $dir -Force | Out-Null
        }
        
        if (Test-Path $file.Old) {
            Copy-Item $file.Old "$($file.Old).backup" -Force
        }
        
        Copy-Item $file.New $file.Old -Force
        Write-Host "      [OK] $(Split-Path $file.Old -Leaf)" -ForegroundColor Green
        $success++
    } else {
        Write-Host "      [UYARI] $($file.New) bulunamadi" -ForegroundColor Yellow
    }
}

# i30 blog düzeltme
Write-Host "`n[BONUS] i30 blog duzeltiliyor..." -ForegroundColor Yellow

$i30Wrong = "src\content\blog\hyundai-i30-periyodik-bakim-fiyatlari\index.md"
$i30Correct = "src\content\blog\hyundai-i30-periyodik-bakim-fiyatlari.md"

if (Test-Path $i30Wrong) {
    Write-Host "      Dosya yapisi duzeltiliyor..." -ForegroundColor White
    Move-Item $i30Wrong $i30Correct -Force
    Remove-Item "src\content\blog\hyundai-i30-periyodik-bakim-fiyatlari" -Recurse -Force
    Write-Host "      [OK] i30 dosya yapisi duzeltildi" -ForegroundColor Green
}

if (Test-Path $i30Correct) {
    $content = Get-Content $i30Correct -Raw -Encoding UTF8
    
    # coverImage path'i düzelt
    if ($content -match 'coverImage:\s*"/images/hyundai-i30') {
        $slug = "hyundai-i30-periyodik-bakim-fiyatlari"
        $content = $content -replace 'coverImage:\s*"[^"]*"', "coverImage: `"/images/blog/$slug.avif`""
        Set-Content -Path $i30Correct -Value $content -Encoding UTF8 -NoNewline
        Write-Host "      [OK] i30 coverImage path'i duzeltildi" -ForegroundColor Green
    }
}

# RAPOR
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  RAPOR" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "Basarili: $success" -ForegroundColor Green
Write-Host "Hatalar: $errors" -ForegroundColor $(if ($errors -gt 0) { "Red" } else { "Green" })

if ($errors -eq 0) {
    Write-Host "`n[BASARILI] Tum guncellemeler tamamlandi!`n" -ForegroundColor Green
    
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "  DESTEKLENEN FORMATLAR" -ForegroundColor Cyan
    Write-Host "========================================`n" -ForegroundColor Cyan
    
    Write-Host "TARIH:" -ForegroundColor Yellow
    Write-Host "  date: 2025-01-13          (eski format)" -ForegroundColor White
    Write-Host "  pubDate: `"2025-01-13`"     (yeni format)" -ForegroundColor White
    
    Write-Host "`nKATEGORI:" -ForegroundColor Yellow
    Write-Host "  categories: [`"a`", `"b`"]  (eski format)" -ForegroundColor White
    Write-Host "  category: `"bakim`"         (yeni format)" -ForegroundColor White
    
    Write-Host "`nIMAJ:" -ForegroundColor Yellow
    Write-Host "  coverImage: `"...`"         (eski format)" -ForegroundColor White
    Write-Host "  image: `"...`"              (yeni format)" -ForegroundColor White
    
    Write-Host "`nHER IKISI DE CALISIR! Eski bloglar etkilenmez!`n" -ForegroundColor Green
    
} else {
    Write-Host "`n[DIKKAT] Bazi dosyalar eksik!" -ForegroundColor Yellow
    Write-Host "Once su dosyalari indirin:" -ForegroundColor White
    Write-Host "  - config.ts" -ForegroundColor Cyan
    Write-Host "  - slug-FINAL-HATASIZ.astro" -ForegroundColor Cyan
    Write-Host "  - LocalBusinessSchema-DUZELTILMIS.astro" -ForegroundColor Cyan
    Write-Host "  - FAQSchema.astro" -ForegroundColor Cyan
    Write-Host "  - BreadcrumbSchema.astro`n" -ForegroundColor Cyan
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  TEST" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "Dev server'i yeniden baslatin:" -ForegroundColor Yellow
Write-Host "  Ctrl+C (durdur)" -ForegroundColor Gray
Write-Host "  npm run dev (baslat)`n" -ForegroundColor Gray

Write-Host "Tum blog yazilari calisacak:" -ForegroundColor Green
Write-Host "  - Eski bloglar (coverImage, date, categories)" -ForegroundColor White
Write-Host "  - Yeni bloglar (image, pubDate, category)" -ForegroundColor White

Write-Host "`n========================================`n" -ForegroundColor Cyan
