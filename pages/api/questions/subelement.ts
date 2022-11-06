import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db_util/db";
import { z } from "zod";


// return all questions from a subelement
// /api/questions/subelement?s=subelementId

export default async function subelement(req: NextApiRequest, res: NextApiResponse) {
  if (!("s" in req.query)) {
    res.status(404).json({ msg: "no subelement entered" });
    return;
  }

  try {
    const subelement = req.query.s!.toString();
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