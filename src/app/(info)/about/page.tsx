import { getTranslations } from '@/lib/translations';

export default async function AboutPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const lang = typeof searchParams?.lang === 'string' ? searchParams.lang : 'sr';
  const t = getTranslations(lang);
  return (
    <>
      <h1 className="font-headline text-3xl font-bold text-primary">
        {t.aboutDialogTitle}
      </h1>
      <div className="mt-6 whitespace-pre-wrap text-muted-foreground">
        {t.aboutDialogContent}
      </div>
    </>
  );
}
