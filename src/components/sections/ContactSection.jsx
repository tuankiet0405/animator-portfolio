import { useRef, useState, useCallback } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ConfettiEffect from '../ui/ConfettiEffect';
import './ContactSection.css';

const INITIAL = { name: '', email: '', project: '', budget: '' };
const BUDGETS = ['< $500', '$500 – $2,000', '$2,000 – $5,000', '$5,000+', 'Chưa xác định'];

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Vui lòng nhập tên';
  if (!values.email.trim()) errors.email = 'Vui lòng nhập email';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'Email không hợp lệ';
  if (!values.project.trim()) errors.project = 'Mô tả ngắn về dự án';
  return errors;
}

export default function ContactSection() {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Section entrance
  useGSAP(() => {
    gsap.from('.contact__header', {
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      y: 40, opacity: 0, duration: 0.7, ease: 'back.out(1.7)',
    });
    gsap.from('.contact__form', {
      scrollTrigger: { trigger: '.contact__form', start: 'top 80%' },
      y: 30, opacity: 0, duration: 0.6, ease: 'power2.out', delay: 0.2,
    });
  }, { scope: sectionRef });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const fieldErrors = validate(values);
    if (fieldErrors[name]) {
      setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] }));
      // Shake animation on error
      const field = formRef.current?.querySelector(`[name="${name}"]`);
      if (field) {
        gsap.fromTo(field.closest('.form-group'), { x: -6 }, { x: 0, duration: 0.4, ease: 'elastic.out(1, 0.3)' });
      }
    }
  };

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    const fieldErrors = validate(values);
    setErrors(fieldErrors);
    setTouched({ name: true, email: true, project: true });

    if (Object.keys(fieldErrors).length > 0) {
      // Shake the form
      gsap.fromTo(formRef.current, { x: -8 }, { x: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
      return;
    }

    // Success!
    setSubmitted(true);
    setShowConfetti(true);

    // Animate success message
    gsap.from('.contact__success', {
      scale: 0.8,
      opacity: 0,
      duration: 0.5,
      ease: 'back.out(2)',
    });
  }, [values]);

  const handleReset = () => {
    setValues(INITIAL);
    setErrors({});
    setTouched({});
    setSubmitted(false);
  };

  return (
    <section ref={sectionRef} id="contact" className="contact">
      <div className="container">
        <div className="contact__header" style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
          <h2 className="section-title">Let's Talk</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Bạn muốn landing page sống động hơn? Gửi tin nhắn cho tôi!
          </p>
        </div>

        <div className="contact__wrapper">
          {!submitted ? (
            <form ref={formRef} className="contact__form" onSubmit={handleSubmit} noValidate>
              {/* Name */}
              <div className={`form-group ${errors.name && touched.name ? 'form-group--error' : ''} ${touched.name && !errors.name ? 'form-group--valid' : ''}`}>
                <label htmlFor="contact-name" className="form-label">Tên *</label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  className="form-input"
                  placeholder="Nguyễn Văn A"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="name"
                />
                {errors.name && touched.name && <span className="form-error">{errors.name}</span>}
                {touched.name && !errors.name && values.name && <span className="form-check" aria-hidden="true">✓</span>}
              </div>

              {/* Email */}
              <div className={`form-group ${errors.email && touched.email ? 'form-group--error' : ''} ${touched.email && !errors.email ? 'form-group--valid' : ''}`}>
                <label htmlFor="contact-email" className="form-label">Email *</label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  className="form-input"
                  placeholder="email@example.com"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="email"
                />
                {errors.email && touched.email && <span className="form-error">{errors.email}</span>}
                {touched.email && !errors.email && values.email && <span className="form-check" aria-hidden="true">✓</span>}
              </div>

              {/* Budget */}
              <div className="form-group">
                <label htmlFor="contact-budget" className="form-label">Ngân sách</label>
                <select
                  id="contact-budget"
                  name="budget"
                  className="form-input form-select"
                  value={values.budget}
                  onChange={handleChange}
                >
                  <option value="">Chọn ngân sách...</option>
                  {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>

              {/* Project Description */}
              <div className={`form-group ${errors.project && touched.project ? 'form-group--error' : ''} ${touched.project && !errors.project ? 'form-group--valid' : ''}`}>
                <label htmlFor="contact-project" className="form-label">Mô tả dự án *</label>
                <textarea
                  id="contact-project"
                  name="project"
                  className="form-input form-textarea"
                  placeholder="Tôi cần animation cho homepage..."
                  rows="4"
                  value={values.project}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.project && touched.project && <span className="form-error">{errors.project}</span>}
                {touched.project && !errors.project && values.project && <span className="form-check" aria-hidden="true">✓</span>}
              </div>

              {/* Submit */}
              <button type="submit" className="contact__submit">
                <span className="contact__submit-text">Gửi tin nhắn</span>
                <svg className="contact__submit-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </form>
          ) : (
            <div className="contact__success">
              <div className="contact__success-icon">🎉</div>
              <h3 className="contact__success-title">Cảm ơn bạn!</h3>
              <p className="contact__success-text">Tin nhắn đã được gửi. Tôi sẽ phản hồi trong 24h.</p>
              <button className="contact__reset" onClick={handleReset}>
                Gửi tin nhắn khác
              </button>
            </div>
          )}
        </div>
      </div>

      <ConfettiEffect trigger={showConfetti} onComplete={() => setShowConfetti(false)} />
    </section>
  );
}
