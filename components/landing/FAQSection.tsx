'use client';

import React, { useState } from 'react';
import { FAQ } from '@/types/landing';

export default function FAQSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const faqs: FAQ[] = [
    {
      id: 'cost',
      question: 'ต้องเสียเงินไหม?',
      answer: 'ไม่ ฟรี 100% ตลอดไป ไม่มีค่าใช้จ่ายแอบแฝง ไม่ต้องใช้บัตรเครดิต',
    },
    {
      id: 'subjects',
      question: 'มีเนื้อหาวิชาอะไรบ้าง?',
      answer: 'ปัจจุบันมีคณิตศาสตร์และวิทยาศาสตร์สำหรับ ป.4 และ ป.6 ในอนาคตจะเพิ่มวิชาอื่นๆ และระดับชั้นอื่นๆ',
    },
    {
      id: 'age',
      question: 'เหมาะกับลูกอายุเท่าไหร่?',
      answer: 'เหมาะสำหรับนักเรียนชั้น ป.4 (อายุ 9-10 ปี) และ ป.6 (อายุ 11-12 ปี) แต่ใครอยากเรียนก็สามารถเรียนได้',
    },
    {
      id: 'curriculum',
      question: 'สอดคล้องกับหลักสูตรโรงเรียนไหม?',
      answer: 'ใช่ เนื้อหาทั้งหมดสอดคล้องกับหลักสูตรแกนกลางการศึกษาขั้นพื้นฐาน พุทธศักราช 2551 ของกระทรวงศึกษาธิการ',
    },
    {
      id: 'devices',
      question: 'ต้องใช้อุปกรณ์อะไร?',
      answer: 'ใช้ได้ทั้งคอมพิวเตอร์ แท็บเล็ต หรือสมาร์ทโฟน ขอแค่มีอินเทอร์เน็ต เข้าผ่านเว็บเบราว์เซอร์ได้เลย',
    },
  ];

  const toggleFAQ = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleKeyPress = (event: React.KeyboardEvent, id: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleFAQ(id);
    }
  };

  return (
    <section className="bg-white section-padding">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            คำถามที่พบบ่อย (FAQ)
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            คำตอบสำหรับคำถามที่ผู้ปกครองและนักเรียนมักจะถาม
          </p>
        </div>

        {/* FAQ List */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq) => {
            const isExpanded = expandedId === faq.id;

            return (
              <div
                key={faq.id}
                className="bg-gray-50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md"
              >
                {/* Question Button */}
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  onKeyDown={(e) => handleKeyPress(e, faq.id)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-xl"
                  aria-expanded={isExpanded}
                  aria-controls={`faq-answer-${faq.id}`}
                >
                  <span className="text-lg font-semibold text-gray-900 pr-8">
                    {faq.question}
                  </span>
                  <svg
                    className={`flex-shrink-0 w-6 h-6 text-primary transition-transform duration-300 ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Answer */}
                <div
                  id={`faq-answer-${faq.id}`}
                  className={`transition-all duration-300 ease-in-out ${
                    isExpanded
                      ? 'max-h-96 opacity-100'
                      : 'max-h-0 opacity-0 overflow-hidden'
                  }`}
                >
                  <div className="px-6 pb-5">
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Help */}
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            มีคำถามอื่นๆ?{' '}
            <span className="text-primary font-medium">
              ติดต่อเราได้ทุกเมื่อ
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

