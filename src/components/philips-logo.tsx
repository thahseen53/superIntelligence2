/**
 * Philips wordmark (simplified prototype mark).
 * Tinted via currentColor so it adapts to dark/light surfaces.
 */
export function PhilipsLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <PhilipsShield className="h-7 w-7" />
      <span className="font-semibold tracking-[0.18em] text-[13px] uppercase">
        Philips
      </span>
    </div>
  );
}

export function PhilipsShield({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden>
      <circle cx="32" cy="32" r="30" fill="currentColor" opacity="0.12" />
      <circle cx="32" cy="32" r="22" fill="currentColor" />
      {/* simplified wave / star motif */}
      <g fill="white">
        <circle cx="24" cy="26" r="2.2" />
        <circle cx="40" cy="26" r="2.2" />
        <circle cx="24" cy="38" r="2.2" />
        <circle cx="40" cy="38" r="2.2" />
        <circle cx="32" cy="32" r="2.6" />
        <path
          d="M20 32 Q26 24 32 32 T44 32"
          stroke="white"
          strokeWidth="1.5"
          fill="none"
          opacity="0.5"
        />
      </g>
    </svg>
  );
}
