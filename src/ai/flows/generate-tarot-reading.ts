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
import { generateTarotCardImage } from './generate-tarot-card-image';

const GenerateTarotReadingInputSchema = z.object({
  zodiacSign: z.string().describe('The zodiac sign of the user.'),
  question: z.string().describe('The question asked by the user.'),
  language: z.string().optional().describe('The language for the output, e.g., "en" for English.'),
});
export type GenerateTarotReadingInput = z.infer<typeof GenerateTarotReadingInputSchema>;

const TarotCardOutputSchema = z.object({
  name: z.string().describe('The name of the tarot card.'),
  image: z.string().describe("A data URI of a generated image for the tarot card. Expected format: 'data:image/png;base64,<encoded_data>'."),
});

const GenerateTarotReadingOutputSchema = z.object({
  cards: z.array(TarotCardOutputSchema).length(3).describe('The three tarot cards that were drawn.'),
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
  // In a real application, this would involve looking up the card's meaning
  // from a database or external source.
  switch (input.cardName) {
    // Major Arcana
    case 'The Fool':
      return 'The Fool represents new beginnings, innocence, spontaneity, and a free spirit.';
    case 'The Magician':
      return 'The Magician signifies manifestation, resourcefulness, power, and inspired action.';
    case 'The High Priestess':
      return 'The High Priestess embodies intuition, sacred knowledge, divine feminine, and the subconscious mind.';
    case 'The Empress':
      return 'The Empress represents femininity, beauty, nature, nurturing, and abundance.';
    case 'The Emperor':
      return 'The Emperor symbolizes authority, establishment, structure, and a father figure.';
    case 'The Hierophant':
      return 'The Hierophant represents spiritual wisdom, religious beliefs, conformity, tradition, and institutions.';
    case 'The Lovers':
      return 'The Lovers signify love, harmony, relationships, values alignment, and choices.';
    case 'The Chariot':
      return 'The Chariot represents control, willpower, success, action, and determination.';
    case 'Strength':
      return 'Strength symbolizes courage, persuasion, influence, and compassion.';
    case 'The Hermit':
      return 'The Hermit represents soul-searching, introspection, being alone, and inner guidance.';
    case 'Wheel of Fortune':
      return 'Wheel of Fortune signifies good luck, karma, life cycles, destiny, and a turning point.';
    case 'Justice':
      return 'Justice represents fairness, truth, cause and effect, and law.';
    case 'The Hanged Man':
      return 'The Hanged Man symbolizes pause, surrender, letting go, and new perspectives.';
    case 'Death':
      return 'Death represents endings, change, transformation, and transition.';
    case 'Temperance':
      return 'Temperance signifies balance, moderation, patience, and purpose.';
    case 'The Devil':
      return 'The Devil represents shadow self, attachment, addiction, restriction, and sexuality.';
    case 'The Tower':
      return 'The Tower symbolizes sudden change, upheaval, chaos, revelation, and awakening.';
    case 'The Star':
      return 'The Star represents hope, faith, purpose, renewal, and spirituality.';
    case 'The Moon':
      return 'The Moon signifies illusion, fear, anxiety, subconscious, and intuition.';
    case 'The Sun':
      return 'The Sun represents positivity, fun, warmth, success, and vitality.';
    case 'Judgement':
      return 'Judgement symbolizes rebirth, inner calling, and absolution.';
    case 'The World':
      return 'The World represents completion, integration, accomplishment, and travel.';

    // Suit of Wands
    case 'Ace of Wands':
      return 'Ace of Wands represents inspiration, new opportunities, growth, and potential.';
    case 'Two of Wands':
      return 'Two of Wands represents future planning, progress, decisions, and discovery.';
    case 'Three of Wands':
      return 'Three of Wands represents preparation, foresight, enterprise, and expansion.';
    case 'Four of Wands':
      return 'Four of Wands represents celebration, joy, harmony, relaxation, and homecoming.';
    case 'Five of Wands':
      return 'Five of Wands represents conflict, disagreements, competition, tension, and ambition.';
    case 'Six of Wands':
      return 'Six of Wands represents public recognition, victory, progress, and self-confidence.';
    case 'Seven of Wands':
      return 'Seven of Wands represents challenge, competition, perseverance, and maintaining control.';
    case 'Eight of Wands':
      return 'Eight of Wands represents speed, action, air travel, and movement.';
    case 'Nine of Wands':
      return 'Nine of Wands represents resilience, courage, persistence, and a final challenge.';
    case 'Ten of Wands':
      return 'Ten of Wands represents burden, extra responsibility, hard work, and completion.';
    case 'Page of Wands':
      return 'Page of Wands represents enthusiasm, exploration, discovery, and free spirit.';
    case 'Knight of Wands':
      return 'Knight of Wands represents energy, passion, inspired action, adventure, and impulsiveness.';
    case 'Queen of Wands':
      return 'Queen of Wands represents courage, confidence, independence, social butterfly, and determination.';
    case 'King of Wands':
      return 'King of Wands represents natural-born leader, vision, entrepreneur, and honour.';

    // Suit of Cups
    case 'Ace of Cups':
      return 'Ace of Cups represents love, new relationships, compassion, and creativity.';
    case 'Two of Cups':
      return 'Two of Cups represents unified love, partnership, and mutual attraction.';
    case 'Three of Cups':
      return 'Three of Cups represents celebration, friendship, creativity, and collaborations.';
    case 'Four of Cups':
      return 'Four of Cups represents meditation, contemplation, apathy, and re-evaluation.';
    case 'Five of Cups':
      return 'Five of Cups represents regret, failure, disappointment, and pessimism.';
    case 'Six of Cups':
      return 'Six of Cups represents revisiting the past, childhood memories, innocence, and joy.';
    case 'Seven of Cups':
      return 'Seven of Cups represents opportunities, choices, wishful thinking, and illusion.';
    case 'Eight of Cups':
      return 'Eight of Cups represents disappointment, abandonment, withdrawal, and escapism.';
    case 'Nine of Cups':
      return 'Nine of Cups represents contentment, satisfaction, gratitude, and wish come true.';
    case 'Ten of Cups':
      return 'Ten of Cups represents divine love, blissful relationships, harmony, and alignment.';
    case 'Page of Cups':
      return 'Page of Cups represents creative opportunities, intuitive messages, curiosity, and possibility.';
    case 'Knight of Cups':
      return 'Knight of Cups represents creativity, romance, charm, imagination, and beauty.';
    case 'Queen of Cups':
      return 'Queen of Cups represents compassionate, caring, emotionally stable, intuitive, and in flow.';
    case 'King of Cups':
      return 'King of Cups represents emotionally balanced, compassionate, and diplomatic.';

    // Suit of Swords
    case 'Ace of Swords':
      return 'Ace of Swords represents breakthroughs, new ideas, mental clarity, and success.';
    case 'Two of Swords':
      return 'Two of Swords represents difficult decisions, weighing up options, an impasse, and avoidance.';
    case 'Three of Swords':
      return 'Three of Swords represents heartbreak, emotional pain, sorrow, grief, and hurt.';
    case 'Four of Swords':
      return 'Four of Swords represents rest, relaxation, meditation, contemplation, and recuperation.';
    case 'Five of Swords':
      return 'Five of Swords represents conflict, tension, loss, and defeat.';
    case 'Six of Swords':
      return 'Six of Swords represents transition, change, rite of passage, and releasing baggage.';
    case 'Seven of Swords':
      return 'Seven of Swords represents betrayal, deception, getting away with something, and acting strategically.';
    case 'Eight of Swords':
      return 'Eight of Swords represents negative thoughts, self-imposed restriction, imprisonment, and victim mentality.';
    case 'Nine of Swords':
      return 'Nine of Swords represents anxiety, worry, fear, depression, and nightmares.';
    case 'Ten of Swords':
      return 'Ten of Swords represents painful endings, deep wounds, betrayal, and loss.';
    case 'Page of Swords':
      return 'Page of Swords represents new ideas, curiosity, thirst for knowledge, and new ways of communicating.';
    case 'Knight of Swords':
      return 'Knight of Swords represents ambitious, action-oriented, fast-thinking, and driven to succeed.';
    case 'Queen of Swords':
      return 'Queen of Swords represents independent, unbiased judgement, clear boundaries, and direct communication.';
    case 'King of Swords':
      return 'King of Swords represents mental clarity, intellectual power, authority, and truth.';

    // Suit of Pentacles
    case 'Ace of Pentacles':
      return 'Ace of Pentacles represents a new opportunity, manifestation, and prosperity.';
    case 'Two of Pentacles':
      return 'Two of Pentacles represents multiple priorities, time management, and adaptability.';
    case 'Three of Pentacles':
      return 'Three of Pentacles represents teamwork, collaboration, and implementation.';
    case 'Four of Pentacles':
      return 'Four of Pentacles represents saving money, security, and control.';
    case 'Five of Pentacles':
      return 'Five of Pentacles represents financial loss, poverty, and isolation.';
    case 'Six of Pentacles':
      return 'Six of Pentacles represents giving, receiving, sharing wealth, and charity.';
    case 'Seven of Pentacles':
      return 'Seven of Pentacles represents long-term view, sustainable results, and perseverance.';
    case 'Eight of Pentacles':
      return 'Eight of Pentacles represents apprenticeship, repetitive tasks, and mastery.';
    case 'Nine of Pentacles':
      return 'Nine of Pentacles represents abundance, luxury, self-sufficiency, and financial independence.';
    case 'Ten of Pentacles':
      return 'Ten of Pentacles represents wealth, financial security, family, and a long-term inheritance.';
    case 'Page of Pentacles':
      return 'Page of Pentacles represents new opportunities, manifestation, and financial opportunity.';
    case 'Knight of Pentacles':
      return 'Knight of Pentacles represents hard work, productivity, routine, and conservatism.';
    case 'Queen of Pentacles':
      return 'Queen of Pentacles represents nurturing, practical, and providing financially.';
    case 'King of Pentacles':
      return 'King of Pentacles represents wealth, business, leadership, and security.';

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
  output: {schema: z.object({
    card1: z.string().describe('The name of the first tarot card.'),
    card2: z.string().describe('The name of the second tarot card.'),
    card3: z.string().describe('The name of the third tarot card.'),
    tarotReading: z.string().describe('The generated tarot reading in Serbian.'),
  })},
  tools: [tarotCardInterpretationTool],
  prompt: `You are a tarot reader. A user with the zodiac sign {{{zodiacSign}}} asked the following question: {{{question}}}. Draw three random tarot cards from the full 78-card deck, making sure to set the card1, card2, and card3 output fields with the names of the cards you have drawn. Then use the tarotCardInterpretation tool to determine the meaning of each card.

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
    let { card1, card2, card3, tarotReading } = readingResponse.output;

    // Step 2: Translate if a different language is requested and it's not Serbian
    if (language && !language.toLowerCase().startsWith('sr')) {
      const translateResponse = await translatePrompt({ text: tarotReading, language });
      if (translateResponse.output) {
        tarotReading = translateResponse.output.translatedText;
      }
    }
    
    // Step 3: Generate images for the cards in parallel
    const [image1, image2, image3] = await Promise.all([
      generateTarotCardImage({ cardName: card1 }),
      generateTarotCardImage({ cardName: card2 }),
      generateTarotCardImage({ cardName: card3 }),
    ]);

    return {
      cards: [
        { name: card1, image: image1.dataUri },
        { name: card2, image: image2.dataUri },
        { name: card3, image: image3.dataUri },
      ],
      tarotReading,
    };
  }
);
