
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogPost, getBlogPosts } from '@/lib/blog-posts';
import BlogPostClient from './client-page';

export async function generateMetadata({ 
  params, 
  searchParams 
}: { 
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}): Promise<Metadata> {
  const lang = typeof searchParams?.lang === 'string' ? searchParams.lang : 'sr';
  const post = getBlogPost(lang, params.slug);

  if (!post) {
    return {};
  }

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.keywords,
  };
}

export async function generateStaticParams() {
    const languages = ['sr', 'en', 'de', 'fr', 'es'];
    const allParams: { slug: string }[] = [];

    languages.forEach(lang => {
        const posts = getBlogPosts(lang);
        posts.forEach(post => {
            // Only add the slug, as `lang` is not a dynamic parameter in the route
            if (!allParams.some(p => p.slug === post.slug)) {
                 allParams.push({ slug: post.slug });
            }
        });
    });
    
    return allParams;
}

export default async function BlogPostPage({ 
  params, 
  searchParams 
}: { 
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const lang = typeof searchParams?.lang === 'string' ? searchParams.lang : 'sr';
  const post = getBlogPost(lang, params.slug);

  if (!post) {
    notFound();
  }

  return <BlogPostClient post={post} />;
}
