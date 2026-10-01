import { SITE } from '@/src/config/site';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/thank-you-contact/',
          '/thank-you-order/',
          '/thank-you-wholesale/',
          '/admin/',
          '/order/',
        ],
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-Web', 'PerplexityBot', 'Applebot', 'Amazonbot', 'Bytespider', 'CCBot', 'Google-Extended', 'Meta-ExternalAgent', 'cohere-ai'],
        allow: '/',
      },
    ],
    sitemap: `https://${SITE.domain}/sitemap.xml`,
  };
}
