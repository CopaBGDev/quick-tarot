'use server';
/**
 * @fileOverview A flow for translating UI text elements using an AI model.
 *
 * - translateUI - A function that handles the UI translation process.
 * - TranslateUIInput - The input type for the translateUI function.
 * - TranslateUIOutput - The return type for the translateUI function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { TranslatableTextsSchema, TranslateUIInputSchema } from '@/ai/schemas';


export type TranslateUIOutput = z.infer<typeof TranslatableTextsSchema>;
export type TranslateUIInput = z.infer<typeof TranslateUIInputSchema>;


export async function translateUI(input: TranslateUIInput): Promise<TranslateUIOutput> {
  return translateUiFlow(input);
}


const translationPrompt = ai.definePrompt({
  name: 'translationPrompt',
  input: { schema: TranslateUIInputSchema },
  output: { schema: TranslatableTextsSchema },

  prompt: `Translate the JSON object of UI texts provided in the 'texts' field into the specified 'language'.
  
Your response must be a valid JSON object with the exact same structure and keys as the input 'texts' object. Only translate the string values. Do not translate or alter the keys.

Target Language: {{{language}}}

JSON to translate:
\`\`\`json
{{{jsonEncode texts}}}
\`\`\`
`,
});


const translateUiFlow = ai.defineFlow(
  {
    name: 'translateUiFlow',
    inputSchema: TranslateUIInputSchema,
    outputSchema: TranslatableTextsSchema,
  },
  async (input) => {
    const { output } = await translationPrompt(input);
    if (!output) {
      throw new Error('AI failed to return a valid translation.');
    }
    return output;
  }
);
