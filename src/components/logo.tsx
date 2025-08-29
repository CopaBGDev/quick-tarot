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
      strokeWidth="0.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <g transform="translate(-2, -2)">
        {/* Stars */}
        <path d="M10.83 5.58 10 3.25l-.83 2.33-2.34.83 2.34.83.83 2.33.83-2.33 2.34-.83z" />
        <path d="M21.17 12.58 22 10.25l-.83 2.33-2.34.83 2.34.83.83 2.33.83-2.33 2.34-.83z" />
        <path d="M5.17 12.58 6 10.25l-.83 2.33-2.34.83 2.34.83.83 2.33.83-2.33 2.34-.83z" />
        <path d="M16.83 21.58 16 19.25l-.83 2.33-2.34.83 2.34.83.83 2.33.83-2.33 2.34-.83z" />

        {/* Sun */}
        <circle cx="13" cy="7" r="1.5" />
        <path d="M13 4v-1.5" />
        <path d="M13 10v-1.5" />
        <path d="m15.5 4.5-1-1" />
        <path d="m10.5 9.5-1-1" />
        <path d="M16 7h1.5" />
        <path d="M8.5 7H10" />
        <path d="m15.5 9.5 1-1" />
        <path d="m10.5 4.5 1-1" />
        
        {/* Cards and Eye */}
        <path
          d="M19.07 20.53A4.52 4.52 0 0 1 16 22.3a4.52 4.52 0 0 1-3.07-1.77"
          transform="rotate(-10, 15, 16)"
        />
        <path
          d="M8.93 11.47A4.52 4.52 0 0 1 12 9.7a4.52 4.52 0 0 1 3.07 1.77"
          transform="rotate(5, 12, 16)"
        />
        <path
          d="M8.93 20.53A4.52 4.52 0 0 0 12 22.3a4.52 4.52 0 0 0 3.07-1.77"
          transform="rotate(5, 12, 16)"
        />
        <path
          d="M19.07 11.47A4.52 4.52 0 0 0 16 9.7a4.52 4.52 0 0 0-3.07 1.77"
          transform="rotate(-10, 15, 16)"
        />
        <path
          d="M17.5 8.83V20.3a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5V8.83"
          transform="rotate(5, 12, 16)"
          />
        <path
          d="M20.5 8.83V20.3a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5V8.83"
          transform="rotate(-10, 15, 16)"
        />
        
        <path d="M9 13.25c1.5-1 4.5-1 6 0" />
        <path d="M9 13.25c1.5 1 4.5 1 6 0" />
        <circle cx="12" cy="13.25" r="1" fill="currentColor" />

        {/* Eyelashes */}
        <path d="M10.5 11.25 10 10" />
        <path d="m11.5 10.75-.5-1.5" />
        <path d="m12.5 10.75.5-1.5" />
        <path d="M13.5 11.25 14 10" />
      </g>
    </svg>
  );
}
