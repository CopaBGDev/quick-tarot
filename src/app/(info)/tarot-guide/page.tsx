import { getTranslations } from '@/lib/translations';

type TarotGuidePageProps = {
  searchParams?: { [key:string]: string | string[] | undefined };
};

export default async function TarotGuidePage({ searchParams }: TarotGuidePageProps) {
  const lang = typeof searchParams?.lang === 'string' ? searchParams.lang : 'sr';
  const t = getTranslations(lang);

  return (
    <>
      <h1 className="font-headline text-3xl font-bold text-primary">{t.tarotGuideTitle}</h1>
      <div className="mt-6 space-y-4 text-muted-foreground whitespace-pre-wrap">
        <p>{t.tarotGuideContent_p1}</p>
        <p>{t.tarotGuideContent_p2}</p>
        <h2 className="!mt-6 font-headline text-2xl font-bold text-primary">{t.tarotGuideContent_h2_1}</h2>
        <p>{t.tarotGuideContent_p3}</p>
        <p>{t.tarotGuideContent_p4}</p>
        <h2 className="!mt-6 font-headline text-2xl font-bold text-primary">{t.tarotGuideContent_h2_2}</h2>
        <p>{t.tarotGuideContent_p5}</p>
      </div>
    </>
  );
}
