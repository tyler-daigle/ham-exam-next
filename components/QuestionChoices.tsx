import styles from "@/styles/QuestionChoices.module.css";
import { Choice } from "@prisma/client";

export interface Props {
  choices: Choice[]
}

export default function QuestionChoices({ choices }: Props) {
  return (
    <ol className={styles.questionChoiceList}>
      {choices.map((choice) => (
        <li key={`${choice.id}`} className={styles.choiceItem}>
          {choice.text}
        </li>
      ))}
    </ol>
  );
}
