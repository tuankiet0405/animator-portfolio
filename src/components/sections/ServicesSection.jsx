import { useRef, useCallback } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HeroBannerIcon, ScrollExplainerIcon, MicroInteractionIcon } from '../../assets/svg/icons/ServiceIcons';
import useInView from '../../hooks/useInView';
import { services } from '../../data/services';
import './ServicesSection.css';

const iconComponents = {
  HeroBannerIcon,
  ScrollExplainerIcon,
  MicroInteractionIcon,
};

/**
 * ServicesSection — 3 service cards with tilt hover + animated icons
 */
export default function ServicesSection() {
  const sectionRef = useRef(null);
  const [inViewRef, isInView] = useInView({ threshold: 0.2, once: true });

  // Staggered card entrance
  useGSAP(() => {
    gsap.from('.services__title-wrap', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      },
      y: 40,
      opacity: 0,
      duration: 0.7,
      ease: 'back.out(1.7)',
    });

    gsap.from('.service-card', {
      scrollTrigger: {
        trigger: '.services__grid',
        start: 'top 75%',
      },
      y: 60,
      opacity: 0,
      duration: 0.7,
      stagger: 0.15,
      ease: 'back.out(1.7)',
    });
  }, { scope: sectionRef });

  // 3D Tilt on hover
  const handleMouseMove = useCallback((e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.3,
      ease: 'power2.out',
      transformPerspective: 800,
      overwrite: 'auto',
    });
  }, []);

  const handleMouseLeave = useCallback((e) => {
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
  }, []);

  return (
    <section ref={sectionRef} id="services" className="services">
      <div className="container">
        <div className="services__title-wrap" style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
          <h2 className="section-title">Services</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Ba loại animation giúp landing page của bạn trở nên sống động
          </p>
        </div>

        <div ref={inViewRef} className="services__grid">
          {services.map((service) => {
            const IconComp = iconComponents[service.icon];
            return (
              <div
                key={service.id}
                className="service-card"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <div className="service-card__icon">
                  {IconComp && <IconComp isInView={isInView} />}
                </div>
                <h3 className="service-card__title">{service.title}</h3>
                <p className="service-card__desc">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
