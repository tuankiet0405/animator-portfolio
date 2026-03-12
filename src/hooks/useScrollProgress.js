import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Track scroll progress
 * - Global progress: 0→1 for the full page
 * - Element progress: 0→1 for a specific element ref
 */
export default function useScrollProgress(elementRef = null) {
  const [progress, setProgress] = useState(0);
  const rafId = useRef(null);

  const calculateProgress = useCallback(() => {
    if (elementRef?.current) {
      // Element-specific progress
      const rect = elementRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementTop = rect.top;
      const elementHeight = rect.height;
      // 0 = element just entered bottom of viewport, 1 = element fully passed top
      const raw = (windowHeight - elementTop) / (windowHeight + elementHeight);
      setProgress(Math.max(0, Math.min(1, raw)));
    } else {
      // Global page progress
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.max(0, Math.min(1, scrollTop / docHeight)) : 0);
    }
    rafId.current = null;
  }, [elementRef]);

  useEffect(() => {
    const handleScroll = () => {
      if (!rafId.current) {
        rafId.current = requestAnimationFrame(calculateProgress);
      }
    };

    // Initial calculation
    calculateProgress();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [calculateProgress]);

  return progress;
}
