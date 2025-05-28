/*
  Warnings:

  - You are about to drop the column `degination` on the `Team` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Team" DROP COLUMN "degination",
ADD COLUMN     "designation" TEXT;
