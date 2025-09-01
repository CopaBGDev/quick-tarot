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

// The output now only contains the card name. The image path will be constructed on the client.
const TarotCardOutputSchema = z.object({
  name: z.string().describe('The name of the tarot card in English.'),
});

const GenerateTarotReadingOutputSchema = z.object({
  cards: z.array(TarotCardOutputSchema).length(3).describe('The three tarot cards that were drawn.'),
  tarotReading: z.string().describe('The generated tarot reading in the requested language.'),
});
export type GenerateTarotReadingOutput = z.infer<typeof GenerateTarotReadingOutputSchema>;

export async function generateTarotReading(input: GenerateTarotReadingInput): Promise<GenerateTarotReadingOutput> {
  return generateTarotReadingFlow(input);
}

const ReadingPromptInputSchema = z.object({
  zodiacSign: z.string().describe('The zodiac sign of the user.'),
  question: z.string().describe('The question asked by the user.'),
  language: z.string().optional().default('sr').describe('The language for the output, e.g., "en" for English.'),
});


const tarotReadingPrompt = ai.definePrompt({
  name: 'tarotReadingPrompt',
  input: { schema: ReadingPromptInputSchema },
  output: { schema: z.object({
    // Card names must be in English to match the image file names.
    card1: z.string().describe('The name of the first tarot card, in English.'),
    card2: z.string().describe('The name of the second tarot card, in English.'),
    card3: z.string().describe('The name of the third tarot card, in English.'),
    tarotReading: z.string().describe('The generated tarot reading, in the requested language.'),
  })},
  system: 'You are a tarot reader. Your task is to choose three tarot cards from the full 78-card deck that are most relevant to the user\'s question and zodiac sign. Then, you must provide a tarot reading based on those three cards to answer the user\'s question. The entire reading must be in the requested language. IMPORTANT: The names of the three cards (card1, card2, card3) must be in English.',
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
    
    const { card1, card2, card3, tarotReading } = output;

    return {
      cards: [
        { name: card1 },
        { name: card2 },
        { name: card3 },
      ],
      tarotReading,
    };
  }
);
