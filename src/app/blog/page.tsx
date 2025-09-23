
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
    <div className="container mx-auto max-w-7xl py-8 px-4 sm:px-6 lg:px-8">
      <main className="mx-auto bg-card p-6 sm:p-8 rounded-lg border border-primary/20 shadow-lg">
        <h1 className="font-headline text-3xl font-bold text-primary">
          {t.blogTitle}
        </h1>
        <p className="text-muted-foreground mt-2">{t.blogDescription}</p>
        <div className="mt-8 space-y-8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}?lang=${lang}`}
              className="block group"
            >
              <article>
                <h2 className="font-headline text-2xl font-bold text-primary group-hover:underline">
                  {post.title}
                </h2>
                <p className="text-muted-foreground mt-2">
                  {post.metaDescription}
                </p>
                <span className="text-sm font-bold text-primary group-hover:underline mt-4 inline-block">
                  {t.blogReadMore} &rarr;
                </span>
              </article>
            </Link>
          ))}
        </div>
      </main>
      <footer className="mt-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Quick Tarot. {t.footerCopyright}
      </footer>
    </div>
  );
}
