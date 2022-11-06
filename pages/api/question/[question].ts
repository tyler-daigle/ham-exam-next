import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db_util/db";
import { z } from "zod";

import { IQuestion } from "../../../types/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const questionId = req.query.question!.toString();
  // TODO: change the query to {include: {choices: true}}
  // replace all the choice0, etc. to just use choices
  // answer is now correctAnswer
  try {
    const result = await prisma.question.findFirstOrThrow({
      where: {
        questionId: questionId
      },
      include: {
        choices: true
      }
    });

    // const question: IQuestion = {
    //   id: result.questionId,
    //   text: result.questionText,
    //   answer: result.correctAnswer,
    //   subelement: result.subelement,
    //   group: result.group,
    //   choices: result.choices.map(choice => choice.text)
    // };
    res.status(200).json(result);
  } catch (e) {
    res.status(404).json({ message: `Question ${questionId} not found` });
  }
}