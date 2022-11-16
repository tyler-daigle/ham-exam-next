import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/database/db";

const technicianExamId = 0;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {

    // find out how many generated exams there are and randomly select one of them

    const numExams = await prisma.generatedExam.count({
      where: {
        examId: technicianExamId
      }
    });
    const randomExam = Math.floor(Math.random() * numExams);
    const exam = await prisma.generatedExam.findMany({
      take: 1,
      skip: randomExam,
      include: {
        QuestionList: {
          include: {
            question: {
              include: {
                choices: true
              }
            }
          },
          orderBy: {
            questionId: "asc"
          }
        },
      },
    });

    res.status(200).json(exam[0]);
  } catch (e) {
    res.status(404).json({ msg: "Failed to get a random test..." });
  }
}