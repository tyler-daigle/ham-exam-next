import { Exam, Question } from "@prisma/client";
import { group } from "console";
import { prisma } from "../../db";

async function main() {
  const examName = "Technician";
  const questionList: Question[] = [];

  try {
    // get the exam data and the subelements
    const res = await prisma.exam.findFirst({
      where: {
        name: examName
      },
      include: {
        subelements: {
          include: {
            groups: {
              orderBy: {
                groupId: "asc"
              }
            },
          },
          orderBy: {
            subelementId: "asc"
          }
        }
      }
    });
    if (res === null) {
      throw new Error("Response was null");
    }

    // loop through all the subelements 
    for (const subelement of res.subelements) {
      // loop through each group and get all the questions from that 
      // group - Randomly select one and add it to the questionList array

      for (const group of subelement.groups) {
        // get questions from the group
        const questions = await prisma.question.findMany({
          where: {
            group: group.groupId
          }
        });

        const chosenQuestion = questions[Math.floor(Math.random() * questions.length)];
        questionList.push(chosenQuestion);
      }
    }
  } catch (e) {
    console.log("SOMETHING WENT WRONG!!!", e);
  }
  console.log(JSON.stringify(questionList));

}

main();