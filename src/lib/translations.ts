
export type TranslationSet = {
    headerSubtitle: string;
    formZodiacLabel: string;
    formZodiacPlaceholder: string;
    formZodiacError: string;
    formQuestionLabel: string;
    formQuestionPlaceholder: string;
    formQuestionErrorTooShort: string;
    formQuestionErrorTooLong: string;
    buttonDefault: string;
    buttonLoading: string;
    resultsTitle: string;
    resultsReadingTitle: string;
    resultsLoadingText: string;
    footerCopyright: string;
    footerAbout: string;
    footerMission: string;
    footerFaq: string;
    footerTerms: string;
    footerPrivacy: string;
    footerReset: string;
    footerTarotGuide: string;
    footerCardMeanings: string;
    footerBlog: string;
    aboutDialogTitle: string;
    aboutDialogContent: string;
    missionDialogTitle: string;
    missionDialogContent: string;
    faqDialogTitle: string;
    faqDialogContent: string;
    termsDialogTitle: string;
    termsDialogContent: string;
    privacyDialogTitle: string;
    privacyDialogContent: string;
    resetDialogTitle: string;
    resetDialogDescription: string;
    resetDialogCancel: string;
    resetDialogConfirm: string;
    errorTitle: string;
    unknownError: string;
    serviceOverloadedError: string;
    countdownFinishedText: string;
    dailyCardTitle: string;
    dailyCardButton: string;
    homeButtonText: string;
    zodiacSignAries: string;
    zodiacSignTaurus: string;
    zodiacSignGemini: string;
    zodiacSignCancer: string;
    zodiacSignLeo: string;
    zodiacSignVirgo: string;
    zodiacSignLibra: string;
    zodiacSignScorpio: string;
    zodiacSignSagittarius: string;
    zodiacSignCapricorn: string;
    zodiacSignAquarius: string;
    zodiacSignPisces: string;
    exploreContentTitle: string;
    tarotGuideDescription: string;
    cardMeaningsSectionDescription: string;
    blogSectionDescription: string;
    tarotGuideTitle: string;
    tarotGuideContent_p1: string;
    tarotGuideContent_p2: string;
    tarotGuideContent_h2_1: string;
    tarotGuideContent_p3: string;
    tarotGuideContent_p4: string;
    tarotGuideContent_h2_2: string;
    tarotGuideContent_p5: string;
    cardMeaningsTitle: string;
    cardMeaningsDescription: string;
    cardMeaningsComingSoon: string;
    blogTitle: string;
    blogDescription: string;
    blogReadMore: string;
    blogPostTitle_TarotAndLove: string;
    blogPostDescription_TarotAndLove: string;
    blogPostContent_TarotAndLove_p1: string;
    blogPostContent_TarotAndLove_p2: string;
    blogPostContent_TarotAndLove_h2_1: string;
    blogPostContent_TarotAndLove_p3: string;
    blogPostContent_TarotAndLove_p4: string;
};

export const ALL_TRANSLATIONS: Record<string, TranslationSet> = {
    en: {
        headerSubtitle: "Discover what the stars and cards have in store for you. Enter your sign and question to get your personalized tarot reading.",
        formZodiacLabel: "Your Sign",
        formZodiacPlaceholder: "Select a sign...",
        formZodiacError: "You must select a valid zodiac sign.",
        formQuestionLabel: "Your question",
        formQuestionPlaceholder: "What is on your mind?",
        formQuestionErrorTooShort: "Question must be at least 2 characters.",
        formQuestionErrorTooLong: "Question cannot be longer than 200 characters.",
        buttonDefault: "What do the cards say?",
        buttonLoading: "Shuffling the cards...",
        resultsTitle: "Your Cards of Fate",
        resultsReadingTitle: "Your Tarot Reading",
        resultsLoadingText: "The cards are being shuffled, your fate is being revealed...",
        footerCopyright: "All rights reserved.",
        footerAbout: "About Us",
        footerMission: "Our Mission",
        footerFaq: "FAQ",
        footerTerms: "Terms of Use",
        footerPrivacy: "Privacy Policy",
        footerReset: "Reset Application",
        footerTarotGuide: "Tarot Guide",
        footerCardMeanings: "Card Meanings",
        footerBlog: "Blog",
        aboutDialogTitle: "About The Quick Tarot App",
        aboutDialogContent: "Welcome to Quick Tarot, your digital window into the world of tarot cards. Our mission is to provide an intuitive and personalized tarot experience accessible to everyone, anywhere, anytime.\n\nUsing the power of artificial intelligence, our application generates unique and insightful tarot readings. Each reading is based on cards randomly drawn especially for you and your question, ensuring you receive a message that is meant for you.\n\nWe believe that tarot is not just about predicting the future, but a tool for self-reflection and a deeper understanding of the present. Whether you are looking for answers, inspiration, or simply want to explore your intuition, Quick Tarot is here to guide you.\n\nThank you for being part of our journey.",
        missionDialogTitle: "Our Mission",
        missionDialogContent: "Our mission is to demystify tarot and make it an accessible tool for personal growth and introspection. Through the fusion of ancient wisdom and modern technology, we aim to empower individuals to find clarity, make better decisions, and understand the deeper currents of their lives.\n\nWe strive to create a safe and supportive space where everyone can explore their intuition without prejudice.",
        faqDialogTitle: "Frequently Asked Questions",
        faqDialogContent: "Q: Are the readings truly random?\nA: Absolutely. For each new question, our system randomly selects three cards from a full 78-card deck, guaranteeing a unique and unbiased reading every time.\n\nP: How often can I ask a question?\nA: To ensure the quality and meaningfulness of each reading, we have implemented a time limit. You can request a new reading every two minutes.\n\nQ: Is this real fortune-telling?\nA: We see tarot as a guide and a tool for self-reflection, rather than a concrete prediction of the future. The cards can help you see a situation from a new perspective and make decisions that are in line with your inner being.",
        termsDialogTitle: "Terms of Use",
        termsDialogContent: "By accessing and using the Quick Tarot application, you agree to the following terms:\n\n1. The service is provided 'as is'. Readings are generated by artificial intelligence and are for entertainment and introspective purposes only. They should not be considered professional, legal, medical, or financial advice.\n\n2. We assume no liability for any decisions you make based on the information obtained through our application.\n\n3. We reserve the right to modify or discontinue the service at any time without prior notice.\n\n4. We collect minimal data necessary for the application's functionality, as described in our privacy policy.",
        privacyDialogTitle: "Privacy Policy",
        privacyDialogContent: "This Privacy Policy explains how we collect, use, and protect your data.\n\n1. Data Collection: We only collect the necessary data for the application's functionality, such as your question and selected zodiac sign, which are not stored permanently. We use local storage in your browser to save your last reading and the time when you can request a new one.\n\n2. Google AdSense: We use Google AdSense to display advertisements. Google may use cookies to serve relevant ads based on your previous visits. You can find more information in Google's privacy policy.\n\n3. Security: We do not share your data with third parties, except as necessary to provide the service (e.g., Google AdSense).\n\n4. Your Rights: You have the right to delete data from local storage by clearing your browser's cache.",
        resetDialogTitle: "Are you sure?",
        resetDialogDescription: "This will clear all application data from your browser, including your last reading and cooldown timer, and reload the page.",
        resetDialogCancel: "Cancel",
        resetDialogConfirm: "Reset",
        errorTitle: "Error",
        unknownError: "An unknown error occurred. Please try again.",
        serviceOverloadedError: "The service is currently overloaded. Please try again in a few moments.",
        countdownFinishedText: "Ready for new reading",
        dailyCardTitle: "Card of the Day",
        dailyCardButton: "Continue to the App",
        homeButtonText: "Home",
        zodiacSignAries: "Aries",
        zodiacSignTaurus: "Taurus",
        zodiacSignGemini: "Gemini",
        zodiacSignCancer: "Cancer",
        zodiacSignLeo: "Leo",
        zodiacSignVirgo: "Virgo",
        zodiacSignLibra: "Libra",
        zodiacSignScorpio: "Scorpio",
        zodiacSignSagittarius: "Sagittarius",
        zodiacSignCapricorn: "Capricorn",
        zodiacSignAquarius: "Aquarius",
        zodiacSignPisces: "Pisces",
        exploreContentTitle: "Explore Our Content",
        tarotGuideDescription: "Learn the basics of tarot, how it works, and how to start your journey.",
        cardMeaningsSectionDescription: "Discover the meanings of all 78 tarot cards in our complete library.",
        blogSectionDescription: "Read our articles on tarot, spirituality, and personal growth.",
        tarotGuideTitle: "What is Tarot and How Does It Work?",
        tarotGuideContent_p1: "Tarot is a system of 78 cards used for divination, self-exploration, and spiritual growth. It's a mirror to the soul, reflecting the energies, challenges, and opportunities present in our lives.",
        tarotGuideContent_p2: "The deck is divided into two main parts: the Major Arcana and the Minor Arcana. The 22 Major Arcana cards represent significant life events and spiritual lessons, while the 56 Minor Arcana cards depict the day-to-day situations and emotions we experience.",
        tarotGuideContent_h2_1: "How a Reading Works",
        tarotGuideContent_p3: "A tarot reading is not about predicting a fixed future. Instead, it offers a snapshot of the current energies surrounding a situation. The cards you draw reflect your own subconscious knowledge and the influences at play.",
        tarotGuideContent_p4: "When you ask a question, you are focusing your energy. The cards that appear are a response to that energy, providing guidance and new perspectives. The interpretation of the cards is a blend of their traditional meanings and the reader's intuition.",
        tarotGuideContent_h2_2: "Our Approach",
        tarotGuideContent_p5: "Here at Quick Tarot, we use artificial intelligence to interpret the randomly drawn cards in the context of your question and zodiac sign. This creates a personalized and insightful reading, designed to offer clarity and empower you to make conscious decisions.",
        cardMeaningsTitle: "Tarot Card Meanings",
        cardMeaningsDescription: "Explore the rich symbolism of all 78 tarot cards. Click on a card to learn more about its meaning in love, career, and spirituality. (Full descriptions coming soon)",
        cardMeaningsComingSoon: "Full, detailed pages for each card are coming soon!",
        blogTitle: "Our Tarot Blog",
        blogDescription: "Dive deeper into the world of tarot with our articles on various topics.",
        blogReadMore: "Read More",
        blogPostTitle_TarotAndLove: "Tarot and Love: Finding Clarity in Matters of the Heart",
        blogPostDescription_TarotAndLove: "How can tarot help you navigate the complex world of relationships? Discover the key cards and questions to ask.",
        blogPostContent_TarotAndLove_p1: "Love is one of the most common topics brought to a tarot reading. Whether you're single, in a new relationship, or navigating a long-term partnership, the cards can offer profound insights.",
        blogPostContent_TarotAndLove_p2: "Tarot doesn't give a simple 'yes' or 'no' answer. Instead, it illuminates the dynamics at play, the emotional undercurrents, and the potential pathways forward.",
        blogPostContent_TarotAndLove_h2_1: "Key Cards in Love Readings",
        blogPostContent_TarotAndLove_p3: "The Lovers, Two of Cups, and Ten of Cups are classic indicators of partnership and emotional fulfillment. However, cards like The Tower can signify necessary shake-ups, while The Hermit might point to a need for introspection before entering a relationship.",
        blogPostContent_TarotAndLove_p4: "The key is to look at the cards together, as a story. They can reveal your own blockages, your partner's feelings, and the overall potential of the connection. Use them not to predict, but to understand and grow.",
    },
    sr: {
        headerSubtitle: "Otkrijte šta vam zvezde i karte poručuju. Unesite vaš znak i pitanje kako biste dobili vaše personalizovano tarot čitanje.",
        formZodiacLabel: "Vaš Znak",
        formZodiacPlaceholder: "Izaberite znak...",
        formZodiacError: "Morate izabrati validan horoskopski znak.",
        formQuestionLabel: "Vaše pitanje",
        formQuestionPlaceholder: "Šta vas muči ili zanima?",
        formQuestionErrorTooShort: "Pitanje mora imati najmanje 2 karaktera.",
        formQuestionErrorTooLong: "Pitanje ne može biti duže od 200 karaktera.",
        buttonDefault: "Šta kažu karte?",
        buttonLoading: "Mešanje karata...",
        resultsTitle: "Vaše Karte Sudbine",
        resultsReadingTitle: "Vaše Tarot Čitanje",
        resultsLoadingText: "Karte se mešaju, vaša sudbina se otkriva...",
        footerCopyright: "Sva prava zadržana.",
        footerAbout: "O Nama",
        footerMission: "Naša Misija",
        footerFaq: "Česta Pitanja",
        footerTerms: "Uslovi Korišćenja",
        footerPrivacy: "Politika Privatnosti",
        footerReset: "Resetuj Aplikaciju",
        footerTarotGuide: "Vodič za Tarot",
        footerCardMeanings: "Značenja Karata",
        footerBlog: "Blog",
        aboutDialogTitle: "O Quick Tarot Aplikaciji",
        aboutDialogContent: "Dobrodošli u Quick Tarot, vaš digitalni prozor u svet tarot karata. Naša misija je da pružimo intuitivno i personalizovano tarot iskustvo dostupno svima, bilo gde i bilo kada.\n\nKoristeći snagu veštačke inteligencije, naša aplikacija generiše jedinstvena i pronicljiva tarot čitanja. Svako čitanje je zasnovano na kartama nasumično izvučenim specijalno za vas i vaše pitanje, osiguravajući da dobijete poruku koja je vama namenjena.\n\nVerujemo da tarot nije samo predviđanje budućnosti, već alat za samorefleksiju i dublje razumevanje sadašnjosti. Bilo da tražite odgovore, inspiraciju ili jednostavno želite da istražite svoju intuiciju, Quick Tarot je tu da vas vodi.\n\nHvala vam što ste deo našeg putovanja.",
        missionDialogTitle: "Naša Misija",
        missionDialogContent: "Naša misija je da demistifikujemo tarot i učinimo ga dostupnim alatom za lični rast i introspekciju. Kroz spoj drevne mudrosti i moderne tehnologije, cilj nam je da osnažimo pojedince da pronađu jasnoću, donesu bolje odluke i razumeju dublje tokove svojih života.\n\nTežimo stvaranju sigurnog i podržavajućeg prostora gde svako može istražiti svoju intuiciju bez predrasuda.",
        faqDialogTitle: "Često Postavljana Pitanja",
        faqDialogContent: "P: Da li su čitanja zaista nasumična?\nA: Apsolutno. Za svako novo pitanje, naš sistem nasumično bira tri karte iz punog špila od 78 karata, garantujući jedinstveno i nepristrasno čitanje svaki put.\n\nP: Koliko često mogu da postavim pitanje?\nA: Kako bismo osigurali kvalitet i smislenost svakog čitanja, uveli smo vremensko ograničenje. Možete zatražiti novo čitanje svaka dva minuta.\n\nP: Da li je ovo pravo proricanje sudbine?\nA: Mi vidimo tarot kao vodič i sredstvo za samorefleksiju, a ne kao konkretno predviđanje budućnosti. Karte vam mogu pomoći da sagledate situaciju iz nove perspektive i donesete odluke koje su u skladu sa vašim unutrašnjim bićem.",
        termsDialogTitle: "Uslovi Korišćenja",
        termsDialogContent: "Pristupanjem i korišćenjem Quick Tarot aplikacije, slažete se sa sledećim uslovima:\n\n1. Usluga se pruža 'takva kakva jeste'. Čitanja su generisana od strane veštačke inteligencije i služe isključivo u zabavne i introspektivne svrhe. Ne treba ih smatrati profesionalnim, pravnim, medicinskim ili finansijskim savetom.\n\n2. Ne preuzimamo odgovornost za bilo kakve odluke koje donesete na osnovu informacija dobijenih putem naše aplikacije.\n\n3. Zadržavamo pravo da izmenimo ili prekinemo uslugu u bilo kom trenutku bez prethodne najave.\n\n4. Prikupljamo minimalne podatke neophodne za funkcionisanje aplikacije, što je opisano u našoj politici privatnosti.",
        privacyDialogTitle: "Politika Privatnosti",
        privacyDialogContent: "Ova Politika Privatnosti objašnjava kako prikupljamo, koristimo i štitimo vaše podatke.\n\n1. Prikupljanje podataka: Prikupljamo samo neophodne podatke za rad aplikacije, kao što su vaše pitanje i izabrani horoskopski znak, koji se ne čuvaju trajno. Koristimo lokalno skladište (local storage) u vašem pregledaču kako bismo sačuvali vaše poslednje čitanje i vreme kada možete zatražiti novo.\n\n2. Google AdSense: Koristimo Google AdSense za prikazivanje oglasa. Google može koristiti kolačiće za serviranje relevantnih oglasa na osnovu vaših prethodnih posjeta. Više informacija možete pronaći u Google-ovoj politici privatnosti.\n\n3. Bezbednost: Ne delimo vaše podatke sa trećim stranama, osim ako je to neophodno za pružanje usluge (npr. Google AdSense).\n\n4. Vaša prava: Imate pravo da obrišete podatke iz lokalnog skladišta brisanjem keša vašeg pregledača.",
        resetDialogTitle: "Da li ste sigurni?",
        resetDialogDescription: "Ovo će obrisati sve podatke aplikacije iz vašeg pregledača, uključujući poslednje čitanje i tajmer, i ponovo učitati stranicu.",
        resetDialogCancel: "Otkaži",
        resetDialogConfirm: "Resetuj",
        errorTitle: "Greška",
        unknownError: "Došlo je do nepoznate greške. Molimo pokušajte ponovo.",
        serviceOverloadedError: "Servis je trenutno preopterećen. Molimo pokušajte ponovo za nekoliko trenutaka.",
        countdownFinishedText: "Spremno za novo čitanje",
        dailyCardTitle: "Karta Dana",
        dailyCardButton: "Nastavi na Aplikaciju",
        homeButtonText: "Početna",
        zodiacSignAries: "Ovan",
        zodiacSignTaurus: "Bik",
        zodiacSignGemini: "Blizanci",
        zodiacSignCancer: "Rak",
        zodiacSignLeo: "Lav",
        zodiacSignVirgo: "Devica",
        zodiacSignLibra: "Vaga",
        zodiacSignScorpio: "Škorpija",
        zodiacSignSagittarius: "Strelac",
        zodiacSignCapricorn: "Jarac",
        zodiacSignAquarius: "Vodolija",
        zodiacSignPisces: "Ribe",
        exploreContentTitle: "Istražite Naš Sadržaj",
        tarotGuideDescription: "Naučite osnove tarota, kako funkcioniše i kako da započnete svoje putovanje.",
        cardMeaningsSectionDescription: "Otkrijte značenja svih 78 tarot karata u našoj kompletnoj biblioteci.",
        blogSectionDescription: "Pročitajte naše članke o tarotu, duhovnosti i ličnom rastu.",
        tarotGuideTitle: "Šta je Tarot i Kako Funkcioniše?",
        tarotGuideContent_p1: "Tarot je sistem od 78 karata koji se koristi za divinaciju, samoispitivanje i duhovni rast. On je ogledalo duše, koje odražava energije, izazove i prilike prisutne u našim životima.",
        tarotGuideContent_p2: "Špil je podeljen na dva glavna dela: Veliku Arkanu i Malu Arkanu. 22 karte Velike Arkane predstavljaju značajne životne događaje i duhovne lekcije, dok 56 karata Male Arkane prikazuju svakodnevne situacije i emocije koje doživljavamo.",
        tarotGuideContent_h2_1: "Kako Funkcioniše Čitanje?",
        tarotGuideContent_p3: "Tarot čitanje nije predviđanje fiksne budućnosti. Umesto toga, ono nudi sliku trenutnih energija koje okružuju neku situaciju. Karte koje izvučete odražavaju vaše sopstveno podsvesno znanje i uticaje koji su u igri.",
        tarotGuideContent_p4: "Kada postavite pitanje, vi fokusirate svoju energiju. Karte koje se pojave su odgovor na tu energiju, pružajući smernice i nove perspektive. Tumačenje karata je spoj njihovih tradicionalnih značenja i intuicije čitača.",
        tarotGuideContent_h2_2: "Naš Pristup",
        tarotGuideContent_p5: "Ovde u Quick Tarot-u, koristimo veštačku inteligenciju da bismo tumačili nasumično izvučene karte u kontekstu vašeg pitanja i horoskopskog znaka. To stvara personalizovano i pronicljivo čitanje, dizajnirano da ponudi jasnoću i osnaži vas da donosite svesne odluke.",
        cardMeaningsTitle: "Značenja Tarot Karata",
        cardMeaningsDescription: "Istražite bogatu simboliku svih 78 tarot karata. Kliknite na kartu da saznate više o njenom značenju u ljubavi, karijeri i duhovnosti. (Potpuni opisi uskoro)",
        cardMeaningsComingSoon: "Potpune, detaljne stranice za svaku kartu stižu uskoro!",
        blogTitle: "Naš Tarot Blog",
        blogDescription: "Zaronite dublje u svet tarota uz naše članke o različitim temama.",
        blogReadMore: "Pročitaj Više",
        blogPostTitle_TarotAndLove: "Tarot i Ljubav: Pronalaženje Jasnoće u Stvarima Srca",
        blogPostDescription_TarotAndLove: "Kako vam tarot može pomoći da se snađete u složenom svetu veza? Otkrijte ključne karte i pitanja koja treba postaviti.",
        blogPostContent_TarotAndLove_p1: "Ljubav je jedna od najčešćih tema koje se donose na tarot čitanje. Bilo da ste slobodni, u novoj vezi ili se krećete kroz dugogodišnje partnerstvo, karte mogu ponuditi duboke uvide.",
        blogPostContent_TarotAndLove_p2: "Tarot ne daje jednostavan 'da' ili 'ne' odgovor. Umesto toga, on osvetljava dinamiku koja je u igri, emocionalne tokove i potencijalne puteve napred.",
        blogPostContent_TarotAndLove_h2_1: "Ključne Karte u Ljubavnim Čitanjima",
        blogPostContent_TarotAndLove_p3: "Ljubavnici, Dvojka pehara i Desetka pehara su klasični pokazatelji partnerstva i emocionalnog ispunjenja. Međutim, karte poput Kule mogu označavati neophodne potrese, dok Pustinjak može ukazivati na potrebu za introspekcijom pre ulaska u vezu.",
        blogPostContent_TarotAndLove_p4: "Ključ je posmatrati karte zajedno, kao priču. One mogu otkriti vaše sopstvene blokade, osećanja vašeg partnera i ukupan potencijal veze. Koristite ih ne da predvidite, već da razumete i rastete.",
    },
};

export function getTranslations(lang: string): TranslationSet {
    const baseLang = lang.split('-')[0];
    return ALL_TRANSLATIONS[baseLang] || ALL_TRANSLATIONS.sr;
}

    