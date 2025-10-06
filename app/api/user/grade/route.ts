import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from '@/lib/session';
import { prisma } from '@/lib/db';
import { GradeLevel } from '@/lib/generated/prisma';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized - Please sign in' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { gradeLevel } = body;

    if (!gradeLevel || (gradeLevel !== 'GRADE_4' && gradeLevel !== 'GRADE_6')) {
      return NextResponse.json(
        { error: 'Invalid grade level' },
        { status: 400 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        gradeLevel: gradeLevel as GradeLevel,
      },
    });

    return NextResponse.json({
      success: true,
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        gradeLevel: updatedUser.gradeLevel,
      },
    });

  } catch (error) {
    console.error('Error updating grade level:', error);
    return NextResponse.json(
      { error: 'Failed to update grade level' },
      { status: 500 }
    );
  }
}
