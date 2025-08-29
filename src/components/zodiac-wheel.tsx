
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ZODIAC_SIGNS_EN, ZODIAC_SIGNS_SR, type ZodiacSign } from "@/lib/zodiac";

const ZODIAC_PATHS = {
    Aries: "M25 75V50C25 25 75 25 75 50V75M25 50C25 35 10 35 10 50M75 50C75 35 90 35 90 50",
    Taurus: "M50 25C25 25 25 50 50 75S75 75 75 50C75 25 50 25 50 25ZM50 25C65 25 65 10 50 10S35 25 50 25Z",
    Gemini: "M25 25V75M75 25V75M10 25H90M10 75H90",
    Cancer: "M25 50a25 25 0 1 0 50 0a25 25 0 1 1-50 0",
    Leo: "M75 50a25 25 0 1 0-50 0V25C25 10 10 10 10 25",
    Virgo: "M10 75V25H30V75M30 25L50 75L70 25M70 75V25H90V50L70 75",
    Libra: "M10 75H90M25 50h50a25 12.5 0 0 0 0-25h-50a25 12.5 0 0 0 0 25z",
    Scorpio: "M10 75V25H30V75M30 25L50 75L70 25M70 75V50L90 60V75H70",
    Sagittarius: "M25 25L75 75M50 25H75V50",
    Capricorn: "M10 50V25H30V50C30 65 50 65 50 50C50 35 75 35 75 50C75 65 50 85 50 75",
    Aquarius: "M10 40L30 60L50 40L70 60L90 40M10 65L30 85L50 65L70 85L90 65",
    Pisces: "M25 25C50 25 50 75 25 75M75 25C50 25 50 75 75 75"
};

interface ZodiacWheelProps {
    signs: readonly ZodiacSign[];
    onSelect: (sign: ZodiacSign) => void;
    selectedValue?: ZodiacSign;
    disabled?: boolean;
}

export function ZodiacWheel({ signs, onSelect, selectedValue, disabled }: ZodiacWheelProps) {
    const [isClient, setIsClient] = React.useState(false);
    const [positions, setPositions] = React.useState< { x: number; y: number; name: ZodiacSign; path: string; }[]>([]);

    React.useEffect(() => {
      setIsClient(true);
      
      const isSerbian = signs.includes("Ovan");
      const signNames = isSerbian ? ZODIAC_SIGNS_SR : ZODIAC_SIGNS_EN;
      const signKeys = ZODIAC_SIGNS_EN;

      const newPositions = signNames.map((sign, i) => {
        const angle = (i / 12) * 2 * Math.PI - Math.PI / 2 - Math.PI / 6;
        return {
            x: 300 + 190 * Math.cos(angle),
            y: 300 + 190 * Math.sin(angle),
            name: sign,
            path: ZODIAC_PATHS[signKeys[i] as keyof typeof ZODIAC_PATHS],
        };
      });
      setPositions(newPositions);

    }, [signs]);

    const handleSignClick = (sign: ZodiacSign) => {
        if (!disabled) {
            onSelect(sign);
        }
    };
    
    if (!isClient) {
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
                <circle cx="300" cy="300" r="290" fill="transparent" stroke="hsl(var(--border))" strokeWidth="1" />
                
                <g stroke="hsl(var(--border))" strokeWidth="1">
                    {[...Array(12)].map((_, i) => {
                         const angle = i * (Math.PI / 6);
                         return (<line
                            key={`line-${i}`}
                            x1="300"
                            y1="300"
                            x2={300 + 290 * Math.cos(angle)}
                            y2={300 + 290 * Math.sin(angle)}
                        />)
                    })}
                </g>

                <g>
                    {positions.map((pos) => {
                        const isSelected = selectedValue === pos.name;
                        return (
                            <g
                                key={pos.name}
                                transform={`translate(${pos.x - 50}, ${pos.y - 50})`}
                                onClick={() => handleSignClick(pos.name)}
                                className="cursor-pointer"
                            >
                                <path
                                    d={pos.path}
                                    strokeWidth="6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    fill="none"
                                    className={cn(
                                        "transition-all duration-300",
                                        isSelected ? "stroke-accent" : "stroke-primary",
                                        !disabled && "hover:stroke-accent"
                                    )}
                                />
                            </g>
                        );
                    })}
                </g>
            </svg>
        </div>
    );
}

