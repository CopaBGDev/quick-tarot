
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
    footerWhatIsTarot: string;
    footerCardMeanings: string;
    footerBlog: string;
    footerReset: string;
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
    whatIsTarotTitle: string;
    whatIsTarotContent: string;
    cardMeaningsTitle: string;
    cardMeaningsContent: string;
    blogTitle: string;
    blogContent: string;
    blogBackToBlog: string;
    blogRelatedArticles: string;
    homeAdditionalContentTitle: string;
    resetDialogTitle: string;
    resetDialogDescription: string;
    resetDialogCancel: string;
    resetDialogConfirm: string;
    errorTitle: string;
    unknownError: string;
    serviceOverloadedError: string;
    countdownFinishedText: string;
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
        footerWhatIsTarot: "What is Tarot?",
        footerCardMeanings: "Card Meanings",
        footerBlog: "Blog",
        footerReset: "Reset Application",
        aboutDialogTitle: "About The Quick Tarot App",
        aboutDialogContent: `Welcome to Quick Tarot, your digital portal to the mystical world of tarot. Our application is designed to provide an intuitive, insightful, and personalized tarot experience that is accessible to everyone, anywhere, and at any time. We believe that tarot is a powerful tool for self-reflection, guidance, and a deeper understanding of one's life path.\n\nAt the core of Quick Tarot is a sophisticated AI engine that generates unique and meaningful readings. We don't use pre-written interpretations. Instead, for each question, our system programmatically draws three cards from a full 78-card deck, ensuring that every reading is genuinely random and tailored to the user's specific query and astrological sign. This dynamic process allows the AI to weave a narrative that connects the card's symbolism to the user's personal context, providing guidance that is both relevant and profound.\n\nOur philosophy is that tarot is not about fortune-telling in the deterministic sense, but about empowerment. The cards are a mirror to a a's inner world, reflecting hidden thoughts, potential challenges, and untapped opportunities. They offer a new perspective, helping users to navigate their circumstances with greater clarity and confidence. Whether you are seeking answers to a specific problem, looking for creative inspiration, or simply wish to explore your intuition, Quick Tarot is here to be your trusted guide.\n\nWe are committed to creating a transparent and high-quality service. Our site includes detailed explanations of our methodology, the meanings of all 78 tarot cards, and guides on how to formulate effective questions. We believe that an informed user is an empowered user. Thank you for being part of our journey as we merge ancient wisdom with modern technology to bring the art of tarot into the digital age.`,
        missionDialogTitle: "Our Mission",
        missionDialogContent: "Our mission at Quick Tarot is to demystify the art of tarot and make it an accessible, practical tool for personal growth and introspection in the modern world. We aim to bridge the gap between ancient wisdom and cutting-edge technology, empowering individuals to find clarity, make more informed decisions, and understand the deeper currents that shape their lives.\n\nWe are guided by three core principles:\n1. Accessibility: We strive to remove the barriers that have often made tarot seem esoteric or unapproachable. Our platform is designed to be user-friendly and intuitive, offering a welcoming space for both beginners and experienced practitioners. By providing our service online, we make guidance available anytime, anywhere.\n2. Authenticity: We are committed to honoring the rich tradition and symbolism of tarot. While we use advanced AI to generate readings, our system is built upon a deep respect for the established meanings and relationships between the cards. We ensure that every reading, though generated by technology, is rooted in the authentic spirit of tarot practice.\n3. Empowerment: Our ultimate goal is not to predict the future, but to empower our users. We see tarot as a tool for self-discovery and reflection. By providing insightful interpretations, we help individuals to unlock their own intuition, recognize their inner strengths, and navigate life's challenges with greater awareness and confidence. We encourage our users to see the cards not as a fixed destiny, but as a guide to creating their own best future.",
        faqDialogTitle: "Frequently Asked Questions",
        faqDialogContent: `**Q: How does the AI generate tarot readings?**\nA: Our system uses a powerful language model combined with a deep understanding of tarot symbolism. When you ask a question, the AI considers your query and zodiac sign. It then programmatically selects three random cards from a full 78-card deck. The AI interprets the meanings of these specific cards in the context of your question, creating a unique, coherent narrative. It does not use pre-written scripts.\n\n**Q: Are the readings truly random and unique?**\nA: Absolutely. The card selection process is cryptographically random for each reading. Because the AI's interpretation is generated in real-time based on the unique combination of your question, sign, and the three randomly drawn cards, the number of possible readings is virtually infinite. It is extremely unlikely that two users will ever receive the exact same text.\n\n**Q: How often can I ask for a reading?**\nA: To encourage thoughtful use and ensure the quality of our service, we have a two-minute cooldown period between readings. We believe this promotes more meaningful engagement with the guidance provided, rather than rapid, superficial inquiries.\n\n**Q: Is this real fortune-telling?**\nA: We view tarot as a tool for guidance and self-reflection, not as a method for predicting a fixed future. The cards can illuminate potential paths, hidden influences, and the underlying energies of a situation. The ultimate power to choose and act always rests with you. The reading is a snapshot of the present moment's potential, offering you a fresh perspective to make empowered decisions.\n\n**Q: Why do you need my zodiac sign?**\nA: Your zodiac sign adds another layer of personalization to the reading. The AI incorporates the general archetypal traits and elemental influences of your sign to tailor the interpretation, making the guidance more resonant and specific to your potential disposition and approach to life.`,
        termsDialogTitle: "Terms of Use",
        termsDialogContent: `Welcome to Quick Tarot. By accessing and using our application and website ("Service"), you agree to comply with and be bound by the following terms and conditions of use. Please review them carefully.\n\n**1. Acceptance of Terms**\nThis Service is provided for entertainment, spiritual, and introspective purposes only. The readings are generated by an artificial intelligence and should not be considered a substitute for professional advice, including but not limited to medical, legal, financial, or psychological counsel. You must be at least 18 years old to use this Service.\n\n**2. Nature of the Service**\nThe tarot readings provided by our AI are based on algorithms and interpretations of symbolism. They are not factual, and we make no claims or guarantees as to their accuracy or applicability to your life. The Service is provided 'as is' and 'as available' without warranties of any kind.\n\n**3. User Conduct and Responsibility**\nYou are solely responsible for your actions and decisions based on the use of this Service. Quick Tarot, its creators, and affiliates shall not be held liable for any damages, losses, or distress arising from your reliance on the information provided. You agree to use the Service responsibly and not for any unlawful purpose.\n\n**4. Intellectual Property**\nAll content on this site, including text, graphics, logos, and the AI-generated readings, is the property of Quick Tarot and protected by copyright and other intellectual property laws. You may not reproduce, distribute, or create derivative works from the content without our express written permission.\n\n**5. Limitation of Liability**\nIn no event shall Quick Tarot or its affiliates be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use the Service.\n\n**6. Modifications to Service**\nWe reserve the right to modify, suspend, or discontinue the Service at any time, with or without notice, without liability to you or any third party.\n\n**7. Governing Law**\nThese terms shall be governed by and construed in accordance with the laws of the jurisdiction in which our company is based, without regard to its conflict of law provisions.`,
        privacyDialogTitle: "Privacy Policy",
        privacyDialogContent: `This Privacy Policy outlines how Quick Tarot ("we", "us", "our") collects, uses, and protects your information when you use our website and services. Your privacy is of the utmost importance to us.\n\n**1. Information We Collect**\nTo provide our service, we collect a limited amount of information:\n- **User-Provided Data:** Your question and selected zodiac sign. This information is used solely to generate your tarot reading and is processed in real-time. We do not store this information on our servers after the reading is generated.\n- **Browser Storage (Local Storage):** To enhance your experience, we use your browser's local storage to save your most recent tarot reading and to manage the cooldown timer. This data is stored directly on your device and is not transmitted to our servers.\n- **Usage Data:** We may collect non-personal, anonymous data regarding your interaction with our site (e.g., pages visited, features used) through services like Google Analytics to help us improve our service.\n\n**2. Use of Information**\n- Your question and zodiac sign are used exclusively as input for our AI to generate a personalized tarot reading.\n- Data in your browser's local storage allows you to revisit your last reading without making a new request and enforces the cooldown period.\n- Anonymized usage data helps us understand how our service is used, identify areas for improvement, and optimize the user experience.\n\n**3. Third-Party Services**\n- **Google AdSense:** We use Google AdSense to display advertisements. Google and its partners may use cookies to serve ads based on a user's prior visits to our website or other websites. You can opt out of personalized advertising by visiting Google's Ads Settings. For more information, please review Google's Privacy Policy.\n- **Google Analytics:** We use Google Analytics to analyze website traffic. This service collects anonymous data and does not identify individual users. For more about how Google uses data, visit "How Google uses data when you use our partners' sites or apps".\n\n**4. Data Security**\nWe are committed to protecting your information. Your direct inputs (question, sign) are not permanently stored by us. Data stored locally on your device is under your control and can be cleared by you at any time by clearing your browser's cache.\n\n**5. Your Rights**\nYou have full control over the data stored in your browser's local storage. You can delete this data at any time. As we do not maintain user accounts or store personal reading data on our servers, there is no user data for you to request or delete from us directly.`,
        whatIsTarotTitle: "What is Tarot? A Beginner's Guide",
        whatIsTarotContent: `## What is Tarot?\n\nTarot is a deck of 78 cards, each with its own imagery, symbolism, and story. Used for centuries as a tool for divination and introspection, the tarot is not so much about predicting a fixed, unchangeable future as it is about gaining insight into the present moment. It's a mirror to your subconscious, reflecting the energies, opportunities, and challenges that surround you.\n\nA standard tarot deck is divided into two main parts:\n\n- **The Major Arcana:** Consists of 22 cards, starting with The Fool and ending with The World. These cards represent significant life events, major life lessons, and the broad, archetypal themes of the human journey. When a Major Arcana card appears in a reading, it often signifies a moment of great importance or a major shift in your life's path.\n\n- **The Minor Arcana:** Consists of 56 cards, divided into four suits, much like a regular deck of playing cards. Each suit contains 14 cards: an Ace, numbers Two through Ten, and four Court Cards (Page, Knight, Queen, King).\n\n### The Four Suits of the Minor Arcana\n\nEach suit corresponds to a different aspect of human experience:\n\n- **Wands (Suit of Fire):** Represents passion, energy, creativity, and ambition. Wands cards often relate to your career, projects, and personal drive.\n- **Cups (Suit of Water):** Represents emotions, relationships, intuition, and love. Cups cards deal with matters of the heart and your emotional well-being.\n- **Swords (Suit of Air):** Represents thoughts, challenges, intellect, and conflict. Swords cards often point to your mindset, communication, and the mental struggles you may face.\n- **Pentacles (Suit of Earth):** Represents the material world, finances, work, and physical health. Pentacles cards are grounded in your day-to-day reality and tangible outcomes.\n\n## How Does a Tarot Reading Work?\n\nA tarot reading is a dialogue between you and the cards. You begin with a question or intention. This focuses the energy of the reading. After shuffling the deck, cards are laid out in a specific pattern called a "spread." Each position in the spread corresponds to a different aspect of the question.\n\nHere at Quick Tarot, we use a simple and powerful three-card spread, often interpreted as:\n\n1.  **Past:** The foundational energies or events that have led to the current situation.\n2.  **Present:** The current state of affairs and the central challenge or theme.\n3.  **Future:** The potential outcome or direction things are heading if the current path is maintained.\n\nOur AI reads the cards in combination, weaving their individual meanings into a coherent narrative that addresses your question. It's the interplay between the cards, their positions, and your own intuition that brings the reading to life.\n\n## How to Ask Good Questions\n\nThe quality of your tarot reading often depends on the quality of your question. The best questions are open-ended, focused on you, and centered on gaining insight rather than seeking a simple "yes" or "no" answer.\n\n**Avoid:** "Will I get the job?"\n**Instead, ask:** "What do I need to know to succeed in my job search?" or "What opportunities for growth does this new career path offer me?"\n\n**Avoid:** "Does he love me?"\n**Instead, ask:** "How can I cultivate a more loving and supportive relationship?" or "What is the nature of the connection between us?"\n\nBy framing your questions in a way that seeks guidance and empowerment, you open yourself up to more profound and useful insights. The tarot is here to help you understand your own power and navigate your path with wisdom and clarity.`,
        cardMeaningsTitle: "Meanings of the Tarot Cards",
        cardMeaningsContent: `Here you will find a brief overview of all 78 tarot cards.`,
        blogTitle: "Tarot Blog",
        blogContent: `Welcome to our blog! Here we will share articles, tips, and deeper insights into the world of tarot. Check back soon for our first posts!`,
        blogBackToBlog: "Back to Blog",
        blogRelatedArticles: "Related Articles",
        homeAdditionalContentTitle: "Explore the World of Tarot",
        resetDialogTitle: "Are you sure?",
        resetDialogDescription: "This will clear all application data from your browser, including your last reading and cooldown timer, and reload the page.",
        resetDialogCancel: "Cancel",
        resetDialogConfirm: "Reset",
        errorTitle: "Error",
        unknownError: "An unknown error occurred. Please try again.",
        serviceOverloadedError: "The service is currently overloaded. Please try again in a few moments.",
        countdownFinishedText: "Ready for new reading",
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
        footerWhatIsTarot: "Šta je Tarot?",
        footerCardMeanings: "Značenja Karata",
        footerBlog: "Blog",
        footerReset: "Resetuj Aplikaciju",
        aboutDialogTitle: "O Quick Tarot Aplikaciji",
        aboutDialogContent: `Dobrodošli u Quick Tarot, vaš digitalni portal u mistični svet tarota. Naša aplikacija je dizajnirana da pruži intuitivno, pronicljivo i personalizovano tarot iskustvo koje je dostupno svima, bilo gde i bilo kada. Verujemo da je tarot moćan alat za samorefleksiju, vođstvo i dublje razumevanje životnog puta.\n\nU srcu Quick Tarot aplikacije nalazi se sofisticirani AI mehanizam koji generiše jedinstvena i smislena čitanja. Mi ne koristimo unapred napisane interpretacije. Umesto toga, za svako pitanje, naš sistem programski izvlači tri karte iz punog špila od 78 karata, osiguravajući da je svako čitanje zaista nasumično i prilagođeno specifičnom upitu korisnika i njegovom astrološkom znaku. Ovaj dinamički proces omogućava veštačkoj inteligenciji da isplete narativ koji povezuje simboliku karata sa ličnim kontekstom korisnika, pružajući vođstvo koje je istovremeno relevantno i duboko.\n\nNaša filozofija je da tarot nije determinističko predviđanje sudbine, već osnaživanje. Karte su ogledalo unutrašnjeg sveta pojedinca, odražavajući skrivene misli, potencijalne izazove i neiskorišćene prilike. One nude novu perspektivu, pomažući korisnicima da se snalaze u svojim okolnostima sa većom jasnoćom i samopouzdanjem. Bilo da tražite odgovore na konkretan problem, tražite kreativnu inspiraciju ili jednostavno želite da istražite svoju intuiciju, Quick Tarot je tu da bude vaš pouzdani vodič.\n\nPosvećeni smo stvaranju transparentne i visokokvalitetne usluge. Naš sajt uključuje detaljna objašnjenja naše metodologije, značenja svih 78 tarot karata i vodiče o tome kako formulisati efikasna pitanja. Verujemo da je informisan korisnik osnažen korisnik. Hvala vam što ste deo našeg putovanja dok spajamo drevnu mudrost sa modernom tehnologijom kako bismo uneli umetnost tarota u digitalno doba.`,
        missionDialogTitle: "Naša Misija",
        missionDialogContent: "Naša misija u Quick Tarot-u je da demistifikujemo umetnost tarota i učinimo ga dostupnim, praktičnim alatom za lični rast i introspekciju u modernom svetu. Cilj nam je da premostimo jaz između drevne mudrosti i najsavremenije tehnologije, osnažujući pojedince da pronađu jasnoću, donose informisanije odluke i razumeju dublje tokove koji oblikuju njihove živote.\n\nVodimo se sa tri osnovna principa:\n1. Pristupačnost: Težimo da uklonimo barijere koje su tarot često činile ezoteričnim ili nepristupačnim. Naša platforma je dizajnirana da bude laka za korišćenje i intuitivna, nudeći dobrodošlicu i početnicima i iskusnim praktikantima. Pružanjem naše usluge na mreži, činimo vođstvo dostupnim bilo kada i bilo gde.\n2. Autentičnost: Posvećeni smo poštovanju bogate tradicije i simbolike tarota. Iako koristimo naprednu veštačku inteligenciju za generisanje čitanja, naš sistem je izgrađen na dubokom poštovanju utvrđenih značenja i odnosa između karata. Osiguravamo da svako čitanje, iako generisano tehnologijom, bude ukorenjeno u autentičnom duhu tarot prakse.\n3. Osnaživanje: Naš krajnji cilj nije da predvidimo budućnost, već da osnažimo naše korisnike. Tarot vidimo kao alat za samootkrivanje i refleksiju. Pružanjem pronicljivih interpretacija, pomažemo pojedincima da otključaju sopstvenu intuiciju, prepoznaju svoje unutrašnje snage i snalaze se u životnim izazovima sa većom svešću i samopouzdanjem. Podstičemo naše korisnike da karte ne vide kao fiksnu sudbinu, već kao vodič za kreiranje sopstvene najbolje budućnosti.",
        faqDialogTitle: "Često Postavljana Pitanja",
        faqDialogContent: `**P: Kako veštačka inteligencija generiše tarot čitanja?**\nO: Naš sistem koristi moćan jezički model u kombinaciji sa dubokim razumevanjem tarot simbolike. Kada postavite pitanje, AI uzima u obzir vaš upit i horoskopski znak. Zatim programski bira tri nasumične karte iz punog špila od 78 karata. AI interpretira značenja ovih specifičnih karata u kontekstu vašeg pitanja, stvarajući jedinstven, koherentan narativ. Ne koristi unapred napisane skripte.\n\n**P: Da li su čitanja zaista nasumična i jedinstvena?**\nO: Apsolutno. Proces odabira karata je kriptografski nasumičan za svako čitanje. Pošto se interpretacija veštačke inteligencije generiše u realnom vremenu na osnovu jedinstvene kombinacije vašeg pitanja, znaka i tri nasumično izvučene karte, broj mogućih čitanja je praktično beskonačan. Izuzetno je malo verovatno da će dva korisnika ikada dobiti potpuno isti tekst.\n\n**P: Koliko često mogu da tražim čitanje?**\nO: Da bismo podstakli promišljeno korišćenje i osigurali kvalitet naše usluge, imamo period mirovanja od dva minuta između čitanja. Verujemo da ovo promoviše smisleniji angažman sa pruženim vođstvom, umesto brzih, površnih upita.\n\n**P: Da li je ovo pravo proricanje sudbine?**\nO: Mi vidimo tarot kao alat za vođstvo i samorefleksiju, a ne kao metod za predviđanje fiksne budućnosti. Karte mogu osvetliti potencijalne puteve, skrivene uticaje i osnovne energije situacije. Krajnja moć izbora i delovanja uvek ostaje na vama. Čitanje je snimak potencijala sadašnjeg trenutka, nudeći vam svežu perspektivu za donošenje osnaženih odluka.\n\n**P: Zašto vam je potreban moj horoskopski znak?**\nO: Vaš horoskopski znak dodaje još jedan sloj personalizacije čitanju. AI uključuje opšte arhetipske osobine i elementarne uticaje vašeg znaka kako bi prilagodio interpretaciju, čineći vođstvo rezonantnijim i specifičnijim za vašu potencijalnu narav i pristup životu.`,
        termsDialogTitle: "Uslovi Korišćenja",
        termsDialogContent: `Dobrodošli u Quick Tarot. Pristupanjem i korišćenjem naše aplikacije i veb-sajta ("Usluga"), slažete se da ćete se pridržavati i biti vezani sledećim uslovima i odredbama korišćenja. Molimo vas da ih pažljivo pregledate.\n\n**1. Prihvatanje Uslova**\nOva Usluga je namenjena isključivo u zabavne, duhovne i introspektivne svrhe. Čitanja generiše veštačka inteligencija i ne treba ih smatrati zamenom za profesionalni savet, uključujući, ali ne ograničavajući se na medicinski, pravni, finansijski ili psihološki savet. Morate imati najmanje 18 godina da biste koristili ovu Uslugu.\n\n**2. Priroda Usluge**\nTarot čitanja koja pruža naša veštačka inteligencija zasnovana su na algoritmima i interpretacijama simbolike. Ona nisu činjenična i ne dajemo nikakve tvrdnje niti garancije u pogledu njihove tačnosti ili primenljivosti na vaš život. Usluga se pruža 'takva kakva jeste' i 'prema dostupnosti' bez ikakvih garancija.\n\n**3. Ponašanje i Odgovornost Korisnika**\nVi ste isključivo odgovorni za svoje postupke i odluke zasnovane na korišćenju ove Usluge. Quick Tarot, njegovi kreatori i povezana lica neće se smatrati odgovornim za bilo kakvu štetu, gubitke ili nevolje proistekle iz vašeg oslanjanja na pružene informacije. Slažete se da ćete Uslugu koristiti odgovorno i ne za bilo koju nezakonitu svrhu.\n\n**4. Intelektualna Svojina**\nSav sadržaj na ovom sajtu, uključujući tekst, grafiku, logotipe i AI-generisana čitanja, vlasništvo je Quick Tarot-a i zaštićen je autorskim pravima i drugim zakonima o intelektualnoj svojini. Ne smete reprodukovati, distribuirati ili stvarati izvedena dela iz sadržaja bez našeg izričitog pismenog odobrenja.\n\n**5. Ograničenje Odgovornosti**\nNi u kom slučaju Quick Tarot ili njegova povezana lica neće biti odgovorni za bilo kakvu direktnu, indirektnu, slučajnu, posebnu ili posledičnu štetu koja proističe iz korišćenja ili nemogućnosti korišćenja Usluge.\n\n**6. Izmene Usluge**\nZadržavamo pravo da izmenimo, suspendujemo ili prekinemo Uslugu u bilo kom trenutku, sa ili bez obaveštenja, bez odgovornosti prema vama ili bilo kojoj trećoj strani.\n\n**7. Merodavno Pravo**\nOvi uslovi će se tumačiti i primenjivati u skladu sa zakonima jurisdikcije u kojoj je naša kompanija osnovana, bez obzira na njene kolizione norme.`,
        privacyDialogTitle: "Politika Privatnosti",
        privacyDialogContent: `Ova Politika Privatnosti opisuje kako Quick Tarot ("mi", "nas", "naš") prikuplja, koristi i štiti vaše informacije kada koristite našu veb stranicu i usluge. Vaša privatnost nam je od izuzetne važnosti.\n\n**1. Informacije koje prikupljamo**\nDa bismo pružili našu uslugu, prikupljamo ograničenu količinu informacija:\n- **Podaci koje unosi korisnik:** Vaše pitanje i izabrani horoskopski znak. Ove informacije se koriste isključivo za generisanje vašeg tarot čitanja i obrađuju se u realnom vremenu. Mi ne čuvamo ove informacije na našim serverima nakon što se čitanje generiše.\n- **Skladište u pregledaču (Local Storage):** Da bismo poboljšali vaše iskustvo, koristimo lokalno skladište vašeg pregledača da sačuvamo vaše najnovije tarot čitanje i da upravljamo tajmerom za ponovno korišćenje. Ovi podaci se čuvaju direktno na vašem uređaju i ne prenose se na naše servere.\n- **Podaci o korišćenju:** Možemo prikupljati ne-lične, anonimne podatke o vašoj interakciji sa našim sajtom (npr. posećene stranice, korišćene funkcije) putem servisa kao što je Google Analytics kako bismo nam pomogli da poboljšamo našu uslugu.\n\n**2. Korišćenje informacija**\n- Vaše pitanje i horoskopski znak se koriste isključivo kao ulaz za našu veštačku inteligenciju kako bi generisala personalizovano tarot čitanje.\n- Podaci u lokalnom skladištu vašeg pregledača omogućavaju vam da ponovo posetite svoje poslednje čitanje bez novog zahteva i primenjuju period mirovanja.\n- Anonimizovani podaci o korišćenju pomažu nam da razumemo kako se naša usluga koristi, identifikujemo oblasti za poboljšanje i optimizujemo korisničko iskustvo.\n\n**3. Usluge trećih strana**\n- **Google AdSense:** Koristimo Google AdSense za prikazivanje oglasa. Google i njegovi partneri mogu koristiti kolačiće za prikazivanje oglasa na osnovu prethodnih poseta korisnika našoj veb stranici ili drugim veb stranicama. Možete se odjaviti od personalizovanog oglašavanja posetom Google-ovim podešavanjima za oglase. Za više informacija, molimo pregledajte Google-ovu Politiku privatnosti.\n- **Google Analytics:** Koristimo Google Analytics za analizu saobraćaja na veb stranici. Ova usluga prikuplja anonimne podatke i ne identifikuje pojedinačne korisnike. Za više informacija o tome kako Google koristi podatke, posetite "Kako Google koristi podatke kada koristite sajtove ili aplikacije naših partnera".\n\n**4. Sigurnost podataka**\nPosvećeni smo zaštiti vaših informacija. Vaši direktni unosi (pitanje, znak) se ne čuvaju trajno kod nas. Podaci koji se lokalno čuvaju na vašem uređaju su pod vašom kontrolom i možete ih obrisati u bilo kom trenutku brisanjem keša vašeg pregledača.\n\n**5. Vaša prava**\nImate potpunu kontrolu nad podacima koji se čuvaju u lokalnom skladištu vašeg pregledača. Ove podatke možete obrisati u bilo kom trenutku. Pošto ne vodimo korisničke naloge niti čuvamo lične podatke o čitanjima na našim serverima, ne postoje korisnički podaci koje biste mogli direktno tražiti ili brisati od nas.`,
        whatIsTarotTitle: "Šta je Tarot? Vodič za početnike",
        whatIsTarotContent: `## Šta je Tarot?\n\nTarot je špil od 78 karata, od kojih svaka ima svoje slike, simboliku i priču. Vekovima se koristi kao alat za proricanje i introspekciju, ali tarot se ne bavi toliko predviđanjem fiksne, nepromenljive budućnosti, koliko sticanjem uvida u sadašnji trenutak. To je ogledalo vaše podsvesti, koje odražava energije, prilike i izazove koji vas okružuju.\n\nStandardni tarot špil je podeljen na dva glavna dela:\n\n- **Velika Arkana:** Sastoji se od 22 karte, počevši od Lude i završavajući se sa Svetom. Ove karte predstavljaju značajne životne događaje, velike životne lekcije i široke, arhetipske teme ljudskog putovanja. Kada se karta Velike Arkane pojavi u čitanju, to često označava trenutak od velike važnosti ili veliku promenu na vašem životnom putu.\n\n- **Mala Arkana:** Sastoji se od 56 karata, podeljenih u četiri boje, slično kao u običnom špilu karata za igru. Svaka boja sadrži 14 karata: Keca, brojeve od Dva do Deset i četiri Dvorske karte (Paž, Vitez, Kraljica, Kralj).\n\n### Četiri Boje Male Arkane\n\nSvaka boja odgovara različitom aspektu ljudskog iskustva:\n\n- **Štapovi (Boja Vatre):** Predstavljaju strast, energiju, kreativnost i ambiciju. Karte Štapova se često odnose na vašu karijeru, projekte i lični pogon.\n- **Pehari (Boja Vode):** Predstavljaju emocije, odnose, intuiciju i ljubav. Karte Pehara bave se pitanjima srca i vašim emocionalnim blagostanjem.\n- **Mačevi (Boja Vazduha):** Predstavljaju misli, izazove, intelekt i sukob. Karte Mačeva često ukazuju na vaš način razmišljanja, komunikaciju i mentalne borbe sa kojima se možete suočiti.\n- **Diskovi (Boja Zemlje):** Predstavljaju materijalni svet, finansije, posao i fizičko zdravlje. Karte Diskova su utemeljene u vašoj svakodnevnoj stvarnosti i opipljivim ishodima.\n\n## Kako Funkcioniše Tarot Čitanje?\n\nTarot čitanje je dijalog između vas i karata. Počinjete sa pitanjem ili namerom. To fokusira energiju čitanja. Nakon mešanja špila, karte se postavljaju u određeni obrazac koji se naziva "otvaranje". Svaka pozicija u otvaranju odgovara različitom aspektu pitanja.\n\nOvde u Quick Tarot-u, koristimo jednostavno i moćno otvaranje od tri karte, koje se često tumači kao:\n\n1.  **Prošlost:** Osnovne energije ili događaji koji su doveli do trenutne situacije.\n2.  **Sadašnjost:** Trenutno stanje stvari i centralni izazov ili tema.\n3.  **Budućnost:** Potencijalni ishod ili pravac u kojem se stvari kreću ako se održi trenutni put.\n\nNaša veštačka inteligencija čita karte u kombinaciji, pletući njihova pojedinačna značenja u koherentan narativ koji se odnosi na vaše pitanje. Upravo interakcija između karata, njihovih pozicija i vaše sopstvene intuicije oživljava čitanje.\n\n## Kako Postaviti Dobra Pitanja\n\nKvalitet vašeg tarot čitanja često zavisi od kvaliteta vašeg pitanja. Najbolja pitanja su otvorenog tipa, fokusirana na vas i usredsređena na sticanje uvida, a ne na traženje jednostavnog odgovora "da" ili "ne".\n\n**Izbegavajte:** "Da li ću dobiti posao?"\n**Umesto toga, pitajte:** "Šta treba da znam da bih uspeo/la u potrazi za poslom?" ili "Koje prilike za rast nudi ovaj novi put u karijeri?"\n\n**Izbegavajte:** "Da li me voli?"\n**Umesto toga, pitajte:** "Kako mogu da negujem ljubavniji i podržavajući odnos?" ili "Kakva je priroda veze između nas?"\n\nKada svoja pitanja formulišete na način koji traži vođstvo i osnaživanje, otvarate se dubljim i korisnijim uvidima. Tarot je tu da vam pomogne da razumete sopstvenu moć i da se krećete svojim putem sa mudrošću i jasnoćom.`,
        cardMeaningsTitle: "Značenja Tarot Karata",
        cardMeaningsContent: `Ovde ćete pronaći kratak pregled svih 78 tarot karata.`,
        blogTitle: "Tarot Blog",
        blogContent: `Dobrodošli na naš blog! Ovde ćemo deliti članke, savete i dublje uvide u svet tarota. Proverite uskoro za naše prve objave!`,
        blogBackToBlog: "Nazad na Blog",
        blogRelatedArticles: "Povezani Članci",
        homeAdditionalContentTitle: "Istražite Svet Tarota",
        resetDialogTitle: "Da li ste sigurni?",
        resetDialogDescription: "Ovo će obrisati sve podatke aplikacije iz vašeg pregledača, uključujući poslednje čitanje i tajmer, i ponovo učitati stranicu.",
        resetDialogCancel: "Otkaži",
        resetDialogConfirm: "Resetuj",
        errorTitle: "Greška",
        unknownError: "Došlo je do nepoznate greške. Molimo pokušajte ponovo.",
        serviceOverloadedError: "Servis je trenutno preopterećen. Molimo pokušajte ponovo za nekoliko trenutaka.",
        countdownFinishedText: "Spremno za novo čitanje",
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
    }
};

export function getTranslations(lang: string): TranslationSet {
    const baseLang = lang.split('-')[0];
    // Fallback to 'sr' if a translation set for the given language doesn't exist.
    return ALL_TRANSLATIONS[baseLang] || ALL_TRANSLATIONS.sr;
}

    