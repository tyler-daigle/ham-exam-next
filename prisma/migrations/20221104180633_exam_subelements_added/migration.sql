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
    CONSTRAINT "Subelement_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Subelement" ("examId", "id", "name", "numExamQuestions", "numGroups", "numTotalQuestions", "subelementId") SELECT "examId", "id", "name", "numExamQuestions", "numGroups", "numTotalQuestions", "subelementId" FROM "Subelement";
DROP TABLE "Subelement";
ALTER TABLE "new_Subelement" RENAME TO "Subelement";
CREATE UNIQUE INDEX "Subelement_subelementId_key" ON "Subelement"("subelementId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
