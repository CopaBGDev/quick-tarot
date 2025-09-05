
"use server";

import {
  generateTarotReading
} from "@/ai/flows/generate-tarot-reading";
import { z } from "zod";
import type { GenerateTarotReadingInput, GenerateTarotReadingOutput } from "@/ai/flows/generate-tarot-reading";

// Define the validation schema directly for clarity.
const ReadingActionSchema = z.object({
  zodiacSign: z.string().min(1, "Morate izabrati validan znak."),
  question: z
    .string()
    .trim()
    .min(2, "Pitanje mora imati najmanje 2 karaktera.")
    .max(200, "Pitanje ne može biti duže od 200 karaktera."),
  language: z.string().optional(),
});

export async function getTarotReading(input: GenerateTarotReadingInput): Promise<GenerateTarotReadingOutput> {
  const validation = ReadingActionSchema.safeParse(input);
  if (!validation.success) {
    // This provides a generic but clear error based on Zod's output.
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
