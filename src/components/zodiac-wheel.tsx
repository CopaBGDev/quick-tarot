"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { ZodiacSign } from "@/lib/zodiac";
import { ZODIAC_SIGNS_EN, ZODIAC_SIGNS_SR } from "@/lib/zodiac";

const ZODIAC_DATA = [
  { eng: "Aries", sr: "Ovan", path: "M25 75V50C25 25 75 25 75 50V75 M25 50C25 35 10 35 10 50 M75 50C75 35 90 35 90 50" },
  { eng: "Taurus", sr: "Bik", path: "M50 25C25 25 25 50 50 75S75 50 75 25 M50 50A25 25 0 0 0 50 50Z" },
  { eng: "Gemini", sr: "Blizanci", path: "M25 25V75 M75 25V75 M15 35H85 M15 65H85" },
  { eng: "Cancer", sr: "Rak", path: "M25 35C5 35 5 75 25 75 M75 65C95 65 95 25 75 25" },
  { eng: "Leo", sr: "Lav", path: "M25 75V25C25 10 50 10 50 25V75 M50 25C65 25 65 10 50 10" },
  { eng: "Virgo", sr: "Devica", path: "M15 75V25C15 10 30 10 30 25V75 M42.5 75V25C42.5 10 57.5 10 57.5 25V75 M70 75V25C70 10 85 10 85 25V50C85 65 70 65 70 50" },
  { eng: "Libra", sr: "Vaga", path: "M15 75H85 M25 50h50 M15 50C15 35 35 35 35 50 M65 50C65 35 85 35 85 50" },
  { eng: "Scorpio", sr: "Škorpija", path: "M15 75V25C15 10 30 10 30 25V75 M42.5 75V25C42.5 10 57.5 10 57.5 25V75 M70 25H85L95 15" },
  { eng: "Sagittarius", sr: "Strelac", path: "M20 80L80 20 M50 20H80V50 M40 60L60 40" },
  { eng: "Capricorn", sr: "Jarac", path: "M20 75V40C20 25 40 25 40 40V75 M60 40C60 25 80 25 80 40C80 55 60 55 60 40" },
  { eng: "Aquarius", sr: "Vodolija", path: "M20 40L40 20L60 40L80 20 M20 70L40 50L60 70L80 50" },
  { eng: "Pisces", sr: "Ribe", path: "M20 20C45 20 45 80 20 80 M80 20C55 20 55 80 80 80 M20 50H80" },
];

interface ZodiacWheelProps {
  signs: readonly ZodiacSign[];
  onSelect: (sign: ZodiacSign) => void;
  selectedValue?: ZodiacSign;
  disabled?: boolean;
}

export function ZodiacWheel({ signs, onSelect, selectedValue, disabled }: ZodiacWheelProps) {
  const isSerbian = signs[0] === "Ovan";
  const signNames = isSerbian ? ZODIAC_SIGNS_SR : ZODIAC_SIGNS_EN;

  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-[400px] sm:max-w-[450px] aspect-square",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      <svg viewBox="0 0 600 600" className="w-full h-full">
        {/* Sun */}
        <defs>
          <radialGradient id="sun-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1 }} />
            <stop offset="70%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.8 }} />
            <stop offset="100%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0 }} />
          </radialGradient>
        </defs>
        <circle cx="300" cy="300" r="30" fill="url(#sun-gradient)" />
        <circle cx="300" cy="300" r="30" fill="transparent" stroke="hsl(var(--primary))" strokeWidth="1" />
        
        {/* Spokes */}
        <g stroke="hsl(var(--border))" strokeWidth="0.5">
          {[...Array(12)].map((_, i) => (
            <line
              key={i}
              x1="300"
              y1="300"
              x2={300 + 260 * Math.cos((i * 30 - 75) * Math.PI / 180)}
              y2={300 + 260 * Math.sin((i * 30 - 75) * Math.PI / 180)}
            />
          ))}
        </g>

        {/* Outer circle */}
        <circle cx="300" cy="300" r="260" fill="none" stroke="hsl(var(--border))" strokeWidth="1" />
        {/* Inner circle */}
        <circle cx="300" cy="300" r="200" fill="none" stroke="hsl(var(--border))" strokeWidth="1" />

        {/* Zodiac Signs */}
        <g>
          {ZODIAC_DATA.map((sign, index) => {
            const angle = -index * 30 + 75; 
            const isSelected = selectedValue === (isSerbian ? sign.sr : sign.eng);
            
            return (
              <g
                key={sign.eng}
                transform={`rotate(${angle} 300 300)`}
                className={cn("cursor-pointer group", disabled && "cursor-not-allowed")}
                onClick={() => !disabled && onSelect(isSerbian ? sign.sr : sign.eng)}
              >
                <path
                  d={sign.path}
                  stroke={isSelected ? "hsl(var(--primary))" : "hsl(var(--foreground))"}
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  transform="translate(265, 10) scale(0.7)"
                  className="transition-all duration-200 group-hover:stroke-primary"
                />
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
