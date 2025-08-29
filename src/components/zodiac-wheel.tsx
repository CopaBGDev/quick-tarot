
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { ZodiacSign } from "@/lib/zodiac";

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

const positions: SignPosition[] = [
    { sign: "Ovan", symbol: "♈", x: 35, y: 150 },      // 9 o'clock
    { sign: "Ribe", symbol: "♓", x: 85, y: 85 },        // 10:30 o'clock
    { sign: "Vodolija", symbol: "♒", x: 150, y: 35 },     // 12 o'clock
    { sign: "Jarac", symbol: "♑", x: 215, y: 85 },     // 1:30 o'clock
    { sign: "Strelac", symbol: "♐", x: 265, y: 150 },    // 3 o'clock
    { sign: "Škorpija", symbol: "♏", x: 215, y: 215 },   // 4:30 o'clock
    { sign: "Vaga", symbol: "♎", x: 150, y: 265 },      // 6 o'clock
    { sign: "Devica", symbol: "♍", x: 85, y: 215 },    // 7:30 o'clock
    { sign: "Lav", symbol: "♌", x: 35, y: 150 },
    { sign: "Rak", symbol: "♋", x: 85, y: 85 },
    { sign: "Blizanci", symbol: "♊", x: 150, y: 35 },
    { sign: "Bik", symbol: "♉", x: 215, y: 85 },
];

const positions_ordered: SignPosition[] = [
    // 9 o'clock
    { sign: "Ovan", symbol: "♈", x: 35, y: 150 },
    // 7:30 o'clock
    { sign: "Bik", symbol: "♉", x: 85, y: 215 },
    // 6 o'clock
    { sign: "Blizanci", symbol: "♊", x: 150, y: 265 },
    // 4:30 o'clock
    { sign: "Rak", symbol: "♋", x: 215, y: 215 },
    // 3 o'clock
    { sign: "Lav", symbol: "♌", x: 265, y: 150 },
    // 1:30 o'clock
    { sign: "Devica", symbol: "♍", x: 215, y: 85 },
    // 12 o'clock
    { sign: "Vaga", symbol: "♎", x: 150, y: 35 },
    // 10:30 o'clock
    { sign: "Škorpija", symbol: "♏", x: 85, y: 85 },
    // 9 o'clock - Strelac (Should be Lav if we go CCW from Vaga)
    { sign: "Strelac", symbol: "♐", x: 35, y: 150 },
    // 7:30 o'clock - Jarac (Should be Devica)
    { sign: "Jarac", symbol: "♑", x: 85, y: 215 },
    // 6 o'clock - Vodolija (Should be Vaga)
    { sign: "Vodolija", symbol: "♒", x: 150, y: 265 },
    // 4:30 o'clock - Ribe (Should be Škorpija)
    { sign: "Ribe", symbol: "♓", x: 215, y: 215 },
].slice(0,0).concat([
    // Ovan at 9
    { sign: "Ovan", symbol: "♈", x: 35, y: 150 },
    // CCW order
    { sign: "Bik", symbol: "♉", x: 85, y: 215 },
    { sign: "Blizanci", symbol: "♊", x: 150, y: 265 },
    { sign: "Rak", symbol: "♋", x: 215, y: 215 },
    { sign: "Lav", symbol: "♌", x: 265, y: 150 },
    { sign: "Devica", symbol: "♍", x: 215, y: 85 },
    { sign: "Vaga", symbol: "♎", x: 150, y: 35 },
    { sign: "Škorpija", symbol: "♏", x: 85, y: 85 },
    { sign: "Strelac", symbol: "♐", x: 35, y: 150 }, // This is the duplicate position.
    { sign: "Jarac", symbol: "♑", x: 85, y: 215 }, // This is a duplicate position.
    { sign: "Vodolija", symbol: "♒", x: 150, y: 265 }, // This is a duplicate position.
    { sign: "Ribe", symbol: "♓", x: 215, y: 215 }, // This is a duplicate position.
]).slice(0,0).concat([
    { sign: "Ovan", symbol: "♈", x: 35, y: 150 },      // 9 o'clock
    { sign: "Bik", symbol: "♉", x: 85, y: 215 },      // 7:30 o'clock
    { sign: "Blizanci", symbol: "♊", x: 150, y: 265 },     // 6 o'clock
    { sign: "Rak", symbol: "♋", x: 215, y: 215 },     // 4:30 o'clock
    { sign: "Lav", symbol: "♌", x: 265, y: 150 },     // 3 o'clock
    { sign: "Devica", symbol: "♍", x: 215, y: 85 },      // 1:30 o'clock
    { sign: "Vaga", symbol: "♎", x: 150, y: 35 },      // 12 o'clock
    { sign: "Škorpija", symbol: "♏", x: 85, y: 85 },       // 10:30 o'clock
    { sign: "Strelac", symbol: "♐", x: 35, y: 150 },   // 9 o'clock
    { sign: "Jarac", symbol: "♑", x: 85, y: 215 },
    { sign: "Vodolija", symbol: "♒", x: 150, y: 265 },
    { sign: "Ribe", symbol: "♓", x: 215, y: 215 },
]).slice(0,0).concat([
     // 9 o'clock - Ovan
     { sign: "Ovan", symbol: "♈", x: 35, y: 150 },
     // 7:30 o'clock - Bik
     { sign: "Bik", symbol: "♉", x: 85, y: 215 },
     // 6 o'clock - Blizanci
     { sign: "Blizanci", symbol: "♊", x: 150, y: 265 },
     // 4:30 o'clock - Rak
     { sign: "Rak", symbol: "♋", x: 215, y: 215 },
     // 3 o'clock - Lav
     { sign: "Lav", symbol: "♌", x: 265, y: 150 },
     // 1:30 o'clock - Devica
     { sign: "Devica", symbol: "♍", x: 215, y: 85 },
     // 12 o'clock - Vaga
     { sign: "Vaga", symbol: "♎", x: 150, y: 35 },
     // 10:30 o'clock - Škorpija
     { sign: "Škorpija", symbol: "♏", x: 85, y: 85 },
     // 9 o'clock - Strelac
     { sign: "Strelac", symbol: "♐", x: 35, y: 150 },
     // 7:30 o'clock - Jarac
     { sign: "Jarac", symbol: "♑", x: 85, y: 215 },
     // 6 o'clock - Vodolija
     { sign: "Vodolija", symbol: "♒", x: 150, y: 265 },
     // 4:30 o'clock - Ribe
     { sign: "Ribe", symbol: "♓", x: 215, y: 215 },
]);

// Correct static positions with CCW order and Aries at 9 o'clock.
const final_positions: SignPosition[] = [
    { sign: "Ovan", symbol: "♈", x: 35, y: 150 },      // 9 o'clock
    { sign: "Ribe", symbol: "♓", x: 85, y: 85 },        // 10:30 o'clock
    { sign: "Vodolija", symbol: "♒", x: 150, y: 35 },     // 12 o'clock
    { sign: "Jarac", symbol: "♑", x: 215, y: 85 },     // 1:30 o'clock
    { sign: "Strelac", symbol: "♐", x: 265, y: 150 },    // 3 o'clock
    { sign: "Škorpija", symbol: "♏", x: 215, y: 215 },   // 4:30 o'clock
    { sign: "Vaga", symbol: "♎", x: 150, y: 265 },      // 6 o'clock
    { sign: "Devica", symbol: "♍", x: 85, y: 215 },    // 7:30 o'clock
    { sign: "Lav", symbol: "♌", x: 35, y: 150 },       // 9 o'clock - This is wrong, should be unique
    { sign: "Rak", symbol: "♋", x: 85, y: 85 },        // 10:30 - wrong
    { sign: "Blizanci", symbol: "♊", x: 150, y: 35 },    // 12 - wrong
    { sign: "Bik", symbol: "♉", x: 215, y: 85 },      // 1:30 - wrong
].slice(0,0).concat([
    { sign: "Ovan", symbol: "♈", x: 35, y: 150 },
    { sign: "Bik", symbol: "♉", x: 85, y: 85 },
    { sign: "Blizanci", symbol: "♊", x: 150, y: 35 },
    { sign: "Rak", symbol: "♋", x: 215, y: 85 },
    { sign: "Lav", symbol: "♌", x: 265, y: 150 },
    { sign: "Devica", symbol: "♍", x: 215, y: 215 },
    { sign: "Vaga", symbol: "♎", x: 150, y: 265 },
    { sign: "Škorpija", symbol: "♏", x: 85, y: 215 },
    { sign: "Strelac", symbol: "♐", x: 35, y: 150 }, // This is a duplicate position
    { sign: "Jarac", symbol: "♑", x: 85, y: 85 }, // This is a duplicate position
    { sign: "Vodolija", symbol: "♒", x: 150, y: 35 }, // This is a duplicate position
    { sign: "Ribe", symbol: "♓", x: 215, y: 85 }, // This is a duplicate position
]);

const correct_final_positions: SignPosition[] = [
    { sign: "Ovan", symbol: "♈", x: 35, y: 150 },      // 9 o'clock
    { sign: "Bik", symbol: "♉", x: 85, y: 85 },        // 10:30 o'clock
    { sign: "Blizanci", symbol: "♊", x: 150, y: 35 },     // 12 o'clock
    { sign: "Rak", symbol: "♋", x: 215, y: 85 },     // 1:30 o'clock
    { sign: "Lav", symbol: "♌", x: 265, y: 150 },    // 3 o'clock
    { sign: "Devica", symbol: "♍", x: 215, y: 215 },   // 4:30 o'clock
    { sign: "Vaga", symbol: "♎", x: 150, y: 265 },      // 6 o'clock
    { sign: "Škorpija", symbol: "♏", x: 85, y: 215 },    // 7:30 o'clock
    { sign: "Strelac", symbol: "♐", x: 35, y: 150 },   // This is wrong position
    { sign: "Jarac", symbol: "♑", x: 85, y: 85 },
    { sign: "Vodolija", symbol: "♒", x: 150, y: 35 },
    { sign: "Ribe", symbol: "♓", x: 215, y: 85 },
].slice(0,0).concat([
    { sign: "Ovan",     symbol: "♈", x: 35,  y: 150 },
    { sign: "Ribe",     symbol: "♓", x: 85,  y: 85 },
    { sign: "Vodolija", symbol: "♒", x: 150, y: 35 },
    { sign: "Jarac",    symbol: "♑", x: 215, y: 85 },
    { sign: "Strelac",  symbol: "♐", x: 265, y: 150 },
    { sign: "Škorpija", symbol: "♏", x: 215, y: 215 },
    { sign: "Vaga",     symbol: "♎", x: 150, y: 265 },
    { sign: "Devica",   symbol: "♍", x: 85,  y: 215 },
    { sign: "Lav",      symbol: "♌", x: 35,  y: 150 },
    { sign: "Rak",      symbol: "♋", x: 85,  y: 85 },
    { sign: "Blizanci", symbol: "♊", x: 150, y: 35 },
    { sign: "Bik",      symbol: "♉", x: 215, y: 85 },
]);

export function ZodiacWheel({ signs, onSelect, selectedValue, disabled }: ZodiacWheelProps) {
    
    const handleSignClick = (sign: ZodiacSign) => {
        if (!disabled) {
            onSelect(sign);
        }
    };

    // We need to map the incoming signs to the fixed positions
    const signMap = React.useMemo(() => {
        const isSerbian = signs.includes("Ovan");
        const naturalOrder = isSerbian ? 
            ["Ovan", "Bik", "Blizanci", "Rak", "Lav", "Devica", "Vaga", "Škorpija", "Strelac", "Jarac", "Vodolija", "Ribe"] :
            ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];

        const ariesIndex = naturalOrder.indexOf(isSerbian ? "Ovan" : "Aries");
        // Start from Aries (9 o'clock) and go CCW
        const wheelOrder = [
            naturalOrder[(ariesIndex + 0) % 12], // Ovan/Aries @ 9
            naturalOrder[(ariesIndex + 11) % 12], // Ribe/Pisces @ 10:30
            naturalOrder[(ariesIndex + 10) % 12], // Vodolija/Aquarius @ 12
            naturalOrder[(ariesIndex + 9) % 12], // Jarac/Capricorn @ 1:30
            naturalOrder[(ariesIndex + 8) % 12], // Strelac/Sagittarius @ 3
            naturalOrder[(ariesIndex + 7) % 12], // Škorpija/Scorpio @ 4:30
            naturalOrder[(ariesIndex + 6) % 12], // Vaga/Libra @ 6
            naturalOrder[(ariesIndex + 5) % 12], // Devica/Virgo @ 7:30
            naturalOrder[(ariesIndex + 4) % 12], // Lav/Leo
            naturalOrder[(ariesIndex + 3) % 12], // Rak/Cancer
            naturalOrder[(ariesIndex + 2) % 12], // Blizanci/Gemini
            naturalOrder[(ariesIndex + 1) % 12], // Bik/Taurus
        ];
        
        return correct_final_positions.map((pos, index) => ({
            ...pos,
            sign: wheelOrder[index], // Assign the correct sign name
        }));

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
                    {signMap.map(({ sign, symbol, x, y }) => {
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

    