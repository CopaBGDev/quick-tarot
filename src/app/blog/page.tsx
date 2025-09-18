
"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getTranslations, TranslationSet } from "@/lib/translations";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/lib/blog-posts";

const LANGUAGE_STORAGE_KEY = "tarotLanguage";

export default function BlogPage() {
  const [translations, setTranslations] = React.useState<TranslationSet | null>(null);

  React.useEffect(() => {
    const savedLang = localStorage.getItem(LANGUAGE_STORAGE_KEY) || 'sr';
    setTranslations(getTranslations(savedLang));
  }, []);

  if (!translations) {
    return null; // Or a loading spinner
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <header className="mb-8">
        <Link href="/" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors">
          <Button variant="ghost" size="icon">
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
      </header>
      <main>
        <h1 className="font-headline text-4xl font-bold mb-6 text-primary">{translations.blogTitle}</h1>
        <div className="space-y-4 text-lg text-foreground/90">
          <p>{translations.blogContent}</p>
        </div>
        <div className="mt-12 space-y-6">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
              <article className="p-6 rounded-lg border border-primary/20 bg-card hover:bg-primary/5 transition-colors">
                <h2 className="font-headline text-2xl font-bold text-primary group-hover:underline">{post.title}</h2>
                <p className="text-muted-foreground mt-2">{post.metaDescription}</p>
              </article>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

    