/**
 * Service Section Icons — Animated SVG icons for 3 services
 */
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

// ===== HERO BANNER SERVICE ICON =====
export function HeroBannerIcon({ isInView = false }) {
  const ref = useRef(null);

  useGSAP(() => {
    if (!isInView) return;
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
    tl.fromTo('.hb-shape1', { x: -20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' })
      .fromTo('.hb-shape2', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'back.out(1.7)' }, '-=0.2')
      .fromTo('.hb-shape3', { scale: 0, transformOrigin: 'center' }, { scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.5)' }, '-=0.2')
      .to('.hb-shape1', { x: 20, opacity: 0, duration: 0.4 }, '+=0.8')
      .to('.hb-shape2', { y: -20, opacity: 0, duration: 0.3 }, '-=0.3')
      .to('.hb-shape3', { scale: 0, duration: 0.3 }, '-=0.2');
  }, { scope: ref, dependencies: [isInView] });

  return (
    <svg ref={ref} viewBox="0 0 120 80" fill="none" aria-hidden="true" className="service-icon">
      {/* Screen frame */}
      <rect x="10" y="5" width="100" height="65" rx="4" stroke="var(--text-primary)" strokeWidth="2.5" fill="none"/>
      <line x1="10" y1="18" x2="110" y2="18" stroke="var(--text-primary)" strokeWidth="2"/>
      {/* Traffic lights */}
      <circle cx="20" cy="12" r="3" fill="var(--accent-red)"/>
      <circle cx="30" cy="12" r="3" fill="var(--accent-yellow)"/>
      <circle cx="40" cy="12" r="3" fill="var(--accent-green)"/>
      {/* Animated shapes inside screen */}
      <circle className="hb-shape1" cx="40" cy="42" r="10" fill="var(--accent-blue)" opacity="0"/>
      <rect className="hb-shape2" x="58" y="32" width="18" height="18" fill="var(--accent-orange)" opacity="0"/>
      <polygon className="hb-shape3" points="92,30 102,50 82,50" fill="var(--accent-pink)" opacity="0"/>
    </svg>
  );
}

// ===== SCROLL EXPLAINER SERVICE ICON =====
export function ScrollExplainerIcon({ isInView = false }) {
  const ref = useRef(null);

  useGSAP(() => {
    if (!isInView) return;
    gsap.timeline({ repeat: -1, repeatDelay: 0.5 })
      .fromTo('.se-progress', { scaleY: 0, transformOrigin: 'top' }, { scaleY: 1, duration: 2, ease: 'none' })
      .fromTo('.se-content1', { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.3)
      .fromTo('.se-content2', { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.9)
      .fromTo('.se-content3', { opacity: 0 }, { opacity: 1, duration: 0.3 }, 1.5)
      .to('.se-progress', { scaleY: 0, duration: 0.3 }, '+=0.5')
      .to(['.se-content1', '.se-content2', '.se-content3'], { opacity: 0, duration: 0.2 }, '-=0.3');
  }, { scope: ref, dependencies: [isInView] });

  return (
    <svg ref={ref} viewBox="0 0 120 80" fill="none" aria-hidden="true" className="service-icon">
      {/* Page frame */}
      <rect x="20" y="5" width="80" height="70" rx="3" stroke="var(--text-primary)" strokeWidth="2.5" fill="none"/>
      {/* Scroll track */}
      <rect x="92" y="10" width="4" height="60" rx="2" fill="var(--text-secondary)" opacity="0.3"/>
      {/* Scroll progress */}
      <rect className="se-progress" x="92" y="10" width="4" height="60" rx="2" fill="var(--accent-blue)"/>
      {/* Content lines revealed */}
      <rect className="se-content1" x="28" y="14" width="56" height="4" rx="2" fill="var(--accent-orange)" opacity="0"/>
      <rect className="se-content2" x="28" y="34" width="48" height="4" rx="2" fill="var(--accent-green)" opacity="0"/>
      <rect className="se-content3" x="28" y="54" width="52" height="4" rx="2" fill="var(--accent-pink)" opacity="0"/>
    </svg>
  );
}

// ===== MICRO-INTERACTION SERVICE ICON =====
export function MicroInteractionIcon({ isInView = false }) {
  const ref = useRef(null);

  useGSAP(() => {
    if (!isInView) return;
    gsap.timeline({ repeat: -1, repeatDelay: 0.8 })
      .fromTo('.mi-btn', { scale: 1 }, { scale: 0.9, duration: 0.1, ease: 'power2.in' })
      .to('.mi-btn', { scale: 1.1, duration: 0.15, ease: 'back.out(3)' })
      .to('.mi-btn', { scale: 1, duration: 0.2, ease: 'power2.out' })
      .fromTo('.mi-ripple', { scale: 0, opacity: 0.6, transformOrigin: 'center' }, { scale: 3, opacity: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3');
  }, { scope: ref, dependencies: [isInView] });

  return (
    <svg ref={ref} viewBox="0 0 120 80" fill="none" aria-hidden="true" className="service-icon">
      {/* Button */}
      <g className="mi-btn">
        <rect x="25" y="25" width="70" height="30" rx="0" fill="var(--accent-blue)" stroke="var(--text-primary)" strokeWidth="2.5"/>
        <text x="60" y="45" textAnchor="middle" fill="white" fontSize="12" fontWeight="600" fontFamily="var(--font-heading)">CLICK ME</text>
      </g>
      {/* Ripple */}
      <circle className="mi-ripple" cx="60" cy="40" r="10" fill="var(--accent-yellow)" opacity="0"/>
    </svg>
  );
}
