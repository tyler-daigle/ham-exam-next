import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db_util/db";
import { z } from "zod";


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

    res.status(200).json(result);
  } catch (e) {
    res.status(404).json({ message: `Question ${questionId} not found` });
  }
}