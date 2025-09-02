
"use server";

import {
  generateTarotReading,
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
  language: z.string(),
});

export async function getTarotReading(input: { zodiacSign: string, question: string, language: string }) {
  // We re-validate on the server as a security measure.
  const validation = ReadingActionSchema.safeParse(input);
  if (!validation.success) {
    // This should ideally not be reached if client-side validation is working.
    throw new Error(validation.error.errors[0].message);
  }

  try {
    // Pass the validated data directly. The language is now required.
    const result = await generateTarotReading(validation.data);
    return result;
  } catch (error) {
    console.error("Error in getTarotReading:", error);
    // Return a user-friendly error message
    throw new Error(
      "Došlo je do greške prilikom generisanja čitanja. Molimo pokušajte ponovo."
    );
  }
}
