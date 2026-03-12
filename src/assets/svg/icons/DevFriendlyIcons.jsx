/**
 * Dev-Friendly Section Icons — SVG stroke-draw icons
 * Lightning bolt, Rocket, Wrench
 */

// ===== LIGHTNING BOLT =====
export function LightningIcon({ className = '' }) {
  return (
    <svg className={`dev-icon ${className}`} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        className="dev-icon__stroke"
        d="M36 4L12 36H30L28 60L52 28H34L36 4Z"
        stroke="var(--accent-yellow)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

// ===== ROCKET =====
export function RocketIcon({ className = '' }) {
  return (
    <svg className={`dev-icon ${className}`} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        className="dev-icon__stroke"
        d="M32 8C32 8 22 20 22 32C22 40 26 48 32 52C38 48 42 40 42 32C42 20 32 8 32 8Z"
        stroke="var(--accent-orange)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle className="dev-icon__stroke" cx="32" cy="30" r="5" stroke="var(--accent-orange)" strokeWidth="3" fill="none"/>
      {/* Fins */}
      <path className="dev-icon__stroke" d="M22 36L12 44L18 38" stroke="var(--accent-orange)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path className="dev-icon__stroke" d="M42 36L52 44L46 38" stroke="var(--accent-orange)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      {/* Flames */}
      <path className="dev-icon__stroke" d="M28 52L32 60L36 52" stroke="var(--accent-orange)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  );
}

// ===== WRENCH =====
export function WrenchIcon({ className = '' }) {
  return (
    <svg className={`dev-icon ${className}`} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        className="dev-icon__stroke"
        d="M42 10C38 8 34 8 30 10L36 16L34 22L28 24L22 18C20 22 20 26 22 30L10 54L14 58L38 46C42 48 46 48 50 46L44 40L46 34L52 32L58 38C60 34 60 30 58 26L42 10Z"
        stroke="var(--accent-blue)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
