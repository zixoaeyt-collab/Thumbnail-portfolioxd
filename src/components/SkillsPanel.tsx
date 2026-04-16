import React, { useState, useEffect, useRef } from 'react';
import { usePortfolio } from '../contexts/PortfolioContext';

const SkillsPanel: React.FC = () => {
  const { data } = usePortfolio();
  const [visibleSkills, setVisibleSkills] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            data.skills.forEach((_, i) => {
              setTimeout(() => {
                setVisibleSkills(prev => [...prev, i]);
              }, i * 120);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [data.skills, hasAnimated]);

  return (
    <section ref={sectionRef} id="skills" className="relative z-10 py-16 px-4 md:px-8 max-w-5xl mx-auto">
      <div className="mb-10">
        <h2 className="section-title text-xl md:text-2xl">SKILL MATRIX</h2>
        <div className="mt-2 text-xs tracking-[6px]" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
          [ COMPETENCY ANALYSIS ]
        </div>
      </div>

      <div className="space-y-5">
        {data.skills.map((skill, i) => (
          <div
            key={skill.id}
            className="animate-fade-in"
            style={{ animationDelay: `${i * 0.05}s`, animationFillMode: 'both' }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-heading text-xs md:text-sm tracking-wider" style={{ fontFamily: 'var(--font-heading)' }}>
                {skill.name}
              </span>
              <span className="font-mono text-sm" style={{ color: 'var(--neon-primary)', textShadow: '0 0 5px var(--neon-primary)' }}>
                {visibleSkills.includes(i) ? skill.percentage : 0}%
              </span>
            </div>
            <div className="skill-bar-track h-3 md:h-4">
              <div
                className="skill-bar-fill h-full"
                style={{
                  width: visibleSkills.includes(i) ? `${skill.percentage}%` : '0%',
                  background: `linear-gradient(90deg, var(--neon-primary), var(--neon-secondary))`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {data.skills.length === 0 && (
        <div className="text-center py-20">
          <p className="font-mono text-sm tracking-widest" style={{ color: 'var(--text-muted)' }}>
            [ NO SKILL DATA FOUND ]
          </p>
        </div>
      )}
    </section>
  );
};

export default SkillsPanel;
