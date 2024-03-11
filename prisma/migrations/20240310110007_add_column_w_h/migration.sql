/*
  Warnings:

  - Added the required column `W` to the `component` table without a default value. This is not possible if the table is not empty.
  - Added the required column `h` to the `component` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "component" ADD COLUMN     "W" INTEGER NOT NULL,
ADD COLUMN     "h" INTEGER NOT NULL;
