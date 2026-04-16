import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { PortfolioData, Thumbnail, Skill, ContactInfo, SocialLink } from '../types';

const defaultPortfolioData: PortfolioData = {
  name: 'NEXUS//GRID',
  tagline: 'DIGITAL FRONTIER DESIGNER',
  logoUrl: '',
  thumbnails: [
    { id: '1', title: 'Neon District', imageUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=600&h=400&fit=crop', viewCount: 12847, description: 'Cyberpunk cityscape illustration' },
    { id: '2', title: 'Chrome Ghost', imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop', viewCount: 9532, description: 'Character design concept' },
    { id: '3', title: 'Data Stream', imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop', viewCount: 7621, description: 'Abstract data visualization' },
    { id: '4', title: 'Synthwave', imageUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=600&h=400&fit=crop', viewCount: 15230, description: 'Retro-futuristic poster design' },
    { id: '5', title: 'Binary Rain', imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop', viewCount: 6891, description: 'Matrix-inspired motion graphics' },
    { id: '6', title: 'Circuit Heart', imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop', viewCount: 11045, description: 'PCB art and circuit design' },
    { id: '7', title: 'Void Runner', imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop', viewCount: 8324, description: 'Sci-fi environment concept' },
    { id: '8', title: 'Phantom UI', imageUrl: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop', viewCount: 13567, description: 'Futuristic interface design' },
    { id: '9', title: 'Neural Link', imageUrl: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=600&h=400&fit=crop', viewCount: 10289, description: 'Brain-computer interface art' },
  ],
  skills: [
    { id: '1', name: 'UI/UX Design', percentage: 95 },
    { id: '2', name: 'Graphic Design', percentage: 92 },
    { id: '3', name: 'Motion Graphics', percentage: 88 },
    { id: '4', name: '3D Modeling', percentage: 82 },
    { id: '5', name: 'Illustration', percentage: 90 },
    { id: '6', name: 'Brand Identity', percentage: 85 },
    { id: '7', name: 'Web Development', percentage: 78 },
    { id: '8', name: 'Typography', percentage: 93 },
  ],
  contact: {
    email: 'nexus@cybergrid.dev',
    phone: '',
    socials: [
      { id: '1', platform: 'Instagram', url: 'https://instagram.com', icon: 'instagram' },
      { id: '2', platform: 'Twitter/X', url: 'https://x.com', icon: 'twitter' },
      { id: '3', platform: 'YouTube', url: 'https://youtube.com', icon: 'youtube' },
      { id: '4', platform: 'GitHub', url: 'https://github.com', icon: 'github' },
      { id: '5', platform: 'Discord', url: 'https://discord.com', icon: 'discord' },
      { id: '6', platform: 'Behance', url: 'https://behance.net', icon: 'behance' },
    ],
  },
};

function loadPortfolio(): PortfolioData {
  const saved = localStorage.getItem('cyber-portfolio');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return defaultPortfolioData;
    }
  }
  return defaultPortfolioData;
}

interface PortfolioContextType {
  data: PortfolioData;
  updateData: (data: PortfolioData) => void;
  updateName: (name: string) => void;
  updateTagline: (tagline: string) => void;
  updateLogo: (logoUrl: string) => void;
  addThumbnail: (thumbnail: Omit<Thumbnail, 'id'>) => void;
  updateThumbnail: (id: string, thumbnail: Partial<Thumbnail>) => void;
  deleteThumbnail: (id: string) => void;
  addSkill: (skill: Omit<Skill, 'id'>) => void;
  updateSkill: (id: string, skill: Partial<Skill>) => void;
  deleteSkill: (id: string) => void;
  updateContact: (contact: Partial<ContactInfo>) => void;
  addSocial: (social: Omit<SocialLink, 'id'>) => void;
  updateSocial: (id: string, social: Partial<SocialLink>) => void;
  deleteSocial: (id: string) => void;
  resetToDefaults: () => void;
}

const PortfolioContext = createContext<PortfolioContextType>({
  data: defaultPortfolioData,
  updateData: () => {},
  updateName: () => {},
  updateTagline: () => {},
  updateLogo: () => {},
  addThumbnail: () => {},
  updateThumbnail: () => {},
  deleteThumbnail: () => {},
  addSkill: () => {},
  updateSkill: () => {},
  deleteSkill: () => {},
  updateContact: () => {},
  addSocial: () => {},
  updateSocial: () => {},
  deleteSocial: () => {},
  resetToDefaults: () => {},
});

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(loadPortfolio);

  useEffect(() => {
    localStorage.setItem('cyber-portfolio', JSON.stringify(data));
  }, [data]);

  const updateData = useCallback((newData: PortfolioData) => setData(newData), []);
  const updateName = useCallback((name: string) => setData(prev => ({ ...prev, name })), []);
  const updateTagline = useCallback((tagline: string) => setData(prev => ({ ...prev, tagline })), []);
  const updateLogo = useCallback((logoUrl: string) => setData(prev => ({ ...prev, logoUrl })), []);

  const addThumbnail = useCallback((thumbnail: Omit<Thumbnail, 'id'>) => {
    setData(prev => ({
      ...prev,
      thumbnails: [...prev.thumbnails, { ...thumbnail, id: Date.now().toString() }],
    }));
  }, []);

  const updateThumbnail = useCallback((id: string, thumbnail: Partial<Thumbnail>) => {
    setData(prev => ({
      ...prev,
      thumbnails: prev.thumbnails.map(t => t.id === id ? { ...t, ...thumbnail } : t),
    }));
  }, []);

  const deleteThumbnail = useCallback((id: string) => {
    setData(prev => ({
      ...prev,
      thumbnails: prev.thumbnails.filter(t => t.id !== id),
    }));
  }, []);

  const addSkill = useCallback((skill: Omit<Skill, 'id'>) => {
    setData(prev => ({
      ...prev,
      skills: [...prev.skills, { ...skill, id: Date.now().toString() }],
    }));
  }, []);

  const updateSkill = useCallback((id: string, skill: Partial<Skill>) => {
    setData(prev => ({
      ...prev,
      skills: prev.skills.map(s => s.id === id ? { ...s, ...skill } : s),
    }));
  }, []);

  const deleteSkill = useCallback((id: string) => {
    setData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s.id !== id),
    }));
  }, []);

  const updateContact = useCallback((contact: Partial<ContactInfo>) => {
    setData(prev => ({ ...prev, contact: { ...prev.contact, ...contact } }));
  }, []);

  const addSocial = useCallback((social: Omit<SocialLink, 'id'>) => {
    setData(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        socials: [...prev.contact.socials, { ...social, id: Date.now().toString() }],
      },
    }));
  }, []);

  const updateSocial = useCallback((id: string, social: Partial<SocialLink>) => {
    setData(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        socials: prev.contact.socials.map(s => s.id === id ? { ...s, ...social } : s),
      },
    }));
  }, []);

  const deleteSocial = useCallback((id: string) => {
    setData(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        socials: prev.contact.socials.filter(s => s.id !== id),
      },
    }));
  }, []);

  const resetToDefaults = useCallback(() => {
    setData(defaultPortfolioData);
    localStorage.removeItem('cyber-portfolio');
  }, []);

  return (
    <PortfolioContext.Provider value={{
      data, updateData, updateName, updateTagline, updateLogo,
      addThumbnail, updateThumbnail, deleteThumbnail,
      addSkill, updateSkill, deleteSkill,
      updateContact, addSocial, updateSocial, deleteSocial,
      resetToDefaults,
    }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => useContext(PortfolioContext);
