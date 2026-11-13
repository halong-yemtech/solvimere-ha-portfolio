// Plain, serializable shapes the site renders. Built on the server from the
// CMS (lib/site.ts) and handed to client components through <SiteProvider>.

export interface SiteImage {
  url: string;
  alt: string;
}

export interface SocialLinkData {
  id: number;
  label: string;
  url: string;
  icon: string;
  color: string;
  info: string;
}

export interface ServiceData {
  id: number;
  title: string;
  icon: string;
  description: string;
}

export interface PricingPlanData {
  id: number;
  name: string;
  icon: string;
  price: number;
  period: string;
  orderUrl: string;
  features: { id: string; feature: string; included: boolean }[];
}

export interface ClientData {
  id: number;
  name: string;
  url: string;
  icon: string | null;
  logo: SiteImage | null;
}

export interface TestimonialData {
  id: number | string;
  quote: string;
  name: string;
  role: string;
  photo: SiteImage | null;
}

export interface FactData {
  id: number;
  icon: string;
  description: string;
}

export interface StatisticData {
  id: number;
  title: string;
  value: string;
  link: string | null;
}

export interface ResumeEntryData {
  id: number;
  type: "experience" | "education";
  period: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface WorkData {
  id: number;
  title: string;
  images: SiteImage[];
  categories: string[];
  description: string;
  client: string;
  owner: string;
  date: string | null;
  projectUrl: string | null;
  githubUrl: string | null;
  techStack: string[];
  highlights: string[];
}

export interface PercentSkill {
  id: string;
  name: string;
  percent: number;
}

export interface SkillsData {
  coding: PercentSkill[];
  knowledge: string[];
  development: PercentSkill[];
  languages: { id: string; name: string; level: number }[];
}

export interface ProfileData {
  name: string;
  jobTitle: string;
  typingTitles: string[];
  avatar: SiteImage | null;
  backgroundImages: SiteImage[];
  cvUrl: string | null;
  hireLink: { label: string; url: string; icon: string } | null;
  copyright: string;
  bio: string;
  age: string;
  residence: string;
  status: string;
  address: string;
  email: string;
  phone: string;
  phoneLink: string | null;
  mapEmbedUrl: string | null;
  quote: TestimonialData | null;
  blog: { intro: string; buttonLabel: string; buttonUrl: string | null };
  metaDescription: string;
}

export interface SiteData {
  profile: ProfileData;
  socialLinks: SocialLinkData[];
  services: ServiceData[];
  pricingPlans: PricingPlanData[];
  clients: ClientData[];
  testimonials: TestimonialData[];
  facts: FactData[];
  statistics: StatisticData[];
  resume: ResumeEntryData[];
  skills: SkillsData;
  workCategories: string[];
  works: WorkData[];
}

export interface GuestbookComment {
  id: number;
  name: string;
  comment: string;
  createdAt: string;
}
