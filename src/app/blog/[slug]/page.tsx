import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import fs from 'fs';
import path from 'path';
import metadata from '@/content/blog/metadata.json';
import type { Metadata } from "next";

// Get blog posts with metadata from JSON file
function getBlogPosts() {
  const blogDir = path.join(process.cwd(), 'src/content/blog');
  
  try {
    // Use metadata array as the source of truth
    const posts = metadata.map((postMetadata) => {
      const filePath = path.join(blogDir, postMetadata.mdxFile);
      
      // Check if MDX file exists
      if (!fs.existsSync(filePath)) {
        console.warn(`MDX file not found: ${postMetadata.mdxFile}`);
        return null;
      }
      
      return {
        slug: postMetadata.slug,
        title: postMetadata.title,
        description: postMetadata.description,
        date: postMetadata.date,
        readTime: postMetadata.readTime,
        tags: postMetadata.tags,
        author: postMetadata.author,
      };
    });
    
    // Filter out null values and sort by date (newest first)
    return posts.filter((post): post is NonNullable<typeof post> => post !== null)
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch {
    console.error('Error reading blog posts');
    return [];
  }
}

const blogPosts = getBlogPosts();

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

// Generate dynamic metadata for each blog post
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  
  // Find the blog post metadata
  const postMetadata = metadata.find(post => post.slug === slug);
  
  if (!postMetadata) {
    return {
      title: "Blog Post Not Found - JSONPost",
      description: "The requested blog post could not be found.",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const postUrl = `${baseUrl}/blog/${slug}`;
  
  // Use ogImage from metadata, fallback to main OG image
  const ogImage = postMetadata.ogImage || "/ogimage.png";

  return {
    title: `${postMetadata.title} - JSONPost Blog`,
    description: postMetadata.description,
    openGraph: {
      title: postMetadata.title,
      description: postMetadata.description,
      url: postUrl,
      siteName: "JSONPost",
      type: "article",
      publishedTime: postMetadata.date,
      authors: [postMetadata.author],
      tags: postMetadata.tags,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: postMetadata.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: postMetadata.title,
      description: postMetadata.description,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  
  // Find the current post
  const currentPostIndex = blogPosts.findIndex(post => post.slug === slug);
  const currentPost = blogPosts[currentPostIndex];
  
  if (!currentPost) {
    notFound();
  }
  
  // Get previous and next posts for navigation
  const previousPost = currentPostIndex > 0 ? blogPosts[currentPostIndex - 1] : null;
  const nextPost = currentPostIndex < blogPosts.length - 1 ? blogPosts[currentPostIndex + 1] : null;
  
  // Dynamic import of the MDX content
  let PostContent;
  try {
    const { default: Content } = await import(`@/content/blog/${slug}.mdx`);
    PostContent = Content;
  } catch {
    // If MDX file doesn't exist, show a placeholder
    const PlaceholderContent = () => (
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p>This blog post content is coming soon. Please check back later!</p>
        <p>In the meantime, you can:</p>
        <ul>
          <li>Browse our <Link href="/docs">documentation</Link></li>
          <li>Try our <Link href="/free-html-form-generator">free form generator</Link></li>
          <li>Get started with <Link href="/auth/signup">JSONPost</Link></li>
        </ul>
      </div>
    );
    PlaceholderContent.displayName = 'PlaceholderContent';
    PostContent = PlaceholderContent;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      
      <main className="container mx-auto max-w-4xl px-4 py-12">
        {/* Back to Blog */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="pl-0">
            <Link href="/blog" className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Blog</span>
            </Link>
          </Button>
        </div>

        {/* Article Header */}
        <article className="mb-12">
          <header className="mb-8">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {currentPost.tags.map((tag: string) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
            
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white leading-tight">
              {currentPost.title}
            </h1>
            
            {/* Description */}
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              {currentPost.description}
            </p>
            
            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700 pb-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">
                    {currentPost.author.split(' ').map((n: string) => n[0]).join('')}
                  </span>
                </div>
                <span className="font-medium">{currentPost.author}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(currentPost.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{currentPost.readTime}</span>
              </div>
            </div>
          </header>

          {/* Article Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <PostContent />
          </div>
        </article>

        {/* Post Navigation */}
        <nav className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Previous Post */}
            {previousPost && (
              <Link 
                href={`/blog/${previousPost.slug}`}
                className="group p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
              >
                <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous Post</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {previousPost.title}
                </h3>
              </Link>
            )}
            
            {/* Next Post */}
            {nextPost && (
              <Link 
                href={`/blog/${nextPost.slug}`}
                className="group p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition-colors md:text-right"
              >
                <div className="flex items-center justify-end space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
                  <span>Next Post</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {nextPost.title}
                </h3>
              </Link>
            )}
          </div>
        </nav>

        {/* Call to Action */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            Ready to Get Started?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            Start collecting form submissions with JSONPost today. No setup required, 
            just point your forms to our endpoint and you&apos;re ready to go.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg">
              <Link href="/auth/signup">Get Started Free</Link>
            </Button>
            <Button variant="outline" asChild size="lg">
              <Link href="/docs">View Documentation</Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

// Generate static params for known blog posts
export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// Enable static generation
export const dynamicParams = false;