
import TarotClient from '@/components/tarot-client';
import { getTranslations } from '@/lib/translations';

export const runtime = 'nodejs';

export default async function Home({ searchParams }: { searchParams: { lang?: string | string[] | undefined } }) {
  const lang = typeof searchParams?.lang === 'string' ? searchParams.lang : 'sr';

  return (
    <main className="flex min-h-screen w-full flex-col items-center bg-background">
      <div className="w-full max-w-4xl flex-1">
        <TarotClient initialLang={lang} />
      </div>
    </main>
  );
}
