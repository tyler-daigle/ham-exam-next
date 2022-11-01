// import styles from "../styles/QuestionItem.module.css";
import styles from "@/styles/QuestionItem.module.css";
import QuestionContainer from "./QuestionContainer";
import QuestionText from "./QuestionText";
import QuestionChoices from "./QuestionChoices";

import { IQuestion } from "@/types/types";

export interface Props {
  question: IQuestion;
  index: number;
}

export default function QuestionItem({ question, index }: Props) {
  return (
    <QuestionContainer>
      <div className={styles.questionDetails}>
        <span className={styles.questionIndex}>Question {index + 1} of 37</span>
        <span className={styles.questionId}>{question.id}</span>
      </div>

      <QuestionText>{question.text}</QuestionText>
      <QuestionChoices choices={question.choices} />
    </QuestionContainer>
  );
}
