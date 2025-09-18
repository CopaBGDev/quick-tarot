
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { blogPosts, BlogPost } from '@/lib/blog-posts';
import { getTranslations, TranslationSet } from "@/lib/translations";
import { Button } from '@/components/ui/button';

// This is a client component to handle language state
import BlogPostClient from './client-page';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug);

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
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: Props) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return <BlogPostClient post={post} />;
}

    