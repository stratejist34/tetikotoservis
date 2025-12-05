# ⚡ HIZLI BAŞVURU KILAVUZU

## 🎯 3 ADIM, 5 DAKİKA

### 1️⃣ YORUMLARI HAZIRLA (Bir kez yapılır)
```bash
# real-reviews.json dosyasını doldur
nano real-reviews.json
```

Google'dan gerçek yorumları kopyala-yapıştır.

---

### 2️⃣ YAZI OLUŞTUR
```bash
python3 blog-generator.py "Başlık Buraya"
```

---

### 3️⃣ CURSOR İLE DOLDUR

**KOPYALA-YAPIŞTIR:**

```
Oluşan markdown dosyasını aç.
Tüm [placeholder] kısımlarını doldur.

KURALLAR:
- HTML'e dokunma
- Yorumları değiştirme
- Her bölüm 150+ kelime
- Tablo 5+ satır
```

---

## 📁 DOSYALAR

| Dosya | Ne İşe Yarar |
|-------|-------------|
| `blog-generator.py` | Yazı iskeletini oluşturur |
| `blog-template.md` | Yazı şablonu |
| `real-reviews.json` | Gerçek Google yorumları |
| `README.md` | Detaylı açıklama |
| `CURSOR-KULLANIM-KILAVUZU.md` | Tam kılavuz |
| `CURSOR-KOMUTLAR.md` | Kopyala-yapıştır komutlar |

---

## ✅ KONTROL LİSTESİ

- [ ] `real-reviews.json` dolu (10+ yorum)
- [ ] Script çalıştı
- [ ] Cursor placeholder'ları doldurdu
- [ ] HTML bozulmadı
- [ ] Yorum eklenmedi
- [ ] 1000+ kelime var
- [ ] Dosya `src/content/blog/` taşındı

---

## 🐛 SORUN GİDERME

| Sorun | Çözüm |
|-------|-------|
| Cursor yorum ekledi | "Yorum ekleme" de |
| HTML bozuldu | "Sadece [placeholder] doldur" de |
| Kısa içerik | "Her bölüm 150+ kelime" de |
| Cursor tıkandı | Yeni chat aç |

---

## 📞 HIZLI KOMUTLAR

```bash
# Yeni yazı
python3 blog-generator.py "Başlık"

# Dosya taşı
mv dosya.md src/content/blog/

# Test
npm run dev
```

---

## 💡 İPUÇLARI

✅ Her yazı için yeni chat kullan
✅ Önce yorumları topla
✅ Cursor'a spesifik ol
✅ Önizleme yap
✅ SEO kontrol et

❌ HTML'i değiştirme
❌ Yorum ekleme
❌ Şablonu silme
❌ Limit dolmadan durma

---

## 🎬 ÖRNEK BAŞLIKLAR

```
"Elantra Periyodik Bakım Fiyatları"
"Tucson Fren Balatası Değişimi"
"i20 Motor Bakımı Ne Zaman Yapılmalı"
"Gebze Hyundai Servis Kampanyaları"
"Kia Sportage Egzoz Sistemi Tamiri"
```

---

## 🚀 BAŞLA!

1. `real-reviews.json` doldur
2. `python3 blog-generator.py "Başlık"`
3. Cursor'a talimat ver
4. Kontrol et
5. Yayınla

**BAŞARILAR!** 🎉

Detay için: README.md veya CURSOR-KULLANIM-KILAVUZU.md
