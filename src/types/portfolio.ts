export interface PersonalInfo {
  name: string;
  designation: string;
  heroGreeting: string;
  heroRole: string;
  heroBio: string;
  aboutStory: string;
  email: string;
  address: string;
  copyright: string;
  avatarUrl: string;
  logoUrl: string;
  socials: {
    platform: string;
    icon: string;
    url: string;
  }[];
}

export interface FactStat {
  number: string;
  label: string;
}

export interface ExperienceItem {
  id: string;
  period: string;
  roles: {
    title: string;
    company: string;
  }[];
}

export interface ServiceItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  projectCount: string;
}

export interface SkillItem {
  id: string;
  name: string;
  percent: number;
  iconUrl: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  slug?: string;
  categories: string[];
  imageUrl: string;
  isWide?: boolean;
  projectUrl?: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  avatarUrl: string;
  quote: string;
  projectUrl?: string;
}

export interface ClientBrand {
  id: string;
  name: string;
  logoUrl: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  unit: string;
  features: string[];
  isPopular?: boolean;
}
