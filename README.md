# 🌐 Cyberpunk Portfolio

A fully interactive, cyberpunk-themed thumbnail portfolio website inspired by **Cyberpunk 2077** — built with React, TypeScript, Vite, and Tailwind CSS.

## ✨ Features

- **BIOS Boot Sequence** — Terminal-style animated boot screen with typing effects and loading bars
- **Holographic Thumbnails** — Hover to "decrypt" thumbnails with a holographic scan-line reveal effect
- **Animated Skills Panel** — Cyberpunk-styled progress bars with scroll-triggered animations
- **Contact & Socials** — Neon-glow social icons with hover effects
- **Hidden Admin Panel** — Press `Ctrl + Shift + A` and enter password to manage everything live
- **Theme Switching** — Red (default), Neon Purple, and Neon Blue — toggleable from admin panel
- **Hologram Background** — Fixed animated scanline + grid holographic background
- **Fully Responsive** — Works on mobile, tablet, and desktop

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## 🔒 Hidden Admin Panel

- **Key combo:** `Ctrl` + `Shift` + `A`
- **Default password:** `207777`
- Manage thumbnails, skills, contact info, socials, logo, and themes live.

## 🛠 Tech Stack

- **React 18** + **TypeScript**
- **Vite** — Build tool
- **Tailwind CSS** — Styling
- **Google Fonts** — Orbitron, Share Tech Mono, Rajdhani

## 📂 Project Structure

```
src/
├── components/       # UI components
│   ├── AdminPanel.tsx
│   ├── BootSequence.tsx
│   ├── ContactSection.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── HeroSection.tsx
│   ├── HologramBackground.tsx
│   ├── SkillsPanel.tsx
│   ├── ThumbnailCard.tsx
│   └── ThumbnailGrid.tsx
├── contexts/         # React context providers
│   ├── PortfolioContext.tsx
│   └── ThemeContext.tsx
├── hooks/            # Custom hooks
│   └── useTypewriter.ts
├── types/            # TypeScript types
│   └── index.ts
├── utils/            # Utility functions
│   └── cn.ts
├── App.tsx
├── index.css
└── main.tsx
```

## 🎨 Themes

| Theme | Color |
|-------|-------|
| Crimson Override | 🔴 Neon Red `#ff003c` |
| Neural Violet | 🟣 Neon Purple `#b026ff` |
| Arctic Netrun | 🔵 Neon Blue `#00f0ff` |

## 📝 License

MIT
