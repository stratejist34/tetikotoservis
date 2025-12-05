# 📘 CURSOR İÇİN BLOG YAZISI OLUŞTURMA REHBERİ

## 🎯 AMAÇ
Bu dosya, Cursor AI'ın blog yazılarını doğru formatta ve gerçek Google yorumlarıyla oluşturmasını sağlar.

---

## 📋 ADIM 1: Gerçek Yorumları Hazırla

**ÖNEMLİ:** Cursor'a blog yazısı yazdırmadan ÖNCE `real-reviews.json` dosyasını gerçek Google yorumlarınızla doldurun!

```json
{
  "reviews": [
    {
      "id": 1,
      "author": "Gerçek İsim S.",
      "rating": 5,
      "date": "2 hafta önce",
      "text": "Google'dan kopyaladığınız gerçek yorum",
      "avatar": "G",
      "color": "#4285f4",
      "verified": true
    }
  ]
}
```

**Renk kodları:**
- Mavi: #4285f4
- Yeşil: #0f9d58
- Sarı: #f4b400
- Kırmızı: #db4437
- Mor: #9c27b0
- Turuncu: #ff9800

---

## 📋 ADIM 2: Blog Yazısı Oluştur

### Terminal Komutu:
```bash
python3 blog-generator.py "Elantra Periyodik Bakım Fiyatları"
```

Bu komut otomatik olarak:
✅ SEO-friendly slug oluşturur (elantra-periyodik-bakim-fiyatlari)
✅ Frontmatter ekler (title, description, date, tags)
✅ Şablona uygun yapı kurar
✅ Gerçek yorumları rastgele seçip ekler
✅ CTA box'ları yerleştirir
✅ Markdown dosyasını oluşturur

---

## 📋 ADIM 3: İçeriği Doldur (Cursor ile)

Oluşan `.md` dosyasında `[Bu bölümü kendiniz dolduracaksınız]` yazan yerler var.

### Cursor'a VERECEĞİN KOMUT:

```
Bu markdown dosyasındaki tüm placeholder'ları (köşeli parantez içindekiler) 
gerçek içerikle doldur. Aşağıdaki kurallara DİKKATLE uy:

KURALLAR:
1. Mevcut HTML yapısını KORUYARAK doldur
2. <div class="cta-box">, <div class="review-card"> gibi yapılara DOKUNMA
3. Sadece [Bu bölümü dolduracaksınız] yerlerini doldur
4. Tabloyu gerçek verilerle doldur (en az 5 satır)
5. Check-list'e en az 5 madde ekle
6. SEO için anahtar kelimeleri doğal şekilde kullan
7. Her başlık altı en az 150 kelime olsun
8. Yorumlara DOKUNMA - onlar gerçek Google yorumları
9. Müşteri/kullanıcı adı ekleme, mevcut yorumlar yeterli

ÖZEL DİKKAT:
- Hyundai Elantra modeli için spesifik bilgiler ver
- Periyodik bakım km aralıklarını belirt (15.000, 30.000, 45.000 km)
- Fiyat tablosunu mantıklı doldur (örnek: Yağ değişimi, filtre değişimi, fren kontrolü)
- Sonunda başka yorum EKLEME
```

---

## 📋 ADIM 4: Dosyayı Konumlandır

```bash
# Oluşan dosyayı blog klasörüne taşı
mv elantra-periyodik-bakim-fiyatlari.md src/content/blog/

# Görsel ekle (isteğe bağlı)
# /public/images/blog/elantra-periyodik-bakim-fiyatlari.webp
```

---

## ⚠️ CURSOR OTOMATIK MOD UYARILARI

### YAPMASI GEREKENLER ✅
- Sadece placeholder'ları doldurmalı
- HTML class'larını korumalı
- Tablo ve liste yapılarını doldurmalı
- Türkçe dilbilgisi kurallarına uymalı

### YAPMAMASI GEREKENLER ❌
- Yeni yorum EKLEMEMELI (gerçek yorumlar zaten var)
- HTML yapısını değiştirmemeli
- CTA box'ları silmemeli
- Review card'ları düzenlememeli
- Slug dosyasına (layout) dokunmamalı

---

## 🔄 TEK KOMUTLA YENİ YAZI

Cursor'da Automatic Chat modundayken:

```
Python script'i çalıştır: "python3 blog-generator.py 'Yeni Başlık'"
Sonra oluşan .md dosyasını aç ve placeholder'ları doldur.
HTML yapısına dokunma, sadece köşeli parantez içindekilleri doldur.
```

---

## 🐛 SORUN GİDERME

### Cursor yorumları tekrar ekliyorsa:
```
Cursor'a söyle: "Müşteri yorumları bölümüne DOKUNMA. 
Zaten gerçek Google yorumları var, yeni yorum EKLEME."
```

### Cursor formatı bozuyorsa:
```
Cursor'a söyle: "Tüm HTML tag'leri ve class'ları AYNEN koru.
Sadece [Bu bölümü dolduracaksınız] yazılarını değiştir."
```

### Limiti doldu hatası alıyorsan:
```
Her yazıyı AYRI chat penceresinde yap.
Veya: "Sadece şu bölümü doldur: [Bölüm Adı]" de.
```

---

## 📊 BAŞARI KRİTERLERİ

Cursor'ın işi doğru yaptığını anlamak için:

✅ HTML class'ları değişmedi
✅ Yorumlar ekstra eklenmedi
✅ CTA box'lar doğru yerde
✅ Tablo düzgün dolduruldu
✅ En az 1000 kelime içerik var
✅ SEO dostu içerik yazıldı
✅ Türkçe yazım kurallarına uygun

---

## 💡 İPUÇLARI

1. **Gerçek yorumları önce hazırla** - Cursor işe başlamadan önce `real-reviews.json` doldurulmalı
2. **Her yazı için yeni chat** - Bağlam karışmasın
3. **Spesifik ol** - "Placeholder'ları doldur" yerine "Sadece [Bu bölüm] kısmını 200 kelime ile doldur" de
4. **Kontrol et** - Cursor'un oluşturduğu her dosyayı önce gözden geçir
5. **Template'i koru** - `blog-template.md` dosyasını yedekle

---

## 🎬 ÖRNEK KULLANIM

```bash
# 1. Yorumları hazırla
nano real-reviews.json  # Google yorumlarını ekle

# 2. Script çalıştır
python3 blog-generator.py "Hyundai i20 Şanzıman Bakımı"

# 3. Cursor'a ver
# Cursor Automatic Chat'te:
"hyundai-i20-sanziman-bakimi.md dosyasını aç.
Tüm placeholder'ları doldur ama HTML'e dokunma.
Yorum ekleme, onlar gerçek."

# 4. Kontrol et ve taşı
mv hyundai-i20-sanziman-bakimi.md src/content/blog/
```

---

## 📞 HIZLI BAŞVURU

**Yeni yazı oluştur:**
```bash
python3 blog-generator.py "Başlık"
```

**Cursor'a komut:**
```
Placeholder'ları doldur, HTML'e dokunma, yorum ekleme.
```

**Taşı:**
```bash
mv dosya.md src/content/blog/
```

---

BAŞARILAR! 🚀
