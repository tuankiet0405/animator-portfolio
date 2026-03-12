/**
 * Device Mockup SVG Frames
 * Browser Chrome + iPhone frames as React components
 */

// ===== BROWSER CHROME FRAME =====
export function BrowserFrame({ children, url = 'example.com', className = '' }) {
  return (
    <div className={`device-mockup device-mockup--browser ${className}`}>
      <svg
        className="device-mockup__bar"
        viewBox="0 0 800 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Background */}
        <rect width="800" height="48" fill="var(--bg-secondary)" rx="8" />
        {/* Traffic Lights */}
        <circle cx="24" cy="24" r="6" fill="#FF5F56" />
        <circle cx="44" cy="24" r="6" fill="#FFBD2E" />
        <circle cx="64" cy="24" r="6" fill="#27C93F" />
        {/* URL Bar */}
        <rect x="88" y="10" width="624" height="28" rx="14" fill="var(--bg-primary)" />
        <text x="400" y="29" textAnchor="middle" fill="var(--text-secondary)" fontSize="12" fontFamily="var(--font-body)">
          {url}
        </text>
        {/* Menu dots */}
        <circle cx="748" cy="20" r="2" fill="var(--text-secondary)" />
        <circle cx="748" cy="28" r="2" fill="var(--text-secondary)" />
        <circle cx="756" cy="24" r="2" fill="var(--text-secondary)" />
      </svg>
      <div className="device-mockup__screen">
        {children}
      </div>
    </div>
  );
}

// ===== IPHONE FRAME =====
export function IPhoneFrame({ children, className = '' }) {
  return (
    <div className={`device-mockup device-mockup--iphone ${className}`}>
      <svg
        className="device-mockup__notch"
        viewBox="0 0 375 54"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Status bar background */}
        <rect width="375" height="54" fill="var(--bg-secondary)" rx="20" />
        {/* Dynamic Island */}
        <rect x="138" y="12" width="100" height="28" rx="14" fill="var(--text-primary)" />
        {/* Time */}
        <text x="48" y="32" fill="var(--text-primary)" fontSize="13" fontWeight="600" fontFamily="var(--font-body)">
          9:41
        </text>
        {/* Battery + Signal */}
        <rect x="310" y="20" width="22" height="12" rx="3" stroke="var(--text-primary)" strokeWidth="1.5" fill="none" />
        <rect x="332" y="24" width="2" height="4" rx="1" fill="var(--text-primary)" />
        <rect x="312" y="22" width="14" height="8" rx="1.5" fill="var(--text-primary)" />
        {/* Signal bars */}
        <rect x="280" y="26" width="3" height="6" rx="1" fill="var(--text-primary)" />
        <rect x="285" y="23" width="3" height="9" rx="1" fill="var(--text-primary)" />
        <rect x="290" y="20" width="3" height="12" rx="1" fill="var(--text-primary)" />
        <rect x="295" y="17" width="3" height="15" rx="1" fill="var(--text-primary)" />
      </svg>
      <div className="device-mockup__screen device-mockup__screen--iphone">
        {children}
      </div>
      {/* Home indicator */}
      <div className="device-mockup__home-indicator" />
    </div>
  );
}
