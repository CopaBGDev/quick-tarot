import {getTranslations} from '@/lib/translations';

export default async function PrivacyPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const lang =
    typeof resolvedSearchParams?.lang === 'string' ? resolvedSearchParams.lang : 'sr';
  const t = getTranslations(lang);

  return (
    <>
      <h1 className="font-headline text-3xl font-bold text-primary">
        {t.privacyDialogTitle}
      </h1>
      <div className="mt-6 space-y-4 text-muted-foreground whitespace-pre-wrap">
        {t.privacyDialogContent}
      </div>
    </>
  );
}
