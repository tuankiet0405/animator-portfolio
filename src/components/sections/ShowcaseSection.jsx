import { useRef, useState, useCallback } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../../data/projects';
import DeviceMockup from '../ui/DeviceMockup';
import LottiePlayer from '../ui/LottiePlayer';
import ShowcaseModal from '../ui/ShowcaseModal';
import './ShowcaseSection.css';

/**
 * ShowcaseSection — Project grid with device mockups + Lottie players
 */
export default function ShowcaseSection() {
  const sectionRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);

  // Section entrance
  useGSAP(() => {
    gsap.from('.showcase__header', {
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      y: 40, opacity: 0, duration: 0.7, ease: 'back.out(1.7)',
    });

    gsap.from('.showcase-card', {
      scrollTrigger: { trigger: '.showcase__grid', start: 'top 75%' },
      y: 50, opacity: 0, duration: 0.6, stagger: 0.15, ease: 'back.out(1.7)',
    });
  }, { scope: sectionRef });

  const handleCardHover = useCallback((e, enter) => {
    gsap.to(e.currentTarget, {
      y: enter ? -8 : 0,
      boxShadow: enter
        ? '12px 12px 0px var(--border-color)'
        : '8px 8px 0px var(--border-color)',
      duration: 0.3,
      ease: 'power2.out',
    });
  }, []);

  return (
    <section ref={sectionRef} id="showcase" className="showcase">
      <div className="container">
        <div className="showcase__header" style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
          <h2 className="section-title">Showcase</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Dự án thực tế — click để xem chi tiết
          </p>
        </div>

        <div className="showcase__grid">
          {projects.map((project) => (
            <div
              key={project.id}
              className="showcase-card"
              onClick={() => setSelectedProject(project)}
              onMouseEnter={(e) => handleCardHover(e, true)}
              onMouseLeave={(e) => handleCardHover(e, false)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setSelectedProject(project)}
              aria-label={`View project: ${project.title}`}
            >
              <DeviceMockup type={project.device} url={project.url}>
                <LottiePlayer src={project.lottie} />
              </DeviceMockup>
              <div className="showcase-card__info">
                <span className="showcase-card__category">{project.category}</span>
                <h3 className="showcase-card__title">{project.title}</h3>
                <div className="showcase-card__tags">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="showcase-card__tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <ShowcaseModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
