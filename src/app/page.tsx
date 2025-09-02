import TarotClient from '@/components/tarot-client';

export const runtime = 'nodejs';

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center bg-background">
      <div className="w-full max-w-4xl flex-1">
        <TarotClient />
      </div>
    </main>
  );
}
