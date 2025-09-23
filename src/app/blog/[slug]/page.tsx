
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogPost, getBlogPosts } from '@/lib/blog-posts';
import BlogPostClient from './client-page';

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
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
    const allParams: { slug: string; lang: string }[] = [];

    languages.forEach(lang => {
        const posts = getBlogPosts(lang);
        posts.forEach(post => {
            allParams.push({ slug: post.slug, lang: lang });
        });
    });
    
    // generateStaticParams expects an array of objects with the dynamic segment name
    // in this case it is just "slug"
    return allParams.map(p => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params, searchParams }: Props) {
  const lang = typeof searchParams?.lang === 'string' ? searchParams.lang : 'sr';
  const post = getBlogPost(lang, params.slug);

  if (!post) {
    notFound();
  }

  return <BlogPostClient post={post} />;
}
