// get all questions in a group
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db_util/db";
import { z } from "zod";

// return all questions from a group
// /api/questions/group?g=groupID

export default async function subelement(req: NextApiRequest, res: NextApiResponse) {
  if (!("g" in req.query)) {
    res.status(404).json({ msg: "no group ID entered" });
    return;
  }

  try {
    const groupId = req.query.g!.toString();
    const queryParser = z.string().length(3);
    queryParser.parse(groupId);

    const data = await prisma.question.findMany({
      where: {
        group: groupId
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