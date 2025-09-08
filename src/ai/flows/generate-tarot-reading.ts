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
  language: z.string().describe('The language for the output, e.g., "Serbian", "English", "Norwegian".'),
});
export type GenerateTarotReadingInput = z.infer<typeof GenerateTarotReadingInputSchema>;


// This is an internal schema that includes the three pre-selected cards for the AI to interpret.
const InternalPromptInputSchema = GenerateTarotReadingInputSchema.extend({
  card1: z.string().describe("The first randomly selected tarot card."),
  card2: z.string().describe("The second randomly selected tarot card."),
  card3: z.string().describe("The third randomly selected tarot card."),
});


const GenerateTarotReadingOutputSchema = z.object({
  tarotReading: z.string().describe("The detailed tarot reading based on the chosen cards, user's question, and zodiac sign, in the requested language."),
});
export type GenerateTarotReadingOutput = {
    cards: { name: string }[];
    tarotReading: string;
};


export async function generateTarotReading(input: GenerateTarotReadingInput): Promise<GenerateTarotReadingOutput> {
  return generateTarotReadingFlow(input);
}

const tarotReadingPrompt = ai.definePrompt({
  name: 'tarotReadingPrompt',
  input: { schema: InternalPromptInputSchema }, 
  output: { schema: z.object({ tarotReading: GenerateTarotReadingOutputSchema.shape.tarotReading }) },
  system: `You are a tarot reader. Your task is to provide a detailed tarot reading based *only* on the three cards provided to you: {{{card1}}}, {{{card2}}}, and {{{card3}}}. 
You must connect them to the user's question and zodiac sign. The entire reading must be in the requested language. Do not choose any other cards.
Your output must be only the tarot reading itself.`,
  prompt: 'User Zodiac Sign: {{{zodiacSign}}}. User Question: "{{{question}}}". Language for response: {{{language}}}. Please provide the tarot reading now based on the three provided cards.'
});


/**
 * Shuffles an array in-place and returns the first few elements.
 * @param array The array to shuffle.
 * @param count The number of elements to return.
 * @returns A new array containing `count` random elements from the original array.
 */
function getRandomCards<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}


const generateTarotReadingFlow = ai.defineFlow(
  {
    name: 'generateTarotReadingFlow',
    inputSchema: GenerateTarotReadingInputSchema,
    outputSchema: z.object({
        cards: z.array(z.object({ name: z.string() })).length(3),
        tarotReading: z.string(),
    }),
  },
  async (input) => {
    // 1. Programmatically and randomly select 3 cards. This guarantees randomness.
    const chosenCards = getRandomCards(FULL_DECK, 3);

    // 2. Create the input for the prompt, including the pre-selected cards.
    const promptInput = {
        ...input,
        card1: chosenCards[0],
        card2: chosenCards[1],
        card3: chosenCards[2],
    };

    // 3. Call the prompt and get the structured output.
    const { output } = await tarotReadingPrompt(promptInput);
    if (!output) {
      throw new Error('Failed to generate tarot reading. The AI model did not return a valid output.');
    }
    
    // 4. Return the original cards and the AI-generated reading.
    return {
      cards: chosenCards.map(name => ({ name })),
      tarotReading: output.tarotReading
    };
  }
);
