import { ZODIAC_SIGNS_SR, ZODIAC_SIGNS_EN, ZodiacSign } from "./zodiac";

export interface Translations {
  header: {
    title: string;
    subtitle: string;
  };
  form: {
    zodiac: {
      label: string;
      placeholder: string;
      error: string;
    };
    question: {
      label: string;
      placeholder: string;
      minLengthError: string;
      maxLengthError: string;
    };
  };
  button: {
    default: string;
    loading: string;
  };
  results: {
    title: string;
    readingTitle: string;
    loadingText: string;
  };
  footer: {
    copyright: string;
  };
  zodiacSigns: readonly ZodiacSign[];
  errorTitle: string;
  unknownError: string;
}

const sr: Translations = {
  header: {
    title: "Quick Tarot",
    subtitle: "Otkrijte šta vam zvezde i karte poručuju. Unesite svoj znak i pitanje da dobijete vaše personalizovano tarot čitanje.",
  },
  form: {
    zodiac: {
      label: "Vaš Znak",
      placeholder: "Izaberite znak...",
      error: "Morate izabrati validan horoskopski znak.",
    },
    question: {
      label: "Vaše pitanje za karte",
      placeholder: "Šta vas muči ili zanima?",
      minLengthError: "Pitanje mora imati najmanje 10 karaktera.",
      maxLengthError: "Pitanje ne može biti duže od 200 karaktera.",
    },
  },
  button: {
    default: "Šta kažu karte?",
    loading: "Generišem...",
  },
  results: {
    title: "Vaše Karte Sudbine",
    readingTitle: "Vaše Tarot Čitanje",
    loadingText: "Karte se mešaju, vaša sudbina se otkriva...",
  },
  footer: {
    copyright: "© {year} Quick Tarot. Sva prava zadržana.",
  },
  zodiacSigns: ZODIAC_SIGNS_SR,
  errorTitle: "Greška",
  unknownError: "Došlo je do nepoznate greške.",
};

const en: Translations = {
  header: {
    title: "Quick Tarot",
    subtitle: "Discover what the stars and cards have in store for you. Enter your sign and question to get your personalized tarot reading.",
  },
  form: {
    zodiac: {
      label: "Your Sign",
      placeholder: "Select a sign...",
      error: "You must select a valid zodiac sign.",
    },
    question: {
      label: "Your question for the cards",
      placeholder: "What is troubling or interesting you?",
      minLengthError: "Question must be at least 10 characters.",
      maxLengthError: "Question cannot be longer than 200 characters.",
    },
  },
  button: {
    default: "What do the cards say?",
    loading: "Generating...",
  },
  results: {
    title: "Your Cards of Fate",
    readingTitle: "Your Tarot Reading",
    loadingText: "The cards are being shuffled, your fate is being revealed...",
  },
  footer: {
    copyright: "© {year} Quick Tarot. All rights reserved.",
  },
  zodiacSigns: ZODIAC_SIGNS_EN,
  errorTitle: "Error",
  unknownError: "An unknown error occurred.",
};

const translations: Record<string, Translations> = {
  sr,
  en,
};

export function getTranslations(lang: string): Translations {
  return translations[lang] || translations.sr;
}
