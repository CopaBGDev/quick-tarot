"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Sparkles, Wand2, Loader2, Play, Pause } from "lucide-react";

import { getTarotReading, getTarotAudio } from "@/app/actions";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ZODIAC_SIGNS_SR, type ZodiacSign, ZODIAC_SIGNS_EN } from "@/lib/zodiac";
import { MagicIcon } from "./magic-icon";
import { TarotCard } from "./tarot-card";
import { AdPlaceholder } from "./ad-placeholder";
import { getTranslations, Translations } from "@/lib/translations";
import { VoiceEnum, type Voice } from "@/ai/flows/types";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

const FormSchema = z.object({
  zodiacSign: z.custom<ZodiacSign>((val) => [...ZODIAC_SIGNS_SR, ...ZODIAC_SIGNS_EN].includes(val as ZodiacSign), {
    message: "You must select a valid zodiac sign.",
  }),
  question: z
    .string()
    .min(10, { message: "Question must be at least 10 characters long." })
    .max(200, { message: "Question cannot be longer than 200 characters." }),
  voice: VoiceEnum,
});

type FormValues = z.infer<typeof FormSchema>;

export default function TarotClient() {
  const [isFormLoading, setIsFormLoading] = React.useState(false);
  const [isAudioLoading, setIsAudioLoading] = React.useState(false);
  const [reading, setReading] = React.useState<GenerateTarotReadingOutput | null>(null);
  const [typedReading, setTypedReading] = React.useState("");
  const [translations, setTranslations] = React.useState<Translations>(getTranslations('sr'));
  const [zodiacSigns, setZodiacSigns] = React.useState(ZODIAC_SIGNS_SR);
  const [language, setLanguage] = React.useState('sr');
  const [isPlaying, setIsPlaying] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const [audioDataUri, setAudioDataUri] = React.useState<string | null>(null);
  const resultsRef = React.useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      question: "",
      voice: "Algenib",
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
      voice: VoiceEnum,
    });

    form.reset(undefined, { keepValues: true });
    (form as any).resolver = zodResolver(zodSchema);

  }, [form]);
  
  React.useEffect(() => {
    if (!reading) return;

    setTypedReading("");
    let index = 0;
    const typingInterval = setInterval(() => {
      setTypedReading((prev) => prev + reading.tarotReading[index]);
      index++;
      if (index >= reading.tarotReading.length) {
        clearInterval(typingInterval);
      }
    }, 25);

    return () => clearInterval(typingInterval);
  }, [reading]);

  React.useEffect(() => {
    if (audioRef.current) {
        audioRef.current.onended = () => setIsPlaying(false);
    }
  }, [audioDataUri]);

  const handlePlayPause = async () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
      return;
    }

    if (audioDataUri) {
      audioRef.current?.play();
      setIsPlaying(true);
      return;
    }

    if (!reading) return;

    setIsAudioLoading(true);
    try {
      const voice = form.getValues('voice');
      const result = await getTarotAudio({ text: reading.tarotReading, voice });
      if (result.audioDataUri) {
        setAudioDataUri(result.audioDataUri);
        // We need to use a timeout to allow the state to update and the src to be set on the audio element
        setTimeout(() => {
            audioRef.current?.play();
            setIsPlaying(true);
        }, 0)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : translations.unknownError;
      toast({
        title: translations.errorTitle,
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsAudioLoading(false);
    }
  };

  const onSubmit = async (data: FormValues) => {
    setIsFormLoading(true);
    setReading(null);
    setTypedReading("");
    setAudioDataUri(null);
    setIsPlaying(false);
    
    setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);

    try {
      const { voice, ...readingData } = data;
      const result = await getTarotReading({ ...readingData, language });
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

  const disabled = isFormLoading || isAudioLoading;

  if (!translations) {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-8 py-10">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    )
  }

  const tarotCards = reading
    ? reading.cards.map(card => ({
        name: card.name,
        image: card.image,
        hint: card.name.toLowerCase().replace(/ /g, " "),
      }))
    : [
        { name: "The Fool", image: "https://placehold.co/320x480.png", hint: "tarot card" },
        { name: "The Magician", image: "https://placehold.co/320x480.png", hint: "tarot card" },
        { name: "The High Priestess", image: "https://placehold.co/320x480.png", hint: "tarot card" },
      ];


  return (
    <div className="flex w-full flex-col items-center gap-10 py-8 sm:py-12">
      {audioDataUri && <audio ref={audioRef} src={audioDataUri} />}
      <header className="text-center">
        <MagicIcon className="mx-auto h-16 w-16 text-primary" />
        <h1 className="mt-4 font-headline text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl bg-clip-text bg-gradient-to-r from-primary via-accent to-primary">
          {translations.header.title}
        </h1>
        <p className="mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg">
          {translations.header.subtitle}
        </p>
      </header>

      <Card className="w-full max-w-2xl bg-card/50 backdrop-blur-sm">
        <CardContent className="p-6 sm:p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="zodiacSign"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{translations.form.zodiac.label}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={disabled}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={translations.form.zodiac.placeholder} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {zodiacSigns.map((sign) => (
                          <SelectItem key={sign} value={sign}>
                            {sign}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{translations.form.question.label}</FormLabel>
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
               <FormField
                control={form.control}
                name="voice"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>{translations.form.voice.label}</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                        disabled={disabled}
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Algenib" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {translations.form.voice.male}
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Achernar" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {translations.form.voice.female}
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={disabled} size="lg">
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
            </form>
          </Form>
        </CardContent>
      </Card>

      <section ref={resultsRef} className="w-full max-w-4xl text-center scroll-mt-8">
        {(isFormLoading || reading) && (
          <>
            <h2 className="font-headline text-3xl font-bold text-primary">{translations.results.title}</h2>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              <TarotCard isFlipped={isFormLoading || !!reading} delay={0} card={tarotCards[0]} />
              <TarotCard isFlipped={isFormLoading || !!reading} delay={150} card={tarotCards[1]} />
              <TarotCard isFlipped={isFormLoading || !!reading} delay={300} card={tarotCards[2]} />
            </div>

            {isFormLoading && !reading && (
              <div className="mt-8 flex items-center justify-center gap-2 text-lg text-muted-foreground">
                <Sparkles className="h-5 w-5 animate-pulse" />
                <p>{translations.results.loadingText}</p>
              </div>
            )}

            {reading && (
              <Card className="mt-8 bg-transparent border-primary/20 shadow-primary/10 shadow-lg">
                <CardHeader className="flex-row items-center justify-between">
                  <CardTitle>{translations.results.readingTitle}</CardTitle>
                   {reading.tarotReading && (
                    <Button variant="outline" size="icon" onClick={handlePlayPause} disabled={isAudioLoading}>
                        {isAudioLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : isPlaying ? (
                            <Pause className="h-4 w-4" />
                        ) : (
                            <Play className="h-4 w-4" />
                        )}
                      <span className="sr-only">{isPlaying ? translations.button.pause : translations.button.play}</span>
                    </Button>
                  )}
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

      <footer className="mt-12 flex w-full flex-col items-center gap-8 border-t border-primary/10 pt-10">
        <AdPlaceholder />
        <p className="text-sm text-muted-foreground">{translations.footer.copyright.replace('{year}', new Date().getFullYear().toString())}</p>
      </footer>
    </div>
  );
}