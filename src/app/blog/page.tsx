
import { getBlogPosts } from '@/lib/blog-posts';
import { getTranslations } from '@/lib/translations';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { AdPlaceholder } from '@/components/ad-placeholder';

export default async function BlogIndexPage({
    searchParams,
}: {
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const lang = typeof resolvedSearchParams?.lang === 'string' ? resolvedSearchParams.lang : 'sr';
  const t = getTranslations(lang);
  const posts = getBlogPosts(lang);

  return (
    <div className="container mx-auto max-w-4xl flex-grow py-8 px-4">
      <header className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold text-primary">
          {t.blogTitle}
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">{t.blogDescription}</p>
      </header>
       <div className="mb-12">
          <AdPlaceholder />
        </div>
      <div className="grid grid-cols-1 gap-8">
        {posts.map((post) => (
            <Card key={post.slug} className="flex flex-col bg-card/50 border-primary/20 shadow-lg hover:shadow-primary/20 hover:border-primary/30 transition-all duration-300">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl text-primary text-left">{post.metaTitle}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                    <CardDescription className="text-left">{post.metaDescription}</CardDescription>
                </CardContent>
                <CardFooter>
                    <Button asChild variant="link" className="p-0 h-auto text-primary font-bold">
                        <Link href={`/blog/${post.slug}?lang=${lang}`}>
                            {t.blogReadMore}
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        ))}
      </div>
    </div>
  );
}
