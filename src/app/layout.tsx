
import type {Metadata, Viewport} from 'next';
import Script from 'next/script';
import { Playfair_Display, Lora } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { cn } from '@/lib/utils';

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
const APP_URL = "https://tarot.studio.operationsmile.org"; // Replace with your actual production URL

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
  applicationName: APP_NAME,
  appleWebApp: {
    capable: true,
    title: APP_NAME,
    statusBarStyle: 'default',
  },
  openGraph: {
    title: APP_NAME,
    description: APP_DESCRIPTION,
    url: APP_URL,
    type: 'website',
    images: [`${APP_URL}/og-image.png`], // Ensure you have this image in your public folder
  },
  twitter: {
    card: 'summary_large_image',
    title: APP_NAME,
    description: APP_DESCRIPTION,
    images: [`${APP_URL}/og-image.png`], // Ensure you have this image in your public folder
  },
};

export const viewport: Viewport = {
  themeColor: '#1a0f2a', // Corresponds to the dark theme background
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sr" className="dark">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2968048666598097"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={cn("font-body antialiased", lora.variable, playfairDisplay.variable)}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
