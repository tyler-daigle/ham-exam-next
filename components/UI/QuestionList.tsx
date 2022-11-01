import styles from "@/styles/QuestionList.module.css";
import QuestionItem from "@/components/QuestionItem";
import { IQuestion } from "@/types/types";

export interface Props {
  questions: IQuestion[];
}

export default function QuestionList({ questions }: Props) {
  return (
    <ul className={styles.questionList}>
      {questions.map((question, index) => (
        <QuestionItem key={question.id} index={index} question={question} />
      ))}
    </ul>
  );
}
