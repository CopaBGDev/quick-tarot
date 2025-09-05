
"use server";

import {
  generateTarotReading
} from "@/ai/flows/generate-tarot-reading";
import { z } from "zod";
import type { GenerateTarotReadingInput, GenerateTarotReadingOutput } from "@/ai/flows/generate-tarot-reading";


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
    throw new Error(validation.error.errors[0].message);
  }

  try {
    const validatedData = {
      ...validation.data,
      language: validation.data.language || 'sr',
    };
    
    const result = await generateTarotReading(validatedData);
    return result;
  } catch (error) {
    console.error("Error in getTarotReading:", error);
    if (error instanceof Error && (error.message.includes("503") || error.message.toLowerCase().includes("overloaded")) ) {
       throw new Error(
        "Servis je trenutno preopterećen. Molimo pokušajte ponovo za nekoliko trenutaka."
      );
    }
    throw new Error(
      "Došlo je do greške prilikom generisanja čitanja. Molimo pokušajte ponovo."
    );
  }
}

    