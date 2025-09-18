
"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getTranslations, TranslationSet } from "@/lib/translations";
import { Button } from "@/components/ui/button";
import { FULL_DECK } from "@/lib/cards";

const LANGUAGE_STORAGE_KEY = "tarotLanguage";

export default function MeaningsPage() {
  const [translations, setTranslations] = React.useState<TranslationSet | null>(null);

  React.useEffect(() => {
    const savedLang = localStorage.getItem(LANGUAGE_STORAGE_KEY) || 'sr';
    setTranslations(getTranslations(savedLang));
  }, []);

  if (!translations) {
    return null; // Or a loading spinner
  }

  const majorArcana = FULL_DECK.slice(0, 22);
  const wands = FULL_DECK.slice(22, 36);
  const cups = FULL_DECK.slice(36, 50);
  const swords = FULL_DECK.slice(50, 64);
  const pentacles = FULL_DECK.slice(64, 78);

  const renderCardList = (cards: string[]) => (
    <ul className="list-disc list-inside space-y-1">
      {cards.map(card => <li key={card}>{card}</li>)}
    </ul>
  );

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
        <h1 className="font-headline text-4xl font-bold mb-6 text-primary">{translations.cardMeaningsTitle}</h1>
        <div className="space-y-6 text-lg text-foreground/90">
          <p>{translations.cardMeaningsContent}</p>
          
          <h2 className="font-headline text-2xl font-bold mt-8 mb-4 text-primary">Major Arcana</h2>
          {renderCardList(majorArcana)}

          <h2 className="font-headline text-2xl font-bold mt-8 mb-4 text-primary">Suit of Wands</h2>
          {renderCardList(wands)}

          <h2 className="font-headline text-2xl font-bold mt-8 mb-4 text-primary">Suit of Cups</h2>
          {renderCardList(cups)}

          <h2 className="font-headline text-2xl font-bold mt-8 mb-4 text-primary">Suit of Swords</h2>
          {renderCardList(swords)}

          <h2 className="font-headline text-2xl font-bold mt-8 mb-4 text-primary">Suit of Pentacles</h2>
          {renderCardList(pentacles)}
        </div>
      </main>
    </div>
  );
}

    