import TarotClient from '@/components/tarot-client';
import { getDailyCard, DailyCard } from '@/ai/flows/get-daily-card';
import { getTranslations } from '@/lib/translations';

export const runtime = 'nodejs';

// Revalidate the page every day to get a new card
export const revalidate = 86400; // 24 hours in seconds

export default async function Home({ searchParams }: { searchParams: { lang: string } }) {
  const lang = searchParams?.lang || 'sr';
  const languageName = lang === 'en' ? 'English' : 'Serbian';

  let dailyCard: DailyCard | null = null;
  try {
    dailyCard = await getDailyCard(languageName);
  } catch (error) {
    console.error("Failed to fetch daily card:", error);
    // Handle error gracefully, the page can still load without the daily card
  }

  return (
    <main className="flex min-h-screen w-full flex-col items-center bg-background">
      <div className="w-full max-w-4xl flex-1">
        <TarotClient initialDailyCard={dailyCard} initialLang={lang} />
      </div>
    </main>
  );
}
