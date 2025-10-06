'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

type GradeOption = 'GRADE_4' | 'GRADE_6';

interface GradeCard {
  grade: GradeOption;
  title: string;
  ageRange: string;
  description: string;
}

export default function GradeSelectionPage() {
  const router = useRouter();
  const [selectedGrade, setSelectedGrade] = useState<GradeOption | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const grades: GradeCard[] = [
    {
      grade: 'GRADE_4',
      title: 'ชั้น ป.4',
      ageRange: 'อายุ 9-10 ปี',
      description: 'คณิตศาสตร์และวิทยาศาสตร์ระดับชั้นประถมศึกษาปีที่ 4',
    },
    {
      grade: 'GRADE_6',
      title: 'ชั้น ป.6',
      ageRange: 'อายุ 11-12 ปี',
      description: 'คณิตศาสตร์และวิทยาศาสตร์ระดับชั้นประถมศึกษาปีที่ 6',
    },
  ];

  const handleGradeSelection = async (grade: GradeOption) => {
    setSelectedGrade(grade);
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/user/grade', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ gradeLevel: grade }),
      });

      if (!response.ok) {
        throw new Error('Failed to update grade level');
      }

      router.push('/dashboard');
      router.refresh();
      
    } catch (err) {
      console.error('Error updating grade:', err);
      setError('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
      setIsLoading(false);
      setSelectedGrade(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-light/10 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            นักเรียนอยู่ชั้นอะไรเอ่ย?
          </h1>
          <p className="text-lg sm:text-xl text-gray-600">
            เลือกระดับชั้นเรียนของคุณเพื่อเริ่มต้นการเรียนรู้
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {grades.map((gradeCard) => (
            <button
              key={gradeCard.grade}
              onClick={() => handleGradeSelection(gradeCard.grade)}
              disabled={isLoading}
              className={`
                relative group p-8 rounded-2xl border-3 transition-all duration-300
                ${selectedGrade === gradeCard.grade
                  ? 'border-primary bg-primary/5 scale-95'
                  : 'border-gray-200 hover:border-primary hover:shadow-xl hover:scale-105'
                }
                ${isLoading && selectedGrade !== gradeCard.grade ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className={`
                  w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold
                  ${selectedGrade === gradeCard.grade
                    ? 'bg-primary text-white'
                    : 'bg-primary-light/20 text-primary group-hover:bg-primary group-hover:text-white'
                  } transition-colors duration-300
                `}>
                  {gradeCard.grade === 'GRADE_4' ? '4' : '6'}
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                    {gradeCard.title}
                  </h2>
                  <p className="text-sm text-gray-500 mb-3">
                    {gradeCard.ageRange}
                  </p>
                  <p className="text-gray-600">
                    {gradeCard.description}
                  </p>
                </div>

                {selectedGrade === gradeCard.grade && isLoading && (
                  <div className="absolute inset-0 bg-white/80 rounded-2xl flex items-center justify-center">
                    <div className="flex flex-col items-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-3"></div>
                      <p className="text-primary font-medium">กำลังบันทึก...</p>
                    </div>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-center">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
