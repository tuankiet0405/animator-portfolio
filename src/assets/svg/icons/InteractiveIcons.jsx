/**
 * 6 Interactive SVG Icon Components for Component Library section
 * Each icon: default state (outline) + hover animation via GSAP timeline
 */
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

// ===== CART ICON =====
export function CartIcon() {
  const ref = useRef(null);
  const tl = useRef(null);

  useGSAP(() => {
    tl.current = gsap.timeline({ paused: true })
      .fromTo('.cart-item', { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: 'bounce.out' })
      .to('.cart-body', { rotation: -8, transformOrigin: 'bottom center', duration: 0.1 })
      .to('.cart-body', { rotation: 8, duration: 0.15 })
      .to('.cart-body', { rotation: -4, duration: 0.1 })
      .to('.cart-body', { rotation: 0, duration: 0.1 });
  }, { scope: ref });

  return (
    <div ref={ref} className="interactive-icon" onMouseEnter={() => tl.current?.restart()} onMouseLeave={() => { /* stays played */ }}>
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <g className="cart-body">
          <path d="M8 12H14L22 48H48L56 20H18" stroke="var(--text-primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          <circle cx="26" cy="54" r="4" fill="var(--text-primary)"/>
          <circle cx="44" cy="54" r="4" fill="var(--text-primary)"/>
        </g>
        <circle className="cart-item" cx="36" cy="8" r="5" fill="var(--accent-orange)" opacity="0"/>
      </svg>
      <span className="icon-label">Hover me!</span>
    </div>
  );
}

// ===== BELL ICON =====
export function BellIcon() {
  const ref = useRef(null);
  const tl = useRef(null);

  useGSAP(() => {
    tl.current = gsap.timeline({ paused: true })
      .to('.bell-body', { rotation: -15, transformOrigin: 'top center', duration: 0.08, ease: 'power2.inOut' })
      .to('.bell-body', { rotation: 15, duration: 0.08, ease: 'power2.inOut' })
      .to('.bell-body', { rotation: -10, duration: 0.08, ease: 'power2.inOut' })
      .to('.bell-body', { rotation: 10, duration: 0.08, ease: 'power2.inOut' })
      .to('.bell-body', { rotation: 0, duration: 0.12, ease: 'power2.out' })
      .fromTo('.bell-dot', { scale: 0, transformOrigin: 'center' }, { scale: 1, duration: 0.3, ease: 'back.out(3)' }, '-=0.2');
  }, { scope: ref });

  return (
    <div ref={ref} className="interactive-icon" onMouseEnter={() => tl.current?.restart()}>
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <g className="bell-body">
          <path d="M32 6C32 6 28 6 28 6C20 6 14 14 14 22V36L8 46H56L50 36V22C50 14 44 6 36 6C36 6 32 6 32 6Z" stroke="var(--text-primary)" strokeWidth="3" fill="none" strokeLinejoin="round"/>
          <path d="M26 46C26 50 28.7 54 32 54C35.3 54 38 50 38 46" stroke="var(--text-primary)" strokeWidth="3" fill="none"/>
        </g>
        <circle className="bell-dot" cx="46" cy="12" r="7" fill="var(--accent-red)" style={{transformOrigin: 'center', transform: 'scale(0)'}}/>
      </svg>
      <span className="icon-label">Hover me!</span>
    </div>
  );
}

// ===== SEARCH ICON =====
export function SearchIcon() {
  const ref = useRef(null);
  const tl = useRef(null);

  useGSAP(() => {
    tl.current = gsap.timeline({ paused: true })
      .to('.search-lens', { scale: 1.15, transformOrigin: '26 26', duration: 0.2, ease: 'power2.out' })
      .to('.search-lens', { scale: 1, duration: 0.2, ease: 'power2.in' })
      .to('.search-lens', { x: 6, duration: 0.25, ease: 'power2.inOut' })
      .to('.search-lens', { x: -6, duration: 0.5, ease: 'power2.inOut' })
      .to('.search-lens', { x: 0, duration: 0.25, ease: 'power2.out' });
  }, { scope: ref });

  return (
    <div ref={ref} className="interactive-icon" onMouseEnter={() => tl.current?.restart()}>
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <g className="search-lens">
          <circle cx="28" cy="28" r="16" stroke="var(--text-primary)" strokeWidth="3" fill="none"/>
          <line x1="40" y1="40" x2="56" y2="56" stroke="var(--text-primary)" strokeWidth="3" strokeLinecap="round"/>
        </g>
      </svg>
      <span className="icon-label">Hover me!</span>
    </div>
  );
}

// ===== HEART ICON =====
export function HeartIcon() {
  const ref = useRef(null);
  const tl = useRef(null);

  useGSAP(() => {
    tl.current = gsap.timeline({ paused: true })
      .to('.heart-fill', { opacity: 1, scale: 1, transformOrigin: 'center', duration: 0.3, ease: 'back.out(2)' })
      .to('.heart-particles circle', { scale: 1.5, opacity: 0, stagger: 0.04, duration: 0.5, ease: 'power2.out' }, '-=0.1');
  }, { scope: ref });

  return (
    <div ref={ref} className="interactive-icon" onMouseEnter={() => tl.current?.restart()}>
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path className="heart-outline" d="M32 56L6 30C6 18 16 10 24 10C28 10 31 12 32 14C33 12 36 10 40 10C48 10 58 18 58 30L32 56Z" stroke="var(--text-primary)" strokeWidth="3" fill="none"/>
        <path className="heart-fill" d="M32 56L6 30C6 18 16 10 24 10C28 10 31 12 32 14C33 12 36 10 40 10C48 10 58 18 58 30L32 56Z" fill="var(--accent-red)" opacity="0" style={{transformOrigin: 'center', transform: 'scale(0.5)'}}/>
        <g className="heart-particles">
          <circle cx="14" cy="22" r="3" fill="var(--accent-pink)"/>
          <circle cx="50" cy="20" r="2.5" fill="var(--accent-orange)"/>
          <circle cx="10" cy="40" r="2" fill="var(--accent-yellow)"/>
          <circle cx="54" cy="38" r="3" fill="var(--accent-pink)"/>
          <circle cx="24" cy="8" r="2" fill="var(--accent-orange)"/>
          <circle cx="42" cy="6" r="2.5" fill="var(--accent-yellow)"/>
        </g>
      </svg>
      <span className="icon-label">Hover me!</span>
    </div>
  );
}

// ===== GEAR ICON =====
export function GearIcon() {
  const ref = useRef(null);
  const tl = useRef(null);

  useGSAP(() => {
    tl.current = gsap.timeline({ paused: true, repeat: 2 })
      .to('.gear-main', { rotation: 360, transformOrigin: '32 32', duration: 1.5, ease: 'none' })
      .to('.gear-small', { rotation: -360, transformOrigin: '50 14', duration: 1.5, ease: 'none' }, 0);
  }, { scope: ref });

  return (
    <div ref={ref} className="interactive-icon" onMouseEnter={() => tl.current?.restart()}>
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <g className="gear-main">
          <circle cx="32" cy="32" r="10" stroke="var(--text-primary)" strokeWidth="3" fill="none"/>
          <path d="M32 8V14M32 50V56M8 32H14M50 32H56M15 15L19.5 19.5M44.5 44.5L49 49M49 15L44.5 19.5M19.5 44.5L15 49" stroke="var(--text-primary)" strokeWidth="3" strokeLinecap="round"/>
        </g>
        <g className="gear-small">
          <circle cx="50" cy="14" r="5" stroke="var(--text-primary)" strokeWidth="2" fill="none"/>
          <path d="M50 4V8M50 20V24M40 14H44M56 14H60" stroke="var(--text-primary)" strokeWidth="2" strokeLinecap="round"/>
        </g>
      </svg>
      <span className="icon-label">Hover me!</span>
    </div>
  );
}

// ===== MAIL ICON =====
export function MailIcon() {
  const ref = useRef(null);
  const tl = useRef(null);

  useGSAP(() => {
    tl.current = gsap.timeline({ paused: true })
      .to('.mail-flap', { rotateX: -180, transformOrigin: 'center top', duration: 0.4, ease: 'power2.inOut' })
      .fromTo('.mail-letter', { y: 0, opacity: 0 }, { y: -18, opacity: 1, duration: 0.4, ease: 'back.out(2)' }, '-=0.2')
      .to('.mail-letter', { y: -12, duration: 0.3, ease: 'power2.inOut' }, '+=0.3');
  }, { scope: ref });

  return (
    <div ref={ref} className="interactive-icon" onMouseEnter={() => tl.current?.restart()}>
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="6" y="18" width="52" height="36" rx="2" stroke="var(--text-primary)" strokeWidth="3" fill="none"/>
        <path className="mail-flap" d="M6 18L32 38L58 18" stroke="var(--text-primary)" strokeWidth="3" fill="none" strokeLinejoin="round"/>
        <rect className="mail-letter" x="18" y="26" width="28" height="20" rx="1" fill="var(--accent-blue)" opacity="0"/>
      </svg>
      <span className="icon-label">Hover me!</span>
    </div>
  );
}

// Export all icons
export const interactiveIcons = [
  { key: 'cart', label: 'Giỏ hàng', Component: CartIcon },
  { key: 'bell', label: 'Chuông', Component: BellIcon },
  { key: 'search', label: 'Kính lúp', Component: SearchIcon },
  { key: 'heart', label: 'Tim', Component: HeartIcon },
  { key: 'gear', label: 'Bánh răng', Component: GearIcon },
  { key: 'mail', label: 'Thư', Component: MailIcon },
];
