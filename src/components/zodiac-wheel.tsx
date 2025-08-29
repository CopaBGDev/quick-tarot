"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ZODIAC_ICONS, ZodiacSign } from "@/lib/zodiac";
import { Sun } from "lucide-react";

interface ZodiacWheelProps {
  signs: readonly ZodiacSign[];
  onSelect: (sign: ZodiacSign) => void;
  selectedValue?: ZodiacSign;
  disabled?: boolean;
}

export function ZodiacWheel({ signs, onSelect, selectedValue, disabled }: ZodiacWheelProps) {
  const radius = 130;
  const iconRadius = 100;
  const textRadius = 130;

  const getCoordinates = (index: number, r: number) => {
    const angle = (index / 12) * 2 * Math.PI - Math.PI / 2 - Math.PI / 12;
    return {
      x: 150 + r * Math.cos(angle),
      y: 150 + r * Math.sin(angle),
    };
  };

  return (
    <div className="relative mx-auto flex h-80 w-80 items-center justify-center">
      <svg viewBox="0 0 300 300" className="absolute h-full w-full">
        {/* Circles */}
        <circle cx="150" cy="150" r="150" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeOpacity="0.3" />
        <circle cx="150" cy="150" r="70" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" strokeOpacity="0.5" />
        <circle cx="150" cy="150" r="40" fill="hsl(var(--primary))" fillOpacity="0.1" />

        {/* Sun Icon */}
        <foreignObject x="130" y="130" width="40" height="40">
          <Sun className="h-10 w-10 text-primary" />
        </foreignObject>

        {/* Radial Lines */}
        {signs.map((_, index) => {
          const angle = (index / 12) * 360 - 75;
          return (
            <line
              key={`line-${index}`}
              x1="150"
              y1="150"
              x2={150 + 70 * Math.cos((angle * Math.PI) / 180)}
              y2={150 + 70 * Math.sin((angle * Math.PI) / 180)}
              stroke="hsl(var(--primary))"
              strokeWidth="1"
              strokeOpacity="0.5"
            />
          );
        })}

        {/* Zodiac Signs */}
        {signs.map((sign, index) => {
          const Icon = ZODIAC_ICONS[sign as keyof typeof ZODIAC_ICONS];
          const isSelected = selectedValue === sign;
          const iconPos = getCoordinates(index, iconRadius);
          const textPos = getCoordinates(index, textRadius);

          return (
            <g
              key={sign}
              onClick={() => !disabled && onSelect(sign)}
              className={cn(
                "cursor-pointer transition-opacity duration-300",
                disabled ? "cursor-not-allowed opacity-50" : "hover:opacity-80"
              )}
            >
              <foreignObject
                x={iconPos.x - 15}
                y={iconPos.y - 15}
                width="30"
                height="30"
                className={cn(
                  "transition-colors",
                  isSelected ? "text-primary" : "text-foreground/70"
                )}
              >
                {Icon && <Icon className="h-full w-full" />}
              </foreignObject>
              <text
                x={textPos.x}
                y={textPos.y + 15}
                textAnchor="middle"
                className={cn(
                  "text-xs font-headline tracking-wider uppercase transition-colors",
                  isSelected ? "fill-primary" : "fill-foreground/70"
                )}
              >
                {sign.substring(0, 4)}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
