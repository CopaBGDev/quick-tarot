import { FULL_DECK, getCardImagePath } from '@/lib/cards';
import { getTranslations } from '@/lib/translations';
import Image from 'next/image';

type CardMeaningsPageProps = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default async function CardMeaningsPage({ searchParams }: CardMeaningsPageProps) {
  const lang = typeof searchParams?.lang === 'string' ? searchParams.lang : 'sr';
  const t = getTranslations(lang);

  return (
    <>
      <h1 className="font-headline text-3xl font-bold text-primary">{t.cardMeaningsTitle}</h1>
      <p className="text-muted-foreground mt-2">{t.cardMeaningsDescription}</p>
      <div className="mt-8 grid grid-cols-4 gap-4">
        {FULL_DECK.map((cardName) => (
          <div key={cardName} className="flex flex-col items-center text-center">
            <div className="relative rounded-lg border border-primary/20 shadow-md overflow-hidden" style={{ width: 200, height: 300 }}>
              <Image
                  src={getCardImagePath(cardName)}
                  alt={cardName}
                  fill
                  sizes="200px"
                  className="object-fill"
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
