'use client';

import { useState, useCallback } from 'react';
import { initiateOAuthSignIn, getAuthErrorMessage, type AuthProvider, type AuthError } from '@/lib/auth';
import { trackSignUpStarted, trackSignUpCompleted, trackError } from '@/lib/analytics';

export interface UseAuthReturn {
  loading: { google: boolean; facebook: boolean };
  error: string | null;
  signIn: (provider: AuthProvider) => Promise<void>;
  clearError: () => void;
}

/**
 * Custom hook for handling OAuth authentication
 * Manages loading states, errors, and sign-in flow for all CTAs
 * 
 * Usage:
 * const { loading, error, signIn, clearError } = useAuth();
 * 
 * <button onClick={() => signIn('google')} disabled={loading.google}>
 *   {loading.google ? 'กำลังโหลด...' : 'ลงชื่อเข้าใช้ด้วย Google'}
 * </button>
 */
export function useAuth(): UseAuthReturn {
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingFacebook, setLoadingFacebook] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signIn = useCallback(async (provider: AuthProvider) => {
    // Clear any previous errors
    setError(null);

    // Set loading state for the specific provider
    if (provider === 'google') {
      setLoadingGoogle(true);
    } else {
      setLoadingFacebook(true);
    }

    try {
      // Track sign-up started event
      trackSignUpStarted(provider);

      // Initiate OAuth sign-in flow
      await initiateOAuthSignIn(provider);

      // Track successful sign-up
      trackSignUpCompleted(provider);
      console.log(`[Auth Hook] Sign-in successful with ${provider}`);

      // TODO: In PRD 0001, redirect to dashboard after successful auth
      // For now, show success in console
      console.log('[Auth Hook] Would redirect to /dashboard');

    } catch (err) {
      // Handle authentication errors
      console.error(`[Auth Hook] Sign-in failed with ${provider}:`, err);

      const authError: AuthError = {
        code: (err as any)?.code || 'auth_failed',
        message: (err as any)?.message || 'Unknown error',
        provider,
      };

      // Set user-friendly error message in Thai
      setError(getAuthErrorMessage(authError));

      // Track error event
      trackError(authError.code, authError.message, provider);

    } finally {
      // Clear loading state
      if (provider === 'google') {
        setLoadingGoogle(false);
      } else {
        setLoadingFacebook(false);
      }
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    loading: {
      google: loadingGoogle,
      facebook: loadingFacebook,
    },
    error,
    signIn,
    clearError,
  };
}

