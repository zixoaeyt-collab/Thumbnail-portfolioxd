import React, { useState, useEffect, useRef } from 'react';

interface BootLine {
  text: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'access';
  delay: number;
}

const bootLines: BootLine[] = [
  { text: 'CYBERBIOS v4.2.07 — INITIALIZING...', type: 'info', delay: 200 },
  { text: '[OK] Memory subsystem ........ 2048TB OPTIMIZED', type: 'success', delay: 400 },
  { text: '[OK] Neural processor ........ ONLINE', type: 'success', delay: 350 },
  { text: '[OK] Crypto handshake ........ VERIFIED', type: 'success', delay: 300 },
  { text: '[WARN] Firewall breach detected — COUNTERING...', type: 'warning', delay: 500 },
  { text: '[OK] ICE barrier ............. ACTIVE', type: 'success', delay: 400 },
  { text: '[OK] Matrix routing .......... ESTABLISHED', type: 'success', delay: 350 },
  { text: 'Loading portfolio modules .................', type: 'info', delay: 600 },
  { text: '  > Thumbnail engine ......... READY', type: 'info', delay: 200 },
  { text: '  > Skill matrix ............. ONLINE', type: 'info', delay: 200 },
  { text: '  > Comm relay ............... ACTIVE', type: 'info', delay: 200 },
  { text: '  > Identity verified', type: 'success', delay: 500 },
  { text: '', type: 'info', delay: 200 },
  { text: 'SYSTEM READY.', type: 'success', delay: 300 },
];

interface BootSequenceProps {
  onComplete: () => void;
}

const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [lines, setLines] = useState<BootLine[]>([]);
  const [showAccess, setShowAccess] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [fadeToMain, setFadeToMain] = useState(false);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    let totalDelay = 0;

    bootLines.forEach((line, i) => {
      totalDelay += line.delay;
      const t = setTimeout(() => {
        setLines(prev => [...prev, line]);
        if (i === bootLines.length - 1) {
          setLoadingComplete(true);
          const t2 = setTimeout(() => {
            setShowAccess(true);
          }, 500);
          timeoutsRef.current.push(t2);
        }
      }, totalDelay);
      timeoutsRef.current.push(t);
    });

    return () => {
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    if (showAccess) {
      const t = setTimeout(() => setFadeToMain(true), 2000);
      const t2 = setTimeout(onComplete, 2800);
      timeoutsRef.current.push(t, t2);
    }
  }, [showAccess, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-all duration-1000 ${fadeToMain ? 'opacity-0 scale-105' : 'opacity-100'}`}
      style={{ background: 'var(--bg-darker)' }}
    >
      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.15) 1px, rgba(0,0,0,0.15) 2px)',
        zIndex: 51,
      }}></div>

      <div className="relative z-40 w-full max-w-2xl px-6 md:px-0">
        {/* Header */}
        <div className="mb-6 border-b pb-3" style={{ borderColor: 'var(--neon-primary)', borderBottomWidth: '1px' }}>
          <h1 className="font-mono text-sm tracking-widest" style={{ color: 'var(--neon-primary)', textShadow: 'var(--neon-glow-sm)' }}>
            ▸ CYBERBIOS v4.2.07 // SYSTEM BOOT SEQUENCE
          </h1>
        </div>

        {/* Boot logs */}
        <div className="space-y-1 min-h-[300px] font-mono text-xs md:text-sm">
          {lines.map((line, i) => (
            <div
              key={i}
              className="animate-fade-in"
              style={{
                color: line.type === 'success' ? '#00ff88' :
                       line.type === 'warning' ? '#ffaa00' :
                       line.type === 'error' ? '#ff3333' :
                       line.type === 'access' ? '#00ff88' :
                       'var(--text-secondary)',
                textShadow: line.type === 'success' ? '0 0 5px #00ff88' : undefined,
                fontFamily: 'var(--font-mono)',
              }}
            >
              {line.text}
            </div>
          ))}

          {/* Loading bar */}
          {lines.length >= 8 && !loadingComplete && (
            <div className="mt-3">
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)' }}>
                <div className="h-full loading-bar" style={{ background: 'linear-gradient(90deg, var(--neon-primary), var(--neon-secondary))', boxShadow: '0 0 10px var(--neon-primary)' }}></div>
              </div>
            </div>
          )}
        </div>

        {/* ACCESS GRANTED */}
        {showAccess && (
          <div className="mt-8 text-center">
            <div className="access-granted" style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.5rem, 5vw, 3rem)',
              fontWeight: 900,
              letterSpacing: '8px',
              animation: 'accessGranted 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
              color: '#00ff88',
              textShadow: '0 0 10px #00ff88, 0 0 20px #00ff88, 0 0 40px #00ff88, 0 0 80px #00ff88',
            }}>
              ACCESS GRANTED
            </div>
            <div className="mt-3 text-xs tracking-widest" style={{ color: '#00ff88', opacity: 0.6, fontFamily: 'var(--font-mono)' }}>
              PORTFOLIO INTERFACE LOADED
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BootSequence;
