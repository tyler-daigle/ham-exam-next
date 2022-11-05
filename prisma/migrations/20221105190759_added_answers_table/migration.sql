/*
  Warnings:

  - You are about to drop the column `choiceId` on the `Question` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Answers" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "questionId" INTEGER NOT NULL,
    "choiceId" INTEGER NOT NULL,
    CONSTRAINT "Answers_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Answers_choiceId_fkey" FOREIGN KEY ("choiceId") REFERENCES "Choice" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Question" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "questionId" TEXT NOT NULL,
    "questionText" TEXT NOT NULL,
    "subelement" TEXT NOT NULL,
    "group" TEXT NOT NULL
);
INSERT INTO "new_Question" ("group", "id", "questionId", "questionText", "subelement") SELECT "group", "id", "questionId", "questionText", "subelement" FROM "Question";
DROP TABLE "Question";
ALTER TABLE "new_Question" RENAME TO "Question";
CREATE UNIQUE INDEX "Question_questionId_key" ON "Question"("questionId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
