import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://abhijit-karale.github.io/abhijit-karale-Portfolio/sitemap.xml',
  };
}
