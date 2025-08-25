import { z } from 'zod';

export const VoiceEnum = z.enum(['Algenib', 'Achernar']);
export type Voice = z.infer<typeof VoiceEnum>;
