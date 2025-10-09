import { getServerSession } from '@/lib/session';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect('/');
  }

  const user = session.user;
  const gradeLevels = user.gradeLevels || [];
  
  const gradeTexts = gradeLevels.map(grade => 
    grade === 'GRADE_4' ? 'ป.4' : 'ป.6'
  ).join(', ');

  return (
    <div className="container-custom section-padding">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            ยินดีต้อนรับ {user.name}! 👋
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            คุณกำลังเรียน{' '}
            <span className="font-bold text-primary">
              {gradeLevels.length > 1 ? `ชั้น ${gradeTexts}` : `ชั้น ${gradeTexts}`}
            </span>
          </p>
          
          <div className="border-t border-gray-200 pt-6">
            <p className="text-gray-600 mb-4">
              ระบบการเรียนรู้กำลังจะพร้อมในเร็วๆ นี้! 🚀
            </p>
            <p className="text-sm text-gray-500">
              ขอบคุณที่เป็นส่วนหนึ่งของ Sanook Kids Learning
            </p>
          </div>
        </div>

        {gradeLevels.map((grade) => {
          const gradeText = grade === 'GRADE_4' ? 'ป.4' : 'ป.6';
          
          return (
            <div key={grade} className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                เนื้อหาสำหรับ{gradeText}
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-primary-light/20 rounded-lg flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">คณิตศาสตร์</h3>
                  </div>
                  <p className="text-gray-600">เนื้อหาและแบบฝึกหัดคณิตศาสตร์สำหรับชั้น {gradeText}</p>
                  <div className="mt-4 text-sm text-gray-500">กำลังพัฒนา...</div>
                </div>

                <div className="bg-white rounded-xl shadow p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-secondary-light/20 rounded-lg flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">วิทยาศาสตร์</h3>
                  </div>
                  <p className="text-gray-600">เนื้อหาและแบบฝึกหัดวิทยาศาสตร์สำหรับชั้น {gradeText}</p>
                  <div className="mt-4 text-sm text-gray-500">กำลังพัฒนา...</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
