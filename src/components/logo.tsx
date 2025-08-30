import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Stars */}
      <path d="M4 6.5L5 7.5L4 8.5L3 7.5Z" />
      <path d="M20 6.5L21 7.5L20 8.5L19 7.5Z" />
      <path d="M4 17.5L5 18.5L4 19.5L3 18.5Z" />
      <path d="M20 17.5L21 18.5L20 19.5L19 18.5Z" />

      {/* Sun */}
      <path d="M12 4 a2,2 0 0,1 0,-2 a2,2 0 0,1 0,2" />
      <path d="M12 1V0" />
      <path d="M10 2.5 L9 2" />
      <path d="M14 2.5 L15 2" />
      <path d="M8.5 4 L7.5 4" />
      <path d="M15.5 4 L16.5 4" />
      
      {/* Cards */}
      <path d="M7 6 L17 6 L17 21 L7 21 Z"  transform="rotate(-5, 12, 13)"/>
      <path d="M6 7 L18 7 L18 22 L6 22 Z" />

      {/* Eye */}
      <path d="M9 13 C10.5 11.5, 13.5 11.5, 15 13" />
      <path d="M9 13 C10.5 14.5, 13.5 14.5, 15 13" />
      <circle cx="12" cy="13" r="1" fill="currentColor" />

       {/* Eye rays */}
      <path d="M12 11 L12 10" />
      <path d="M10.5 11.5 L10 11" />
      <path d="M13.5 11.5 L14 11" />
    </svg>
  );
}
