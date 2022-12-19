import MainLayout from "Layouts/MainLayout";
import PageHeader from "@/components/PageHeader";
import { answersAtom, correctAnswersAtom, allQuestionsAtom } from "../state/atoms";
import { useAtom } from "jotai";
import { QuestionWithChoices } from "@/types/types";
import QuestionHeader from "@/components/QuestionHeader";
import QuestionContainer from "@/components/QuestionContainer";
import GreenText from "@/components/UI/GreenText";
import QuestionChoices from "@/components/QuestionChoices";
import QuestionText from "@/components/QuestionText";
import GradeDisplay from "@/components/GradeDisplay";

type IncorrectQuestion = {
  questionId: string,
  wrongChoice: number
};

function gradeTest(answersMap: Map<string, number>, correctAnswersMap: Map<string, number>) {
  let numCorrect = 0;
  const wrongAnswers: IncorrectQuestion[] = [];

  answersMap.forEach((answer, questionId) => {
    if (answer === correctAnswersMap.get(questionId)) {
      numCorrect++;
    } else {
      wrongAnswers.push({ questionId, wrongChoice: answer });
    }
  });

  return { numberCorrect: numCorrect, wrongAnswers };
}

export default function ResultsPage() {
  const [answersMap] = useAtom(answersAtom);
  const [correctAnswers] = useAtom(correctAnswersAtom);
  const [allQuestions] = useAtom(allQuestionsAtom);

  const numAnswers = answersMap.size;

  const { numberCorrect, wrongAnswers } = gradeTest(answersMap, correctAnswers);

  const wrongQuestionList = wrongAnswers.reduce((allWrong, wrongAnswer) => {
    const q = allQuestions.find(question => wrongAnswer.questionId === question.questionId);
    if (q) {
      allWrong.push(q);
    }
    return allWrong;
  }, [] as QuestionWithChoices[]);


  return (
    <MainLayout>
      <PageHeader>Your Exam Results</PageHeader>

      <GradeDisplay numCorrect={numberCorrect} numTotal={allQuestions.length} />

      <h3>Here are the questions you answered incorrectly:</h3>
      {wrongQuestionList?.map((question, index) =>
        <QuestionContainer key={question.id}>
          <QuestionHeader>
            <GreenText>{question.questionId}</GreenText>
            <GreenText>{index + 1} of {wrongQuestionList.length}</GreenText>
          </QuestionHeader>
          <QuestionText>{question.questionText}</QuestionText>
          <QuestionChoices choices={question.choices} />
        </QuestionContainer>
      )}
    </MainLayout>
  )
}

