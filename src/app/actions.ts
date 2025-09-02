"use server";

import {
  generateTarotReading,
  GenerateTarotReadingInput,
  GenerateTarotReadingOutput,
} from "@/ai/flows/generate-tarot-reading";
import { z } from "zod";

// This schema must be kept in sync with the one in tarot-client.tsx
// It's used for server-side validation.
const ReadingActionSchema = z.object({
  zodiacSign: z.string().min(1, "Morate izabrati znak."),
  question: z
    .string()
    .min(10, "Pitanje mora imati najmanje 10 karaktera.")
    .max(200, "Pitanje ne može biti duže od 200 karaktera."),
  language: z.string().optional(), // Sada je jezik opcionalan u shemi
});

export async function getTarotReading(input: GenerateTarotReadingInput): Promise<GenerateTarotReadingOutput> {
  // We re-validate on the server as a security measure.
  const validation = ReadingActionSchema.safeParse(input);
  if (!validation.success) {
    // This should ideally not be reached if client-side validation is working.
    throw new Error(validation.error.errors[0].message);
  }

  try {
    // Proveravamo da li je jezik definisan i postavljamo podrazumevanu vrednost
    const validatedData = {
      ...validation.data,
      language: validation.data.language || 'sr', // Postavlja 'sr' kao podrazumevani
    };

    // Prosleđujemo proverene i kompletne podatke
    const result = await generateTarotReading(validatedData);
    return result;
  } catch (error) {
    console.error("Error in getTarotReading:", error);
    // Return a user-friendly error message
    throw new Error(
      "Došlo je do greške prilikom generisanja čitanja. Molimo pokušajte ponovo."
    );
  }
}
