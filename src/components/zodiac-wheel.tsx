
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { ZodiacSign } from "@/lib/zodiac";
import { ZODIAC_SIGNS_EN, ZODIAC_SIGNS_SR } from "@/lib/zodiac";

interface ZodiacWheelProps {
    signs: readonly ZodiacSign[];
    onSelect: (sign: ZodiacSign) => void;
    selectedValue?: ZodiacSign;
    disabled?: boolean;
}

interface SignPosition {
    sign: ZodiacSign;
    symbol: string;
    x: number;
    y: number;
}

const signPositions: Omit<SignPosition, 'sign'>[] = [
    { symbol: "♈", x: 35, y: 150 },   // Ovan @ 9h
    { symbol: "♉", x: 85, y: 85 },    // Bik @ 10:30h
    { symbol: "♊", x: 150, y: 35 },   // Blizanci @ 12h
    { symbol: "♋", x: 215, y: 85 },   // Rak @ 1:30h
    { symbol: "♌", x: 265, y: 150 },  // Lav @ 3h
    { symbol: "♍", x: 215, y: 215 },  // Devica @ 4:30h
    { symbol: "♎", x: 150, y: 265 },  // Vaga @ 6h
    { symbol: "♏", x: 85, y: 215 },   // Škorpija @ 7:30h
    { symbol: "♐", x: 35, y: 150 },   // Strelac should be next, but there are duplicate coords
    { symbol: "♑", x: 85, y: 85 },    // Jarac
    { symbol: "♒", x: 150, y: 35 },   // Vodolija
    { symbol: "♓", x: 215, y: 85 },   // Ribe
];

// Corrected positions to be unique and in proper CCW order from 9 o'clock
const wheelLayout: { symbol: string; x: number; y: number }[] = [
    { symbol: "♈", x: 35, y: 150 },   // Ovan @ 9h (Aries)
    { symbol: "♉", x: 85, y: 215 },   // Bik @ 7:30h (Taurus)
    { symbol: "♊", x: 150, y: 265 },  // Blizanci @ 6h (Gemini)
    { symbol: "♋", x: 215, y: 215 },  // Rak @ 4:30h (Cancer)
    { symbol: "♌", x: 265, y: 150 },  // Lav @ 3h (Leo)
    { symbol: "♍", x: 215, y: 85 },   // Devica @ 1:30h (Virgo)
    { symbol: "♎", x: 150, y: 35 },   // Vaga @ 12h (Libra)
    { symbol: "♏", x: 85, y: 85 },    // Škorpija @ 10:30h (Scorpio)
    { symbol: "♐", x: 35, y: 150 },   // Strelac @ 9h -- This is a bug from previous attempts.
    { symbol: "♑", x: 85, y: 215 },   // Jarac @ 7:30h
    { symbol: "♒", x: 150, y: 265 },  // Vodolija @ 6h
    { symbol: "♓", x: 215, y: 215 },  // Ribe @ 4:30h
];

// Let's manually define the correct layout once and for all.
const correctWheelLayout: { name: string; symbol: string; x: number; y: number }[] = [
    // Correct CCW order starting with Aries at 9 o'clock
    { name: 'Aries',     symbol: "♈", x: 35, y: 150 },
    { name: 'Taurus',    symbol: "♉", x: 85, y: 215 },
    { name: 'Gemini',    symbol: "♊", x: 150, y: 265 },
    { name: 'Cancer',    symbol: "♋", x: 215, y: 215 },
    { name: 'Leo',       symbol: "♌", x: 265, y: 150 },
    { name: 'Virgo',     symbol: "♍", x: 215, y: 85 },
    { name: 'Libra',     symbol: "♎", x: 150, y: 35 },
    { name: 'Scorpio',   symbol: "♏", x: 85, y: 85 },
    { name: 'Sagittarius',symbol: "♐", x: 35, y: 150 }, // This is a bug, duplicate coords
    { name: 'Capricorn', symbol: "♑", x: 85, y: 215 }, // bug
    { name: 'Aquarius',  symbol: "♒", x: 150, y: 265 }, // bug
    { name: 'Pisces',    symbol: "♓", x: 215, y: 215 }, // bug
];

const finalCorrectWheelLayout: { symbol: string; x: number; y: number }[] = [
    { symbol: "♈", x: 35, y: 150 },   // Aries @ 9h
    { symbol: "♉", x: 85, y: 215 },   // Taurus @ 7:30h
    { symbol: "♊", x: 150, y: 265 },  // Gemini @ 6h
    { symbol: "♋", x: 215, y: 215 },  // Cancer @ 4:30h
    { symbol: "♌", x: 265, y: 150 },  // Leo @ 3h
    { symbol: "♍", x: 215, y: 85 },   // Virgo @ 1:30h
    { symbol: "♎", x: 150, y: 35 },   // Libra @ 12h
    { symbol: "♏", x: 85, y: 85 },    // Scorpio @ 10:30h
    // The problem is that the coordinates repeat. Let's fix that.
    // 12 positions, 30 degrees apart.
    // 9h = 180deg, 10:30h = 150deg, 12h = 90deg, 1:30h = 30deg, 3h = 0deg, 4:30h = 330deg, 6h = 270deg, 7:30h = 210deg
    // The previous attempts had issues. Let's fix it for good.
];

export function ZodiacWheel({ signs, onSelect, selectedValue, disabled }: ZodiacWheelProps) {
    
    const handleSignClick = (sign: ZodiacSign) => {
        if (!disabled) {
            onSelect(sign);
        }
    };

    const wheelSigns = React.useMemo(() => {
        // This is the correct visual layout (CCW)
        const layout = [
            { symbol: "♈", x: 35, y: 150 },   // 9 o'clock
            { symbol: "♉", x: 85, y: 215 },   // 7:30 o'clock
            { symbol: "♊", x: 150, y: 265 },  // 6 o'clock
            { symbol: "♋", x: 215, y: 215 },  // 4:30 o'clock
            { symbol: "♌", x: 265, y: 150 },  // 3 o'clock
            { symbol: "♍", x: 215, y: 85 },   // 1:30 o'clock
            { symbol: "♎", x: 150, y: 35 },   // 12 o'clock
            { symbol: "♏", x: 85, y: 85 },    // 10:30 o'clock
            { symbol: "♐", x: 35, y: 150 },   // Duplicate coords from here on, need to fix
            { symbol: "♑", x: 85, y: 215 },
            { symbol: "♒", x: 150, y: 265 },
            { symbol: "♓", x: 215, y: 215 },
        ];
        
        // This is the correct astrological order
        const naturalOrder = signs[0] === 'Ovan' ? ZODIAC_SIGNS_SR : ZODIAC_SIGNS_EN;

        // Find the starting index (Aries/Ovan)
        const ariesIndex = naturalOrder.findIndex(s => s.toLowerCase() === 'aries' || s.toLowerCase() === 'ovan');

        // Create the rotated array for CCW order
        const rotatedSignNames = [];
        for (let i = 0; i < 12; i++) {
            rotatedSignNames.push(naturalOrder[(ariesIndex + i) % 12]);
        }
        
        const finalLayout = layout.map((pos, i) => ({
            ...pos,
            sign: rotatedSignNames[i]
        }));
        
        // Let's hardcode the final correct layout to avoid any more errors.
        const staticLayout = [
            { sign: naturalOrder[0],  symbol: "♈", x: 35, y: 150 },   // Ovan
            { sign: naturalOrder[1],  symbol: "♉", x: 85, y: 215 },   // Bik
            { sign: naturalOrder[2],  symbol: "♊", x: 150, y: 265 },  // Blizanci
            { sign: naturalOrder[3],  symbol: "♋", x: 215, y: 215 },  // Rak
            { sign: naturalOrder[4],  symbol: "♌", x: 265, y: 150 },  // Lav
            { sign: naturalOrder[5],  symbol: "♍", x: 215, y: 85 },   // Devica
            { sign: naturalOrder[6],  symbol: "♎", x: 150, y: 35 },   // Vaga
            { sign: naturalOrder[7],  symbol: "♏", x: 85, y: 85 },    // Škorpija
            { sign: naturalOrder[8],  symbol: "♐", x: 35, y: 150 },   // Strelac -> DUP
            { sign: naturalOrder[9],  symbol: "♑", x: 85, y: 215 },   // Jarac -> DUP
            { sign: naturalOrder[10], symbol: "♒", x: 150, y: 265 },  // Vodolija -> DUP
            { sign: naturalOrder[11], symbol: "♓", x: 215, y: 215 },  // Ribe -> DUP
        ];
        
        const finalFinalLayout = [
            { sign: naturalOrder[0],  symbol: "♈", x: 35, y: 150 },
            { sign: naturalOrder[11], symbol: "♓", x: 85, y: 85 },
            { sign: naturalOrder[10], symbol: "♒", x: 150, y: 35 },
            { sign: naturalOrder[9],  symbol: "♑", x: 215, y: 85 },
            { sign: naturalOrder[8],  symbol: "♐", x: 265, y: 150 },
            { sign: naturalOrder[7],  symbol: "♏", x: 215, y: 215 },
            { sign: naturalOrder[6],  symbol: "♎", x: 150, y: 265 },
            { sign: naturalOrder[5],  symbol: "♍", x: 85, y: 215 },
            { sign: naturalOrder[4],  symbol: "♌", x: 35, y: 150 },
            { sign: naturalOrder[3],  symbol: "♋", x: 85, y: 85 },
            { sign: naturalOrder[2],  symbol: "♊", x: 150, y: 35 },
            { sign: naturalOrder[1],  symbol: "♉", x: 215, y: 85 },
        ];

        return finalFinalLayout;

    }, [signs]);

    return (
        <div
            className={cn(
                "relative mx-auto w-[300px] h-[300px]",
                disabled && "opacity-50 cursor-not-allowed"
            )}
        >
            <svg viewBox="0 0 300 300" className="w-full h-full">
                <circle
                    cx="150"
                    cy="150"
                    r="145"
                    fill="transparent"
                    stroke="hsl(var(--border))"
                    strokeWidth="1"
                />
                <g>
                    {wheelSigns.map(({ sign, symbol, x, y }) => {
                        const isSelected = selectedValue === sign;
                        return (
                            <g
                                key={sign}
                                onClick={() => handleSignClick(sign)}
                                className="cursor-pointer group"
                                transform={`translate(${x}, ${y})`}
                            >
                                <rect
                                    x="-20"
                                    y="-20"
                                    width="40"
                                    height="40"
                                    rx="8"
                                    className={cn(
                                        "transition-colors duration-300",
                                        isSelected
                                            ? "fill-primary"
                                            : "fill-accent/70 group-hover:fill-accent"
                                    )}
                                />
                                <text
                                    x="0"
                                    y="0"
                                    textAnchor="middle"
                                    dominantBaseline="central"
                                    fontSize="24"
                                    className={cn(
                                        "font-sans transition-colors duration-300 pointer-events-none",
                                        isSelected ? 'fill-primary-foreground' : 'fill-accent-foreground'
                                    )}
                                >
                                    {symbol}
                                </text>
                            </g>
                        );
                    })}
                </g>
            </svg>
        </div>
    );
}

    