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
    { name: "Aries", nameSr: "Ovan", path: "M25 75V50C25 25 75 25 75 50V75 M25 50C25 35 10 35 10 50 M75 50C75 35 90 35 90 50", angle: -90 },
    { name: "Taurus", nameSr: "Bik", path: "M50 25A25 25 0 0 0 50 75 M50 25A15 15 0 0 1 50 5", angle: -60 },
    { name: "Gemini", nameSr: "Blizanci", path: "M25 25h50 M25 75h50 M40 25v50 M60 25v50", angle: -30 },
    { name: "Cancer", nameSr: "Rak", path: "M25 50a25 25 0 1 0 50 0 M75 50a25 25 0 1 1-50 0", angle: 0 },
    { name: "Leo", nameSr: "Lav", path: "M25 50a25 25 0 1 0 50 0 L90 90", angle: 30 },
    { name: "Virgo", nameSr: "Devica", path: "M20 25L35 75L50 25L65 75L80 25", angle: 60 },
    { name: "Libra", nameSr: "Vaga", path: "M15 75h70 M25 60h50 M20 60a30 30 0 0 0 60 0", angle: 90 },
    { name: "Scorpio", nameSr: "Škorpija", path: "M20 25L35 75L50 25L65 75L80 25 M70 75L90 90", angle: 120 },
    { name: "Sagittarius", nameSr: "Strelac", path: "M25 75L75 25 M50 25h25v25", angle: 150 },
    { name: "Capricorn", nameSr: "Jarac", path: "M25 75L35 25L50 50L75 25V75", angle: 180 },
    { name: "Aquarius", nameSr: "Vodolija", path: "M20 35L40 60L60 35L80 60 M20 60L40 85L60 60L80 85", angle: 210 },
    { name: "Pisces", nameSr: "Ribe", path: "M25 25C25 75 75 25 75 75 M25 75C25 25 75 75 75 25 M25 50h50", angle: 240 }
  ];


export function ZodiacWheel({ signs, onSelect, selectedValue, disabled }: ZodiacWheelProps) {
  const isSerbian = signs.includes("Ovan");
  const getSignName = (sign: typeof ZODIAC_POSITIONS[0]) => isSerbian ? sign.nameSr : sign.name;

  return (
    <div className={cn("relative mx-auto w-full max-w-[400px] sm:max-w-[450px] aspect-square", disabled && "opacity-50 cursor-not-allowed")}>
      <svg viewBox="0 0 600 600" className="w-full h-full group">
        <g id="zodiac-wheel">
          {/* Rings and lines */}
          <circle cx="300" cy="300" r="280" fill="transparent" stroke="hsl(var(--primary))" strokeOpacity="0.2" strokeWidth="2" />
          <circle cx="300" cy="300" r="200" fill="transparent" stroke="hsl(var(--primary))" strokeOpacity="0.2" strokeWidth="2" />
           {Array.from({ length: 12 }).map((_, i) => (
            <line 
              key={`line-${i}`}
              x1="300" y1="300" 
              x2={300 + 280 * Math.cos(i * Math.PI / 6 - Math.PI / 12)} 
              y2={300 + 280 * Math.sin(i * Math.PI / 6 - Math.PI / 12)}
              stroke="hsl(var(--primary))"
              strokeOpacity="0.2"
              strokeWidth="2"
            />
          ))}

          {/* Zodiac Signs */}
          {ZODIAC_POSITIONS.map((sign) => {
             const signName = getSignName(sign);
             const isSelected = selectedValue === signName;
             const angleRad = (sign.angle * Math.PI) / 180;
             const x = 300 + 240 * Math.cos(angleRad);
             const y = 300 + 240 * Math.sin(angleRad);
            
            return (
              <g
                key={sign.name}
                transform={`translate(${x - 25}, ${y - 25}) scale(0.5)`}
                onClick={() => !disabled && onSelect(signName)}
                className={cn(
                    "cursor-pointer transition-all duration-300",
                    isSelected ? "stroke-primary" : "stroke-primary/50 group-hover:stroke-primary",
                    disabled && "cursor-not-allowed"
                )}
              >
                <path
                  d={sign.path}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="transparent"
                  className="transition-all"
                />
              </g>
            );
          })}
        </g>
         <g id="center-piece">
            <circle cx="300" cy="300" r="100" fill="hsl(var(--background))" />
            <circle cx="300" cy="300" r="100" fill="transparent" stroke="hsl(var(--primary))" strokeOpacity="0.3" strokeWidth="2" />
            <text x="300" y="310" textAnchor="middle" fontSize="24" className="fill-primary font-headline select-none">
              Izaberi
            </text>
         </g>
      </svg>
    </div>
  );
}
