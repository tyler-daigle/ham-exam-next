import Link from "next/link";
import { prisma } from "../db_util/db";

interface PageProps {
  examIds: number[]
}

export default function Home({ examIds }: PageProps) {
  console.log(examIds);

  return (
    <div>
      <h1>Ham Exam</h1>
      <Link href="/question/T1A01">Question</Link>
      <Link href="/details">Details</Link>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, nobis!
        Laboriosam eos necessitatibus laborum assumenda?
      </p>
      <h2>Technician Exams:</h2>
      <ol>
        {examIds.map(examId => <li key={examId}>
          <Link href={`/exam/${examId}`}>Tech Exam {examId}</Link>
        </li>)}
      </ol>
    </div>
  );
}

export async function getStaticProps() {
  const exams = await prisma.generatedExam.findMany({
    where: {
      examId: 0,
    },
    select: {
      id: true
    }
  });

  return {
    props: {
      examIds: exams.map(exam => exam.id)
    }
  }
}
