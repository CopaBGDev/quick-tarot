
"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Sparkles, Loader2, Edit3, Timer, ArrowRight } from "lucide-react";
import Image from "next/image";


import { getTarotReading } from "@/app/actions";
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
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast";
import { ZodiacSign } from "@/lib/zodiac";
import { Logo } from "./logo";
import { TarotCard } from "./tarot-card";
import { AdPlaceholder } from "./ad-placeholder";
import { getTranslations, Translations } from "@/lib/translations";
import { ZodiacWheel, ZODIAC_IMAGES, NATURAL_ORDER_EN } from "./zodiac-wheel";
import { getCardImagePath } from "@/lib/cards";
import { useIsMobile } from "@/hooks/use-mobile";

const FormSchema = z.object({
  question: z
    .string()
    .min(10, { message: "Pitanje mora imati najmanje 10 karaktera." })
    .max(200, { message: "Pitanje ne može biti duže od 200 karaktera." }),
});

type FormValues = z.infer<typeof FormSchema>;

const READING_COOLDOWN_SECONDS = 120;
const COOLDOWN_STORAGE_KEY = "tarotCooldownEndTime";
const READING_STORAGE_KEY = "tarotReading";
const ZODIAC_STORAGE_KEY = "tarotZodiacSign";
const QUESTION_STORAGE_KEY = "tarotQuestion";


const CARD_BACK = { name: "Card Back", imagePath: "/zodiac/cards/card_back.jpg" };

export default function TarotClient() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isFormLoading, setIsFormLoading] = React.useState(false);
  const [reading, setReading] = React.useState<GenerateTarotReadingOutput | null>(null);
  const [cardsFlipped, setCardsFlipped] = React.useState(false);
  const [typedReading, setTypedReading] = React.useState("");
  const [language, setLanguage] = React.useState('sr');
  const [translations, setTranslations] = React.useState<Translations>(getTranslations('sr'));
  const [zodiacSigns, setZodiacSigns] = React.useState<readonly ZodiacSign[]>(getTranslations('sr').zodiacSigns);
  const [countdown, setCountdown] = React.useState(0);
  const [selectedZodiacSign, setSelectedZodiacSign] = React.useState<ZodiacSign | undefined>(undefined);
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
    const userLang = navigator.language.split('-')[0] || 'sr';
    const newTranslations = getTranslations(userLang);
    setLanguage(userLang);
    setTranslations(newTranslations);
    setZodiacSigns(newTranslations.zodiacSigns);

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
        // Find the sign object from the current translations
        const savedSign = newTranslations.zodiacSigns.find(sign => sign === savedSignName);

        const savedQuestion = localStorage.getItem(QUESTION_STORAGE_KEY);

        if (savedSign) setSelectedZodiacSign(savedSign);
        if (savedQuestion) form.setValue('question', savedQuestion);

      } catch (e) {
        localStorage.removeItem(READING_STORAGE_KEY);
        localStorage.removeItem(ZODIAC_STORAGE_KEY);
        localStorage.removeItem(QUESTION_STORAGE_KEY);
      }
    }
    setIsLoading(false);
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

  React.useEffect(() => {
        const newTranslations = getTranslations(language);
        setTranslations(newTranslations);
        setZodiacSigns(newTranslations.zodiacSigns);

        const { question: currentQuestion } = form.getValues();
        form.reset({
            question: currentQuestion
        }, {
            keepErrors: true,
            keepDirty: true,
            keepValues: true
        });
  }, [language, form]);

  const onSubmit = async (data: FormValues) => {
    if (!selectedZodiacSign) {
        setZodiacError(translations.form.zodiac.error);
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
      const result = await getTarotReading({
        ...data,
        zodiacSign: selectedZodiacSign,
        language,
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


  const disabled = isLoading || isFormLoading || countdown > 0;
  
  const submittedValues = form.watch();
  const selectedSign = selectedZodiacSign;
  const isSerbian = zodiacSigns[0] === 'Ovan';
  const naturalOrder = isSerbian ? getTranslations('sr').zodiacSigns : getTranslations('en').zodiacSigns;
  const selectedEnglishSign = selectedSign ? NATURAL_ORDER_EN[naturalOrder.indexOf(selectedSign as any)] : undefined;
  const selectedImage = selectedEnglishSign ? ZODIAC_IMAGES[selectedEnglishSign] : undefined;
  
  const isReadyForNewReading = countdown === 0 && !isFormLoading && reading;
  const showMinimizedView = isFormLoading || reading;
  
  const minimizedView = (
    <div className="fixed top-0 left-0 right-0 z-20 h-20 bg-background/80 backdrop-blur-sm border-b border-primary/20 animate-in fade-in slide-in-from-top-4 duration-500">
        <div className="container mx-auto flex h-full max-w-5xl items-center justify-between gap-4 px-4">
            
            {/* Left side: Sign and Question */}
             <div className="flex w-full items-center justify-start gap-3 sm:w-1/3">
                {showMinimizedView && selectedImage && submittedValues.question && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <div className="flex items-center gap-3 animate-in fade-in cursor-pointer group">
                          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center ring-1 ring-primary/50 ring-offset-1 ring-offset-background flex-shrink-0">
                             <Image src={selectedImage} alt={selectedSign || ''} width={20} height={20} className="h-5 w-5" unoptimized />
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
                        <AlertDialogTitle>{translations.form.question.label}</AlertDialogTitle>
                        <AlertDialogDescription className="pt-2">
                          {submittedValues.question}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Zatvori</AlertDialogCancel></AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
            </div>

             {/* Center: Title (Desktop only) */}
            <div className="hidden flex-1 items-center justify-center md:flex">
                <h1 className="font-headline text-xl sm:text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-accent via-primary to-accent">
                    Quick Tarot
                </h1>
            </div>

            {/* Right Side: Timer / Actions */}
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
            {translations.results.title}
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
                {translations.results.loadingText}
              </p>
            </div>
          )}

          {reading && (
            <>
              <Card className="mt-8 bg-transparent border-primary/20 shadow-primary/10 shadow-lg">
                <CardHeader>
                    <CardTitle>{translations.results.readingTitle}</CardTitle>
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

  if (isMobile === undefined || isLoading) {
    return (
      <div className="flex w-full h-screen flex-col items-center justify-center gap-8 py-10">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }
  
  const footerContent = (
    <footer className="w-full flex-col items-center gap-6 flex shrink-0">
      <AdPlaceholder />
       <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <span>
           © {new Date().getFullYear()} Quick Tarot. {translations.footer.copyright}
        </span>
        <span className="text-muted-foreground/50">|</span>
         <Dialog>
          <DialogTrigger asChild>
            <button className="underline hover:text-primary transition-colors">
              {translations.footer.about}
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{translations.aboutDialog.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4 text-left text-sm text-muted-foreground">
              {translations.aboutDialog.content.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </footer>
  );

  if (isMobile) {
    return (
      <div className="flex min-h-screen w-full flex-col px-4">
        {showMinimizedView && minimizedView}
        <div className={`flex-grow flex flex-col w-full ${showMinimizedView ? 'pt-24' : ''}`}>
          {!showMinimizedView ? (
            <div className="flex flex-grow flex-col justify-center">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col items-center gap-6 w-full"
                >
                    <header className="flex w-full flex-col items-center text-center">
                      <div className="flex flex-col items-center">
                        <Logo className="h-28 w-28 text-primary" />
                        <h1 className="font-headline text-4xl font-bold tracking-tight text-transparent sm:text-5xl bg-clip-text bg-gradient-to-r from-accent via-primary to-accent">
                          {translations.header.title}
                        </h1>
                      </div>
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
                                {translations.form.question.label}
                              </FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder={translations.form.question.placeholder}
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
                          {isFormLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              {translations.button.loading}
                            </>
                          ) : countdown > 0 ? (
                            <div className="flex items-center gap-2">
                              <Timer className="h-4 w-4" />
                              <span>{`${Math.floor(countdown / 60)
                                .toString()
                                .padStart(2, '0')}:${(countdown % 60).toString().padStart(2, '0')}`}</span>
                            </div>
                          ) : (
                            <>{translations.button.default}</>
                          )}
                        </Button>
                      </div>
                    </div>
                </form>
              </Form>
            </div>
          ) : (
             <div className="py-8 sm:py-12">
                {resultsContent}
             </div>
          )}
        </div>
        <div className="pb-8 pt-4">
            {footerContent}
        </div>
      </div>
    );
  }

  // Desktop Layout
  return (
    <div className="flex w-full flex-col items-center gap-10 py-8 sm:py-12 px-4">
      {showMinimizedView && minimizedView}
      <div className={`w-full ${showMinimizedView ? 'pt-24' : ''}`}>
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
                           {translations.header.title}
                        </h1>
                    </div>
                     <p className="mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg">
                        {translations.header.subtitle}
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
                            {translations.form.question.label}
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder={translations.form.question.placeholder}
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
                      {isFormLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {translations.button.loading}
                        </>
                      ) : countdown > 0 ? (
                        <div className="flex items-center gap-2">
                          <Timer className="h-4 w-4" />
                          <span>{`${Math.floor(countdown / 60)
                            .toString()
                            .padStart(2, '0')}:${(countdown % 60).toString().padStart(2, '0')}`}</span>
                        </div>
                      ) : (
                        <>{translations.button.default}</>
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

      {footerContent}
    </div>
  );
}

    