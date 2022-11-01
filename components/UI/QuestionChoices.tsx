import styles from "../styles/QuestionChoices.module.css";
import { useState } from "react";

/*
  should radio buttons or checkboxes be used? It is possible that
  there are questions with more than one answer? What about 
  questions that are left unanswered?
*/

// TODO: This is where some global state of what questions have been answered and their
// values would be set.

export default function QuestionChoices({ choices }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  return (
    <ol className={styles.questionChoiceList}>
      {choices.map((choice, index) => (
        <li className={styles.choiceItem}>
          <input
            type="checkbox"
            checked={selectedAnswer === index}
            onChange={() => setSelectedAnswer(index)}
          />
          {choice}
        </li>
      ))}
    </ol>
  );
}
