import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db_util/db";
import { z } from "zod";

interface ExamType {
  id: number;
  name: string;
  numberQuestions: number;
  requiredCorrect: number;
  subelements: string[];
}

interface Subelement {
  id: number;
  subelementId: string;
  name: string;
  numExamQuestions: number;
  numGroups: number;
  numTotalQuestions: number;
  examId: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const examNameSchema = z.string();
  const examName = req.query.exam!.toString();
  const examSchema = z.object({
    id: z.number(),
    name: z.string(),
    numberQuestions: z.number(),
    requiredCorrect: z.number(),
    subelements: z.any().array()
  });

  console.log(examName);
  try {
    examNameSchema.parse(examName);
      
    const exam = await prisma.exam.findFirstOrThrow({
      where: { name: examName },
      include: {subelements: {
        orderBy : {
          subelementId: "asc"
        }        
      }
    },
      
    });
    console.log(exam.subelements);
    
    examSchema.parse(exam);
    res.status(200).json(exam);
  } catch (e) {
    console.log(e);
    res.status(404).json({ status: `No exam named '${examName}' found.`,});
  }
  return;
}
