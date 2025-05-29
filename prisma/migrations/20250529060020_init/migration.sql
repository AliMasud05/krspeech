/*
  Warnings:

  - The `status` column on the `SupportTicket` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ticketStatus" AS ENUM ('OPEN', 'IN_PROGRESS', 'CLOSED');

-- AlterTable
ALTER TABLE "SupportTicket" DROP COLUMN "status",
ADD COLUMN     "status" "ticketStatus" NOT NULL DEFAULT 'OPEN';
