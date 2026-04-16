import React, { useState, useRef, useEffect } from 'react';
import { Thumbnail } from '../types';

interface ThumbnailCardProps {
  thumbnail: Thumbnail;
  index: number;
}

const ThumbnailCard: React.FC<ThumbnailCardProps> = ({ thumbnail, index }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [revealComplete, setRevealComplete] = useState(false);
  const scanRef = useRef<number | null>(null);

  useEffect(() => {
    if (hovered && !revealComplete) {
      setScanProgress(0);
      const startTime = performance.now();
      const duration = 350;

      const animate = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        setScanProgress(progress);
        if (progress < 1) {
          scanRef.current = requestAnimationFrame(animate);
        } else {
          setRevealComplete(true);
        }
      };
      scanRef.current = requestAnimationFrame(animate);

      return () => {
        if (scanRef.current) cancelAnimationFrame(scanRef.current);
      };
    }
  }, [hovered, revealComplete]);

  useEffect(() => {
    if (!hovered) {
      setScanProgress(0);
      setRevealComplete(false);
    }
  }, [hovered]);

  const formatViews = (count: number): string => {
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  const scanPercent = scanProgress * 100;
  const showRevealed = revealComplete || scanProgress > 0.3;

  return (
    <div
      className="thumb-card rounded-lg cursor-pointer group"
      style={{
        animationDelay: `${index * 0.1}s`,
        animationFillMode: 'both',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Corner decorations */}
      <div className="cyber-corner rounded-lg">
        {/* Image container */}
        <div className="relative overflow-hidden rounded-t-lg aspect-video">
          {/* Hologram placeholder — always visible as base layer */}
          <div
            className="absolute inset-0 hologram-placeholder"
            style={{
              opacity: hovered ? (revealComplete ? 0.08 : 0.5) : 1,
              transition: 'opacity 0.15s ease-out',
            }}
          >
            {/* Grid background */}
            <div className="absolute inset-0 hologram-grid" />
            {/* Scanlines */}
            <div className="absolute inset-0 hologram-scanlines" />
            {/* Noise overlay */}
            <div className="absolute inset-0 hologram-noise" />

            {/* Center hologram icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                {/* Glitching frame */}
                <svg width="64" height="64" viewBox="0 0 64 64" className="hologram-icon" style={{ animation: hovered ? 'hologramGlitch 0.3s ease-in-out infinite' : 'hologramFloat 3s ease-in-out infinite' }}>
                  <rect x="4" y="8" width="56" height="48" rx="2" fill="none" stroke="var(--neon-primary)" strokeWidth="1" strokeDasharray="4 2" opacity="0.7" />
                  <polygon points="24,22 24,42 44,32" fill="none" stroke="var(--neon-primary)" strokeWidth="1" opacity="0.5" />
                  {/* Corner markers */}
                  <line x1="4" y1="14" x2="4" y2="4" stroke="var(--neon-primary)" strokeWidth="1.5" opacity="0.9" />
                  <line x1="4" y1="4" x2="14" y2="4" stroke="var(--neon-primary)" strokeWidth="1.5" opacity="0.9" />
                  <line x1="60" y1="14" x2="60" y2="4" stroke="var(--neon-primary)" strokeWidth="1.5" opacity="0.9" />
                  <line x1="60" y1="4" x2="50" y2="4" stroke="var(--neon-primary)" strokeWidth="1.5" opacity="0.9" />
                  <line x1="4" y1="50" x2="4" y2="56" stroke="var(--neon-primary)" strokeWidth="1.5" opacity="0.9" />
                  <line x1="4" y1="56" x2="14" y2="56" stroke="var(--neon-primary)" strokeWidth="1.5" opacity="0.9" />
                  <line x1="60" y1="50" x2="60" y2="56" stroke="var(--neon-primary)" strokeWidth="1.5" opacity="0.9" />
                  <line x1="60" y1="56" x2="50" y2="56" stroke="var(--neon-primary)" strokeWidth="1.5" opacity="0.9" />
                </svg>
                {/* Scanning light on the icon */}
                <div
                  className="absolute left-0 right-0 h-px"
                  style={{
                    top: `${scanPercent}%`,
                    background: 'var(--neon-primary)',
                    boxShadow: '0 0 8px var(--neon-primary), 0 0 16px var(--neon-primary)',
                    opacity: hovered ? 1 : 0,
                  }}
                />
              </div>
            </div>

            {/* Title holographic text */}
            <div className="absolute bottom-3 left-3 right-3 text-center">
              <p
                className="font-mono text-xs tracking-[3px] hologram-text truncate"
                style={{
                  color: 'var(--neon-primary)',
                  textShadow: '0 0 8px var(--neon-primary)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {thumbnail.title.toUpperCase()}
              </p>
            </div>

            {/* Hover prompt */}
            <div
              className="absolute top-3 left-3 px-2 py-0.5 rounded text-[9px] tracking-[2px] font-mono uppercase"
              style={{
                color: 'var(--neon-primary)',
                border: '1px solid var(--neon-primary)',
                opacity: hovered ? 0 : 0.7,
                transition: 'opacity 0.3s',
                boxShadow: '0 0 4px var(--neon-primary)',
              }}
            >
              &#9670; HOVER TO DECRYPT
            </div>
          </div>

          {/* Loading spinner */}
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(10,10,15,0.9)', zIndex: 3 }}>
              <div className="w-8 h-8 border-2 border-current rounded-full animate-spin"
                style={{ borderColor: 'var(--neon-primary)', borderTopColor: 'transparent' }}>
              </div>
            </div>
          )}

          {/* Real image — hidden behind hologram, revealed by scan */}
          <img
            src={thumbnail.imageUrl}
            alt={thumbnail.title}
            className={`w-full h-full object-cover transition-all duration-200 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setIsLoaded(true)}
            style={{
              clipPath: showRevealed ? `inset(0 0 ${100 - scanPercent}% 0)` : 'inset(0 0 100% 0)',
              filter: hovered ? 'brightness(1.05) contrast(1.05)' : 'brightness(1)',
            }}
          />

          {/* Scan line — horizontal light bar sweeping down */}
          {hovered && (
            <div
              className="absolute left-0 right-0 z-10"
              style={{
                top: `${scanPercent}%`,
                height: '2px',
                background: 'linear-gradient(90deg, transparent, var(--neon-primary), #fff, var(--neon-primary), transparent)',
                boxShadow: `
                  0 0 10px var(--neon-primary),
                  0 0 20px var(--neon-primary),
                  0 0 40px var(--neon-primary),
                  0 2px 30px rgba(255,255,255,0.3)
                `,
              }}
            />
          )}

          {/* Scan light trail — the area just below the scan line */}
          {hovered && scanProgress > 0 && (
            <div
              className="absolute left-0 right-0 z-[5] pointer-events-none"
              style={{
                top: `${scanPercent}%`,
                height: '12px',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.06), transparent)',
              }}
            />
          )}

          {/* Quick flash at scan completion */}
          {revealComplete && (
            <div
              className="absolute inset-0 z-[7] pointer-events-none"
              style={{
                background: 'var(--neon-primary)',
                opacity: 0.12,
                animation: 'scanFlash 0.25s ease-out forwards',
              }}
            />
          )}

          {/* Glitch bars during scan */}
          {hovered && !revealComplete && (
            <>
              <div className="absolute z-[6] pointer-events-none"
                style={{
                  top: `${scanPercent - 2}%`,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: 'var(--neon-primary)',
                  opacity: 0.15,
                  transform: `translateX(${(Math.random() - 0.5) * 4}px)`,
                }}
              />
              <div className="absolute z-[6] pointer-events-none"
                style={{
                  top: `${scanPercent - 8}%`,
                  left: '10%',
                  width: `${30 + Math.random() * 40}%`,
                  height: '1px',
                  background: '#fff',
                  opacity: 0.1,
                }}
              />
            </>
          )}

          {/* Gradient overlay on hover (after reveal) */}
          <div
            className={`absolute inset-0 pointer-events-none z-10`}
            style={{
              background: 'linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.85) 100%)',
              opacity: showRevealed ? 1 : 0,
            }}
          >
            {showRevealed && (
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-xs font-mono truncate" style={{ color: 'var(--text-secondary)' }}>
                  {thumbnail.description || thumbnail.title}
                </p>
              </div>
            )}
          </div>

          {/* View count badge */}
          <div
            className={`absolute top-3 right-3 z-20 flex items-center gap-1 px-2 py-1 rounded text-xs font-mono transition-all duration-300`}
            style={{
              background: 'rgba(0,0,0,0.7)',
              backdropFilter: 'blur(10px)',
              border: `1px solid ${hovered ? 'var(--neon-primary)' : 'var(--glass-border)'}`,
              boxShadow: hovered ? '0 0 8px var(--neon-primary)' : 'none',
            }}
          >
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--neon-primary)' }}>
              <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
            </svg>
            <span style={{ color: 'var(--neon-primary)' }}>{formatViews(thumbnail.viewCount)}</span>
          </div>

          {/* DECRYPTED badge after scan completes */}
          {revealComplete && (
            <div className="absolute top-3 left-3 z-20 px-2 py-0.5 rounded text-[9px] tracking-[2px] font-mono uppercase animate-fade-in"
              style={{
                color: '#00ff88',
                border: '1px solid #00ff88',
                background: 'rgba(0, 255, 136, 0.1)',
                boxShadow: '0 0 6px rgba(0, 255, 136, 0.3)',
              }}
            >
              &#9670; DECRYPTED
            </div>
          )}
        </div>

        {/* Card content */}
        <div className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-sm font-bold tracking-wider truncate pr-2 transition-colors duration-300 group-hover:text-[color:var(--neon-primary)]"
              style={{ fontFamily: 'var(--font-heading)' }}>
              {thumbnail.title}
            </h3>
            <div className="flex items-center gap-1 text-xs font-mono shrink-0" style={{ color: 'var(--text-muted)' }}>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              VIEW
            </div>
          </div>

          {/* Bottom neon line */}
          <div className="mt-3 h-px w-full relative overflow-hidden">
            <div className="absolute inset-0" style={{ background: 'var(--glass-border)' }}></div>
            <div className={`h-full transition-all duration-200 ${hovered ? 'w-full' : 'w-0'}`}
              style={{ background: 'linear-gradient(90deg, var(--neon-primary), transparent)', boxShadow: '0 0 8px var(--neon-primary)' }}>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThumbnailCard;
