'use client';

import React from 'react';
import { SocialSignInButtonProps } from '@/types/landing';

type ProviderKey = SocialSignInButtonProps['provider'];

interface ProviderStyle {
  bg: string;
  text: string;
  border: string;
  icon: React.ReactNode;
  label: string;
}

const providerStyles: Record<ProviderKey, ProviderStyle> = {
  google: {
    bg: 'bg-white hover:bg-gray-50',
    text: 'text-gray-700',
    border: 'border border-gray-300',
    icon: (
      <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          fill="#4285F4"
        />
        <path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          fill="#34A853"
        />
        <path
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          fill="#FBBC05"
        />
        <path
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          fill="#EA4335"
        />
      </svg>
    ),
    label: 'ลงชื่อเข้าใช้ด้วย Google',
  },
  facebook: {
    bg: 'bg-[#1877F2] hover:bg-[#166FE5]',
    text: 'text-white',
    border: 'border-0',
    icon: (
      <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    label: 'ลงชื่อเข้าใช้ด้วย Facebook',
  },
};

export default function SocialSignInButton({
  provider,
  onClick,
  loading = false,
  className = '',
}: SocialSignInButtonProps) {
  const fallbackProvider: ProviderKey = 'google';
  const style = providerStyles[provider] ?? providerStyles[fallbackProvider];

  if (process.env.NODE_ENV !== 'production' && !providerStyles[provider]) {
    console.warn(`[SocialSignInButton] Unsupported provider received: ${provider}`);
  }

  const buttonClasses = [
    style.bg,
    style.text,
    style.border,
    'font-medium px-6 py-3 rounded-lg',
    'transition-all duration-200',
    'shadow-md hover:shadow-lg',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'inline-flex items-center justify-center',
    'min-h-[48px] w-full sm:w-auto',
    className,
  ]
    .filter(Boolean)
    .map((token) => token.trim())
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();

  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={buttonClasses}
      type="button"
    >
      {loading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          กำลังโหลด...
        </>
      ) : (
        <>
          {style.icon}
          <span className="font-medium">{style.label}</span>
        </>
      )}
    </button>
  );
}
