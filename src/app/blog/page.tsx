
import { getBlogPosts } from '@/lib/blog-posts';
import { getTranslations } from '@/lib/translations';
import Link from 'next/link';

export default async function BlogIndexPage({
    searchParams,
}: {
    searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const lang = typeof searchParams?.lang === 'string' ? searchParams.lang : 'sr';
  const t = getTranslations(lang);
  const posts = getBlogPosts(lang);

  return (
    <div className="container mx-auto max-w-5xl flex-grow py-8 px-4">
      <header className="mb-8 text-center">
        <h1 className="font-headline text-4xl font-bold text-primary">
          {t.blogTitle}
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">{t.blogDescription}</p>
      </header>
      <div className="mt-8 flex flex-col items-center space-y-4">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}?lang=${lang}`}
            className="text-lg text-primary hover:underline"
          >
            {post.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
