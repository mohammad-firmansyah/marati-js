/*
  Warnings:

  - Added the required column `description` to the `model` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "model" ADD COLUMN     "description" TEXT NULL;
