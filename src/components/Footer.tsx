import React from 'react';
import { usePortfolio } from '../contexts/PortfolioContext';

const Footer: React.FC = () => {
  const { data } = usePortfolio();
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t py-8 px-4" style={{ borderColor: 'var(--glass-border)' }}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 relative shrink-0">
            {data.logoUrl ? (
              <img src={data.logoUrl} alt="Logo" className="w-full h-full object-contain rounded opacity-70"
                onError={e => { (e.target as HTMLImageElement).style.display = 'none'; const fb = (e.target as HTMLImageElement).parentElement?.querySelector('.footer-fb'); if (fb) (fb as HTMLElement).style.display = 'flex'; }}
              />
            ) : null}
            <div className={`footer-fb absolute inset-0 rounded border flex items-center justify-center ${data.logoUrl ? 'hidden' : ''}`} style={{ borderColor: 'var(--neon-primary)', opacity: 0.5 }}>
              <span className="font-heading text-[8px] font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--neon-primary)' }}>{data.name.charAt(0).toUpperCase()}</span>
            </div>
          </div>
          <span className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
            © {year} {data.name}
          </span>
        </div>
        <p className="font-mono text-[10px] tracking-widest" style={{ color: 'var(--text-muted)' }}>
          ALL SYSTEMS OPERATIONAL // v4.2.07
        </p>
      </div>
    </footer>
  );
};

export default Footer;
