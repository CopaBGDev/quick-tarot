import type { SVGProps } from 'react';

export function MagicIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2a10 10 0 1 0 10 10" />
      <path d="M12 2a10 10 0 1 0 10 10" />
      <path d="M22 12a10 10 0 0 0-10-10" />
      <path d="M2 12a10 10 0 0 0 10 10" />
      <path d="M12 2v20" />
      <path d="M2 12h20" />
      <path d="M12 6a6 6 0 1 0 0 12" />
      <path d="M12 6a6 6 0 1 1 0 12" />
      <path d="m4.93 4.93 2.12 2.12" />
      <path d="m16.95 16.95 2.12 2.12" />
      <path d="m4.93 19.07 2.12-2.12" />
      <path d="m16.95 7.05 2.12-2.12" />
    </svg>
  );
}
