
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
    onSelect: (sign?: ZodiacSign) => void;
    selectedValue?: ZodiacSign;
    disabled?: boolean;
}

interface Position {
    x: number;
    y: number;
}

export function ZodiacWheel({ signs, onSelect, selectedValue, disabled }: ZodiacWheelProps) {
    const [positions, setPositions] = React.useState<Position[]>([]);
    const containerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const calculatePositions = () => {
            if (!containerRef.current) return;

            const containerSize = containerRef.current.offsetWidth;
            const center = containerSize / 2;
            const radius = containerSize * 0.35; // Responsive radius
            const numSigns = 12;
            const startAngle = Math.PI;
            const newPositions: Position[] = [];

            for (let i = 0; i < numSigns; i++) {
                const angle = startAngle - (i * 2 * Math.PI) / numSigns;
                const x = center + radius * Math.cos(angle);
                const y = center + radius * Math.sin(angle);
                newPositions.push({ x, y });
            }
            setPositions(newPositions);
        };

        calculatePositions();
        window.addEventListener('resize', calculatePositions);
        return () => window.removeEventListener('resize', calculatePositions);
    }, []);


    const handleSignClick = (sign: ZodiacSign) => {
        if (!disabled) {
            onSelect(sign);
        }
    };
    
    const handleCenterClick = () => {
        if (!disabled && selectedValue) {
            onSelect(undefined);
        }
    }

    const isSerbian = signs[0] === 'Ovan';
    const naturalOrder = isSerbian ? getTranslations('sr').zodiacSigns : getTranslations('en').zodiacSigns;
    
    const selectedEnglishSign = selectedValue ? NATURAL_ORDER_EN[naturalOrder.indexOf(selectedValue as any)] : undefined;
    const selectedImage = selectedEnglishSign ? ZODIAC_IMAGES[selectedEnglishSign] : undefined;

    if (positions.length === 0) {
        return <div ref={containerRef} className="w-full max-w-[472px] aspect-square mx-auto" />;
    }

    return (
        <div
            ref={containerRef}
            className={cn(
                "relative mx-auto w-full max-w-[472px] aspect-square",
                disabled && "opacity-50 cursor-not-allowed"
            )}
        >
            <div className="w-full h-full relative">
                {/* Center circle */}
                <div 
                    onClick={handleCenterClick}
                    className={cn(
                        "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45%] h-[45%] rounded-full border-2 border-dashed border-primary/20 flex items-center justify-center text-center transition-all duration-300",
                        selectedValue && "cursor-pointer hover:border-primary"
                    )}
                >
                    {selectedImage && selectedValue ? (
                         <div className="flex flex-col items-center justify-center w-full h-full p-4">
                            <Image
                                src={selectedImage}
                                alt={selectedValue}
                                width={120}
                                height={120}
                                className="w-full h-full object-contain animate-in fade-in zoom-in-50"
                                unoptimized
                            />
                         </div>
                    ) : (
                        <Logo className="w-full h-full text-primary/40 p-4 animate-in fade-in" />
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
                            className="absolute w-[17%] h-[17%]" // Responsive sign container
                            style={{
                                left: `${pos.x}px`,
                                top: `${pos.y}px`,
                                transform: 'translate(-50%, -50%)',
                            }}
                        >
                             <div
                                onClick={() => handleSignClick(sign)}
                                className="cursor-pointer group w-full h-full"
                            >
                                <div
                                    className={cn(
                                        "w-full h-full rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110",
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
                                            "rounded-full transition-all duration-300 w-full h-full p-1",
                                            isSelected ? "" : "opacity-70 group-hover:opacity-100"
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
