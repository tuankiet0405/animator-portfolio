import { useRef, useEffect, useCallback } from 'react';

/**
 * ParticleCanvas — Canvas 2D particle trail that follows mouse cursor
 * Renders on top of Hero section as overlay
 */
export default function ParticleCanvas() {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const rafId = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const colors = [
    '#0066FF', // accent-blue
    '#E8FF00', // accent-yellow
    '#FF6B35', // accent-orange
    '#FF1493', // accent-pink
    '#32CD32', // accent-green
  ];

  const createParticle = useCallback((x, y) => {
    const color = colors[Math.floor(Math.random() * colors.length)];
    return {
      x,
      y,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      radius: Math.random() * 4 + 2,
      alpha: 1,
      color,
    };
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw particles
    particles.current = particles.current.filter((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= 0.015;
      p.radius *= 0.98;

      if (p.alpha <= 0) return false;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
      ctx.globalAlpha = 1;

      return true;
    });

    rafId.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const parent = canvas.parentElement;
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Start animation loop
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [animate]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Only create particles when mouse is inside canvas
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        // Create 2-3 particles per frame
        for (let i = 0; i < 2; i++) {
          particles.current.push(createParticle(x, y));
        }

        // Cap particles at 100
        if (particles.current.length > 100) {
          particles.current = particles.current.slice(-100);
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [createParticle]);

  return (
    <canvas
      ref={canvasRef}
      className="particle-canvas"
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 2,
      }}
    />
  );
}
