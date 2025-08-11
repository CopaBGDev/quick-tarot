"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Sparkles, Wand2, Loader2, AlertTriangle, Timer } from "lucide-react";

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
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ZODIAC_SIGNS_SR, type ZodiacSign } from "@/lib/zodiac";
import { MagicIcon } from "./magic-icon";
import { TarotCard } from "./tarot-card";
import { AdPlaceholder } from "./ad-placeholder";

const FormSchema = z.object({
  zodiacSign: z.custom<ZodiacSign>((val) => ZODIAC_SIGNS_SR.includes(val as ZodiacSign), {
    message: "Morate izabrati validan horoskopski znak.",
  }),
  question: z
    .string()
    .min(10, { message: "Pitanje mora imati najmanje 10 karaktera." })
    .max(200, { message: "Pitanje ne može biti duže od 200 karaktera." }),
});

type FormValues = z.infer<typeof FormSchema>;

function useTypewriter(text: string | null, speed = 25) {
  const [displayText, setDisplayText] = React.useState("");

  React.useEffect(() => {
    setDisplayText("");
    if (text) {
      let i = 0;
      const timer = setInterval(() => {
        if (i < text.length) {
          setDisplayText((prev) => prev + text.charAt(i));
          i++;
        } else {
          clearInterval(timer);
        }
      }, speed);
      return () => clearInterval(timer);
    }
  }, [text, speed]);

  return displayText;
}

export default function TarotClient() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [reading, setReading] = React.useState<GenerateTarotReadingOutput | null>(null);
  const [cooldown, setCooldown] = React.useState(0);
  const [isClient, setIsClient] = React.useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      question: "",
    },
  });

  React.useEffect(() => {
    setIsClient(true);
    // const lastReadingTime = localStorage.getItem("lastReadingTime");
    // if (lastReadingTime) {
    //   const remainingTime = Number(lastReadingTime) + 24 * 60 * 60 * 1000 - Date.now();
    //   if (remainingTime > 0) {
    //     setCooldown(remainingTime);
    //   }
    // }
  }, []);

  React.useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1000);
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const onSubmit = async (data: FormValues) => {
    if (cooldown > 0) {
      toast({
        title: "Sačekajte",
        description: "Možete zatražiti novo čitanje tek nakon isteka 24h.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setReading(null);

    try {
      const result = await getTarotReading(data);
      setReading(result);
      // localStorage.setItem("lastReadingTime", Date.now().toString());
      // setCooldown(24 * 60 * 60 * 1000);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Došlo je do nepoznate greške.";
      toast({
        title: "Greška",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const displayedReading = useTypewriter(reading ? reading.tarotReading : null);
  const cooldownActive = cooldown > 0;
  const disabled = isLoading || cooldownActive;
  
  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!isClient) {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-8 py-10">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    )
  }

  const tarotCards = reading
    ? [
        { name: reading.card1, image: "https://placehold.co/320x480.png" },
        { name: reading.card2, image: "https://placehold.co/320x480.png" },
        { name: reading.card3, image: "https://placehold.co/320x480.png" },
      ]
    : [
        { name: "The Fool", image: "https://placehold.co/320x480.png" },
        { name: "The Magician", image: "https://placehold.co/320x480.png" },
        { name: "The High Priestess", image: "https://placehold.co/320x480.png" },
      ];


  return (
    <div className="flex w-full flex-col items-center gap-10 py-8 sm:py-12">
      <header className="text-center">
        <MagicIcon className="mx-auto h-16 w-16 text-primary" />
        <h1 className="mt-4 font-headline text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl bg-clip-text bg-gradient-to-r from-primary via-accent to-primary">
          Tarot Sudbina
        </h1>
        <p className="mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg">
          Otkrijte šta vam zvezde i karte poručuju. Unesite svoj znak i pitanje da dobijete vaše personalizovano tarot čitanje.
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
                    <FormLabel>Vaš horoskopski znak</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={disabled}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Izaberite znak..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ZODIAC_SIGNS_SR.map((sign) => (
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
                    <FormLabel>Vaše pitanje za karte</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Šta vas muči ili zanima?" {...field} disabled={disabled} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={disabled} size="lg">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generišem...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Dobij Čitanje
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {cooldownActive && (
          <div className="flex items-center gap-3 rounded-lg border border-yellow-400/50 bg-yellow-400/10 p-4 text-yellow-300">
            <Timer className="h-6 w-6" />
            <div>
                <p className="font-bold">Sledeće čitanje je dostupno za:</p>
                <p className="font-mono text-lg">{formatTime(cooldown)}</p>
            </div>
          </div>
      )}

      {(isLoading || reading) && (
        <section className="w-full max-w-4xl text-center">
          <h2 className="font-headline text-3xl font-bold text-primary">Vaše Karte Sudbine</h2>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <TarotCard isFlipped={isLoading || !!reading} delay={0} card={tarotCards[0]} />
            <TarotCard isFlipped={isLoading || !!reading} delay={150} card={tarotCards[1]} />
            <TarotCard isFlipped={isLoading || !!reading} delay={300} card={tarotCards[2]} />
          </div>

          {isLoading && !reading && (
            <div className="mt-8 flex items-center justify-center gap-2 text-lg text-muted-foreground">
              <Sparkles className="h-5 w-5 animate-pulse" />
              <p>Karte se mešaju, vaša sudbina se otkriva...</p>
            </div>
          )}

          {reading && (
            <Card className="mt-8 bg-transparent border-primary/20 shadow-primary/10 shadow-lg">
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
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Tarot Sudbina. Sva prava zadržana.</p>
      </footer>
    </div>
  );
}
