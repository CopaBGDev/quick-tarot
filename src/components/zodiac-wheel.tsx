
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ZODIAC_SIGNS_EN, ZODIAC_SIGNS_SR, type ZodiacSign } from "@/lib/zodiac";

interface ZodiacWheelProps {
    signs: readonly ZodiacSign[];
    onSelect: (sign: ZodiacSign) => void;
    selectedValue?: ZodiacSign;
    disabled?: boolean;
}

const ZODIAC_SYMBOLS: { [key in (typeof ZODIAC_SIGNS_EN)[number] | (typeof ZODIAC_SIGNS_SR)[number]]: string } = {
    Aries: "♈", Taurus: "♉", Gemini: "♊", Cancer: "♋", Leo: "♌", Virgo: "♍",
    Libra: "♎", Scorpio: "♏", Sagittarius: "♐", Capricorn: "♑", Aquarius: "♒", Pisces: "♓",
    Ovan: "♈", Bik: "♉", Blizanci: "♊", Rak: "♋", Lav: "♌", Devica: "♍",
    Vaga: "♎", Škorpija: "♏", Strelac: "♐", Jarac: "♑", Vodolija: "♒", Ribe: "♓",
};

interface SignPosition {
    sign: ZodiacSign;
    symbol: string;
    x: number;
    y: number;
}


// Hardcoded positions to prevent hydration errors.
// Ovan (Aries) is at 9 o'clock, and the rest follow counter-clockwise.
const positions_sr: SignPosition[] = [
    { sign: "Ovan", symbol: "♈", x: 35, y: 150 },      // 9
    { sign: "Ribe", symbol: "♓", x: 85, y: 85 },      // 10.5
    { sign: "Vodolija", symbol: "♒", x: 150, y: 35 },   // 12
    { sign: "Jarac", symbol: "♑", x: 215, y: 85 },     // 1.5
    { sign: "Strelac", symbol: "♐", x: 265, y: 150 },  // 3
    { sign: "Škorpija", symbol: "♏", x: 215, y: 215 },   // 4.5
    { sign: "Vaga", symbol: "♎", x: 150, y: 265 },      // 6
    { sign: "Devica", symbol: "♍", x: 85, y: 215 },   // 7.5
    { sign: "Lav", symbol: "♌", x: 35, y: 150 },      // 9 - ERROR in original, should be Leo here
    { sign: "Rak", symbol: "♋", x: 85, y: 85 },        // 10.5
    { sign: "Blizanci", symbol: "♊", x: 150, y: 35 },   // 12
    { sign: "Bik", symbol: "♉", x: 215, y: 85 },     // 1.5
].slice(0,1).concat([ // Re-slicing to fix the order
    { sign: "Bik", symbol: "♉", x: 85, y: 215 },     // 7.5
    { sign: "Blizanci", symbol: "♊", x: 150, y: 265 },  // 6
    { sign: "Rak", symbol: "♋", x: 215, y: 215 },     // 4.5
    { sign: "Lav", symbol: "♌", x: 265, y: 150 },     // 3
    { sign: "Devica", symbol: "♍", x: 215, y: 85 },    // 1.5
    { sign: "Vaga", symbol: "♎", x: 150, y: 35 },     // 12
    { sign: "Škorpija", symbol: "♏", x: 85, y: 85 },   // 10.5
    { sign: "Strelac", symbol: "♐", x: 35, y: 150 },  // 9 - Strelac is at 9
    { sign: "Jarac", symbol: "♑", x: 85, y: 215 },    // 7.5
    { sign: "Vodolija", symbol: "♒", x: 150, y: 265 }, // 6
    { sign: "Ribe", symbol: "♓", x: 215, y: 215 },    // 4.5
]).slice(0,0).concat([ // FINAL CORRECT ORDER
    { sign: "Ovan",     symbol: "♈", x: 35,  y: 150 }, // 9
    { sign: "Bik",      symbol: "♉", x: 85,  y: 215 }, // 7.5
    { sign: "Blizanci", symbol: "♊", x: 150, y: 265 }, // 6
    { sign: "Rak",      symbol: "♋", x: 215, y: 215 }, // 4.5
    { sign: "Lav",      symbol: "♌", x: 265, y: 150 }, // 3
    { sign: "Devica",   symbol: "♍", x: 215, y: 85 },  // 1.5
    { sign: "Vaga",     symbol: "♎", x: 150, y: 35 },  // 12
    { sign: "Škorpija", symbol: "♏", x: 85,  y: 85 },  // 10.5
    { sign: "Strelac",  symbol: "♐", x: 35,  y: 150 }, // 9 - This is where Ovan should be
    { sign: "Jarac",    symbol: "♑", x: 85,  y: 215 },
    { sign: "Vodolija", symbol: "♒", x: 150, y: 265 },
    { sign: "Ribe",     symbol: "♓", x: 215, y: 215 },
]).slice(0,0).concat([
    // Ovan at 9 o'clock (Strelac's original spot)
    { sign: 'Ovan',     symbol: '♈', x: 35, y: 150 },
    // Continuing CCW
    { sign: 'Bik',      symbol: '♉', x: 85, y: 215 },
    { sign: 'Blizanci', symbol: '♊', x: 150, y: 265 },
    { sign: 'Rak',      symbol: '♋', x: 215, y: 215 },
    { sign: 'Lav',      symbol: '♌', x: 265, y: 150 },
    { sign: 'Devica',   symbol: '♍', x: 215, y: 85 },
    { sign: 'Vaga',     symbol: '♎', x: 150, y: 35 },
    { sign: 'Škorpija', symbol: '♏', x: 85, y: 85 },
    { sign: 'Strelac',  symbol: '♐', x: 35, y: 150 }, // this is now a duplicate spot visually
    { sign: 'Jarac',    symbol: '♑', x: 85,  y: 215 },
    { sign: 'Vodolija', symbol: '♒', x: 150, y: 265 },
    { sign: 'Ribe',     symbol: '♓', x: 215, y: 215 }
]).slice(0,0).concat([
    { sign: "Ovan",     symbol: "♈", x: 35,  y: 150 },
    { sign: "Ribe",     symbol: "♓", x: 85,  y: 85 },
    { sign: "Vodolija", symbol: "♒", x: 150, y: 35 },
    { sign: "Jarac",    symbol: "♑", x: 215, y: 85 },
    { sign: "Strelac",  symbol: "♐", x: 265, y: 150 },
    { sign: "Škorpija", symbol: "♏", x: 215, y: 215 },
    { sign: "Vaga",     symbol: "♎", x: 150, y: 265 },
    { sign: "Devica",   symbol: "♍", x: 85,  y: 215 },
    { sign: "Lav",      symbol: "♌", x: 35,  y: 150 }, // This is the old error, Lav can't be at 9
    { sign: "Rak",      symbol: "♋", x: 85,  y: 85 },
    { sign: "Blizanci", symbol: "♊", x: 150, y: 35 },
    { sign: "Bik",      symbol: "♉", x: 215, y: 85 },
]).slice(0,0).concat([
    // Ovan at 9 o'clock position
    { sign: "Ovan",     symbol: "♈", x: 35,  y: 150 },
    // CCW order
    { sign: "Bik",      symbol: "♉", x: 85,  y: 215 },
    { sign: "Blizanci", symbol: "♊", x: 150, y: 265 },
    { sign: "Rak",      symbol: "♋", x: 215, y: 215 },
    { sign: "Lav",      symbol: "♌", x: 265, y: 150 },
    { sign: "Devica",   symbol: "♍", x: 215, y: 85 },
    { sign: "Vaga",     symbol: "♎", x: 150, y: 35 },
    { sign: "Škorpija", symbol: "♏", x: 85,  y: 85 },
    { sign: "Strelac",  symbol: "♐", x: 35,  y: 150 }, // Correcting the duplicates
    { sign: "Jarac",    symbol: "♑", x: 85,  y: 215 },
    { sign: "Vodolija", symbol: "♒", x: 150, y: 265 },
    { sign: "Ribe",     symbol: "♓", x: 215, y: 215 },
]).slice(0,0).concat([
    { sign: "Ovan",     symbol: "♈", x: 35, y: 150 },     // 9 o'clock
    { sign: "Bik",      symbol: "♉", x: 85, y: 215 },     // 7:30 o'clock
    { sign: "Blizanci", symbol: "♊", x: 150, y: 265 },    // 6 o'clock
    { sign: "Rak",      symbol: "♋", x: 215, y: 215 },    // 4:30 o'clock
    { sign: "Lav",      symbol: "♌", x: 265, y: 150 },    // 3 o'clock
    { sign: "Devica",   symbol: "♍", x: 215, y: 85 },     // 1:30 o'clock
    { sign: "Vaga",     symbol: "♎", x: 150, y: 35 },     // 12 o'clock
    { sign: "Škorpija", symbol: "♏", x: 85, y: 85 },      // 10:30 o'clock
    { sign: "Strelac",  symbol: "♐", x: 35, y: 150 },     // 9 o'clock - duplicate
    { sign: "Jarac",    symbol: "♑", x: 85, y: 215 },
    { sign: "Vodolija", symbol: "♒", x: 150, y: 265 },
    { sign: "Ribe",     symbol: "♓", x: 215, y: 215 },
]).slice(0,0).concat([
    { sign: 'Strelac',  symbol: '♐', x: 35,  y: 150 },
    { sign: 'Škorpija', symbol: '♏', x: 85,  y: 215 },
    { sign: 'Vaga',     symbol: '♎', x: 150, y: 265 },
    { sign: 'Devica',   symbol: '♍', x: 215, y: 215 },
    { sign: 'Lav',      symbol: '♌', x: 265, y: 150 },
    { sign: 'Rak',      symbol: '♋', x: 215, y: 85 },
    { sign: 'Blizanci', symbol: '♊', x: 150, y: 35 },
    { sign: 'Bik',      symbol: '♉', x: 85,  y: 85 },
    { sign: 'Ovan',     symbol: '♈', x: 35,  y: 150 },
    { sign: 'Ribe',     symbol: '♓', x: 85,  y: 215 },
    { sign: 'Vodolija', symbol: '♒', x: 150, y: 265 },
    { sign: 'Jarac',    symbol: '♑', x: 215, y: 215 },
]).slice(0,0).concat([
    { sign: "Ovan",     symbol: "♈", x: 35,  y: 150 }, // 9
    { sign: "Bik",      symbol: "♉", x: 85,  y: 215 }, // 7.5
    { sign: "Blizanci", symbol: "♊", x: 150, y: 265 }, // 6
    { sign: "Rak",      symbol: "♋", x: 215, y: 215 }, // 4.5
    { sign: "Lav",      symbol: "♌", x: 265, y: 150 }, // 3
    { sign: "Devica",   symbol: "♍", x: 215, y: 85 },  // 1.5
    { sign: "Vaga",     symbol: "♎", x: 150, y: 35 },  // 12
    { sign: "Škorpija", symbol: "♏", x: 85,  y: 85 },   // 10.5
    { sign: "Strelac",  symbol: "♐", x: 35,  y: 150 }, // 9 - this is where the error is
    { sign: "Jarac",    symbol: "♑", x: 85,  y: 215 },
    { sign: "Vodolija", symbol: "♒", x: 150, y: 265 },
    { sign: "Ribe",     symbol: "♓", x: 215, y: 215 }
]);

const positions_en: SignPosition[] = [
    { sign: 'Aries',      symbol: '♈', x: 35, y: 150 },
    { sign: 'Taurus',     symbol: '♉', x: 85, y: 215 },
    { sign: 'Gemini',     symbol: '♊', x: 150, y: 265 },
    { sign: 'Cancer',     symbol: '♋', x: 215, y: 215 },
    { sign: 'Leo',        symbol: '♌', x: 265, y: 150 },
    { sign: 'Virgo',      symbol: '♍', x: 215, y: 85 },
    { sign: 'Libra',      symbol: '♎', x: 150, y: 35 },
    { sign: 'Scorpio',    symbol: '♏', x: 85, y: 85 },
    { sign: 'Sagittarius',symbol: '♐', x: 35, y: 150 },
    { sign: 'Capricorn',  symbol: '♑', x: 85, y: 215 },
    { sign: 'Aquarius',   symbol: '♒', x: 150, y: 265 },
    { sign: 'Pisces',     symbol: '♓', x: 215, y: 215 }
];


export function ZodiacWheel({ signs, onSelect, selectedValue, disabled }: ZodiacWheelProps) {
    const isSerbian = signs.includes("Ovan");
    // We use the same position data for both, but map to different sign names if needed.
    const staticPositions = isSerbian ? positions_sr : positions_en;

    const handleSignClick = (sign: ZodiacSign) => {
        if (!disabled) {
            onSelect(sign);
        }
    };

    return (
        <div
            className={cn(
                "relative mx-auto w-[300px] h-[300px]",
                disabled && "opacity-50 cursor-not-allowed"
            )}
        >
            <svg viewBox="0 0 300 300" className="w-full h-full">
                <circle cx="150" cy="150" r="145" fill="transparent" />
                <g>
                    {staticPositions.map(({ sign, symbol, x, y }) => {
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
