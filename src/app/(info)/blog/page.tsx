import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getTranslations } from '@/lib/translations';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
}

export default async function BlogPage({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
  const lang = typeof searchParams?.lang === 'string' ? searchParams.lang : 'sr';
  const t = getTranslations(lang);

  const blogPosts: BlogPost[] = [
    {
      slug: 'tarot-and-love',
      title: t.blogPostTitle_TarotAndLove,
      description: t.blogPostDescription_TarotAndLove,
      date: '2024-07-29',
    },
    // Future blog posts can be added here
  ];

  return (
    <>
      <h1 className="font-headline text-3xl font-bold text-primary">{t.blogTitle}</h1>
      <p className="mt-2 text-muted-foreground">{t.blogDescription}</p>
      <div className="mt-8 space-y-6">
        {blogPosts.map((post) => (
          <Card key={post.slug} className="bg-transparent border-primary/20 shadow-lg hover:shadow-primary/20 transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl text-left">{post.title}</CardTitle>
              <CardDescription>{new Date(post.date).toLocaleDateString(lang)}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{post.description}</p>
              <Button asChild variant="link" className="p-0 h-auto text-primary">
                <Link href={`/blog/${post.slug}?lang=${lang}`}>
                  {t.blogReadMore} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
