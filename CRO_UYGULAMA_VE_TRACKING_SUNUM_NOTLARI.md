# CRO Uygulama ve Tracking Sunum Notları

Tarih: 2026-03-02  
Proje: tetikotoservis  
Amaç: Nitelikli telefon/WhatsApp temasını artırmak, yanlış lead'i azaltmak (bölge dışı + yetkili servis beklentisi)

---

## 1) Yönetici Özeti

Bu sprintte içerik ve tracking tarafında iki temel sistem kuruldu:

1. Tek merkezden yönetilen servis kapsamı altyapısı
- Telefon, WhatsApp numarası, bölge listesi, "yetkili servis değiliz" metni tek dosyada toplandı.
- Böylece farklı sayfalara dağılmış hardcode metin/numara riski azaltıldı.

2. Ölçülebilir CRO içerik sistemi (Top 3 sayfaya uygulandı)
- 3 yüksek öncelikli blog sayfası landing-page davranışına çevrildi.
- Her sayfada bileşen tabanlı CTA yüzeyleri, yumuşak/sert niteliklendirme ve ilçe bağlantı modülü eklendi.

Ek olarak, global temas akışı bölge modalı ile zorunlu filtreye bağlandı:
- Kullanıcı nitelik onayı vermeden çağrı/WhatsApp akışı başlamaz.
- Onaylı kullanıcı aynı oturumda tekrar modal görmez.
- Reddeden kullanıcı bypass kazanmaz.

---

## 2) Kapsam ve Değişen Dosyalar

### Yeni dosyalar
- `src/lib/serviceScope.ts`
- `src/components/QualificationNotice.astro`
- `src/components/InlineCta.astro`
- `src/components/DistrictLinks.astro`
- `src/components/blog-cro/KiaSportagePriceContent.astro`
- `src/components/blog-cro/ToyotaCorollaPriceContent.astro`
- `src/components/blog-cro/HyundaiBakimPriceContent.astro`
- `src/components/ServiceScopeNotice.astro`

### Güncellenen dosyalar
- `src/pages/blog/[slug].astro`
- `src/layouts/Layout.astro`
- `src/components/QuickActionBar.astro`
- `src/components/StickyPhoneButton.astro`

---

## 3) İçerik/CRO Sistemi (Top 3 Sayfa)

Uygulanan sayfalar:
- `/blog/kia-sportage-periyodik-bakim-fiyatlari-2026`
- `/blog/toyota-corolla-periyodik-bakim-fiyatlari-2026`
- `/blog/hyundai-periyodik-bakim-fiyatlari-2026`

### Her sayfada uygulanan yapı
- 120+ kelimelik giriş (yüksek niyet + hız vaadi)
- Üstte soft qualification satırı
- Giriş sonrası CTA
- Fiyat aralığı tablosu + fiyatı etkileyen değişkenler
- Süre beklentisi
- 3 kritik soru/itiraz cevabı
- İçerik ortası ve içerik sonu CTA
- Sayfa sonuna ilçe+marka bağlantı modülü

### Not
CTA yüzeyleri ham metin değil bileşen üzerinden render ediliyor. Böylece hem metin standardı hem tracking parametre standardı korunuyor.

---

## 4) Tek Kaynaktan Yönetim (Single Source of Truth)

Dosya: `src/lib/serviceScope.ts`

Merkezde toplananlar:
- Telefon
- WhatsApp numarası
- Bölge listesi: Tuzla, Pendik, Gebze, Kurtköy
- Soft ve strong nitelik metinleri
- WhatsApp şablon üretimi (brand + service_intent)
- Saat slot mantığı (business hours / after hours)

### Kazanım
- Numara, bölge veya metin değiştiğinde tek dosyadan güncellenir.
- İçerik bileşenleri ve modal aynı kaynağı kullanır.

---

## 5) Tracking Mekanizması (Detaylı ve Anlaşılır)

## 5.1 Akışın kısa özeti

1. Kullanıcı bir tel/WA CTA'sına tıklar.  
2. `Layout.astro` global click interception tıklamayı yakalar.  
3. `phone_intent` veya `whatsapp_intent` event'i standard parametrelerle gönderilir.  
4. Eğer session `region_modal_qualified=true` değilse modal açılır.  
5. Modalda:
- onay verilirse `region_filter_passed` + `qualified_*` eventleri gönderilir ve hedefe gidilir.
- reddedilirse `region_filter_rejected` gönderilir ve hedefe gidilmez.

## 5.2 Nerede hangi kod çalışıyor

### A) Global event helper ve intercept
Dosya: `src/layouts/Layout.astro`

Sorumluluklar:
- `eventNameMap` ile event standardizasyonu
- base parametreleri her evente ekleme
- tüm tel/WA linklerini tek noktadan yakalama
- modal açma kararını session durumuna göre verme

Base parametreler:
- `page_path`
- `hour_slot`
- `intent`
- `brand`
- `device_type`
- `region_scope=tpgk`
- `service_type=ozel_servis_not_authorized`

CTA yüzey parametreleri:
- `cta_position` (`hero|inline|sticky|footer`)
- `cta_variant` (`v1|v2|v3`)
- `scroll_depth_pct`

### B) Modal ve qualification gate
Dosya: `src/components/QuickActionBar.astro`

Sorumluluklar:
- `openServiceRegionModal(...)` fonksiyonunu expose etme
- modal açılma/ret/geçiş eventlerini üretme
- `region_modal_qualified` session anahtarını yönetme
- onay sonrası qualified eventleri üretme

Modal eventleri:
- `region_modal_opened`
- `region_filter_passed`
- `region_filter_rejected`

Qualified eventleri:
- `qualified_phone_call`
- `qualified_whatsapp_click`

### C) CTA bileşenleri
Dosya: `src/components/InlineCta.astro`

Sorumluluklar:
- CTA yüzeyini tutarlı render etme
- data-attribute ile tracking'e context verme
- saat bazlı primary aksiyon (mesai: call, mesai dışı: WA)

## 5.3 Double-fire nasıl engelleniyor

Sorun:
- Global intercept intent eventini atarken modal tarafı tekrar intent atabilir.

Çözüm:
- Intercept modalı `intent_tracked: true` ile çağırıyor.
- Modal içinde `if (!currentMeta.intent_tracked)` kontrolü var.
- Böylece intent event tek kez gider.

## 5.4 Session davranışı

Session key:
- `region_modal_qualified`

Kurallar:
- Onay: `region_modal_qualified=true`, aynı oturumda bypass.
- Ret/Vazgeç: key set edilmez, sonraki tıklamada modal tekrar açılır.
- Eski `region_modal_shown` bypass mantığı aktif değil.

## 5.5 Event sözleşmesi (Contract)

Ana eventler:
- `phone_intent`
- `whatsapp_intent`
- `region_modal_opened`
- `region_filter_passed`
- `region_filter_rejected`
- `qualified_phone_call`
- `qualified_whatsapp_click`

Uyumluluk eventleri (30 günlük geçiş için):
- `tel_arama_niyeti`
- `telefon_aramasi`
- `tel_vazgecti`
- `whatsapp_niyeti`
- `whatsapptan_yazanlar`
- `whatsapp_vazgecti`

---

## 6) Top 3 Sayfa Öncelik Mantığı (GA tabanlı)

Kullanılan dönem: 2025-12-01 ile 2026-03-01 arası GA4 export.

Öne çıkan sayfalar:
- `/blog/kia-sportage-periyodik-bakim-fiyatlari-2026`
- `/blog/toyota-corolla-periyodik-bakim-fiyatlari-2026`
- `/blog/hyundai-periyodik-bakim-fiyatlari-2026`

Neden:
- Yüksek trafik + fiyat niyeti + CTA kaldıraç potansiyeli
- Yanlış lead riski yüksek olduğu için filtre etkisi doğrudan ölçülebilir

---

## 7) Doğrulama ve Test Notları

## 7.1 Yapılan doğrulamalar
- Top 3 sayfa bileşen tabanlı render ediliyor.
- İçerikte yasak şablon etiketleri bulunmuyor.
- Telefon/WA numarası tek kaynakta (`serviceScope.ts`) tutuluyor.
- Modal qualification akışı session tabanlı çalışıyor.
- Intent double-fire için guard aktif.

## 7.2 Build durumu
- `npm run build` çalıştırıldı.
- Sonuç: Başarısız (ilgili olmayan mevcut YAML içerik hatası)
- Hata dosyası: `src/content/models/kia-ceed.md`
- Hata: `bad indentation of a mapping entry`

Not: Bu hata mevcut içerik kaynaklı; CRO/tracking kodundan kaynaklanmıyor.

---

## 8) Sunum İçin Konuşma Akışı (Hazır Not)

1. Problem çerçevesi
- Trafik var ama yanlış lead maliyeti yüksek.
- Servis sahibi tarafında "boşa giden çağrı" algısı oluşuyor.

2. Strateji
- Trafiği artırmak yerine mevcut trafiği niteliklendirmek.
- Bölge + yetkili servis filtresini akışın merkezine koymak.

3. Uygulama
- Tek kaynaklı servis kapsamı katmanı.
- Top 3 sayfayı landing-page davranışına çevirme.
- CTA + modal + event standardizasyonu.

4. Ölçüm
- Intent eventleri ile ilgi ölçümü.
- Qualified eventleri ile gerçek nitelikli temas ölçümü.
- Rejected eventleri ile yanlış lead maliyeti ölçümü.

5. Beklenen etki
- Boş çağrıların azalması.
- Nitelikli telefon/WA oranında artış.
- İlçe+marka sayfalarına daha temiz akış.

---

## 9) Operasyon Notları

- Yeni içerik veya sayfa açıldığında CTA ham metinle değil `InlineCta` ile eklenmeli.
- Bölge/metin/numara değişimleri yalnızca `serviceScope.ts` üzerinden yapılmalı.
- GA DebugView testlerinde ilk kontrol edilecekler:
  - Event adı doğru mu?
  - `cta_position`, `cta_variant`, `scroll_depth_pct` geliyor mu?
  - `region_scope` ve `service_type` sabitleri var mı?

---

## 10) Sonraki Adımlar (Öneri)

1. Build blocker temizliği
- `src/content/models/kia-ceed.md` frontmatter düzeltmesi.

2. GA4 dashboard
- intent -> qualified -> rejected dönüşüm hunisi.

3. 2. dalga içerik
- aynı sistemi diğer yüksek trafik fiyat bloglarına ölçekleme.

4. A/B test
- modal metin varyasyonu
- CTA v1/v2/v3 dağılım optimizasyonu

---

## 11) Hızlı Referans

Primary KPI:
- `qualified_phone_call`

Secondary KPI:
- `qualified_whatsapp_click`

Filtre KPI:
- `region_filter_rejected`

Bölge kapsamı:
- Tuzla, Pendik, Gebze, Kurtköy

Servis tipi:
- Özel servis, yetkili servis değil
