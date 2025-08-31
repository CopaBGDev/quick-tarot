
"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import { Logo } from "./logo";

type TarotCardProps = {
  isFlipped: boolean;
  delay: number;
  card: { name: string; image: string; hint: string };
};

export function TarotCard({ isFlipped, delay, card }: TarotCardProps) {
  return (
    <div
      className="group h-48 w-32 [perspective:1000px] sm:h-60 sm:w-40 animate-in fade-in zoom-in-50"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div
        className={cn(
          "relative h-full w-full rounded-lg shadow-lg transition-transform duration-700 [transform-style:preserve-3d]",
          { "[transform:rotateY(180deg)]": isFlipped }
        )}
      >
        {/* Card Back */}
        <div 
          className={cn(
            "absolute h-full w-full rounded-lg border-2 border-primary/50 bg-secondary p-2 [backface-visibility:hidden] flex items-center justify-center",
            { "animate-pulse-slow": !isFlipped }
          )}
          style={{ animationDelay: `${delay}ms` }}
        >
          <div className="flex h-full w-full flex-col items-center justify-center rounded-md border border-dashed border-primary/50 p-4">
            <Logo className="h-28 w-28 text-primary/70 opacity-80" />
            <Sparkles className="absolute h-8 w-8 animate-pulse text-primary/70 top-4 right-4" />
             <Sparkles className="absolute h-8 w-8 animate-pulse text-primary/70 bottom-4 left-4" style={{ animationDelay: '250ms' }} />
          </div>
        </div>
        {/* Card Front */}
        <div className="absolute h-full w-full rounded-lg border border-primary/70 bg-card [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div className="flex h-full w-full flex-col items-center justify-between p-2">
            <div className="relative h-full w-full overflow-hidden rounded-md">
              <Image
                src={card.image}
                alt={card.name}
                width={320}
                height={480}
                className="object-cover h-full w-full"
                data-ai-hint={card.hint}
                unoptimized
              />
            </div>
            <p className="mt-1 flex-shrink-0 font-headline text-sm text-center text-primary">
              {card.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
