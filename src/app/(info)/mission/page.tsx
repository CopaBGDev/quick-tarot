import {getTranslations} from '@/lib/translations';
import { PageProps } from '@/lib/types';

export default async function MissionPage({searchParams}: PageProps) {
  const lang =
    (typeof searchParams?.lang === 'string' ? searchParams.lang : 'sr') || 'sr';
  const t = getTranslations(lang);

  return (
    <>
      <h1 className="font-headline text-3xl font-bold text-primary">
        {t.missionDialogTitle}
      </h1>
      <div className="mt-6 space-y-4 text-muted-foreground whitespace-pre-wrap">
        {t.missionDialogContent}
      </div>
    </>
  );
}
