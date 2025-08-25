"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Sparkles, Wand2, Loader2, Volume2, Play } from "lucide-react";

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

function useTypingEffect(text: string, duration: number) {
  const [displayedText, setDisplayedText] = React.useState("");
  const speed = duration > 0 ? text.length / duration * 1000 : 10; // characters per second

  React.useEffect(() => {
    setDisplayedText("");
    if (text) {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
        if (i >= text.length) {
          clearInterval(interval);
        }
      }, 1000 / (speed / 1.3));
      return () => clearInterval(interval);
    }
  }, [text, speed]);

  return displayedText;
}

export default function TarotClient() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [reading, setReading] = React.useState<GenerateTarotReadingOutput | null>(null);
  const [translations, setTranslations] = React.useState<Translations>(getTranslations('sr'));
  const [zodiacSigns, setZodiacSigns] = React.useState(ZODIAC_SIGNS_SR);
  const [language, setLanguage] = React.useState('sr');
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [audioDuration, setAudioDuration] = React.useState(0);
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const { toast } = useToast();

  const displayedReading = useTypingEffect(reading?.tarotReading ?? "", audioDuration);

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
  
  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    setReading(null);

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
      setIsLoading(false);
    }
  };

  const disabled = isLoading;

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
                      <Textarea placeholder={translations.form.question.placeholder} {...field} disabled={disabled} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={disabled} size="lg">
                {isLoading ? (
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

      {(isLoading || reading) && (
        <section className="w-full max-w-4xl text-center">
          <h2 className="font-headline text-3xl font-bold text-primary">{translations.results.title}</h2>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <TarotCard isFlipped={isLoading || !!reading} delay={0} card={tarotCards[0]} />
            <TarotCard isFlipped={isLoading || !!reading} delay={150} card={tarotCards[1]} />
            <TarotCard isFlipped={isLoading || !!reading} delay={300} card={tarotCards[2]} />
          </div>

          {isLoading && !reading && (
            <div className="mt-8 flex items-center justify-center gap-2 text-lg text-muted-foreground">
              <Sparkles className="h-5 w-5 animate-pulse" />
              <p>{translations.results.loadingText}</p>
            </div>
          )}

          {reading && (
            <Card className="mt-8 bg-transparent border-primary/20 shadow-primary/10 shadow-lg">
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle>{translations.results.title}</CardTitle>
                {reading.audioDataUri && (
                  <>
                    <Button onClick={handlePlayPause} size="icon" variant="ghost">
                      {isPlaying ? <Volume2 /> : <Play />}
                      <span className="sr-only">{isPlaying ? "Pause" : "Play"}</span>
                    </Button>
                    <audio
                      ref={audioRef}
                      src={reading.audioDataUri}
                      onEnded={() => setIsPlaying(false)}
                      onLoadedMetadata={(e) => setAudioDuration(e.currentTarget.duration)}
                    />
                  </>
                )}
              </CardHeader>
              <CardContent className="p-6 text-left">
                <p className="whitespace-pre-wrap font-body text-base leading-relaxed text-foreground/90 md:text-lg">
                  {displayedReading}
                </p>
              </CardContent>
            </Card>
          )}
        </section>
      )}

      <footer className="mt-12 flex w-full flex-col items-center gap-8 border-t border-primary/10 pt-10">
        <AdPlaceholder />
        <p className="text-sm text-muted-foreground">{translations.footer.copyright.replace('{year}', new Date().getFullYear().toString())}</p>
      </footer>
    </div>
  );
}
