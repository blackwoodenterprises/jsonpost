import { NextResponse } from 'next/server';
import metadata from '@/content/blog/metadata.json';

// Define the base URL - you should replace this with your actual domain
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://jsonpost.com';

// Static routes that should be included in the sitemap
const staticRoutes = [
  '',
  '/docs',
  '/blog',
  '/free-html-form-generator',
  '/help',
  '/quick-start',
  '/privacy-policy',
  '/terms-of-service',
  '/refund-policy',
  '/status',
];

interface BlogPost {
  slug: string;
  date: string;
  title: string;
  description: string;
  author: string;
  category: string;
  tags: string[];
  readTime: string;
  featured: boolean;
  mdxFile: string;
  ogImage: string;
}

function generateSitemapXML(): string {
  const currentDate = new Date().toISOString();
  
  // Generate static routes
  const staticUrls = staticRoutes.map(route => {
    const url = `${BASE_URL}${route}`;
    const priority = route === '' ? '1.0' : '0.8';
    const changefreq = route === '' ? 'weekly' : 'monthly';
    
    return `
  <url>
    <loc>${url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  }).join('');

  // Generate blog post URLs
  const blogUrls = (metadata as BlogPost[]).map(post => {
    const url = `${BASE_URL}/blog/${post.slug}`;
    const lastmod = post.date ? new Date(post.date).toISOString() : currentDate;
    
    return `
  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
  }).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticUrls}
  ${blogUrls}
</urlset>`;
}

export async function GET() {
  try {
    const sitemap = generateSitemapXML();
    
    return new NextResponse(sitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400', // Cache for 24 hours
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}