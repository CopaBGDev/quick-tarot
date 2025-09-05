
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
    title:string;
    readingTitle: string;
    loadingText: string;
  };
  footer: {
    copyright: string;
    about: string;
    mission: string;
    faq: string;
    terms: string;
  };
   aboutDialog: {
    title: string;
    content: string;
  };
  missionDialog: {
    title: string;
    content: string;
  };
  faqDialog: {
    title: string;
    content: string;
  };
  termsDialog: {
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
    mission: "Naša misija",
    faq: "Česta pitanja",
    terms: "Uslovi korišćenja",
  },
  aboutDialog: {
    title: "O Quick Tarot Aplikaciji",
    content: "Dobrodošli u Quick Tarot, vaš digitalni prozor u svet tarot karata. Naša misija je da pružimo intuitivno i personalizovano iskustvo tarota dostupno svima, bilo gde i bilo kada.\n\nKoristeći moć veštačke inteligencije, naša aplikacija generiše jedinstvena i pronicljiva tarot čitanja. Svako čitanje je zasnovano na kartama koje su nasumično izvučene specijalno za vas i vaše pitanje, obezbeđujući da dobijete poruku koja je namenjena vama.\n\nVerujemo da tarot nije samo predviđanje budućnosti, već alat za samorefleksiju i dublje razumevanje sadašnjosti. Bilo da tražite odgovore, inspiraciju ili jednostavno želite da istražite svoju intuiciju, Quick Tarot je tu da vas vodi.\n\nHvala vam što ste deo našeg putovanja.",
  },
  missionDialog: {
    title: "Naša Misija",
    content: "Naša misija je da demistifikujemo tarot i učinimo ga dostupnim alatom za lični rast i introspekciju. Kroz spoj drevne mudrosti i moderne tehnologije, želimo da osnažimo pojedince da pronađu jasnoću, donose bolje odluke i razumeju dublje tokove svojih života.\n\nTežimo da stvorimo siguran i podržavajući prostor gde svako može istražiti svoju intuiciju bez predrasuda."
  },
  faqDialog: {
    title: "Često Postavljana Pitanja",
    content: "P: Da li su čitanja zaista nasumična?\nO: Apsolutno. Za svako novo pitanje, naš sistem nasumično bira tri karte iz punog špila od 78 karata, garantujući jedinstveno i nepristrasno čitanje svaki put.\n\nP: Koliko često mogu da postavim pitanje?\nO: Da bismo osigurali kvalitet i smislenost svakog čitanja, uveli smo vremensko ograničenje. Možete zatražiti novo čitanje svaka dva minuta.\n\nP: Da li je ovo pravo proricanje sudbine?\nO: Mi vidimo tarot kao vodič i alat za samorefleksiju, a ne kao konkretno predviđanje budućnosti. Karte vam mogu pomoći da sagledate situaciju iz nove perspektive i donesete odluke koje su u skladu sa vašim unutrašnjim bićem."
  },
   termsDialog: {
    title: "Uslovi Korišćenja",
    content: "Pristupanjem i korišćenjem Quick Tarot aplikacije, slažete se sa sledećim uslovima:\n\n1. Usluga se pruža 'kao što jeste'. Čitanja su generisana od strane veštačke inteligencije i služe isključivo u zabavne i introspektivne svrhe. Ne treba ih smatrati profesionalnim, pravnim, medicinskim ili finansijskim savetom.\n\n2. Ne preuzimamo odgovornost za odluke koje donesete na osnovu informacija dobijenih putem naše aplikacije.\n\n3. Zadržavamo pravo da izmenimo ili prekinemo uslugu u bilo kom trenutku bez prethodne najave.\n\n4. Prikupljamo minimalne podatke neophodne za funkcionisanje aplikacije, kao što je opisano u našoj politici privatnosti."
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
    mission: "Our Mission",
    faq: "FAQ",
    terms: "Terms of Use",
  },
  aboutDialog: {
    title: "About The Quick Tarot App",
    content: "Welcome to Quick Tarot, your digital window into the world of tarot cards. Our mission is to provide an intuitive and personalized tarot experience accessible to everyone, anywhere, anytime.\n\nUsing the power of artificial intelligence, our application generates unique and insightful tarot readings. Each reading is based on cards randomly drawn especially for you and your question, ensuring you receive a message that is meant for you.\n\nWe believe that tarot is not just about predicting the future, but a tool for self-reflection and a deeper understanding of the present. Whether you are looking for answers, inspiration, or simply want to explore your intuition, Quick Tarot is here to guide you.\n\nThank you for being part of our journey.",
  },
  missionDialog: {
    title: "Our Mission",
    content: "Our mission is to demystify tarot and make it an accessible tool for personal growth and introspection. Through the fusion of ancient wisdom and modern technology, we aim to empower individuals to find clarity, make better decisions, and understand the deeper currents of their lives.\n\nWe strive to create a safe and supportive space where everyone can explore their intuition without prejudice."
  },
  faqDialog: {
    title: "Frequently Asked Questions",
    content: "Q: Are the readings truly random?\nA: Absolutely. For each new question, our system randomly selects three cards from a full 78-card deck, guaranteeing a unique and unbiased reading every time.\n\nQ: How often can I ask a question?\nA: To ensure the quality and meaningfulness of each reading, we have implemented a time limit. You can request a new reading every two minutes.\n\nQ: Is this real fortune-telling?\nA: We see tarot as a guide and a tool for self-reflection, rather than a concrete prediction of the future. The cards can help you see a situation from a new perspective and make decisions that are in line with your inner being."
  },
  termsDialog: {
    title: "Terms of Use",
    content: "By accessing and using the Quick Tarot application, you agree to the following terms:\n\n1. The service is provided 'as is'. Readings are generated by artificial intelligence and are for entertainment and introspective purposes only. They should not be considered professional, legal, medical, or financial advice.\n\n2. We assume no liability for any decisions you make based on the information obtained through our application.\n\n3. We reserve the right to modify or discontinue the service at any time without prior notice.\n\n4. We collect minimal data necessary for the application's functionality, as described in our privacy policy."
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
