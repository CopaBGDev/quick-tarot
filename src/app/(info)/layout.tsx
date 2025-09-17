import { Button } from '@/components/ui/button';
import { getTranslations } from '@/lib/translations';
import { Home } from 'lucide-react';
import Link from 'next/link';

export default function InfoLayout({
  children,
  searchParams,
}: {
  children: React.ReactNode;
  searchParams: { lang: string };
}) {
  const lang = searchParams?.lang || 'sr';
  const t = getTranslations(lang);

  return (
    <div className="container mx-auto max-w-4xl py-8 px-4 sm:px-6 lg:px-8">
      <header className="mb-8 flex justify-end">
        <Button asChild variant="ghost">
          <Link href={`/?lang=${lang}`}>
            <Home className="mr-2 h-4 w-4" />
            {t.homeButtonText}
          </Link>
        </Button>
      </header>
      <main className="prose prose-invert mx-auto bg-card p-6 sm:p-8 rounded-lg border border-primary/20 shadow-lg">
        {children}
      </main>
       <footer className="mt-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Quick Tarot. {t.footerCopyright}
      </footer>
    </div>
  );
}
