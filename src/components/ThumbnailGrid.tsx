import React from 'react';
import { usePortfolio } from '../contexts/PortfolioContext';
import ThumbnailCard from './ThumbnailCard';

const ThumbnailGrid: React.FC = () => {
  const { data } = usePortfolio();

  return (
    <section id="portfolio" className="relative z-10 py-16 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Section header */}
      <div className="mb-10 text-center">
        <div className="inline-block">
          <h2 className="section-title text-xl md:text-2xl">
            PROJECTS
          </h2>
          <div className="mt-2 text-xs tracking-[6px] text-center" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            [ {data.thumbnails.length} MODULES LOADED ]
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.thumbnails.map((thumb, i) => (
          <div
            key={thumb.id}
            className="animate-fade-in-up"
            style={{ animationDelay: `${i * 0.08}s`, animationFillMode: 'both' }}
          >
            <ThumbnailCard thumbnail={thumb} index={i} />
          </div>
        ))}
      </div>

      {data.thumbnails.length === 0 && (
        <div className="text-center py-20">
          <p className="font-mono text-sm tracking-widest" style={{ color: 'var(--text-muted)' }}>
            [ NO MODULES FOUND — AWAITING INPUT ]
          </p>
        </div>
      )}
    </section>
  );
};

export default ThumbnailGrid;
