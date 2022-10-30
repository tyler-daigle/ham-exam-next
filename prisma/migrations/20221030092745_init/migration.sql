-- CreateTable
CREATE TABLE "Exam" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "numberQuestions" INTEGER NOT NULL,
    "requiredCorrect" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Exam_name_key" ON "Exam"("name");
