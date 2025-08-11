"use server";

import {
  generateTarotReading,
  type GenerateTarotReadingInput,
} from "@/ai/flows/generate-tarot-reading";
import { z } from "zod";

const ActionSchema = z.object({
  zodiacSign: z.string().min(1, "Morate izabrati znak."),
  question: z
    .string()
    .min(10, "Pitanje mora imati najmanje 10 karaktera.")
    .max(200, "Pitanje ne može biti duže od 200 karaktera."),
});

export async function getTarotReading(input: GenerateTarotReadingInput) {
  const validation = ActionSchema.safeParse(input);
  if (!validation.success) {
    throw new Error(validation.error.errors[0].message);
  }

  try {
    const result = await generateTarotReading(validation.data);
    return result;
  } catch (error) {
    console.error(error);
    // Return a user-friendly error message
    throw new Error(
      "Došlo je do greške prilikom generisanja čitanja. Molimo pokušajte ponovo."
    );
  }
}
