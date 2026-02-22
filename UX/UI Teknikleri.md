# UX/UI Teknikleri ve Gerekçeleri

> **kurtkoyhaliyikama.net** sitesinde kullanılan tüm tasarım ve etkileşim tekniklerinin kanıt tabanlı açıklamaları.

---

## 1. Header Scroll Shrink (Daralan Başlık)

**Teknik:** Sayfa aşağı kaydırıldığında header yüksekliği `py-4 → py-2` olarak küçülür, arka plan şeffaflıktan yarı saydam beyaza geçer, gölge eklenir. `backdrop-blur(12px)` ile cam etkisi oluşur.

**Gerekçe:**
- **Dikkat dağılımını azaltır.** Kullanıcı içeriğe odaklanmışken header minimum alan kaplar (Nielsen Norman Group, "Sticky Headers" araştırması).
- **Vertical real estate kazandırır.** Özellikle mobilde ekran alanı kıymetlidir; %30 küçülen header daha fazla içerik görünmesini sağlar.
- **Bağlam kaybını önler.** Header tamamen kaybolmak yerine daralarak erimsediğinde kullanıcı navigasyona her an ulaşabilir, geri dönüş maliyeti sıfıra iner.

---

## 2. Hero Parallax Scrolling (Derinlik Efekti)

**Teknik:** Hero arka plan görseli `translateY(scrollY × 0.12)` ile scroll hızının %12'si kadar yavaş hareket eder. `requestAnimationFrame` ile performans optimize edilir.

**Gerekçe:**
- **Derinlik algısı yaratır.** İnsan beyni farklı hızda hareket eden katmanları derinlik olarak algılar (Motion Parallax prensipleri). Bu, düz bir web sayfasını 3 boyutlu gibi hissettirir.
- **Etkileşim hissi verir.** Kullanıcının scroll'u fiziksel bir yanıt üretir; bu da "canlı" bir arayüz algısı yaratır.
- **`passive: true` listener** ile scroll bloklanmaz, 60fps korunur.

---

## 3. Ken Burns Animasyonu (Yavaş Zoom)

**Teknik:** Hero arka plan görseline CSS `ken-burns` sınıfı uygulanır — 25 saniyede %5 yakınlaşma/uzaklaşma döngüsü.

**Gerekçe:**
- **Statik sayfaya hayat verir.** İlk 3 saniyede kullanıcının dikkatini çeker, sayfanın "canlı" olduğunu hissettirir (pre-attentive processing).
- **Belgesel hissi yaratır.** Ken Burns efekti, PBS belgesellerinden tanıdık bir görsel dil; profesyonellik ve güven iletir.
- **CPU-friendlydir.** `transform: scale()` GPU-composited olduğu için ana thread'i yormaz.

---

## 4. Glass Panel (Buzlu Cam Efekti)

**Teknik:** Hero başlık paneli `backdrop-filter: blur(16px)` + yarı-saydam beyaz arka plan + ince border ile glassmorphism uygulanır.

**Gerekçe:**
- **Okunabilirlik sağlar.** Metin, değişken arka planın üzerinde doğrudan durmak yerine buzlu cam arkasında durarak her koşulda okunaklı kalır.
- **Derinlik katmanı ekler.** Cam katmanı sayfaya fiziksel bir "tabaka" hissi vererek premium algı yaratır (Apple HIG, glassmorphism guidelines).
- **Görselle ilişkiyi korur.** Opak bir panel görseli tamamen keserdi; bulanıklaştırılmış cam arka plan görselinin varlığını hissettirmeye devam eder.

---

## 5. Staggered Entry Animasyonları (Kademeli Giriş)

**Teknik:** Hero içindeki elementler (tag → başlık → açıklama → CTA → trust bar)` sırasıyla 0ms → 80ms → 160ms → 240ms gecikmeyle fade-up yaparak girer.

**Gerekçe:**
- **Bilgi hiyerarşisi oluşturur.** Kullanıcı her elementi sırayla işler — cognitive load (bilişsel yük) azalır. Tüm bilgiler aynı anda geldiğinde beyinnin "nereye bakayım" kararı 300ms+ gecikir.
- **Anlatım ritmi kurar.** Film gibi: sahne açılır, başlık belirir, aksiyon butonu gelir. Bu dramaturjik sıralama dönüşümü artırır.
- **Performanslıdır.** Sadece CSS `animation-delay` kullanıldığı için JavaScript overhead yoktur.

---

## 6. Animated Count-Up (Sayaç Animasyonu)

**Teknik:** `useCountUp` hook'u ile "4.8 Google" ve "3000+ Teslim" sayıları sıfırdan hedef değere 1.4–1.6 saniyede animasyonla yükselir.

**Gerekçe:**
- **Somut kanıt sunar.** Rakamlar soyut güven ifadelerinden çok daha ikna edicidir. "3000+ teslim" yazıdan daha inandırıcı olur.
- **Dikkat çeker.** Hareket eden sayılar periferik görüşte yakalanır; statik metin gözden kaçabilir.
- **Başarı hissi yaratır.** Sayacın yükselmesi "büyüme" ve "güven" ile ilişkilendirilir — pozitif duygusal etki.

---

## 7. Scroll-Triggered Reveal (Görüntüye Girişte Animasyon)

**Teknik:** `IntersectionObserver` API ile elementler viewport'a girdiğinde `.is-visible` sınıfı eklenir, `opacity: 0 → 1` + `translateY(32px) → 0` geçişi tetiklenir. **5 yön:** up, left, right, scale, fade.

**Gerekçe:**
- **Progressive disclosure (kademeli açıklama) sağlar.** Kullanıcı aşağı kaydırdıkça bilgi "ortaya çıkar" — tüm sayfanın bir anda yüklenmesi yerine parça parça keşfedilir.
- **Scroll motivasyonu yaratır.** "Aşağıda daha fazla keşfedilecek şey var" hissini pekiştirir.
- **`IntersectionObserver` performanslıdır.** Scroll event dinlemek yerine browser-native API kullanılır, frame drop yapmaz.
- **`once: true` prensibi.** Her element sadece bir kez animate olur — geri kaydırmada reset olmaz, rahatsızlık yaratmaz.

---

## 8. Stagger Children (Çocuk Elementlerin Sıralı Girişi)

**Teknik:** `Stagger` wrapper'ı çocuk elementlere sırayla `--stagger-delay` CSS değişkeni atar, her çocuk bir öncekinden 60–80ms sonra görünür olur.

**Gerekçe:**
- **Grup elementlerini düzenler.** Kartlar, listeler gibi birden fazla element "dalga gibi" girer — kaotik bir "patlama" yerine kontrollü bir akış.
- **Görsel ritim kurar.** Müzikteki arpej gibi, aynı motifin zamana yayılmış versiyonu algısal zenginlik yaratır.

---

## 9. Sticky CTA + Conflict Detection (Yapışkan Eylem Çubuğu)

**Teknik:** Kullanıcı sayfanın %15'ini geçtikten sonra mobilde alt tab bar, masaüstünde sağ alt köşede WhatsApp + Telefon butonları belirir. `IntersectionObserver` ile sayfadaki diğer CTA butonlarıyla (`data-sticky-conflict`) çakışma algılanır; çakışma varsa sticky bar gizlenir.

**Gerekçe:**
- **Her an dönüşüm imkânı.** Kullanıcı nerede olursa olsun iletişim bir dokunuş uzakta kalır (Fitts's Law: hedef ne kadar yakınsa tıklama o kadar kolay).
- **CTA çakışma önleme** akıllıca: iki aynı amacı taşıyan buton yan yana durduğunda "hangisine tıklayacağım" kararsızlığı (paradox of choice) ortadan kalkar.
- **Footer yakınında gizlenir.** Alt kısımdaki iletişim bilgileri zaten görünür olduğunda gereksiz tekrar yapmaz.
- **Kapatılabilir.** Kullanıcı `X` ile kapatabilir — intrusif olma riskini minimize eder.

---

## 10. Slot-Based Urgency Messaging (Saat Bazlı Aciliyet Mesajı)

**Teknik:** `SlotMessage` bileşeni Türkiye saatine göre dinamik mesaj gösterir:
- 00:00–08:00 → "Bugün planlama 08:00'de açılıyor"
- 08:00–14:00 → "Şu an: Planlama devam ediyor"
- 14:00–18:00 → "Şu an: Son planlama aralıkları"
- 18:00+ → "Şu an: Yarın planlaması açık"

**Gerekçe:**
- **Gerçek zamanlı aciliyet yaratır.** "Son planlama aralıkları" kullanıcıda kaçırma korkusu (FOMO) tetikler — kararı erteleme eğilimini azaltır.
- **Güven sinyali gönderir.** Talebin yüksek olduğu mesajı "değerli bir hizmet" algısı yaratır (social proof — kıtlık prensibi).
- **Dürüsttür.** Gerçek çalışma saatlerine dayanır, sahte geri sayım değildir.

---

## 11. Cinematic Service Cards (Sinematik Hizmet Kartları)

**Teknik:** Tam genişlikte hizmet kartları, karanlık gradient overlay (%55-70 opaklık) altında arka plan fotoğrafı gösterir. Hover'da overlay hafifler, görsel belirginleşir. Başlık tipografisi büyük, italik aksanlarla sinematik hissiyat yaratır.

**Gerekçe:**
- **Duygusal bağ kurar.** Büyük, atmosferik görseller rasyonel düşünceden önce duygusal tepki tetikler (Limanın "Emotional Design" prensibi).
- **Hover keşif mekanizması.** Kullanıcı kartın üzerine geldiğinde overlay hafifler, görsel "açılır" — bu mikro-ödül merak duygusunu besler.
- **Kontrast ve okunabilirlik.** Koyu overlay, beyaz metni her fotoğrafın üzerinde garanti eder — görsel bağımsız tutarlılık.

---

## 12. Marquee Band (Kayan Bölge Şeridi)

**Teknik:** Hizmet bölge isimleri (Kurtköy, Pendik, Tuzla...) sonsuz döngüde yatay olarak kayar. Kenarlarda gradient fade ile tünel efekti oluşturulur.

**Gerekçe:**
- **Hizmet alanını görselleştirir.** 12 bölge ismini liste halinde yazmak yerine kayan bant dinamik ve hafızada kalıcı bir sunum sağlar.
- **Sosyal kanıt etkisi.** "Bu kadar çok bölgeye hizmet veriyorlar" algısı güven yaratır.
- **SEO katkısı.** Bölge isimleri semantik HTML'de (`<section aria-label>`) yer aldığı için indexlenebilir.
- **Görsel ayrıştırıcı.** Sayfanın iki bölümü arasında nefes alma alanı yaratır.

---

## 13. Before/After Grid (Öncesi/Sonrası Karşılaştırma)

**Teknik:** `DecisionMoment` bileşeni 3 kartlık bir grid'de "İşlem" ve "Sonuç" fotoğraflarını yan yana gösterir. Hover'da fotoğraflar hafifçe zoom yapar.

**Gerekçe:**
- **Görsel kanıt sunar.** "Fark gözle görülür" başlığı altında somut önce/sonra görselleri soyut vaatlerden daha ikna edicidir.
- **Karar kolaylaştırma.** Kullanıcı görsel karşılaştırma ile "bu hizmete ihtiyacım var mı?" sorusuna hızla yanıt bulur.
- **Hover zoom** mikro-etkileşimi detayları inceleme isteği uyandırır.

---

## 14. Anti-Pattern Messaging (Yapmadıklarımız Bölümü)

**Teknik:** `LimitsSection` koyu (navy) arka plan üzerinde kırmızı `XCircle` ikonlarıyla "Merdiven Altı Kimyasal" ve "Sokakta Kurutma" gibi sektörel kötü pratikleri açıkça reddeder.

**Gerekçe:**
- **Negatif framing.** Rakiplerin yaptığı kötü şeyleri söylemek, kendi iyiliklerini söylemekten daha etkilidir (loss aversion — kayıp kaçınması). "Biz iyi yıkıyoruz" < "Biz ASLA sokakta kurutmuyoruz."
- **Grid pattern + blur orbs** ile koyu arka plan derinlik kazanır, endüstriyel-profesyonel hava verir.
- **"3.000+ halıda aynı standart"** büyük tipografi closure (sonuç cümlesi) olarak punch line etkisi yaratır.

---

## 15. Page Hero Diagonal Cut (Açılı Kesim)

**Teknik:** İç sayfa hero'ları `clip-path: polygon(0 0, 100% 0, 100% calc(100% - 56px), 0 100%)` ile alt kenarda çapraz bir kesim oluşturur.

**Gerekçe:**
- **Sert geçişi kırar.** Hero'dan beyaz içeriğe düz bir çizgi ile geçmek "iki ayrı yapıştırılmış parça" hissi verir; çapraz kesim organik geçiş sağlar.
- **Dinamizm ekler.** Açılı çizgiler sayfaya hareket enerjisi ve modernlik katar.
- **Performanslıdır.** CSS-only, JavaScript gerektirmez.

---

## 16. Diagonal Stripe Texture (Çapraz Çizgi Deseni)

**Teknik:** `page-hero-bg`'de `repeating-linear-gradient(-45deg)` ile 18px aralıklı, %3 opaklıkta beyaz çizgiler arka plana eklenir.

**Gerekçe:**
- **Düz renk sıkıcılığını kırar.** Çıplak göze neredeyse görünmez ama bilinçaltında "dokulu, premium" algısı yaratır (subliminal texture).
- **Baskı dünyasından gelen güven.** İnce çizgi desenleri banknotlardan, sertifikalardan tanıdık; otoritatif hissiyat verir.

---

## 17. Tension Section (1M+ Bakteri İstatistiği)

**Teknik:** Navy arka plan üzerinde büyük bakteriyel mikrografi görseli ve devasa "1M+" rakamı ile şok etkisi yaratılır.

**Gerekçe:**
- **Fear appeal (korku çekiciliği).** Halk sağlığı iletişiminde bilinen etkin teknik: "Halınızda m² başına 1 milyondan fazla bakteri var" bilgisi eyleme geçirir.
- **Visual anchor.** Büyük rakam sayfanın en akılda kalıcı elementi haline gelir — kullanıcı sayfayı kapattıktan sonra bile bu sayıyı hatırlar.

---

## 18. Mobil Tab Bar CTA (Alt Eylem Çubuğu)

**Teknik:** Mobilde sticky bar, solda %30 genişliğinde "ARA" butonu, sağda %70 genişliğinde "Fotoğraf Gönder" butonu içerir. Masaüstünde ise iki dairesel ikon (WhatsApp + Telefon) gösterilir.

**Gerekçe:**
- **Fitts's Law uygulaması.** Başparmağın en kolay ulaştığı alan olan alt ekran kenarına yerleştirilir.
- **WhatsApp'a ağırlık verilmesi (%70).** Ana dönüşüm kanalı olan WhatsApp'a daha fazla alan ayrılarak thumb zone'da dominant konuma getirilir.
- **"Bugün planına dahil ol"** alt metni urgency + exclusivity sinyali gönderir.

---

## 19. Brand Renk Sistemi

| Token | Değer | Kullanım | Psikolojik Etki |
|-------|-------|----------|-----------------|
| `brand-navy` | Koyu lacivert | Başlıklar, güven panelleri | Otorite, güvenilirlik |
| `brand-coral` | Sıcak mercan kırmızısı | CTA butonları | Aciliyet, aksiyon tetikleme |
| `brand-sky` | Teal/turkuaz | İkonlar, aksan rengi | Hijyen, temizlik, ferahlık |
| `brand-sand` | Sıcak kum rengi | Hero etiketleri, vurgular | Sıcaklık, doğallık |
| `brand-mist` | Açık gri-yeşil | Bölüm arka planları | Dinlendirici, nötr |
| `brand-pine` | Koyu yeşil | Gradientler | Doğallık, profesyonellik |

**Gerekçe:** Renk paleti bilinçli olarak **tıbbi hijyen** (teal) + **sıcaklık** (sand, coral) dengesinde kurulmuştur. Sadece soğuk renkler klinik hissettirir; sadece sıcak renkler güven vermez. Dengesi premium + erişilebilir algı yaratır.

---

## 20. Next.js Image Optimization

**Teknik:** Tüm görsellerde `next/image` bileşeni kullanılır: `sizes` prop'u responsive boyutlar belirtir, `quality` düşürülür (hero: 40), `priority` ile LCP görseli preload edilir, format otomatik AVIF/WebP'ye dönüştürülür.

**Gerekçe:**
- **Core Web Vitals.** Doğru `sizes` attribute'u ile gereksiz büyük görsel indirilmez — LCP süresi düşer.
- **Otomatik format.** Browser desteğine göre AVIF > WebP > JPEG sıralaması ile en küçük dosya sunulur.
- **Lazy loading.** Viewport dışındaki görseller otomatik olarak ertelenir.

---

## 21. Semantic HTML + Schema.org Structured Data

**Teknik:** `LocalBusiness`, `Service`, `BreadcrumbList` schema'ları JSON-LD olarak her bölge sayfasına eklenir. `aria-label`, `alt` text'leri eksiksiz doldurulur.

**Gerekçe:**
- **SEO zengin sonuçları.** Google arama sonuçlarında yıldız puanı, telefon numarası, hizmet bölgesi gibi bilgiler görünür.
- **Erişilebilirlik.** Screen reader'lar tüm görselleri ve bölümleri doğru tanımlayabilir (WCAG 2.1 AA uyumluluk).

---

## 22. GA4 Event Tracking (Olay İzleme)

**Teknik:** `trackEvent()` fonksiyonu ile WhatsApp tıklama, telefon arama, sticky CTA kullanımı gibi tüm dönüşüm noktaları izlenir. Her event'e `konum` parametresi eklenir (hero, sticky_mobil, hizmet_detay vb.).

**Gerekçe:**
- **Hangi CTA çalışıyor?** Konum bazlı izleme ile "sticky bar mı yoksa hero CTA mı daha çok dönüşüm yapıyor?" sorusu yanıtlanır.
- **A/B test altyapısı.** Veriye dayalı kararlar almak için benchmark oluşturur.

---

## Özet: Teknik → Psikoloji Eşleştirmesi

| Psikolojik Prensip | Uygulanan Teknikler |
|--------------------|--------------------|
| **Dikkat yönetimi** | Ken Burns, Staggered Entry, Count-Up, Scroll Reveal |
| **Güven inşası** | Trust Bar, Schema.org, Before/After, Anti-Pattern |
| **Aciliyet yaratma** | SlotMessage, Sticky CTA, Coral CTA rengi |
| **Bilişsel yük azaltma** | Header Shrink, Glass Panel, Progressive Disclosure |
| **Premium algı** | Glassmorphism, Diagonal Texture, Cinematic Cards, Parallax |
| **Dönüşüm optimizasyonu** | Fitts's Law (mobile tab bar), Conflict Detection, GA4 Tracking |
