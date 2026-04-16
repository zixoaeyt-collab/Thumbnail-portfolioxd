import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../contexts/PortfolioContext';

const HeroSection: React.FC = () => {
  const { data } = usePortfolio();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 200);
    return () => clearTimeout(t);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="text-center max-w-4xl mx-auto pb-16">
        {/* Logo / Decorative element */}
        <div className={`mb-8 transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block relative">
            {data.logoUrl ? (
              <div className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-6 relative animate-float">
                <img src={data.logoUrl} alt="Logo" className="w-full h-full object-contain"
                  style={{ filter: 'drop-shadow(0 0 12px var(--neon-primary))' }}
                  onError={e => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    const el = (e.target as HTMLImageElement).parentElement?.querySelector('.hex-fallback');
                    if (el) (el as HTMLElement).style.display = 'flex';
                  }}
                />
              </div>
            ) : (
              /* Hexagonal accent */
              <div className="w-20 h-20 md:w-28 md:h-28 mx-auto mb-6 relative">
                <svg viewBox="0 0 100 100" className="w-full h-full animate-float">
                  <polygon
                    points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
                    fill="none"
                    stroke="var(--neon-primary)"
                    strokeWidth="1.5"
                    style={{ filter: 'drop-shadow(0 0 6px var(--neon-primary))' }}
                  />
                  <polygon
                    points="50,15 85,32.5 85,67.5 50,85 15,67.5 15,32.5"
                    fill="none"
                    stroke="var(--neon-primary)"
                    strokeWidth="0.5"
                    opacity="0.5"
                  />
                  <text x="50" y="58" textAnchor="middle" fill="var(--neon-primary)" fontSize="32" fontWeight="bold" fontFamily="var(--font-heading)" style={{ filter: 'drop-shadow(0 0 4px var(--neon-primary))' }}>
                    {data.name.charAt(0).toUpperCase()}
                  </text>
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Main title */}
        <div className={`transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1
            className="font-heading text-4xl md:text-6xl lg:text-7xl font-black tracking-[4px] md:tracking-[8px] mb-4"
            style={{
              fontFamily: 'var(--font-heading)',
              color: 'var(--text-primary)',
              textShadow: 'var(--neon-glow-text)',
            }}
          >
            {data.name}
          </h1>

          <div className="h-px w-32 mx-auto my-4" style={{ background: 'linear-gradient(90deg, transparent, var(--neon-primary), transparent)', boxShadow: '0 0 10px var(--neon-primary)' }}></div>

          <p
            className="font-mono text-sm md:text-base tracking-[6px] md:tracking-[10px]"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--neon-primary)', textShadow: '0 0 5px var(--neon-primary)' }}
          >
            {data.tagline}
          </p>
        </div>

        {/* CTA buttons */}
        <div className={`mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 delay-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <button
            onClick={() => scrollTo('portfolio')}
            className="group relative px-8 py-3 font-heading text-xs tracking-[4px] uppercase transition-all duration-300 overflow-hidden"
            style={{
              fontFamily: 'var(--font-heading)',
              background: 'var(--neon-primary)',
              color: '#000',
              boxShadow: 'var(--neon-glow-sm)',
            }}
          >
            <span className="relative z-10">View Projects</span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="px-8 py-3 font-heading text-xs tracking-[4px] uppercase border transition-all duration-300 hover:shadow-lg"
            style={{
              fontFamily: 'var(--font-heading)',
              borderColor: 'var(--neon-primary)',
              color: 'var(--neon-primary)',
            }}
            onMouseEnter={e => {
              (e.target as HTMLElement).style.boxShadow = 'var(--neon-glow-sm)';
              (e.target as HTMLElement).style.background = 'var(--neon-primary)';
              (e.target as HTMLElement).style.color = '#000';
            }}
            onMouseLeave={e => {
              (e.target as HTMLElement).style.boxShadow = '';
              (e.target as HTMLElement).style.background = 'transparent';
              (e.target as HTMLElement).style.color = 'var(--neon-primary)';
            }}
          >
            Get in Touch
          </button>
        </div>
      </div>

      {/* Scroll indicator — absolutely positioned at bottom */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-20 transition-all duration-1000 delay-[1200ms] ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      >
        <div className="flex flex-col items-center gap-3 cursor-pointer" onClick={() => scrollTo('portfolio')}>
          <span
            className="text-[10px] tracking-[5px] uppercase select-none"
            style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
          >
            Scroll Down
          </span>
          <div className="relative w-6 h-10 rounded-full border-2 flex justify-center pt-2"
            style={{ borderColor: 'var(--neon-primary)', boxShadow: '0 0 6px var(--neon-primary)' }}
          >
            <div
              className="w-1 h-2 rounded-full"
              style={{
                background: 'var(--neon-primary)',
                boxShadow: '0 0 4px var(--neon-primary)',
                animation: 'scrollDot 1.8s ease-in-out infinite',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
