
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
  question: z.string(), // Uklanjamo min/max validaciju sa servera
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
    // Greška bi se desila samo ako podaci fundamentalno ne odgovaraju tipu, što ne bi trebalo da se desi.
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
