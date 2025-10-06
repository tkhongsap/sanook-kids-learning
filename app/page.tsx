import React from 'react';
import HeroSection from '@/components/landing/HeroSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import ForParentsSection from '@/components/landing/ForParentsSection';
import PreviewSection from '@/components/landing/PreviewSection';
import CTASection from '@/components/landing/CTASection';
import FAQSection from '@/components/landing/FAQSection';
import Footer from '@/components/landing/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <ForParentsSection />
      <PreviewSection />
      <CTASection />
      <FAQSection />
      <Footer />
    </main>
  );
}

