import { PrismaClient, Question } from "@prisma/client";
import { prisma } from "db_util/db";

export interface Props {
  exam: number;
  questionList: Question[];
}


export default function ExamPage({ exam, questionList }: Props) {
  console.log(questionList);
  return (
    <div>
      <h1>This is an exam!</h1>
      <h2>ID: {exam}</h2>
      <p>Lorem ipsum dolor sit amet.</p>
    </div>
  )
}


export async function getStaticPaths() {
  // const prisma = new PrismaClient();
  // get the IDs of each of the generated exams from the database
  // the ID is then sent to getStaticProps()

  const examData = await prisma.generatedExam.findMany();
  const examList = examData.map(exam => ({ params: { exam: exam.examId.toString() } }));
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
        examId: examId
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

    console.dir(examData);
    return {
      props: {
        exam: examData?.exam.name,
        questionList: examData?.QuestionList.map(question => question.question)
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