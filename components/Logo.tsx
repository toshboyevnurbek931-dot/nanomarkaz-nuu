export function Logo({ className = "h-12 w-12" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <polygon
        points="32,4 58,18 58,46 32,60 6,46 6,18"
        fill="#ffffff"
        stroke="#e8a317"
        strokeWidth="2"
      />
      <circle cx="32" cy="32" r="8" fill="#051139" />
      <circle cx="32" cy="32" r="3" fill="#e8a317" />
      <ellipse cx="32" cy="32" rx="16" ry="6" fill="none" stroke="#10215e" strokeWidth="1.6" />
      <ellipse
        cx="32"
        cy="32"
        rx="16"
        ry="6"
        fill="none"
        stroke="#10215e"
        strokeWidth="1.6"
        transform="rotate(60 32 32)"
      />
      <ellipse
        cx="32"
        cy="32"
        rx="16"
        ry="6"
        fill="none"
        stroke="#10215e"
        strokeWidth="1.6"
        transform="rotate(120 32 32)"
      />
    </svg>
  );
}
