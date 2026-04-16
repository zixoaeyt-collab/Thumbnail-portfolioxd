import React from 'react';
import { usePortfolio } from '../contexts/PortfolioContext';

// Social icon SVGs
const icons: Record<string, React.FC<{ className?: string }>> = {
  instagram: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  ),
  twitter: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  youtube: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  ),
  github: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
    </svg>
  ),
  discord: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/>
    </svg>
  ),
  behance: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.61.41.28.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.338.5-.837.9-1.502 1.22.906.26 1.576.72 2.022 1.37.448.66.665 1.45.665 2.36 0 .75-.13 1.39-.41 1.93-.28.55-.67 1-1.16 1.35-.48.348-1.05.6-1.67.767-.63.16-1.3.25-2.01.25H0V4.51h6.938v-.007zM6.545 10.16c.6 0 1.09-.15 1.47-.45.38-.3.565-.73.565-1.29 0-.31-.06-.57-.17-.77-.11-.2-.26-.36-.44-.48-.19-.12-.41-.2-.65-.25-.25-.05-.51-.07-.79-.07H3.39v3.31h3.155zm.185 5.79c.3 0 .59-.04.85-.11.26-.07.49-.18.68-.34.19-.16.35-.36.46-.62.11-.26.17-.57.17-.94 0-.74-.21-1.28-.63-1.6-.42-.33-.97-.5-1.65-.5H3.39v4.11h3.34zM15.4 4.14h5.76v1.64H15.4V4.14zM22.08 14.7c-.26.5-.63.9-1.09 1.18-.46.29-.97.43-1.53.43-.62 0-1.12-.17-1.49-.5-.38-.34-.61-.77-.7-1.3h4.24c.03-.57-.06-1.07-.28-1.51-.22-.44-.53-.8-.94-1.09-.41-.29-.88-.5-1.43-.64-.54-.14-1.12-.21-1.72-.21-.65 0-1.25.1-1.79.31-.54.21-1 .51-1.37.92-.37.41-.66.89-.86 1.45-.2.56-.3 1.18-.3 1.85 0 .66.1 1.27.3 1.82.2.55.49 1.03.85 1.43.37.4.81.71 1.33.93.52.22 1.1.33 1.73.33.88 0 1.6-.21 2.16-.63.56-.42.94-.98 1.13-1.68h-2.43c-.07.22-.18.4-.34.53-.16.13-.35.2-.58.2-.2 0-.36-.06-.49-.19-.13-.13-.21-.3-.23-.52h4.66l.03-.01zM15.84 9.85c.34-.28.73-.49 1.16-.63.43-.14.89-.21 1.37-.21.61 0 1.16.11 1.64.34.49.23.89.55 1.21.97l.02-.02V8.65c-.2-.09-.41-.15-.63-.19-.22-.04-.45-.06-.68-.06-.58 0-1.11.1-1.59.31-.48.21-.88.51-1.2.89-.32.39-.56.85-.73 1.39h4.25v-.01c-.2-.5-.5-.92-.91-1.27z"/>
    </svg>
  ),
};

const ContactSection: React.FC = () => {
  const { data } = usePortfolio();
  const { contact } = data;

  return (
    <section id="contact" className="relative z-10 py-16 px-4 md:px-8 max-w-5xl mx-auto">
      <div className="mb-10">
        <h2 className="section-title text-xl md:text-2xl">CONTACT & SOCIALS</h2>
        <div className="mt-2 text-xs tracking-[6px]" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
          [ COMM RELAY ACTIVE ]
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div className="glass rounded-lg p-6">
          <h3 className="font-heading text-sm tracking-wider mb-6" style={{ color: 'var(--neon-primary)', fontFamily: 'var(--font-heading)' }}>
            ▸ TRANSMISSION CHANNELS
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded flex items-center justify-center shrink-0"
                style={{ background: 'rgba(255,0,60,0.1)', border: '1px solid var(--glass-border)' }}>
                <svg className="w-5 h-5" fill="none" stroke="var(--neon-primary)" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.12 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
                </svg>
              </div>
              <div>
                <div className="text-xs tracking-wider" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>EMAIL</div>
                <div className="text-sm font-mono" style={{ color: 'var(--text-primary)' }}>{contact.email || 'N/A'}</div>
              </div>
            </div>

            {contact.phone && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(255,0,60,0.1)', border: '1px solid var(--glass-border)' }}>
                  <svg className="w-5 h-5" fill="none" stroke="var(--neon-primary)" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-xs tracking-wider" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>PHONE</div>
                  <div className="text-sm font-mono" style={{ color: 'var(--text-primary)' }}>{contact.phone}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Social Links */}
        <div className="glass rounded-lg p-6">
          <h3 className="font-heading text-sm tracking-wider mb-6" style={{ color: 'var(--neon-primary)', fontFamily: 'var(--font-heading)' }}>
            ▸ NETWORK NODES
          </h3>
          <div className="flex flex-wrap gap-4">
            {contact.socials.map((social) => {
              const IconComponent = icons[social.icon] || icons.github;
              return (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon w-12 h-12 rounded-lg flex items-center justify-center text-[color:var(--text-secondary)]"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--glass-border)',
                  }}
                  title={social.platform}
                >
                  <IconComponent className="w-5 h-5 text-current" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
