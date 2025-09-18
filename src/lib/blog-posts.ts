
export interface BlogPost {
  title: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  content: string;
  internalLinks: { title: string; slug: string }[];
}

export const blogPosts: BlogPost[] = [
  {
    "title": "Šta je tarot i kako funkcioniše?",
    "slug": "sta-je-tarot",
    "metaTitle": "Šta je tarot i kako funkcioniše?",
    "metaDescription": "Saznajte šta je tarot, kako funkcioniše i kako može pomoći u introspektivi i donošenju odluka.",
    "keywords": ["tarot", "uvod u tarot", "karte", "tumačenje karata", "introspektiva"],
    "content": "<p>Tarot je drevni sistem karata koji se koristi za introspektivu, samopomoć i tumačenje života. Svaka karta nosi simboliku i značenja koja pomažu u razumevanju emocionalnih, mentalnih i praktičnih situacija...</p>",
    "internalLinks": [
      {"title": "Kako postaviti pravo pitanje kartama", "slug": "kako-postaviti-pravo-pitanje"},
      {"title": "Razlika između tarota i astrologije", "slug": "razlika-tarot-astrologija"}
    ]
  },
  {
    "title": "Kako postaviti pravo pitanje kartama",
    "slug": "kako-postaviti-pravo-pitanje",
    "metaTitle": "Kako postaviti pravo pitanje kartama – vodič",
    "metaDescription": "Naučite kako postaviti jasna i fokusirana pitanja tarot kartama za precizno tumačenje.",
    "keywords": ["tarot pitanja", "postavljanje pitanja", "tumačenje karata", "vodič tarot"],
    "content": "<p>Postavljanje pravog pitanja ključ je preciznog tarot čitanja. Dobra pitanja su jasna, fokusirana i otvorena za introspektivu...</p>",
    "internalLinks": [
      {"title": "Šta je tarot i kako funkcioniše?", "slug": "sta-je-tarot"}
    ]
  },
  {
    "title": "Razlika između tarota i astrologije",
    "slug": "razlika-tarot-astrologija",
    "metaTitle": "Tarot vs Astrologija – razlike i primena",
    "metaDescription": "Saznajte razliku između tarota i astrologije i kada koristiti jedan ili drugi sistem.",
    "keywords": ["tarot vs astrologija", "razlika tarot astrologija", "tumačenje karata", "horoskop", "introspektiva"],
    "content": "<p>Tarot i astrologija su dva različita sistema za sagledavanje života i donošenje odluka...</p>",
    "internalLinks": [
      {"title": "Šta je tarot i kako funkcioniše?", "slug": "sta-je-tarot"}
    ]
  },
  {
    "title": "Etika u tarot čitanju",
    "slug": "etika-u-tarot-citanju",
    "metaTitle": "Etika u tarot čitanju – vodič za praktikante",
    "metaDescription": "Naučite osnovna pravila etike u tarot čitanju, poštovanje privatnosti i odgovornost u savetovanju.",
    "keywords": ["etika tarot", "pravila tarot", "saveti za praktikante", "tumačenje karata", "introspektiva"],
    "content": "<p>Etika u tarot čitanju podrazumeva poštovanje privatnosti klijenta, odgovornost za reči i granice u savetovanju...</p>",
    "internalLinks": [
      {"title": "Najčešće greške početnika u tarotu", "slug": "najcesce-greske-pocetnika"}
    ]
  },
  {
    "title": "Pregled svih 78 karata – kratka objašnjenja",
    "slug": "pregled-svih-karata",
    "metaTitle": "Pregled svih 78 tarot karata – vodič",
    "metaDescription": "Upoznajte sve karte tarota sa kratkim objašnjenjima za Veliku i Malu Arkanu.",
    "keywords": ["pregled tarot karata", "78 karata", "Velika Arkana", "Mala Arkana", "vodič tarot"],
    "content": "<p>Tarot špil ima 78 karata: 22 Velike Arkane i 56 Mala Arkane...</p>",
    "internalLinks": [
      {"title": "Velika Arkana", "slug": "velika-arkana"},
      {"title": "Mala Arkana – Štapovi", "slug": "mala-arkana-stapovi"}
    ]
  },
  {
    "title": "Velika Arkana – 22 karte i njihova značenja",
    "slug": "velika-arkana",
    "metaTitle": "Velika Arkana – značenja 22 karte",
    "metaDescription": "Vodič kroz 22 karte Velike Arkane i njihova značenja za introspektivu i čitanje života.",
    "keywords": ["velika arkana", "karte sudbine", "tumačenje karata", "tarot vodič", "intuicija"],
    "content": "<p>Velika Arkana se sastoji od 22 karte koje predstavljaju sudbinske događaje i životne lekcije...</p>",
    "internalLinks": [
      {"title": "Pregled svih 78 karata", "slug": "pregled-svih-karata"}
    ]
  },
  {
    "title": "Mala Arkana – Štapovi (Wands)",
    "slug": "mala-arkana-stapovi",
    "metaTitle": "Mala Arkana – Štapovi",
    "metaDescription": "Saznajte značenje karata Štapova u Maloj Arkani, simboliku inicijative, strasti i akcije.",
    "keywords": ["Štapovi", "Mala Arkana", "tarot karta", "kreativnost", "akcija"],
    "content": "<p>Štapovi simbolizuju inicijativu, akciju, kreativnost i strast...</p>",
    "internalLinks": [
      {"title": "Pregled svih 78 karata", "slug": "pregled-svih-karata"}
    ]
  },
  {
    "title": "Mala Arkana – Pehari (Cups)",
    "slug": "mala-arkana-pehari",
    "metaTitle": "Mala Arkana – Pehari",
    "metaDescription": "Saznajte značenje karata Pehara u ljubavi, emocijama i duhovnosti.",
    "keywords": ["Pehari", "Mala Arkana", "ljubav", "emocije", "tarot karta"],
    "content": "<p>Pehari simbolizuju emocije, ljubav, povezivanje i duhovnost...</p>",
    "internalLinks": [
      {"title": "Tarot i ljubav", "slug": "tarot-i-ljubav"}
    ]
  },
  {
    "title": "Mala Arkana – Mačevi (Swords)",
    "slug": "mala-arkana-macevi",
    "metaTitle": "Mala Arkana – Mačevi",
    "metaDescription": "Saznajte značenje karata Mačeva u intelektualnim i mentalnim izazovima.",
    "keywords": ["Mačevi", "Mala Arkana", "um", "odluke", "konflikti"],
    "content": "<p>Mačevi simbolizuju um, komunikaciju, odluke i konflikte...</p>",
    "internalLinks": []
  },
  {
    "title": "Mala Arkana – Pentakli (Pentacles)",
    "slug": "mala-arkana-pentakli",
    "metaTitle": "Mala Arkana – Pentakli",
    "metaDescription": "Saznajte značenje karata Pentakli u materijalnim aspektima, poslu i novcu.",
    "keywords": ["Pentakli", "Mala Arkana", "novac", "posao", "stabilnost"],
    "content": "<p>Pentakli simbolizuju materijalne aspekte života, novac, posao i stabilnost...</p>",
    "internalLinks": []
  },
  {
    "title": "Top 10 najpoznatijih tarot otvaranja",
    "slug": "top-10-tarot-otvaranja",
    "metaTitle": "Top 10 najpoznatijih tarot otvaranja",
    "metaDescription": "Vodič kroz najpoznatija tarot otvaranja, uključujući Celtic Cross, Tri karte i Horseshoe.",
    "keywords": ["tarot otvaranja", "Celtic Cross", "Tri karte", "Horseshoe", "vodič otvaranja"],
    "content": "<p>Najpoznatija otvaranja uključuju Celtic Cross, Tri karte, Horseshoe i dr...</p>",
    "internalLinks": []
  },
  {
    "title": "Kako izabrati pravo otvaranje za vaše pitanje",
    "slug": "kako-izabrati-pravo-otvaranje",
    "metaTitle": "Kako izabrati pravo otvaranje za tarot pitanje",
    "metaDescription": "Saznajte kako odabrati odgovarajuće tarot otvaranje prema pitanju i vrsti situacije.",
    "keywords": ["tarot otvaranje", "izbor otvaranja", "vodič za otvaranja", "tumačenje karata", "introspektiva"],
    "content": "<p>Izbor otvaranja zavisi od složenosti pitanja, tipa situacije, broja karata i intuicije...</p>",
    "internalLinks": [
      {"title": "Top 10 najpoznatijih tarot otvaranja", "slug": "top-10-tarot-otvaranja"}
    ]
  },
  {
    "title": "Tarot otvaranja za ljubav i odnose",
    "slug": "tarot-otvaranja-ljubav-odnosi",
    "metaTitle": "Tarot otvaranja za ljubav i odnose",
    "metaDescription": "Saznajte kako koristiti tarot otvaranja za ljubavne i emotivne situacije.",
    "keywords": ["tarot ljubav", "otvaranja za ljubav", "emocije tarot", "vodič tarot", "veze"],
    "content": "<p>Ova otvaranja pomažu u sagledavanju emotivnih veza i dinamike u partnerstvu...</p>",
    "internalLinks": [
      {"title": "Mala Arkana – Pehari", "slug": "mala-arkana-pehari"}
    ]
  },
  {
    "title": "Tarot otvaranja za posao i finansije",
    "slug": "tarot-otvaranja-posao-finansije",
    "metaTitle": "Tarot otvaranja za posao i finansije",
    "metaDescription": "Otvaranja koja pomažu u sagledavanju profesionalnih i finansijskih situacija.",
    "keywords": ["tarot karijera", "finansije tarot", "otvaranja posao", "Mala Arkana Pentakli", "vodič tarot"],
    "content": "<p>Ova otvaranja omogućavaju sagledavanje profesionalnih i finansijskih aspekata života...</p>",
    "internalLinks": [
      {"title": "Mala Arkana – Pentakli", "slug": "mala-arkana-pentakli"},
      {"title": "Kako izabrati pravo otvaranje za vaše pitanje", "slug": "kako-izabrati-pravo-otvaranje"}
    ]
  },
  {
    "title": "Jednostavna dnevna otvaranja za introspektivu",
    "slug": "jednostavna-dnevna-otvaranja",
    "metaTitle": "Jednostavna dnevna tarot otvaranja",
    "metaDescription": "Dnevna otvaranja sa jednom ili tri karte za introspektivu i praćenje emocionalnih obrazaca.",
    "keywords": ["dnevna otvaranja", "introspektiva tarot", "samopomoć tarot", "karte", "vodič"],
    "content": "<p>Dnevna otvaranja sa jednom ili tri karte pomažu introspektivi i praćenju emocionalnih i mentalnih obrazaca...</p>",
    "internalLinks": [
      {"title": "Top 10 najpoznatijih tarot otvaranja", "slug": "top-10-tarot-otvaranja"}
    ]
  },
  {
    "title": "Tarot i ljubav: kako tumačiti karte u emotivnom kontekstu",
    "slug": "tarot-i-ljubav",
    "metaTitle": "Tarot i ljubav",
    "metaDescription": "Kako koristiti tarot karte za ljubav i emotivne odnose.",
    "keywords": ["tarot ljubav", "Pehari", "emocije", "odnosi", "tumačenje karata"],
    "content": "<p>Karte Pehara i Velika Arkana pomažu u sagledavanju ljubavnih odnosa i emocija...</p>",
    "internalLinks": [
      {"title": "Mala Arkana – Pehari", "slug": "mala-arkana-pehari"}
    ]
  },
  {
    "title": "Tarot i karijera: karte koje govore o poslu i novcu",
    "slug": "tarot-i-karijera",
    "metaTitle": "Tarot i karijera",
    "metaDescription": "Kako koristiti tarot karte za profesionalne i finansijske odluke.",
    "keywords": ["tarot karijera", "Pentakli", "posao", "finansije", "vodič tarot"],
    "content": "<p>Karte Pentakli i Velika Arkana daju uvid u profesionalne i finansijske aspekte života...</p>",
    "internalLinks": [
      {"title": "Mala Arkana – Pentakli", "slug": "mala-arkana-pentakli"}
    ]
  },
  {
    "title": "Tarot i lični razvoj: kako koristiti karte za samopomoć",
    "slug": "tarot-i-licni-razvoj",
    "metaTitle": "Tarot i lični razvoj",
    "metaDescription": "Kako koristiti tarot karte za introspektivu, samopomoć i lični rast.",
    "keywords": ["tarot lični razvoj", "samopomoć tarot", "introspektiva", "tumačenje karata", "vodič"],
    "content": "<p>Tarot je moćan alat za introspektivu i lični razvoj...</p>",
    "internalLinks": [
      {"title": "Jednostavna dnevna otvaranja za introspektivu", "slug": "jednostavna-dnevna-otvaranja"}
    ]
  },
  {
    "title": "Kako očistiti i energizovati tarot špil – rituali i metode",
    "slug": "ocistiti-energetizovati-tarot",
    "metaTitle": "Kako očistiti i energizovati tarot špil",
    "metaDescription": "Saznajte kako očistiti i energizovati tarot špil pomoću rituala, kristala i vizualizacije.",
    "keywords": ["očistiti tarot špil", "energizovati tarot", "rituali tarot", "čišćenje špila", "samopomoć"],
    "content": "<p>Čišćenje i energizovanje špila pomaže uklanjanju negativne energije i jačanju intuicije...</p>",
    "internalLinks": [
      {"title": "Etika u tarot čitanju", "slug": "etika-u-tarot-citanju"}
    ]
  },
  {
    "title": "Najčešće greške početnika u tarotu i kako ih izbeći",
    "slug": "najcesce-greske-pocetnika",
    "metaTitle": "Najčešće greške početnika u tarotu",
    "metaDescription": "Saznajte koje su najčešće greške početnika u tarotu i kako ih izbeći za precizno čitanje.",
    "keywords": ["greške početnika tarot", "saveti tarot", "tumačenje karata", "vodič tarot", "samopomoć"],
    "content": "<p>Početnici često prave greške koje utiču na preciznost čitanja. Najčešće greške uključuju: nedostatak pripreme, nejasna pitanja, ignorisanje intuicije...</p>",
    "internalLinks": [
      {"title": "Etika u tarot čitanju", "slug": "etika-u-tarot-citanju"},
      {"title": "Kako očistiti i energizovati tarot špil", "slug": "ocistiti-energetizovati-tarot"}
    ]
  }
];

    