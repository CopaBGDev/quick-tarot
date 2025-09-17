"use client";

import * as React from "react";
import { LanguageSelector } from "./language-selector";
import type { TranslationSet } from "@/lib/translations";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface FooterProps {
  translations: TranslationSet;
  language: string;
  onLanguageChange: (languageCode: string) => void;
  disabled?: boolean;
}

export function Footer({ translations, language, onLanguageChange, disabled }: FooterProps) {
  const footerLinks = [
    { text: translations.footerAbout, href: `/about?lang=${language}` },
    { text: translations.footerMission, href: `/mission?lang=${language}` },
    { text: translations.footerFaq, href: `/faq?lang=${language}` },
    { text: translations.footerTerms, href: `/terms?lang=${language}` },
    { text: translations.footerPrivacy, href: `/privacy?lang=${language}` },
  ];

  return (
    <footer className={cn("w-full flex-col items-center gap-6 flex p-4 sm:p-6")}>
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="mb-4">
          <LanguageSelector
            selectedLanguage={language}
            onLanguageChange={onLanguageChange}
            disabled={disabled}
          />
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap justify-center">
          {footerLinks.map((link, index) => (
            <React.Fragment key={link.href}>
              <Link href={link.href} className="underline hover:text-primary transition-colors">
                {link.text}
              </Link>
              {index < footerLinks.length - 1 && (
                <span className="text-muted-foreground/50 hidden sm:inline">|</span>
              )}
            </React.Fragment>
          ))}
        </div>
        <span className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Quick Tarot. {translations.footerCopyright}
        </span>
      </div>
    </footer>
  );
}
