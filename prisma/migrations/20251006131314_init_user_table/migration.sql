-- CreateEnum
CREATE TYPE "SocialProvider" AS ENUM ('GOOGLE', 'FACEBOOK');

-- CreateEnum
CREATE TYPE "GradeLevel" AS ENUM ('GRADE_4', 'GRADE_6');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "socialProvider" "SocialProvider" NOT NULL,
    "socialProviderId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "gradeLevel" "GradeLevel",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_socialProvider_socialProviderId_key" ON "users"("socialProvider", "socialProviderId");
