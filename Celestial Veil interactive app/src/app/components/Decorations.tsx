// Decorative SVG elements inspired by Celestial Veil's hand-drawn aesthetic

export function CurlyArrow({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 15C15 10 25 8 35 12C40 14 42 18 40 23"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M37 28L41 23L46 27"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.6"
      />
    </svg>
  );
}

export function StarCluster({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="80"
      height="60"
      viewBox="0 0 80 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main star */}
      <path
        d="M40 10L41.5 14.5L46 16L41.5 17.5L40 22L38.5 17.5L34 16L38.5 14.5L40 10Z"
        fill="currentColor"
        opacity="0.7"
      />
      {/* Small stars */}
      <circle cx="28" cy="18" r="1.5" fill="currentColor" opacity="0.5" />
      <circle cx="52" cy="20" r="1" fill="currentColor" opacity="0.4" />
      <circle cx="35" cy="28" r="1.5" fill="currentColor" opacity="0.6" />
      {/* Tiny sparkles */}
      <path
        d="M60 15L60.5 16.5L62 17L60.5 17.5L60 19L59.5 17.5L58 17L59.5 16.5L60 15Z"
        fill="currentColor"
        opacity="0.5"
      />
    </svg>
  );
}

export function MoonStars({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="100"
      height="80"
      viewBox="0 0 100 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Crescent moon */}
      <path
        d="M45 15C45 24.9411 37.9411 33 28 33C26.3431 33 24.7412 32.7614 23.2275 32.3181C26.7008 37.8094 33.0163 41.5 40.25 41.5C51.5703 41.5 60.75 32.3203 60.75 21C60.75 13.7663 57.0594 7.4508 51.5681 3.97751C51.9888 5.45494 52.2 7.01471 52.2 8.625C52.2 24.9632 45 15 45 15Z"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        opacity="0.6"
      />
      {/* Stars around moon */}
      <path
        d="M70 20L71 23L74 24L71 25L70 28L69 25L66 24L69 23L70 20Z"
        fill="currentColor"
        opacity="0.5"
      />
      <path
        d="M80 35L80.5 36.5L82 37L80.5 37.5L80 39L79.5 37.5L78 37L79.5 36.5L80 35Z"
        fill="currentColor"
        opacity="0.6"
      />
      <circle cx="75" cy="50" r="1.5" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

export function DoodleLine({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="120"
      height="40"
      viewBox="0 0 120 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 20C25 15 35 25 55 20C75 15 85 25 115 20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.3"
      />
    </svg>
  );
}

export function SparkleAccent({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 2L11 8L17 9L11 10L10 18L9 10L3 9L9 8L10 2Z"
        fill="currentColor"
        opacity="0.6"
      />
    </svg>
  );
}
