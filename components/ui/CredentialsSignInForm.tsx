'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { credentialsSignInAction } from '@/app/actions/auth';

interface CredentialsSignInFormProps {
  className?: string;
}

export default function CredentialsSignInForm({ className = '' }: CredentialsSignInFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [devLoading, setDevLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isDevEnvironment = process.env.NODE_ENV !== 'production';

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (loading) {
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const result = await credentialsSignInAction(email.trim(), password);

      if (!result?.success) {
        setError(result?.error || 'อีเมลหรือรหัสผ่านไม่ถูกต้อง');
        setLoading(false);
        return;
      }

      const redirectTo = result.redirectTo ?? '/auth/grade-selection';
      window.location.href = redirectTo;
    } catch (err) {
      console.error('[CredentialsSignInForm] Sign-in failed', err);
      setError('เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
      setLoading(false);
    }
  };

  const handleBypassLogin = () => {
    setError(null);
    setDevLoading(true);

    try {
      document.cookie = 'dev-bypass=grade-selection; path=/; max-age=3600';
      router.push('/auth/grade-selection');
    } catch (err) {
      console.error('[CredentialsSignInForm] Dev bypass navigation failed', err);
      setError('เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
      setDevLoading(false);
    }
  };

  const submitDisabled = loading || !email.trim() || !password;

  return (
    <div className={`space-y-4 ${className}`}>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2 text-left">
          <label htmlFor="credentials-email" className="block text-sm font-medium">
            อีเมลหรือชื่อผู้ใช้
          </label>
          <input
            id="credentials-email"
            type="text"
            inputMode="email"
            autoComplete="username"
            placeholder="เช่น tkhongsap"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary/40 outline-none transition-all"
            disabled={loading}
            required
          />
        </div>

        <div className="space-y-2 text-left">
          <label htmlFor="credentials-password" className="block text-sm font-medium">
            รหัสผ่าน
          </label>
          <input
            id="credentials-password"
            type="password"
            autoComplete="current-password"
            placeholder="กรอกรหัสผ่านของคุณ"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary/40 outline-none transition-all"
            disabled={loading}
            required
          />
        </div>

        <button
          type="submit"
          disabled={submitDisabled}
          className="w-full bg-primary hover:bg-primary-dark text-white font-medium px-6 py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              กำลังเข้าสู่ระบบ...
            </>
          ) : (
            'เข้าสู่ระบบ'
          )}
        </button>
      </form>

      {isDevEnvironment && (
        <button
          type="button"
          onClick={handleBypassLogin}
          disabled={devLoading}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium px-6 py-3 rounded-lg transition-all duration-200 shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center"
        >
          {devLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              กำลังเข้าสู่ระบบแบบทดสอบ...
            </>
          ) : (
            'เข้าสู่ระบบแบบ Dev (Bypass)'
          )}
        </button>
      )}
    </div>
  );
}
