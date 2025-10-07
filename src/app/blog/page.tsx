import Link from "next/link";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight, Sparkles, BookOpen } from "lucide-react";
import fs from 'fs';
import path from 'path';
import metadata from '@/content/blog/metadata.json';

export { metadata } from "./metadata";

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
        featured: postMetadata.featured,
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

export default function BlogPage() {
  // Get the most recent featured post for the hero section
  const featuredPost = blogPosts.find(post => post.featured);
  // Include all other posts (including other featured posts) in regular posts
  const regularPosts = blogPosts.filter(post => post.slug !== featuredPost?.slug);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Header />
      
      <main className="container mx-auto max-w-6xl px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16 py-12 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 rounded-2xl">
          <Badge className="mb-6 bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 px-4 py-2">
            <BookOpen className="w-4 h-4 mr-2" />
            Knowledge Hub
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-emerald-700 to-slate-800 dark:from-white dark:via-emerald-400 dark:to-slate-200 bg-clip-text text-transparent">
            JSONPost Blog
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-8">
            Insights, tutorials, and best practices for building better forms and managing data collection. 
            Stay ahead with expert tips and real-world solutions.
          </p>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-6 text-slate-900 dark:text-white">
              Featured Post
            </h2>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-2 border-emerald-200 dark:border-emerald-800">
              <CardHeader className="pb-4">
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>
                  {featuredPost.tags.map((tag: string) => (
                    <Badge key={tag} variant="outline" className="border-slate-300 dark:border-slate-600">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <CardTitle className="text-2xl md:text-3xl mb-2 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  <Link href={`/blog/${featuredPost.slug}`}>
                    {featuredPost.title}
                  </Link>
                </CardTitle>
                <CardDescription className="text-base text-slate-600 dark:text-slate-400">
                  {featuredPost.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(featuredPost.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{featuredPost.readTime}</span>
                    </div>
                  </div>
                  <Link 
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center space-x-1 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium transition-colors"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Regular Posts Grid */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-slate-900 dark:text-white">
            Latest Posts
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post) => (
              <Card key={post.slug} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-slate-200 dark:border-slate-700">
                <CardHeader className="pb-4">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.map((tag: string) => (
                      <Badge key={tag} variant="outline" className="text-xs border-slate-300 dark:border-slate-600">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <CardTitle className="text-xl mb-2 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="text-sm text-slate-600 dark:text-slate-400">
                    {post.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 text-xs text-slate-500 dark:text-slate-400">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(post.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center space-x-1 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 text-sm font-medium transition-colors"
                    >
                      <span>Read</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-gradient-to-br from-slate-50 via-emerald-50 to-slate-100 dark:from-slate-900 dark:via-emerald-950/20 dark:to-slate-900 rounded-2xl p-8 text-center border border-slate-200 dark:border-slate-700">
          <h3 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">
            Stay Updated
          </h3>
          <p className="text-slate-600 dark:text-slate-300 mb-6 max-w-2xl mx-auto">
            Get the latest tutorials, tips, and updates delivered straight to your inbox. 
            No spam, unsubscribe at any time.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-slate-800 dark:text-white"
            />
            <button className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium">
              Subscribe
            </button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}