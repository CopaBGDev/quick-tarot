
"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { ZodiacSign } from "@/lib/zodiac";
import { getTranslations } from "@/lib/translations";
import { Logo } from "./logo";

export const ZODIAC_IMAGES: { [key: string]: string } = {
    "Aries": "/zodiac/ovan.svg",
    "Taurus": "/zodiac/bik.svg",
    "Gemini": "/zodiac/blizanci.svg",
    "Cancer": "/zodiac/rak.svg",
    "Leo": "/zodiac/lav.svg",
    "Virgo": "/zodiac/devica.svg",
    "Libra": "/zodiac/vaga.svg",
    "Scorpio": "/zodiac/skorpija.svg",
    "Sagittarius": "/zodiac/strelac.svg",
    "Capricorn": "/zodiac/jarac.svg",
    "Aquarius": "/zodiac/vodolija.svg",
    "Pisces": "/zodiac/ribe.svg",
};

export const NATURAL_ORDER_EN = [ "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces" ];

interface ZodiacWheelProps {
    signs: readonly ZodiacSign[];
    onSelect: (sign: ZodiacSign) => void;
    selectedValue?: ZodiacSign;
    disabled?: boolean;
}

interface Position {
    x: number;
    y: number;
}

export function ZodiacWheel({ signs, onSelect, selectedValue, disabled }: ZodiacWheelProps) {
    const [positions, setPositions] = React.useState<Position[]>([]);

    React.useEffect(() => {
        const newPositions: Position[] = [];
        const radius = 166;
        const center = 236;
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
    
    const isSerbian = signs[0] === 'Ovan';
    const naturalOrder = isSerbian ? getTranslations('sr').zodiacSigns : getTranslations('en').zodiacSigns;
    
    const selectedEnglishSign = selectedValue ? NATURAL_ORDER_EN[naturalOrder.indexOf(selectedValue as any)] : undefined;
    const selectedImage = selectedEnglishSign ? ZODIAC_IMAGES[selectedEnglishSign] : undefined;

    if (positions.length === 0) {
        return <div className="mx-auto w-[472px] h-[472px]" />;
    }

    return (
        <div
            className={cn(
                "relative mx-auto w-[472px] h-[472px]",
                disabled && "opacity-50 cursor-not-allowed"
            )}
        >
            <div className="w-full h-full relative">
                {/* Center circle */}
                <div 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full border-2 border-dashed border-primary/20 flex items-center justify-center text-center transition-all duration-300"
                >
                    {selectedImage && selectedValue ? (
                         <div className="flex flex-col items-center justify-center">
                            <Image
                                src={selectedImage}
                                alt={selectedValue}
                                width={120}
                                height={120}
                                className="rounded-full animate-in fade-in zoom-in-50"
                                unoptimized
                            />
                         </div>
                    ) : (
                        <Logo className="h-52 w-52 text-primary/40 animate-in fade-in" />
                    )}
                </div>

                {/* Zodiac signs */}
                {positions.map((pos, index) => {
                    const naturalIndex = index;
                    const sign = naturalOrder[naturalIndex];
                    const englishSignName = NATURAL_ORDER_EN[naturalIndex];
                    const image = ZODIAC_IMAGES[englishSignName];
                    const isSelected = selectedValue === sign;

                    return (
                        <div
                            key={sign}
                            className="absolute"
                            style={{
                                left: `${pos.x}px`,
                                top: `${pos.y}px`,
                                transform: 'translate(-50%, -50%)',
                            }}
                        >
                             <div
                                onClick={() => handleSignClick(sign)}
                                className="cursor-pointer group"
                            >
                                <div
                                    className={cn(
                                        "w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110",
                                        isSelected
                                            ? "scale-110 ring-2 ring-primary"
                                            : "bg-transparent"
                                    )}
                                >
                                   <Image
                                        src={image}
                                        alt={sign}
                                        width={56}
                                        height={56}
                                        className={cn(
                                            "rounded-full transition-all duration-300",
                                            isSelected ? " " : "opacity-70 group-hover:opacity-100"
                                        )}
                                        unoptimized
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

    