import React from 'react';
import StepCard from '@/components/ui/StepCard';
import Button from '@/components/ui/Button';
import { Step } from '@/types/landing';

export default function HowItWorksSection() {
  const steps: Step[] = [
    {
      number: 1,
      icon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>`,
      title: 'ลงทะเบียนฟรี',
      description: 'ใช้บัญชี Google หรือ Facebook ของคุณ ไม่ต้องใช้บัตรเครดิต',
    },
    {
      number: 2,
      icon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>`,
      title: 'เลือกชั้นเรียน',
      description: 'เลือก ป.4 หรือ ป.6 เพื่อดูเนื้อหาที่เหมาะกับคุณ',
    },
    {
      number: 3,
      icon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`,
      title: 'เริ่มเรียน',
      description: 'ดูวิดีโอ ทำแบบฝึกหัด และพิชิตบทเรียนทีละบทเรียน',
    },
  ];

  const handleCTAClick = () => {
    // Scroll to hero section (where sign-in buttons are)
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="bg-white section-padding">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            ใช้งานง่าย <span className="text-primary">เพียง 3 ขั้นตอน</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            เริ่มต้นการเรียนรู้ของคุณได้ทันที ไม่ซับซ้อน
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mb-12">
          {steps.map((step) => (
            <StepCard key={step.number} step={step} />
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button
            variant="primary"
            size="lg"
            onClick={handleCTAClick}
            className="px-12"
          >
            เริ่มเรียนเลย
          </Button>
        </div>
      </div>
    </section>
  );
}

