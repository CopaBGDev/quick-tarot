
"use client";

import * as React from "react";
import { AdPlaceholder } from "./ad-placeholder";
import { LanguageSelector } from "./language-selector";
import { InfoDialog } from "./info-dialog";
import type { TranslationSet } from "@/lib/translations";

interface FooterProps {
  translations: TranslationSet;
  language: string;
  onLanguageChange: (languageCode: string) => void;
  disabled?: boolean;
}

export function Footer({ translations, language, onLanguageChange, disabled }: FooterProps) {
  const footerLinks = [
    {
      triggerText: translations.footerAbout,
      title: translations.aboutDialogTitle,
      content: translations.aboutDialogContent,
    },
    {
      triggerText: translations.footerMission,
      title: translations.missionDialogTitle,
      content: translations.missionDialogContent,
    },
    {
      triggerText: translations.footerFaq,
      title: translations.faqDialogTitle,
      content: translations.faqDialogContent,
    },
    {
      triggerText: translations.footerTerms,
      title: translations.termsDialogTitle,
      content: translations.termsDialogContent,
    },
    {
      triggerText: translations.footerPrivacy,
      title: translations.privacyDialogTitle,
      content: translations.privacyDialogContent,
    },
  ];

  return (
    <footer className="w-full flex-col items-center gap-6 flex">
      <AdPlaceholder />
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
            <React.Fragment key={link.title}>
              <InfoDialog
                triggerText={link.triggerText}
                title={link.title}
                content={link.content}
              />
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

    