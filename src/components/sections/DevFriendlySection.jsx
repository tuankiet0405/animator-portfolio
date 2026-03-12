import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LightningIcon, RocketIcon, WrenchIcon } from '../../assets/svg/icons/DevFriendlyIcons';
import './DevFriendlySection.css';

const promises = [
  { icon: LightningIcon, title: 'Lightweight', desc: 'File Lottie trung bình chỉ 50-80KB — nhẹ hơn 10x so với GIF/video.' },
  { icon: RocketIcon, title: 'Performant', desc: 'Render bằng Canvas/SVG, không block main thread. 60fps mượt mà.' },
  { icon: WrenchIcon, title: 'Dev-Ready', desc: 'Export JSON, tích hợp 3 dòng code. Hỗ trợ React, Vue, Web Components.' },
];

const barData = [
  { label: 'GIF', size: 2400, color: 'var(--text-secondary)' },
  { label: 'MP4', size: 800, color: 'var(--text-secondary)' },
  { label: 'Lottie', size: 72, color: 'var(--accent-blue)', highlight: true },
];

/**
 * DevFriendlySection — 3 promise cards + animated file size comparison
 */
export default function DevFriendlySection() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    // Header entrance
    gsap.from('.dev-friendly__header', {
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      y: 40, opacity: 0, duration: 0.7, ease: 'back.out(1.7)',
    });

    // Promise cards stagger
    gsap.from('.promise-card', {
      scrollTrigger: { trigger: '.dev-friendly__promises', start: 'top 75%' },
      y: 50, opacity: 0, stagger: 0.15, duration: 0.6, ease: 'back.out(1.7)',
    });

    // Stroke-draw icons
    const allPaths = sectionRef.current.querySelectorAll('.dev-icon__stroke');
    allPaths.forEach((path) => {
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 1.2,
        ease: 'power2.inOut',
        scrollTrigger: { trigger: path, start: 'top 80%' },
      });
    });

    // File size bars
    gsap.from('.bar__fill', {
      scrollTrigger: { trigger: '.dev-friendly__chart', start: 'top 75%' },
      scaleX: 0, transformOrigin: 'left center', stagger: 0.15, duration: 0.8, ease: 'power2.out',
    });

    // Bar numbers
    barData.forEach((bar, i) => {
      const el = sectionRef.current.querySelector(`.bar__number--${i}`);
      if (!el) return;
      const counter = { value: 0 };
      gsap.to(counter, {
        value: bar.size,
        duration: 1.2,
        ease: 'power1.out',
        scrollTrigger: { trigger: '.dev-friendly__chart', start: 'top 75%' },
        delay: i * 0.15,
        onUpdate: () => { el.textContent = `${Math.round(counter.value)}KB`; },
      });
    });
  }, { scope: sectionRef });

  const maxSize = Math.max(...barData.map((b) => b.size));

  return (
    <section ref={sectionRef} id="dev-friendly" className="dev-friendly">
      <div className="container">
        <div className="dev-friendly__header" style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
          <h2 className="section-title">Dev-Friendly</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Tại sao dev team sẽ yêu thích file animation của bạn
          </p>
        </div>

        {/* 3 Promise Cards */}
        <div className="dev-friendly__promises">
          {promises.map(({ icon: Icon, title, desc }, i) => (
            <div key={i} className="promise-card">
              <div className="promise-card__icon">
                <Icon />
              </div>
              <h3 className="promise-card__title">{title}</h3>
              <p className="promise-card__desc">{desc}</p>
            </div>
          ))}
        </div>

        {/* File Size Comparison Chart */}
        <div className="dev-friendly__chart">
          <h3 className="dev-friendly__chart-title">File Size Comparison</h3>
          <div className="chart__bars">
            {barData.map((bar, i) => (
              <div key={bar.label} className="bar">
                <span className="bar__label">{bar.label}</span>
                <div className="bar__track">
                  <div
                    className={`bar__fill ${bar.highlight ? 'bar__fill--highlight' : ''}`}
                    style={{
                      width: `${(bar.size / maxSize) * 100}%`,
                      background: bar.color,
                    }}
                  />
                </div>
                <span className={`bar__number bar__number--${i}`}>0KB</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
