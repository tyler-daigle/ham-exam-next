import questionsJSON from "./tech-questions.json";
import { prisma } from "../db";

// read each question
// add the question to the database
// get the question's ID
// add the choices to the database and set each ones questionID to the questionID we just got.



async function addQuestions() {
  const questionId = "1234";

  try {

    await prisma.question.create({
      data: {
        questionId: "1235",
        questionText: "This is a question",
        subelement: "T1",
        group: "T1A",
        correctAnswer: 2,
        choices: {
          create: [
            {
              answerIndex: 0,
              text: "This is the first choice"
            },
            { answerIndex: 1, text: "This is the 2nd choice" },
            { answerIndex: 2, text: "This is the 3rd choice" },
            { answerIndex: 3, text: "This is the 4th choice" },
          ]
        }
      }
    })
  } catch (e) {
    console.log("Not ok: ", e);
  }
  console.log("ok");
}

async function getQuestion() {
  const q = await prisma.question.findFirst({ include: { choices: true } });
  return q;
}

(async function main() {
  await addQuestions();
  // const q = await getQuestion();
  // console.log(q?.questionText);
  // q?.choices.forEach((choice, index) => console.log(`${index}: `, choice));
  // console.log(q?.correctAnswer);
})();
