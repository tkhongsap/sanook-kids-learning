-- AlterTable
ALTER TABLE "users"
  ALTER COLUMN "socialProvider" DROP NOT NULL,
  ALTER COLUMN "socialProviderId" DROP NOT NULL;

ALTER TABLE "users"
  ADD COLUMN     "password" TEXT,
  ADD COLUMN     "isAdmin" BOOLEAN NOT NULL DEFAULT false;
