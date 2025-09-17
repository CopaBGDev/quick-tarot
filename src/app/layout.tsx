
import type {Metadata, Viewport} from 'next';
import { Playfair_Display, Lora } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { cn } from '@/lib/utils';
import { Smartphone } from 'lucide-react';
import { GoogleAnalytics } from '@/components/google-analytics';

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-playfair-display',
});

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-lora',
});

const APP_NAME = "Quick Tarot Reading";
const APP_DESCRIPTION = "Dobijte vaše personalizovano tarot čitanje. Otkrijte šta vam zvezde i karte poručuju.";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  applicationName: APP_NAME,
  keywords: ["tarot", "tarot čitanje", "dnevni tarot", "besplatni tarot", "astrologija", "horoskop", "zodijak", "proricanje", "tarot karte"],
  appleWebApp: {
    capable: true,
    title: APP_NAME,
    statusBarStyle: 'black-translucent',
  },
  openGraph: {
    title: APP_NAME,
    description: APP_DESCRIPTION,
    url: APP_URL,
    type: 'website',
    images: [`/og-image.png`], 
  },
  twitter: {
    card: 'summary_large_image',
    title: APP_NAME,
    description: APP_DESCRIPTION,
    images: [`/og-image.png`],
  },
  icons: {
    icon: '/LogoByLokee.png',
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: '#1a0f2a', // Corresponds to the dark theme background
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": APP_NAME,
  "description": APP_DESCRIPTION,
  "applicationCategory": "EntertainmentApplication",
  "operatingSystem": "WEB",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sr" className="dark">
      <head>
        <script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2968048666598097"
          crossOrigin="anonymous"
        ></script>
        <GoogleAnalytics />
      </head>
      <body className={cn("font-body antialiased", lora.variable, playfairDisplay.variable)}>
        <div id="root-content" className='min-h-screen'>
          {children}
        </div>
        <div id="orientation-blocker" className="hidden fixed inset-0 z-[200] bg-background items-center justify-center text-center p-4">
          <div className="flex flex-col items-center gap-4">
            <Smartphone className="w-16 h-16 text-primary animate-pulse-slow" />
            <h2 className="font-headline text-2xl font-bold">Molimo rotirajte uređaj</h2>
            <p className="text-muted-foreground">Ova aplikacija je optimizovana za portretni (uspravni) prikaz.</p>
          </div>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
