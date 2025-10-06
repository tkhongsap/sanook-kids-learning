import React from 'react';
import FeatureCard from '@/components/ui/FeatureCard';
import { Feature } from '@/types/landing';

export default function FeaturesSection() {
  const features: Feature[] = [
    {
      id: 'curriculum-aligned',
      icon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>`,
      title: 'สอดคล้องหลักสูตรไทย',
      description: 'เนื้อหาตรงตามหลักสูตรแกนกลางการศึกษาขั้นพื้นฐาน กระทรวงศึกษาธิการ',
    },
    {
      id: 'mastery-learning',
      icon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>`,
      title: 'เรียนรู้ด้วยการพิชิต',
      description: 'ต้องเข้าใจจริง ไม่ใช่แค่จำ - ได้แรงบันดาลใจจาก Khan Academy',
    },
    {
      id: 'short-videos',
      icon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>`,
      title: 'วิดีโอสั้น เข้าใจง่าย',
      description: 'วิดีโอสอนภาษาไทย ไม่เกิน 7 นาที เข้าใจง่าย จดจ่อได้',
    },
    {
      id: 'unlimited-practice',
      icon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>`,
      title: 'ฝึกฝนได้ไม่จำกัด',
      description: 'ลองใหม่ได้เรื่อยๆ จนกว่าจะเข้าใจ ไม่มีค่าใช้จ่ายเพิ่ม',
    },
    {
      id: 'progress-tracking',
      icon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>`,
      title: 'ติดตามความก้าวหน้า',
      description: 'เห็นผลการเรียนของคุณบนทุกอุปกรณ์ ทุกที่ ทุกเวลา',
    },
    {
      id: 'free',
      icon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`,
      title: 'ฟรี 100%',
      description: 'ไม่มีค่าใช้จ่าย ไม่มีโฆษณา ไม่ต้องใช้บัตรเครดิต',
    },
  ];

  return (
    <section className="bg-gray-50 section-padding">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            ทำไมต้อง <span className="text-primary">Sanook Kids Learning</span>?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            แพลตฟอร์มการเรียนรู้ที่ออกแบบมาเพื่อนักเรียนไทยโดยเฉพาะ
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center bg-white px-6 py-4 rounded-lg shadow-md">
            <svg className="w-6 h-6 text-primary mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-700">
              ได้แรงบันดาลใจจาก{' '}
              <a
                href="https://www.khanacademy.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-medium hover:underline"
              >
                Khan Academy
              </a>
              {' '}แต่ออกแบบสำหรับนักเรียนไทยโดยเฉพาะ
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

