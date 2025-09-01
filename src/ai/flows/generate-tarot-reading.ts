
// This is a server-side file.
'use server';

/**
 * @fileOverview Generates a tarot reading based on the user's zodiac sign and question, and translates it to the user's language.
 *
 * - generateTarotReading - A function that generates a tarot reading.
 * - GenerateTarotReadingInput - The input type for the generateTarotReading function.
 * - GenerateTarotReadingOutput - The return type for the generateTarotReadingOutput function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const GenerateTarotReadingInputSchema = z.object({
  zodiacSign: z.string().describe('The zodiac sign of the user.'),
  question: z.string().describe('The question asked by the user.'),
  language: z.string().optional().default('sr').describe('The language for the output, e.g., "en" for English.'),
});
export type GenerateTarotReadingInput = z.infer<typeof GenerateTarotReadingInputSchema>;

// The output now contains the card name and the full image path.
const TarotCardOutputSchema = z.object({
  name: z.string().describe('The name of the tarot card in English. For example: "The Fool", "The Magician", "Ace of Wands".'),
  imagePath: z.string().describe('The web path to the card image. This MUST be in the format /cards/card_name.jpg, where card_name is the lowercased card name with spaces replaced by underscores. For example, for "The Fool" the path is "/cards/the_fool.jpg".'),
});

const GenerateTarotReadingOutputSchema = z.object({
  cards: z.array(TarotCardOutputSchema).length(3).describe('The three tarot cards that were drawn.'),
  tarotReading: z.string().describe('The generated tarot reading in the requested language.'),
});
export type GenerateTarotReadingOutput = z.infer<typeof GenerateTarotReadingOutputSchema>;

export async function generateTarotReading(input: GenerateTarotReadingInput): Promise<GenerateTarotReadingOutput> {
  return generateTarotReadingFlow(input);
}

const tarotReadingPrompt = ai.definePrompt({
  name: 'tarotReadingPrompt',
  input: { schema: GenerateTarotReadingInputSchema },
  output: { schema: GenerateTarotReadingOutputSchema },
  system: 'You are a tarot reader. Your task is to choose three tarot cards from the full 78-card deck that are most relevant to the user\'s question and zodiac sign. Then, you must provide a tarot reading based on those three cards to answer the user\'s question. The entire reading must be in the requested language. IMPORTANT: For each card, you must provide both its name in English and the corresponding imagePath. The imagePath must follow the format /cards/card_name.jpg, where card_name is the lowercased card name with spaces replaced by underscores (e.g., "The Fool" becomes "/cards/the_fool.jpg", "Page of Wands" becomes "/cards/page_of_wands.jpg").',
  prompt: 'User Zodiac Sign: {{{zodiacSign}}}. User Question: "{{{question}}}". Language for response: {{{language}}}. Please provide the tarot reading now.'
});

const generateTarotReadingFlow = ai.defineFlow(
  {
    name: 'generateTarotReadingFlow',
    inputSchema: GenerateTarotReadingInputSchema,
    outputSchema: GenerateTarotReadingOutputSchema,
  },
  async (input) => {
    const { output } = await tarotReadingPrompt(input);
    if (!output) {
      throw new Error('Failed to generate tarot reading.');
    }
    return output;
  }
);
