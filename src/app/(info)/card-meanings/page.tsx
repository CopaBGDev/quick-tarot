import { FULL_DECK, getCardImagePath } from '@/lib/cards';
import { getTranslations } from '@/lib/translations';
import Image from 'next/image';

export default async function CardMeaningsPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const lang = typeof resolvedSearchParams?.lang === 'string' ? resolvedSearchParams.lang : 'sr';
  const t = getTranslations(lang);

  return (
    <>
      <h1 className="font-headline text-3xl font-bold text-primary">{t.cardMeaningsTitle}</h1>
      <p className="text-muted-foreground mt-2">{t.cardMeaningsDescription}</p>
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {FULL_DECK.map((cardName) => (
          <div key={cardName} className="flex flex-col items-center text-center">
            <div className="relative rounded-lg border border-primary/20 shadow-md overflow-hidden w-full" style={{ paddingBottom: '150%' }}>
              <Image
                  src={getCardImagePath(cardName)}
                  alt={cardName}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                  className="object-cover"
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
