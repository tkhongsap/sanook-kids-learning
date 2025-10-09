'use client';

import { useState } from 'react';
import { devBypassSignInAction } from '@/app/actions/auth';

interface CredentialsSignInFormProps {
  className?: string;
}

export default function CredentialsSignInForm({ className = '' }: CredentialsSignInFormProps) {
  const [devLoading, setDevLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBypassLogin = async () => {
    setError(null);
    setDevLoading(true);

    try {
      const result = await devBypassSignInAction();
      if (!result.success) {
        setError(result.error || 'เกิดข้อผิดพลาด');
        setDevLoading(false);
        return;
      }

      const redirectTo = result.redirectTo ?? '/auth/grade-selection';
      window.location.href = redirectTo;
    } catch (err) {
      console.error('[CredentialsSignInForm] Dev bypass failed', err);
      setError('เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
      setDevLoading(false);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <button
        type="button"
        onClick={handleBypassLogin}
        disabled={devLoading}
        className="w-full bg-primary hover:bg-primary-dark text-white font-medium px-6 py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center"
      >
        {devLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            กำลังเข้าสู่ระบบ...
          </>
        ) : (
          'Dev Bypass - ไปเลือกชั้นเรียน'
        )}
      </button>
    </div>
  );
}
