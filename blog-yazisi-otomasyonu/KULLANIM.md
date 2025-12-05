# Blog Yazısı Oluşturma - Kullanım Kılavuzu

## 🚀 BASIT KULLANIM

```bash
python blog-generator.py Başlık yazılıyor
```

**Tırnak işareti gereksiz!**

## Örnekler

```bash
python blog-generator.py Hyundai iX35 Periyodik Bakimlar
python blog-generator.py Tucson Motor Yagi Degisimi
python blog-generator.py Elantra Fren Balata
```

## Otomatik Yapılanlar

✅ SEO optimize başlık ve açıklama  
✅ İçerik otomatik üretiliyor  
✅ Fiyat tabloları ekleniyor  
✅ Müşteri yorumları ekleniyor  
✅ FAQ bölümü ekleniyor  
✅ Dosya `src/content/blog/` klasörüne kaydediliyor  

## Not

Türkçe karakterler (ı, ğ, ü, ş, ö, ç) slug'larda İngilizce karşılıklarına dönüşür:
- Bakimlar → bakimlar
- Ozelligi → ozelligi
- Olcu → olcu

Bu SEO için normaldir ve sorun değildir!
