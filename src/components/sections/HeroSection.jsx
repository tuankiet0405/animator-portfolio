import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useMousePosition from '../../hooks/useMousePosition';
import ParticleCanvas from '../ui/ParticleCanvas';
import './HeroSection.css';

export default function HeroSection() {
  const sectionRef = useRef(null);
  const shapesRef = useRef(null);
  const mouse = useMousePosition();

  // GSAP entrance animations
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'back.out(1.7)' } });

    tl.from('.hero__title', { y: 50, opacity: 0, duration: 0.9, delay: 0.3 })
      .from('.hero__subtitle', { y: 30, opacity: 0, duration: 0.7 }, '-=0.4')
      .from('.hero__cta', { y: 20, opacity: 0, duration: 0.5 }, '-=0.3')
      .from('.hero__shape', {
        scale: 0,
        opacity: 0,
        rotation: -180,
        stagger: 0.1,
        duration: 0.8,
        ease: 'elastic.out(1, 0.5)',
      }, '-=0.6');
  }, { scope: sectionRef });

  // Mouse-reactive shape movement
  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(hover: none)').matches) return;

    const shapes = shapesRef.current?.querySelectorAll('.hero__shape');
    if (!shapes) return;

    shapes.forEach((shape, i) => {
      const depth = (i + 1) * 0.05; // different parallax depth per shape
      const offsetX = (mouse.normalizedX - 0.5) * 80 * depth;
      const offsetY = (mouse.normalizedY - 0.5) * 60 * depth;
      const rotation = (mouse.normalizedX - 0.5) * 20 * depth;

      gsap.to(shape, {
        x: offsetX,
        y: offsetY,
        rotation: rotation,
        duration: 0.8,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    });
  }, { scope: sectionRef, dependencies: [mouse.normalizedX, mouse.normalizedY] });

  return (
    <section ref={sectionRef} id="hero" className="hero">
      <ParticleCanvas />

      {/* SVG Shapes Background */}
      <div ref={shapesRef} className="hero__shapes" aria-hidden="true">
        <svg className="hero__shape hero__shape--circle" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="45" fill="var(--accent-blue)" stroke="var(--border-color)" strokeWidth="3" />
        </svg>
        <svg className="hero__shape hero__shape--square" viewBox="0 0 120 120">
          <rect x="20" y="20" width="80" height="80" fill="var(--accent-yellow)" stroke="var(--border-color)" strokeWidth="3" />
        </svg>
        <svg className="hero__shape hero__shape--triangle" viewBox="0 0 120 120">
          <polygon points="60,10 110,100 10,100" fill="var(--accent-orange)" stroke="var(--border-color)" strokeWidth="3" />
        </svg>
        <svg className="hero__shape hero__shape--star" viewBox="0 0 120 120">
          <polygon points="60,5 72,42 110,42 80,65 90,105 60,80 30,105 40,65 10,42 48,42" fill="var(--accent-pink)" stroke="var(--border-color)" strokeWidth="3" />
        </svg>
        <svg className="hero__shape hero__shape--blob" viewBox="0 0 120 120">
          <path d="M60,15 C85,10 110,30 108,55 C106,80 90,108 60,110 C30,112 10,85 12,58 C14,31 35,20 60,15Z" fill="var(--accent-green)" stroke="var(--border-color)" strokeWidth="3" />
        </svg>
        <svg className="hero__shape hero__shape--diamond" viewBox="0 0 120 120">
          <polygon points="60,10 110,60 60,110 10,60" fill="var(--accent-blue)" stroke="var(--border-color)" strokeWidth="3" opacity="0.6" />
        </svg>
        <svg className="hero__shape hero__shape--hexagon" viewBox="0 0 120 120">
          <polygon points="60,10 104,35 104,85 60,110 16,85 16,35" fill="var(--accent-orange)" stroke="var(--border-color)" strokeWidth="3" opacity="0.5" />
        </svg>
      </div>

      {/* Content */}
      <div className="container hero__container">
        <div className="hero__content">
          <h1 className="hero__title headline-hero">
            I bring your <br />
            landing pages to life <br />
            with <span className="text-accent-blue">Vector Motion</span>
          </h1>
          <p className="hero__subtitle section-subtitle">
            Hoạt ảnh SVG & Lottie cho web — mượt mà, nhẹ nhàng, sẵn sàng cho dev.
          </p>
          <a
            href="#showcase"
            className="hero__cta"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#showcase')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Xem Demo ↓
          </a>
        </div>
      </div>
    </section>
  );
}
