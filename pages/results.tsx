import MainLayout from "Layouts/MainLayout";
import PageHeader from "@/components/PageHeader";
import { answersAtom } from "../state/atoms";
import { useAtom } from "jotai";

export default function ResultsPage() {
  const [answersMap] = useAtom(answersAtom);

  const numAnswers = answersMap.size;

  return (
    <MainLayout>
      <PageHeader>Your Exam Results</PageHeader>
      <h3>You answered {numAnswers} questions.</h3>
    </MainLayout>
  )
}