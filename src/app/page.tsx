import TarotClient from '@/components/tarot-client';

export const runtime = 'nodejs';

export default async function Home({ 
    searchParams,
 } : { 
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const lang = typeof resolvedSearchParams?.lang === 'string' ? resolvedSearchParams.lang : 'sr';

  return (
    <main className="flex min-h-screen w-full flex-col items-center bg-background">
      <div className="w-full max-w-4xl flex-1">
        <TarotClient initialLang={lang} />
      </div>
    </main>
  );
}
