/*
  WARNING!!!

  Running this file will add all the questions from tech-questions.json 
  to the database!

*/

import questions from "./tech-questions.json";
import {prisma} from "../db";

interface Question {
  id: string;
  text: string;
  choices: string[];
  answer: number;
  subelement: string;
  group: string;
}

async function addQuestion(question: Question) {  
  await prisma.question.create({
    data : {
      questionId: question.id,
      questionText: question.text,
      answer: question.answer,
      subelement: question.subelement,
      group: question.group,
      choice0: question.choices[0],
      choice1: question.choices[1],
      choice2: question.choices[2],
      choice3: question.choices[3]
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
export {};