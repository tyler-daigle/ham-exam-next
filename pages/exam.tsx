import React, { useState } from "react";

import { examAtom } from "state/atoms";
import { useAtom } from "jotai";

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
  const examAnswers = new Map<string, number>();

  const [savedAnswers, setSavedAnswers] = useState<React.ReactNode[]>([]);

  const [examName, setExamName] = useAtom(examAtom);

  const checkAnswers = () => {
    examAnswers.set("T1A01", 0);
    examAnswers.set("T1A02", 1);
    examAnswers.set("T1B08", 3);
    examAnswers.set("T2B04", 1);
    examAnswers.set("T3C01", 0);

    const answers = [];
    for (const [questionId, answer] of examAnswers?.entries()) {
      answers.push(<li>{questionId} : {answer}</li>);
    }
    setSavedAnswers(answers);

    // TODO: this will be set in global state and then the results page can load and use the values to
    // calculate the grade.
  }

  return (
    <div>
      The exam name is {examName}.
      <button type="button" onClick={() => checkAnswers()}>Check Answers</button>

      <ul>
        {savedAnswers.length !== 0 ?
          (savedAnswers) :
          (<li>No Answers Yet</li>)
        }
      </ul>
    </div>

  )
}