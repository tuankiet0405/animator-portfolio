import { useState, useEffect, useRef } from 'react';

/**
 * Intersection Observer wrapper
 * Returns [ref, isInView, entry]
 * @param {Object} options - IntersectionObserver options
 * @param {number} options.threshold - 0-1 visibility threshold
 * @param {string} options.rootMargin - margin around root
 * @param {boolean} options.once - if true, stop observing after first intersection
 */
export default function useInView({ threshold = 0.1, rootMargin = '0px', once = false } = {}) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [entry, setEntry] = useState(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([observerEntry]) => {
        const inView = observerEntry.isIntersecting;
        setIsInView(inView);
        setEntry(observerEntry);

        if (inView && once) {
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, isInView, entry];
}
