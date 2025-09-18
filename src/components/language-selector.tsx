
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
                <span className="text-sm font-medium">
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
