export type ThemeName = 'red' | 'purple' | 'blue';

export interface ThemeConfig {
  name: ThemeName;
  label: string;
  primary: string;
  secondary: string;
}

export interface Thumbnail {
  id: string;
  title: string;
  imageUrl: string;
  viewCount: number;
  description?: string;
}

export interface Skill {
  id: string;
  name: string;
  percentage: number;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  socials: SocialLink[];
}

export interface PortfolioData {
  name: string;
  tagline: string;
  logoUrl: string;
  thumbnails: Thumbnail[];
  skills: Skill[];
  contact: ContactInfo;
}

export interface BootLog {
  text: string;
  delay: number;
  type?: 'info' | 'success' | 'warning' | 'error';
}
