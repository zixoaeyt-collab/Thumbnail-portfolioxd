import React, { useState, useCallback, useEffect, useRef } from 'react';
import { usePortfolio } from '../contexts/PortfolioContext';
import { useTheme, getThemes } from '../contexts/ThemeContext';
import { ContactInfo } from '../types';

type TabKey = 'identity' | 'logo' | 'thumbnails' | 'skills' | 'contact' | 'socials' | 'theme' | 'deploy';

interface TabDef {
  key: TabKey;
  label: string;
  icon: React.ReactNode;
}

const TABS: TabDef[] = [
  { key: 'identity', label: 'Identity', icon: <IdentityIcon /> },
  { key: 'logo', label: 'Logo', icon: <LogoIcon /> },
  { key: 'thumbnails', label: 'Thumbnails', icon: <GridIcon /> },
  { key: 'skills', label: 'Skills', icon: <BoltIcon /> },
  { key: 'contact', label: 'Contact', icon: <MailIcon /> },
  { key: 'socials', label: 'Socials', icon: <LinkIcon /> },
  { key: 'theme', label: 'Theme', icon: <PaletteIcon /> },
  { key: 'deploy', label: 'Deploy', icon: <DeployIcon /> },
];

// Inline SVG icons for clean look
function IdentityIcon() {
  return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" /><path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" /></svg>;
}
function LogoIcon() {
  return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" /></svg>;
}
function GridIcon() {
  return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25a2.25 2.25 0 01-2.25-2.25v-2.25z" /></svg>;
}
function BoltIcon() {
  return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>;
}
function MailIcon() {
  return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>;
}
function LinkIcon() {
  return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.06a4.5 4.5 0 00-1.242-7.244l-4.5-4.5a4.5 4.5 0 00-6.364 6.364L4.34 8.19" /></svg>;
}
function PaletteIcon() {
  return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" /></svg>;
}
function DeployIcon() {
  return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.338-2.32 3.75 3.75 0 011.338 7.338M6.75 19.5h10.5" /></svg>;
}

const AdminPanel: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { data, updateName, updateTagline, updateLogo, addThumbnail, updateThumbnail, deleteThumbnail, addSkill, updateSkill, deleteSkill, updateContact, addSocial, updateSocial, deleteSocial, resetToDefaults, exportData, importData } = usePortfolio();
  const { currentTheme, setTheme } = useTheme();
  const themes = getThemes();

  // Auth
  const ADMIN_PASSWORD = '207777';
  const [authenticated, setAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  // Active tab
  const [activeTab, setActiveTab] = useState<TabKey>('identity');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Identity
  const [editName, setEditName] = useState(data.name);
  const [editTagline, setEditTagline] = useState(data.tagline);
  const [identitySaved, setIdentitySaved] = useState(false);

  // Logo
  const [editLogoUrl, setEditLogoUrl] = useState(data.logoUrl);
  const [logoPreviewError, setLogoPreviewError] = useState(false);
  const [logoSaved, setLogoSaved] = useState(false);

  // Thumbnails
  const [editingThumb, setEditingThumb] = useState<string | null>(null);
  const [editThumbData, setEditThumbData] = useState<{ title: string; imageUrl: string; viewCount: string; description: string }>({
    title: '', imageUrl: '', viewCount: '0', description: '',
  });
  const [newThumb, setNewThumb] = useState<{ title: string; imageUrl: string; viewCount: string; description: string }>({
    title: '', imageUrl: '', viewCount: '0', description: '',
  });
  const [showAddThumb, setShowAddThumb] = useState(false);

  // Skills
  const [newSkill, setNewSkill] = useState<{ name: string; percentage: string }>({ name: '', percentage: '50' });
  const [showAddSkill, setShowAddSkill] = useState(false);

  // Contact
  const [editContact, setEditContact] = useState<ContactInfo>(data.contact);

  // Socials
  const [editingSocial, setEditingSocial] = useState<string | null>(null);

  // Toast
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2500);
  }, []);

  // Sync state with data when data changes
  useEffect(() => {
    setEditName(data.name);
    setEditTagline(data.tagline);
    setEditLogoUrl(data.logoUrl);
    setEditContact(data.contact);
    setLogoPreviewError(false);
  }, [data]);

  // Password
  const handlePasswordSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setAuthenticated(true);
      showToast('ACCESS GRANTED');
    } else {
      setPasswordError(true);
      setTimeout(() => setPasswordError(false), 1000);
    }
  }, [passwordInput, showToast]);

  // Name & tagline save
  const handleIdentitySave = useCallback(() => {
    updateName(editName);
    updateTagline(editTagline);
    setIdentitySaved(true);
    setTimeout(() => setIdentitySaved(false), 600);
    showToast('IDENTITY UPDATED');
  }, [editName, editTagline, updateName, updateTagline, showToast]);

  // Logo save
  const handleLogoSave = useCallback(() => {
    updateLogo(editLogoUrl);
    setLogoSaved(true);
    setLogoPreviewError(false);
    setTimeout(() => setLogoSaved(false), 600);
    showToast('LOGO UPDATED');
  }, [editLogoUrl, updateLogo, showToast]);

  // Remove logo
  const handleRemoveLogo = useCallback(() => {
    setEditLogoUrl('');
    updateLogo('');
    setLogoPreviewError(false);
    showToast('LOGO REMOVED');
  }, [updateLogo, showToast]);

  // Thumbnail helpers
  const startEditThumb = useCallback((id: string) => {
    setEditingThumb(id);
    const t = data.thumbnails.find(x => x.id === id);
    if (t) setEditThumbData({ title: t.title, imageUrl: t.imageUrl, viewCount: t.viewCount.toString(), description: t.description || '' });
  }, [data.thumbnails]);

  const saveEditThumb = useCallback(() => {
    if (editingThumb) {
      updateThumbnail(editingThumb, {
        title: editThumbData.title,
        imageUrl: editThumbData.imageUrl,
        viewCount: parseInt(editThumbData.viewCount) || 0,
        description: editThumbData.description,
      });
      setEditingThumb(null);
      showToast('THUMBNAIL UPDATED');
    }
  }, [editingThumb, editThumbData, updateThumbnail, showToast]);

  const handleAddThumb = useCallback(() => {
    if (newThumb.title && newThumb.imageUrl) {
      addThumbnail({
        title: newThumb.title,
        imageUrl: newThumb.imageUrl,
        viewCount: parseInt(newThumb.viewCount) || 0,
        description: newThumb.description,
      });
      setNewThumb({ title: '', imageUrl: '', viewCount: '0', description: '' });
      setShowAddThumb(false);
      showToast('THUMBNAIL ADDED');
    }
  }, [newThumb, addThumbnail, showToast]);

  // Skill helpers
  const handleAddSkill = useCallback(() => {
    if (newSkill.name) {
      addSkill({ name: newSkill.name, percentage: Math.min(100, Math.max(0, parseInt(newSkill.percentage) || 0)) });
      setNewSkill({ name: '', percentage: '50' });
      setShowAddSkill(false);
      showToast('SKILL ADDED');
    }
  }, [newSkill, addSkill, showToast]);

  // Contact
  const handleContactUpdate = useCallback((field: keyof ContactInfo, value: string) => {
    setEditContact(p => ({ ...p, [field]: value }));
    updateContact({ [field]: value });
    showToast('CONTACT UPDATED');
  }, [updateContact, showToast]);

  // Social helpers
  const handleAddSocial = useCallback(() => {
    addSocial({ platform: 'New Platform', url: 'https://', icon: 'github' });
    showToast('SOCIAL ADDED');
  }, [addSocial, showToast]);

  const handleSocialUpdate = useCallback((id: string, field: keyof typeof editContact.socials[0], value: string) => {
    updateSocial(id, { [field]: value });
  }, [updateSocial]);

  // Reset
  const handleReset = useCallback(() => {
    if (window.confirm('Reset all portfolio data to defaults? This cannot be undone.')) {
      resetToDefaults();
      showToast('ALL DATA RESET');
    }
  }, [resetToDefaults, showToast]);

  if (!isOpen) return null;

  // ====== AUTH SCREEN ======
  if (!authenticated) {
    return (
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        style={{ background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(16px)' }}
        onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      >
        {toast && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[200] px-6 py-2 rounded text-xs font-heading tracking-[3px] animate-fade-in"
            style={{ fontFamily: 'var(--font-heading)', background: 'var(--neon-primary)', color: '#000', boxShadow: '0 0 20px var(--neon-primary)' }}>
            {toast}
          </div>
        )}
        <div
          className="w-full max-w-sm rounded-xl p-8 flex flex-col items-center"
          style={{ border: '1px solid var(--glass-border)', background: 'rgba(10,10,20,0.95)', boxShadow: 'var(--neon-glow), inset 0 0 80px rgba(0,0,0,0.6)' }}
        >
          {/* Lock icon */}
          <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 animate-pulse-neon"
            style={{ border: '2px solid var(--neon-primary)', background: 'rgba(255,0,60,0.05)' }}>
            <svg className="w-8 h-8" fill="none" stroke="var(--neon-primary)" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </div>
          <p className="text-[10px] tracking-[4px] mb-2 font-heading" style={{ color: 'var(--neon-primary)', textShadow: '0 0 8px var(--neon-primary)', fontFamily: 'var(--font-heading)' }}>
            ADMIN CONSOLE
          </p>
          <p className="text-[10px] tracking-widest mb-6" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            ENTER 6-DIGIT PASSCODE
          </p>
          <form onSubmit={handlePasswordSubmit} className="flex gap-3 w-full">
            <input
              type="password"
              value={passwordInput}
              onChange={e => { setPasswordInput(e.target.value); setPasswordError(false); }}
              placeholder="• • • • • •"
              className="flex-1 text-center text-xl tracking-[12px] py-3 rounded-lg outline-none"
              maxLength={6}
              autoFocus
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: `1px solid ${passwordError ? '#ff3333' : 'var(--glass-border)'}`,
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-mono)',
                boxShadow: passwordError ? '0 0 15px rgba(255,51,51,0.3)' : 'none',
                transition: 'all 0.3s ease',
              }}
            />
            <button type="submit"
              className="px-5 rounded-lg font-heading text-sm tracking-wider transition-all duration-200"
              style={{ background: 'var(--neon-primary)', color: '#000', fontFamily: 'var(--font-heading)', boxShadow: 'var(--neon-glow-sm)' }}>
              →
            </button>
          </form>
          {passwordError && (
            <p className="text-[10px] mt-3 tracking-wider animate-pulse" style={{ color: '#ff3333', fontFamily: 'var(--font-mono)' }}>
              ⚠ INVALID PASSCODE
            </p>
          )}
          <button onClick={onClose} className="mt-6 text-[10px] tracking-widest transition-colors"
            style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--neon-primary)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
            DISMISS
          </button>
        </div>
      </div>
    );
  }

  // ====== MAIN ADMIN PANEL ======
  return (
    <div
      className="fixed inset-0 z-[100]"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Toast */}
      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[200] px-6 py-2.5 rounded-lg text-[10px] font-heading tracking-[3px] animate-fade-in"
          style={{ fontFamily: 'var(--font-heading)', background: 'var(--neon-primary)', color: '#000', boxShadow: '0 0 30px var(--neon-primary)' }}>
          ✓ {toast}
        </div>
      )}

      <div
        className="absolute inset-3 md:inset-6 rounded-xl overflow-hidden flex flex-col md:flex-row"
        style={{ border: '1px solid var(--glass-border)', boxShadow: '0 0 40px rgba(0,0,0,0.8), var(--neon-glow-sm)', background: 'rgba(8,8,14,0.98)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* ===== MOBILE HEADER ===== */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 border-b shrink-0"
          style={{ borderColor: 'var(--glass-border)', background: 'rgba(5,5,10,0.98)' }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded"
            style={{ color: 'var(--neon-primary)', border: '1px solid var(--glass-border)' }}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
          <span className="text-[10px] tracking-[3px] font-heading" style={{ color: 'var(--neon-primary)', fontFamily: 'var(--font-heading)' }}>
            ADMIN CONSOLE
          </span>
          <button onClick={onClose} className="p-2 rounded" style={{ color: 'var(--text-muted)', border: '1px solid var(--glass-border)' }}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* ===== MOBILE SIDEBAR OVERLAY ===== */}
        {sidebarOpen && (
          <div className="md:hidden fixed inset-0 z-[110]" style={{ background: 'rgba(0,0,0,0.7)' }} onClick={() => setSidebarOpen(false)}>
            <div
              className="absolute left-0 top-0 bottom-0 w-72 p-4 flex flex-col"
              style={{ background: 'rgba(8,8,14,0.98)', borderRight: '1px solid var(--glass-border)' }}
              onClick={e => e.stopPropagation()}
            >
              <MobileSidebar activeTab={activeTab} setActiveTab={(t: TabKey) => { setActiveTab(t); setSidebarOpen(false); }} onReset={handleReset} onClose={onClose} />
            </div>
          </div>
        )}

        {/* ===== DESKTOP SIDEBAR ===== */}
        <div className="hidden md:flex w-60 shrink-0 flex-col border-r"
          style={{ borderColor: 'var(--glass-border)', background: 'rgba(5,5,10,0.98)' }}>
          <div className="px-5 py-5 border-b" style={{ borderColor: 'var(--glass-border)' }}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'var(--neon-primary)', boxShadow: 'var(--neon-glow-sm)' }}>
                <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] tracking-[3px] font-heading" style={{ color: 'var(--neon-primary)', fontFamily: 'var(--font-heading)', textShadow: '0 0 6px var(--neon-primary)' }}>
                  ADMIN
                </p>
                <p className="text-[9px] tracking-wider" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  CONSOLE v2.1
                </p>
              </div>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
            {TABS.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group"
                style={{
                  background: activeTab === tab.key ? 'rgba(255,255,255,0.04)' : 'transparent',
                  borderLeft: activeTab === tab.key ? '3px solid var(--neon-primary)' : '3px solid transparent',
                  color: activeTab === tab.key ? 'var(--neon-primary)' : 'var(--text-muted)',
                }}
                onMouseEnter={e => { if (activeTab !== tab.key) e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
                onMouseLeave={e => { if (activeTab !== tab.key) e.currentTarget.style.background = 'transparent'; }}
              >
                <span style={{ filter: activeTab === tab.key ? 'drop-shadow(0 0 4px var(--neon-primary))' : 'none' }}>
                  {tab.icon}
                </span>
                <span className="text-[11px] font-heading tracking-[1.5px]" style={{ fontFamily: 'var(--font-heading)' }}>
                  {tab.label}
                </span>
              </button>
            ))}
          </nav>

          <div className="p-3 border-t space-y-2" style={{ borderColor: 'var(--glass-border)' }}>
            <button onClick={handleReset}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[10px] font-heading tracking-[1.5px] transition-all hover:bg-red-950/30"
              style={{ color: '#ff5555', border: '1px solid transparent' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,85,85,0.3)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'transparent'; }}>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
              RESET ALL
            </button>
            <button onClick={onClose}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[10px] font-heading tracking-[1.5px] transition-all"
              style={{ color: 'var(--text-muted)', border: '1px solid var(--glass-border)' }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--neon-primary)'; e.currentTarget.style.borderColor = 'var(--neon-primary)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--glass-border)'; }}>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              CLOSE
            </button>
          </div>
        </div>

        {/* ===== MAIN CONTENT ===== */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-8 lg:p-10">
            {/* ===== IDENTITY TAB ===== */}
            {activeTab === 'identity' && (
              <div className="space-y-8 animate-fade-in max-w-2xl">
                <SectionHeader title="PORTFOLIO IDENTITY" subtitle="Manage your portfolio name and tagline" />

                <div className="space-y-5">
                  <FormField label="PORTFOLIO NAME" helper={`${editName.length} characters — shown in header, hero & footer`}>
                    <input
                      className="admin-input w-full text-lg md:text-xl font-heading tracking-wider py-3.5"
                      style={{ fontFamily: 'var(--font-heading)' }}
                      value={editName} onChange={e => setEditName(e.target.value)}
                      placeholder="Enter portfolio name..."
                    />
                  </FormField>

                  <FormField label="TAGLINE / SUBTITLE" helper="Appears beneath the name in the hero section">
                    <input
                      className="admin-input w-full font-mono tracking-wider py-3"
                      style={{ fontFamily: 'var(--font-mono)' }}
                      value={editTagline} onChange={e => setEditTagline(e.target.value)}
                      placeholder="Enter tagline..."
                    />
                  </FormField>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    className={`admin-btn px-8 py-3 text-xs transition-all duration-300 ${identitySaved ? 'scale-105' : ''}`}
                    onClick={handleIdentitySave}
                    style={identitySaved ? { background: 'var(--neon-primary)', color: '#000', boxShadow: 'var(--neon-glow)' } : {}}
                    onMouseEnter={e => { if (!identitySaved) { e.currentTarget.style.boxShadow = 'var(--neon-glow)'; e.currentTarget.style.background = 'var(--neon-primary)'; e.currentTarget.style.color = '#000'; } }}
                    onMouseLeave={e => { if (!identitySaved) { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--neon-primary)'; } }}
                  >
                    {identitySaved ? '✓ SAVED' : '▸ SAVE CHANGES'}
                  </button>
                </div>

                {/* Live Preview */}
                <PreviewCard>
                  <p className="text-[10px] tracking-[4px] mb-4 text-center" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    — LIVE PREVIEW —
                  </p>
                  <h3 className="font-heading text-2xl md:text-4xl tracking-[6px] mb-3 text-center"
                    style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', textShadow: 'var(--neon-glow-text)' }}>
                    {editName || 'YOUR NAME'}
                  </h3>
                  <div className="h-px w-20 mx-auto my-3" style={{ background: 'linear-gradient(90deg, transparent, var(--neon-primary), transparent)' }} />
                  <p className="font-mono text-sm tracking-[8px] text-center" style={{ color: 'var(--neon-primary)', fontFamily: 'var(--font-mono)' }}>
                    {editTagline || 'YOUR TAGLINE'}
                  </p>
                </PreviewCard>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { label: 'THUMBNAILS', value: data.thumbnails.length.toString(), icon: <GridIcon /> },
                    { label: 'SKILLS', value: data.skills.length.toString(), icon: <BoltIcon /> },
                    { label: 'SOCIALS', value: data.contact.socials.length.toString(), icon: <LinkIcon /> },
                    { label: 'THEME', value: currentTheme.toUpperCase(), icon: <PaletteIcon /> },
                  ].map(stat => (
                    <StatCard key={stat.label} label={stat.label} value={stat.value} icon={stat.icon} />
                  ))}
                </div>
              </div>
            )}

            {/* ===== LOGO TAB ===== */}
            {activeTab === 'logo' && (
              <div className="space-y-8 animate-fade-in max-w-2xl">
                <SectionHeader title="PORTFOLIO LOGO" subtitle="Upload a custom logo to replace the default letter mark" />

                <div className="space-y-5">
                  <FormField label="LOGO IMAGE URL" helper="Enter a direct URL to a PNG or SVG with transparent background for best results">
                    <input
                      className="admin-input w-full font-mono tracking-wider py-3"
                      style={{ fontFamily: 'var(--font-mono)' }}
                      value={editLogoUrl} onChange={e => { setEditLogoUrl(e.target.value); setLogoPreviewError(false); }}
                      placeholder="https://example.com/logo.png"
                    />
                  </FormField>

                  {/* Logo Preview */}
                  <div className="p-6 rounded-lg border text-center space-y-4"
                    style={{ borderColor: editLogoUrl && !logoPreviewError ? 'var(--neon-primary)' : 'var(--glass-border)', background: 'rgba(255,255,255,0.015)' }}>
                    <p className="text-[10px] tracking-[4px]" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      — LOGO PREVIEW —
                    </p>

                    {/* Logo display at different sizes */}
                    {editLogoUrl && !logoPreviewError ? (
                      <div className="space-y-4">
                        {/* Large */}
                        <div className="flex justify-center">
                          <img
                            src={editLogoUrl}
                            alt="Logo large"
                            className="object-contain rounded"
                            style={{ maxHeight: '120px', filter: 'drop-shadow(0 0 10px var(--neon-primary))' }}
                            onError={() => setLogoPreviewError(true)}
                          />
                        </div>
                        {/* Medium (header size) */}
                        <div className="flex justify-center">
                          <img
                            src={editLogoUrl}
                            alt="Logo medium"
                            className="object-contain rounded"
                            style={{ maxHeight: '32px', border: '1px solid var(--glass-border)', padding: '2px' }}
                            onError={() => setLogoPreviewError(true)}
                          />
                        </div>
                        <p className="text-[10px]" style={{ color: '#00ff88', fontFamily: 'var(--font-mono)' }}>
                          ✓ IMAGE LOADED SUCCESSFULLY
                        </p>
                      </div>
                    ) : (
                      <div className="py-6">
                        {editLogoUrl && logoPreviewError ? (
                          <div>
                            <svg className="w-10 h-10 mx-auto mb-3" fill="none" stroke="#ff5555" viewBox="0 0 24 24" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                            </svg>
                            <p className="text-[10px]" style={{ color: '#ff5555', fontFamily: 'var(--font-mono)' }}>
                              FAILED TO LOAD IMAGE
                            </p>
                            <p className="text-[9px] mt-1" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                              Check the URL is a direct link to a PNG/JPG/SVG
                            </p>
                          </div>
                        ) : (
                          <div>
                            <div className="w-20 h-20 mx-auto rounded-lg flex items-center justify-center mb-3"
                              style={{ border: '2px dashed var(--glass-border)', background: 'rgba(255,255,255,0.02)' }}>
                              <svg className="w-8 h-8" fill="none" stroke="var(--text-muted)" viewBox="0 0 24 24" strokeWidth={1}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                              </svg>
                            </div>
                            <p className="text-[10px]" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                              NO LOGO SET — USING DEFAULT LETTER MARK
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Tips */}
                  <div className="p-4 rounded-lg border space-y-2" style={{ borderColor: 'var(--glass-border)', background: 'rgba(255,255,255,0.01)' }}>
                    <p className="text-[10px] tracking-[2px] font-heading" style={{ color: 'var(--neon-primary)', fontFamily: 'var(--font-heading)' }}>
                      RECOMMENDATIONS
                    </p>
                    <ul className="text-[10px] space-y-1" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      <li>• Use PNG with transparent background</li>
                      <li>• Recommended size: 200×200px or SVG</li>
                      <li>• Keep it simple — it scales to 32px in header</li>
                      <li>• Works with any image hosting (Imgur, GitHub, etc.)</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  <button
                    className={`admin-btn px-8 py-3 text-xs transition-all duration-300 ${logoSaved ? 'scale-105' : ''}`}
                    onClick={handleLogoSave}
                    disabled={!editLogoUrl}
                    style={logoSaved ? { background: 'var(--neon-primary)', color: '#000', boxShadow: 'var(--neon-glow)' } : { opacity: editLogoUrl ? 1 : 0.4 }}
                    onMouseEnter={e => { if (!logoSaved && editLogoUrl) { e.currentTarget.style.boxShadow = 'var(--neon-glow)'; e.currentTarget.style.background = 'var(--neon-primary)'; e.currentTarget.style.color = '#000'; } }}
                    onMouseLeave={e => { if (!logoSaved && editLogoUrl) { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--neon-primary)'; } }}
                  >
                    {logoSaved ? '✓ SAVED' : '▸ SAVE LOGO'}
                  </button>
                  {data.logoUrl && (
                    <button
                      className="admin-btn px-5 py-3 text-xs"
                      style={{ borderColor: '#ff5555', color: '#ff5555' }}
                      onClick={handleRemoveLogo}
                      onMouseEnter={e => { e.currentTarget.style.background = '#ff5555'; e.currentTarget.style.color = '#000'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#ff5555'; }}
                    >
                      ✕ REMOVE CURRENT
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* ===== THUMBNAILS TAB ===== */}
            {activeTab === 'thumbnails' && (
              <div className="space-y-6 animate-fade-in max-w-3xl">
                <SectionHeader title="THUMBNAILS" subtitle={`${data.thumbnails.length} modules loaded`} />

                <div className="flex justify-end">
                  <button className="admin-btn text-[10px]" onClick={() => setShowAddThumb(!showAddThumb)}>
                    {showAddThumb ? '✕ CANCEL' : '+ ADD THUMBNAIL'}
                  </button>
                </div>

                {showAddThumb && (
                  <div className="p-5 rounded-lg border space-y-3" style={{ borderColor: 'var(--neon-primary)', background: 'rgba(255,0,60,0.03)' }}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input className="admin-input text-xs" placeholder="Title *" value={newThumb.title} onChange={e => setNewThumb(p => ({ ...p, title: e.target.value }))} />
                      <input className="admin-input text-xs" placeholder="Image URL *" value={newThumb.imageUrl} onChange={e => setNewThumb(p => ({ ...p, imageUrl: e.target.value }))} />
                      <input className="admin-input text-xs" placeholder="View Count" type="number" value={newThumb.viewCount} onChange={e => setNewThumb(p => ({ ...p, viewCount: e.target.value }))} />
                      <input className="admin-input text-xs" placeholder="Description" value={newThumb.description} onChange={e => setNewThumb(p => ({ ...p, description: e.target.value }))} />
                    </div>
                    <button className="admin-btn text-[10px]" onClick={handleAddThumb}>+ ADD MODULE</button>
                  </div>
                )}

                <div className="space-y-2 max-h-[450px] overflow-y-auto pr-1 custom-scrollbar">
                  {data.thumbnails.length === 0 ? (
                    <EmptyState message="No thumbnails yet" />
                  ) : (
                    data.thumbnails.map(thumb => (
                      <div key={thumb.id}
                        className="p-3 rounded-lg border flex items-center gap-3 transition-all duration-200"
                        style={{
                          borderColor: editingThumb === thumb.id ? 'var(--neon-primary)' : 'var(--glass-border)',
                          background: editingThumb === thumb.id ? 'rgba(255,0,60,0.04)' : 'rgba(255,255,255,0.01)',
                          boxShadow: editingThumb === thumb.id ? '0 0 8px rgba(255,0,60,0.1)' : 'none',
                        }}>
                        <img src={thumb.imageUrl} alt="" className="w-16 h-10 object-cover rounded shrink-0" style={{ border: '1px solid var(--glass-border)' }}
                          onError={e => { (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 fill=%22%23333%22 viewBox=%220 0 24 24%22%3E%3Cpath d=%22M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z%22/%3E%3C/svg%3E'; }} />
                        {editingThumb === thumb.id ? (
                          <div className="flex-1 space-y-2 min-w-0">
                            <input className="admin-input w-full text-xs" value={editThumbData.title} onChange={e => setEditThumbData(p => ({ ...p, title: e.target.value }))} placeholder="Title" />
                            <input className="admin-input w-full text-xs" value={editThumbData.imageUrl} onChange={e => setEditThumbData(p => ({ ...p, imageUrl: e.target.value }))} placeholder="Image URL" />
                            <div className="flex gap-2">
                              <input className="admin-input w-24 text-xs" type="number" value={editThumbData.viewCount} onChange={e => setEditThumbData(p => ({ ...p, viewCount: e.target.value }))} placeholder="Views" />
                              <input className="admin-input flex-1 text-xs" value={editThumbData.description} onChange={e => setEditThumbData(p => ({ ...p, description: e.target.value }))} placeholder="Description" />
                            </div>
                            <div className="flex gap-2">
                              <button className="admin-btn text-[10px] py-1 px-3" onClick={saveEditThumb}>✓ SAVE</button>
                              <button className="admin-btn text-[10px] py-1 px-3" style={{ borderColor: 'var(--glass-border)', color: 'var(--text-muted)' }} onClick={() => setEditingThumb(null)}>CANCEL</button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-mono truncate">{thumb.title}</p>
                              <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{thumb.viewCount.toLocaleString()} views</p>
                            </div>
                            <div className="flex gap-1.5 shrink-0">
                              <button className="admin-btn text-[10px] py-1 px-2.5" onClick={() => startEditThumb(thumb.id)}>
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>
                              </button>
                              <button className="admin-btn text-[10px] py-1 px-2.5" style={{ borderColor: 'rgba(255,85,85,0.4)', color: '#ff5555' }} onClick={() => { deleteThumbnail(thumb.id); showToast('THUMBNAIL DELETED'); }}>
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-1.65L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v0.916m6.2 0h-6.2" />
                                </svg>
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* ===== SKILLS TAB ===== */}
            {activeTab === 'skills' && (
              <div className="space-y-6 animate-fade-in max-w-3xl">
                <SectionHeader title="SKILLS" subtitle={`${data.skills.length} modules`} />

                <div className="flex justify-end">
                  <button className="admin-btn text-[10px]" onClick={() => setShowAddSkill(!showAddSkill)}>
                    {showAddSkill ? '✕ CANCEL' : '+ ADD SKILL'}
                  </button>
                </div>

                {showAddSkill && (
                  <div className="p-5 rounded-lg border space-y-3" style={{ borderColor: 'var(--neon-primary)', background: 'rgba(255,0,60,0.03)' }}>
                    <div className="flex gap-3">
                      <input className="admin-input flex-1 text-xs" placeholder="Skill Name" value={newSkill.name} onChange={e => setNewSkill(p => ({ ...p, name: e.target.value }))} />
                      <input className="admin-input w-20 text-xs text-center" type="number" placeholder="%" min={0} max={100} value={newSkill.percentage} onChange={e => setNewSkill(p => ({ ...p, percentage: e.target.value }))} />
                      <button className="admin-btn text-[10px]" onClick={handleAddSkill}>+ ADD</button>
                    </div>
                  </div>
                )}

                <div className="space-y-3 max-h-[450px] overflow-y-auto pr-1 custom-scrollbar">
                  {data.skills.length === 0 ? (
                    <EmptyState message="No skills configured" />
                  ) : (
                    data.skills.map(skill => (
                      <div key={skill.id} className="p-4 rounded-lg border" style={{ borderColor: 'var(--glass-border)', background: 'rgba(255,255,255,0.015)' }}>
                        <div className="flex items-center gap-3 mb-2.5">
                          <input className="admin-input flex-1 text-xs" value={skill.name} onChange={e => updateSkill(skill.id, { name: e.target.value })} />
                          <div className="flex items-center gap-1.5">
                            <input className="admin-input w-14 text-xs text-center" type="number" min={0} max={100} value={skill.percentage}
                              onChange={e => updateSkill(skill.id, { percentage: Math.min(100, Math.max(0, parseInt(e.target.value) || 0)) })} />
                            <span className="text-[10px]" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>%</span>
                          </div>
                          <button className="admin-btn text-[10px] py-1 px-2" style={{ borderColor: 'rgba(255,85,85,0.4)', color: '#ff5555' }} onClick={() => { deleteSkill(skill.id); showToast('SKILL DELETED'); }}>
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                        <div className="skill-bar-track h-1.5">
                          <div className="skill-bar-fill" style={{ width: `${skill.percentage}%` }} />
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* ===== CONTACT TAB ===== */}
            {activeTab === 'contact' && (
              <div className="space-y-8 animate-fade-in max-w-2xl">
                <SectionHeader title="CONTACT INFO" subtitle="Transmission channels" />

                <div className="space-y-5">
                  <FormField label="EMAIL" helper="Primary contact email address">
                    <input className="admin-input w-full text-xs" placeholder="your@email.com" value={editContact.email}
                      onChange={e => handleContactUpdate('email', e.target.value)} />
                  </FormField>
                  <FormField label="PHONE" helper="Optional — leave blank if not needed">
                    <input className="admin-input w-full text-xs" placeholder="+1 234 567 8900" value={editContact.phone}
                      onChange={e => handleContactUpdate('phone', e.target.value)} />
                  </FormField>
                </div>

                <PreviewCard>
                  <p className="text-[10px] tracking-[4px] mb-3 text-center" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    — PREVIEW —
                  </p>
                  <div className="space-y-1.5 text-center">
                    <p className="text-sm font-mono" style={{ color: 'var(--text-primary)' }}>{editContact.email || <span style={{ color: 'var(--text-muted)' }}>No email set</span>}</p>
                    {editContact.phone && <p className="text-sm font-mono" style={{ color: 'var(--text-secondary)' }}>{editContact.phone}</p>}
                  </div>
                </PreviewCard>
              </div>
            )}

            {/* ===== SOCIALS TAB ===== */}
            {activeTab === 'socials' && (
              <div className="space-y-6 animate-fade-in max-w-3xl">
                <SectionHeader title="SOCIAL LINKS" subtitle={`${data.contact.socials.length} nodes active`} />

                <div className="flex justify-end">
                  <button className="admin-btn text-[10px]" onClick={handleAddSocial}>+ ADD LINK</button>
                </div>

                <div className="space-y-2 max-h-[450px] overflow-y-auto pr-1 custom-scrollbar">
                  {data.contact.socials.length === 0 ? (
                    <EmptyState message="No social links configured" />
                  ) : (
                    data.contact.socials.map(social => (
                      <div key={social.id}
                        className="p-4 rounded-lg border transition-all duration-200"
                        style={{
                          borderColor: editingSocial === social.id ? 'var(--neon-primary)' : 'var(--glass-border)',
                          background: editingSocial === social.id ? 'rgba(255,0,60,0.04)' : 'rgba(255,255,255,0.015)',
                        }}>
                        {editingSocial === social.id ? (
                          <div className="space-y-2">
                            <input className="admin-input w-full text-xs" value={social.platform} onChange={e => handleSocialUpdate(social.id, 'platform', e.target.value)} placeholder="Platform Name" />
                            <input className="admin-input w-full text-xs" value={social.url} onChange={e => handleSocialUpdate(social.id, 'url', e.target.value)} placeholder="https://..." />
                            <input className="admin-input w-full text-xs" value={social.icon} onChange={e => handleSocialUpdate(social.id, 'icon', e.target.value)} placeholder="Icon key" />
                            <p className="text-[9px]" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                              Keys: instagram, twitter, youtube, github, discord, behance, tiktok, linkedin, twitch
                            </p>
                            <div className="flex gap-2">
                              <button className="admin-btn text-[10px] py-1 px-3" onClick={() => setEditingSocial(null)}>✓ DONE</button>
                              <button className="admin-btn text-[10px] py-1 px-3" style={{ borderColor: 'rgba(255,85,85,0.4)', color: '#ff5555' }} onClick={() => { deleteSocial(social.id); showToast('SOCIAL DELETED'); }}>✕ DELETE</button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                              style={{ border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.03)' }}>
                              <PlatformIcon icon={social.icon} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-mono">{social.platform}</p>
                              <p className="text-[10px] truncate" style={{ color: 'var(--text-muted)' }}>{social.url}</p>
                            </div>
                            <button className="admin-btn text-[10px] py-1.5 px-2.5" onClick={() => setEditingSocial(social.id)}>
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                              </svg>
                            </button>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* ===== THEME TAB ===== */}
            {activeTab === 'theme' && (
              <div className="space-y-8 animate-fade-in max-w-3xl">
                <SectionHeader title="COLOR OVERRIDE" subtitle="Theme selection — admin only" />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {Object.values(themes).map(theme => (
                    <button key={theme.name}
                      onClick={() => { setTheme(theme.name); showToast(`THEME: ${theme.label.toUpperCase()}`); }}
                      className="p-6 rounded-xl border transition-all duration-300 group text-left"
                      style={{
                        borderColor: currentTheme === theme.name ? theme.primary : 'var(--glass-border)',
                        background: currentTheme === theme.name ? `${theme.primary}08` : 'rgba(255,255,255,0.015)',
                        boxShadow: currentTheme === theme.name ? `0 0 25px ${theme.primary}25, inset 0 0 30px ${theme.primary}08` : 'none',
                        transform: currentTheme === theme.name ? 'scale(1.02)' : 'scale(1)',
                      }}
                      onMouseEnter={e => { if (currentTheme !== theme.name) { e.currentTarget.style.borderColor = theme.primary; e.currentTarget.style.background = `${theme.primary}05`; } }}
                      onMouseLeave={e => { if (currentTheme !== theme.name) { e.currentTarget.style.borderColor = 'var(--glass-border)'; e.currentTarget.style.background = 'rgba(255,255,255,0.015)'; } }}
                    >
                      <div className="w-full h-14 rounded-lg mb-4 relative overflow-hidden"
                        style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`, boxShadow: `0 0 20px ${theme.primary}40` }}>
                        <div className="absolute inset-0" style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)' }} />
                        {currentTheme === theme.name && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-[10px] font-heading tracking-[3px]" style={{ color: '#fff', textShadow: '0 0 6px rgba(0,0,0,0.8)', fontFamily: 'var(--font-heading)' }}>ACTIVE</span>
                          </div>
                        )}
                      </div>
                      <p className="font-heading text-sm tracking-wider" style={{ fontFamily: 'var(--font-heading)', color: currentTheme === theme.name ? theme.primary : 'var(--text-secondary)' }}>
                        {theme.label}
                      </p>
                      <p className="text-[10px] mt-1 font-mono" style={{ color: 'var(--text-muted)' }}>{theme.name.toUpperCase()} SCHEME</p>
                    </button>
                  ))}
                </div>

                <PreviewCard>
                  <div className="flex items-center gap-4">
                    <div className="w-5 h-5 rounded-full shrink-0 animate-pulse" style={{ background: 'var(--neon-primary)', boxShadow: '0 0 12px var(--neon-primary)' }} />
                    <div>
                      <p className="text-xs font-heading tracking-wider" style={{ fontFamily: 'var(--font-heading)', color: 'var(--neon-primary)' }}>
                        CURRENT: {themes[currentTheme]?.label.toUpperCase()}
                      </p>
                      <p className="text-[10px]" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                        Primary: {themes[currentTheme]?.primary} / Secondary: {themes[currentTheme]?.secondary}
                      </p>
                    </div>
                  </div>
                </PreviewCard>
              </div>
            )}

            {/* ===== DEPLOY TAB ===== */}
            {activeTab === 'deploy' && (
              <DeployTab exportData={exportData} importData={importData} showToast={showToast} data={data} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ====== DEPLOY TAB COMPONENT ======

function DeployTab({ exportData, importData, showToast, data }: {
  exportData: () => string;
  importData: (json: string) => boolean;
  showToast: (msg: string) => void;
  data: { name: string; tagline: string; logoUrl: string; thumbnails: any[]; skills: any[]; contact: { email: string; phone: string; socials: any[] } };
}) {
  const [importText, setImportText] = useState('');
  const [showImportArea, setShowImportArea] = useState(false);
  const [copied, setCopied] = useState(false);
  const [cmdCopied, setCmdCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Generate the EXACT TypeScript code to paste into defaultData.ts
  const generateTsCode = () => {
    const d = data;
    const thumbs = d.thumbnails.map(t =>
`    { id: '${t.id}', title: '${t.title.replace(/'/g, "\\'")}', imageUrl: '${t.imageUrl}', viewCount: ${t.viewCount}, description: '${(t.description || '').replace(/'/g, "\\'")}' }`
    ).join(',\n');
    const skills = d.skills.map(s =>
`    { id: '${s.id}', name: '${s.name.replace(/'/g, "\\'")}', percentage: ${s.percentage} }`
    ).join(',\n');
    const socials = d.contact.socials.map(s =>
`      { id: '${s.id}', platform: '${s.platform.replace(/'/g, "\\'")}', url: '${s.url}', icon: '${s.icon}' }`
    ).join(',\n');

    return `import { PortfolioData } from '../types';

export const defaultPortfolioData: PortfolioData = {
  name: '${d.name.replace(/'/g, "\\'")}',
  tagline: '${d.tagline.replace(/'/g, "\\'")}',
  logoUrl: '${d.logoUrl || ''}',
  thumbnails: [
${thumbs}
  ],
  skills: [
${skills}
  ],
  contact: {
    email: '${d.contact.email.replace(/'/g, "\\'")}',
    phone: '${d.contact.phone || ''}',
    socials: [
${socials}
    ],
  },
};`;
  };

  const handleCopyTsCode = () => {
    const code = generateTsCode();
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      showToast('TYPESCRIPT CODE COPIED');
      setTimeout(() => setCopied(false), 2500);
    }).catch(() => {
      showToast('CLIPBOARD FAILED');
    });
  };

  const handleCopyCommands = () => {
    const cmds = `cd D:\\portfolio
npm run build
copy public\\404.html dist\\404.html
cd dist
git init
git add .
git commit -m "update portfolio"
git remote add origin https://github.com/zixoaeyt-collab/Thumbnail-portfolioxd.git
git push -f origin HEAD:gh-pages
cd ..`;
    navigator.clipboard.writeText(cmds).then(() => {
      setCmdCopied(true);
      showToast('COMMANDS COPIED');
      setTimeout(() => setCmdCopied(false), 2500);
    });
  };

  const handleExport = () => {
    const json = exportData();
    navigator.clipboard.writeText(json).then(() => {
      showToast('JSON DATA COPIED');
      setTimeout(() => setCopied(false), 2500);
    }).catch(() => showToast('CLIPBOARD FAILED'));
  };

  const handleDownload = () => {
    const json = exportData();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio-data.json';
    a.click();
    URL.revokeObjectURL(url);
    showToast('DATA FILE DOWNLOADED');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => { setImportText(ev.target?.result as string); };
    reader.readAsText(file);
  };

  const handleImport = () => {
    const success = importData(importText);
    if (success) {
      showToast('DATA IMPORTED SUCCESSFULLY');
      setImportText('');
      setShowImportArea(false);
    } else {
      showToast('INVALID DATA FORMAT');
    }
  };

  return (
    <div className="space-y-5 animate-fade-in max-w-3xl">
      <SectionHeader title="DEPLOY TO ALL DEVICES" subtitle="Push admin changes live" />

      {/* ⚠️ Important Info */}
      <div className="p-4 rounded-lg border" style={{
        borderColor: 'rgba(255,188,0,0.3)',
        background: 'rgba(255,188,0,0.05)',
      }}>
        <div className="flex gap-3">
          <span className="text-lg shrink-0">⚠️</span>
          <div className="text-xs space-y-1" style={{ color: 'rgba(255,188,0,0.9)', fontFamily: 'var(--font-mono)' }}>
            <p>Admin changes save to <strong style={{ color: '#ffbc00' }}>localStorage</strong> — visible on THIS device only.</p>
            <p>To show changes <strong style={{ color: '#ffbc00' }}>everywhere</strong>, follow the 3 steps below.</p>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════ */}
      {/* STEP 1: COPY TYPESCRIPT CODE */}
      {/* ═══════════════════════════════════════ */}
      <div className="rounded-xl border overflow-hidden" style={{
        borderColor: 'var(--glass-border)',
        background: 'rgba(255,255,255,0.02)',
      }}>
        <div className="px-5 py-4 border-b" style={{ borderColor: 'var(--glass-border)' }}>
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold shrink-0" style={{
              background: 'var(--neon-primary)', color: '#000',
              boxShadow: '0 0 10px var(--neon-primary)',
            }}>1</span>
            <div>
              <h3 className="text-sm tracking-wider" style={{ fontFamily: 'var(--font-heading)', color: 'var(--neon-primary)' }}>
                COPY THE CODE
              </h3>
              <p className="text-[10px]" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                Copies exact TypeScript code — paste into <code style={{ color: 'var(--neon-secondary)' }}>src/data/defaultData.ts</code>
              </p>
            </div>
          </div>
        </div>
        <div className="p-5">
          {/* Code Preview */}
          <div className="relative rounded-lg border p-3 mb-4 max-h-40 overflow-auto" style={{
            borderColor: 'var(--glass-border)',
            background: 'rgba(0,0,0,0.4)',
          }}>
            <pre className="text-[9px] leading-relaxed whitespace-pre-wrap" style={{
              color: '#a5d6ff',
              fontFamily: "'Cascadia Code', 'Fira Code', 'Consolas', monospace",
            }}>
{generateTsCode()}
            </pre>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleCopyTsCode}
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-heading tracking-wider transition-all duration-200 hover:scale-[1.03]"
              style={{
                background: copied ? '#00ff88' : 'var(--neon-primary)',
                color: '#000',
                boxShadow: `0 0 20px ${copied ? '#00ff88' : 'var(--neon-primary)'}`,
              }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                {copied
                  ? <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  : <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                }
              </svg>
              {copied ? '✓ COPIED!' : 'COPY CODE'}
            </button>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-heading tracking-wider transition-all duration-200 hover:scale-[1.03] border"
              style={{ borderColor: 'var(--glass-border)', color: 'var(--text-primary)' }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" /></svg>
              COPY JSON
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-heading tracking-wider transition-all duration-200 hover:scale-[1.03] border"
              style={{ borderColor: 'var(--glass-border)', color: 'var(--text-primary)' }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
              DOWNLOAD
            </button>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════ */}
      {/* STEP 2: PASTE INTO VS CODE */}
      {/* ═══════════════════════════════════════ */}
      <div className="rounded-xl border overflow-hidden" style={{
        borderColor: 'var(--glass-border)',
        background: 'rgba(255,255,255,0.02)',
      }}>
        <div className="px-5 py-4 border-b" style={{ borderColor: 'var(--glass-border)' }}>
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold shrink-0" style={{
              background: 'var(--neon-primary)', color: '#000',
              boxShadow: '0 0 10px var(--neon-primary)',
            }}>2</span>
            <div>
              <h3 className="text-sm tracking-wider" style={{ fontFamily: 'var(--font-heading)', color: 'var(--neon-primary)' }}>
                PASTE INTO VS CODE
              </h3>
              <p className="text-[10px]" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                Open file → delete all → paste → save
              </p>
            </div>
          </div>
        </div>
        <div className="p-5 space-y-3 text-xs" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
          {[
            { icon: '📂', text: 'Open VS Code → File → Open Folder → select your project' },
            { icon: '📝', text: 'Open: src/data/defaultData.ts' },
            { icon: '🗑️', text: 'Select ALL content (Ctrl+A) → Delete' },
            { icon: '📋', text: 'Paste the code you copied (Ctrl+V)' },
            { icon: '💾', text: 'Save the file (Ctrl+S)' },
          ].map((step, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-sm shrink-0 mt-0.5">{step.icon}</span>
              <span>{step.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════ */}
      {/* STEP 3: REBUILD & PUSH */}
      {/* ═══════════════════════════════════════ */}
      <div className="rounded-xl border overflow-hidden" style={{
        borderColor: 'var(--glass-border)',
        background: 'rgba(255,255,255,0.02)',
      }}>
        <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: 'var(--glass-border)' }}>
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold shrink-0" style={{
              background: 'var(--neon-primary)', color: '#000',
              boxShadow: '0 0 10px var(--neon-primary)',
            }}>3</span>
            <div>
              <h3 className="text-sm tracking-wider" style={{ fontFamily: 'var(--font-heading)', color: 'var(--neon-primary)' }}>
                REBUILD & PUSH
              </h3>
              <p className="text-[10px]" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                Run these commands in VS Code terminal
              </p>
            </div>
          </div>
          <button
            onClick={handleCopyCommands}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-[10px] font-heading tracking-wider transition-all duration-200 hover:scale-105 border"
            style={{ borderColor: 'var(--glass-border)', color: 'var(--text-muted)' }}
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              {cmdCopied
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
              }
            </svg>
            {cmdCopied ? 'COPIED!' : 'COPY ALL'}
          </button>
        </div>
        <div className="p-5">
          <div className="rounded-lg p-4 space-y-1" style={{
            background: 'rgba(0,0,0,0.5)',
            border: '1px solid var(--glass-border)',
            fontFamily: "'Cascadia Code', 'Fira Code', 'Consolas', monospace",
          }}>
            {[
              { cmd: 'npm run build', comment: '// Build the site' },
              { cmd: '', comment: '' },
              { cmd: 'copy public\\404.html dist\\404.html', comment: '// Copy 404 page' },
              { cmd: '', comment: '' },
              { cmd: 'cd dist', comment: '// Enter build folder' },
              { cmd: 'git init', comment: '// Init git' },
              { cmd: 'git add .', comment: '// Add files' },
              { cmd: 'git commit -m "update portfolio"', comment: '// Commit' },
              { cmd: 'git remote add origin https://github.com/zixoaeyt-collab/Thumbnail-portfolioxd.git', comment: '// Link repo' },
              { cmd: 'git push -f origin HEAD:gh-pages', comment: '// Push to GitHub Pages' },
              { cmd: 'cd ..', comment: '// Back to project root' },
            ].map((line, i) => (
              <div key={i} className="flex items-baseline gap-2">
                {line.cmd ? (
                  <>
                    <span className="text-[10px] opacity-30 select-none shrink-0 w-5">{'>'}</span>
                    <code className="text-[11px]" style={{ color: '#00ff88' }}>{line.cmd}</code>
                  </>
                ) : (
                  <div className="h-1" />
                )}
              </div>
            ))}
          </div>
          <p className="text-[10px] mt-3" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            💡 Run each command one at a time. Wait for each to finish before the next.
          </p>
        </div>
      </div>

      {/* ═══════════════════════════════════════ */}
      {/* IMPORT SECTION */}
      {/* ═══════════════════════════════════════ */}
      <div className="rounded-xl border overflow-hidden" style={{
        borderColor: 'var(--glass-border)',
        background: 'rgba(255,255,255,0.02)',
      }}>
        <div className="px-5 py-4 border-b" style={{ borderColor: 'var(--glass-border)' }}>
          <div className="flex items-center gap-3">
            <span className="text-base">📥</span>
            <div>
              <h3 className="text-sm tracking-wider" style={{ fontFamily: 'var(--font-heading)', color: 'var(--neon-primary)' }}>
                IMPORT DATA
              </h3>
              <p className="text-[10px]" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                Restore previously exported data on this or any device
              </p>
            </div>
          </div>
        </div>
        <div className="p-5">
          {!showImportArea ? (
            <div className="flex gap-3 items-center flex-wrap">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-heading tracking-wider transition-all duration-200 hover:scale-[1.03] border"
                style={{ borderColor: 'var(--glass-border)', color: 'var(--text-primary)' }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                UPLOAD JSON FILE
              </button>
              <button
                onClick={() => setShowImportArea(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-heading tracking-wider transition-all duration-200 hover:scale-[1.03] border"
                style={{ borderColor: 'var(--glass-border)', color: 'var(--text-primary)' }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>
                PASTE JSON
              </button>
              <input ref={fileInputRef} type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
            </div>
          ) : (
            <div className="space-y-3">
              <textarea
                value={importText}
                onChange={e => setImportText(e.target.value)}
                placeholder='Paste your JSON data here...'
                rows={6}
                className="w-full rounded-lg border p-3 text-xs font-mono resize-none focus:outline-none"
                style={{
                  borderColor: 'var(--glass-border)',
                  background: 'rgba(0,0,0,0.3)',
                  color: 'var(--text-primary)',
                }}
              />
              <div className="flex gap-3">
                <button
                  onClick={handleImport}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-heading tracking-wider transition-all duration-200 hover:scale-[1.03]"
                  style={{
                    background: 'var(--neon-primary)',
                    color: '#000',
                    boxShadow: '0 0 20px var(--neon-primary)',
                  }}
                >
                  APPLY DATA
                </button>
                <button
                  onClick={() => { setShowImportArea(false); setImportText(''); }}
                  className="px-4 py-2.5 rounded-lg text-xs border transition-all duration-200 hover:scale-[1.03]"
                  style={{ borderColor: 'var(--glass-border)', color: 'var(--text-muted)' }}
                >
                  CANCEL
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Data Summary */}
      <div className="p-4 rounded-xl border" style={{
        borderColor: 'var(--glass-border)',
        background: 'rgba(255,255,255,0.02)',
      }}>
        <h3 className="text-[10px] tracking-[2px] mb-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-muted)' }}>
          📊 CURRENT DATA
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { label: 'Name', value: data.name },
            { label: 'Thumbnails', value: data.thumbnails.length },
            { label: 'Skills', value: data.skills.length },
            { label: 'Socials', value: data.contact.socials.length },
          ].map((stat, i) => (
            <div key={i} className="p-2.5 rounded-lg text-center" style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)' }}>
              <p className="text-[9px] tracking-wider" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{stat.label}</p>
              <p className="text-sm font-bold mt-0.5 truncate" style={{ color: 'var(--neon-primary)', fontFamily: 'var(--font-heading)' }}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ====== REUSABLE COMPONENTS ======

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div>
      <h2 className="text-sm md:text-base tracking-[3px] font-heading mb-1"
        style={{ fontFamily: 'var(--font-heading)', color: 'var(--neon-primary)', textShadow: '0 0 8px var(--neon-primary)' }}>
        {title}
      </h2>
      <p className="text-[10px] tracking-widest" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
        [{subtitle.toUpperCase()}]
      </p>
      <div className="h-px mt-3 w-full" style={{ background: 'linear-gradient(90deg, var(--neon-primary), var(--glass-border), transparent)' }} />
    </div>
  );
}

function FormField({ label, helper, children }: { label: string; helper?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-[10px] tracking-[3px] block mb-2 font-heading" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-muted)' }}>
        {label}
      </label>
      {children}
      {helper && <div className="mt-1.5 text-[10px]" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{helper}</div>}
    </div>
  );
}

function PreviewCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-6 rounded-lg border text-center" style={{ borderColor: 'var(--glass-border)', background: 'rgba(0,0,0,0.3)' }}>
      {children}
    </div>
  );
}

function StatCard({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="p-4 rounded-lg border text-center transition-all duration-200 hover:border-opacity-60"
      style={{ borderColor: 'var(--glass-border)', background: 'rgba(255,255,255,0.02)' }}>
      <div className="flex justify-center mb-2" style={{ color: 'var(--neon-primary)', filter: 'drop-shadow(0 0 4px var(--neon-primary))' }}>
        {icon}
      </div>
      <p className="text-lg font-heading" style={{ fontFamily: 'var(--font-heading)', color: 'var(--neon-primary)' }}>{value}</p>
      <p className="text-[9px] tracking-[2px] mt-1" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{label}</p>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="py-12 text-center" style={{ color: 'var(--text-muted)' }}>
      <svg className="w-10 h-10 mx-auto mb-3 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
      </svg>
      <p className="text-[10px] tracking-widest" style={{ fontFamily: 'var(--font-mono)' }}>{message}</p>
    </div>
  );
}

function PlatformIcon({ icon }: { icon: string }) {
  const iconMap: Record<string, React.ReactNode> = {
    instagram: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>,
    twitter: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
    youtube: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
    github: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>,
    discord: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/></svg>,
    behance: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.61.41.28.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.338.5-.837.9-1.502 1.22.906.26 1.576.72 2.022 1.37.448.66.665 1.45.665 2.36 0 .75-.13 1.39-.41 1.93-.28.55-.67 1-1.16 1.35-.48.348-1.05.6-1.67.767-.63.16-1.3.25-2.01.25H0V4.51h6.938v-.007zM6.545 10.16c.6 0 1.09-.15 1.47-.45.38-.3.57-.73.57-1.29 0-.31-.06-.56-.16-.76-.11-.2-.25-.36-.43-.48-.18-.12-.39-.2-.63-.25-.24-.05-.5-.08-.78-.08H3.41v3.31h3.135zm.185 5.58c.3 0 .58-.03.84-.1.26-.06.48-.17.67-.32.19-.15.34-.35.44-.61.11-.26.16-.58.16-.97 0-.78-.22-1.35-.66-1.7-.44-.35-1.01-.53-1.72-.53H3.41v4.23h3.32zM15.35 4.14h5.73v1.64h-5.73V4.14zm2.865 5.04c.64 0 1.17.13 1.59.39.42.26.71.62.89 1.07.17.45.26.94.26 1.47 0 .48-.08.92-.25 1.3-.17.39-.42.72-.76.99-.34.27-.75.46-1.24.58-.48.12-1.03.18-1.65.18-.45 0-.87-.04-1.27-.13-.39-.08-.73-.21-1.02-.37-.29-.17-.53-.38-.72-.64-.18-.26-.31-.56-.38-.89h2.55c.07.27.19.49.36.67.17.17.39.3.65.38.27.08.56.12.88.12.53 0 .94-.14 1.22-.43.28-.29.43-.65.43-1.09 0-.32-.08-.59-.23-.82-.16-.23-.39-.4-.69-.53-.3-.12-.67-.2-1.11-.23-.44-.03-.92-.05-1.43-.05-.45 0-.87.03-1.27.09v-1.82c.32-.05.7-.09 1.13-.12.43-.03.86-.05 1.28-.05.4 0 .76.02 1.07.05.32.03.59.08.82.15.23.07.42.16.56.27.14.11.24.24.3.4h-1.99c.03-.19.01-.38-.07-.57-.08-.19-.22-.35-.42-.48-.2-.13-.46-.22-.77-.27-.31-.05-.68-.08-1.1-.08h-.01z"/></svg>,
    tiktok: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.49a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.48 6.3 6.3 0 001.86-4.49V8.73a8.26 8.26 0 004.85 1.56V6.84a4.84 4.84 0 01-1.13-.15z"/></svg>,
    linkedin: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
    twitch: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/></svg>,
  };
  return <span style={{ color: 'var(--text-secondary)' }}>{iconMap[icon] || <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.06a4.5 4.5 0 00-1.242-7.244l-4.5-4.5a4.5 4.5 0 00-6.364 6.364L4.34 8.19" /></svg>}</span>;
}

function MobileSidebar({ activeTab, setActiveTab, onReset, onClose }: { activeTab: TabKey; setActiveTab: (t: TabKey) => void; onReset: () => void; onClose: () => void }) {
  return (
    <>
      <div className="px-4 py-4 border-b mb-2" style={{ borderColor: 'var(--glass-border)' }}>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded flex items-center justify-center" style={{ background: 'var(--neon-primary)' }}>
            <svg className="w-3.5 h-3.5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <span className="text-[10px] tracking-[3px] font-heading" style={{ color: 'var(--neon-primary)', fontFamily: 'var(--font-heading)' }}>
            ADMIN CONSOLE
          </span>
        </div>
      </div>
      <nav className="flex-1 space-y-0.5 overflow-y-auto">
        {TABS.map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all"
            style={{
              background: activeTab === tab.key ? 'rgba(255,255,255,0.04)' : 'transparent',
              borderLeft: activeTab === tab.key ? '3px solid var(--neon-primary)' : '3px solid transparent',
              color: activeTab === tab.key ? 'var(--neon-primary)' : 'var(--text-muted)',
            }}>
            {tab.icon}
            <span className="text-[11px] font-heading tracking-[1.5px]" style={{ fontFamily: 'var(--font-heading)' }}>{tab.label}</span>
          </button>
        ))}
      </nav>
      <div className="pt-3 border-t mt-2 space-y-2" style={{ borderColor: 'var(--glass-border)' }}>
        <button onClick={() => { onReset(); setActiveTab('identity'); }}
          className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-[10px] font-heading tracking-[1.5px]"
          style={{ color: '#ff5555', border: '1px solid rgba(255,85,85,0.2)' }}>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>
          RESET ALL
        </button>
        <button onClick={onClose}
          className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-[10px] font-heading tracking-[1.5px]"
          style={{ color: 'var(--text-muted)', border: '1px solid var(--glass-border)' }}>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          CLOSE
        </button>
      </div>
    </>
  );
}

export default AdminPanel;
