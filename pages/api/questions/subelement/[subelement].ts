import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/database/db";
import { z } from "zod";


// return all questions from a subelement

export default async function subelement(req: NextApiRequest, res: NextApiResponse) {

  try {
    const subelement = req.query.subelement!.toString().toUpperCase();
    const queryParser = z.string().length(2);
    queryParser.parse(subelement);

    const data = await prisma.question.findMany({
      where: {
        subelement: subelement
      },
      orderBy: {
        questionId: "asc"
      },
      include: {
        choices: true
      }
    });
    res.status(200).json(data);
  } catch (e) {
    res.status(404).json({ msg: "invalid input" });
    return;
  }

}