/*
  Warnings:

  - Changed the type of `type` on the `component` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "component" DROP COLUMN "type",
ADD COLUMN     "type" "ComponentType" NOT NULL;
