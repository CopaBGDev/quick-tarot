// This is a server-side file.
'use server';

/**
 * @fileOverview Generates a tarot reading based on the user's zodiac sign and question, and translates it to the user's language.
 *
 * - generateTarotReading - A function that generates a tarot reading.
 * - GenerateTarotReadingInput - The input type for the generateTarotReading function.
 * - GenerateTarotReadingOutput - The output type for the generateTarotReading function.
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

// The output is now a plain string that we will parse manually.
// This avoids potential issues with Zod schemas in the Vercel environment.
const GenerateTarotReadingOutputSchema = z.object({
  cards: z.array(z.object({ name: z.string() })).length(3).describe("An array containing exactly three chosen tarot cards, each with a name."),
  tarotReading: z.string().describe("The detailed tarot reading based on the chosen cards, user's question, and zodiac sign, in the requested language."),
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
{{/each}}`,
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

    // 2. Call the prompt and get the structured output.
    const { output } = await tarotReadingPrompt(promptInput);
    if (!output) {
      throw new Error('Failed to generate tarot reading. The AI model did not return a valid output.');
    }
    
    // 3. The output is already a valid JSON object thanks to the Zod schema.
    return output;
  }
);
