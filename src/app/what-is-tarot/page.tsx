
"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getTranslations, TranslationSet } from "@/lib/translations";
import { Button } from "@/components/ui/button";

const LANGUAGE_STORAGE_KEY = "tarotLanguage";

export default function WhatIsTarotPage() {
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
        <h1 className="font-headline text-4xl font-bold mb-6 text-primary">{translations.whatIsTarotTitle}</h1>
        <div className="space-y-6 text-lg text-foreground/90">
           {translations.whatIsTarotContent.split('\n\n').map((paragraph, index) => (
            <React.Fragment key={index}>
              {paragraph.startsWith('### ') ? (
                <h3 className="font-headline text-xl font-bold mt-6 mb-2 text-primary">{paragraph.replace('### ', '')}</h3>
              ) : paragraph.startsWith('## ') ? (
                <h2 className="font-headline text-2xl font-bold mt-8 mb-4 text-primary">{paragraph.replace('## ', '')}</h2>
              ) : (
                <p className="whitespace-pre-wrap">{paragraph}</p>
              )}
            </React.Fragment>
          ))}
        </div>
      </main>
    </div>
  );
}

    