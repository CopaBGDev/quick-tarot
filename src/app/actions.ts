
"use server";

import {
  generateTarotReading
} from "@/ai/flows/generate-tarot-reading";
import { z } from "zod";
import type { GenerateTarotReadingInput, GenerateTarotReadingOutput } from "@/ai/flows/generate-tarot-reading";
import type { TranslationSet } from "@/lib/translations";

// Definisanje tipa za grešku radi lakšeg korišćenja
export type ReadingError = {
    message: string;
};


// Definišemo Zod šemu za validaciju ulaznih podataka.
const ReadingActionSchema = z.object({
  zodiacSign: z.string(), // Validacija se već dešava na klijentu
  question: z.string().trim().min(2).max(200), // Osnovna serverska validacija
  language: z.string(),
});

export async function getTarotReading(
    input: GenerateTarotReadingInput, 
    translations: TranslationSet
): Promise<GenerateTarotReadingOutput> {

  const validation = ReadingActionSchema.safeParse({
      ...input,
      language: input.language || 'Serbian',
  });

  if (!validation.success) {
    // Ako validacija ne uspe, vraćamo grešku koristeći prevode.
    // Ovde koristimo opštije poruke jer Zod greške mogu biti na engleskom.
    if (validation.error.issues.some(issue => issue.path.includes('question'))) {
        throw new Error(translations.formQuestionErrorTooShort);
    }
    throw new Error(translations.unknownError);
  }

  try {
    const result = await generateTarotReading(validation.data);
    return result;
  } catch (error) {
    console.error("Error in getTarotReading:", error);
    if (error instanceof Error && (error.message.includes("503") || error.message.toLowerCase().includes("overloaded")) ) {
       throw new Error(
        translations.serviceOverloadedError // Korišćenje prevedene poruke
      );
    }
    // Za sve ostale greške, vraćamo generičku prevedenu poruku.
    throw new Error(
      translations.unknownError
    );
  }
}
