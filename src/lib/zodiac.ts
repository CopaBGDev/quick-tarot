
export const ZODIAC_SIGNS_SR = [
  "Ovan",
  "Bik",
  "Blizanci",
  "Rak",
  "Lav",
  "Devica",
  "Vaga",
  "Škorpija",
  "Strelac",
  "Jarac",
  "Vodolija",
  "Ribe",
] as const;

export const ZODIAC_SIGNS_EN = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
] as const;

export type ZodiacSign = (typeof ZODIAC_SIGNS_SR)[number] | (typeof ZODIAC_SIGNS_EN)[number];
