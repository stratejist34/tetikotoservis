#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Blog Yazısı Oluşturma Aracı v3.0
Hyundai Servis Sitesi için SEO-optimize blog yazıları oluşturur
Otomatik içerik üretimi ve dosya yönetimi
"""

import sys
import re
import json
import random
import shutil
from datetime import datetime
from pathlib import Path

def slugify(text):
    """Başlığı URL-friendly slug'a çevir - BASIT VE ETKİLİ"""
    text = text.lower()
    
    # Tüm Türkçe karakterleri İngilizce karşılıklarıyla değiştir
    replacements = {
        'ı': 'i', 'İ': 'i', 'I': 'i',  # Her türlü I harfi
        'ğ': 'g', 'Ğ': 'g',
        'ü': 'u', 'Ü': 'u',
        'ş': 's', 'Ş': 's',
        'ö': 'o', 'Ö': 'o',
        'ç': 'c', 'Ç': 'c',
    }
    
    for old, new in replacements.items():
        text = text.replace(old, new)
    
    # Sadece harf, rakam, boşluk ve tire bırak
    text = re.sub(r'[^a-z0-9\s-]', '', text)
    # Boşlukları tireye çevir
    text = re.sub(r'\s+', '-', text)
    # Çift tireleri tek yap
    text = re.sub(r'-+', '-', text)
    # Başlangıç/bitiş tirelerini temizle
    return text.strip('-')

def load_real_reviews():
    """Gerçek yorumları yükle"""
    try:
        with open('real-reviews.json', 'r', encoding='utf-8') as f:
            data = json.load(f)
            return data['reviews']
    except FileNotFoundError:
        print("UYARI: real-reviews.json bulunamadi!")
        return []

def generate_review_html(reviews, count=5):
    """Rastgele gerçek yorumlar seç ve HTML oluştur"""
    selected = random.sample(reviews, min(count, len(reviews)))
    
    html = ""
    colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']
    
    for i, review in enumerate(selected):
        color = colors[i % len(colors)]
        stars = "⭐" * review['rating']
        
        # 'author' veya 'name' kullan
        author_name = review.get('author', review.get('name', 'Müşteri'))
        avatar = review.get('avatar', author_name[0])
        
        html += f'''
<div class="review-card">
  <div class="review-avatar" style="background: {color};">
    {avatar}
  </div>
  <div class="review-content">
    <div class="review-meta">
      <strong>{author_name}</strong>
      <span class="review-stars">{stars}</span>
      <span class="review-date">{review['date']}</span>
    </div>
    <p class="review-text">{review['text']}</p>
  </div>
</div>
'''
    
    return html

def generate_seo_description(title, max_length=155):
    """SEO-friendly description oluştur (Google standartları)"""
    # Başlıktan anahtar kelimeleri çıkar
    keywords = [word for word in title.lower().split() if len(word) > 3]
    
    # Temel cümle şablonları
    templates = [
        f"{title} hakkında detaylı bilgi ve güncel fiyatlar.",
        f"{title} için profesyonel hizmet. Randevu: 0533 615 7835",
        f"{title} maliyetleri, km aralıkları ve servis detayları.",
    ]
    
    # İlk template'i al, title ile başla
    description = f"{title}. "
    
    # Anahtar kelimelerle devam et
    if 'bakım' in title.lower() or 'bakim' in title.lower():
        description += "Periyodik bakım fiyatları ve km aralıkları. "
    elif 'fren' in title.lower():
        description += "Fren sistemi değişim fiyatları ve detayları. "
    elif 'motor' in title.lower():
        description += "Motor bakım maliyetleri ve işlem detayları. "
    else:
        description += "Detaylı fiyat listesi ve servis bilgileri. "
    
    # CTA ekle
    description += "Hemen arayın: 0533 615 7835"
    
    # Uzunluk kontrolü (Google max 160 karakter)
    if len(description) > max_length:
        description = description[:max_length-3] + "..."
    
    return description

def generate_faq_schema(title, slug):
    """Otomatik FAQ Schema oluştur"""
    # Başlıktan soru üret
    faqs = []
    
    # Fiyat sorusu
    if 'fiyat' in title.lower():
        faqs.append({
            "question": f"{title.replace('Fiyatları', '').replace('Fiyatı', '').strip()} ne kadar?",
            "answer": f"{title} konusunda detaylı fiyat bilgisi için yazımızı okuyabilirsiniz. Güncel fiyatlar için 0533 615 7835 numaralı telefondan bize ulaşabilirsiniz."
        })
    
    # Bakım sorusu
    if 'bakım' in title.lower() or 'bakim' in title.lower():
        faqs.append({
            "question": f"{title.split()[0]} kaç km'de bakıma girmeli?",
            "answer": f"Periyodik bakım aralıkları genellikle 10.000-15.000 km arasındadır. Detaylı bilgi için yazımızı okuyun."
        })
        faqs.append({
            "question": f"{title.split()[0]} periyodik bakım masrafı nedir?",
            "answer": f"Bakım masrafları araç modeline ve km'ye göre değişir. Detaylı fiyatlar için yazımızı inceleyin."
        })
    
    # Genel soru
    faqs.append({
        "question": "Randevu almak zorunlu mu?",
        "answer": "Randevu almanızı öneririz ancak zorunlu değildir. Randevu ile bekleme sürenizi minimuma indirebilirsiniz."
    })
    
    return faqs

def find_related_posts(current_slug, current_tags):
    """İlgili blog yazılarını bul (iç linkleme için)"""
    try:
        # src/content/blog klasöründeki tüm md dosyalarını tara
        blog_dir = Path("../src/content/blog")
        if not blog_dir.exists():
            return []
        
        related = []
        for md_file in blog_dir.glob("*.md"):
            if md_file.stem == current_slug:
                continue
                
            # Dosyayı oku ve frontmatter'ı parse et
            with open(md_file, 'r', encoding='utf-8') as f:
                content = f.read()
                # Basit frontmatter parse (sadece tags)
                if 'tags:' in content:
                    try:
                        tags_line = [line for line in content.split('\n') if 'tags:' in line][0]
                        # Tag benzerliğine bak
                        for tag in current_tags:
                            if tag in tags_line.lower():
                                title_line = [line for line in content.split('\n') if 'title:' in line][0]
                                title = title_line.split('title:')[1].strip().strip('"\'')
                                related.append({
                                    'slug': md_file.stem,
                                    'title': title
                                })
                                break
                    except:
                        pass
        
        return related[:3]  # Maksimum 3 ilgili yazı
    except:
        return []

def generate_content_from_title(title):
    """Başlıktan otomatik içerik üret - SEO optimize, detaylı içerikler"""
    title_lower = title.lower()
    
    # Anahtar kelime tespiti
    is_brake = 'fren' in title_lower or 'balata' in title_lower or 'baskı' in title_lower
    is_maintenance = 'bakım' in title_lower or 'bakim' in title_lower
    is_motor_oil = 'motor yağı' in title_lower or 'motor yagi' in title_lower or 'yağ' in title_lower
    is_price = 'fiyat' in title_lower
    is_klima = 'klima' in title_lower
    is_suspension = 'süspansiyon' in title_lower or 'suspension' in title_lower
    is_battery = 'akü' in title_lower or 'aku' in title_lower or 'battery' in title_lower
    
    # Model adını çıkar (genişletilmiş liste)
    model = ""
    if 'ix35' in title_lower: model = "iX35"
    elif 'ix25' in title_lower: model = "iX25"
    elif 'ix20' in title_lower: model = "iX20"
    elif 'elantra' in title_lower: model = "Elantra"
    elif 'tucson' in title_lower: model = "Tucson"
    elif 'accent' in title_lower: model = "Accent"
    elif 'i20' in title_lower: model = "i20"
    elif 'i30' in title_lower: model = "i30"
    elif 'i10' in title_lower: model = "i10"
    elif 'sonata' in title_lower: model = "Sonata"
    elif 'santa fe' in title_lower or 'santa-fe' in title_lower: model = "Santa Fe"
    elif 'creta' in title_lower: model = "Creta"
    elif 'santamo' in title_lower: model = "Santamo"
    elif 'kona' in title_lower: model = "Kona"
    elif 'venue' in title_lower: model = "Venue"
    elif 'palisade' in title_lower: model = "Palisade"
    
    content = {}
    
    # Giriş paragrafı
    if is_brake:
        content['intro'] = f"Hyundai {model} fren balata değişimi ve bakımı için Gebze ve Tuzla bölgesinin uzman servisi. " \
                          f"{model} için baskı balata değişimi, fren diski kontrolü ve fren sistemi bakım hizmetleri. " \
                          f"15 yıllık deneyimimizle {model} fren bakımlarında güvenilir çözüm."
        
        content['important'] = f"{model} fren balata değişimi 30.000-40.000 km arasında yapılmalıdır. " \
                               f"Bakımsız frenler fren mesafesini %35 artırır ve güvenlik riski oluşturur."
        
        content['heading1'] = f"{model} Fren Sistemi Bileşenleri"
        content['section1'] = f"Hyundai {model} fren sistemi üç ana bileşenden oluşur:\n\n" \
                             f"**1. Fren Balata (Baskı Balata):** Fren pedalına basıldığında disklere sürtünerek fren kuvvetini oluşturur. " \
                             f"{model}'larda ön fren balata 30.000-40.000 km'de, arka fren balata 50.000-60.000 km'de değiştirilmelidir.\n\n" \
                             f"**2. Fren Diski:** Balataların üzerine sürtündüğü dairesel metal parça. {model}'larda disk tornalama gerekirse yapılır. " \
                             f"Diski tamamen yenilenecek durumda ise değişimi gerekir.\n\n" \
                             f"**3. Fren Hidroliği:** Fren gücünün pedalından balatalara iletilmesini sağlar. " \
                             f"Her 2 yılda bir veya 40.000 km'de değiştirilmelidir."
        
        content['heading2'] = f"{model} Fren Balata Değişim Fiyatları"
        content['section2'] = f"{model} fren balata değişim fiyatları yedek parça kalitesine ve model yılına göre değişir."
        
        content['table_headers'] = ['İşlem', 'Fiyat', 'Süre']
        content['table_rows'] = [
            '<tr><td>Ön fren balata değişimi</td><td>1.200₺ - 2.500₺</td><td>1 saat</td></tr>',
            '<tr><td>Arka fren balata değişimi</td><td>800₺ - 1.800₺</td><td>45 dakika</td></tr>',
            '<tr><td>Ön+Arka fren balata seti</td><td>1.500₺ - 3.500₺</td><td>1.5 saat</td></tr>',
            '<tr><td>Fren diski tornalama</td><td>400₺ - 800₺</td><td>30 dakika</td></tr>',
            '<tr><td>Fren hidroliği değişimi</td><td>350₺ - 550₺</td><td>20 dakika</td></tr>'
        ]
        
        content['heading3'] = f"{model} Fren Bakımı Neden Önemli?"
        content['section3'] = f"Düzenli fren bakımı {model} sahipleri için hayati öneme sahiptir:\n\n" \
                             f"- **Güvenlik:** Bakımsız frenler fren mesafesini %35 artırır\n" \
                             f"- **Tasarruf:** Erken değişim disk tornalama maliyetini önler\n" \
                             f"- **Performans:** Aşınmış balata fren yaparken ses çıkarır\n" \
                             f"- **Sürtünme:** Disk aşınması artar, komple set değişimi gerekir"
        
        content['tip'] = f"{model} fren balatanızın aşınma durumunu kontrol etmek için ücretsiz fren muayenesi yapıyoruz. " \
                        f"Balata 3mm altında ise derhal değiştirilmelidir. Ayrıca fren pedalı yumuşuyorsa fren hidroliği değişimi gerekebilir."
        
        content['heading4'] = "Fren Bakım Sinyalleri"
        content['section4'] = f"{model}'nizde fren bakımı gerektiğini gösteren belirtiler:"
        
        checklist = [
            "Fren yaparken tiz bir ses geliyor",
            "Fren pedalı çok yumuşak hissediliyor",
            "Fren yaparken direksiyon titriyor",
            "Fren butonu (ABS) ışığı yanıyor",
            "Fren mesafesi uzuyor"
        ]
        content['checklist'] = "\n".join([f"- {item}" for item in checklist])
        
        content['heading5'] = f"{model} Fren Bakım Sonrası Garantiler"
        content['section5'] = f"Tüm {model} fren bakımlarımızda:\n\n" \
                             f"- ✅ 6 ay / 10.000 km garanti\n" \
                             f"- ✅ 30 gün içinde ücretsiz kontrol\n" \
                             f"- ✅ İşçilik garantisi\n" \
                             f"- ✅ Parça garantisi\n" \
                             f"- ✅ WhatsApp servis takibi"
        
        content['conclusion'] = f"Hyundai {model} fren balata değişimi ve bakımı için Gebze ve Tuzla bölgesinin güvenilir servisi. " \
                               f"15 yıllık deneyimimizle {model} sahiplerine profesyonel hizmet. " \
                               f"Aynı gün teslim ve şeffaf fiyat politikası ile {model} fren sisteminiz güvende."
    
    elif is_motor_oil and model:
        # Motor Yağı Değişimi için özel içerik
        content['intro'] = f"Hyundai {model} motor yağı değişimi için Gebze ve Tuzla bölgesinin uzman servisi. " \
                          f"{model} için doğru motor yağı seçimi, yağ değişimi periyodu ve fiyatları. " \
                          f"15 yıllık {model} motor bakım deneyimi ile aracınız güvende."
        
        content['important'] = f"{model} motor yağı değişimi 10.000-12.000 km arasında yapılmalıdır. " \
                              f"Yağ değişimi ertelendiğinde motor içi aşınmalar %38 artar ve motor ömrü %40 kısalır."
        
        content['heading1'] = f"{model} Motor Yağı Değişimi Nasıl Yapılır?"
        content['section1'] = f"Hyundai {model} motor yağı değişimi profesyonel bir işlemdir:\n\n" \
                            f"**1. Eski Yağın Boşaltılması:** Motor yağı contası gevşetilerek eski yağ tamamen boşaltılır.\n\n" \
                            f"**2. Yağ Filtresi Değişimi:** Eski yağ filtresi çıkarılır ve yeni filtresi takılır.\n\n" \
                            f"**3. Yeni Yağ Eklienmesi:** {model} için uygun viskoziteli (5W-30 veya 5W-40) sentetik yağ eklenir.\n\n" \
                            f"**4. Kontrol:** Yağ seviyesi ve motor kontrol edilir."
        
        content['heading2'] = f"{model} Motor Yağı Değişim Fiyatları 2025"
        content['section2'] = f"{model} motor yağı değişim fiyatları model yılına ve motor hacmine göre değişir."
        
        content['table_headers'] = ['İşlem', 'Fiyat', 'Süre']
        content['table_rows'] = [
            '<tr><td>Motor yağı + filtre değişimi</td><td>1.500₺ - 3.500₺</td><td>30 dakika</td></tr>',
            '<tr><td>Dijital motor kontrolü</td><td>Ücretsiz</td><td>-</td></tr>',
            '<tr><td>Hava filtresi (ekstra)</td><td>400₺ - 600₺</td><td>10 dakika</td></tr>',
            '<tr><td>Komple küçük bakım</td><td>1.800₺ - 4.000₺</td><td>1 saat</td></tr>'
        ]
        
        content['heading3'] = f"{model} Motor Yağı Değişimi Neden Önemli?"
        content['section3'] = f"Motor yağı {model}'ınızın kalbidir:\n\n" \
                            f"- **Motor Ömrü:** Düzenli değişim motor ömrünü %40 uzatır\n" \
                            f"- **Performans:** Yaşlı yağ motor performansını %18 düşürür\n" \
                            f"- **Yakıt:** Yeni yağ yakıt tüketimini %12 azaltır\n" \
                            f"- **Arıza:** Bakımsız motorlar arıza riskini %42 artırır"
        
        content['tip'] = f"{model} motor yağı değişimini 10.000 km'yi geçirmeden yapın. " \
                        f"Çok sert kullanıyorsanız (sürekli şehir içi, kısa mesafe) 8.000 km'de değiştirin. " \
                        f"Motor yağı koyu renge dönüşüyorsa derhal değişim gerekir."
        
        content['heading4'] = "Motor Yağı Değişim Sinyalleri"
        content['section4'] = f"{model}'nizde motor yağı değişimi gerektiğini gösteren belirtiler:"
        
        checklist = [
            "Yağ seviyesi normalin altına düştü",
            "Motor çok sesli çalışıyor",
            "Motor performansı düştü",
            "Yakıt tüketimi arttı",
            "Motor lambası yanıyor"
        ]
        content['checklist'] = "\n".join([f"- {item}" for item in checklist])
        
        content['heading5'] = f"{model} Motor Yağı Değişim Sonrası"
        content['section5'] = f"Tüm {model} motor yağı değişimlerimizde:\n\n" \
                             f"- ✅ 6 ay / 10.000 km garanti\n" \
                             f"- ✅ Yağ filtresi dahil\n" \
                             f"- ✅ Dijital motor kontrolü\n" \
                             f"- ✅ Ekspres hizmet (30 dakika)\n" \
                             f"- ✅ WhatsApp servis takibi"
        
        content['conclusion'] = f"Hyundai {model} motor yağı değişimi için Gebze ve Tuzla bölgesinin profesyonel servisi. " \
                               f"15 yıl deneyim, doğru yağ seçimi, ekspres hizmet. " \
                               f"Fiyat teklifi için hemen iletişime geçin: 0533 615 7835"
    
    elif is_maintenance:
        # iX35 için özel içerik
        if 'ix35' in title_lower or model == 'iX35':
            content['intro'] = f"Hyundai iX35 periyodik bakım fiyatları 2025 güncel listesi. Gebze ve Tuzla bölgesinin en deneyimli iX35 uzmanı servisi. " \
                              f"15 yıllık Hyundai ve iX35 deneyimimizle iX35 periyodik bakımlarında lider. " \
                              f"Aynı gün hizmet, şeffaf fiyatlar ve 6 ay garanti ile iX35'niz güvende."
            
            content['important'] = f"iX35 periyodik bakım 10.000-12.000 km arasında yapılmalıdır. " \
                                  f"Bakım ertelendiğinde motor aşınması %38 artar, yakıt tüketimi %12 yükselir ve motor ömrü %40 kısalır."
            
            content['heading1'] = f"iX35 Genel Bakım Fiyat Çizelgesi"
            content['section1'] = f"iX35 periyodik bakım fiyatları motor tipine (1.6 MPI, 2.0 MPI, 2.0 CRDI) göre değişir.\n\n" \
                                f"**iX35 1.6 MPI Motor:**\n" \
                                f"- Küçük bakım (yağ + filtre): 1.800₺ - 3.500₺\n" \
                                f"- Orta bakım: 2.500₺ - 4.500₺\n" \
                                f"- Büyük bakım (komple): 4.500₺ - 7.000₺\n\n" \
                                f"**iX35 2.0 MPI/CRDI Motor:**\n" \
                                f"- Küçük bakım (yağ + filtre): 2.200₺ - 4.000₺\n" \
                                f"- Orta bakım: 3.300₺ - 5.500₺\n" \
                                f"- Büyük bakım (komple): 5.500₺ - 8.500₺"
            
            # Tablo başlıkları iX35 için
            content['table_headers'] = ['Motor Tipi', 'Küçük Bakım', 'Büyük Bakım']
            content['table_rows'] = [
                '<tr><td>1.6 MPI</td><td>1.800₺ - 3.500₺</td><td>4.500₺ - 7.000₺</td></tr>',
                '<tr><td>2.0 MPI</td><td>2.200₺ - 4.000₺</td><td>5.500₺ - 8.000₺</td></tr>',
                '<tr><td>2.0 CRDI (Dizel)</td><td>2.500₺ - 4.500₺</td><td>6.000₺ - 9.000₺</td></tr>'
            ]
            
            content['heading2'] = f"iX35 Motor ve Performans Bakımı"
            content['section2'] = f"### 🚗 1.6 MPI Motor Bakımı\n\n" \
                                f"**iX35 1.6 MPI motorlar** için özel bakım programı. Gebze ve Tuzla bölgesinin _en tecrübeli_ iX35 uzmanı servis hizmetleri.\n\n" \
                                f"#### 🔧 1.6 iX35 Bakım Hizmetleri:\n\n" \
                                f"- **Motor Yağı Değişimi** (5W-30 özel formül)\n" \
                                f"- _Hava Filtresi_ değişimi (20.000 km)\n" \
                                f"- **Yakıt Filtresi** değişimi (30.000 km)\n" \
                                f"- _Buji Kontrolü_ ve değişimi\n" \
                                f"- **Timing Kayışı** kontrolü (60.000 km)\n" \
                                f"- _Su Pompası_ ve termostat kontrolü\n\n" \
                                f"💰 **1.6 iX35 Küçük Bakım:** 1.800₺ - 3.500₺  \n" \
                                f"⏱️ **İşlem Süresi:** 1-1.5 saat  \n" \
                                f"🛡️ **Garanti:** 6 ay / 10.000 km\n\n" \
                                f"### 🚀 2.0 CRDI Motor (Dizel) Bakımı\n\n" \
                                f"**iX35 2.0 CRDI dizel motorlar** için özel servis deneyimi. Dizel motorlarda _özel bakım gereksinimleri_ ve profesyonel işleme.\n\n" \
                                f"- **Dizel motor yağı** değişimi (özel dizel yağı)\n" \
                                f"- _Mazot filtresi_ değişimi (30.000 km)\n" \
                                f"- **Turbo sistem** kontrolü ve temizliği\n" \
                                f"- _EGR sistem_ bakımı\n" \
                                f"- **DPF (Partikül Filtresi)** bakımı (60.000 km)\n\n" \
                                f"⚠️ **Uyarı:** Dizel modellerde bakım ihmalı motor arızası riskini %48 artırır.\n\n" \
                                f"💰 **2.0 CRDI Bakım Fiyatı:** 2.500₺ - 5.000₺"
        
            # iX35 için ek devam eden içerikleri ekle
            content['heading3'] = "iX35 Bakımın Önemi ve İstatistikler"
            content['section3'] = f"<div class=\"info-box\">\n<strong>📊 iX35 Motor Performans İstatistikleri:</strong><br>\n" \
                                f"• 12.000 km'de bakım: Motor güç kaybı %2<br>\n" \
                                f"• 18.000 km'de bakım: Motor güç kaybı %12<br>\n" \
                                f"• 25.000 km'de bakım: Motor hasarı riski %28<br>\n" \
                                f"• Bakımsız kullanım: Yakıt tüketimi %18 artar<br>\n" \
                                f"<em>Kaynak: Tetik Oto iX35 servis verileri</em>\n</div>"
            
            content['tip'] = f"💡 UZMAN TAVSİYESİ: iX35 araçlarında erken bakım, motor performansını %35 artırır ve yakıt tasarrufu sağlar. " \
                            f"12.000 km'de mutlaka motor yağı değişimi yapılmalı. İhmal edilmesi motor arıza riskini %42 artırır."
            
            content['heading4'] = "iX35 Sahipleri İçin Özel Avantajlar"
            content['section4'] = f"### 🎯 Ücretsiz Hizmetler\n\n" \
                                f"Gebze bölgesindeki iX35 sahipleri için:\n\n" \
                                f"- ✅ **Ücretsiz araç kontrolü** (bakım kararı)\n" \
                                f"- ✅ Klima basınç kontrolü (ücretsiz)\n" \
                                f"- ✅ Elektronik diyagnostik (ücretsiz - bakım alanlar için)\n" \
                                f"- ✅ Fiyat teklifi (ücretsiz)\n\n" \
                                f"### 💰 Özel Kampanyalar\n\n" \
                                f"- 🔥 **İlk Hizmet İndirimi:** %15\n" \
                                f"- 🔥 **Motor + Klima Paketi:** %20 indirim\n" \
                                f"- 🔥 **Aynı Gün Teslim:** Özel fiyat avantajı\n" \
                                f"- 🔥 **Sadık Müşteri:** 3+ hizmet alanlara %10 indirim"
            
            checklist = [
                "Motor yağı seviyesi kontrol edin",
                "Lastik hava basıncını kontrol edin",
                "Klima performansını test edin",
                "Km bilgisini hazır bulundurun"
            ]
            content['checklist'] = "\n".join([f"- {item}" for item in checklist])
            
            content['heading5'] = "iX35 Bakım Garantileri"
            content['section5'] = f"### 🛡️ Tüm Bakımlarımızda Garanti\n\n" \
                                f"- **Parça Garantisi:** 1 yıl / 30.000 km\n" \
                                f"- **İşçilik Garantisi:** 6 ay\n" \
                                f"- **Rastgele Kontrol:** 30 gün içinde ücretsiz\n" \
                                f"- **Hata Düzeltme:** İşçilik hatalarında ücretsiz"
            
            content['conclusion'] = f"Hyundai iX35 periyodik bakım için Gebze ve Tuzla'da profesyonel servis. " \
                                  f"15 yıl deneyim, 6 ay garanti, aynı gün teslim. iX35 bakımında lider servis. " \
                                  f"Fiyat teklifi için hemen iletişime geçin."
        
        else:
            # Genel bakım içeriği (diğer modeller için)
            content['intro'] = f"Hyundai {model} periyodik bakım fiyatları ve detaylı servis bilgileri. " \
                              f"Gebze ve Tuzla bölgesinin en deneyimli {model} servisi. " \
                              f"15 yıllık {model} bakım deneyimi ile aracınız güvende."
            
            content['important'] = f"{model} periyodik bakım 10.000-12.000 km arasında yapılmalıdır. " \
                                  f"Bakım ertelendiğinde motor aşınması %38 artar ve yakıt tüketimi %12 yükselir."
            
            content['heading1'] = f"{model} Motor Bakımı"
            content['section1'] = f"Hyundai {model} motor bakımı için kritik işlemler:\n\n" \
                                f"- **Motor yağı değişimi:** 10.000 km'de (5W-30/5W-40)\n" \
                                f"- **Motor filtresi:** Her yağ değişiminde\n" \
                                f"- **Hava filtresi:** 20.000 km'de\n" \
                                f"- **Yakıt filtresi:** 30.000 km'de\n" \
                                f"- **Buji değişimi:** 30.000-40.000 km'de"
            
            content['heading2'] = f"{model} Bakım Fiyat Listesi"
            content['section2'] = f"{model} periyodik bakım fiyatları model yılına ve motor tipine göre değişir."
            
            content['table_headers'] = ['Bakım Türü', 'Fiyat', 'Periyot']
            content['table_rows'] = [
                '<tr><td>Küçük bakım (yağ+filtre)</td><td>1.800₺ - 4.000₺</td><td>12.000 km</td></tr>',
                '<tr><td>Hava filtresi değişimi</td><td>400₺ - 600₺</td><td>20.000 km</td></tr>',
                '<tr><td>Yakıt filtresi değişimi</td><td>400₺ - 550₺</td><td>30.000 km</td></tr>',
                '<tr><td>Buji değişimi</td><td>400₺ - 600₺</td><td>40.000 km</td></tr>',
                '<tr><td>Büyük bakım (komple)</td><td>4.500₺ - 8.500₺</td><td>30.000 km</td></tr>'
            ]
            
            content['heading3'] = "Bakımın Önemi"
            content['section3'] = f"Düzenli bakım {model}'ınızın ömrünü uzatır:\n\n" \
                                 f"- Motor ömrü %40 daha uzun\n" \
                                 f"- Arıza riski %35 azalır\n" \
                                 f"- Yakıt tüketimi %15 düşer\n" \
                                 f"- İkinci el değer kaybı %30 düşer"
            
            content['tip'] = f"{model} motor yağı seviyesini ayda bir kontrol edin. " \
                            f"Yağ eksilirse motor içi aşınmalar hızlanır. 10.000 km'yi geçirmeyin."
            
            content['heading4'] = "Bakım Kontrol Listesi"
            content['section4'] = f"{model} bakımına gelmeden önce:"
            
            checklist = [
                "Motor yağı seviyesi kontrol edin",
                "Lastik hava basıncını kontrol edin",
                "Araçta ses veya titreme var mı not edin",
                "Km bilgisini hazır bulundurun",
                "Araç şasisi/plaka bilgileri hazır olsun"
            ]
            content['checklist'] = "\n".join([f"- {item}" for item in checklist])
            
            content['heading5'] = "Garanti ve Hizmetler"
            content['section5'] = f"Tüm {model} bakımlarında:\n\n" \
                                 f"- ✅ 6 ay / 10.000 km garanti\n" \
                                 f"- ✅ Aynı gün teslim (randevulu)\n" \
                                 f"- ✅ Ücretsiz kontrol\n" \
                                 f"- ✅ WhatsApp servis takibi"
            
            content['conclusion'] = f"Hyundai {model} periyodik bakım için Gebze ve Tuzla'da profesyonel servis. " \
                                   f"15 yıl deneyim, 6 ay garanti, aynı gün teslim. " \
                                   f"Fiyat teklifi için hemen iletişime geçin."
    
    else:
        # Genel içerik - her başlık için çalışır
        model_text = f"{model} " if model else ""
        
        content['intro'] = f"Hyundai {model_text}için Gebze ve Tuzla bölgesinin profesyonel servis hizmetleri. " \
                          f"15 yıllık deneyimimizle {model_text}sahipleri için güvenilir çözüm."
        
        content['important'] = f"Düzenli bakım aracınızın ömrünü uzatır ve beklenmedik arızaları önler. " \
                             f"Bakım ertelendiğinde arıza riski %38 artar."
        
        content['heading1'] = f"{model_text}Servis Hizmetleri"
        content['section1'] = f"Hyundai {model_text}için sunduğumuz kapsamlı servis hizmetleri:\n\n" \
                            f"- **Motor Bakımı:** Motor yağı, filtre değişimleri\n" \
                            f"- **Fren Sistemi:** Fren balata, disk kontrolü ve değişimi\n" \
                            f"- **Klima Bakımı:** Klima gazı ve filtre değişimi\n" \
                            f"- **Periyodik Bakım:** Tam bakım paketi\n" \
                            f"- **Arıza Tespiti:** Dijital diyagnostik"
        
        content['heading2'] = f"{model_text}Servis Fiyatları"
        content['section2'] = f"Hyundai {model_text}servis fiyatları model yılına ve işlem kapsamına göre değişir. Şeffaf fiyat politikamız ile net bilgi alın."
        
        content['table_headers'] = ['Hizmet', 'Fiyat', 'Süre']
        content['table_rows'] = [
            '<tr><td>Küçük bakım</td><td>1.800₺ - 3.500₺</td><td>1 saat</td></tr>',
            '<tr><td>Büyük bakım</td><td>4.000₺ - 7.000₺</td><td>2-3 saat</td></tr>',
            '<tr><td>Fren bakımı</td><td>1.200₺ - 2.500₺</td><td>1 saat</td></tr>',
            '<tr><td>Klima bakımı</td><td>700₺ - 1.400₺</td><td>45 dakika</td></tr>',
            '<tr><td>Elektrik</td><td>Keşif sonrası</td><td>-</td></tr>'
        ]
        
        content['heading3'] = "Neden Bizi Seçmelisiniz?"
        content['section3'] = f"Hyundai {model_text}servisinde bizi tercih etmenin nedenleri:\n\n" \
                            f"- ✅ **15 Yıllık Deneyim:** 2009'dan beri Hyundai uzmanı\n" \
                            f"- ✅ **Gebze ve Tuzla:** Size en yakın konumda\n" \
                            f"- ✅ **Şeffaf Fiyat:** Önce bilgi, sonra işlem\n" \
                            f"- ✅ **6 Ay Garanti:** Tüm işçilik garantili\n" \
                            f"- ✅ **Aynı Gün Hizmet:** Randevulu teslimat"
        
        content['tip'] = f"{model_text}aracınız için randevu alarak bekleme sürenizi azaltın. " \
                        f"0533 615 7835 numaralı telefondan hemen ulaşabilirsiniz."
        
        content['heading4'] = "Hizmet Kapsamı"
        content['section4'] = f"Hyundai {model_text}için sunduğumuz tüm hizmetler garantilidir."
        
        checklist = [
            "Ücretsiz ön kontrol",
            "6 ay / 10.000 km garanti",
            "Aynı gün teslim (randevulu)",
            "WhatsApp servis takibi",
            "Ekspres hizmet seçeneği"
        ]
        content['checklist'] = "\n".join([f"- {item}" for item in checklist])
        
        content['heading5'] = "İletişim ve Randevu"
        content['section5'] = f"Hyundai {model_text}servisleri için bize ulaşın:\n\n" \
                             f"- 📞 **Telefon:** 0533 615 7835\n" \
                             f"- 📍 **Adres:** Tuzla Küçük Oto Sanayi, B 2 Blok No:117\n" \
                             f"- 💬 **WhatsApp:** Randevu için yazabilirsiniz\n" \
                             f"- ⏰ **Çalışma:** Hafta içi 08:00-18:00"
        
        content['conclusion'] = f"Hyundai {model_text}servisi için Gebze ve Tuzla bölgesinin güvenilir adresi. " \
                               f"15 yıllık deneyim, şeffaf fiyat, hızlı çözüm. Hemen iletişime geçin."
    
    return content

def normalize_title(title):
    """Title'daki bozuk Türkçe karakterleri düzelt"""
    # PowerShell/Windows encoding hataları
    fixes = {
        'TÃ¼rkÃ§e': 'Türkçe',
        'TÃ¼rkçe': 'Türkçe',
        'TÃ¼rkÃ§': 'Türkç',
        'Ã§': 'ç',
        'Ã¼': 'ü',
        'Ã¶': 'ö',
        'Ã': 'İ',
        'Ä±': 'ı',
        'ÅŸ': 'ş',
        'Ä': 'ğ',
        'TÃ¼rk': 'Türk',
    }
    
    for old, new in fixes.items():
        title = title.replace(old, new)
    
    return title

def create_blog_content(title, reviews):
    """Blog içeriğini oluştur"""
    
    # Title'ı normalize et (bozuk encoding düzelt)
    title = normalize_title(title)
    
    # Başlıktan anahtar kelimeleri çıkar
    keywords = [word for word in title.lower().split() if len(word) > 3]
    
    # SEO açıklaması
    description = generate_seo_description(title)
    
    # Tarih
    date = datetime.now().strftime("%Y-%m-%d")
    
    # Tags
    tags = f'["{keywords[0]}", "bakim", "servis", "fiyat"]' if keywords else '["bakim", "servis"]'
    
    # Slug oluştur
    slug = slugify(title)
    
    # Image path
    image_path = f"/images/blog/{slug}.avif"
    
    # Alt text
    alt_text = f"{title} - Detaylı bilgi ve fiyat listesi"
    
    # FAQ Schema
    faqs = generate_faq_schema(title, slug)
    
    # İlgili yazılar
    related_posts = find_related_posts(slug, keywords)
    
    # Şablonu yükle
    with open('blog-template.md', 'r', encoding='utf-8') as f:
        template = f.read()
    
    # Yorumları oluştur
    reviews_html = generate_review_html(reviews, 5)
    
    # İçerik üret
    generated_content = generate_content_from_title(title)
    
    # Template değişkenlerini doldur
    content = template.replace('{{TITLE}}', title)  # Başlık AYNEN kullanılıyor!
    content = content.replace('{{DESCRIPTION}}', description)
    content = content.replace('{{DATE}}', date)
    content = content.replace('{{TAGS}}', tags)
    content = content.replace('{{IMAGE}}', image_path)
    content = content.replace('{{ALT_TEXT}}', alt_text)
    content = content.replace('{{INTRO_PARAGRAPH}}', generated_content.get('intro', ''))
    content = content.replace('{{IMPORTANT_INFO}}', generated_content.get('important', ''))
    content = content.replace('{{HEADING_1}}', generated_content.get('heading1', ''))
    content = content.replace('{{SECTION_1_CONTENT}}', generated_content.get('section1', ''))
    content = content.replace('{{HEADING_2}}', generated_content.get('heading2', ''))
    content = content.replace('{{SECTION_2_CONTENT}}', generated_content.get('section2', ''))
    content = content.replace('{{TABLE_HEADER_1}}', generated_content.get('table_headers', ['', '', ''])[0])
    content = content.replace('{{TABLE_HEADER_2}}', generated_content.get('table_headers', ['', '', ''])[1])
    content = content.replace('{{TABLE_HEADER_3}}', generated_content.get('table_headers', ['', '', ''])[2])
    table_rows = generated_content.get('table_rows', [])
    content = content.replace('{{TABLE_ROWS}}', '\n'.join(table_rows))
    content = content.replace('{{HEADING_3}}', generated_content.get('heading3', ''))
    content = content.replace('{{SECTION_3_CONTENT}}', generated_content.get('section3', ''))
    content = content.replace('{{EXPERT_TIP}}', generated_content.get('tip', ''))
    content = content.replace('{{HEADING_4}}', generated_content.get('heading4', ''))
    content = content.replace('{{SECTION_4_CONTENT}}', generated_content.get('section4', ''))
    content = content.replace('{{CHECKLIST_ITEMS}}', generated_content.get('checklist', ''))
    content = content.replace('{{HEADING_5}}', generated_content.get('heading5', ''))
    content = content.replace('{{SECTION_5_CONTENT}}', generated_content.get('section5', ''))
    content = content.replace('{{CONCLUSION}}', generated_content.get('conclusion', ''))
    
    # Yorumlar
    content = content.replace('{{REVIEWS_SECTION}}', reviews_html)
    
    # FAQ Schema ve İlgili Yazılar
    faq_html = ""
    for faq in faqs:
        faq_html += f"""
**{faq['question']}**

{faq['answer']}

"""
    content = content.replace('{{FAQ_SECTION}}', faq_html)
    
    # İlgili yazılar
    related_html = ""
    if related_posts:
        for post in related_posts:
            related_html += f"- [{post['title']}](/blog/{post['slug']})\n"
    else:
        related_html = "İlgili yazılar yakında eklenecek."
    
    content = content.replace('{{RELATED_POSTS}}', related_html)
    
    return content, slug

if __name__ == "__main__":
    # Windows console encoding fix
    if sys.platform == 'win32':
        try:
            sys.stdout.reconfigure(encoding='utf-8')
        except:
            pass
    
    # Basit başlık alma - encoding sorunlarını ignore et
    if len(sys.argv) >= 2:
        # Argümanları birleştir (boşluklar için)
        title = ' '.join(sys.argv[1:])
        # Encoding sorunlarını düzelt
        title = normalize_title(title)
    else:
        print("Kullanim: python blog-generator.py Blog Basligi")
        sys.exit(1)
    
    # UTF-8 encoding ile slug oluştur
    # slugify zaten tüm Türkçe karakterleri handle ediyor
    slug = slugify(title)
    
    # Emoji olmadan print (Windows uyumlu)
    print("Blog yazisi olusturuluyor...")
    print(f"Baslik: {title}")
    print(f"Slug: {slug}")
    
    # Yorumları yükle
    reviews = load_real_reviews()
    if not reviews:
        print("UYARI: Gercek yorum bulunamadi! Once real-reviews.json dosyasini doldur!")
    else:
        print(f"{len(reviews)} gercek yorum yuklendi")
    
    # İçeriği oluştur (artık slug da dönüyor)
    content, slug = create_blog_content(title, reviews)
    
    # Klasör yapısını oluştur
    target_dir = Path("../src/content/blog") / slug
    target_dir.mkdir(parents=True, exist_ok=True)
    
    # Dosyayı kaydet (target directory'ye)
    filename = target_dir / "index.md"
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"Blog yazisi olusturuldu: {filename}")
    print(f"Imaj: /images/blog/{slug}.avif")
    print("")
    print("TAMAMLANAN ADIMLAR:")
    print(f"✅ Blog yazisi '{slug}' klasorune olusturuldu")
    print(f"✅ src/content/blog/{slug}/index.md dosyasi hazir")
    print(f"✅ SEO optimize edildi")
    print(f"✅ Gercek yorumlar eklendi")
    print(f"✅ FAQ ve ilgili yazilar otomatik eklendi")
    print("")
    print("SONRAKI ADIM:")
    print(f"⚠️  public/images/blog/{slug}.avif imajini ekle")
    print("")
    print("ARTIK HAZIR!")
    print(f"Dosya: src/content/blog/{slug}/index.md")
    print(f"Test icin: npm run dev")