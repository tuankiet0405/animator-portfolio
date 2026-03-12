import { useRef, useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import useInView from '../../hooks/useInView';

/**
 * LottiePlayer — Lazy Lottie wrapper with auto-play when in view
 * Pauses when off-screen for performance
 */
export default function LottiePlayer({ src, loop = true, className = '' }) {
  const lottieRef = useRef(null);
  const [animationData, setAnimationData] = useState(null);
  const [error, setError] = useState(false);
  const [inViewRef, isInView] = useInView({ threshold: 0.1 });

  // Fetch Lottie JSON
  useEffect(() => {
    fetch(src)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load');
        return res.json();
      })
      .then(setAnimationData)
      .catch(() => setError(true));
  }, [src]);

  // Play/pause based on visibility
  useEffect(() => {
    if (!lottieRef.current) return;
    if (isInView) {
      lottieRef.current.play();
    } else {
      lottieRef.current.pause();
    }
  }, [isInView]);

  if (error) {
    return (
      <div ref={inViewRef} className={`lottie-player lottie-player--error ${className}`}>
        <svg viewBox="0 0 100 60" aria-hidden="true" style={{ width: '100%', opacity: 0.3 }}>
          <rect x="10" y="10" width="80" height="40" rx="4" fill="var(--text-secondary)" />
          <text x="50" y="35" textAnchor="middle" fill="var(--bg-primary)" fontSize="10">Lottie</text>
        </svg>
      </div>
    );
  }

  if (!animationData) {
    return (
      <div ref={inViewRef} className={`lottie-player lottie-player--loading ${className}`}>
        <div className="lottie-player__spinner" />
      </div>
    );
  }

  return (
    <div ref={inViewRef} className={`lottie-player ${className}`}>
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop={loop}
        autoplay={false}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
