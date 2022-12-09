import type { NextApiRequest, NextApiResponse } from "next";
import { Exam, Subelement } from "@prisma/client";
import { prisma } from "@/database/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const examName = "General";
  // TODO: this same code is used in 3 files, it should be put into a seperate function
  console.log("Trying to get general exam");
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
  return res.status(200).json(exam);


}
