import React from 'react';
import HeroSection from '@/components/landing/HeroSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import ForParentsSection from '@/components/landing/ForParentsSection';
import PreviewSection from '@/components/landing/PreviewSection';

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <ForParentsSection />
      <PreviewSection />
      
      {/* Additional sections will be implemented in Task 4.0+ */}
      {/* - Final CTA Section */}
      {/* - FAQ Section */}
      {/* - Footer */}
    </main>
  );
}

