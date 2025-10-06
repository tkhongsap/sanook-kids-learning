'use client';

import React, { useState } from 'react';
import SocialSignInButton from '@/components/ui/SocialSignInButton';

export default function CTASection() {
  const [googleLoading, setGoogleLoading] = useState(false);
  const [facebookLoading, setFacebookLoading] = useState(false);

  const handleGoogleSignIn = () => {
    setGoogleLoading(true);
    // TODO: Implement OAuth flow in PRD 0001
    console.log('Google sign-in clicked from CTA section');
    setTimeout(() => setGoogleLoading(false), 2000);
  };

  const handleFacebookSignIn = () => {
    setFacebookLoading(true);
    // TODO: Implement OAuth flow in PRD 0001
    console.log('Facebook sign-in clicked from CTA section');
    setTimeout(() => setFacebookLoading(false), 2000);
  };

  return (
    <section className="relative bg-gradient-to-br from-primary to-primary-dark text-white section-padding overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            พร้อมที่จะเริ่มเรียนแล้วหรือยัง?
          </h2>

          {/* Subtext */}
          <p className="text-xl md:text-2xl text-white/90 mb-8">
            ลงทะเบียนฟรี เริ่มเรียนได้ทันที
          </p>

          {/* Additional benefits */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-10 text-white/80">
            <div className="flex items-center">
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">ฟรี 100%</span>
            </div>
            <div className="flex items-center">
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">ไม่ต้องใช้บัตรเครดิต</span>
            </div>
            <div className="flex items-center">
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">เริ่มได้ทันที</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <SocialSignInButton
              provider="google"
              onClick={handleGoogleSignIn}
              loading={googleLoading}
              className="shadow-xl hover:shadow-2xl"
            />
            <SocialSignInButton
              provider="facebook"
              onClick={handleFacebookSignIn}
              loading={facebookLoading}
              className="shadow-xl hover:shadow-2xl"
            />
          </div>

          {/* Small text */}
          <p className="mt-8 text-sm text-white/70">
            ลงทะเบียนฟรี ไม่มีค่าใช้จ่ายแอบแฝง
          </p>
        </div>
      </div>
    </section>
  );
}

