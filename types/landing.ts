// TypeScript interfaces for Landing Page components and data structures

export interface Feature {
  id: string;
  icon: string; // Path to icon or icon component name
  title: string;
  description: string;
}

export interface Step {
  number: number;
  icon: string;
  title: string;
  description: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface Screenshot {
  id: string;
  src: string;
  alt: string;
  caption: string;
}

export interface SocialSignInButtonProps {
  provider: 'google' | 'facebook';
  onClick: () => void;
  loading?: boolean;
  className?: string;
}

export interface FeatureCardProps {
  feature: Feature;
  className?: string;
}

export interface StepCardProps {
  step: Step;
  className?: string;
}

export interface FAQItemProps {
  faq: FAQ;
  isExpanded: boolean;
  onToggle: () => void;
}

