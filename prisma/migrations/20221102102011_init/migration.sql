-- CreateTable
CREATE TABLE "Exam" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "numberQuestions" INTEGER NOT NULL,
    "requiredCorrect" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Question" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "questionId" TEXT NOT NULL,
    "questionText" TEXT NOT NULL,
    "answer" INTEGER NOT NULL,
    "subelement" TEXT NOT NULL,
    "group" TEXT NOT NULL,
    "choice0" TEXT NOT NULL,
    "choice1" TEXT NOT NULL,
    "choice2" TEXT NOT NULL,
    "choice3" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Exam_name_key" ON "Exam"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Question_questionId_key" ON "Question"("questionId");
