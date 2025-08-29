"use client";

import * as React from "react";
import { SVGProps } from "react";
import { cn } from "@/lib/utils";
import { ZODIAC_SIGNS_SR, ZODIAC_SIGNS_EN, ZodiacSign } from "@/lib/zodiac";


interface ZodiacWheelProps {
  signs: readonly ZodiacSign[];
  onSelect: (sign: ZodiacSign) => void;
  selectedValue?: ZodiacSign;
  disabled?: boolean;
}

const ZODIAC_PATHS: Record<string, (props: SVGProps<SVGSVGElement>) => JSX.Element> = {
    Aries: (props) => (
      <svg viewBox="0 0 100 100" {...props}><path d="M25 75V50C25 25 75 25 75 50V75M25 50C25 35 10 35 10 50M75 50C75 35 90 35 90 50" /></svg>
    ),
    Taurus: (props) => (
      <svg viewBox="0 0 100 100" {...props}><path d="M50 75C25 75 25 50 25 50C25 25 75 25 75 50C75 50 75 75 50 75ZM50 75V90M50 40a10 10 0 100-20 10 10 0 100 20z" /></svg>
    ),
    Gemini: (props) => (
      <svg viewBox="0 0 100 100" {...props}><path d="M25 20V80M75 20V80M15 50H85M15 25H85M15 75H85" /></svg>
    ),
    Cancer: (props) => (
        <svg viewBox="0 0 100 100" {...props}><path d="M30 35a15 15 0 100 30H70a15 15 0 110 30M70 65a15 15 0 100-30H30a15 15 0 110-30" /></svg>
    ),
    Leo: (props) => (
      <svg viewBox="0 0 100 100" {...props}><path d="M30 75a20 20 0 100-40 20 20 0 100 40zM30 55H80V30C80 15 65 15 65 30" /></svg>
    ),
    Virgo: (props) => (
      <svg viewBox="0 0 100 100" {...props}><path d="M20 20v60m20-60v60m20-60v60m25 10v30a20 20 0 0040 0V20" /></svg>
    ),
    Libra: (props) => (
      <svg viewBox="0 0 100 100" {...props}><path d="M15 75h70M15 60h70a15 15 0 000-30H15a15 15 0 000 30zM50 60V20" /></svg>
    ),
    Scorpio: (props) => (
      <svg viewBox="0 0 100 100" {...props}><path d="M20 20v60m20-60v60m20-60v40l25 25m-25-25-25 25" /></svg>
    ),
    Sagittarius: (props) => (
      <svg viewBox="0 0 100 100" {...props}><path d="M20 80L80 20M50 20H80V50M45 55L20 80" /></svg>
    ),
    Capricorn: (props) => (
      <svg viewBox="0 0 100 100" {...props}><path d="M20 40v40m20-25v25m20-45a20 20 0 0120 20v25" /></svg>
    ),
    Aquarius: (props) => (
      <svg viewBox="0 0 100 100" {...props}><path d="M20 35l15-15 15 15 15-15 15 15M20 70l15-15 15 15 15-15 15 15" /></svg>
    ),
    Pisces: (props) => (
      <svg viewBox="0 0 100 100" {...props}><path d="M25 20C10 20 10 80 25 80M75 20C90 20 90 80 75 80M10 50h80" /></svg>
    ),
};


export function ZodiacWheel({
  signs,
  onSelect,
  selectedValue,
  disabled,
}: ZodiacWheelProps) {
  const R = 200; // Radius of the wheel
  const CENTER = 300; // Center coordinate
  const [positions, setPositions] = React.useState<any[]>([]);

  React.useEffect(() => {
    const isSerbian = signs.includes("Ovan");
    const signNames = isSerbian ? ZODIAC_SIGNS_SR : ZODIAC_SIGNS_EN;

    const newPositions = signNames.map((sign, i) => {
      const angle = (i / 12) * 2 * Math.PI - Math.PI / 2 - Math.PI / 6; // Adjusted for upright start
      const x = CENTER + R * Math.cos(angle);
      const y = CENTER + R * Math.sin(angle);
      const englishSign = ZODIAC_SIGNS_EN[ZODIAC_SIGNS_SR.indexOf(sign as any) ?? i];

      return {
        name: sign,
        englishName: englishSign,
        x,
        y,
      };
    });
    setPositions(newPositions);
  }, [signs]);

  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-[400px] sm:max-w-[450px] aspect-square",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      <svg viewBox="0 0 600 600" className="w-full h-full">
        <g id="wheel-background">
          <circle
            cx="300"
            cy="300"
            r="280"
            fill="hsl(var(--background))"
            stroke="hsl(var(--primary))"
            strokeOpacity="0.2"
            strokeWidth="1"
          />
          <circle
            cx="300"
            cy="300"
            r="120"
            fill="transparent"
            stroke="hsl(var(--primary))"
            strokeOpacity="0.2"
            strokeWidth="1"
          />
        </g>

        {positions.map((pos) => {
          const Icon = ZODIAC_PATHS[pos.englishName];
          const isSelected = selectedValue === pos.name;

          return (
            <g
              key={pos.name}
              transform={`translate(${pos.x - 30}, ${pos.y - 30})`}
              onClick={() => !disabled && onSelect(pos.name)}
              className={cn(
                "cursor-pointer transition-colors duration-300",
                isSelected
                  ? "fill-primary"
                  : "fill-primary/50 hover:fill-primary",
                disabled && "cursor-not-allowed"
              )}
            >
              <Icon
                width="60"
                height="60"
                className={cn(
                    "transition-all",
                    isSelected ? "stroke-primary" : "stroke-primary/50 group-hover:stroke-primary",
                )}
                style={{
                  strokeWidth: isSelected ? 8 : 5,
                  transform: isSelected ? 'scale(1.1)' : 'scale(1)',
                  transition: 'all 0.2s ease-in-out'
                }}
              />
            </g>
          );
        })}

        <g id="center-piece" className="select-none">
          <circle cx="300" cy="300" r="100" fill="hsl(var(--background))" />
          <text
            x="300"
            y="315"
            textAnchor="middle"
            fontSize="28"
            className="fill-primary font-headline"
          >
            {selectedValue || "Izaberi"}
          </text>
        </g>
      </svg>
    </div>
  );
}
