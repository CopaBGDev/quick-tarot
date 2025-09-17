import { getTranslations } from '@/lib/translations';

export default function FaqPage({ searchParams }: { params: {}, searchParams: { [key: string]: string | string[] | undefined } }) {
  const lang = typeof searchParams.lang === 'string' ? searchParams.lang : 'sr';
  const t = getTranslations(lang);

  return (
    <>
      <h1 className="font-headline text-3xl font-bold text-primary">{t.faqDialogTitle}</h1>
      <div className="space-y-4 text-muted-foreground">
        {t.faqDialogContent.split('\n\n').map((paragraph, index) => (
          <p key={index} className="whitespace-pre-wrap">{paragraph}</p>
        ))}
      </div>
    </>
  );
}
