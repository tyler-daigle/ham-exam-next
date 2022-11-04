/*
  Warnings:

  - Added the required column `examId` to the `Exam` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Subelement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "subelementId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "numExamQuestions" INTEGER NOT NULL,
    "numGroups" INTEGER NOT NULL,
    "numTotalQuestions" INTEGER NOT NULL,
    "examId" INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT "Subelement_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam" ("examId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Subelement" ("examId", "id", "name", "numExamQuestions", "numGroups", "numTotalQuestions", "subelementId") SELECT "examId", "id", "name", "numExamQuestions", "numGroups", "numTotalQuestions", "subelementId" FROM "Subelement";
DROP TABLE "Subelement";
ALTER TABLE "new_Subelement" RENAME TO "Subelement";
CREATE UNIQUE INDEX "Subelement_subelementId_key" ON "Subelement"("subelementId");
CREATE TABLE "new_Exam" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "examId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "numberQuestions" INTEGER NOT NULL,
    "requiredCorrect" INTEGER NOT NULL
);
INSERT INTO "new_Exam" ("id", "name", "numberQuestions", "requiredCorrect") SELECT "id", "name", "numberQuestions", "requiredCorrect" FROM "Exam";
DROP TABLE "Exam";
ALTER TABLE "new_Exam" RENAME TO "Exam";
CREATE UNIQUE INDEX "Exam_examId_key" ON "Exam"("examId");
CREATE UNIQUE INDEX "Exam_name_key" ON "Exam"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
