"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ZODIAC_ICONS, ZodiacSign } from "@/lib/zodiac";

interface ZodiacWheelProps {
  signs: readonly ZodiacSign[];
  onSelect: (sign: ZodiacSign) => void;
  selectedValue?: ZodiacSign;
  disabled?: boolean;
}

export function ZodiacWheel({ signs, onSelect, selectedValue, disabled }: ZodiacWheelProps) {
  const radius = 120; // radius of the circle
  const iconSize = 40; // size of the icon container

  return (
    <div className="relative mx-auto flex h-72 w-72 items-center justify-center">
      <div className="absolute h-full w-full rounded-full border-2 border-dashed border-primary/20" />
      <div className="absolute flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-center text-xs font-bold text-primary">
        {selectedValue || "Izaberite znak"}
      </div>
      {signs.map((sign, index) => {
        const angle = - (index / signs.length) * 2 * Math.PI + Math.PI / 2;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        const Icon = ZODIAC_ICONS[sign as keyof typeof ZODIAC_ICONS];
        const isSelected = selectedValue === sign;

        return (
          <button
            key={sign}
            type="button"
            onClick={() => onSelect(sign)}
            disabled={disabled}
            className={cn(
              "absolute flex items-center justify-center rounded-full transition-all duration-300",
              "hover:bg-primary/20 hover:scale-110",
              isSelected ? "bg-primary/90 text-primary-foreground scale-110" : "bg-primary/10",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-primary/10"
            )}
            style={{
              transform: `translate(${x}px, ${-y}px)`,
              width: `${iconSize}px`,
              height: `${iconSize}px`,
            }}
            title={sign}
          >
            {Icon && <Icon className="h-6 w-6" />}
          </button>
        );
      })}
    </div>
  );
}
