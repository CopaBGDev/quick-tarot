
"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getTranslations, TranslationSet } from "@/lib/translations";
import { Button } from "@/components/ui/button";

const LANGUAGE_STORAGE_KEY = "tarotLanguage";

export default function TermsPage() {
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
        <Link href="/" legacyBehavior>
          <a className="inline-flex items-center text-primary hover:text-primary/80 transition-colors">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-6 w-6" />
              <span className="sr-only">Back</span>
            </Button>
          </a>
        </Link>
      </header>
      <main>
        <h1 className="font-headline text-4xl font-bold mb-6 text-primary">{translations.termsDialogTitle}</h1>
        <div className="space-y-4 text-lg text-foreground/90">
           {translations.termsDialogContent.split('\n\n').map((paragraph, index) => (
            <p key={index} className="whitespace-pre-wrap">{paragraph}</p>
          ))}
        </div>
      </main>
    </div>
  );
}
