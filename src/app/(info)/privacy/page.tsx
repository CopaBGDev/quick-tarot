import { getTranslations } from '@/lib/translations';

export default function PrivacyPage({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
  const lang = typeof searchParams?.lang === 'string' ? searchParams.lang : 'sr';
  const t = getTranslations(lang);

  return (
    <>
      <h1 className="font-headline text-3xl font-bold text-primary">{t.privacyDialogTitle}</h1>
      <div className="space-y-4 text-muted-foreground">
        {t.privacyDialogContent.split('\n\n').map((paragraph, index) => (
          <p key={index} className="whitespace-pre-wrap">{paragraph}</p>
        ))}
      </div>
    </>
  );
}
