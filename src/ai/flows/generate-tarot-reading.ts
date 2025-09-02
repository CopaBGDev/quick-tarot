
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

// This is an internal schema that includes the randomly drawn cards.
// It's not exported because the client doesn't need to know about it.
const InternalPromptInputSchema = GenerateTarotReadingInputSchema.extend({
    cards: z.array(z.string()).describe("The three randomly selected tarot cards.")
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
  system: `You are a tarot reader. The user has already drawn three random tarot cards. Your task is to provide a detailed tarot reading based *only* on these three cards, connecting them to the user's question and zodiac sign. The entire reading must be in the requested language.

The user's drawn cards are:
1. {{{cards.[0]}}}
2. {{{cards.[1]}}}
3. {{{cards.[2]}}}

IMPORTANT: For the output, you must list the exact three card names provided above. Do not choose or invent other cards. For example, if a card is 'The Justice', you must return 'The Justice'.`,
  prompt: 'User Zodiac Sign: {{{zodiacSign}}}. User Question: "{{{question}}}". Language for response: {{{language}}}. Please provide the tarot reading now based on the provided cards.'
});

const generateTarotReadingFlow = ai.defineFlow(
  {
    name: 'generateTarotReadingFlow',
    inputSchema: GenerateTarotReadingInputSchema,
    outputSchema: GenerateTarotReadingOutputSchema,
  },
  async (input) => {
    // Helper function to shuffle an array using Math.random for compatibility
    // This is defined inside the flow to prevent hydration errors.
    function shuffleArray<T>(array: T[]): T[] {
        const newArr = [...array];
        for (let i = newArr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
        }
        return newArr;
    }

    // 1. Shuffle the deck and draw 3 cards.
    const shuffledDeck = shuffleArray(FULL_DECK);
    const drawnCards = shuffledDeck.slice(0, 3);
    
    // 2. Create the input for the prompt, including the drawn cards.
    const promptInput = {
        ...input,
        cards: drawnCards,
    };

    // 3. Call the prompt with the selected cards.
    const { output } = await tarotReadingPrompt(promptInput);
    if (!output) {
      throw new Error('Failed to generate tarot reading. The AI model did not return a valid output.');
    }
    
    // 4. Ensure the output cards match the drawn cards.
    // This is a critical safeguard against the AI hallucinating different cards
    // and ensures data consistency.
    const finalOutput: GenerateTarotReadingOutput = {
      tarotReading: output.tarotReading,
      cards: drawnCards.map(cardName => ({ name: cardName })),
    };

    return finalOutput;
  }
);
