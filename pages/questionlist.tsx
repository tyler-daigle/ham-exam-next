import { useEffect, useState } from "react";
import { QuestionWithChoices } from "@/types/types";
import { z } from "zod";

import QuestionContainer from "@/components/QuestionContainer";
import QuestionText from "@/components/QuestionText";
import QuestionChoices from "@/components/QuestionChoices";
import QuestionChoicesWithSelect from "@/components/QuestionChoicesWithSelect";
import MainContainer from "@/components/UI/MainContainer";
import Button from "@/components/UI/Button";
import QuestionHeader from "@/components/QuestionHeader";
import GreenText from "@/components/UI/GreenText";

export default function QuestionListPage() {
  const [groupId, setGroupId] = useState("");
  const [questionData, setQuestionData] = useState<QuestionWithChoices[]>([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [numQuestions, setNumQuestions] = useState(0);

  const lookupQuestion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const parser = z.string().length(3);
      parser.parse(groupId);
      setError(false);
      console.log(`Looking up: ${groupId}`)

      const res = await fetch(`http://localhost:3000/api/questions/group?g=${groupId}`);
      const json = await res.json() as QuestionWithChoices[];
      console.log(json);
      setQuestionData(json)
      setNumQuestions(json.length);
    } catch (e) {
      setError(true);
      setErrorMessage("Error in your input.")
    }
  }
  return (
    <MainContainer>
      <>
        <form onSubmit={lookupQuestion}>
          <input type="text" value={groupId} onChange={(e) => setGroupId(e.target.value.toUpperCase())} />
          <Button>Look Up Group</Button>

          {error && <span>{errorMessage}</span>}
        </form>

        {questionData.map((question, index) =>
          <QuestionContainer key={question.id}>
            <QuestionHeader>
              <GreenText>{question.questionId}</GreenText>
              <GreenText>{index + 1} of {numQuestions}</GreenText>
            </QuestionHeader>
            <QuestionText>{question.questionText}</QuestionText>
            <QuestionChoices choices={question.choices} />
            {/* <QuestionChoicesWithSelect choices={question.choices} /> */}
          </QuestionContainer>
        )}
      </>
    </MainContainer>
  )
}