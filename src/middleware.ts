import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
    const { pathname } = context.url;

    // Trailing Slash Normalization
    // Eğer path "/" değilse ve sonu "/" ile bitiyorsa, bunu temizle ve redirect et.
    if (pathname.length > 1 && pathname.endsWith('/')) {
        // Query string ve hash'i koru
        const cleanPath = pathname.slice(0, -1) + context.url.search;

        // 301 Permanent Redirect
        return context.redirect(cleanPath, 301);
    }

    return next();
});
