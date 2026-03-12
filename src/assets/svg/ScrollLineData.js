/**
 * Scroll Decorative Line — SVG path data
 * A winding path that runs through the entire page
 * Draw-in synced with scroll position via stroke-dasharray
 *
 * Node positions mark section intersections where shapes bounce
 */

export const scrollLinePath =
  'M 60 0 ' +
  'C 60 80, 120 120, 80 200 ' +    // Hero → Why Motion
  'S 20 280, 60 360 ' +             // Why Motion → Services
  'C 100 440, 30 480, 70 560 ' +    // Services → Showcase
  'S 110 640, 60 720 ' +            // Showcase → Component Library
  'C 20 800, 100 840, 60 920 ' +    // Component Library → Dev-Friendly
  'S 30 1000, 60 1080 ' +           // Dev-Friendly → Contact
  'C 90 1160, 40 1200, 60 1280';    // Contact end

// Node positions (percentage along the path) where shapes appear
export const scrollLineNodes = [
  { position: 0.0, shape: 'circle', color: 'var(--accent-blue)' },
  { position: 0.16, shape: 'diamond', color: 'var(--accent-yellow)' },
  { position: 0.33, shape: 'triangle', color: 'var(--accent-orange)' },
  { position: 0.50, shape: 'circle', color: 'var(--accent-pink)' },
  { position: 0.66, shape: 'star', color: 'var(--accent-green)' },
  { position: 0.83, shape: 'diamond', color: 'var(--accent-blue)' },
  { position: 1.0, shape: 'circle', color: 'var(--accent-orange)' },
];

// SVG viewBox for the scroll line container
export const scrollLineViewBox = '0 0 120 1280';
