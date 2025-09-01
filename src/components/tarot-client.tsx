
"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Sparkles, Loader2, Edit3, User, HelpCircle, Timer } from "lucide-react";
import Image from "next/image";


import { getTarotReading } from "@/app/actions";
import type { GenerateTarotReadingOutput } from "@/ai/flows/generate-tarot-reading";
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
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { ZODIAC_SIGNS_SR, type ZodiacSign, ZODIAC_SIGNS_EN } from "@/lib/zodiac";
import { Logo } from "./logo";
import { TarotCard } from "./tarot-card";
import { AdPlaceholder } from "./ad-placeholder";
import { getTranslations, Translations } from "@/lib/translations";
import { ZodiacWheel, ZODIAC_IMAGES, NATURAL_ORDER_EN } from "./zodiac-wheel";

const FormSchema = z.object({
  zodiacSign: z.custom<ZodiacSign>((val) => [...ZODIAC_SIGNS_SR, ...ZODIAC_SIGNS_EN].includes(val as ZodiacSign), {
    message: "You must select a valid zodiac sign.",
  }).optional(),
  question: z
    .string()
    .min(10, { message: "Question must be at least 10 characters long." })
    .max(200, { message: "Question cannot be longer than 200 characters." }),
});

type FormValues = z.infer<typeof FormSchema>;

const READING_COOLDOWN_SECONDS = 60;

export default function TarotClient() {
  const [isFormLoading, setIsFormLoading] = React.useState(false);
  const [reading, setReading] = React.useState<GenerateTarotReadingOutput | null>(null);
  const [cardsFlipped, setCardsFlipped] = React.useState(false);
  const [typedReading, setTypedReading] = React.useState("");
  const [translations, setTranslations] = React.useState<Translations>(getTranslations('sr'));
  const [zodiacSigns, setZodiacSigns] = React.useState(ZODIAC_SIGNS_SR);
  const [language, setLanguage] = React.useState('sr');
  const [progress, setProgress] = React.useState(0);
  const [countdown, setCountdown] = React.useState(0);
  const resultsRef = React.useRef<HTMLDivElement>(null);
  const zodiacWheelRef = React.useRef<HTMLDivElement>(null);
  const questionFormRef = React.useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      question: "",
    },
  });
  
  React.useEffect(() => {
    const userLang = navigator.language.split('-')[0];
    setLanguage(userLang);
    const newTranslations = getTranslations(userLang);
    setTranslations(newTranslations);
    setZodiacSigns(newTranslations.zodiacSigns);
    
    const zodSchema = z.object({
      zodiacSign: z.custom<ZodiacSign>((val) => newTranslations.zodiacSigns.includes(val as ZodiacSign), {
        message: newTranslations.form.zodiac.error,
      }).optional(),
      question: z
        .string()
        .min(10, { message: newTranslations.form.question.minLengthError })
        .max(200, { message: newTranslations.form.question.maxLengthError }),
    });

    form.reset(undefined, { keepValues: true });
    (form as any).resolver = zodResolver(zodSchema);

  }, [form]);
  
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
      setTypedReading((prev) => prev + reading.tarotReading[index]);
      index++;
      if (index >= reading.tarotReading.length) {
        clearInterval(typingInterval);
      }
    }, 25);

    return () => {
        clearInterval(typingInterval);
        clearTimeout(flipTimeout);
    };
  }, [reading]);

  React.useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);


  React.useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (isFormLoading && !reading) {
      setProgress(0);
      const duration = 20000; // 20 seconds
      const interval = 200; 
      const totalSteps = duration / interval;
      
      timer = setInterval(() => {
        setProgress(prev => {
          const next = prev + (100 / totalSteps);
          if (next >= 95) {
            clearInterval(timer);
            return 95;
          }
          return next;
        });
      }, interval);
    } else {
        setProgress(0);
    }

    return () => {
        if (timer) clearInterval(timer);
    };
}, [isFormLoading, reading]);

React.useEffect(() => {
    if (reading) {
        setProgress(100);
    }
}, [reading]);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        zodiacWheelRef.current && 
        !zodiacWheelRef.current.contains(event.target as Node) &&
        questionFormRef.current && 
        !questionFormRef.current.contains(event.target as Node)
      ) {
        if (form.getValues('zodiacSign')) {
            form.setValue('zodiacSign', undefined, { shouldValidate: false });
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [form]);

  const onSubmit = async (data: FormValues) => {
    if (!data.zodiacSign) {
        form.setError("zodiacSign", { type: "manual", message: translations.form.zodiac.error });
        return;
    }

    setIsFormLoading(true);
    setReading(null);
    setTypedReading("");
    setCardsFlipped(false);
    setCountdown(READING_COOLDOWN_SECONDS);
    
    setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);

    try {
      const result = await getTarotReading({ ...data, language } as { zodiacSign: string; question: string; language: string});
      setReading(result);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : translations.unknownError;
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
    form.setValue('question', '');
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

  const disabled = isFormLoading || countdown > 0;
  
  const submittedValues = form.watch();
  const selectedSign = submittedValues.zodiacSign;
  const isSerbian = zodiacSigns[0] === 'Ovan';
  const naturalOrder = isSerbian ? getTranslations('sr').zodiacSigns : getTranslations('en').zodiacSigns;
  const selectedEnglishSign = selectedSign ? NATURAL_ORDER_EN[naturalOrder.indexOf(selectedSign as any)] : undefined;
  const selectedImage = selectedEnglishSign ? ZODIAC_IMAGES[selectedEnglishSign] : undefined;

  if (!translations) {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-8 py-10">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    )
  }

  const tarotCards = reading
    ? reading.cards.map((card) => ({
        name: card.name,
        image: card.image,
        hint: card.name.toLowerCase().replace(/ /g, " "),
      }))
    : [
        { name: "Karta 1", image: "https://placehold.co/320x480.png", hint: "tarot card" },
        { name: "Karta 2", image: "https://placehold.co/320x480.png", hint: "tarot card" },
        { name: "Karta 3", image: "https://placehold.co/320x480.png", hint: "tarot card" },
      ];

  const formattedCountdown = `${Math.floor(countdown / 60)
    .toString()
    .padStart(2, '0')}:${(countdown % 60).toString().padStart(2, '0')}`;
  
  const showMinimizedView = isFormLoading || reading;

  return (
    <div className="flex w-full flex-col items-center gap-10 py-8 sm:py-12">
      {showMinimizedView ? (
        <div className="w-full max-w-4xl animate-in fade-in">
          <div className="flex flex-col items-center gap-6 rounded-lg border border-primary/20 bg-secondary/50 p-6 shadow-lg sm:flex-row sm:justify-between">
            <div className="flex items-center gap-4">
              {selectedImage && selectedSign && (
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-background/50 ring-2 ring-primary">
                    <Image
                      src={selectedImage}
                      alt={selectedSign}
                      width={48}
                      height={48}
                      unoptimized
                    />
                </div>
              )}
              <p className="flex-1 text-center text-muted-foreground sm:text-left">{submittedValues.question}</p>
            </div>
            <div className="flex items-center gap-4">
              {countdown > 0 && (
                  <div className="flex flex-col items-center sm:items-end gap-1 text-sm text-primary font-mono">
                      <span className="text-xs text-muted-foreground">{translations.countdownText}</span>
                      <div className="flex items-center gap-2">
                        <Timer className="h-4 w-4" />
                        <span>{formattedCountdown}</span>
                      </div>
                  </div>
              )}
              <Button variant="ghost" size="icon" onClick={resetForm} disabled={disabled} className="text-primary hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed">
                <Edit3 className="h-5 w-5" />
                <span className="sr-only">Edit</span>
              </Button>
            </div>
          </div>
        </div>
      ) : (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid w-full grid-cols-1 items-center justify-center gap-12 lg:grid-cols-2 lg:gap-16"
        >
          <div ref={zodiacWheelRef}>
            <FormField
              control={form.control}
              name="zodiacSign"
              render={({ field, fieldState }) => (
                <FormItem className="flex flex-col items-center">
                  <FormControl>
                    <ZodiacWheel
                      signs={zodiacSigns}
                      onSelect={field.onChange}
                      selectedValue={field.value}
                      disabled={disabled}
                    />
                  </FormControl>
                  <FormMessage className="text-center">
                    {fieldState.error?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col items-center" ref={questionFormRef}>
            <header className="flex w-full max-w-md flex-col items-center text-center">
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

            <div className="mt-8 w-full max-w-md space-y-8">
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
                    <FormMessage />
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
                ) : (
                  <>{translations.button.default}</>
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
      )}

      <section
        ref={resultsRef}
        className="w-full max-w-4xl text-center scroll-mt-8 mt-12"
      >
        {(isFormLoading || reading) && (
          <>
            <h2 className="font-headline text-3xl font-bold text-primary">
              {translations.results.title}
            </h2>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
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
                <p className="text-center">{translations.results.loadingText}</p>
                <Progress value={progress} className="w-full h-2" />
                <p className="text-sm text-muted-foreground">{translations.results.loadingSubtext}</p>
              </div>
            )}

            {reading && (
              <Card className="mt-8 bg-transparent border-primary/20 shadow-primary/10 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-center">{translations.results.readingTitle}</CardTitle>
                </CardHeader>
                <CardContent className="p-6 text-left">
                  <p className="whitespace-pre-wrap font-body text-base leading-relaxed text-foreground/90 md:text-lg">
                    {typedReading}
                  </p>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </section>

      <footer className="mt-8 flex w-full max-w-md flex-col items-center gap-8 lg:max-w-4xl">
        <AdPlaceholder />
        <p className="text-sm text-muted-foreground">
          {translations.footer.copyright.replace(
            "{year}",
            new Date().getFullYear().toString()
          )}
        </p>
      </footer>
    </div>
  );
}

    