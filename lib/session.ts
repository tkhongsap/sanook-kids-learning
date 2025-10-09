import { auth } from '@/auth';
import type { Session } from 'next-auth';

export async function getServerSession(): Promise<Session | null> {
  try {
    return await auth();
  } catch (error) {
    console.error('[Session] Failed to retrieve session', error);
    return null;
  }
}
