'use client';

import { signInAction } from '@/app/actions/auth';

export type AuthProvider = 'google' | 'facebook';

export interface AuthError {
  code: string;
  message: string;
  provider?: AuthProvider;
}

const errorMessages: Record<string, string> = {
  popup_blocked: 'กรุณาอนุญาตให้เบราว์เซอร์เปิดหน้าต่างใหม่เพื่อดำเนินการต่อ',
  popup_closed: 'คุณปิดหน้าต่างเข้าสู่ระบบก่อนเสร็จสิ้น โปรดลองอีกครั้ง',
  network_error: 'การเชื่อมต่อขัดข้อง กรุณาตรวจสอบอินเทอร์เน็ตแล้วลองใหม่',
  auth_failed: 'ไม่สามารถเข้าสู่ระบบได้ กรุณาลองใหม่อีกครั้ง',
  permission_denied: 'คุณปฏิเสธการขออนุญาต กรุณาอนุมัติการเข้าถึงข้อมูลที่จำเป็น',
};

export async function initiateOAuthSignIn(provider: AuthProvider) {
  try {
    await signInAction(provider);
  } catch (error) {
    console.error('[Auth] Failed to initiate OAuth sign-in', error);
    throw error;
  }
}

export function getAuthErrorMessage(error: AuthError): string {
  if (!error) {
    return 'ไม่สามารถเข้าสู่ระบบได้ในขณะนี้';
  }

  return (
    errorMessages[error.code] ||
    error.message ||
    'ไม่สามารถเข้าสู่ระบบได้ในขณะนี้'
  );
}
