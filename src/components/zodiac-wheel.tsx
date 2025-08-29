
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

    const isSerbian = signs.includes("Ovan");
    const signNames = isSerbian ? ZODIAC_SIGNS_SR : ZODIAC_SIGNS_EN;

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
                    {[...Array(12)].map((_, i) => (
                        <line
                            key={`line-${i}`}
                            x1="300"
                            y1="300"
                            x2={300 + 290 * Math.cos(i * (Math.PI / 6))}
                            y2={300 + 290 * Math.sin(i * (Math.PI / 6))}
                            transform={`rotate(15, 300, 300)`}
                        />
                    ))}
                </g>

                <g fontFamily="Lora, serif" fontSize="18" textAnchor="middle">
                    {[
                        { sign: 'Aries', symbol: '♈', x: 300, y: 55, name_sr: 'Ovan' },
                        { sign: 'Taurus', symbol: '♉', x: 420, y: 95, name_sr: 'Bik' },
                        { sign: 'Gemini', symbol: '♊', x: 505, y: 190, name_sr: 'Blizanci' },
                        { sign: 'Cancer', symbol: '♋', x: 545, y: 310, name_sr: 'Rak' },
                        { sign: 'Leo', symbol: '♌', x: 505, y: 430, name_sr: 'Lav' },
                        { sign: 'Virgo', symbol: '♍', x: 420, y: 520, name_sr: 'Devica' },
                        { sign: 'Libra', symbol: '♎', x: 300, y: 555, name_sr: 'Vaga' },
                        { sign: 'Scorpio', symbol: '♏', x: 180, y: 520, name_sr: 'Škorpija' },
                        { sign: 'Sagittarius', symbol: '♐', x: 95, y: 430, name_sr: 'Strelac' },
                        { sign: 'Capricorn', symbol: '♑', x: 55, y: 310, name_sr: 'Jarac' },
                        { sign: 'Aquarius', symbol: '♒', x: 95, y: 190, name_sr: 'Vodolija' },
                        { sign: 'Pisces', symbol: '♓', x: 180, y: 95, name_sr: 'Ribe' },
                    ].map(({ sign, symbol, x, y, name_sr }) => {
                        const currentSign = isSerbian ? name_sr : sign;
                        const isSelected = selectedValue === currentSign;

                        return (
                        <text
                            key={sign}
                            x={x}
                            y={y}
                            className={cn(
                                "cursor-pointer transition-all duration-300",
                                isSelected ? "fill-accent" : "fill-primary group-hover:fill-accent"
                            )}
                            onClick={() => handleSignClick(currentSign)}
                            >
                            {symbol} {sign}
                        </text>
                        );
                    })}
                </g>
            </svg>
        </div>
    );
}
