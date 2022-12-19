import MainLayout from "Layouts/MainLayout";
import PageHeader from "@/components/PageHeader";
import { answersAtom, correctAnswersAtom } from "../state/atoms";
import { useAtom } from "jotai";

function gradeTest(answersMap: Map<string, number>, correctAnswersMap: Map<string, number>) {
  let numCorrect = 0;

  answersMap.forEach((answer, questionId) => {
    if (answer === correctAnswersMap.get(questionId)) {
      numCorrect++;
    }
  });

  return numCorrect;
}

export default function ResultsPage() {
  const [answersMap] = useAtom(answersAtom);
  const [correctAnswers] = useAtom(correctAnswersAtom);
  console.log(correctAnswers);
  const numCorrect = gradeTest(answersMap, correctAnswers);
  const numAnswers = answersMap.size;

  return (
    <MainLayout>
      <PageHeader>Your Exam Results</PageHeader>
      <h3>You answered {numAnswers} questions.</h3>
      <p>You got {numCorrect} correct out of {correctAnswers.size}.</p>
    </MainLayout>
  )
}