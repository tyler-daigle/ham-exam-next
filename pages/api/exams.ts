import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../db_util/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const exam = await prisma.exam.findFirst();
  res.status(200).json(exam);
}
