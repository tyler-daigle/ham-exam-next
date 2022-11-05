/*
  Warnings:

  - You are about to drop the column `answer` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `choice0` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `choice1` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `choice2` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `choice3` on the `Question` table. All the data in the column will be lost.
  - Added the required column `choiceId` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Choice" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "questionId" TEXT NOT NULL,
    CONSTRAINT "Choice_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question" ("questionId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Question" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "questionId" TEXT NOT NULL,
    "questionText" TEXT NOT NULL,
    "subelement" TEXT NOT NULL,
    "group" TEXT NOT NULL,
    "choiceId" INTEGER NOT NULL,
    CONSTRAINT "Question_choiceId_fkey" FOREIGN KEY ("choiceId") REFERENCES "Choice" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Question" ("group", "id", "questionId", "questionText", "subelement") SELECT "group", "id", "questionId", "questionText", "subelement" FROM "Question";
DROP TABLE "Question";
ALTER TABLE "new_Question" RENAME TO "Question";
CREATE UNIQUE INDEX "Question_questionId_key" ON "Question"("questionId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
