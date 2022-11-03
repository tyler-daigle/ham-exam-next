import { useEffect, useState } from "react";
import QuestionItemViewOnly from "@/components/QuestionItemViewOnly";

import { IQuestion } from "@/types/types";
type WrongAnswer = {
  questionId: string,
  answerSelected: number
};

// this is what the exam results data has to look like --- wherever it comes from...
// the map for the wrong answers is indexed by the Question IDs
export interface IExamResults {
  wrongAnswers: Map<string, number>;
  numberCorrect: number;
  requiredCorrect: number;
  passed: boolean;
};

// The fake data
const wrongAnswers = [{
  questionId: "T1A01",
  answerSelected: 0
},
{
  questionId: "T2A03",
  answerSelected: 2
},
{
  questionId: "T4A01",
  answerSelected: 1
}];

const examResults: IExamResults = {
  wrongAnswers: new Map<string, number>(),
  numberCorrect: 33,
  requiredCorrect: 26,
  passed: false
}

// create a map from the fake data to make looking up the question data easier
wrongAnswers.forEach(answer => examResults.wrongAnswers.set(answer.questionId, answer.answerSelected));


export default function Results() {
  const results = examResults;  // this has to come from some global state
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const wrongAnswers = results.wrongAnswers;

  // fetch the data for the questions
  useEffect(() => {
    const questions: IQuestion[] = [];

    const getQuestions = async () => {
      // TODO: make a new api endpoint that can get multiple questions at once.
      for (const questionId of wrongAnswers.keys()) {
        const res = await fetch(`http://localhost:3000/api/question/${questionId}`)
        const json = await res.json();
        questions.push(json);
      }
      setQuestions([...questions]);
    }
    getQuestions();
  }, []);

  return (
    <div>
      <h1>Your Exam Results</h1>
      {questions?.map(question => <QuestionItemViewOnly question={question} selectedAnswer={wrongAnswers.get(question.id)!} hideHelp={true} />)}
      <h2>What</h2>
    </div>
  )
}

