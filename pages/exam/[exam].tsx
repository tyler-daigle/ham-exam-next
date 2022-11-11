import { PrismaClient, Question } from "@prisma/client";


export interface Props {
  exam: number;
  questionList: Question[];
}


export default function ExamPage({ exam, questionList }: Props) {
  return (
    <div>
      <h1>This is an exam!</h1>
      <h2>ID: {exam}</h2>
      <p>Lorem ipsum dolor sit amet.</p>
    </div>
  )
}


export async function getStaticPaths() {
  const prisma = new PrismaClient();
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
  const prisma = new PrismaClient();

  // get all the questions from the exam with id of examId

  const questions = await prisma.generatedExam.findFirst({
    where: {
      examId: examId
    },
    include: {
      QuestionList: true
    }
  });

  console.log(questions);

  return {
    props: {
      exam: "The exam!"
    }
  }
}