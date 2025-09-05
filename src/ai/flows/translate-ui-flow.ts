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

  prompt: `You are a powerful translation engine. Translate the following UI texts into the target language: {{{language}}}.
Return a valid JSON object with the translated values. Do not translate the JSON keys.

"headerSubtitle": "{{{texts.headerSubtitle}}}"
"formZodiacLabel": "{{{texts.formZodiacLabel}}}"
"formZodiacPlaceholder": "{{{texts.formZodiacPlaceholder}}}"
"formZodiacError": "{{{texts.formZodiacError}}}"
"formQuestionLabel": "{{{texts.formQuestionLabel}}}"
"formQuestionPlaceholder": "{{{texts.formQuestionPlaceholder}}}"
"buttonDefault": "{{{texts.buttonDefault}}}"
"buttonLoading": "{{{texts.buttonLoading}}}"
"resultsTitle": "{{{texts.resultsTitle}}}"
"resultsReadingTitle": "{{{texts.resultsReadingTitle}}}"
"resultsLoadingText": "{{{texts.resultsLoadingText}}}"
"footerCopyright": "{{{texts.footerCopyright}}}"
"footerAbout": "{{{texts.footerAbout}}}"
"footerMission": "{{{texts.footerMission}}}"
"footerFaq": "{{{texts.footerFaq}}}"
"footerTerms": "{{{texts.footerTerms}}}"
"footerPrivacy": "{{{texts.footerPrivacy}}}"
"aboutDialogTitle": "{{{texts.aboutDialogTitle}}}"
"aboutDialogContent": "{{{texts.aboutDialogContent}}}"
"missionDialogTitle": "{{{texts.missionDialogTitle}}}"
"missionDialogContent": "{{{texts.missionDialogContent}}}"
"faqDialogTitle": "{{{texts.faqDialogTitle}}}"
"faqDialogContent": "{{{texts.faqDialogContent}}}"
"termsDialogTitle": "{{{texts.termsDialogTitle}}}"
"termsDialogContent": "{{{texts.termsDialogContent}}}"
"privacyDialogTitle": "{{{texts.privacyDialogTitle}}}"
"privacyDialogContent": "{{{texts.privacyDialogContent}}}"
"errorTitle": "{{{texts.errorTitle}}}"
"unknownError": "{{{texts.unknownError}}}"
"countdownFinishedText": "{{{texts.countdownFinishedText}}}"
"zodiacSignAries": "{{{texts.zodiacSignAries}}}"
"zodiacSignTaurus": "{{{texts.zodiacSignTaurus}}}"
"zodiacSignGemini": "{{{texts.zodiacSignGemini}}}"
"zodiacSignCancer": "{{{texts.zodiacSignCancer}}}"
"zodiacSignLeo": "{{{texts.zodiacSignLeo}}}"
"zodiacSignVirgo": "{{{texts.zodiacSignVirgo}}}"
"zodiacSignLibra": "{{{texts.zodiacSignLibra}}}"
"zodiacSignScorpio": "{{{texts.zodiacSignScorpio}}}"
"zodiacSignSagittarius": "{{{texts.zodiacSignSagittarius}}}"
"zodiacSignCapricorn": "{{{texts.zodiacSignCapricorn}}}"
"zodiacSignAquarius": "{{{texts.zodiacSignAquarius}}}"
"zodiacSignPisces": "{{{texts.zodiacSignPisces}}}"
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
