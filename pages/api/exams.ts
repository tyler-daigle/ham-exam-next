import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../db_util/db";
import { z } from "zod";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const examNameSchema = z.string();

  try {
    if ("exam" in req.query) {
      const examName = req.query.exam?.toString();
      examNameSchema.parse(examName);
      const exam = await prisma.exam.findFirst({ where: { name: examName } });
      if (exam) {
        res.status(200).json(exam);
        return;
      }
    }
  } catch (e) {
    res.status(404).json({});
    return;
  }
  res.status(404).json({});
}
