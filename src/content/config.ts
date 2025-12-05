import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    
    // ✅ Tarih alanları - HER İKİSİ DE DESTEKLENİYOR
    // Hem eski bloglar (date) hem yeni bloglar (pubDate) çalışacak
    date: z.coerce.date().optional(),
    pubDate: z.coerce.date().optional(),
    
    // ✅ Kategori alanları - HER İKİSİ DE DESTEKLENİYOR
    // Hem eski bloglar (categories) hem yeni bloglar (category) çalışacak
    category: z.string().optional(),
    categories: z.array(z.string()).optional(),
    
    // ✅ İmaj alanları - HER İKİSİ DE DESTEKLENİYOR
    // Hem eski bloglar (coverImage) hem yeni bloglar (image) çalışacak
    image: z.string().optional(),
    coverImage: z.string().optional(),
    alt: z.string().optional(),
    
    // ✅ Diğer alanlar
    tags: z.array(z.string()).optional(),
    author: z.string().optional(),
    schema: z.string().optional(),
    draft: z.boolean().optional().default(false),
    
    // Manuel başlık çıkarma için
    headings: z.array(z.object({
      depth: z.number(),
      slug: z.string(),
      text: z.string(),
    })).optional(),
  }),
});

// Araç Modelleri Koleksiyonu
const modelsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    brand: z.enum(['Hyundai', 'Kia', 'Toyota', 'Nissan']), // Sadece bu markalar
    model: z.string(), // Örn: i20, Corolla
    metaTitle: z.string(),
    metaDescription: z.string(),
    image: z.string(), // Kapak görseli
    color: z.enum(['blue', 'red', 'slate', 'orange']).default('blue'), // Tema rengi
    
    // SSS Bölümü (Opsiyonel ama önerilir)
    faqs: z.array(z.object({
      question: z.string(),
      answer: z.string()
    })).optional(),

    // Öne Çıkan Özellikler (Örn: DCT Şanzıman, Hibrit Sistem)
    features: z.array(z.string()).optional(),
  })
});

export const collections = {
  blog: blogCollection,
  models: modelsCollection,
};
