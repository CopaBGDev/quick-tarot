
"use server";

import {
  generateTarotReading
} from "@/ai/flows/generate-tarot-reading";
import { z } from "zod";
import type { GenerateTarotReadingInput, GenerateTarotReadingOutput } from "@/ai/flows/generate-tarot-reading";
import { ALL_TRANSLATIONS } from "@/lib/translations";
import { NATURAL_ORDER_EN } from "@/components/zodiac-wheel";

// Generate an array of all possible zodiac sign names across all languages
const allZodiacSigns = Object.values(ALL_TRANSLATIONS).flatMap(t => [
  t.zodiacSignAries, t.zodiacSignTaurus, t.zodiacSignGemini, t.zodiacSignCancer,
  t.zodiacSignLeo, t.zodiacSignVirgo, t.zodiacSignLibra, t.zodiacSignScorpio,
  t.zodiacSignSagittarius, t.zodiacSignCapricorn, t.zodiacSignAquarius, t.zodiacSignPisces,
]);
const uniqueZodiacSigns = [...new Set(allZodiacSigns)];

const ReadingActionSchema = z.object({
  zodiacSign: z.enum(uniqueZodiacSigns as [string, ...string[]], {
    errorMap: () => ({ message: "Morate izabrati validan znak." }),
  }),
  question: z
    .string()
    .min(2, "Pitanje mora imati najmanje 2 karaktera.")
    .max(200, "Pitanje ne može biti duže od 200 karaktera."),
  language: z.string().optional(),
});

export async function getTarotReading(input: GenerateTarotReadingInput): Promise<GenerateTarotReadingOutput> {
  const validation = ReadingActionSchema.safeParse(input);
  if (!validation.success) {
    // This error message will be in Serbian, but the UI should show its own translated error.
    throw new Error(validation.error.errors[0].message);
  }

  try {
    const validatedData = {
      ...validation.data,
      language: validation.data.language || 'Serbian',
    };
    
    const result = await generateTarotReading(validatedData);
    return result;
  } catch (error) {
    console.error("Error in getTarotReading:", error);
    if (error instanceof Error && (error.message.includes("503") || error.message.toLowerCase().includes("overloaded")) ) {
       throw new Error(
        "The service is currently overloaded. Please try again in a few moments."
      );
    }
    throw new Error(
      "An error occurred while generating the reading. Please try again."
    );
  }
}
