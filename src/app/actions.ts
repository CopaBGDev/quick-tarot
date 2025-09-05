
"use server";

import {
  generateTarotReading
} from "@/ai/flows/generate-tarot-reading";
import { z } from "zod";
import type { GenerateTarotReadingInput, GenerateTarotReadingOutput } from "@/ai/flows/generate-tarot-reading";
import { translateUI } from "@/ai/flows/translate-ui-flow";
import { TranslateUIInputSchema } from "@/ai/schemas";
import type { TranslateUIOutput } from "@/ai/flows/translate-ui-flow";


const ReadingActionSchema = z.object({
  zodiacSign: z.string().min(1, "Morate izabrati znak."),
  question: z
    .string()
    .min(10, "Pitanje mora imati najmanje 10 karaktera.")
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

export async function getUiTranslations(input: z.infer<typeof TranslateUIInputSchema>): Promise<TranslateUIOutput> {
    const validation = TranslateUIInputSchema.safeParse(input);
    if (!validation.success) {
        throw new Error('Invalid input for translation.');
    }
    try {
        return await translateUI(validation.data);
    } catch(error) {
        console.error("Error in getUiTranslations:", error);
        throw new Error("Failed to translate UI.");
    }
}
    
