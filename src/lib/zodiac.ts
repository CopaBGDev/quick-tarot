import { Circle, Scale, Fish, Users, Orbit, Crown, Wheat, ArrowUpRight, Mountain, Droplets, Shell } from "lucide-react";

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
  Blizanci: Users, // Gemini
  Gemini: Users,
  Rak: Orbit, // Cancer (moon)
  Cancer: Orbit,
  Lav: Crown, // Leo
  Leo: Crown,
  Devica: Wheat, // Virgo
  Virgo: Wheat,
  Vaga: Scale, // Libra
  Libra: Scale,
  Škorpija: Shell, // Scorpio
  Scorpio: Shell,
  Strelac: ArrowUpRight, // Sagittarius
  Sagittarius: ArrowUpRight,
  Jarac: Mountain, // Capricorn
  Capricorn: Mountain,
  Vodolija: Droplets, // Aquarius
  Aquarius: Droplets,
  Ribe: Fish, // Pisces
  Pisces: Fish,
};


export type ZodiacSign = (typeof ZODIAC_SIGNS_SR)[number] | (typeof ZODIAC_SIGNS_EN)[number];
