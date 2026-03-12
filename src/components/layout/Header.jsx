import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useTheme } from '../../context/ThemeContext';
import ThemeToggle from '../ui/ThemeToggle';
import './Header.css';

const navLinks = [
  { label: 'Work', href: '#why-motion' },
  { label: 'Services', href: '#services' },
  { label: 'Showcase', href: '#showcase' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const headerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const lastScrollY = useRef(0);

  // Scroll hide/show
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const isScrollingUp = currentY < lastScrollY.current;
      const isAtTop = currentY < 100;

      setIsVisible(isScrollingUp || isAtTop);
      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active section detection
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Mobile menu body scroll lock
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  // GSAP entrance
  useGSAP(() => {
    gsap.from('.header__inner', {
      y: -20,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      delay: 0.2,
    });
  }, { scope: headerRef });

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      ref={headerRef}
      className={`header ${isVisible ? 'header--visible' : 'header--hidden'}`}
    >
      <div className="header__inner container">
        {/* Logo */}
        <a href="#" className="header__logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          KIET<span className="header__logo-dot">.</span>
        </a>

        {/* Desktop Nav */}
        <nav className="header__nav" aria-label="Main navigation">
          {navLinks.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className={`header__link ${activeSection === href ? 'header__link--active' : ''}`}
              onClick={(e) => handleNavClick(e, href)}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="header__actions">
          <ThemeToggle />
          <button
            className={`header__hamburger ${mobileMenuOpen ? 'header__hamburger--open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`header__mobile-menu ${mobileMenuOpen ? 'header__mobile-menu--open' : ''}`}>
        <nav aria-label="Mobile navigation">
          {navLinks.map(({ label, href }, i) => (
            <a
              key={href}
              href={href}
              className="header__mobile-link"
              style={{ transitionDelay: mobileMenuOpen ? `${i * 0.06}s` : '0s' }}
              onClick={(e) => handleNavClick(e, href)}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
