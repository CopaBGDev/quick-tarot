import { Button } from '@/components/ui/button';
import { getTranslations } from '@/lib/translations';
import { Home } from 'lucide-react';
import Link from 'next/link';

export default async function InfoLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang?: string };
}) {
  const lang = params?.lang || 'sr';
  const t = getTranslations(lang);

  return (
    <div className="container mx-auto max-w-7xl py-8 px-4 sm:px-6 lg:px-8">
      <header className="mb-8 flex justify-end">
        <Button asChild variant="ghost" size="icon">
          <Link href={`/?lang=${lang}`}>
            <Home className="h-5 w-5" />
            <span className="sr-only">{t.homeButtonText}</span>
          </Link>
        </Button>
      </header>
      <main className="mx-auto bg-card p-6 sm:p-8 rounded-lg border border-primary/20 shadow-lg">
        {children}
      </main>
       <footer className="mt-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Quick Tarot. {t.footerCopyright}
      </footer>
    </div>
  );
}
