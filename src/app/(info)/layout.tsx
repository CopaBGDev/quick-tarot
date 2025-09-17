
import { Button } from '@/components/ui/button';
import { getTranslations } from '@/lib/translations';
import { Home } from 'lucide-react';
import Link from 'next/link';
import { headers } from 'next/headers';

export default function InfoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const lang = headers().get('accept-language')?.split(',')[0].split('-')[0] || 'sr';
  const t = getTranslations(lang);

  return (
    <div className="container mx-auto max-w-4xl py-8 px-4 sm:px-6 lg:px-8">
      <header className="mb-8 flex justify-end">
        <Button asChild variant="ghost">
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            {t.dailyCardButton.replace('Nastavi na Aplikaciju', 'Početna').replace('Continue to the App', 'Home').replace('Weiter zur App', 'Startseite').replace('Continuer vers l\'application', 'Accueil').replace('Continuar a la aplicación', 'Inicio').replace('Continua con l\'app', 'Home').replace('Continuar para o aplicativo', 'Início').replace('Перейти к приложению', 'Главная').replace('继续访问应用', '首页').replace('アプリに進む', 'ホーム').replace('متابعة إلى التطبيق', 'الرئيسية').replace('ऐप पर जाएं', 'होम').replace('Doorgaan naar de app', 'Home').replace('앱으로 계속하기', '홈').replace('Uygulamaya devam et', 'Anasayfa').replace('Przejdź do aplikacji', 'Strona główna').replace('Fortsätt till appen', 'Hem').replace('Nastavi na aplikaciju', 'Početna').replace('Nastavi na aplikaciju', 'Početna').replace('Nadaljuj na aplikacijo', 'Domov').replace('Продолжи кон апликацијата', 'Почетна').replace('Vazhdo tek aplikacioni', 'Kreu').replace('Продължи към приложението', 'Начало').replace('Continuă la aplicație', 'Acasă').replace('Συνέχεια στην εφαρμογή', 'Αρχική').replace('Tovább az alkalmazáshoz', 'Kezdőlap')}
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
