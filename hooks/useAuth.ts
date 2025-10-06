'use client';

import { useState, useCallback } from 'react';
import { initiateOAuthSignIn, getAuthErrorMessage, type AuthProvider, type AuthError } from '@/lib/auth';
import { trackSignUpStarted, trackSignUpCompleted, trackError } from '@/lib/analytics';

export interface UseAuthReturn {
  loading: boolean;
  error: string | null;
  signIn: (provider: AuthProvider) => Promise<void>;
  clearError: () => void;
}

export function useAuth(): UseAuthReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signIn = useCallback(async (provider: AuthProvider) => {
    setError(null);
    setLoading(true);

    try {
      trackSignUpStarted(provider);
      await initiateOAuthSignIn(provider);
      trackSignUpCompleted(provider);
    } catch (err) {
      console.error(`[Auth Hook] Sign-in failed with ${provider}:`, err);

      const authError: AuthError = {
        code: (err as any)?.code || 'auth_failed',
        message: (err as any)?.message || 'Unknown error',
        provider,
      };

      setError(getAuthErrorMessage(authError));
      trackError(authError.code, authError.message, provider);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    loading,
    error,
    signIn,
    clearError,
  };
}

