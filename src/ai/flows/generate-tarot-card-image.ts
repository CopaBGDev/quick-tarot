// This is a server-side file.
'use server';

/**
 * @fileOverview Generates an image for a given tarot card.
 *
 * - generateTarotCardImage - A function that generates a tarot card image.
 * - GenerateTarotCardImageInput - The input type for the generateTarotCardImage function.
 * - GenerateTarotCardImageOutput - The return type for the generateTarotCardImage function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateTarotCardImageInputSchema = z.object({
  cardName: z.string().describe('The name of the tarot card.'),
});
export type GenerateTarotCardImageInput = z.infer<typeof GenerateTarotCardImageInputSchema>;

const GenerateTarotCardImageOutputSchema = z.object({
  dataUri: z.string().describe("A data URI of a generated image for the tarot card. Expected format: 'data:image/png;base64,<encoded_data>'."),
});
export type GenerateTarotCardImageOutput = z.infer<typeof GenerateTarotCardImageOutputSchema>;

export async function generateTarotCardImage(input: GenerateTarotCardImageInput): Promise<GenerateTarotCardImageOutput> {
  return generateTarotCardImageFlow(input);
}

const imageGenPrompt = ai.definePrompt({
    name: 'tarotImageGenPrompt',
    input: { schema: GenerateTarotCardImageInputSchema },
    prompt: `Generate an artistic, tarot card-style image for the card named '{{{cardName}}}'. The style should be mystical, elegant, and evocative of traditional tarot card art, but with a unique modern twist.`,
    config: {
        responseModalities: ['TEXT', 'IMAGE'],
    },
    output: {
        schema: z.object({
            image: z.string().describe('the generated image'),
        })
    }
});


const generateTarotCardImageFlow = ai.defineFlow(
  {
    name: 'generateTarotCardImageFlow',
    inputSchema: GenerateTarotCardImageInputSchema,
    outputSchema: GenerateTarotCardImageOutputSchema,
  },
  async (input) => {
    const { media } = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: `Generate an artistic, tarot card-style image for the card named '${input.cardName}'. The style should be mystical, elegant, and evocative of traditional tarot card art, but with a unique modern twist.`,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });
    
    if (!media || !media.url) {
        throw new Error('Failed to generate card image.');
    }

    return { dataUri: media.url };
  }
);
