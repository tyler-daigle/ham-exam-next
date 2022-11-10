-- CreateTable
CREATE TABLE "GeneratedExam" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "examId" INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT "GeneratedExam_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam" ("examId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "QuestionList" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "generatedExamId" INTEGER NOT NULL,
    "questionId" TEXT NOT NULL,
    CONSTRAINT "QuestionList_generatedExamId_fkey" FOREIGN KEY ("generatedExamId") REFERENCES "GeneratedExam" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "QuestionList_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question" ("questionId") ON DELETE RESTRICT ON UPDATE CASCADE
);
