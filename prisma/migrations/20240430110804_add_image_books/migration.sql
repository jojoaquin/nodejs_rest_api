/*
  Warnings:

  - Added the required column `image` to the `books` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `books` ADD COLUMN `image` VARCHAR(100) NOT NULL;
