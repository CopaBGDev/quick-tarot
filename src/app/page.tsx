import TarotClient from '@/components/tarot-client';

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-start bg-gradient-to-b from-background to-background/80 via-background p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-4xl">
        <TarotClient />
      </div>
    </main>
  );
}
