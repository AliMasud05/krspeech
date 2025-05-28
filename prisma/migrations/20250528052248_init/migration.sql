/*
  Warnings:

  - You are about to drop the column `subscriptionEnd` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `subscriptionPlan` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `subscriptionStart` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `subscriptionStatus` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `DistricRegistrationForm` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `districtRegistrationId` to the `subscriptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentAmount` to the `subscriptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quickLinksMonthlyLimit` to the `subscriptions` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `plan` on the `subscriptions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "SubscriptionPlan" AS ENUM ('ANNUAL_PREMIUM', 'QUARTERLY_PREMIUM');

-- AlterEnum
ALTER TYPE "SubscriptionStatus" ADD VALUE 'TRIAL';

-- AlterTable
ALTER TABLE "subscriptions" ADD COLUMN     "districtRegistrationId" TEXT NOT NULL,
ADD COLUMN     "groupSize" INTEGER,
ADD COLUMN     "hasDigitalGamesLibrary" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "hasHomeworkSheets" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "hasInteractivePDFs" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "hasPodcastAccess" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isGroupDiscount" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lastPaymentDate" TIMESTAMP(3),
ADD COLUMN     "licenseCount" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "nextPaymentDate" TIMESTAMP(3),
ADD COLUMN     "paymentAmount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "paymentCurrency" TEXT NOT NULL DEFAULT 'USD',
ADD COLUMN     "quickLinksMonthlyLimit" INTEGER NOT NULL,
ADD COLUMN     "receivesWeeklyEmails" BOOLEAN NOT NULL DEFAULT true,
DROP COLUMN "plan",
ADD COLUMN     "plan" "SubscriptionPlan" NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "subscriptionEnd",
DROP COLUMN "subscriptionPlan",
DROP COLUMN "subscriptionStart",
DROP COLUMN "subscriptionStatus";

-- DropTable
DROP TABLE "DistricRegistrationForm";

-- DropEnum
DROP TYPE "DistricPlan";

-- CreateTable
CREATE TABLE "DistrictRegistration" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "ccEmails" TEXT[],
    "companyName" TEXT NOT NULL,
    "address1" TEXT NOT NULL,
    "address2" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "isTaxExempt" BOOLEAN NOT NULL,
    "taxExemptNumber" TEXT,
    "licenseCount" INTEGER NOT NULL,
    "headquartersLocation" TEXT NOT NULL,
    "interestedInQuarterly" BOOLEAN NOT NULL DEFAULT false,
    "interestedInAnnual" BOOLEAN NOT NULL DEFAULT false,
    "wantsDemo" BOOLEAN NOT NULL DEFAULT false,
    "referralSource" TEXT NOT NULL,
    "additionalQuestions" TEXT,
    "formVersion" TEXT NOT NULL DEFAULT 'digital.SLP',
    "subscriptionId" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "DistrictRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DistrictRegistration_email_key" ON "DistrictRegistration"("email");

-- AddForeignKey
ALTER TABLE "DistrictRegistration" ADD CONSTRAINT "DistrictRegistration_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_districtRegistrationId_fkey" FOREIGN KEY ("districtRegistrationId") REFERENCES "DistrictRegistration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
