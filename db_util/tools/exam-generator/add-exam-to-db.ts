import { prisma } from "../../db";
import { GeneratedExam, Question } from "@prisma/client";
import { readFileSync } from "fs";

const examList = ["test-exam.json"];

enum ExamType {
  TECHNICIAN = 0,
  GENERAL = 1,
  EXTRA = 2
}

(async function main() {

  try {
    for (const examFile of examList) {
      const data = readFileSync(examFile, { encoding: "utf-8" });
      const questionList = JSON.parse(data);
      const questionIds: { questionId: string }[] = [];

      for (const question of questionList) {
        questionIds.push({ questionId: question.questionId });
        // console.log(`Adding ${question.questionId}`);
      }
      await prisma.generatedExam.create({
        data: {
          examId: ExamType.TECHNICIAN,
          QuestionList: {
            create: questionIds
          }
        }
      })
      console.log("Exam Created");
    }
  } catch (e) {
    console.log(e);
  }
})();

