import { GetServerSidePropsContext } from "next";
import { prisma } from "../../db_util/db";
import { Question as PrismaQuestion, Choice } from "@prisma/client";
import MainContainer from "@/components/UI/MainContainer";
import QuestionList from "@/components/QuestionList";


import QuestionItemViewOnly from "@/components/QuestionItemViewOnly";

export interface Props {
  msg: string | undefined;
  question: PrismaQuestion & { choices: Choice[] };
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

  const question = await prisma.question.findFirst({
    where: {
      questionId: questionId
    },
    include: {
      choices: true
    }
  });

  if (question) {
    return {
      props: {
        msg: "ok",
        question: question
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




