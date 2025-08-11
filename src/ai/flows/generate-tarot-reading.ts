// This is a server-side file.
'use server';

/**
 * @fileOverview Generates a tarot reading based on the user's zodiac sign and question, and translates it to the user's language.
 *
 * - generateTarotReading - A function that generates a tarot reading.
 * - GenerateTarotReadingInput - The input type for the generateTarotReading function.
 * - GenerateTarotReadingOutput - The return type for the generateTarotReading function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTarotReadingInputSchema = z.object({
  zodiacSign: z.string().describe('The zodiac sign of the user.'),
  question: z.string().describe('The question asked by the user.'),
  language: z.string().optional().describe('The language for the output, e.g., "en" for English.'),
});
export type GenerateTarotReadingInput = z.infer<typeof GenerateTarotReadingInputSchema>;

const GenerateTarotReadingOutputSchema = z.object({
  card1: z.string().describe('The name of the first tarot card.'),
  card2: z.string().describe('The name of the second tarot card.'),
  card3: z.string().describe('The name of the third tarot card.'),
  tarotReading: z.string().describe('The generated tarot reading in the requested language.'),
});
export type GenerateTarotReadingOutput = z.infer<typeof GenerateTarotReadingOutputSchema>;

export async function generateTarotReading(input: GenerateTarotReadingInput): Promise<GenerateTarotReadingOutput> {
  return generateTarotReadingFlow(input);
}

const tarotCardInterpretationTool = ai.defineTool({
  name: 'tarotCardInterpretation',
  description: 'This tool interprets the meaning of a given tarot card based on traditional tarot symbolism.',
  inputSchema: z.object({
    cardName: z.string().describe('The name of the tarot card to interpret.'),
  }),
  outputSchema: z.string().describe('The interpretation of the tarot card.'),
}, async (input) => {
  // Placeholder implementation for tarot card interpretation.
  // In a real application, this would involve looking up the card's meaning
  // from a database or external source.
  switch (input.cardName) {
    case 'The Fool':
      return 'The Fool represents new beginnings, innocence, and a leap of faith.';
    case 'The Magician':
      return 'The Magician signifies skill, resourcefulness, and manifestation.';
    case 'The High Priestess':
      return 'The High Priestess embodies intuition, mystery, and the subconscious.';
    default:
      return `Interpretation for ${input.cardName} not available.`;
  }
});

const generateReadingPrompt = ai.definePrompt({
  name: 'generateTarotReadingPrompt',
  input: {schema: z.object({
    zodiacSign: z.string(),
    question: z.string(),
  })},
  output: {schema: GenerateTarotReadingOutputSchema},
  tools: [tarotCardInterpretationTool],
  prompt: `You are a tarot reader. A user with the zodiac sign {{{zodiacSign}}} asked the following question: {{{question}}}. Draw three random tarot cards, making sure to set the card1, card2, and card3 output fields with the names of the cards you have drawn. Then use the tarotCardInterpretation tool to determine the meaning of each card.

  Craft a short story in Serbian that uses these interpretations to answer the user's question. The story should provide guidance and insight related to the user's question.
  `,
});


const translatePrompt = ai.definePrompt({
    name: 'translateTextPrompt',
    input: { schema: z.object({ text: z.string(), language: z.string() }) },
    output: { schema: z.object({ translatedText: z.string() }) },
    prompt: `Translate the following text to {{{language}}}.

Text:
{{{text}}}
`,
});


const generateTarotReadingFlow = ai.defineFlow(
  {
    name: 'generateTarotReadingFlow',
    inputSchema: GenerateTarotReadingInputSchema,
    outputSchema: GenerateTarotReadingOutputSchema,
  },
  async (input) => {
    const { zodiacSign, question, language } = input;
    
    // Step 1: Generate the tarot reading in the default language (Serbian)
    const readingResponse = await generateReadingPrompt({zodiacSign, question});
    if (!readingResponse.output) {
      throw new Error('Failed to generate tarot reading.');
    }
    let readingOutput = readingResponse.output;

    // Step 2: Translate if a different language is requested and it's not Serbian
    if (language && !language.toLowerCase().startsWith('sr')) {
      const translateResponse = await translatePrompt({ text: readingOutput.tarotReading, language });
      if (translateResponse.output) {
        readingOutput.tarotReading = translateResponse.output.translatedText;
      }
    }
    
    return readingOutput;
  }
);
