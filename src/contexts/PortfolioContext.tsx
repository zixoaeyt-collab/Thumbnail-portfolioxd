import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { PortfolioData, Thumbnail, Skill, ContactInfo, SocialLink } from '../types';
import { defaultPortfolioData } from '../data/defaultData';

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
  exportData: () => string;
  importData: (jsonString: string) => boolean;
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
  exportData: () => '',
  importData: () => false,
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

  const exportData = useCallback(() => {
    return JSON.stringify(data, null, 2);
  }, [data]);

  const importData = useCallback((jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.name && parsed.thumbnails && parsed.skills && parsed.contact) {
        setData(parsed);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }, []);

  return (
    <PortfolioContext.Provider value={{
      data, updateData, updateName, updateTagline, updateLogo,
      addThumbnail, updateThumbnail, deleteThumbnail,
      addSkill, updateSkill, deleteSkill,
      updateContact, addSocial, updateSocial, deleteSocial,
      resetToDefaults, exportData, importData,
    }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => useContext(PortfolioContext);
