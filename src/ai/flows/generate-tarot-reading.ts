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
import {z} from 'genkit';
import { generateTarotCardImage } from './generate-tarot-card-image';
import { generateTarotReadingAudio } from './generate-tarot-reading-audio';
import { VoiceEnum } from './types';

const GenerateTarotReadingInputSchema = z.object({
  zodiacSign: z.string().describe('The zodiac sign of the user.'),
  question: z.string().describe('The question asked by the user.'),
  language: z.string().optional().default('sr').describe('The language for the output, e.g., "en" for English.'),
  voice: VoiceEnum.optional().describe('The voice to use for the audio output.'),
});
export type GenerateTarotReadingInput = z.infer<typeof GenerateTarotReadingInputSchema>;

const TarotCardOutputSchema = z.object({
  name: z.string().describe('The name of the tarot card.'),
  image: z.string().describe("A data URI of a generated image for the tarot card. Expected format: 'data:image/png;base64,<encoded_data>'."),
});

const GenerateTarotReadingOutputSchema = z.object({
  cards: z.array(TarotCardOutputSchema).length(3).describe('The three tarot cards that were drawn.'),
  tarotReading: z.string().describe('The generated tarot reading in the requested language.'),
  audioDataUri: z.string().optional().describe("A data URI of the generated audio for the tarot reading. Expected format: 'data:audio/wav;base64,<encoded_data>'."),
});
export type GenerateTarotReadingOutput = z.infer<typeof GenerateTarotReadingOutputSchema>;

export async function generateTarotReading(input: GenerateTarotReadingInput): Promise<GenerateTarotReadingOutput> {
  return generateTarotReadingFlow(input);
}

const ReadingPromptInputSchema = GenerateTarotReadingInputSchema.omit({ voice: true });

const tarotReadingPrompt = ai.definePrompt({
  name: 'tarotReadingPrompt',
  input: { schema: ReadingPromptInputSchema },
  output: { schema: z.object({
    card1: z.string().describe('The name of the first tarot card.'),
    card2: z.string().describe('The name of the second tarot card.'),
    card3: z.string().describe('The name of the third tarot card.'),
    tarotReading: z.string().describe('The generated tarot reading, in the requested language.'),
  })},
  system: 'You are a tarot reader. Your task is to choose three tarot cards from the full 78-card deck that are most relevant to the user\'s question and zodiac sign. Then, you must provide a tarot reading based on those three cards to answer the user\'s question. The entire reading must be in the requested language.',
  prompt: 'User Zodiac Sign: {{{zodiacSign}}}. User Question: "{{{question}}}". Language for response: {{{language}}}. Please provide the tarot reading now.',
});

const generateTarotReadingFlow = ai.defineFlow(
  {
    name: 'generateTarotReadingFlow',
    inputSchema: GenerateTarotReadingInputSchema,
    outputSchema: GenerateTarotReadingOutputSchema,
  },
  async (input) => {
    const { voice, zodiacSign, question, language } = input;
    
    const readingResponse = await tarotReadingPrompt({ zodiacSign, question, language });
    if (!readingResponse.output) {
      throw new Error('Failed to generate tarot reading.');
    }
    const { card1, card2, card3, tarotReading } = readingResponse.output;

    const [image1, image2, image3, audio] = await Promise.all([
      generateTarotCardImage({ cardName: card1 }),
      generateTarotCardImage({ cardName: card2 }),
      generateTarotCardImage({ cardName: card3 }),
      voice ? generateTarotReadingAudio({ text: tarotReading, voice }) : Promise.resolve(null),
    ]);

    return {
      cards: [
        { name: card1, image: image1.dataUri },
        { name: card2, image: image2.dataUri },
        { name: card3, image: image3.dataUri },
      ],
      tarotReading,
      audioDataUri: audio?.audioDataUri,
    };
  }
);
