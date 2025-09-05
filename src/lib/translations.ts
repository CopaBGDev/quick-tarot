
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
    about: string;
  };
   aboutDialog: {
    title: string;
    content: string;
  };
  zodiacSigns: readonly ZodiacSign[];
  errorTitle: string;
  unknownError: string;
  countdownText: string;
  countdownFinishedText: string;
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
    loading: "Karte se mešaju...",
  },
  results: {
    title: "Vaše Karte Sudbine",
    readingTitle: "Vaše Tarot Čitanje",
    loadingText: "Karte se mešaju, vaša sudbina se otkriva...",
  },
  footer: {
    copyright: "Sva prava zadržana.",
    about: "O nama",
  },
  aboutDialog: {
    title: "O Quick Tarot Aplikaciji",
    content: "Dobrodošli u Quick Tarot, vaš digitalni prozor u svet tarot karata. Naša misija je da pružimo intuitivno i personalizovano iskustvo tarota dostupno svima, bilo gde i bilo kada.\n\nKoristeći moć veštačke inteligencije, naša aplikacija generiše jedinstvena i pronicljiva tarot čitanja. Svako čitanje je zasnovano na kartama koje su nasumično izvučene specijalno za vas i vaše pitanje, obezbeđujući da dobijete poruku koja je namenjena vama.\n\nVerujemo da tarot nije samo predviđanje budućnosti, već alat za samorefleksiju i dublje razumevanje sadašnjosti. Bilo da tražite odgovore, inspiraciju ili jednostavno želite da istražite svoju intuiciju, Quick Tarot je tu da vas vodi.\n\nHvala vam što ste deo našeg putovanja.",
  },
  zodiacSigns: ZODIAC_SIGNS_SR,
  errorTitle: "Greška",
  unknownError: "Došlo je do nepoznate greške.",
  countdownText: "Novo čitanje:",
  countdownFinishedText: "Spremno za novo čitanje",
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
    loading: "Shuffling the cards...",
  },
  results: {
    title: "Your Cards of Fate",
    readingTitle: "Your Tarot Reading",
    loadingText: "The cards are being shuffled, your fate is being revealed...",
  },
  footer: {
    copyright: "All rights reserved.",
    about: "About Us",
  },
  aboutDialog: {
    title: "About The Quick Tarot App",
    content: "Welcome to Quick Tarot, your digital window into the world of tarot cards. Our mission is to provide an intuitive and personalized tarot experience accessible to everyone, anywhere, anytime.\n\nUsing the power of artificial intelligence, our application generates unique and insightful tarot readings. Each reading is based on cards randomly drawn especially for you and your question, ensuring you receive a message that is meant for you.\n\nWe believe that tarot is not just about predicting the future, but a tool for self-reflection and a deeper understanding of the present. Whether you are looking for answers, inspiration, or simply want to explore your intuition, Quick Tarot is here to guide you.\n\nThank you for being part of our journey.",
  },
  zodiacSigns: ZODIAC_SIGNS_EN,
  errorTitle: "Error",
  unknownError: "An unknown error occurred.",
  countdownText: "Next reading:",
  countdownFinishedText: "Ready for a new reading",
};

const translations: Record<string, Translations> = {
  sr,
  en,
};

export function getTranslations(lang: string): Translations {
  return translations[lang] || translations.sr;
}
