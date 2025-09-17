// This is a server-side file.
'use server';

/**
 * @fileOverview Generates a "Card of the Day" with a brief interpretation.
 *
 * - getDailyCard - A function that returns the card of the day and its meaning.
 * - DailyCard - The output type for the getDailyCard function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';
import { FULL_DECK } from '@/lib/cards';
import { format } from 'date-fns';

const DailyCardOutputSchema = z.object({
  cardName: z.string().describe("The name of the tarot card."),
  interpretation: z.string().describe("A brief, general interpretation of the card for the day (2-3 sentences)."),
});

export type DailyCard = z.infer<typeof DailyCardOutputSchema>;

// Simple pseudo-random number generator to ensure the same card is picked for the same day
function seededRandom(seed: number) {
    let x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

function getCardForDay(): string {
    const today = new Date();
    // Simple seed based on year, month, and day
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    const randomIndex = Math.floor(seededRandom(seed) * FULL_DECK.length);
    return FULL_DECK[randomIndex];
}

const dailyCardPrompt = ai.definePrompt({
    name: 'dailyCardPrompt',
    input: { schema: z.object({ cardName: z.string(), language: z.string() }) },
    output: { schema: DailyCardOutputSchema.pick({ interpretation: true }) },
    system: `You are a tarot reader providing a "Card of the Day". 
    Your task is to provide a brief, general interpretation (2-3 sentences) for the card provided: {{{cardName}}}.
    The interpretation should be uplifting and reflective.
    The entire response must be in the requested language. Do not mention the card name in the interpretation.`,
    prompt: 'Card: {{{cardName}}}. Language for response: {{{language}}}. Please provide the interpretation now.'
});


const getDailyCardFlow = ai.defineFlow(
  {
    name: 'getDailyCardFlow',
    inputSchema: z.object({ language: z.string() }),
    outputSchema: DailyCardOutputSchema,
  },
  async ({ language }) => {
    // 1. Deterministically select a card based on the date.
    const cardName = getCardForDay();

    // 2. Call the prompt to get the interpretation.
    const { output } = await dailyCardPrompt({ cardName, language });
    if (!output) {
      throw new Error('Failed to generate daily card interpretation.');
    }
    
    // 3. Return the card name and its interpretation.
    return {
      cardName,
      interpretation: output.interpretation
    };
  }
);


export async function getDailyCard(language: string): Promise<DailyCard> {
    return getDailyCardFlow({ language });
}
