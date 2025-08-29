
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { ZodiacSign } from "@/lib/zodiac";
import { getTranslations } from "@/lib/translations";

const ZODIAC_SYMBOLS: { [key: string]: string } = {
    "Aries": "♈", "Taurus": "♉", "Gemini": "♊", "Cancer": "♋", "Leo": "♌", "Virgo": "♍", "Libra": "♎", "Scorpio": "♏", "Sagittarius": "♐", "Capricorn": "♑", "Aquarius": "♒", "Pisces": "♓",
    "Ovan": "♈", "Bik": "♉", "Blizanci": "♊", "Rak": "♋", "Lav": "♌", "Devica": "♍", "Vaga": "♎", "Škorpija": "♏", "Strelac": "♐", "Jarac": "♑", "Vodolija": "♒", "Ribe": "♓",
};

// Center (170, 170), Radius 120 (increased by 20% from 100)
// Angles for CCW layout starting Aries at 9 o'clock
const FINAL_POSITIONS = [
    { x: 50, y: 170 },   // Aries (9 o'clock, 180 deg)
    { x: 80, y: 254 },   // Taurus (210 deg)
    { x: 140, y: 290 },  // Gemini (240 deg)
    { x: 170, y: 300 },  // Cancer (270 deg, 6 o'clock)
    { x: 200, y: 290 },  // Leo (300 deg)
    { x: 260, y: 254 },  // Virgo (330 deg)
    { x: 290, y: 170 },  // Libra (0/360 deg, 3 o'clock)
    { x: 260, y: 86 },   // Scorpio (30 deg)
    { x: 200, y: 50 },   // Sagittarius (60 deg)
    { x: 170, y: 40 },   // Capricorn (90 deg, 12 o'clock)
    { x: 140, y: 50 },   // Aquarius (120 deg)
    { x: 80, y: 86 },    // Pisces (150 deg)
];

const NATURAL_ORDER_EN = [ "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces" ];

interface ZodiacWheelProps {
    signs: readonly ZodiacSign[];
    onSelect: (sign: ZodiacSign) => void;
    selectedValue?: ZodiacSign;
    disabled?: boolean;
}

export function ZodiacWheel({ signs, onSelect, selectedValue, disabled }: ZodiacWheelProps) {

    const handleSignClick = (sign: ZodiacSign) => {
        if (!disabled) {
            onSelect(sign);
        }
    };
    
    // Determine the order based on the language of the provided signs
    const isSerbian = signs.includes("Ovan");
    const naturalOrder = isSerbian ? getTranslations('sr').zodiacSigns : getTranslations('en').zodiacSigns;

    // This is the visual order on the wheel, starting with Aries at 9 o'clock and going CCW
    const displayOrder = [
        "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", 
        "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
    ];

    return (
        <div
            className={cn(
                "relative mx-auto w-[340px] h-[340px]",
                disabled && "opacity-50 cursor-not-allowed"
            )}
        >
            <div className="w-full h-full relative">
                {FINAL_POSITIONS.map((pos, index) => {
                    const englishSignName = displayOrder[index];
                    const naturalIndex = NATURAL_ORDER_EN.indexOf(englishSignName);
                    const sign = naturalOrder[naturalIndex];

                    const symbol = ZODIAC_SYMBOLS[englishSignName];
                    const isSelected = selectedValue === sign;
                    return (
                        <div
                            key={sign}
                            onClick={() => handleSignClick(sign)}
                            className="cursor-pointer group absolute"
                            style={{
                                left: `${pos.x}px`,
                                top: `${pos.y}px`,
                                transform: 'translate(-50%, -50%)',
                            }}
                        >
                            <div
                                className={cn(
                                    "w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300",
                                    isSelected
                                        ? "bg-primary"
                                        : "bg-accent/70 group-hover:bg-accent"
                                )}
                            >
                                <span
                                    className={cn(
                                        "font-sans text-2xl transition-colors duration-300 pointer-events-none",
                                        isSelected ? 'text-primary-foreground' : 'text-accent-foreground'
                                    )}
                                >
                                    {symbol}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
