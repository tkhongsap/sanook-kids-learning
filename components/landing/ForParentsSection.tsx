import React from 'react';

export default function ForParentsSection() {
  const parentBenefits = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'ช่วยให้ลูกเข้าใจบทเรียนในโรงเรียนได้ดีขึ้น',
      description: 'เนื้อหาสอดคล้องกับหลักสูตรที่โรงเรียนสอน ลูกสามารถทบทวนและฝึกฝนเพิ่มเติม',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: 'ติดตามความก้าวหน้าของลูกได้ทุกเมื่อ',
      description: 'ระบบบันทึกผลการเรียนอัตโนมัติ คุณเห็นว่าลูกเรียนไปถึงไหนแล้ว',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: 'ปลอดภัย ไม่มีโฆษณา เหมาะสำหรับเด็ก',
      description: 'ออกแบบมาเพื่อเด็กโดยเฉพาะ ไม่มีโฆษณาที่ไม่เหมาะสม เนื้อหาปลอดภัย 100%',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 10V8" />
        </svg>
      ),
      title: 'ไม่ต้องใช้บัตรเครดิต ฟรีตลอดไป',
      description: 'ไม่มีค่าใช้จ่ายแอบแฝง ไม่ต้องกรอกข้อมูลบัตรเครดิต เริ่มเรียนได้ทันที',
    },
  ];

  const trustSignals = [
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
          <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
        </svg>
      ),
      text: 'สอดคล้องกับหลักสูตรแกนกลาง กระทรวงศึกษาธิการ',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      ),
      text: 'ปฏิบัติตาม พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล (PDPA)',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
        </svg>
      ),
      text: 'เข้าถึงได้ทุกที่ ทุกเวลา ทั้งมือถือและคอมพิวเตอร์',
    },
  ];

  return (
    <section className="bg-white section-padding">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-trust-light/10 text-trust px-4 py-2 rounded-full text-sm font-medium mb-4">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
            สำหรับผู้ปกครอง
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            มอบโอกาสที่ดีที่สุด<span className="text-trust">ให้กับลูกของคุณ</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            เราเข้าใจว่าคุณต้องการสิ่งที่ดีที่สุดสำหรับลูก
            <br />
            Sanook Kids Learning ออกแบบมาเพื่อช่วยให้ลูกของคุณประสบความสำเร็จ
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {parentBenefits.map((benefit, index) => (
            <div key={index} className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-trust-light/10 rounded-lg flex items-center justify-center text-trust">
                  {benefit.icon}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Signals */}
        <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            คุณสามารถไว้วางใจเราได้
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {trustSignals.map((signal, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 text-primary mt-1">
                  {signal.icon}
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {signal.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

