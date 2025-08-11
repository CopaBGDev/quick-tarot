"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

type TarotCardProps = {
  isFlipped: boolean;
  delay: number;
  card: { name: string; image: string; hint: string };
};

export function TarotCard({ isFlipped, delay, card }: TarotCardProps) {
  return (
    <div
      className="group h-48 w-32 [perspective:1000px] sm:h-60 sm:w-40"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div
        className={cn(
          "relative h-full w-full rounded-lg shadow-lg transition-transform duration-700 [transform-style:preserve-3d]",
          { "[transform:rotateY(180deg)]": isFlipped }
        )}
      >
        {/* Card Back */}
        <div className="absolute h-full w-full rounded-lg border-2 border-primary/50 bg-secondary p-4 [backface-visibility:hidden]">
          <div className="flex h-full w-full items-center justify-center rounded-md border border-dashed border-primary/50">
            <Sparkles className="h-12 w-12 animate-pulse text-primary/70" />
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
                className="object-contain"
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
