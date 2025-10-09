'use server';

import { signIn } from '@/auth';
import type { SignInResponse } from 'next-auth/react';

export async function signInAction(provider: string) {
  await signIn(provider, { 
    redirectTo: '/auth/grade-selection',
  });
}

export async function credentialsSignInAction(email: string, password: string) {
  console.log('[Server Action] credentialsSignInAction called');
  console.log('[Server Action] Email:', email);
  console.log('[Server Action] Password length:', password?.length);

  try {
    console.log('[Server Action] Calling signIn with credentials...');
    const result = (await signIn('credentials', {
      email,
      password,
      redirect: false,
      redirectTo: '/auth/grade-selection',
    })) as SignInResponse | undefined;
    console.log('[Server Action] signIn successful');
    const redirectTo = result?.url ?? '/auth/grade-selection';
    return { success: true, redirectTo };
  } catch (error) {
    console.error('[Server Action] Credentials sign-in error:', error);
    console.error('[Server Action] Error details:', JSON.stringify(error, null, 2));
    return {
      success: false,
      error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง'
    };
  }
}
