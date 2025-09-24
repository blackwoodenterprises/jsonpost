import type { MetadataRoute } from 'next'
import metadata from '@/content/blog/metadata.json'

// Define the base URL - you should replace this with your actual domain
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://jsonpost.com'

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
]

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

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date()
  
  // Generate static routes
  const staticUrls: MetadataRoute.Sitemap = staticRoutes.map(route => {
    const priority = route === '' ? 1.0 : 0.8
    const changeFrequency = route === '' ? 'weekly' : 'monthly'
    
    return {
      url: `${BASE_URL}${route}`,
      lastModified: currentDate,
      changeFrequency: changeFrequency as 'weekly' | 'monthly',
      priority: priority,
    }
  })

  // Generate blog post URLs
  const blogUrls: MetadataRoute.Sitemap = (metadata as BlogPost[]).map(post => {
    const lastModified = post.date ? new Date(post.date) : currentDate
    
    return {
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }
  })

  return [...staticUrls, ...blogUrls]
}