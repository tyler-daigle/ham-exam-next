/*
  Warnings:

  - Added the required column `text` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Question" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "questionId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "answer" INTEGER NOT NULL,
    "subelement" TEXT NOT NULL,
    "group" TEXT NOT NULL,
    "choice0" TEXT NOT NULL,
    "choice1" TEXT NOT NULL,
    "choice2" TEXT NOT NULL,
    "choice3" TEXT NOT NULL
);
INSERT INTO "new_Question" ("answer", "choice0", "choice1", "choice2", "choice3", "group", "id", "questionId", "subelement") SELECT "answer", "choice0", "choice1", "choice2", "choice3", "group", "id", "questionId", "subelement" FROM "Question";
DROP TABLE "Question";
ALTER TABLE "new_Question" RENAME TO "Question";
CREATE UNIQUE INDEX "Question_questionId_key" ON "Question"("questionId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
