---
// src/utils/readingTime.ts
// Okuma süresi hesaplama

export function calculateReadingTime(content: string): number {
  // Ortalama okuma hızı: dakikada 200 kelime
  const wordsPerMinute = 200;
  
  // HTML/Markdown tag'lerini temizle
  const cleanContent = content
    .replace(/<[^>]*>/g, '') // HTML tags
    .replace(/[#*_`]/g, '')  // Markdown işaretleri
    .trim();
  
  // Kelimeleri say
  const words = cleanContent.split(/\s+/).length;
  
  // Dakikayı hesapla (en az 1 dakika)
  const minutes = Math.ceil(words / wordsPerMinute);
  
  return Math.max(1, minutes);
}

// Astro component'lerinde kullanım:
// const readingTime = calculateReadingTime(await entry.body);
// <span>⏱️ {readingTime} dk okuma</span>
