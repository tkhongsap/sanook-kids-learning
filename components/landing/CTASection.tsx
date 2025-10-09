'use client';

import React, { useEffect, useState } from 'react';
import SocialSignInButton from '@/components/ui/SocialSignInButton';
import { devBypassSignInAction } from '@/app/actions/auth';
import { useAuth } from '@/hooks/useAuth';
import { trackCTAClick } from '@/lib/analytics';

export default function CTASection() {
  const { loading, error, signIn, clearError } = useAuth();
  const [loginMethod, setLoginMethod] = useState<'google' | 'email'>('google');
  const [emailBypassLoading, setEmailBypassLoading] = useState(false);
  const [emailBypassError, setEmailBypassError] = useState<string | null>(null);

  const handleSignIn = (provider: 'google') => {
    trackCTAClick('final_cta', provider);
    signIn(provider);
  };

  useEffect(() => {
    if (loginMethod !== 'email') {
      return;
    }

    let isMounted = true;

    const bypassLogin = async () => {
      setEmailBypassError(null);
      setEmailBypassLoading(true);

      try {
        const result = await devBypassSignInAction();

        if (!result.success) {
          if (!isMounted) {
            return;
          }

          setEmailBypassError(result.error || 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
          setEmailBypassLoading(false);
          setLoginMethod('google');
          return;
        }

        const redirectTo = result.redirectTo ?? '/auth/grade-selection';

        if (isMounted) {
          window.location.href = redirectTo;
        }
      } catch (err) {
        console.error('[CTASection] Dev bypass failed', err);

        if (!isMounted) {
          return;
        }

        setEmailBypassError('เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
        setEmailBypassLoading(false);
        setLoginMethod('google');
      }
    };

    void bypassLogin();

    return () => {
      isMounted = false;
    };
  }, [loginMethod]);

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

          {/* Login Method Tabs */}
          <div className="max-w-md mx-auto mb-6">
            <div className="flex gap-2">
              <button
                onClick={() => setLoginMethod('google')}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                  loginMethod === 'google'
                    ? 'bg-white text-primary'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
                disabled={emailBypassLoading}
              >
                Google
              </button>
              <button
                onClick={() => {
                  if (!emailBypassLoading) {
                    setLoginMethod('email');
                  }
                }}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                  loginMethod === 'email'
                    ? 'bg-white text-primary'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
                disabled={emailBypassLoading}
              >
                {emailBypassLoading ? 'กำลังเข้าสู่ระบบ...' : 'อีเมล/รหัสผ่าน'}
              </button>
            </div>
          </div>

          {/* CTA Buttons */}
          {loginMethod === 'google' ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <SocialSignInButton
                provider="google"
                onClick={() => handleSignIn('google')}
                loading={loading}
                className="shadow-xl hover:shadow-2xl"
              />
            </div>
          ) : (
            <div className="max-w-md mx-auto bg-white/10 backdrop-blur-sm p-6 rounded-xl text-sm text-white/90">
              <div className="flex items-center justify-center gap-3">
                <svg className="w-5 h-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>กำลังเข้าสู่หน้าเลือกชั้นเรียนสำหรับการทดสอบ...</span>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-900/50 border border-red-700 text-white px-4 py-3 rounded-lg flex items-start max-w-md mx-auto">
              <svg className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div className="flex-1">
                <p className="text-sm">{error}</p>
                <button
                  onClick={clearError}
                  className="text-xs underline hover:no-underline mt-1"
                >
                  ปิด
                </button>
              </div>
            </div>
          )}

          {emailBypassError && (
            <div className="bg-red-900/50 border border-red-700 text-white px-4 py-3 rounded-lg flex items-start max-w-md mx-auto">
              <svg className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="flex-1">
                <p className="text-sm">{emailBypassError}</p>
                <button
                  onClick={() => setEmailBypassError(null)}
                  className="text-xs underline hover:no-underline mt-1"
                >
                  ปิด
                </button>
              </div>
            </div>
          )}

          {/* Small text */}
          <p className="mt-8 text-sm text-white/70">
            ลงทะเบียนฟรี ไม่มีค่าใช้จ่ายแอบแฝง
          </p>
        </div>
      </div>
    </section>
  );
}

