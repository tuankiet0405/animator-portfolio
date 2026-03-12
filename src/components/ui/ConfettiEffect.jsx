import { useRef, useEffect, useCallback } from 'react';

/**
 * ConfettiEffect — Canvas confetti burst on form submit success
 * Colors match the accent palette. Auto-cleanup after 3s.
 */
export default function ConfettiEffect({ trigger, onComplete }) {
  const canvasRef = useRef(null);
  const rafId = useRef(null);
  const particles = useRef([]);

  const colors = ['#0066FF', '#E8FF00', '#FF6B35', '#FF1493', '#32CD32', '#FF4444'];

  const createParticles = useCallback(() => {
    const arr = [];
    for (let i = 0; i < 80; i++) {
      arr.push({
        x: window.innerWidth / 2 + (Math.random() - 0.5) * 200,
        y: window.innerHeight / 2,
        vx: (Math.random() - 0.5) * 15,
        vy: Math.random() * -18 - 4,
        width: Math.random() * 10 + 4,
        height: Math.random() * 6 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 12,
        gravity: 0.3 + Math.random() * 0.2,
        alpha: 1,
        decay: 0.008 + Math.random() * 0.008,
      });
    }
    return arr;
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let alive = false;
    particles.current.forEach((p) => {
      if (p.alpha <= 0) return;
      alive = true;

      p.vy += p.gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotationSpeed;
      p.alpha -= p.decay;
      p.vx *= 0.99;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = Math.max(0, p.alpha);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.width / 2, -p.height / 2, p.width, p.height);
      ctx.restore();
    });

    if (alive) {
      rafId.current = requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      onComplete?.();
    }
  }, [onComplete]);

  useEffect(() => {
    if (!trigger) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    particles.current = createParticles();
    rafId.current = requestAnimationFrame(animate);

    // Auto-cleanup safety
    const timer = setTimeout(() => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      onComplete?.();
    }, 4000);

    return () => {
      clearTimeout(timer);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [trigger, createParticles, animate, onComplete]);

  if (!trigger) return null;

  return (
    <canvas
      ref={canvasRef}
      className="confetti-canvas"
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    />
  );
}
