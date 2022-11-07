import styles from "@/styles/QuestionItem.module.css";

import QuestionContainer from "@/components/QuestionContainer";
import QuestionText from "@/components/QuestionText";
import QuestionChoices from "@/components/QuestionChoices";

import { QuestionWithChoices } from "@/types/types";

export interface Props {

  children: React.ReactNode;
}

// TODO: make a seperate header component for the questions that will show the ID and the current question index (such as 1 of 37)

export default function QuestionItem({ children }: Props) {

  return (
    <QuestionContainer>
      {
      // TODO: Extract this out
      /* <div className={styles.questionDetails}>
        <span className={styles.questionIndex}>Question {index + 1} of 37</span>
        <span className={styles.questionId}>{question.id}</span>
      </div> */}


      {children}
      {/* <QuestionChoices choices={question.choices} /> */}
    </QuestionContainer>
  );
}

