import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db_util/db";
import { z } from "zod";

interface Question {
  id: string;
  text: string;
  choices: string[];
  answer: number;
  subelement: string;
  group: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const questionId = req.query.question!.toString();

  try {
    const result = await prisma.question.findFirstOrThrow({where: {questionId: questionId}});
    const question: Question = {
      id: result.questionId,
      text: result.questionText,
      choices: [result.choice0, result.choice1, result.choice2, result.choice3],
      answer: result.answer,
      subelement: result.subelement,
      group: result.group
    };
    res.status(200).json(question);
  }catch(e) {
    res.status(404).json({message: `Question ${questionId} not found`});
  }
}