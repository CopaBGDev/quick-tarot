
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

const ZODIAC_POSITIONS = [
    { name: "Aries", x: 300, y: 55 },
    { name: "Taurus", x: 420, y: 95 },
    { name: "Gemini", x: 505, y: 190 },
    { name: "Cancer", x: 545, y: 310 },
    { name: "Leo", x: 505, y: 430 },
    { name: "Virgo", x: 420, y: 520 },
    { name: "Libra", x: 300, y: 555 },
    { name: "Scorpio", x: 180, y: 520 },
    { name: "Sagittarius", x: 95, y: 430 },
    { name: "Capricorn", x: 55, y: 310 },
    { name: "Aquarius", x: 95, y: 190 },
    { name: "Pisces", x: 180, y: 95 },
];

const ZODIAC_SYMBOLS = {
    Aries: "♈", Taurus: "♉", Gemini: "♊", Cancer: "♋", Leo: "♌", Virgo: "♍",
    Libra: "♎", Scorpio: "♏", Sagittarius: "♐", Capricorn: "♑", Aquarius: "♒", Pisces: "♓",
    Ovan: "♈", Bik: "♉", Blizanci: "♊", Rak: "♋", Lav: "♌", Devica: "♍",
    Vaga: "♎", Škorpija: "♏", Strelac: "♐", Jarac: "♑", Vodolija: "♒", Ribe: "♓",
} as const;


export function ZodiacWheel({ signs, onSelect, selectedValue, disabled }: ZodiacWheelProps) {
    const [isClient, setIsClient] = React.useState(false);

    React.useEffect(() => {
        setIsClient(true);
    }, []);

    const handleSignClick = (sign: ZodiacSign) => {
        if (!disabled) {
            onSelect(sign);
        }
    };
    
    if (!isClient) {
        return <div className="relative mx-auto w-full max-w-[400px] sm:max-w-[450px] aspect-square flex items-center justify-center text-muted-foreground">Učitavanje...</div>;
    }

    const isSerbian = signs[0] === "Ovan";
    const signMap = isSerbian ? ZODIAC_SIGNS_SR : ZODIAC_SIGNS_EN;

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
                    {ZODIAC_POSITIONS.map((pos, i) => {
                        const currentSign = signMap[i];
                        const isSelected = selectedValue === currentSign;
                        return (
                            <g
                                key={pos.name}
                                onClick={() => handleSignClick(currentSign)}
                                className="cursor-pointer group"
                            >
                                <circle 
                                    cx={pos.x}
                                    cy={pos.y}
                                    r="30"
                                    fill="transparent"
                                />
                                <text
                                    x={pos.x}
                                    y={pos.y}
                                    className={cn(
                                        "transition-colors duration-300",
                                        isSelected
                                            ? "fill-accent"
                                            : "fill-primary group-hover:fill-accent"
                                    )}
                                >
                                    {ZODIAC_SYMBOLS[currentSign as keyof typeof ZODIAC_SYMBOLS]}
                                </text>
                            </g>
                        );
                    })}
                </g>
            </svg>
        </div>
    );
}
