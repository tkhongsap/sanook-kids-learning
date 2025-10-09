import { NextResponse } from 'next/server';
import { signIn } from '@/auth';

export async function POST() {
  try {
    console.log('[Dev Bypass API] Signing in admin user...');
    
    await signIn('credentials', {
      email: 'tkhongsap',
      password: 'sthought',
      redirect: false,
      redirectTo: '/auth/grade-selection',
    });

    console.log('[Dev Bypass API] Sign in successful');
    return NextResponse.json({ 
      success: true, 
      redirectTo: '/auth/grade-selection' 
    });
  } catch (error) {
    console.error('[Dev Bypass API] Error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'ไม่สามารถเข้าสู่ระบบได้' 
    }, { status: 500 });
  }
}
