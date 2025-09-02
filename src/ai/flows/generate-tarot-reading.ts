// This is a server-side file.
'use server';

/**
 * @fileOverview Generates a tarot reading based on the user's zodiac sign and question, and translates it to the user's language.
 *
 * - generateTarotReading - A function that generates a tarot reading.
 * - GenerateTarotReadingInput - The input type for the generateTarotReading function.
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
export type GenerateTarotReadingOutput = {
  cards: { name: string }[];
  tarotReading: string;
};


export async function generateTarotReading(input: GenerateTarotReadingInput): Promise<GenerateTarotReadingOutput> {
  return generateTarotReadingFlow(input);
}

const tarotReadingPrompt = ai.definePrompt({
  name: 'tarotReadingPrompt',
  input: { schema: InternalPromptInputSchema }, // Use the internal schema
  system: `You are a tarot reader. Your task is to randomly select exactly three cards from the provided list of all 78 tarot cards. Then, provide a detailed tarot reading based *only* on the three cards you have chosen, connecting them to the user's question and zodiac sign. The entire reading must be in the requested language.

Here is the full deck of cards you must choose from:
{{#each fullDeck}}
- {{{this}}}
{{/each}}

You MUST format your response as a valid JSON object with NO MARKDOWN formatting. The JSON object must have two keys:
1. "cards": an array of three objects, where each object has a "name" key with the English name of the card you selected. Example: [{"name": "The Fool"}, {"name": "The Magician"}, {"name": "The Justice"}]
2. "tarotReading": a string containing the full, detailed tarot reading in the requested language.`,
  prompt: 'User Zodiac Sign: {{{zodiacSign}}}. User Question: "{{{question}}}". Language for response: {{{language}}}. Please provide the tarot reading now based on the three cards you have randomly selected from the full deck.'
});

const generateTarotReadingFlow = ai.defineFlow(
  {
    name: 'generateTarotReadingFlow',
    inputSchema: GenerateTarotReadingInputSchema,
    outputSchema: z.any(), // We will handle parsing manually
  },
  async (input) => {
    // 1. Create the input for the prompt, including the full deck.
    const promptInput = {
        ...input,
        fullDeck: FULL_DECK,
    };

    // 2. Call the prompt and get the raw text output.
    const { output } = await tarotReadingPrompt(promptInput);
    if (!output) {
      throw new Error('Failed to generate tarot reading. The AI model did not return a valid output.');
    }
    
    // 3. Manually parse the JSON string.
    try {
      // The output from the LLM is a string, so we need to parse it.
      const parsedOutput = JSON.parse(output as string);
      
      // Basic validation to ensure the parsed object has the keys we expect.
      if (!parsedOutput.cards || !parsedOutput.tarotReading) {
        throw new Error("AI output is missing required keys 'cards' or 'tarotReading'.");
      }
      
      return parsedOutput as GenerateTarotReadingOutput;
    } catch (e) {
      console.error("Failed to parse AI output:", e);
      console.error("Raw AI output:", output);
      throw new Error("There was an issue interpreting the response from the AI. Please try again.");
    }
  }
);
