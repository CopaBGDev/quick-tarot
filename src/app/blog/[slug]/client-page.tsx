
"use client";

import * as React from "react";
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { getTranslations, TranslationSet } from "@/lib/translations";
import { Button } from '@/components/ui/button';
import { BlogPost } from '@/lib/blog-posts';
import { AdPlaceholder } from "@/components/ad-placeholder";
import { useSearchParams } from "next/navigation";

interface BlogPostClientProps {
    post: BlogPost;
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
    const searchParams = useSearchParams();
    const lang = searchParams.get('lang') || 'sr';
    const translations = getTranslations(lang);

    const relatedPosts = post.internalLinks.map(link => ({
        slug: link.slug,
        title: link.title,
    }));


    return (
        <div className="container mx-auto max-w-3xl px-4 py-8">
            <header className="mb-8">
                <Link href={`/blog?lang=${lang}`} className="inline-flex items-center text-primary hover:text-primary/80 transition-colors">
                    <Button variant="ghost" size="icon">
                        <ChevronLeft className="h-6 w-6" />
                    </Button>
                    <span className="font-bold">{translations.blogBackToBlog}</span>
                </Link>
            </header>
            <main>
                <div className="mb-12">
                    <AdPlaceholder />
                </div>

                <article>
                    <h1 className="font-headline text-4xl font-bold mb-6 text-primary">{post.title}</h1>
                    <div
                        className="prose prose-lg dark:prose-invert max-w-none space-y-4 text-lg text-foreground/90"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </article>

                {relatedPosts.length > 0 && (
                    <aside className="mt-16">
                        <h2 className="font-headline text-2xl font-bold mb-6 text-primary">{translations.blogRelatedArticles}</h2>
                        <div className="space-y-4">
                            {relatedPosts.map(relatedPost => (
                                <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}?lang=${lang}`} className="block group">
                                     <div className="p-4 rounded-lg border border-primary/10 bg-card hover:bg-primary/5 transition-colors">
                                        <h3 className="font-headline text-xl font-bold text-primary group-hover:underline">{relatedPost.title}</h3>
                                     </div>
                                </Link>
                            ))}
                        </div>
                    </aside>
                )}
            </main>
        </div>
    );
}
