'use client';

import React, { useState } from 'react';
import { Screenshot } from '@/types/landing';

export default function PreviewSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const screenshots: Screenshot[] = [
    {
      id: 'dashboard',
      src: '/images/screenshots/dashboard-placeholder.png',
      alt: 'แดชบอร์ดหลัก แสดงวิชาคณิตศาสตร์และวิทยาศาสตร์',
      caption: 'แดชบอร์ดที่เรียบง่าย - เลือกวิชาที่อยากเรียน',
    },
    {
      id: 'lesson',
      src: '/images/screenshots/lesson-placeholder.png',
      alt: 'หน้าบทเรียน แสดงวิดีโอและแบบฝึกหัด',
      caption: 'ดูวิดีโอเรียน แล้วทำแบบฝึกหัด',
    },
    {
      id: 'progress',
      src: '/images/screenshots/progress-placeholder.png',
      alt: 'หน้าแสดงความก้าวหน้า พร้อมเครื่องหมายถูก',
      caption: 'เห็นความก้าวหน้าชัดเจน',
    },
  ];

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white section-padding">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            ดูตัวอย่าง<span className="text-primary">การใช้งาน</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            แพลตฟอร์มที่ใช้งานง่าย สวยงาม และเหมาะกับเด็ก
          </p>
        </div>

        {/* Screenshots Carousel/Grid */}
        <div className="max-w-5xl mx-auto">
          {/* Mobile: Carousel with dots */}
          <div className="block md:hidden">
            <div className="relative">
              {/* Screenshot */}
              <div className="aspect-video bg-gradient-to-br from-primary/20 via-secondary/20 to-primary/20 rounded-xl overflow-hidden shadow-2xl">
                <div className="w-full h-full flex items-center justify-center p-8">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-gray-700 font-medium">
                      {screenshots[activeIndex].caption}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      (Screenshot Placeholder)
                    </p>
                  </div>
                </div>
              </div>

              {/* Dots */}
              <div className="flex justify-center gap-2 mt-6">
                {screenshots.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? 'bg-primary w-8'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`View screenshot ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Desktop: Grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-6">
            {screenshots.map((screenshot, index) => (
              <div key={screenshot.id} className="group">
                <div className="relative aspect-video bg-gradient-to-br from-primary/20 via-secondary/20 to-primary/20 rounded-xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
                  <div className="w-full h-full flex items-center justify-center p-6">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-3 bg-white rounded-full flex items-center justify-center shadow-lg">
                        {index === 0 && (
                          <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                          </svg>
                        )}
                        {index === 1 && (
                          <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                        {index === 2 && (
                          <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">
                        Screenshot {index + 1}
                      </p>
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-center text-gray-700 font-medium">
                  {screenshot.caption}
                </p>
              </div>
            ))}
          </div>

          {/* Note about placeholder */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center bg-yellow-50 border border-yellow-200 px-4 py-3 rounded-lg text-sm text-yellow-800">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Screenshots จะถูกอัปเดตเมื่อระบบพร้อมใช้งาน
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

