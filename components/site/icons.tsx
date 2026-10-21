import type { SVGProps } from "react";

export function GithubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export function TelegramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
    </svg>
  );
}

export function YoutubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      aria-hidden="true"
      {...props}
    >
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export function TanzaniteLogo({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      role="img"
      viewBox="0 0 128 128"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Tanzanite Logo"
      {...props}
    >
      <defs>
        <linearGradient id="tz-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#CAE8F8" />
          <stop offset="50%" stopColor="#B8E1F7" />
          <stop offset="100%" stopColor="#9DD3F3" />
        </linearGradient>
        <linearGradient id="tz-ring" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#383C42" />
          <stop offset="50%" stopColor="#1E2024" />
          <stop offset="100%" stopColor="#0F1012" />
        </linearGradient>
        <radialGradient id="tz-glass" cx="38%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#2C323B" />
          <stop offset="45%" stopColor="#14171C" />
          <stop offset="85%" stopColor="#08090B" />
          <stop offset="100%" stopColor="#000000" />
        </radialGradient>
        <radialGradient id="tz-glow" cx="42%" cy="40%" r="30%">
          <stop offset="0%" stopColor="#3D5A6C" stopOpacity="0.7" />
          <stop offset="70%" stopColor="#1B262C" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="tz-spec" cx="30%" cy="28%" r="20%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Squircle camera deco base */}
      <rect
        x="4"
        y="4"
        width="120"
        height="120"
        rx="34"
        ry="34"
        fill="url(#tz-bg)"
        stroke="#FFFFFF"
        strokeOpacity="0.5"
        strokeWidth="2.5"
      />

      {/* Top Left Lens */}
      <g>
        <circle cx="40" cy="40" r="23" fill="#141619" opacity="0.25" />
        <circle cx="40" cy="39" r="21.5" fill="url(#tz-ring)" stroke="#4A505A" strokeWidth="1.2" />
        <circle cx="40" cy="39" r="17.5" fill="url(#tz-glass)" />
        <circle cx="40" cy="39" r="11" fill="url(#tz-glow)" />
        <circle cx="40" cy="39" r="4.5" fill="#04070A" stroke="#253844" strokeWidth="1" />
        <ellipse cx="34" cy="33" rx="5" ry="3" fill="url(#tz-spec)" transform="rotate(-30 34 33)" />
      </g>

      {/* Bottom Left Lens */}
      <g>
        <circle cx="40" cy="89" r="23" fill="#141619" opacity="0.25" />
        <circle cx="40" cy="88" r="21.5" fill="url(#tz-ring)" stroke="#4A505A" strokeWidth="1.2" />
        <circle cx="40" cy="88" r="17.5" fill="url(#tz-glass)" />
        <circle cx="40" cy="88" r="11" fill="url(#tz-glow)" />
        <circle cx="40" cy="88" r="4.5" fill="#04070A" stroke="#253844" strokeWidth="1" />
        <ellipse cx="34" cy="82" rx="5" ry="3" fill="url(#tz-spec)" transform="rotate(-30 34 82)" />
      </g>

      {/* Right Aux / Flash Lens */}
      <g>
        <circle cx="88" cy="64" r="19" fill="#141619" opacity="0.22" />
        <circle cx="88" cy="63.5" r="17.5" fill="url(#tz-ring)" stroke="#4A505A" strokeWidth="1" />
        <circle cx="88" cy="63.5" r="14" fill="url(#tz-glass)" />
        <circle cx="88" cy="63.5" r="9" fill="url(#tz-glow)" />
        <circle cx="88" cy="63.5" r="3.5" fill="#04070A" stroke="#253844" strokeWidth="0.8" />
        <ellipse cx="83" cy="58.5" rx="4" ry="2.4" fill="url(#tz-spec)" transform="rotate(-30 83 58.5)" />
      </g>
    </svg>
  );
}
