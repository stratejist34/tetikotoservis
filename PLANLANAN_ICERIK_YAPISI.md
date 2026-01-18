# 🛠️ Tetik Otomotiv Proje İçerik Haritası

Bu belge, **Tetik Otomotiv Özel Servis** web sitesinin planlanan ve mevcut tüm içerik yapısını ağaç şeması şeklinde sunmaktadır.

---

## 🏗️ Genel Site Yapısı (Tree View)

```text
root/
├── 🏠 Anasayfa (index.astro)
│   ├── ⚡ Hero Bölümü (Slogan & Ana CTA)
│   ├── 🏆 Güven Rozetleri (Trust Badges)
│   ├── 🚗 Marka Uzmanlıkları (Sticky Cards - Hyundai, Kia, Toyota, Nissan)
│   ├── 🔄 Hizmet Verilen Modeller (Infinite Marquee)
│   ├── 🛠️ Hizmet Özetleri (Bento Grid)
│   ├── 💬 Müşteri Değerlendirmeleri (Testimonials)
│   ├── ✍️ Güncel Blog Yazıları (Recent Posts)
│   └── 📍 İletişim & Harita (Contact Section)
│
├── 📖 Kurumsal Sayfalar
│   ├── ℹ️ Hakkımızda (hakkimizda.astro)
│   └── 📞 İletişim (iletisim.astro - Form, Adres, Harita)
│
├── 🔧 Hizmetlerimiz (hizmetlerimiz.astro)
│   ├── 🏎️ Marka Odaklı Servisler
│   ├── 🛠️ Genel Mekanik & Bakım
│   │   ├── 📅 Periyodik Bakım
│   │   ├── ⚙️ Motor Yenileme (Rektefiye)
│   │   ├── 🔍 Arıza Tespit (Diyagnoz)
│   │   ├── 🛢️ Yağ Değişimi
│   │   ├── ⛓️ Şanzıman Tamiri (Otomatik/Manuel)
│   │   ├── 🧩 Mekanik Onarım
│   │   ├── ⛽ Enjektör & Pompa Bakımı
│   │   └── 🔄 Triger Seti Değişimi
│   └── 🚨 7/24 Yol Yardım (7-24-yol-yardim.astro)
│
├── 🏷️ Marka Özel Sayfaları
│   ├── 🔹 Hyundai Özel Servis (hyundai-ozel-servis.astro)
│   ├── 🔹 Kia Özel Servis (kia-ozel-servis.astro)
│   ├── 🔹 Toyota Özel Servis (toyota-ozel-servis.astro)
│   └── 🔹 Nissan Özel Servis (nissan-ozel-servis.astro)
│
├── 🗺️ Bölgesel Sayfalar (Dinamik: [slug].astro)
│   ├── 📍 Gebze - Marka Servisleri (Örn: Gebze Hyundai Servis)
│   ├── 📍 Tuzla - Marka Servisleri
│   ├── 📍 Darıca - Marka Servisleri
│   ├── 📍 Çayırova - Marka Servisleri
│   └── 📍 Kartal/Pendik - Marka Servisleri
│
├── 🚘 Model Özel Sayfaları (src/content/models/)
│   ├── 🇰🇷 Hyundai: i10, i20, i30, Accent, Elantra, Tucson, Kona, ix35...
│   ├── 🇰🇷 Kia: Picanto, Rio, Ceed, Sportage, Stonic, Cerato...
│   ├── 🇯🇵 Toyota: Yaris, Corolla, Auris, C-HR, RAV4, Hilux...
│   └── 🇯🇵 Nissan: Micra, Juke, Qashqai, X-Trail...
│
└── ✍️ Blog & Bilgi Merkezi (src/content/blog/)
    ├── 📑 Bakım Rehberleri
    ├── 💰 Fiyat Bilgilendirmeleri (Örn: i20 Bakım Fiyatları)
    └── 🛠️ Teknik Çözümler (Örn: Şanzıman Sorunları)
```

---

## 📋 Detaylı İçerik Planı

### 1. Ana Statik Sayfalar
*   **Anasayfa:** Tüm hizmetlerin giriş kapısı, marka güveni oluşturma.
*   **Hizmetlerimiz:** Teknik kapasitenin ve servis çeşitliliğinin sergilendiği liste sayfa.
*   **7/24 Yol Yardım:** Acil durumlar için hızlı ulaşım ve bilgilendirme sayfası.

### 2. Marka & Model Hiyerarşisi
*   **Markalar:** 4 ana uzak doğu markası üzerine özelleşmiş alt yapılar.
*   **Modeller:** Her model için özel teknik veriler, yaygın arızalar ve bakım önerileri içeren sayfalar.
*   **SEO Odaklılık:** "Hyundai i20 periyodik bakım", "Toyota Corolla şanzıman tamiri" gibi spesifik aramalar hedeflenmiştir.

### 3. Bölgesel (Local SEO) Stratejisi
*   **Kapsama Alanı:** Gebze, Tuzla, Çayırova, Darıca, Pendik.
*   **Dinamik Yapı:** Marka + Lokasyon kombinasyonları (Örn: "Tuzla Kia Servisi") ile yerel aramalarda üst sıralara çıkma hedeflenmiştir.

### 4. Blog & Eğitim İçerikleri
*   **Periyodik Bakım:** Kullanıcıları bakım aralıkları hakkında bilgilendirme.
*   **Arıza Belirtileri:** "Neden ses geliyor?", "Yağ lambası neden yanar?" gibi sorulara yanıtlar.
*   **Güncel Fiyatlar:** Yılda en az 2 kez güncellenen servis maliyet tabloları.

---

## 🎨 Teknik Bileşenler (Components)
*   **Hero:** Görsel etkileyicilik ve hızlı çağrı (CTA).
*   **Sticky Tabs/Cards:** Kolay marka geçişleri.
*   **Bento Grid:** Hizmetlerin modern ve derli toplu sunumu.
*   **Contact/QuickAction:** Mobilde hızlı arama ve WhatsApp butonu.
*   **Schema Markup:** Google için LocalBusiness, FAQ ve Breadcrumb yapısal verileri.

---
*Belge Güncelleme Tarihi: 7 Ocak 2026*
