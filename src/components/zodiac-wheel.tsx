
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

export function ZodiacWheel({ signs, onSelect, selectedValue, disabled }: ZodiacWheelProps) {
    const [isClient, setIsClient] = React.useState(false);
    const [lines, setLines] = React.useState<{x1: number, y1: number, x2: number, y2: number, transform: string}[]>([]);

    React.useEffect(() => {
        setIsClient(true);
        const newLines = [...Array(12)].map((_, i) => {
            const angle = i * (Math.PI / 6);
            return {
                x1: 300,
                y1: 300,
                x2: 300 + 290 * Math.cos(angle),
                y2: 300 + 290 * Math.sin(angle),
                transform: `rotate(15, 300, 300)`
            };
        });
        setLines(newLines);
    }, []);

    const handleSignClick = (sign: ZodiacSign) => {
        if (!disabled) {
            onSelect(sign);
        }
    };
    
    if (!isClient) {
        return <div className="relative mx-auto w-full max-w-[400px] sm:max-w-[450px] aspect-square flex items-center justify-center text-muted-foreground">Učitavanje...</div>;
    }

    const isSerbian = signs.includes("Ovan");
    const signNames = isSerbian ? ZODIAC_SIGNS_SR : ZODIAC_SIGNS_EN;

    const staticSigns = [
        { name: "Ovan", name_en: "Aries", symbol: '♈', x: 300, y: 55 },
        { name: "Bik", name_en: "Taurus", symbol: '♉', x: 420, y: 95 },
        { name: "Blizanci", name_en: "Gemini", symbol: '♊', x: 505, y: 190 },
        { name: "Rak", name_en: "Cancer", symbol: '♋', x: 545, y: 310 },
        { name: "Lav", name_en: "Leo", symbol: '♌', x: 505, y: 430 },
        { name: "Devica", name_en: "Virgo", symbol: '♍', x: 420, y: 520 },
        { name: "Vaga", name_en: "Libra", symbol: '♎', x: 300, y: 555 },
        { name: "Škorpija", name_en: "Scorpio", symbol: '♏', x: 180, y: 520 },
        { name: "Strelac", name_en: "Sagittarius", symbol: '♐', x: 95, y: 430 },
        { name: "Jarac", name_en: "Capricorn", symbol: '♑', x: 55, y: 310 },
        { name: "Vodolija", name_en: "Aquarius", symbol: '♒', x: 95, y: 190 },
        { name: "Ribe", name_en: "Pisces", symbol: '♓', x: 180, y: 95 },
    ];

    return (
        <div
            className={cn(
                "relative mx-auto w-full max-w-[400px] sm:max-w-[450px] aspect-square",
                disabled && "opacity-50 cursor-not-allowed"
            )}
        >
            <svg viewBox="0 0 600 600" className="w-full h-full">
                <defs>
                    <radialGradient id="sun-glow" cx="50%" cy="50%" r="50%">
                        <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                    </radialGradient>
                </defs>

                <circle cx="300" cy="300" r="290" fill="transparent" stroke="hsl(var(--border))" strokeWidth="1" />
                <circle cx="300" cy="300" r="220" fill="transparent" stroke="hsl(var(--border))" strokeWidth="1" />
                <circle cx="300" cy="300" r="100" fill="url(#sun-glow)" />
                <circle cx="300" cy="300" r="50" fill="hsl(var(--primary))" />
                <circle cx="300" cy="300" r="100" fill="transparent" stroke="hsl(var(--primary))" strokeWidth="1.5" />
                
                <g stroke="hsl(var(--border))" strokeWidth="1">
                    {lines.map((line, i) => (
                        <line
                            key={`line-${i}`}
                            x1={line.x1}
                            y1={line.y1}
                            x2={line.x2}
                            y2={line.y2}
                            transform={line.transform}
                        />
                    ))}
                </g>

                <g fontFamily="Lora, serif" fontSize="22" textAnchor="middle">
                    {staticSigns.map(({ name, name_en, symbol, x, y }) => {
                        const currentSign = isSerbian ? name : name_en;
                        const isSelected = selectedValue === currentSign;
                        return (
                            <text
                                key={name}
                                x={x}
                                y={y}
                                onClick={() => handleSignClick(currentSign as ZodiacSign)}
                                className={cn(
                                    "cursor-pointer transition-all duration-300",
                                    isSelected ? "fill-accent" : "fill-primary",
                                    !disabled && "hover:fill-accent"
                                )}
                            >
                                {symbol}
                            </text>
                        );
                    })}
                </g>
            </svg>
        </div>
    );
}
