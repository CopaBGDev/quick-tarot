
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { ZodiacSign } from "@/lib/zodiac";
import { getTranslations } from "@/lib/translations";

const ZODIAC_SYMBOLS: { [key: string]: string } = {
    "Aries": "♈", "Taurus": "♉", "Gemini": "♊", "Cancer": "♋", "Leo": "♌", "Virgo": "♍", "Libra": "♎", "Scorpio": "♏", "Sagittarius": "♐", "Capricorn": "♑", "Aquarius": "♒", "Pisces": "♓",
    "Ovan": "♈", "Bik": "♉", "Blizanci": "♊", "Rak": "♋", "Lav": "♌", "Devica": "♍", "Vaga": "♎", "Škorpija": "♏", "Strelac": "♐", "Jarac": "♑", "Vodolija": "♒", "Ribe": "♓",
};

const NATURAL_ORDER_EN = [ "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces" ];

interface ZodiacWheelProps {
    signs: readonly ZodiacSign[];
    onSelect: (sign: ZodiacSign) => void;
    selectedValue?: ZodiacSign;
    disabled?: boolean;
    label: string;
}

interface Position {
    x: number;
    y: number;
}

export function ZodiacWheel({ signs, onSelect, selectedValue, disabled, label }: ZodiacWheelProps) {
    const [positions, setPositions] = React.useState<Position[]>([]);

    React.useEffect(() => {
        const newPositions: Position[] = [];
        const radius = 120;
        const center = 170;
        const numSigns = 12;
        // Start angle for Aries (9 o'clock)
        const startAngle = Math.PI; 

        for (let i = 0; i < numSigns; i++) {
            // Angle goes counter-clockwise
            const angle = startAngle - (i * 2 * Math.PI) / numSigns;
            const x = center + radius * Math.cos(angle);
            const y = center + radius * Math.sin(angle);
            newPositions.push({ x, y });
        }
        setPositions(newPositions);
    }, []);


    const handleSignClick = (sign: ZodiacSign) => {
        if (!disabled) {
            onSelect(sign);
        }
    };
    
    const isSerbian = signs.includes("Ovan");
    const naturalOrder = isSerbian ? getTranslations('sr').zodiacSigns : getTranslations('en').zodiacSigns;
    
    const selectedEnglishSign = NATURAL_ORDER_EN[naturalOrder.indexOf(selectedValue as any)];
    const selectedSymbol = ZODIAC_SYMBOLS[selectedEnglishSign];

    if (positions.length === 0) {
        return <div className="mx-auto w-[340px] h-[340px]" />;
    }

    return (
        <div
            className={cn(
                "relative mx-auto w-[340px] h-[340px]",
                disabled && "opacity-50 cursor-not-allowed"
            )}
        >
            <div className="w-full h-full relative">
                {/* Center circle */}
                <div 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border-2 border-dashed border-primary/20 flex items-center justify-center text-center transition-all duration-300"
                >
                    {selectedValue ? (
                        <span className="font-sans text-7xl text-primary animate-in fade-in zoom-in-50">
                            {selectedSymbol}
                        </span>
                    ) : (
                        <span className="text-muted-foreground font-headline text-xl animate-in fade-in">
                            {label}
                        </span>
                    )}
                </div>

                {/* Zodiac signs */}
                {positions.map((pos, index) => {
                    const naturalIndex = index;
                    const sign = naturalOrder[naturalIndex];
                    const englishSignName = NATURAL_ORDER_EN[naturalIndex];

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
