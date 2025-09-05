/**
 * @fileOverview Defines shared Zod schemas used across different AI flows and server actions.
 * This file does not contain any server-side logic and can be safely imported into client or server components.
 */

import { z } from 'zod';

// This is the structure of the UI texts we want to translate.
// It must be flat for the AI to handle it reliably.
export const TranslatableTextsSchema = z.object({
  headerTitle: z.string(),
  headerSubtitle: z.string(),
  formZodiacLabel: z.string(),
  formZodiacPlaceholder: z.string(),
  formZodiacError: z.string(),
  formQuestionLabel: z.string(),
  formQuestionPlaceholder: z.string(),
  buttonDefault: z.string(),
  buttonLoading: z.string(),
  resultsTitle: z.string(),
  resultsReadingTitle: z.string(),
  resultsLoadingText: z.string(),
  footerCopyright: z.string(),
  footerAbout: z.string(),
  footerMission: z.string(),
  footerFaq: z.string(),
  footerTerms: z.string(),
  footerPrivacy: z.string(),
  aboutDialogTitle: z.string(),
  aboutDialogContent: z.string(),
  missionDialogTitle: z.string(),
  missionDialogContent: z.string(),
  faqDialogTitle: z.string(),
  faqDialogContent: z.string(),
  termsDialogTitle: z.string(),
  termsDialogContent: z.string(),
  privacyDialogTitle: z.string(),
  privacyDialogContent: z.string(),
  errorTitle: z.string(),
  unknownError: z.string(),
  countdownFinishedText: z.string(),
  zodiacSignAries: z.string(),
  zodiacSignTaurus: z.string(),
  zodiacSignGemini: z.string(),
  zodiacSignCancer: z.string(),
  zodiacSignLeo: z.string(),
  zodiacSignVirgo: z.string(),
  zodiacSignLibra: z.string(),
  zodiacSignScorpio: z.string(),
  zodiacSignSagittarius: z.string(),
  zodiacSignCapricorn: z.string(),
  zodiacSignAquarius: z.string(),
  zodiacSignPisces: z.string(),
});

export const TranslateUIInputSchema = z.object({
  texts: TranslatableTextsSchema,
  language: z
    .string()
    .describe('The target language to translate the UI texts into, e.g., "Serbian", "Norwegian", "Spanish".'),
});
