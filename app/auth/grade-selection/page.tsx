'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

type GradeOption = 'GRADE_4' | 'GRADE_6';

interface GradeCard {
  grade: GradeOption;
  title: string;
  ageRange: string;
  description: string;
}

export default function GradeSelectionPage() {
  const router = useRouter();
  const { update } = useSession();
  const [selectedGrades, setSelectedGrades] = useState<GradeOption[]>([]);
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

  const toggleGrade = (grade: GradeOption) => {
    setSelectedGrades(prev => {
      if (prev.includes(grade)) {
        return prev.filter(g => g !== grade);
      } else {
        return [...prev, grade];
      }
    });
  };

  const handleSubmit = async () => {
    if (selectedGrades.length === 0) {
      setError('กรุณาเลือกระดับชั้นเรียนอย่างน้อย 1 ชั้น');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/user/grade', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ gradeLevels: selectedGrades }),
      });

      if (!response.ok) {
        throw new Error('Failed to update grade levels');
      }

      await update({ gradeLevels: selectedGrades });
      
      window.location.href = '/dashboard';
      
    } catch (err) {
      console.error('Error updating grades:', err);
      setError('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-light/10 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            เลือกระดับชั้นที่สนใจ
          </h1>
          <p className="text-lg sm:text-xl text-gray-600">
            เลือกได้มากกว่า 1 ชั้นเพื่อเรียนรู้เนื้อหาที่คุณสนใจ
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {grades.map((gradeCard) => {
            const isSelected = selectedGrades.includes(gradeCard.grade);
            
            return (
              <button
                key={gradeCard.grade}
                onClick={() => toggleGrade(gradeCard.grade)}
                disabled={isLoading}
                className={`
                  relative group p-8 rounded-2xl border-3 transition-all duration-300
                  ${isSelected
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-primary hover:shadow-xl'
                  }
                  ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-105'}
                  disabled:opacity-50 disabled:cursor-not-allowed
                `}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className={`
                    w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold
                    ${isSelected
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

                  {isSelected && (
                    <div className="absolute top-4 right-4">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex flex-col items-center gap-4">
          <button
            onClick={handleSubmit}
            disabled={isLoading || selectedGrades.length === 0}
            className="w-full max-w-md bg-primary hover:bg-primary-dark text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                กำลังบันทึก...
              </>
            ) : (
              `ดำเนินการต่อ ${selectedGrades.length > 0 ? `(เลือก ${selectedGrades.length} ชั้น)` : ''}`
            )}
          </button>

          {selectedGrades.length > 0 && (
            <p className="text-sm text-gray-500">
              คุณสามารถเปลี่ยนแปลงระดับชั้นได้ในภายหลัง
            </p>
          )}
        </div>

        {error && (
          <div className="mt-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-center">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
