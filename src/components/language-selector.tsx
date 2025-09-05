
"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Languages } from 'lucide-react';

interface Language {
  code: string;
  name: string;
  nativeName: string;
}

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'sr', name: 'Serbian', nativeName: 'Srpski' },
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  { code: 'zh', name: 'Chinese', nativeName: '中文' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
];

interface LanguageSelectorProps {
  selectedLanguage: string;
  onLanguageChange: (languageCode: string) => void;
  disabled?: boolean;
}

export function LanguageSelector({ selectedLanguage, onLanguageChange, disabled }: LanguageSelectorProps) {
  return (
    <Select
      value={selectedLanguage}
      onValueChange={onLanguageChange}
      disabled={disabled}
    >
      <SelectTrigger className="w-auto border-none bg-transparent shadow-none focus:ring-0 focus:ring-offset-0">
        <SelectValue asChild>
            <div className="flex items-center gap-2">
                <Languages className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium hidden sm:inline">
                    {SUPPORTED_LANGUAGES.find(l => l.code === selectedLanguage)?.nativeName}
                </span>
            </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {SUPPORTED_LANGUAGES.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            {lang.nativeName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
