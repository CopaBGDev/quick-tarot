
import type { SVGProps } from "react";

const AriesIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M25 75V50C25 25 75 25 75 50V75" />
    <path d="M25 50C25 35 10 35 10 50" />
    <path d="M75 50C75 35 90 35 90 50" />
  </svg>
);

const TaurusIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="50" cy="60" r="25" />
    <path d="M25 45C25 20 75 20 75 45" />
  </svg>
);

const GeminiIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M25 20V80" />
    <path d="M75 20V80" />
    <path d="M15 30H85" />
    <path d="M15 70H85" />
  </svg>
);

const CancerIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="30" cy="35" r="15" />
    <circle cx="70" cy="65" r="15" />
    <path d="M30 50C50 75 20 90 20 65" />
    <path d="M70 50C50 25 80 10 80 35" />
  </svg>
);

const LeoIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="35" cy="35" r="20" />
    <path d="M55 35H80C80 65 60 85 40 85C20 85 20 65 40 65" />
  </svg>
);

const VirgoIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M20 20V80" />
    <path d="M40 20V80" />
    <path d="M60 20V80" />
    <path d="M80 20V50C80 70 60 85 40 65" />
  </svg>
);

const LibraIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 70H85" />
    <path d="M25 50H75" />
    <path d="M50 50V70" />
    <path d="M25 50C25 30 75 30 75 50" />
  </svg>
);

const ScorpioIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M20 20V80" />
    <path d="M40 20V80" />
    <path d="M60 20V80" />
    <path d="M80 80L60 60" />
    <path d="M80 80L100 80" />
  </svg>
);

const SagittariusIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M20 80L80 20" />
    <path d="M50 20H80V50" />
    <path d="M20 50H50" />
  </svg>
);

const CapricornIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M20 40V80" />
    <path d="M20 40C20 20 40 20 40 40" />
    <path d="M40 40C60 20 80 40 80 60C80 80 60 100 40 80" />
  </svg>
);

const AquariusIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M20 35L40 55L60 35L80 55" />
    <path d="M20 65L40 85L60 65L80 85" />
  </svg>
);

const PiscesIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M25 20C5 20 5 80 25 80" />
    <path d="M75 20C95 20 95 80 75 80" />
    <path d="M5 50H95" />
  </svg>
);

export const ZODIAC_ICONS_COMPONENTS = {
  AriesIcon,
  TaurusIcon,
  GeminiIcon,
  CancerIcon,
  LeoIcon,
  VirgoIcon,
  LibraIcon,
  ScorpioIcon,
  SagittariusIcon,
  CapricornIcon,
  AquariusIcon,
  PiscesIcon,
};
