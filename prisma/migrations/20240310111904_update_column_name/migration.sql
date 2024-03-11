/*
  Warnings:

  - You are about to drop the column `W` on the `component` table. All the data in the column will be lost.
  - Added the required column `w` to the `component` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "component" DROP COLUMN "W",
ADD COLUMN     "w" INTEGER NOT NULL,
ALTER COLUMN "model_id" DROP NOT NULL;
