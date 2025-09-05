
"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Sparkles, Loader2, Edit3, Timer } from "lucide-react";
import Image from "next/image";


import { getTarotReading, getUiTranslations } from "@/app/actions";
import { GenerateTarotReadingOutput } from "@/ai/flows/generate-tarot-reading";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast";
import { Logo } from "./logo";
import { TarotCard } from "./tarot-card";
import { AdPlaceholder } from "./ad-placeholder";
import { ZodiacWheel, ZODIAC_IMAGES, NATURAL_ORDER_EN } from "./zodiac-wheel";
import { getCardImagePath } from "@/lib/cards";
import { useIsMobile } from "@/hooks/use-mobile";
import { LanguageSelector, SUPPORTED_LANGUAGES } from "./language-selector";
import type { TranslateUIOutput } from "@/ai/flows/translate-ui-flow";
import { TranslatableTextsSchema } from "@/ai/schemas";


const FormSchema = z.object({
  question: z
    .string()
    .min(10, { message: "Question must be at least 10 characters." })
    .max(200, { message: "Question cannot be longer than 200 characters." }),
});

type FormValues = z.infer<typeof FormSchema>;

const READING_COOLDOWN_SECONDS = 120;
const COOLDOWN_STORAGE_KEY = "tarotCooldownEndTime";
const READING_STORAGE_KEY = "tarotReading";
const ZODIAC_STORAGE_KEY = "tarotZodiacSign";
const QUESTION_STORAGE_KEY = "tarotQuestion";
const LANGUAGE_STORAGE_KEY = "tarotLanguage";


const CARD_BACK = { name: "Card Back", imagePath: "/zodiac/cards/card_back.jpg" };

const BASE_TRANSLATIONS_EN: Omit<z.infer<typeof TranslatableTextsSchema>, 'headerTitle'> = {
    headerSubtitle: "Discover what the stars and cards have in store for you. Enter your sign and question to get your personalized tarot reading.",
    formZodiacLabel: "Your Sign",
    formZodiacPlaceholder: "Select a sign...",
    formZodiacError: "You must select a valid zodiac sign.",
    formQuestionLabel: "Your question for the cards",
    formQuestionPlaceholder: "What is troubling or interesting you?",
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
    aboutDialogTitle: "About The Quick Tarot App",
    aboutDialogContent: "Welcome to Quick Tarot, your digital window into the world of tarot cards. Our mission is to provide an intuitive and personalized tarot experience accessible to everyone, anywhere, anytime.\n\nUsing the power of artificial intelligence, our application generates unique and insightful tarot readings. Each reading is based on cards randomly drawn especially for you and your question, ensuring you receive a message that is meant for you.\n\nWe believe that tarot is not just about predicting the future, but a tool for self-reflection and a deeper understanding of the present. Whether you are looking for answers, inspiration, or simply want to explore your intuition, Quick Tarot is here to guide you.\n\nThank you for being part of our journey.",
    missionDialogTitle: "Our Mission",
    missionDialogContent: "Our mission is to demystify tarot and make it an accessible tool for personal growth and introspection. Through the fusion of ancient wisdom and modern technology, we aim to empower individuals to find clarity, make better decisions, and understand the deeper currents of their lives.\n\nWe strive to create a safe and supportive space where everyone can explore their intuition without prejudice.",
    faqDialogTitle: "Frequently Asked Questions",
    faqDialogContent: "Q: Are the readings truly random?\nA: Absolutely. For each new question, our system randomly selects three cards from a full 78-card deck, guaranteeing a unique and unbiased reading every time.\n\nQ: How often can I ask a question?\nA: To ensure the quality and meaningfulness of each reading, we have implemented a time limit. You can request a new reading every two minutes.\n\nQ: Is this real fortune-telling?\nA: We see tarot as a guide and a tool for self-reflection, rather than a concrete prediction of the future. The cards can help you see a situation from a new perspective and make decisions that are in line with your inner being.",
    termsDialogTitle: "Terms of Use",
    termsDialogContent: "By accessing and using the Quick Tarot application, you agree to the following terms:\n\n1. The service is provided 'as is'. Readings are generated by artificial intelligence and are for entertainment and introspective purposes only. They should not be considered professional, legal, medical, or financial advice.\n\n2. We assume no liability for any decisions you make based on the information obtained through our application.\n\n3. We reserve the right to modify or discontinue the service at any time without prior notice.\n\n4. We collect minimal data necessary for the application's functionality, as described in our privacy policy.",
    privacyDialogTitle: "Privacy Policy",
    privacyDialogContent: "This Privacy Policy explains how we collect, use, and protect your data.\n\n1. Data Collection: We only collect the necessary data for the application's functionality, such as your question and selected zodiac sign, which are not stored permanently. We use local storage in your browser to save your last reading and the time when you can request a new one.\n\n2. Google AdSense: We use Google AdSense to display advertisements. Google may use cookies to serve relevant ads based on your previous visits. You can find more information in Google's privacy policy.\n\n3. Security: We do not share your data with third parties, except as necessary to provide the service (e.g., Google AdSense).\n\n4. Your Rights: You have the right to delete data from local storage by clearing your browser's cache.",
    errorTitle: "Error",
    unknownError: "An unknown error occurred.",
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
};

const INITIAL_TRANSLATIONS: Omit<TranslateUIOutput, 'headerTitle'> & { headerTitle: string } = {
    ...BASE_TRANSLATIONS_EN,
    headerTitle: "Quick Tarot",
};


export default function TarotClient() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isFormLoading, setIsFormLoading] = React.useState(false);
  const [isTranslating, setIsTranslating] = React.useState(false);
  const [reading, setReading] = React.useState<GenerateTarotReadingOutput | null>(null);
  const [cardsFlipped, setCardsFlipped] = React.useState(false);
  const [typedReading, setTypedReading] = React.useState("");
  const [language, setLanguage] = React.useState('sr');
  const [translations, setTranslations] = React.useState<Omit<TranslateUIOutput, 'headerTitle'>>(INITIAL_TRANSLATIONS);
  const [countdown, setCountdown] = React.useState(0);
  const [selectedZodiacSign, setSelectedZodiacSign] = React.useState<string | undefined>(undefined);
  const [zodiacError, setZodiacError] = React.useState<string | null>(null);

  const resultsRef = React.useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      question: "",
    },
  });
  
  React.useEffect(() => {
    const savedLang = localStorage.getItem(LANGUAGE_STORAGE_KEY) || navigator.language.split('-')[0] || 'sr';
    handleLanguageChange(savedLang, true);

    const savedCooldown = localStorage.getItem(COOLDOWN_STORAGE_KEY);
    const savedReading = localStorage.getItem(READING_STORAGE_KEY);
    
    if (savedCooldown) {
      const remainingTime = Math.ceil((parseInt(savedCooldown, 10) - Date.now()) / 1000);
      if (remainingTime > 0) {
        setCountdown(remainingTime);
      } else {
        localStorage.removeItem(COOLDOWN_STORAGE_KEY);
      }
    }

    if (savedReading) {
      try {
        const parsedReading: GenerateTarotReadingOutput = JSON.parse(savedReading);
        setReading(parsedReading);
        
        const savedSignName = localStorage.getItem(ZODIAC_STORAGE_KEY);
        const savedQuestion = localStorage.getItem(QUESTION_STORAGE_KEY);

        if (savedSignName) setSelectedZodiacSign(savedSignName);
        if (savedQuestion) form.setValue('question', savedQuestion);

      } catch (e) {
        localStorage.removeItem(READING_STORAGE_KEY);
        localStorage.removeItem(ZODIAC_STORAGE_KEY);
        localStorage.removeItem(QUESTION_STORAGE_KEY);
      }
    }
    // No longer loading after initial setup
    // setIsLoading(false) is now called in handleLanguageChange
  }, []);
  
  React.useEffect(() => {
    if (!reading) {
        setCardsFlipped(false);
        return;
    };

    const flipTimeout = setTimeout(() => {
        setCardsFlipped(true);
    }, 500);
    
    setTypedReading("");
    let index = 0;
    const typingInterval = setInterval(() => {
      if(reading) {
        setTypedReading(reading.tarotReading.substring(0, index + 1));
        index++;
        if (index >= reading.tarotReading.length) {
          clearInterval(typingInterval);
        }
      }
    }, 20);

    return () => {
        clearInterval(typingInterval);
        clearTimeout(flipTimeout);
    };
  }, [reading]);

  React.useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown < 0) {
        setCountdown(0);
        localStorage.removeItem(COOLDOWN_STORAGE_KEY);
    }
  }, [countdown]);
  
  const zodiacSigns = React.useMemo(() => [
      translations.zodiacSignAries, translations.zodiacSignTaurus, translations.zodiacSignGemini,
      translations.zodiacSignCancer, translations.zodiacSignLeo, translations.zodiacSignVirgo,
      translations.zodiacSignLibra, translations.zodiacSignScorpio, translations.zodiacSignSagittarius,
      translations.zodiacSignCapricorn, translations.zodiacSignAquarius, translations.zodiacSignPisces,
  ], [translations]);

  const handleLanguageChange = async (langCode: string, isInitialLoad = false) => {
    if (!isInitialLoad) {
        setIsTranslating(true);
    }
    setLanguage(langCode);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, langCode);

    try {
        const targetLanguage = SUPPORTED_LANGUAGES.find(l => l.code === langCode)?.name || 'Serbian';
        const newTranslations = await getUiTranslations({
            texts: BASE_TRANSLATIONS_EN,
            language: targetLanguage,
        });
        setTranslations(newTranslations);
    } catch (error) {
        console.error("Failed to fetch translations:", error);
        toast({
            title: "Translation Error",
            description: "Could not load translations. Reverting to English.",
            variant: "destructive",
        });
        setTranslations(INITIAL_TRANSLATIONS); // Fallback to English
    } finally {
        if (isInitialLoad) {
            setIsLoading(false);
        }
        setIsTranslating(false);
    }
  };


  const onSubmit = async (data: FormValues) => {
    if (!selectedZodiacSign) {
        setZodiacError(translations.formZodiacError);
        return;
    }
    setZodiacError(null);

    setIsFormLoading(true);
    setReading(null);
    setTypedReading("");
    setCardsFlipped(false);
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);

    try {
      const targetLanguageName = SUPPORTED_LANGUAGES.find(l => l.code === language)?.name || 'Serbian';
      const result = await getTarotReading({
        ...data,
        zodiacSign: selectedZodiacSign,
        language: targetLanguageName,
      });
      setReading(result);
      
      const newCooldownEndTime = Date.now() + READING_COOLDOWN_SECONDS * 1000;
      localStorage.setItem(COOLDOWN_STORAGE_KEY, newCooldownEndTime.toString());
      localStorage.setItem(READING_STORAGE_KEY, JSON.stringify(result));
      localStorage.setItem(ZODIAC_STORAGE_KEY, selectedZodiacSign);
      localStorage.setItem(QUESTION_STORAGE_KEY, data.question);

      setCountdown(READING_COOLDOWN_SECONDS);

    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : translations.unknownError;
      toast({
        title: translations.errorTitle,
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
        setIsFormLoading(false);
    }
  };
  
  const resetForm = () => {
    setReading(null);
    setIsFormLoading(false);
    setCountdown(0);
    localStorage.removeItem(COOLDOWN_STORAGE_KEY);
    localStorage.removeItem(READING_STORAGE_KEY);
    localStorage.removeItem(ZODIAC_STORAGE_KEY);
    localStorage.removeItem(QUESTION_STORAGE_KEY);
    form.setValue('question', '');
    setSelectedZodiacSign(undefined);
    setZodiacError(null);
    form.clearErrors();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const handleTextareaKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
        const question = form.getValues('question');
        if (question.trim().endsWith('?')) {
            event.preventDefault();
            form.handleSubmit(onSubmit)();
        }
    }
  };
  
  const tarotCards = React.useMemo(() => {
    if (!reading) {
      return Array(3).fill(CARD_BACK);
    }
    return reading.cards.map((card) => ({
      name: card.name,
      imagePath: getCardImagePath(card.name),
    }));
  }, [reading]);


  const disabled = isLoading || isFormLoading || countdown > 0 || isTranslating;
  
  const submittedValues = form.watch();
  const selectedSign = selectedZodiacSign;
  const naturalOrder = zodiacSigns;
  const selectedEnglishSign = selectedSign ? NATURAL_ORDER_EN[naturalOrder.indexOf(selectedSign as any)] : undefined;
  const selectedImage = selectedEnglishSign ? ZODIAC_IMAGES[selectedEnglishSign] : undefined;
  
  const isReadyForNewReading = countdown === 0 && !isFormLoading && reading;
  const showMinimizedView = isFormLoading || reading;
  
  const minimizedView = (
    <div className="fixed top-0 left-0 right-0 z-20 h-20 bg-background/80 backdrop-blur-sm border-b border-primary/20 animate-in fade-in slide-in-from-top-4 duration-500">
        <div className="container mx-auto flex h-full max-w-5xl items-center justify-between gap-4 px-4 relative">
            
             <div className="flex w-full items-center justify-start gap-3 sm:w-1/3">
                {showMinimizedView && selectedImage && submittedValues.question && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <div className="flex items-center gap-3 animate-in fade-in cursor-pointer group">
                         <div className="w-12 h-12 rounded-full flex items-center justify-center p-0.5 bg-background border-2 border-primary">
                             <div className="w-full h-full rounded-full flex items-center justify-center p-1 bg-transparent">
                                <Image src={selectedImage} alt={selectedSign || ''} width={24} height={24} className="h-6 w-6" unoptimized />
                            </div>
                          </div>
                          <p className="text-sm font-medium text-foreground/80 truncate group-hover:text-primary transition-colors">
                              {submittedValues.question.length > (isMobile ? 20 : 30)
                                ? `${submittedValues.question.substring(0, isMobile ? 20 : 30)}...`
                                : submittedValues.question}
                          </p>
                      </div>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>{translations.formQuestionLabel}</AlertDialogTitle>
                      </AlertDialogHeader>
                       <div className="space-y-4 pt-4 text-left text-sm text-muted-foreground">
                          {submittedValues.question}
                        </div>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Zatvori</AlertDialogCancel>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
            </div>

            <div className="hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center md:flex gap-4">
               <Logo className="h-20 w-20 text-primary" />
               <span className="font-headline text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent via-primary to-accent">Quick Tarot</span>
            </div>

            <div className="flex w-full items-center justify-end gap-2 sm:w-1/3">
                 {isReadyForNewReading ? (
                     <div className="flex items-center justify-end w-full">
                         {isMobile ? (
                            <button onClick={resetForm} className="block text-primary hover:text-primary/80 transition-colors p-0" aria-label="Novo čitanje">
                               <Logo className="w-12 h-12" />
                            </button>
                         ) : (
                            <button onClick={resetForm} className="text-primary font-bold text-sm leading-tight hover:underline">
                               {translations.countdownFinishedText}
                            </button>
                         )}
                     </div>
                 ) : (
                    <div className="flex items-center gap-2">
                     {countdown > 0 && (
                       <div className="text-primary font-mono text-sm flex items-center gap-2">
                         <Timer className="h-4 w-4" />
                         <span>
                            {`${Math.floor(countdown / 60).toString().padStart(2, '0')}:${(countdown % 60).toString().padStart(2, '0')}`}
                         </span>
                       </div>
                     )}
                     <Button variant="ghost" size="icon" onClick={resetForm} disabled={isFormLoading || countdown > 0} className="text-primary hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed">
                       <Edit3 className="h-[1.2rem] w-[1.2rem]" />
                       <span className="sr-only">Edit</span>
                     </Button>
                   </div>
                 )}
            </div>
        </div>
    </div>
  );
  
  const resultsContent = (
    <section
      ref={resultsRef}
      className="w-full max-w-4xl text-center scroll-mt-8"
    >
      {(isFormLoading || reading) && (
        <>
          <h2 className="font-headline text-3xl font-bold text-primary">
            {translations.resultsTitle}
          </h2>
          <div className="mt-6 flex flex-wrap items-start justify-center gap-4 sm:gap-6">
            <TarotCard
              isFlipped={cardsFlipped}
              delay={0}
              card={tarotCards[0]}
            />
            <TarotCard
              isFlipped={cardsFlipped}
              delay={150}
              card={tarotCards[1]}
            />
            <TarotCard
              isFlipped={cardsFlipped}
              delay={300}
              card={tarotCards[2]}
            />
          </div>

          {isFormLoading && !reading && (
             <div className="mt-8 flex w-full max-w-md mx-auto flex-col items-center justify-center gap-4 text-lg text-muted-foreground">
              <Sparkles className="h-8 w-8 animate-pulse text-primary" />
              <p className="text-center font-semibold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">
                {translations.resultsLoadingText}
              </p>
            </div>
          )}

          {reading && (
            <>
              <Card className="mt-8 bg-transparent border-primary/20 shadow-primary/10 shadow-lg">
                <CardHeader>
                    <CardTitle>{translations.resultsReadingTitle}</CardTitle>
                </CardHeader>
                <CardContent className="p-6 text-left">
                  <p className="whitespace-pre-wrap font-body text-base leading-relaxed text-foreground/90 md:text-lg">
                    {typedReading}
                  </p>
                </CardContent>
              </Card>
            </>
          )}
        </>
      )}
    </section>
  );

  if (isLoading) {
    return (
      <div className="flex w-full h-screen flex-col items-center justify-center gap-8 py-10">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }
  
  const footerContent = (
    <footer className="w-full flex-col items-center gap-6 flex shrink-0">
      <AdPlaceholder />
       <div className="flex flex-col items-center gap-4 text-center">
        <div className="mb-4">
            <LanguageSelector selectedLanguage={language} onLanguageChange={handleLanguageChange} disabled={disabled} />
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap justify-center">
          <Dialog>
            <DialogTrigger asChild>
              <button className="underline hover:text-primary transition-colors">
                {translations.footerAbout}
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{translations.aboutDialogTitle}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4 text-left text-sm text-muted-foreground">
                {translations.aboutDialogContent.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </DialogContent>
          </Dialog>
          <span className="text-muted-foreground/50 hidden sm:inline">|</span>
          <Dialog>
            <DialogTrigger asChild>
              <button className="underline hover:text-primary transition-colors">
                {translations.footerMission}
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{translations.missionDialogTitle}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4 text-left text-sm text-muted-foreground">
                {translations.missionDialogContent.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </DialogContent>
          </Dialog>
          <span className="text-muted-foreground/50 hidden sm:inline">|</span>
          <Dialog>
            <DialogTrigger asChild>
              <button className="underline hover:text-primary transition-colors">
                {translations.footerFaq}
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{translations.faqDialogTitle}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4 text-left text-sm text-muted-foreground">
                {translations.faqDialogContent.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="whitespace-pre-wrap">{paragraph}</p>
                ))}
              </div>
            </DialogContent>
          </Dialog>
          <span className="text-muted-foreground/50 hidden sm:inline">|</span>
           <Dialog>
            <DialogTrigger asChild>
              <button className="underline hover:text-primary transition-colors">
                {translations.footerTerms}
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{translations.termsDialogTitle}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4 text-left text-sm text-muted-foreground">
                {translations.termsDialogContent.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="whitespace-pre-wrap">{paragraph}</p>
                ))}
              </div>
            </DialogContent>
          </Dialog>
          <span className="text-muted-foreground/50 hidden sm:inline">|</span>
           <Dialog>
            <DialogTrigger asChild>
              <button className="underline hover:text-primary transition-colors">
                {translations.footerPrivacy}
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{translations.privacyDialogTitle}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4 text-left text-sm text-muted-foreground">
                {translations.privacyDialogContent.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="whitespace-pre-wrap">{paragraph}</p>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <span className="text-sm text-muted-foreground">
           © {new Date().getFullYear()} Quick Tarot. {translations.footerCopyright}
        </span>
      </div>
    </footer>
  );

  if (isMobile) {
    return (
      <div className="flex min-h-screen w-full flex-col justify-between px-4">
        {showMinimizedView && minimizedView}
        <main className={`flex-grow flex flex-col w-full ${showMinimizedView ? 'pt-24' : ''}`}>
            <div className="flex flex-col flex-grow justify-center">
              {!showMinimizedView ? (
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col items-center gap-6 w-full"
                  >
                      <header className="flex w-full flex-col items-center text-center">
                        <div className="flex justify-center items-center w-full">
                           <Logo className="h-20 w-20 text-primary" />
                        </div>
                        <h1 className="font-headline text-4xl font-bold tracking-tight text-transparent sm:text-5xl bg-clip-text bg-gradient-to-r from-accent via-primary to-accent">
                          Quick Tarot
                        </h1>
                      </header>

                      <div className="w-full">
                        <div className="flex flex-col items-center">
                            <ZodiacWheel
                              signs={zodiacSigns}
                              onSelect={setSelectedZodiacSign}
                              selectedValue={selectedZodiacSign}
                              disabled={disabled}
                            />
                            {zodiacError && <p className="text-center mt-4 text-primary font-medium">{zodiacError}</p>}
                        </div>
                      </div>
                      
                      <div className="w-full">
                        <div className="w-full max-w-md space-y-4 lg:mt-0 mx-auto">
                          <FormField
                            control={form.control}
                            name="question"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="w-full block text-right font-bold text-primary">
                                  {translations.formQuestionLabel}
                                </FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder={translations.formQuestionPlaceholder}
                                    {...field}
                                    disabled={disabled}
                                    onKeyDown={handleTextareaKeyDown}
                                  />
                                </FormControl>
                                <FormMessage className="text-primary" />
                              </FormItem>
                            )}
                          />
                          <Button
                            type="submit"
                            className="w-full font-bold"
                            disabled={disabled}
                            size="lg"
                          >
                            {isFormLoading || isTranslating ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                {translations.buttonLoading}
                              </>
                            ) : countdown > 0 ? (
                              <div className="flex items-center gap-2">
                                <Timer className="h-4 w-4" />
                                <span>{`${Math.floor(countdown / 60)
                                  .toString()
                                  .padStart(2, '0')}:${(countdown % 60).toString().padStart(2, '0')}`}</span>
                              </div>
                            ) : (
                              <>{translations.buttonDefault}</>
                            )}
                          </Button>
                        </div>
                      </div>
                  </form>
                </Form>
              ) : (
                <div className="py-8 sm:py-12">
                   {resultsContent}
                </div>
              )}
           </div>
        </main>
        <div className="pb-8 pt-4">
            {footerContent}
        </div>
      </div>
    );
  }

  // Desktop Layout
  return (
    <div className="flex w-full flex-col items-center gap-10 py-8 sm:py-12 px-4 min-h-screen justify-between">
      <main className={`flex-grow w-full ${showMinimizedView ? 'pt-24' : ''}`}>
        {showMinimizedView && minimizedView}
        <div className="w-full">
          {!showMinimizedView ? (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full max-w-5xl mx-auto lg:grid lg:grid-cols-[472px_1fr] lg:items-start"
              >
                {/* Left Column: Zodiac Wheel */}
                <div className="w-full lg:sticky lg:top-28">
                  <div className="flex flex-col items-center">
                      <ZodiacWheel
                        signs={zodiacSigns}
                        onSelect={setSelectedZodiacSign}
                        selectedValue={selectedZodiacSign}
                        disabled={disabled}
                      />
                      {zodiacError && <p className="text-center mt-4 text-primary font-medium">{zodiacError}</p>}
                  </div>
                </div>

                {/* Right Column: Header and Form */}
                <div className="flex flex-col h-full mt-12 lg:mt-0">
                  <header className="flex w-full flex-col items-center text-center">
                      <div className="flex flex-col items-center">
                          <Logo className="h-28 w-28 text-primary" />
                          <h1 className="font-headline text-4xl font-bold tracking-tight text-transparent sm:text-5xl bg-clip-text bg-gradient-to-r from-accent via-primary to-accent">
                            Quick Tarot
                          </h1>
                      </div>
                      <p className="mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg">
                          {translations.headerSubtitle}
                      </p>
                  </header>
                  
                  <div className="flex-grow"></div>

                  <div className="w-full max-w-md space-y-8 lg:mt-0 mx-auto">
                      <FormField
                        control={form.control}
                        name="question"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="w-full block text-right font-bold text-primary">
                              {translations.formQuestionLabel}
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder={translations.formQuestionPlaceholder}
                                {...field}
                                disabled={disabled}
                                onKeyDown={handleTextareaKeyDown}
                              />
                            </FormControl>
                            <FormMessage className="text-primary" />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="submit"
                        className="w-full font-bold"
                        disabled={disabled}
                        size="lg"
                      >
                        {isFormLoading || isTranslating ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {translations.buttonLoading}
                          </>
                        ) : countdown > 0 ? (
                          <div className="flex items-center gap-2">
                            <Timer className="h-4 w-4" />
                            <span>{`${Math.floor(countdown / 60)
                              .toString()
                              .padStart(2, '0')}:${(countdown % 60).toString().padStart(2, '0')}`}</span>
                          </div>
                        ) : (
                          <>{translations.buttonDefault}</>
                        )}
                      </Button>
                    </div>
                </div>
              </form>
            </Form>
          ) : (
            resultsContent
          )}
        </div>
      </main>

      {footerContent}
    </div>
  );
}
