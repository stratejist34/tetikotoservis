import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import remarkSlug from 'remark-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

export default defineConfig({
  integrations: [
    tailwind(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      // Canonical tag'li sayfaları sitemap'ten hariç tut (SEO için)
      filter: (page) => {
        // Eğer sayfa canonical tag içeriyorsa ve başka bir sayfaya işaret ediyorsa hariç tut
        // Bu durumda sitemap'te sadece ana sayfalar olacak
        return true; // Şimdilik tüm sayfaları dahil et
      },
    }),
  ],
  site: 'https://hyundaiservisim.com',
  markdown: {
    shikiConfig: {
      theme: 'dracula',
    },
    remarkPlugins: [remarkSlug],
    rehypePlugins: [
      [rehypeAutolinkHeadings, { 
        behavior: 'wrap',
        properties: {
          className: ['heading-link']
        }
      }],
    ],
    drafts: true,
    experimentalAssets: true,
  },
  redirects: {
    // ========================================
    // HYUNDAI - Eski duplicate sayfaları yeni lokasyon sayfasına yönlendir
    // ========================================
    '/hyundai-ozel-servis-gebze': '/gebze-hyundai-servis',
    '/tag/gebze-hyundai-servis': '/gebze-hyundai-servis',
    '/tag/gebze-hyundai-ozel-servisi': '/gebze-hyundai-servis',
    
    // ========================================
    // KIA - Eski duplicate sayfaları yeni lokasyon sayfasına yönlendir
    // ========================================
    '/gebze-kia-servisi': '/gebze-kia-servis',
    '/kia-ozel-servis-gebze-tuzla': '/gebze-kia-servis',
    
    // ========================================
    // NISSAN - Eski duplicate sayfaları yeni lokasyon sayfasına yönlendir
    // ========================================
    '/nissan-ozel-servis-gebze': '/gebze-nissan-servis',
    
    // ========================================
    // MODEL SAYFALARI (modeller/[slug] yapısına yönlendir)
    // ========================================
    '/tag/tuzla-hyundai-i10': '/modeller/hyundai-i10',
    '/tag/hyundai-i10-elektrik-tamiri': '/modeller/hyundai-i10',
    
    // ========================================
    // GENEL SAYFALAR
    // ========================================
    '/hyundai-periyodik-bakim-servisi': '/hizmetlerimiz',
    '/hizmetler/periyodik-bakim': '/hizmetlerimiz',
  },
});
