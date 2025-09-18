import {getTranslations} from '@/lib/translations';

type PrivacyPageProps = {
  searchParams: {[key: string]: string | string[] | undefined};
};

export default async function PrivacyPage({searchParams}: PrivacyPageProps) {
  const lang =
    (typeof searchParams?.lang === 'string' ? searchParams.lang : 'sr') || 'sr';
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
