// This is a server-side file.
'use server';

/**
 * @fileOverview Converts text to speech.
 *
 * - generateTarotReadingAudio - A function that handles the text-to-speech conversion.
 * - GenerateTarotReadingAudioInput - The input type for the generateTarotReadingAudio function.
 * - GenerateTarotReadingAudioOutput - The return type for the generateTarotReadingAudio function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import wav from 'wav';
import { Voice, VoiceEnum } from './types';

const GenerateTarotReadingAudioInputSchema = z.object({
    text: z.string().describe('The text to be converted to speech.'),
    voice: VoiceEnum.default('Algenib').describe('The voice to use for the text-to-speech conversion.'),
});
export type GenerateTarotReadingAudioInput = z.infer<typeof GenerateTarotReadingAudioInputSchema>;

const GenerateTarotReadingAudioOutputSchema = z.object({
  audioDataUri: z.string().describe("A data URI of the generated audio. Expected format: 'data:audio/wav;base64,<encoded_data>'."),
});
export type GenerateTarotReadingAudioOutput = z.infer<typeof GenerateTarotReadingAudioOutputSchema>;

export async function generateTarotReadingAudio(input: GenerateTarotReadingAudioInput): Promise<GenerateTarotReadingAudioOutput> {
  return generateTarotReadingAudioFlow(input);
}

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    let bufs = [] as any[];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}

const generateTarotReadingAudioFlow = ai.defineFlow(
  {
    name: 'generateTarotReadingAudioFlow',
    inputSchema: GenerateTarotReadingAudioInputSchema,
    outputSchema: GenerateTarotReadingAudioOutputSchema,
  },
  async ({ text, voice }) => {
    const { media } = await ai.generate({
      model: 'googleai/gemini-2.5-flash-preview-tts',
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voice },
          },
        },
      },
      prompt: text,
    });
    
    if (!media || !media.url) {
        throw new Error('Failed to generate audio.');
    }
    
    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );
    
    const wavBase64 = await toWav(audioBuffer);

    return { audioDataUri: `data:audio/wav;base64,${wavBase64}` };
  }
);
