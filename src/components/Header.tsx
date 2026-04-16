import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../contexts/PortfolioContext';

const Header: React.FC = () => {
  const { data } = usePortfolio();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${scrolled ? 'py-2' : 'py-4'}`}
      style={{
        background: scrolled ? 'rgba(5,5,8,0.95)' : 'rgba(5,5,8,0.7)',
        backdropFilter: scrolled ? 'blur(20px)' : 'blur(10px)',
        borderBottom: scrolled ? '1px solid var(--glass-border)' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 relative shrink-0">
            {data.logoUrl ? (
              <img src={data.logoUrl} alt="Logo" className="w-full h-full object-contain rounded"
                style={{ filter: 'drop-shadow(0 0 4px var(--neon-primary))' }}
                onError={e => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  const fallback = (e.target as HTMLImageElement).parentElement?.querySelector('.logo-fallback');
                  if (fallback) (fallback as HTMLElement).style.display = 'flex';
                }}
              />
            ) : null}
            <div className={`logo-fallback absolute inset-0 rounded border flex items-center justify-center ${data.logoUrl ? 'hidden' : ''}`}
              style={{ borderColor: 'var(--neon-primary)', boxShadow: 'var(--neon-glow-sm)' }}>
              <div className="absolute inset-1 rounded bg-current opacity-20" style={{ color: 'var(--neon-primary)' }}></div>
              <span className="font-heading text-xs font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--neon-primary)' }}>{data.name.charAt(0).toUpperCase()}</span>
            </div>
          </div>
          <div>
            <h1 className="font-heading text-sm md:text-base font-bold tracking-wider neon-text" style={{ fontFamily: 'var(--font-heading)' }}>
              {data.name}
            </h1>
            <p className="text-[10px] tracking-[3px] hidden sm:block" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              {data.tagline}
            </p>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {['portfolio', 'skills', 'contact'].map(section => (
            <button
              key={section}
              onClick={() => scrollTo(section)}
              className="font-heading text-xs tracking-[3px] transition-colors duration-300 hover:text-[color:var(--neon-primary)]"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-secondary)' }}
            >
              {section}
            </button>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{ color: 'var(--text-secondary)' }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t mt-2 pt-2 px-4" style={{ borderColor: 'var(--glass-border)' }}>
          {['portfolio', 'skills', 'contact'].map(section => (
            <button
              key={section}
              onClick={() => scrollTo(section)}
              className="block w-full text-left font-heading text-xs tracking-[3px] py-3 transition-colors duration-300 hover:text-[color:var(--neon-primary)]"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-secondary)' }}
            >
              {section}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
