import { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollLinePath, scrollLineNodes, scrollLineViewBox } from '../../assets/svg/ScrollLineData';
import './ScrollLine.css';

/**
 * ScrollLine — decorative SVG line that draws progressively with scroll
 * Position: fixed left side, visible only on desktop (≥1025px)
 */
export default function ScrollLine() {
  const containerRef = useRef(null);
  const pathRef = useRef(null);

  useGSAP(() => {
    const path = pathRef.current;
    if (!path) return;

    // Calculate total path length
    const totalLength = path.getTotalLength();

    // Set initial state — fully hidden
    gsap.set(path, {
      strokeDasharray: totalLength,
      strokeDashoffset: totalLength,
    });

    // Animate stroke-dashoffset synced with scroll
    gsap.to(path, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      },
    });

    // Animate node dots — scale up when scroll reaches their position
    scrollLineNodes.forEach((node, i) => {
      const dotEl = containerRef.current.querySelector(`.scroll-line__node--${i}`);
      if (!dotEl) return;

      gsap.fromTo(dotEl,
        { scale: 0, transformOrigin: 'center' },
        {
          scale: 1,
          duration: 0.4,
          ease: 'back.out(3)',
          scrollTrigger: {
            trigger: document.body,
            start: `${Math.max(0, node.position * 100 - 2)}% top`,
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="scroll-line" aria-hidden="true">
      <svg
        className="scroll-line__svg"
        viewBox={scrollLineViewBox}
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background track */}
        <path
          d={scrollLinePath}
          className="scroll-line__track"
          fill="none"
          stroke="var(--text-secondary)"
          strokeWidth="1"
          opacity="0.15"
        />
        {/* Animated line */}
        <path
          ref={pathRef}
          d={scrollLinePath}
          className="scroll-line__path"
          fill="none"
          stroke="var(--accent-blue)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Node dots at section intersections */}
        {scrollLineNodes.map((node, i) => {
          // Calculate approximate position along the SVG path
          const cy = node.position * 1280;
          return (
            <circle
              key={i}
              className={`scroll-line__node scroll-line__node--${i}`}
              cx="60"
              cy={cy}
              r="6"
              fill={node.color}
              stroke="var(--border-color)"
              strokeWidth="2"
              style={{ transformOrigin: 'center', transform: 'scale(0)' }}
            />
          );
        })}
      </svg>
    </div>
  );
}
