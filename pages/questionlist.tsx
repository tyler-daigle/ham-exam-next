import { useEffect, useState } from "react";
import { QuestionWithChoices } from "@/types/types";
import { z } from "zod";

import QuestionItem from "@/components/QuestionItem";
import QuestionContainer from "@/components/QuestionContainer";
import QuestionText from "@/components/QuestionText";
import QuestionChoices from "@/components/QuestionChoices";

import MainContainer from "@/components/UI/MainContainer";
import Button from "@/components/UI/Button";


export default function QuestionListPage() {
  const [questionId, setQuestionId] = useState("");
  const [questionData, setQuestionData] = useState<QuestionWithChoices>();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [showChoices, setShowChoices] = useState(false);

  const lookupQuestion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const parser = z.string().length(5);
      parser.parse(questionId);
      setError(false);
      console.log(`Looking up: ${questionId}`)

      const res = await fetch(`http://localhost:3000/api/question/${questionId}`);
      const json = await res.json() as QuestionWithChoices;
      console.log(json);
      setQuestionData(json)
    } catch (e) {
      setError(true);
      setErrorMessage("Error in your input.")
    }

  }
  return (
    <MainContainer>
      <form onSubmit={lookupQuestion}>
        <input type="text" value={questionId} onChange={(e) => setQuestionId(e.target.value.toUpperCase())} />
        <Button>Look Up Question</Button>
        {questionData && (
          <QuestionContainer>
            <QuestionText>{questionData.questionText}</QuestionText>
            <span onClick={() => setShowChoices(!showChoices)}>Show Choices</span>
            {showChoices && <QuestionChoices choices={questionData.choices} />}
          </QuestionContainer>)}
        {error && <span>{errorMessage}</span>}
      </form>
    </MainContainer>
  )
}