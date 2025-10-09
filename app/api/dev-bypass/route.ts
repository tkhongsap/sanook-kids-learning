import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { DEV_BYPASS_EMAIL, DEV_BYPASS_PASSWORD, DEV_BYPASS_NAME } from '@/lib/dev-bypass';
import { GradeLevel } from '@/lib/generated/prisma';

export async function POST() {
  try {
    console.log('[Dev Bypass API] Ensuring dev user exists...');

    const existingUser = await prisma.user.findUnique({
      where: { email: DEV_BYPASS_EMAIL },
    });

    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(DEV_BYPASS_PASSWORD, 10);

      await prisma.user.create({
        data: {
          email: DEV_BYPASS_EMAIL,
          name: DEV_BYPASS_NAME,
          password: hashedPassword,
          gradeLevels: [] as GradeLevel[],
          isAdmin: true,
        },
      });

      console.log('[Dev Bypass API] Dev user created');
    } else if (!existingUser.password) {
      const hashedPassword = await bcrypt.hash(DEV_BYPASS_PASSWORD, 10);

      await prisma.user.update({
        where: { id: existingUser.id },
        data: {
          password: hashedPassword,
          isAdmin: true,
        },
      });

      console.log('[Dev Bypass API] Dev user password seeded');
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error('[Dev Bypass API] Error:', error);
    return NextResponse.json({
      success: false,
      error: 'ไม่สามารถเข้าสู่ระบบได้'
    }, { status: 500 });
  }
}
