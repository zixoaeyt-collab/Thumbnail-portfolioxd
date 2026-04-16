import React from 'react';

const HologramBackground: React.FC = () => {
  return (
    <div className="hologram-bg" aria-hidden="true">
      {/* Cyberpunk hologram grid overlay */}
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 'var(--hologram-opacity)', animation: 'hologramFlicker 4s ease-in-out infinite' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="cyberGrid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="var(--neon-primary)" strokeWidth="0.5" opacity="0.3" />
          </pattern>
          <pattern id="dots" width="30" height="30" patternUnits="userSpaceOnUse">
            <circle cx="15" cy="15" r="0.5" fill="var(--neon-primary)" opacity="0.4" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cyberGrid)" />
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>

      {/* Holographic circle elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 rounded-full border border-current opacity-10"
        style={{ borderColor: 'var(--neon-primary)', animation: 'float 6s ease-in-out infinite' }}>
        <div className="absolute inset-4 rounded-full border border-current opacity-20"
          style={{ borderColor: 'var(--neon-primary)' }}>
          <div className="absolute inset-4 rounded-full border border-current opacity-15"
            style={{ borderColor: 'var(--neon-primary)', animation: 'hologramFlicker 3s ease-in-out infinite' }}>
          </div>
        </div>
      </div>

      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 md:w-72 md:h-72 rounded-full border border-current opacity-10"
        style={{ borderColor: 'var(--neon-secondary)', animation: 'float 8s ease-in-out infinite reverse' }}>
        <div className="absolute inset-3 rounded-full border border-current opacity-15"
          style={{ borderColor: 'var(--neon-secondary)' }}>
        </div>
      </div>

      {/* Diagonal cyber lines */}
      <div className="absolute top-0 right-1/4 w-px h-full opacity-10" style={{ background: 'var(--neon-primary)', animation: 'hologramFlicker 5s ease-in-out infinite' }}></div>
      <div className="absolute top-0 left-1/3 w-px h-full opacity-5" style={{ background: 'var(--neon-primary)' }}></div>
      <div className="absolute top-1/2 left-0 w-full h-px opacity-5" style={{ background: 'var(--neon-secondary)' }}></div>
    </div>
  );
};

export default HologramBackground;
