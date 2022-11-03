import subelementJSON from "./tech-subelements.json";
import {prisma} from "../db";

import {ISubelement} from "../../types/types";

console.log(subelementJSON[0]);

async function main() {

  const subelements: ISubelement[] = subelementJSON;
  try {
    subelements.forEach(async subelement => {
      await prisma.subelement.create({
        data: {
          subelementId: subelement.subelementId,
          name: subelement.name,
          numExamQuestions: subelement.numExamQuestions,
          numGroups: subelement.numGroups,
          numTotalQuestions: subelement.numTotalQuestions
        }
      });
    })
  } catch(e) {
    console.log(`Error adding subelement`);
  }
}


main();