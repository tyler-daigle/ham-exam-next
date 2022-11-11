import MainContainer from "@/components/UI/MainContainer";
import { PrismaClient, Question } from "@prisma/client";
import { prisma } from "db_util/db";
import QuestionContainer from "@/components/QuestionContainer";
import QuestionHeader from "@/components/QuestionHeader";
import GreenText from "@/components/UI/GreenText";
import QuestionText from "@/components/QuestionText";
import QuestionChoicesWithSelect from "@/components/QuestionChoicesWithSelect";

import { QuestionWithChoices } from "@/types/types";

export interface Props {
  exam: number;
  questionList: QuestionWithChoices[];
  numberQuestions: number;
}


export default function ExamPage({ exam, questionList, numberQuestions }: Props) {
  return (
    <MainContainer>
      <div>
        <h1>This is an exam!</h1>
        <h2>ID: {exam}</h2>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>

      {questionList.map((question, index) =>
        <QuestionContainer key={question.id}>
          <QuestionHeader>
            <GreenText>{question.questionId}</GreenText>
            <GreenText>{index + 1} of {numberQuestions}</GreenText>
          </QuestionHeader>
          <QuestionText>{question.questionText}</QuestionText>
          <QuestionChoicesWithSelect choices={question.choices} />
        </QuestionContainer>
      )}
    </MainContainer>


  )
}

// this just gets the technician exams

export async function getStaticPaths() {
  // const prisma = new PrismaClient();
  // get the IDs of each of the generated exams from the database
  // the ID is then sent to getStaticProps()

  // TODO: make a seperate page for each exam type: /exam/technician/0
  // /exam/general/0, etc...

  const examData = await prisma.generatedExam.findMany(
    {
      where: {
        examId: 0 // examId is the ID for the type of exam: Technician, General or Extra
      }
    });

  // exam.id is the actual ID of the generated exam that matches up with the questionlist table
  const examList = examData.map(exam => ({ params: { exam: exam.id.toString() } }));
  console.log(examList);

  return {
    paths: examList,
    fallback: false
  }
}

interface Params {
  params: {
    exam: string,
    questionList: Question[] | null
  };
}

export async function getStaticProps({ params }: Params) {
  const examId = parseInt(params.exam);
  // const prisma = new PrismaClient();

  // get all the questions from the exam with id of examId
  // const question = prisma.question.findFirst();
  try {
    const examData = await prisma.generatedExam.findFirst({
      where: {
        id: examId
      },
      include: {
        QuestionList: {
          include: {
            question: {
              include: {
                choices: true
              },
            },
          },
          orderBy: {
            questionId: "asc"
          }
        },
        exam: true
      }
    });

    console.log("HERE: ", examData);
    return {
      props: {
        exam: examData?.exam.name,
        questionList: examData?.QuestionList.map(question => question.question), // the data returned is from the QuestionList table - we just want the question data
        numberQuestions: examData?.exam.numberQuestions
      }
    }
  } catch (e) {
    console.log("ERROR fetching questions: ", e);
    return {
      props: {
        exam: "Error"
      }
    }
  }

}