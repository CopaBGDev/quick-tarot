
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { ZodiacSign } from "@/lib/zodiac";

const ZODIAC_ORDER_EN = [ "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces" ];
const ZODIAC_ORDER_SR = [ "Ovan", "Bik", "Blizanci", "Rak", "Lav", "Devica", "Vaga", "Škorpija", "Strelac", "Jarac", "Vodolija", "Ribe" ];

const ZODIAC_SYMBOLS: { [key: string]: string } = {
    "Aries": "♈", "Taurus": "♉", "Gemini": "♊", "Cancer": "♋", "Leo": "♌", "Virgo": "♍", "Libra": "♎", "Scorpio": "♏", "Sagittarius": "♐", "Capricorn": "♑", "Aquarius": "♒", "Pisces": "♓",
    "Ovan": "♈", "Bik": "♉", "Blizanci": "♊", "Rak": "♋", "Lav": "♌", "Devica": "♍", "Vaga": "♎", "Škorpija": "♏", "Strelac": "♐", "Jarac": "♑", "Vodolija": "♒", "Ribe": "♓",
};

// Fixed positions for 12 signs in a circle
const positions = [
    { x: 50, y: 150 },   // Pos 9 o'clock
    { x: 85, y: 85 },
    { x: 150, y: 50 },   // Pos 12 o'clock
    { x: 215, y: 85 },
    { x: 250, y: 150 },  // Pos 3 o'clock
    { x: 215, y: 215 },
    { x: 150, y: 250 },  // Pos 6 o'clock
    { x: 85, y: 215 },
    // Missing positions were here. Let's fix it by defining all 12 based on a circle.
    // Recalculating all 12 positions for visual correctness.
    // Center (150, 150), Radius ~100
    // Angle starts at 180 deg (9 o'clock) and goes clockwise for positions, but signs are CCW.
    { x: 150 + 100 * Math.cos(Math.PI), y: 150 + 100 * Math.sin(Math.PI) }, // 9 o'clock
    { x: 150 + 100 * Math.cos(5 * Math.PI / 3), y: 150 + 100 * Math.sin(5 * Math.PI / 3) },
    { x: 150 + 100 * Math.cos(11 * Math.PI / 6), y: 150 + 100 * Math.sin(11 * Math.PI / 6) },
    { x: 150 + 100 * Math.cos(0), y: 150 + 100 * Math.sin(0) }, // 3 o'clock
    { x: 150 + 100 * Math.cos(Math.PI / 6), y: 150 + 100 * Math.sin(Math.PI / 6) },
    { x: 150 + 100 * Math.cos(Math.PI / 3), y: 150 + 100 * Math.sin(Math.PI / 3) },
    { x: 150 + 100 * Math.cos(Math.PI / 2), y: 150 + 100 * Math.sin(Math.PI / 2) }, // 6 o'clock
    { x: 150 + 100 * Math.cos(2 * Math.PI / 3), y: 150 + 100 * Math.sin(2 * Math.PI / 3) },
    { x: 150 + 100 * Math.cos(5 * Math.PI / 6), y: 150 + 100 * Math.sin(5 * Math.PI / 6) },
    { x: 150 + 100 * Math.cos(7 * Math.PI / 6), y: 150 + 100 * Math.sin(7 * Math.PI / 6) },
    { x: 150 + 100 * Math.cos(4 * Math.PI / 3), y: 150 + 100 * Math.sin(4 * Math.PI / 3) },
    { x: 150 + 100 * Math.cos(3 * Math.PI / 2), y: 150 + 100 * Math.sin(3 * Math.PI / 2) }, // 12 o'clock
];

const wheelLayoutPositions = [
    { x: 50, y: 150 },   // Pos 9 (Aries)
    { x: 85, y: 215 },  // Pos 8
    { x: 150, y: 250 }, // Pos 7 (6 o'clock)
    { x: 215, y: 215 }, // Pos 6
    { x: 250, y: 150 },  // Pos 5 (3 o'clock)
    { x: 215, y: 85 },  // Pos 4
    { x: 150, y: 50 },   // Pos 3 (12 o'clock)
    { x: 85, y: 85 },    // Pos 2
    // Correctly adding all 12 positions
    { x: 50, y: 150 },   // Aries (9 o'clock)
    { x: 85, y: 85 },    // Pisces
    { x: 150, y: 50 },   // Aquarius (12 o'clock)
    { x: 215, y: 85 },   // Capricorn
    { x: 250, y: 150 },  // Sagittarius (3 o'clock)
    { x: 215, y: 215 },  // Scorpio
    { x: 150, y: 250 },  // Libra (6 o'clock)
    { x: 85, y: 215 },   // Virgo
    { x: 50, y: 150 },   // Leo - THIS IS THE PROBLEM, positions repeat
];

const FINAL_POSITIONS = [
    { x: 50, y: 150 },   // 9 o'clock
    { x: 67, y: 95 },
    { x: 108, y: 58 },
    { x: 150, y: 50 },   // 12 o'clock
    { x: 192, y: 58 },
    { x: 233, y: 95 },
    { x: 250, y: 150 },  // 3 o'clock
    { x: 233, y: 205 },
    { x: 192, y: 242 },
    { x: 150, y: 250 },  // 6 o'clock
    { x: 108, y: 242 },
    { x: 67, y: 205 },
];


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

    const isSerbian = signs.includes("Ovan");
    const naturalOrder = isSerbian ? ZODIAC_ORDER_SR : ZODIAC_ORDER_EN;
    
    // Rotate the natural order so Aries is at the start of our custom sequence
    // Aries starts at Sagittarius's spot (9th sign) then CCW
    const ariesIndex = naturalOrder.indexOf(isSerbian ? "Ovan" : "Aries");
    
    const displayOrder = [];
    for (let i = 0; i < 12; i++) {
        // Start from Aries and go backwards (CCW)
        displayOrder.push(naturalOrder[(ariesIndex - i + 12) % 12]);
    }

    return (
        <div
            className={cn(
                "relative mx-auto w-[300px] h-[300px]",
                disabled && "opacity-50 cursor-not-allowed"
            )}
        >
            <div className="w-full h-full relative">
                {FINAL_POSITIONS.map((pos, index) => {
                    const sign = displayOrder[index];
                    const symbol = ZODIAC_SYMBOLS[sign];
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
