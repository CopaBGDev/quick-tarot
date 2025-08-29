import { Circle, Scale, Fish } from "lucide-react";

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

export const ZODIAC_ICONS = {
  Ovan: Circle, // Aries
  Aries: Circle,
  Bik: Circle, // Taurus
  Taurus: Circle,
  Blizanci: Circle, // Gemini
  Gemini: Circle,
  Rak: Circle, // Cancer
  Cancer: Circle,
  Lav: Circle, // Leo
  Leo: Circle,
  Devica: Circle, // Virgo
  Virgo: Circle,
  Vaga: Scale, // Libra
  Libra: Scale,
  Škorpija: Circle, // Scorpio
  Scorpio: Circle,
  Strelac: Circle, // Sagittarius
  Sagittarius: Circle,
  Jarac: Circle, // Capricorn
  Capricorn: Circle,
  Vodolija: Circle, // Aquarius
  Aquarius: Circle,
  Ribe: Fish, // Pisces
  Pisces: Fish,
};


export type ZodiacSign = (typeof ZODIAC_SIGNS_SR)[number] | (typeof ZODIAC_SIGNS_EN)[number];
