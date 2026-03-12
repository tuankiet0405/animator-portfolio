/**
 * Hero SVG Shapes — 7 geometric shapes with morph states
 * Each shape exports: default path + 2-3 morph state paths
 * All paths use the same anchor count for smooth GSAP morphing
 */

// ===== CIRCLE =====
export const CircleShape = {
  id: 'hero-circle',
  color: 'var(--accent-blue)',
  viewBox: '0 0 120 120',
  states: {
    default:
      'M60,10 C87.6,10 110,32.4 110,60 C110,87.6 87.6,110 60,110 C32.4,110 10,87.6 10,60 C10,32.4 32.4,10 60,10Z',
    morph1:
      'M60,5 C90,15 115,35 110,65 C105,95 80,115 50,110 C20,105 0,80 5,50 C10,20 30,-5 60,5Z',
    morph2:
      'M60,15 C80,5 105,25 110,55 C115,85 95,110 65,112 C35,114 10,95 8,65 C6,35 40,25 60,15Z',
  },
};

// ===== SQUARE (rounded brutalist) =====
export const SquareShape = {
  id: 'hero-square',
  color: 'var(--accent-yellow)',
  viewBox: '0 0 120 120',
  states: {
    default:
      'M20,20 L100,20 L100,100 L20,100 Z',
    morph1:
      'M30,15 L110,25 L95,105 L15,95 Z',
    morph2:
      'M25,30 L105,15 L100,95 L10,110 Z',
  },
};

// ===== TRIANGLE =====
export const TriangleShape = {
  id: 'hero-triangle',
  color: 'var(--accent-orange)',
  viewBox: '0 0 120 120',
  states: {
    default:
      'M60,10 L110,100 L10,100 Z',
    morph1:
      'M50,5 L115,90 L5,110 Z',
    morph2:
      'M70,8 L108,105 L12,95 Z',
  },
};

// ===== STAR (5-point) =====
export const StarShape = {
  id: 'hero-star',
  color: 'var(--accent-pink)',
  viewBox: '0 0 120 120',
  states: {
    default:
      'M60,5 L72,42 L110,42 L80,65 L90,105 L60,80 L30,105 L40,65 L10,42 L48,42 Z',
    morph1:
      'M60,10 L75,38 L112,40 L85,62 L95,100 L60,78 L25,100 L35,62 L8,40 L45,38 Z',
    morph2:
      'M60,2 L68,45 L108,44 L78,68 L88,108 L60,82 L32,108 L42,68 L12,44 L52,45 Z',
  },
};

// ===== BLOB (organic) =====
export const BlobShape = {
  id: 'hero-blob',
  color: 'var(--accent-green)',
  viewBox: '0 0 120 120',
  states: {
    default:
      'M60,15 C85,10 110,30 108,55 C106,80 90,108 60,110 C30,112 10,85 12,58 C14,31 35,20 60,15Z',
    morph1:
      'M55,10 C80,5 115,25 112,60 C109,95 85,115 55,112 C25,109 5,88 8,55 C11,22 30,15 55,10Z',
    morph2:
      'M65,12 C92,18 108,40 105,68 C102,96 78,112 52,108 C26,104 8,78 15,50 C22,22 38,6 65,12Z',
  },
};

// ===== DIAMOND =====
export const DiamondShape = {
  id: 'hero-diamond',
  color: 'var(--accent-blue)',
  viewBox: '0 0 120 120',
  states: {
    default:
      'M60,10 L110,60 L60,110 L10,60 Z',
    morph1:
      'M60,5 L115,55 L65,112 L8,62 Z',
    morph2:
      'M55,8 L112,58 L60,115 L12,55 Z',
  },
};

// ===== HEXAGON =====
export const HexagonShape = {
  id: 'hero-hexagon',
  color: 'var(--accent-orange)',
  viewBox: '0 0 120 120',
  states: {
    default:
      'M60,10 L104,35 L104,85 L60,110 L16,85 L16,35 Z',
    morph1:
      'M58,5 L108,32 L110,82 L62,112 L12,88 L10,38 Z',
    morph2:
      'M62,8 L106,38 L108,88 L58,115 L14,82 L12,32 Z',
  },
};

// Export all shapes as array for easy iteration
export const heroShapes = [
  CircleShape,
  SquareShape,
  TriangleShape,
  StarShape,
  BlobShape,
  DiamondShape,
  HexagonShape,
];
