import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db_util/db";
import { IQuestion } from "../../../types/types";
import { z } from "zod";


// return an array of questions
// /api/questions/questions?q=Questionid,QuestionId,QuestionId


export default async function questions(req: NextApiRequest, res: NextApiResponse) {
  if (!("q" in req.query)) {
    res.status(404).json({ msg: "no questions entered" });
    return;
  }

  try {
    const questionList = req.query.q!.toString().split(",");
    const queryParser = z.string().length(5).array().nonempty();
    queryParser.parse(questionList);
    const data = await prisma.question.findMany({
      where: {
        questionId: {
          in: questionList
        },
      },
      include: {
        choices: true
      }
    });

    res.status(200).json({ questions: data });
  } catch (e) {
    res.status(404).json({ msg: "invalid input" });
    return;
  }

}