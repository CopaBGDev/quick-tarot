"use client";

import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

type TarotCardProps = {
  isFlipped: boolean;
  delay: number;
};

export function TarotCard({ isFlipped, delay }: TarotCardProps) {
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
          <div className="flex h-full w-full items-center justify-center p-2">
            <p className="font-headline text-lg text-primary">Sudbina</p>
          </div>
        </div>
      </div>
    </div>
  );
}
