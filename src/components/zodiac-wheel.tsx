"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ZodiacSign } from "@/lib/zodiac";

interface ZodiacWheelProps {
  signs: readonly ZodiacSign[];
  onSelect: (sign: ZodiacSign) => void;
  selectedValue?: ZodiacSign;
  disabled?: boolean;
}

const ZODIAC_POSITIONS = [
  { name: "Aries", nameSr: "Ovan", symbol: "♈", x: 300, y: 65 },
  { name: "Taurus", nameSr: "Bik", symbol: "♉", x: 440, y: 110 },
  { name: "Gemini", nameSr: "Blizanci", symbol: "♊", x: 530, y: 205 },
  { name: "Cancer", nameSr: "Rak", symbol: "♋", x: 550, y: 310 },
  { name: "Leo", nameSr: "Lav", symbol: "♌", x: 530, y: 415 },
  { name: "Virgo", nameSr: "Devica", symbol: "♍", x: 440, y: 510 },
  { name: "Libra", nameSr: "Vaga", symbol: "♎", x: 300, y: 555 },
  { name: "Scorpio", nameSr: "Škorpija", symbol: "♏", x: 160, y: 510 },
  { name: "Sagittarius", nameSr: "Strelac", symbol: "♐", x: 70, y: 415 },
  { name: "Capricorn", nameSr: "Jarac", symbol: "♑", x: 50, y: 310 },
  { name: "Aquarius", nameSr: "Vodolija", symbol: "♒", x: 70, y: 205 },
  { name: "Pisces", nameSr: "Ribe", symbol: "♓", x: 160, y: 110 },
];


export function ZodiacWheel({ signs, onSelect, selectedValue, disabled }: ZodiacWheelProps) {

  const isSerbian = signs.includes("Ovan");
  const getSignName = (sign: typeof ZODIAC_POSITIONS[0]) => isSerbian ? sign.nameSr : sign.name;

  return (
    <div className={cn("relative mx-auto w-full max-w-[400px] sm:max-w-[450px] aspect-square", disabled && "opacity-50 cursor-not-allowed")}>
      <svg viewBox="0 0 600 600" className="w-full h-full">
        <g id="zodiac-wheel">
          {/* Outer Ring */}
          <circle cx="300" cy="300" r="290" fill="transparent" stroke="hsl(var(--primary))" strokeWidth="1" strokeOpacity="0.3" />
          <circle cx="300" cy="300" r="210" fill="transparent" stroke="hsl(var(--primary))" strokeWidth="1" strokeOpacity="0.3" />
          
          {/* Inner Decorative Circle */}
          <circle cx="300" cy="300" r="80" fill="transparent" stroke="hsl(var(--primary))" strokeWidth="1" />
          
          {/* Center Sun */}
          <circle cx="300" cy="300" r="40" fill="hsl(var(--primary))" fillOpacity="0.1" />
          <text x="300" y="312" textAnchor="middle" fontSize="36" fill="hsl(var(--primary))" fontFamily="serif">☉</text>

          {/* Radial Lines */}
          <g stroke="hsl(var(--primary))" strokeOpacity="0.3" strokeWidth="1">
            {Array.from({ length: 12 }).map((_, i) => (
              <line 
                key={i}
                x1="300" y1="300" 
                x2={300 + 290 * Math.cos(i * Math.PI / 6 - Math.PI / 12)} 
                y2={300 + 290 * Math.sin(i * Math.PI / 6 - Math.PI / 12)} />
            ))}
          </g>

          {/* Zodiac Signs */}
          {ZODIAC_POSITIONS.map((sign) => {
            const signName = getSignName(sign);
            const isSelected = selectedValue === signName;

            return (
              <g
                key={sign.name}
                className={cn("cursor-pointer group", disabled && "cursor-not-allowed")}
                onClick={() => !disabled && onSelect(signName)}
              >
                <text
                  x={sign.x}
                  y={sign.y}
                  textAnchor="middle"
                  fontSize="40"
                  fontFamily="serif"
                  className={cn(
                    "transition-all duration-300 fill-foreground/70 group-hover:fill-primary",
                    isSelected && "fill-primary scale-110"
                  )}
                >
                  {sign.symbol}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
