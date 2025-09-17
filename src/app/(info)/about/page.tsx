
import { getTranslations } from '@/lib/translations';
import { headers } from 'next/headers';

export default function AboutPage() {
  const lang = headers().get('accept-language')?.split(',')[0].split('-')[0] || 'sr';
  const t = getTranslations(lang);

  return (
    <>
      <h1 className="font-headline text-3xl font-bold text-primary">{t.aboutDialogTitle}</h1>
      <div className="space-y-4 text-muted-foreground">
        {t.aboutDialogContent.split('\n\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </>
  );
}
