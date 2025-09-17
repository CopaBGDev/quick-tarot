import { FULL_DECK, getCardImagePath } from '@/lib/cards';
import { getTranslations } from '@/lib/translations';
import Image from 'next/image';

export default function CardMeaningsPage({ searchParams }: { searchParams: { lang: string } }) {
  const lang = searchParams.lang || 'sr';
  const t = getTranslations(lang);

  return (
    <>
      <h1 className="font-headline text-3xl font-bold text-primary">{t.cardMeaningsTitle}</h1>
      <p className="text-muted-foreground mt-2">{t.cardMeaningsDescription}</p>
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {FULL_DECK.map((cardName) => (
          <div key={cardName} className="flex flex-col items-center text-center">
            <div className="w-full rounded-lg overflow-hidden border border-primary/20 shadow-md">
              <Image
                  src={getCardImagePath(cardName)}
                  alt={cardName}
                  width={200}
                  height={300}
                  className="w-full h-auto"
              />
            </div>
            <p className="mt-2 text-xs sm:text-sm font-headline text-primary">{cardName}</p>
          </div>
        ))}
      </div>
       <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>{t.cardMeaningsComingSoon}</p>
        </div>
    </>
  );
}
