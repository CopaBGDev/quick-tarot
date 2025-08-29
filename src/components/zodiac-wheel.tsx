"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ZODIAC_SIGNS_EN, ZODIAC_SIGNS_SR, type ZodiacSign } from "@/lib/zodiac";

const ZODIAC_DATA = [
    { name: "Ovan", eng: "Aries", path: <path d="M 35,65 C 35,40 65,40 65,65 M 50,47.5 V 25 M 35,25 Q 50,35 65,25" /> },
    { name: "Bik", eng: "Taurus", path: <path d="M 50,65 C 35,65 30,50 35,40 M 50,65 C 65,65 70,50 65,40 M 50,35 a 15,15 0 1 0 0,30 a 15,15 0 1 0 0,-30" /> },
    { name: "Blizanci", eng: "Gemini", path: <path d="M 35,25 V 75 M 65,25 V 75 M 30,35 H 70 M 30,65 H 70" /> },
    { name: "Rak", eng: "Cancer", path: <path d="M 30,40 C 15,40 15,60 30,60 M 70,60 C 85,60 85,40 70,40" /> },
    { name: "Lav", eng: "Leo", path: <path d="M 50,75 V 35 A 15,15 0 0 1 35,20 M 50,75 C 60,75 70,65 70,55 A 10,10 0 0 0 60,45" /> },
    { name: "Devica", eng: "Virgo", path: <path d="M 25,75 V 25 M 40,75 V 25 M 55,75 V 25 L 75,45 C 80,50 70,60 65,55 L 55,50" /> },
    { name: "Vaga", eng: "Libra", path: <path d="M 20,70 H 80 M 20,55 H 80 C 80,45 65,45 65,55 M 35,55 C 35,45 20,45 20,55" /> },
    { name: "Škorpija", eng: "Scorpio", path: <path d="M 25,75 V 25 M 40,75 V 25 M 55,75 V 25 L 75,40 L 65,50" /> },
    { name: "Strelac", eng: "Sagittarius", path: <path d="M 25,75 L 75,25 M 50,25 H 75 V 50 M 45,55 L 55,45" /> },
    { name: "Jarac", eng: "Capricorn", path: <path d="M 25,75 V 45 C 25,30 40,30 40,45 V 60 C 60,60 75,45 60,30 C 45,15 45,45 60,45" /> },
    { name: "Vodolija", eng: "Aquarius", path: <path d="M 25,45 l 10,-10 l 10,10 l 10,-10 l 10,10 M 25,65 l 10,-10 l 10,10 l 10,-10 l 10,10" /> },
    { name: "Ribe", eng: "Pisces", path: <path d="M 25,25 C 50,25 50,75 25,75 M 75,25 C 50,25 50,75 75,75 M 20,50 H 80" /> },
];

interface ZodiacWheelProps {
    signs: readonly ZodiacSign[];
    onSelect: (sign: ZodiacSign) => void;
    selectedValue?: ZodiacSign;
    disabled?: boolean;
}

export function ZodiacWheel({ signs, onSelect, selectedValue, disabled }: ZodiacWheelProps) {
    const isSerbian = signs[0] === "Ovan";
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

                {/* Rings */}
                <circle cx="300" cy="300" r="280" fill="transparent" stroke="hsl(var(--border))" strokeWidth="1" />
                <circle cx="300" cy="300" r="220" fill="transparent" stroke="hsl(var(--border))" strokeWidth="1" />
                <circle cx="300" cy="300" r="100" fill="url(#sun-glow)" />
                <circle cx="300" cy="300" r="100" fill="transparent" stroke="hsl(var(--primary))" strokeWidth="1.5" />
                <circle cx="300" cy="300" r="50" fill="hsl(var(--primary))" />


                {/* Lines */}
                <g stroke="hsl(var(--border))" strokeWidth="1">
                    {[...Array(12)].map((_, i) => (
                        <line
                            key={`line-${i}`}
                            x1="300"
                            y1="300"
                            x2={300 + 280 * Math.cos(i * (Math.PI / 6))}
                            y2={300 + 280 * Math.sin(i * (Math.PI / 6))}
                            transform={`rotate(15, 300, 300)`}
                        />
                    ))}
                </g>

                {/* Zodiac Signs */}
                <g>
                    {ZODIAC_DATA.map((sign, index) => {
                        const angle = (index / 12) * 360 - 90 + 15;
                        const isSelected = selectedValue === (isSerbian ? sign.name : sign.eng);
                        const currentSignName = isSerbian ? sign.name : sign.eng;

                        return (
                            <g
                                key={currentSignName}
                                className={cn("cursor-pointer group", disabled && "cursor-not-allowed")}
                                onClick={() => !disabled && onSelect(currentSignName)}
                                transform={`rotate(${angle} 300 300) translate(250 0) rotate(${-angle} 300 300) translate(-300 -300)`}
                            >
                                <g transform="translate(140, 265) scale(1)">
                                    {React.cloneElement(sign.path, {
                                        stroke: isSelected ? "hsl(var(--accent))" : "hsl(var(--primary))",
                                        strokeWidth: isSelected ? 6 : 4,
                                        className: "transition-all duration-300 group-hover:stroke-accent group-hover:stroke-[6]",
                                        fill: "none"
                                    })}
                                </g>
                            </g>
                        );
                    })}
                </g>
            </svg>
        </div>
    );
}
