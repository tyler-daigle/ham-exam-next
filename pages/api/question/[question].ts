import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/database/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const questionId = req.query.question!.toString().toUpperCase();

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