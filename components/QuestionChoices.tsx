import styles from "@/styles/QuestionChoices.module.css";
import { Choice } from "@prisma/client";
import { useState } from "react";

/*
  should radio buttons or checkboxes be used? It is possible that
  there are questions with more than one answer? What about 
  questions that are left unanswered?
*/

// TODO: This is where some global state of what questions have been answered and their
// values would be set.

export interface Props {
  choices: Choice[]
}

export default function QuestionChoices({ choices }: Props) {
  const [selectedAnswer, setSelectedAnswer] = useState<number>();

  return (
    <ol className={styles.questionChoiceList}>
      {choices.map((choice) => (
        <li key={`${choice.id}`} className={styles.choiceItem}>
          <input
            type="checkbox"
            checked={selectedAnswer === choice.answerIndex}
            onChange={() => setSelectedAnswer(choice.answerIndex)}
          />
          {choice.text}
        </li>
      ))}
    </ol>
  );
}
