import { getTranslations } from '@/lib/translations';

export default function TarotAndLovePage({ searchParams }: { params: {}, searchParams: { [key: string]: string | string[] | undefined } }) {
  const lang = typeof searchParams.lang === 'string' ? searchParams.lang : 'sr';
  const t = getTranslations(lang);

  return (
    <>
      <h1 className="font-headline text-3xl font-bold text-primary">{t.blogPostTitle_TarotAndLove}</h1>
      <div className="mt-6 space-y-4 text-muted-foreground whitespace-pre-wrap">
        <p>{t.blogPostContent_TarotAndLove_p1}</p>
        <p>{t.blogPostContent_TarotAndLove_p2}</p>
        <h2 className="font-headline text-2xl font-bold text-primary !mt-6">{t.blogPostContent_TarotAndLove_h2_1}</h2>
        <p>{t.blogPostContent_TarotAndLove_p3}</p>
        <p>{t.blogPostContent_TarotAndLove_p4}</p>
      </div>
    </>
  );
}
