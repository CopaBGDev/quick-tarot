
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
    <div className="container mx-auto max-w-5xl flex-grow">
      <header className="mb-8 text-center">
        <h1 className="font-headline text-4xl font-bold text-primary">
          {t.blogTitle}
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">{t.blogDescription}</p>
      </header>
      <div className="mt-8 space-y-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}?lang=${lang}`}
            className="block group p-6 rounded-lg border border-primary/10 bg-card/50 hover:border-primary/30 hover:bg-card/70 transition-all duration-300"
          >
            <article>
              <h2 className="font-headline text-2xl font-bold text-primary group-hover:underline">
                {post.title}
              </h2>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
