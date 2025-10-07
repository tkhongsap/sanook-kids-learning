'use server';

import { signIn } from '@/auth';

export async function signInAction(provider: string) {
  await signIn(provider, { 
    redirectTo: '/auth/grade-selection',
  });
}

export async function credentialsSignInAction(email: string, password: string) {
  try {
    await signIn('credentials', { 
      email,
      password,
      redirectTo: '/auth/grade-selection',
    });
    return { success: true };
  } catch (error) {
    console.error('Credentials sign-in error:', error);
    return { 
      success: false, 
      error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' 
    };
  }
}
