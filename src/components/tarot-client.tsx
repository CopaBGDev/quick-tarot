
"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Sparkles, Wand2, Loader2 } from "lucide-react";

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
import { useToast } from "@/hooks/use-toast";
import { ZODIAC_SIGNS_SR, type ZodiacSign, ZODIAC_SIGNS_EN } from "@/lib/zodiac";
import { Logo } from "./logo";
import { TarotCard } from "./tarot-card";
import { AdPlaceholder } from "./ad-placeholder";
import { getTranslations, Translations } from "@/lib/translations";
import { ZodiacWheel } from "./zodiac-wheel";

const FormSchema = z.object({
  zodiacSign: z.custom<ZodiacSign>((val) => [...ZODIAC_SIGNS_SR, ...ZODIAC_SIGNS_EN].includes(val as ZodiacSign), {
    message: "You must select a valid zodiac sign.",
  }),
  question: z
    .string()
    .min(10, { message: "Question must be at least 10 characters long." })
    .max(200, { message: "Question cannot be longer than 200 characters." }),
});

type FormValues = z.infer<typeof FormSchema>;

export default function TarotClient() {
  const [isFormLoading, setIsFormLoading] = React.useState(false);
  const [reading, setReading] = React.useState<GenerateTarotReadingOutput | null>(null);
  const [cardsFlipped, setCardsFlipped] = React.useState(false);
  const [typedReading, setTypedReading] = React.useState("");
  const [translations, setTranslations] = React.useState<Translations>(getTranslations('sr'));
  const [zodiacSigns, setZodiacSigns] = React.useState(ZODIAC_SIGNS_SR);
  const [language, setLanguage] = React.useState('sr');
  const resultsRef = React.useRef<HTMLDivElement>(null);
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
      }),
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

  const onSubmit = async (data: FormValues) => {
    setIsFormLoading(true);
    setReading(null);
    setTypedReading("");
    setCardsFlipped(false);
    
    setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);

    try {
      const result = await getTarotReading({ ...data, language });
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

  const handleTextareaKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
        const question = form.getValues('question');
        if (question.trim().endsWith('?')) {
            event.preventDefault();
            form.handleSubmit(onSubmit)();
        }
    }
  };

  const disabled = isFormLoading;

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

  return (
    <div className="flex w-full flex-col items-center gap-10 py-8 sm:py-12">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16"
        >
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
                    label={translations.form.zodiac.label}
                    language={language}
                  />
                </FormControl>
                <FormMessage className="text-center">
                  {fieldState.error?.message}
                </FormMessage>
              </FormItem>
            )}
          />

          <div className="flex flex-col items-start text-left">
            <header className="flex w-full max-w-md flex-col items-start text-left">
              <div className="flex items-center">
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
                className="w-full"
                disabled={disabled}
                size="lg"
              >
                {isFormLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {translations.button.loading}
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    {translations.button.default}
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>

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
              <div className="mt-8 flex items-center justify-center gap-2 text-lg text-muted-foreground">
                <Sparkles className="h-5 w-5 animate-pulse" />
                <p>{translations.results.loadingText}</p>
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
