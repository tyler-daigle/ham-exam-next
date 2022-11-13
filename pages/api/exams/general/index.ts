import type { NextApiRequest, NextApiResponse } from "next";
import { Exam, Subelement } from "@prisma/client";
import { prisma } from "@/database/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const examName = "General";
  // TODO: this same code is used in 3 files, it should be put into a seperate function
  try {
    const exam = await prisma.exam.findFirstOrThrow({
      where: { name: examName },
      include: {
        subelements: {
          orderBy: {
            subelementId: "asc"
          }
          // TODO: possibly include groups?
        }
      },
    });
    console.log(exam);
    res.status(200).json(exam);
  } catch (e) {
    console.log(e);
    res.status(404).json({ status: `Failed to query the database for the ${examName} exam data`, });
  }
  return;
}
