
import { ZODIAC_ICONS_COMPONENTS } from './zodiac-signs';

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
  Ovan: ZODIAC_ICONS_COMPONENTS.AriesIcon,
  Aries: ZODIAC_ICONS_COMPONENTS.AriesIcon,
  Bik: ZODIAC_ICONS_COMPONENTS.TaurusIcon,
  Taurus: ZODIAC_ICONS_COMPONENTS.TaurusIcon,
  Blizanci: ZODIAC_ICONS_COMPONENTS.GeminiIcon,
  Gemini: ZODIAC_ICONS_COMPONENTS.GeminiIcon,
  Rak: ZODIAC_ICONS_COMPONENTS.CancerIcon,
  Cancer: ZODIAC_ICONS_COMPONENTS.CancerIcon,
  Lav: ZODIAC_ICONS_COMPONENTS.LeoIcon,
  Leo: ZODIAC_ICONS_COMPONENTS.LeoIcon,
  Devica: ZODIAC_ICONS_COMPONENTS.VirgoIcon,
  Virgo: ZODIAC_ICONS_COMPONENTS.VirgoIcon,
  Vaga: ZODIAC_ICONS_COMPONENTS.LibraIcon,
  Libra: ZODIAC_ICONS_COMPONENTS.LibraIcon,
  Škorpija: ZODIAC_ICONS_COMPONENTS.ScorpioIcon,
  Scorpio: ZODIAC_ICONS_COMPONENTS.ScorpioIcon,
  Strelac: ZODIAC_ICONS_COMPONENTS.SagittariusIcon,
  Sagittarius: ZODIAC_ICONS_COMPONENTS.SagittariusIcon,
  Jarac: ZODIAC_ICONS_COMPONENTS.CapricornIcon,
  Capricorn: ZODIAC_ICONS_COMPONENTS.CapricornIcon,
  Vodolija: ZODIAC_ICONS_COMPONENTS.AquariusIcon,
  Aquarius: ZODIAC_ICONS_COMPONENTS.AquariusIcon,
  Ribe: ZODIAC_ICONS_COMPONENTS.PiscesIcon,
  Pisces: ZODIAC_ICONS_COMPONENTS.PiscesIcon,
};


export type ZodiacSign = (typeof ZODIAC_SIGNS_SR)[number] | (typeof ZODIAC_SIGNS_EN)[number];
