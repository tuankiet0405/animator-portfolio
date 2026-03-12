import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Track mouse position with RAF throttling
 * Returns { x, y, normalizedX, normalizedY }
 * - x, y: raw pixel coordinates
 * - normalizedX, normalizedY: 0→1 relative to viewport
 */
export default function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0, normalizedX: 0.5, normalizedY: 0.5 });
  const rafId = useRef(null);
  const latestEvent = useRef(null);

  const updatePosition = useCallback(() => {
    if (latestEvent.current) {
      const { clientX, clientY } = latestEvent.current;
      setPosition({
        x: clientX,
        y: clientY,
        normalizedX: clientX / window.innerWidth,
        normalizedY: clientY / window.innerHeight,
      });
      latestEvent.current = null;
    }
    rafId.current = null;
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      latestEvent.current = e;
      if (!rafId.current) {
        rafId.current = requestAnimationFrame(updatePosition);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [updatePosition]);

  return position;
}
