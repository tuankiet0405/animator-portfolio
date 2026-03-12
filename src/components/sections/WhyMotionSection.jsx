import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useInView from '../../hooks/useInView';
import StatCounter from '../ui/StatCounter';
import './WhyMotionSection.css';

/**
 * WhyMotionSection — Before/After comparison with draggable divider
 * Left: Static UI card (greyed out)
 * Right: Animated UI card (GSAP animate-in)
 */
export default function WhyMotionSection() {
  const sectionRef = useRef(null);
  const [dividerX, setDividerX] = useState(50); // percentage 0–100
  const isDragging = useRef(false);
  const containerRef = useRef(null);
  const [inViewRef, isInView] = useInView({ threshold: 0.3, once: true });

  // Section entrance
  useGSAP(() => {
    gsap.from('.why-motion__header', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      },
      y: 40,
      opacity: 0,
      duration: 0.7,
      ease: 'back.out(1.7)',
    });
  }, { scope: sectionRef });

  // Animated card entrance when in view
  useGSAP(() => {
    if (!isInView) return;

    const tl = gsap.timeline();
    tl.from('.animated-card__heading', { x: -30, opacity: 0, duration: 0.5, ease: 'power2.out' })
      .from('.animated-card__text', { opacity: 0, y: 10, stagger: 0.08, duration: 0.4 }, '-=0.2')
      .from('.animated-card__button', { scale: 0.8, opacity: 0, duration: 0.4, ease: 'back.out(2)' }, '-=0.1')
      .from('.animated-card__image', { x: 20, opacity: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3');
  }, { scope: sectionRef, dependencies: [isInView] });

  // Drag handlers
  const handlePointerDown = (e) => {
    isDragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setDividerX(Math.max(10, Math.min(90, x)));
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  return (
    <section ref={sectionRef} id="why-motion" className="why-motion">
      <div className="container">
        <div className="why-motion__header">
          <h2 className="section-title">Why Motion?</h2>
          <p className="section-subtitle">
            Trang web với animation tăng <StatCounter target={70} suffix="%" className="text-accent-blue" /> thời gian ở lại và giảm <StatCounter target={30} suffix="%" className="text-accent-orange" /> bounce rate.
          </p>
        </div>

        {/* Comparison Slider */}
        <div
          ref={(el) => { containerRef.current = el; inViewRef.current = el; }}
          className="why-motion__comparison"
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          {/* Static Card (Left clip) */}
          <div className="why-motion__static" style={{ clipPath: `inset(0 ${100 - dividerX}% 0 0)` }}>
            <div className="comparison-card comparison-card--static">
              <div className="comparison-card__label">Static ❌</div>
              <div className="comparison-card__heading">&nbsp;</div>
              <div className="comparison-card__text-line" />
              <div className="comparison-card__text-line comparison-card__text-line--short" />
              <div className="comparison-card__text-line" />
              <div className="comparison-card__button-mock" />
              <div className="comparison-card__image-mock" />
            </div>
          </div>

          {/* Animated Card (Right clip) */}
          <div className="why-motion__animated" style={{ clipPath: `inset(0 0 0 ${dividerX}%)` }}>
            <div className="comparison-card comparison-card--animated">
              <div className="comparison-card__label">Animated ✨</div>
              <h3 className="animated-card__heading">Your Product Here</h3>
              <p className="animated-card__text">Transform your landing page with smooth, engaging vector animations.</p>
              <p className="animated-card__text">Increase conversions. Reduce bounce rates. Delight your users.</p>
              <button className="animated-card__button">Get Started →</button>
              <div className="animated-card__image">
                <svg viewBox="0 0 200 100" aria-hidden="true">
                  <rect x="10" y="60" width="30" height="35" fill="var(--accent-blue)" rx="2" />
                  <rect x="50" y="40" width="30" height="55" fill="var(--accent-orange)" rx="2" />
                  <rect x="90" y="20" width="30" height="75" fill="var(--accent-green)" rx="2" />
                  <rect x="130" y="30" width="30" height="65" fill="var(--accent-pink)" rx="2" />
                  <rect x="170" y="10" width="25" height="85" fill="var(--accent-yellow)" rx="2" />
                </svg>
              </div>
            </div>
          </div>

          {/* Draggable Divider */}
          <div
            className="why-motion__divider"
            style={{ left: `${dividerX}%` }}
            onPointerDown={handlePointerDown}
          >
            <div className="why-motion__divider-handle">
              <span>◄ ►</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
