"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ZODIAC_SIGNS_EN, ZODIAC_SIGNS_SR, ZodiacSign } from "@/lib/zodiac";

const ZODIAC_DATA = [
  { eng: "Aries", sr: "Ovan", symbol: "♈", emoji: "🐏", textPos: { x: 300, y: 55 }, emojiPos: { x: 300, y: 85 } },
  { eng: "Taurus", sr: "Bik", symbol: "♉", emoji: "🐂", textPos: { x: 420, y: 95 }, emojiPos: { x: 450, y: 125 } },
  { eng: "Gemini", sr: "Blizanci", symbol: "♊", emoji: "👬", textPos: { x: 505, y: 190 }, emojiPos: { x: 530, y: 220 } },
  { eng: "Cancer", sr: "Rak", symbol: "♋", emoji: "🦀", textPos: { x: 545, y: 310 }, emojiPos: { x: 565, y: 340 } },
  { eng: "Leo", sr: "Lav", symbol: "♌", emoji: "🦁", textPos: { x: 505, y: 430 }, emojiPos: { x: 530, y: 460 } },
  { eng: "Virgo", sr: "Devica", symbol: "♍", emoji: "🌾", textPos: { x: 420, y: 520 }, emojiPos: { x: 450, y: 550 } },
  { eng: "Libra", sr: "Vaga", symbol: "♎", emoji: "⚖️", textPos: { x: 300, y: 555 }, emojiPos: { x: 300, y: 585 } },
  { eng: "Scorpio", sr: "Škorpija", symbol: "♏", emoji: "🦂", textPos: { x: 180, y: 520 }, emojiPos: { x: 150, y: 550 } },
  { eng: "Sagittarius", sr: "Strelac", symbol: "♐", emoji: "🏹", textPos: { x: 95, y: 430 }, emojiPos: { x: 70, y: 460 } },
  { eng: "Capricorn", sr: "Jarac", symbol: "♑", emoji: "🐐", textPos: { x: 55, y: 310 }, emojiPos: { x: 35, y: 340 } },
  { eng: "Aquarius", sr: "Vodolija", symbol: "♒", emoji: "🏺", textPos: { x: 95, y: 190 }, emojiPos: { x: 70, y: 220 } },
  { eng: "Pisces", sr: "Ribe", symbol: "♓", emoji: "🐟", textPos: { x: 180, y: 95 }, emojiPos: { x: 150, y: 125 } },
];


interface ZodiacWheelProps {
  signs: readonly ZodiacSign[];
  onSelect: (sign: ZodiacSign) => void;
  selectedValue?: ZodiacSign;
  disabled?: boolean;
}

export function ZodiacWheel({
  signs,
  onSelect,
  selectedValue,
  disabled,
}: ZodiacWheelProps) {
    const isSerbian = signs[0] === "Ovan";

  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-[400px] sm:max-w-[450px] aspect-square",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      <svg viewBox="0 0 600 600" className="w-full h-full">
        {/* Background */}
        <circle cx="300" cy="300" r="280" fill="hsl(var(--card))" stroke="#1e3a8a" strokeWidth="4" />

        {/* Inner circle */}
        <circle cx="300" cy="300" r="80" fill="none" stroke="#c49d2c" strokeWidth="3" />

        {/* Center Sun */}
        <circle cx="300" cy="300" r="40" fill="none" stroke="#c49d2c" strokeWidth="3" />
        <text x="300" y="305" textAnchor="middle" fontSize="28" fill="#c49d2c" fontFamily="sans-serif">☉</text>

        {/* Zodiac sectors */}
        <g stroke="#1e3a8a" strokeWidth="2">
          <line x1="300" y1="20" x2="300" y2="580" />
          <line x1="20" y1="300" x2="580" y2="300" />
          <line x1="85" y1="85" x2="515" y2="515" />
          <line x1="85" y1="515" x2="515" y2="85" />
        </g>
        
        {/* Zodiac Signs */}
        {ZODIAC_DATA.map((sign) => {
            const currentSignName = isSerbian ? sign.sr : sign.eng;
            const isSelected = selectedValue === currentSignName;
            
            return (
                <g key={sign.eng} 
                    onClick={() => !disabled && onSelect(currentSignName)}
                    className={cn("cursor-pointer group", disabled && "cursor-not-allowed")}
                >
                    {/* Invisible click area for better UX */}
                    <path 
                        d={`M ${sign.textPos.x-40} ${sign.textPos.y-40} L ${sign.textPos.x+40} ${sign.textPos.y-40} L ${sign.textPos.x+40} ${sign.textPos.y+40} L ${sign.textPos.x-40} ${sign.textPos.y+40} Z`}
                        fill="transparent"
                    />
                    <text 
                        x={sign.textPos.x} 
                        y={sign.textPos.y} 
                        textAnchor="middle" 
                        fontFamily="sans-serif"
                        fontSize="16"
                        className={cn(
                            "transition-colors duration-200",
                            isSelected ? "fill-primary" : "fill-muted-foreground group-hover:fill-primary"
                        )}
                    >
                        {sign.symbol} {currentSignName}
                    </text>
                     <text
                        x={sign.emojiPos.x}
                        y={sign.emojiPos.y}
                        textAnchor="middle"
                        fontSize="24"
                        className={cn(
                            "transition-colors duration-200",
                            isSelected ? "fill-primary" : "fill-[#1e3a8a] group-hover:fill-primary"
                        )}
                    >
                        {sign.emoji}
                    </text>
                </g>
            )
        })}
      </svg>
    </div>
  );
}
