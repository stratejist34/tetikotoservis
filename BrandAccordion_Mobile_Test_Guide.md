# BrandAccordion Mobil Uyumluluk Test ve Doğrulama Kılavuzu

## Test Senaryoları ve Kontrol Listesi

### 1. Temel Mobil Testler

#### ✅ Dokunmatik Hedef Boyutları
- [ ] **48x48px Minimum**: Tüm tıklanabilir elemanların minimum 48x48px boyutunda olduğunun doğrulanması
- [ ] **Genişletilmiş Hit Area**: Butonların etrafında 8px genişletilmiş tıklanabilir alan
- [ ] **Aralıklar**: Butonlar arasında minimum 8px boşluk
- [ ] **Test Yöntemi**: Parmak izi testi - parmakla kolayca tıklanabiliyor mu?

#### ✅ Layout ve Responsiveness
- [ ] **320px Genişlik**: En dar ekran (iPhone 5/SE) üzerinde test
- [ ] **375px Genişlik**: Standart mobil (iPhone 6/7/8) üzerinde test
- [ ] **768px Genişlik**: Tablet (iPad) üzerinde test
- [ ] **Metin Taşmaları**: Uzun marka isimlerinin taşmadan görüntülenmesi
- [ ] **Kart Yükseklikleri**: Tüm ekran boyutlarında uygun yükseklik

#### ✅ Okunabilirlik
- [ ] **Yazı Boyutları**: 
  - Başlıklar: min 16px
  - Açıklamalar: min 14px
  - Buton metinleri: min 14px
- [ ] **Kontrast Oranları**: WCAG AA standardı (4.5:1)
- [ ] **Döndürülmüş Metinler**: Mobilde kaldırılmış olmalı
- [ ] **Line Height**: En az 1.4 line-height

### 2. Chrome DevTools Testleri

#### 📱 Device Mode Testleri
```javascript
// Test komutları Chrome Console'da çalıştırılabilir:

// Touch simulation
navigator.maxTouchPoints > 0 // true dönmeli

// Viewport kontrolü
window.innerWidth // 320-768 aralığında olmalı

// Touch target validation
document.querySelectorAll('*').forEach(el => {
  const rect = el.getBoundingClientRect();
  if (rect.width > 0 && rect.height > 0 && 
      (rect.width < 48 || rect.height < 48)) {
    console.warn('Small touch target:', el, rect);
  }
});
```

#### 🎯 Lighthouse Mobile Audit
- [ ] **Mobile Usability Score**: 100/100
- [ ] **Touch Target Size**: Passed
- [ ] **Content Best Practices**: Passed
- [ ] **Performance Score**: 90+
- [ ] **First Input Delay**: < 100ms

### 3. Gerçek Cihaz Testleri

#### 📲 Test Cihazları ve Ölçümler
| Cihaz | Ekran | Test Durumu | Notlar |
|-------|-------|-------------|--------|
| iPhone SE (2020) | 375×667 | ✅/❌ | En kritik test |
| iPhone 12 | 390×844 | ✅/❌ | Standart iOS |
| Samsung Galaxy S21 | 384×854 | ✅/❌ | Android test |
| iPad Mini | 768×1024 | ✅/❌ | Tablet geçişi |
| Google Pixel 5 | 393×851 | ✅/❌ | Stock Android |

#### 🖱️ Kullanıcı Test Senaryoları
1. **Tek Elle Kullanım**: Başparmakla kolayca tıklanabiliyor mu?
2. **Hızlı Tıklama**: Çift tıklamada zoom engelleniyor mu?
3. **Uzun Basma**: Uzun basma hareketi çalışıyor mu?
4. **Kaydırma**: Dikey kaydırma esnasında takılmalar?

### 4. Performans Testleri

#### ⚡ Mobil Performans Metrikleri
```javascript
// Performance API testleri
const measurePerformance = () => {
  const navigation = performance.getEntriesByType('navigation')[0];
  
  console.log('First Contentful Paint:', performance.getEntriesByType('paint')[0]?.startTime);
  console.log('Largest Contentful Paint:', performance.getEntriesByType('largest-contentful-paint')[0]?.startTime);
  console.log('Cumulative Layout Shift:', performance.getEntriesByType('layout-shift'));
  
  // Mobile-specific metrics
  console.log('DOM Content Loaded:', navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart);
  console.log('Page Load Complete:', navigation.loadEventEnd - navigation.loadEventStart);
};
```

#### 📊 Hedef Metrikler
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **First Input Delay**: < 100ms
- **Cumulative Layout Shift**: < 0.1
- **Total Blocking Time**: < 200ms

### 5. Erişilebilirlik Testleri

#### ♿ WCAG 2.1 AA Uyumluluğu
- [ ] **Keyboard Navigasyon**: Tab tuşuyla tüm elemanlara ulaşılabilir
- [ ] **Screen Reader**: ARIA etiketleri doğru şekilde ayarlanmış
- [ ] **Focus Visible**: Odaklandığında görünür outline
- [ ] **Reduced Motion**: `prefers-reduced-motion` desteği
- [ ] **High Contrast**: `prefers-contrast` desteği

#### 🔍 Test Araçları
```bash
# axe-core CLI test
npx axe-cli "http://localhost:4323/test-minimal" --rules color-contrast

# Lighthouse CLI
lighthouse "http://localhost:4323/test-minimal" --preset=mobile --output=html

# Pa11y (Accessibility)
npx pa11y "http://localhost:4323/test-minimal" --standard=WCAG2AA
```

### 6. Cross-Browser Testleri

#### 🌐 Tarayıcı Uyumluluğu
| Tarayıcı | Versiyon | Durum | Notlar |
|----------|----------|-------|--------|
| Chrome iOS | Son | ✅/❌ | Safari alt yapısı |
| Safari iOS | Son | ✅/❌ | WebKit motoru |
| Firefox Android | Son | ✅/❌ | Gecko motoru |
| Samsung Internet | Son | ✅/❌ | Android WebView |
| Chrome Android | Son | ✅/❌ | V8 motoru |

### 7. Hata ve Sorun Takibi

#### 🐛 Sık Karşılaşılan Sorunlar
1. **iOS Safari Zoom**: Çift tıklamada sayfa yakınlaştırması
   - Çözüm: `meta viewport` ayarları ve CSS `touch-action`

2. **Android Touch Delay**: 300ms gecikme
   - Çözüm: `touch-action: manipulation` CSS kuralı

3. **Layout Shift**: Mobilde içerik kaymaları
   - Çözüm: Sabit yükseklikler ve `aspect-ratio`

4. **Animation Jank**: Mobilede takılmış animasyonlar
   - Çözüm: `will-change`, `transform3d`, `@media (prefers-reduced-motion)`

#### 📝 Bug Rapor Şablonu
```
**Sorun**: [Açıklama]
**Cihaz**: [Model, OS, Tarayıcı]
**Adımlar**: [Sorunu tekrar etme adımları]
**Beklenen**: [Ne olması gerektiği]
**Gerçek**: [Ne olduğu]
**Ekran Görüntüsü**: [Gerekirse ekran fotoğrafı]
```

### 8. Deployment Öncesi Kontroller

#### ✅ Pre-Deployment Checklist
- [ ] Tüm mobil breakpoint'lerde test edildi
- [ ] Touch target'lar 48x48px minimum boyutta
- [ ] Animasyon süreleri mobil için optimize edildi
- [ ] Lighthouse mobile score 90+
- [ ] Cross-browser testleri tamamlandı
- [ ] Accessibility audit passed
- [ ] Performance budget içinde
- [ ] Code review tamamlandı

#### 🚀 Production Monitoring
```javascript
// Real User Monitoring (RUM)
if ('PerformanceObserver' in window) {
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      // Log mobile-specific performance metrics
      if (navigator.maxTouchPoints > 0) {
        console.log('Mobile performance:', entry.name, entry.startTime);
      }
    });
  });
  
  observer.observe({entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift']});
}
```

Bu test kılavuzu, BrandAccordion komponentlerinin mobil uyumluluğunu sistematik olarak doğrulamak için kullanılmalıdır.