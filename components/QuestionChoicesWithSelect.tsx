import styles from "@/styles/QuestionChoices.module.css";
import { Choice } from "@prisma/client";
import { useState } from "react";
import { useAtom } from "jotai";
import { answersAtom } from "state/atoms";

/*
  should radio buttons or checkboxes be used? It is possible that
  there are questions with more than one answer? What about 
  questions that are left unanswered?
*/

// TODO: This is where some global state of what questions have been answered and their
// values would be set.

export interface Props {
  choices: Choice[];
  questionId: string;
  answerMap: Map<string, number>;
}

export default function QuestionChoicesWithSelect({ choices, questionId, answerMap }: Props) {
  const [selectedAnswer, setSelectedAnswer] = useState<number>();

  const setAnswer = (choiceIndex: number) => {
    setSelectedAnswer(choiceIndex);
    answerMap.set(questionId, choiceIndex);
  };

  const style = {
    display: "flex",
    alignItems: "center",
    gap: "1rem"
  };

  return (
    <ol className={styles.questionChoiceList} style={{ listStyleType: "none", margin: "0 1rem" }}>
      {choices.map((choice) => (
        <li key={`${choice.id}`} className={styles.choiceItem} style={style} >
          <input
            type="checkbox"
            checked={selectedAnswer === choice.answerIndex}
            onChange={() => setAnswer(choice.answerIndex)}
          />
          <label>{choice.text}</label>
        </li>
      ))}
    </ol>
  );
}
