import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {config} from 'dotenv';

config();

if (!process.env.GEMINI_API_KEY) {
  console.error(
    'FATAL_ERROR: GEMINI_API_KEY is not defined in .env file. Please create a .env file in the root of the project and add the following line: GEMINI_API_KEY="YOUR_API_KEY"'
  );
  process.exit(1);
}

export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.0-flash',
});
