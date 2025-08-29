
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

const ZODIAC_SYMBOLS = {
    Aries: "♈", Taurus: "♉", Gemini: "♊", Cancer: "♋", Leo: "♌", Virgo: "♍",
    Libra: "♎", Scorpio: "♏", Sagittarius: "♐", Capricorn: "♑", Aquarius: "♒", Pisces: "♓",
    Ovan: "♈", Bik: "♉", Blizanci: "♊", Rak: "♋", Lav: "♌", Devica: "♍",
    Vaga: "♎", Škorpija: "♏", Strelac: "♐", Jarac: "♑", Vodolija: "♒", Ribe: "♓",
} as const;

interface SignPosition {
    sign: ZodiacSign;
    symbol: string;
    x: number;
    y: number;
}


export function ZodiacWheel({ signs, onSelect, selectedValue, disabled }: ZodiacWheelProps) {
    const [positions, setPositions] = React.useState<SignPosition[]>([]);

    React.useEffect(() => {
        const radius = 255;
        const centerX = 300;
        const centerY = 300;
        
        const isSerbian = signs[0] === 'Ovan';
        const signNames = isSerbian ? ZODIAC_SIGNS_SR : ZODIAC_SIGNS_EN;

        const newPositions = signNames.map((sign, i) => {
            const angle = (i / 12) * 2 * Math.PI - Math.PI / 2 - Math.PI / 6;
            return {
                sign: sign,
                symbol: ZODIAC_SYMBOLS[sign as keyof typeof ZODIAC_SYMBOLS],
                x: centerX + radius * Math.cos(angle),
                y: centerY + radius * Math.sin(angle),
            };
        });
        setPositions(newPositions);
    }, [signs]);

    const handleSignClick = (sign: ZodiacSign) => {
        if (!disabled) {
            onSelect(sign);
        }
    };
    
    if (positions.length === 0) {
        return <div className="relative mx-auto w-full max-w-[400px] sm:max-w-[450px] aspect-square flex items-center justify-center text-muted-foreground">Učitavanje...</div>;
    }

    return (
        <div
            className={cn(
                "relative mx-auto w-full max-w-[400px] sm:max-w-[450px] aspect-square",
                disabled && "opacity-50 cursor-not-allowed"
            )}
        >
            <svg viewBox="0 0 600 600" className="w-full h-full">
                {/* Outer decorative circle */}
                <circle
                    cx="300"
                    cy="300"
                    r="290"
                    fill="transparent"
                    stroke="hsl(var(--border))"
                    strokeWidth="1"
                />

                {/* Inner decorative circle */}
                 <circle
                    cx="300"
                    cy="300"
                    r="220"
                    fill="transparent"
                    stroke="hsl(var(--border))"
                    strokeWidth="1"
                />
                
                {/* Dividing lines */}
                <g stroke="hsl(var(--border))" strokeWidth="1">
                    {[...Array(12)].map((_, i) => {
                         const angle = i * (Math.PI / 6);
                         return (<line
                            key={`line-${i}`}
                            x1={300 + 220 * Math.cos(angle)}
                            y1={300 + 220 * Math.sin(angle)}
                            x2={300 + 290 * Math.cos(angle)}
                            y2={300 + 290 * Math.sin(angle)}
                        />)
                    })}
                </g>

                {/* Symbols */}
                <g fontFamily="sans-serif" fontSize="32" textAnchor="middle" dominantBaseline="central">
                    {positions.map(({ sign, symbol, x, y }) => {
                        const isSelected = selectedValue === sign;
                        return (
                            <g
                                key={sign}
                                onClick={() => handleSignClick(sign)}
                                className="cursor-pointer group"
                            >
                                <circle 
                                    cx={x}
                                    cy={y}
                                    r="35" // Increased radius for easier clicking
                                    fill="transparent"
                                />
                                <text
                                    x={x}
                                    y={y}
                                    className={cn(
                                        "transition-colors duration-300",
                                        isSelected
                                            ? "fill-accent"
                                            : "fill-primary group-hover:fill-accent"
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
