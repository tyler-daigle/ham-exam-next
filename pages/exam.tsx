import React, { useState } from "react";

import { examAtom, answersAtom } from "state/atoms";
import { useAtom } from "jotai";
import { useQuery } from "react-query";
import { QuestionWithChoices } from "@/types/types";

import QuestionContainer from "@/components/QuestionContainer";
import QuestionHeader from "@/components/QuestionHeader";
import QuestionText from "@/components/QuestionText";
import GreenText from "@/components/UI/GreenText";
import QuestionChoicesWithSelect from "@/components/QuestionChoicesWithSelect";
import MainLayout from "Layouts/MainLayout";

import Button from "@/components/UI/Button";
import { useRouter } from "next/router";

// TODO: this page will fetch all the exam questions for the random test (using react-query)
// and then display the question list.
//
// The user answers the questions and then submits the exam and then it is forwarded to the
// results page where the score is calculated.

// all the question data should be stored in react-query? So when we get the question data once 
// using react-query if we use the same string it should return the cached data so we can use
// that for checking if the answers are correct.
// useQuery("questions", () => whatever);
// how do you force react-query to refetch data again?

export default function Exam() {
  // use a map that will store the answers to the questions, once the test is submitted this
  // map is saved to the global state where it can then be checked for correct answers.
  const examAnswers = new Map<string, number>();
  const [answersMap, setAnswersMap] = useAtom(answersAtom);
  const [examName] = useAtom(examAtom);
  const router = useRouter();

  // query to load the random exam questions
  const { isLoading, error, data } = useQuery(examName, async () => {
    const res = await fetch(`http://localhost:3000/api/exams/${examName}/random`);

    if (res.status === 404) {
      console.log("caught error");
      throw new Error("Not implemented");
    }

    const json = await res.json();

    // get just the questions
    const questions: QuestionWithChoices[] = json.QuestionList.map((q: any) => q.question);
    return questions
  });

  const numQuestions = 35; // TODO: Get from global state

  const saveAnswers = () => {
    setAnswersMap(new Map(examAnswers));
    router.push("/results");
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return (
      <>
        <div>Error: {error.toString()}</div>
      </>
    )
  }
  return (
    <MainLayout>
      <h2><GreenText><span className="capitalize">{examName}</span> Practice Exam</GreenText></h2>
      <p>Got {data?.length} questions. The exam name is {examName}. </p>

      {data?.map((question, index) =>
        <QuestionContainer key={question.id}>
          <QuestionHeader>
            <GreenText>{question.questionId}</GreenText>
            <GreenText>{index + 1} of {numQuestions}</GreenText>
          </QuestionHeader>
          <QuestionText>{question.questionText}</QuestionText>
          <QuestionChoicesWithSelect choices={question.choices} questionId={question.questionId} answerMap={examAnswers} />
        </QuestionContainer>
      )}
      <Button onClick={() => saveAnswers()}>Submit Exam</Button>
    </MainLayout>

  )
}