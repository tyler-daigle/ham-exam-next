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
  // TODO: have to pass the ID of the question so that when the question is answered we know
  //       which question was answered.
}

export default function QuestionChoicesWithSelect({ choices }: Props) {
  const [selectedAnswer, setSelectedAnswer] = useState<number>();

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
            onChange={() => setSelectedAnswer(choice.answerIndex)}
          />
          {choice.text}
        </li>
      ))}
    </ol>
  );
}
