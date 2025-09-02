
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
import { FULL_DECK } from '@/lib/cards';

const GenerateTarotReadingInputSchema = z.object({
  zodiacSign: z.string().describe('The zodiac sign of the user.'),
  question: z.string().describe('The question asked by the user.'),
  language: z.string().describe('The language for the output, e.g., "sr" for Serbian.'),
});
export type GenerateTarotReadingInput = z.infer<typeof GenerateTarotReadingInputSchema>;

// This is an internal schema that includes the full deck of cards for the AI to choose from.
// It's not exported because the client doesn't need to know about it.
const InternalPromptInputSchema = GenerateTarotReadingInputSchema.extend({
    fullDeck: z.array(z.string()).describe("The entire deck of 78 tarot cards.")
});

const TarotCardOutputSchema = z.object({
  name: z.string().describe('The name of the tarot card in English. For example: "The Fool", "The Magician", "Ace of Wands", "The Justice", "Strength".'),
});

const GenerateTarotReadingOutputSchema = z.object({
  cards: z.array(TarotCardOutputSchema).describe('The three tarot cards that were drawn.'),
  tarotReading: z.string().describe('The generated tarot reading in the requested language.'),
});
export type GenerateTarotReadingOutput = z.infer<typeof GenerateTarotReadingOutputSchema>;

export async function generateTarotReading(input: GenerateTarotReadingInput): Promise<GenerateTarotReadingOutput> {
  return generateTarotReadingFlow(input);
}

const tarotReadingPrompt = ai.definePrompt({
  name: 'tarotReadingPrompt',
  input: { schema: InternalPromptInputSchema }, // Use the internal schema
  output: { schema: GenerateTarotReadingOutputSchema },
  system: `You are a tarot reader. Your task is to randomly select exactly three cards from the provided list of all 78 tarot cards. Then, provide a detailed tarot reading based *only* on the three cards you have chosen, connecting them to the user's question and zodiac sign. The entire reading must be in the requested language.

Here is the full deck of cards you must choose from:
{{#each fullDeck}}
- {{{this}}}
{{/each}}

IMPORTANT: For the 'cards' field in your output, you MUST list the exact three card names you randomly selected. Do not invent other cards. For example, if you choose 'The Justice', you must return 'The Justice'.`,
  prompt: 'User Zodiac Sign: {{{zodiacSign}}}. User Question: "{{{question}}}". Language for response: {{{language}}}. Please provide the tarot reading now based on the three cards you have randomly selected from the full deck.'
});

const generateTarotReadingFlow = ai.defineFlow(
  {
    name: 'generateTarotReadingFlow',
    inputSchema: GenerateTarotReadingInputSchema,
    outputSchema: GenerateTarotReadingOutputSchema,
  },
  async (input) => {
    // 1. Create the input for the prompt, including the full deck.
    const promptInput = {
        ...input,
        fullDeck: FULL_DECK,
    };

    // 2. Call the prompt and let the AI select the cards and generate the reading.
    const { output } = await tarotReadingPrompt(promptInput);
    if (!output) {
      throw new Error('Failed to generate tarot reading. The AI model did not return a valid output.');
    }
    
    // 3. The AI's output is now the source of truth for both cards and reading.
    return output;
  }
);
