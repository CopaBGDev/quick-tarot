
import { getTranslations } from '@/lib/translations';
import { headers } from 'next/headers';

export default function TermsPage() {
  const lang = headers().get('accept-language')?.split(',')[0].split('-')[0] || 'sr';
  const t = getTranslations(lang);

  return (
    <>
      <h1 className="font-headline text-3xl font-bold text-primary">{t.termsDialogTitle}</h1>
      <div className="space-y-4 text-muted-foreground">
        {t.termsDialogContent.split('\n\n').map((paragraph, index) => (
          <p key={index} className="whitespace-pre-wrap">{paragraph}</p>
        ))}
      </div>
    </>
  );
}
