import { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import useInView from '../../hooks/useInView';

/**
 * StatCounter — Animated number counter
 * Counts from 0 to target value when element enters viewport
 */
export default function StatCounter({ target, suffix = '', prefix = '', duration = 2, className = '' }) {
  const numberRef = useRef(null);
  const [inViewRef, isInView] = useInView({ threshold: 0.5, once: true });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current || !numberRef.current) return;
    hasAnimated.current = true;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      numberRef.current.textContent = `${prefix}${target}${suffix}`;
      return;
    }

    const counter = { value: 0 };
    gsap.to(counter, {
      value: target,
      duration,
      ease: 'power1.out',
      onUpdate: () => {
        numberRef.current.textContent = `${prefix}${Math.round(counter.value)}${suffix}`;
      },
    });
  }, [isInView, target, suffix, prefix, duration]);

  return (
    <span ref={inViewRef} className={`stat-counter ${className}`}>
      <span ref={numberRef} className="stat-counter__number">
        {prefix}0{suffix}
      </span>
    </span>
  );
}
