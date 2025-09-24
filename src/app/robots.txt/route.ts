import { NextResponse } from 'next/server';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://jsonpost.com';

export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /

# Disallow auth and dashboard pages
Disallow: /auth/
Disallow: /dashboard/
Disallow: /api/
Disallow: /checkout

# Sitemap
Sitemap: ${BASE_URL}/sitemap.xml
`;

  return new NextResponse(robotsTxt, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400', // Cache for 24 hours
    },
  });
}