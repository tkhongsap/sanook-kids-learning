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
    const { gradeLevels } = body;

    if (!Array.isArray(gradeLevels) || gradeLevels.length === 0) {
      return NextResponse.json(
        { error: 'Invalid grade levels - must be a non-empty array' },
        { status: 400 }
      );
    }

    const validGrades = gradeLevels.every((grade: string) => 
      grade === 'GRADE_4' || grade === 'GRADE_6'
    );

    if (!validGrades) {
      return NextResponse.json(
        { error: 'Invalid grade levels - must be GRADE_4 or GRADE_6' },
        { status: 400 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        gradeLevels: gradeLevels as GradeLevel[],
      },
    });

    return NextResponse.json({
      success: true,
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        gradeLevels: updatedUser.gradeLevels,
      },
    });

  } catch (error) {
    console.error('Error updating grade levels:', error);
    return NextResponse.json(
      { error: 'Failed to update grade levels' },
      { status: 500 }
    );
  }
}
