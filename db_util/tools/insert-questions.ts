/*
  WARNING!!!

  Running this file will add all the questions from tech-questions.json 
  to the database!

*/

import questions from "./tech-questions.json";
import { prisma } from "../db";

// this interface has to match the JSON question data format
interface Question {
  id: string;
  text: string;
  answer: number;
  subelement: string;
  group: string;
  choices: string[];
}

interface Choice {
  answerIndex: number;
  text: string;
}

async function addQuestion(question: Question) {
  if (question.choices.length !== 4) {
    throw new Error(`Question ${question.id} there are ${question.choices.length} choices.`)
  }

  await prisma.question.create({
    data: {
      questionId: question.id,
      questionText: question.text,
      correctAnswer: question.answer,
      subelement: question.subelement,
      group: question.group,
      choices: {
        create: [
          { answerIndex: 0, text: question.choices[0] },
          { answerIndex: 1, text: question.choices[1] },
          { answerIndex: 2, text: question.choices[2] },
          { answerIndex: 3, text: question.choices[3] },
        ]
      }
    }
  });
  console.log(`Added question ${question.id}.`);
}

async function main() {
  questions.forEach(async question => {
    await addQuestion(question);
    console.log(`Added question ${question.id}`)
  });
}
main();
export { };