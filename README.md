# 🎨 Interactive Geometric Playground

> A portfolio website that **is** the demo — showcasing vector motion animation through its own interactive, animated interface.

Built with **React 18 + Vite + GSAP + Lottie**, styled in **Neo-Brutalism × Pop-Art**.

![Hero Light Mode](docs/hero-light.png)

---

## ✨ Features

| Feature | Description |
|---|---|
| **Mouse-Reactive Hero** | 7 geometric shapes follow cursor with multi-depth parallax |
| **Canvas Particle Trail** | Colorful particles spawn at cursor, fade with velocity |
| **Scroll Line** | Full-page SVG line draws progressively with scroll |
| **Comparison Slider** | Draggable before/after: static vs animated UI cards |
| **3D Tilt Cards** | Service cards tilt in 3D on hover via `transformPerspective` |
| **Project Showcase** | 4 case studies in Browser/iPhone mockups with Lottie |
| **Fullscreen Modal** | GSAP scale+fade entrance, ESC close, focus trap |
| **Interactive Icons** | 6 SVG icons with unique GSAP hover animations |
| **File Size Chart** | Animated bars comparing GIF vs MP4 vs Lottie |
| **Contact Form** | Inline validation, shake on error, checkmarks on valid |
| **Confetti** | Canvas particle burst on form submit success |
| **Dark/Light Mode** | System preference detection + localStorage persist |
| **Reduced Motion** | Respects `prefers-reduced-motion` in CSS and JS |

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Build | [Vite](https://vitejs.dev/) 6.x |
| UI | [React](https://react.dev/) 18.x |
| Animation | [GSAP](https://greensock.com/gsap/) 3.12 + ScrollTrigger |
| Lottie | [lottie-react](https://github.com/Gamote/lottie-react) 2.x |
| Styling | Vanilla CSS (custom properties + Neo-Brutalism tokens) |
| Fonts | Google Fonts (Space Grotesk + Inter) |

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Installation

```bash
git clone https://github.com/your-username/animator-portfolio.git
cd animator-portfolio
npm install
```

### Development

```bash
npm run dev
# → http://localhost:5173
```

### Production Build

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
src/
├── context/
│   └── ThemeContext.jsx         # Dark/light mode provider
├── hooks/
│   ├── useMousePosition.js     # RAF-throttled cursor tracking
│   ├── useScrollProgress.js    # Global + element scroll 0→1
│   └── useInView.js            # IntersectionObserver wrapper
├── components/
│   ├── layout/
│   │   ├── Header.jsx          # Fixed nav, scroll hide/show, hamburger
│   │   └── Footer.jsx          # Social links
│   ├── sections/
│   │   ├── HeroSection.jsx     # Mouse parallax + particle canvas
│   │   ├── WhyMotionSection.jsx # Comparison slider + stat counters
│   │   ├── ServicesSection.jsx  # 3D tilt cards + animated icons
│   │   ├── ShowcaseSection.jsx  # Project grid + device mockups
│   │   ├── ComponentLibrary.jsx # 6 interactive SVG icons
│   │   ├── DevFriendlySection.jsx # File size chart + promises
│   │   └── ContactSection.jsx  # Form + validation + confetti
│   └── ui/
│       ├── ThemeToggle.jsx     # Sun/moon toggle
│       ├── ScrollLine.jsx      # SVG draw-on-scroll
│       ├── ParticleCanvas.jsx  # Canvas 2D particles
│       ├── StatCounter.jsx     # Animated number counter
│       ├── DeviceMockup.jsx    # Browser/iPhone wrapper
│       ├── LottiePlayer.jsx    # Lazy Lottie with InView
│       ├── ShowcaseModal.jsx   # Fullscreen project detail
│       └── ConfettiEffect.jsx  # Submit success confetti
├── assets/svg/                 # SVG shapes, icons, mockups
├── data/                       # Project & service content
└── styles/
    ├── reset.css               # Modern CSS reset
    ├── tokens.css              # Design tokens + dark mode
    ├── typography.css          # Fluid type scale
    └── animations.css          # Shared keyframes
```

---

## 🎯 Performance

| Metric | Value |
|---|---|
| Total bundle | ~304 KB |
| Gzipped | ~106 KB |
| Build time | < 1s |
| GSAP chunk | 70 KB |
| Lottie chunk | 7 KB |

---

## ♿ Accessibility

- `prefers-reduced-motion` support (CSS + JS)
- Semantic HTML with proper heading hierarchy
- `aria-label` on all interactive elements
- Focus-visible outlines
- `aria-modal` + ESC close on modals
- Body scroll lock when modal/menu open

---

## 🌗 Theming

The site supports dark and light modes via CSS custom properties:

```css
:root {
  --bg-primary: #F5F0EB;       /* Light */
  --accent-blue: #0066FF;
  --shadow-hard: 4px 4px 0px;  /* Neo-Brutalism */
}

[data-theme="dark"] {
  --bg-primary: #1A1A2E;       /* Dark */
}
```

Toggle persists in `localStorage` and respects system preference on first visit.

---

## 📄 License

MIT © KIET
# animator-portfolio
