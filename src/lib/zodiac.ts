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

export type ZodiacSign = (typeof ZODIAC_SIGNS_SR)[number];
