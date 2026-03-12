import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CartIcon, BellIcon, SearchIcon, HeartIcon, GearIcon, MailIcon } from '../../assets/svg/icons/InteractiveIcons';
import '../../assets/svg/icons/InteractiveIcons.css';
import './ComponentLibrary.css';

const icons = [
  { key: 'cart', label: 'Giỏ hàng', Component: CartIcon },
  { key: 'bell', label: 'Chuông', Component: BellIcon },
  { key: 'search', label: 'Kính lúp', Component: SearchIcon },
  { key: 'heart', label: 'Tim', Component: HeartIcon },
  { key: 'gear', label: 'Bánh răng', Component: GearIcon },
  { key: 'mail', label: 'Thư', Component: MailIcon },
];

/**
 * ComponentLibrary — Grid of 6 interactive SVG icons
 * Each icon has a unique hover animation via GSAP timeline
 */
export default function ComponentLibrary() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.from('.library__header', {
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      y: 40, opacity: 0, duration: 0.7, ease: 'back.out(1.7)',
    });

    gsap.from('.interactive-icon', {
      scrollTrigger: { trigger: '.library__grid', start: 'top 75%' },
      scale: 0.8, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'back.out(2)',
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="component-library" className="library">
      <div className="container">
        <div className="library__header" style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
          <h2 className="section-title">Component Library</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Hover từng icon để xem animation ✨
          </p>
        </div>

        <div className="library__grid">
          {icons.map(({ key, Component }) => (
            <Component key={key} />
          ))}
        </div>
      </div>
    </section>
  );
}
