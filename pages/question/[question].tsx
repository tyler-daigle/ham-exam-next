import { GetServerSidePropsContext } from "next";
import { prisma } from "../../db_util/db";

import MainContainer from "@/components/UI/MainContainer";
import QuestionList from "@/components/QuestionList";
import { IQuestion } from "@/types/types";

import QuestionItemViewOnly from "@/components/QuestionItemViewOnly";

export interface Props {
  msg: string | undefined;
  question: IQuestion | null;
};

export default function QuestionPage({ msg, question }: Props) {

  if (question) {
    console.log(question);
    return <MainContainer><QuestionItemViewOnly question={question} selectedAnswer={null} hideHelp={false} /></MainContainer>;
  } else {
    return <div><h1>The question was not found.</h1></div>;
  }
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const questionId = context.params!.question as string;
  console.log(questionId);

  const question = await prisma.question.findFirst({ where: { questionId: questionId } });
  if (question) {
    const questionData: IQuestion = {
      id: question.questionId,
      text: question.questionText,
      answer: question.answer,
      subelement: question.subelement,
      group: question.group,
      choices: [question.choice0, question.choice1, question.choice2, question.choice3]
    };

    return {
      props: {
        msg: "ok",
        question: questionData
      }
    }
  } else {
    return {
      props: {
        msg: "Question not found",
        question: null
      }
    }
  }
}




