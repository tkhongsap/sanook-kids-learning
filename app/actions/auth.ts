'use server';

import { signIn } from '@/auth';
import { redirect } from 'next/navigation';

export async function signInAction(provider: string) {
  await signIn(provider, { 
    redirectTo: '/auth/grade-selection',
  });
}
