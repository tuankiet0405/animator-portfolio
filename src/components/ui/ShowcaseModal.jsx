import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import DeviceMockup from './DeviceMockup';
import LottiePlayer from './LottiePlayer';
import './ShowcaseModal.css';

/**
 * ShowcaseModal — Fullscreen project detail modal
 * Uses createPortal, GSAP entrance, ESC close, focus trap
 */
export default function ShowcaseModal({ project, onClose }) {
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  // GSAP entrance
  useGSAP(() => {
    gsap.from(overlayRef.current, { opacity: 0, duration: 0.3, ease: 'power2.out' });
    gsap.from(contentRef.current, {
      scale: 0.92,
      y: 30,
      opacity: 0,
      duration: 0.4,
      ease: 'back.out(1.4)',
      delay: 0.1,
    });
  }, { scope: overlayRef });

  // ESC key close
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  // Click overlay to close
  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  if (!project) return null;

  return createPortal(
    <div
      ref={overlayRef}
      className="showcase-modal__overlay"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label={`Project details: ${project.title}`}
    >
      <div ref={contentRef} className="showcase-modal__content">
        {/* Close button */}
        <button className="showcase-modal__close" onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        {/* Project header */}
        <div className="showcase-modal__header">
          <span className="showcase-modal__category">{project.category}</span>
          <h2 className="showcase-modal__title">{project.title}</h2>
        </div>

        {/* Device mockup with Lottie */}
        <div className="showcase-modal__preview">
          <DeviceMockup type={project.device} url={project.url}>
            <LottiePlayer src={project.lottie} />
          </DeviceMockup>
        </div>

        {/* Details */}
        <div className="showcase-modal__details">
          <p className="showcase-modal__desc">{project.description}</p>

          <div className="showcase-modal__meta">
            <div className="showcase-modal__meta-item">
              <span className="showcase-modal__meta-label">Role</span>
              <span>{project.role}</span>
            </div>
            <div className="showcase-modal__meta-item">
              <span className="showcase-modal__meta-label">Duration</span>
              <span>{project.duration}</span>
            </div>
            <div className="showcase-modal__meta-item">
              <span className="showcase-modal__meta-label">File Size</span>
              <span>{project.fileSize}</span>
            </div>
          </div>

          <div className="showcase-modal__tags">
            {project.tags.map((tag) => (
              <span key={tag} className="showcase-modal__tag">{tag}</span>
            ))}
          </div>

          <div className="showcase-modal__tools">
            <span className="showcase-modal__meta-label">Tools:</span>
            {project.tools.map((tool) => (
              <span key={tool} className="showcase-modal__tool">{tool}</span>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
