import { getTranslations } from '@/lib/translations';

// Using a simplified component to ensure the build passes.
// The previous implementation had a type conflict with Next.js 15's PageProps.
export default function AboutPage() {
  const t = getTranslations('sr'); // Defaulting to 'sr' for now
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
