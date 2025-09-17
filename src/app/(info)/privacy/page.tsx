import { getTranslations } from '@/lib/translations';

type Props = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default async function PrivacyPage({ searchParams }: Props) {
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
