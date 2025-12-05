# 🚀 Blog Yazısı Otomasyonu - Hızlı Başlangıç

## 📦 Paket İçeriği

```
blog-yazisi-otomasyonu/
├── blog-generator.py              # Ana script
├── blog-template.md               # Yazı şablonu
├── real-reviews.json              # Gerçek Google yorumları
├── CURSOR-KULLANIM-KILAVUZU.md   # Detaylı kullanım
└── README.md                      # Bu dosya
```

---

## ⚡ 3 ADIMDA BAŞLA

### 1️⃣ GERÇEK YORUMLARI EKLE

`real-reviews.json` dosyasını aç ve Google yorumlarını ekle:

```json
{
  "reviews": [
    {
      "id": 1,
      "author": "Ahmet Y.",
      "rating": 5,
      "date": "2 hafta önce",
      "text": "Gerçek Google yorumunuz buraya",
      "avatar": "A",
      "color": "#4285f4",
      "verified": true
    }
  ]
}
```

**En az 10-15 gerçek yorum ekle!**

---

### 2️⃣ BLOG YAZISI OLUŞTUR

Terminal'de:

```bash
python3 blog-generator.py "Elantra Periyodik Bakım Fiyatları"
```

Çıktı:
```
✅ Dosya oluşturuldu: elantra-periyodik-bakim-fiyatlari.md
```

---

### 3️⃣ CURSOR İLE TAMAMLA

Cursor'da (Normal veya Automatic Chat):

```
elantra-periyodik-bakim-fiyatlari.md dosyasını aç.

Tüm [placeholder] bölümlerini doldur:
- HTML yapısına DOKUNMA
- Yorumları DEĞİŞTİRME (gerçek Google yorumları)
- Sadece köşeli parantez içindekilleri doldur
- Tabloyu en az 5 satır ekle
- Her bölüm 150+ kelime

ÖZEL TALİMAT:
Hyundai Elantra için:
- Periyodik bakım km'leri: 15k, 30k, 45k, 60k, 75k
- Yapılan işlemler: Yağ, filtre, fren, süspansiyon kontrolleri
- Fiyatlar: Realiste, "fiyat için arayın" ifadesiyle
```

---

## 🎯 KULLANIM ÖRNEKLERİ

### Örnek 1: Basit Bakım Yazısı
```bash
python3 blog-generator.py "Tucson Fren Balatası Değişimi"
```

### Örnek 2: Karşılaştırma Yazısı
```bash
python3 blog-generator.py "i20 vs Corsa Karşılaştırması"
```

### Örnek 3: Fiyat Odaklı
```bash
python3 blog-generator.py "Gebze Egzoz Sistemi Tamiri Fiyatları"
```

---

## ✅ BAŞARI KONTROL LİSTESİ

İyi bir blog yazısı için:

- [ ] Gerçek yorumlar `real-reviews.json` dosyasında
- [ ] Script çalıştırıldı ve .md dosyası oluştu
- [ ] Cursor ile placeholder'lar dolduruldu
- [ ] HTML class'ları değişmedi
- [ ] Ek yorum eklenmedi
- [ ] Tablo 5+ satır içeriyor
- [ ] En az 1000 kelime var
- [ ] Dosya `src/content/blog/` klasörüne taşındı
- [ ] İsteğe bağlı: Görsel eklendi

---

## 🐛 SORUNLAR & ÇÖZÜMLER

| Sorun | Çözüm |
|-------|-------|
| Cursor yorumları tekrar ekledi | "Yorum ekleme, onlar gerçek" deyin |
| HTML bozuldu | "Sadece [placeholder] kısımları doldur" deyin |
| Çok kısa içerik | "Her bölüm 150+ kelime olsun" ekleyin |
| Cursor tıkandı | Yeni chat penceresi açın |

---

## 💡 PROFESYONELLEŞTİRME İPUÇLARI

### Daha İyi SEO İçin:
- Ana anahtar kelimeyi başlıkta kullan
- İlk 100 kelimede anahtar kelime geçsin
- En az 5 H2 başlık ekle
- Tablo ve liste kullan
- İç linkler ekle

### Daha İyi Yorumlar İçin:
- En az 15-20 gerçek yorum topla
- Farklı tarihlerde yazılmış yorumlar seç
- 4-5 yıldızlı yorumları da ekle (sadece 5 yıldız değil)
- Spesifik hizmet adı geçen yorumları tercih et

### Daha İyi Fiyat Tabloları İçin:
- Gerçekçi fiyat aralıkları ver
- "Fiyat için arayın" yerine aralık belirt
- Paket fiyatları ekle
- Kampanya bilgisi varsa not düş

---

## 📚 DAHA FAZLA BİLGİ

Detaylı kullanım için: **CURSOR-KULLANIM-KILAVUZU.md**

---

## 🎬 HIZLI ÖZET

```bash
# 1. Yorumları ekle
nano real-reviews.json

# 2. Yazı oluştur  
python3 blog-generator.py "Başlık"

# 3. Cursor'a talimat
"Placeholder'ları doldur, HTML'e dokunma, yorum ekleme"

# 4. Taşı
mv dosya.md src/content/blog/

# 5. Test et
npm run dev
```

---

BAŞARILAR! 🎉

Sorular için: CURSOR-KULLANIM-KILAVUZU.md dosyasına bakın.
