
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

const ZODIAC_SYMBOLS: { [key in ZodiacSign]: string } = {
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

export function ZodiacWheel({ signs, onSelect, selectedValue, disabled }: ZodiacWheelProps) {
    const [positions, setPositions] = React.useState<SignPosition[]>([]);

    React.useEffect(() => {
        const radius = 130;
        const centerX = 150;
        const centerY = 150;
        
        const isSerbian = signs.includes("Ovan");
        const originalSignNames = isSerbian ? ZODIAC_SIGNS_SR : ZODIAC_SIGNS_EN;

        // Start from Aries and go counter-clockwise.
        // The wheel drawing logic goes clockwise starting from the top (12 o'clock).
        // To make it counter-clockwise, we reverse the array.
        // To start Aries at 9 o'clock, we need to find the offset.
        // 12 o'clock is index 0. 3 o'clock is index 3. 6 o'clock is index 6. 9 o'clock is index 9.
        const ariesIndex = originalSignNames.indexOf(isSerbian ? "Ovan" : "Aries");
        const startingIndex = 9; // 9 o'clock position
        
        const rotation = startingIndex - ariesIndex;
        const rotatedSignNames = [...originalSignNames];
        
        if (rotation > 0) {
            for (let i = 0; i < rotation; i++) {
                rotatedSignNames.unshift(rotatedSignNames.pop()!);
            }
        } else {
            for (let i = 0; i > rotation; i--) {
                rotatedSignNames.push(rotatedSignNames.shift()!);
            }
        }
        
        const newPositions = rotatedSignNames.reverse().map((sign, i) => {
            const angle = (i / 12) * 2 * Math.PI - Math.PI / 2;
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
        return <div className="relative mx-auto w-[300px] h-[300px] flex items-center justify-center text-muted-foreground">Učitavanje...</div>;
    }

    return (
        <div
            className={cn(
                "relative mx-auto w-[300px] h-[300px]",
                disabled && "opacity-50 cursor-not-allowed"
            )}
        >
            <svg viewBox="0 0 300 300" className="w-full h-full">
                {/* Invisible circle for layout */}
                <circle cx="150" cy="150" r="145" fill="transparent" />

                {/* Symbols */}
                <g>
                    {positions.map(({ sign, symbol, x, y }) => {
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
                                        "font-sans transition-colors duration-300",
                                         isSelected ? 'fill-background' : 'fill-foreground'
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
