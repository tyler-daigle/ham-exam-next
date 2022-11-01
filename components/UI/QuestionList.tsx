import styles from "../styles/QuestionList.module.css";
import QuestionItem from "./QuestionItem";

export default function QuestionList({ questions }) {
  return (
    <ul className={styles.questionList}>
      {questions.map((question, index) => (
        <QuestionItem key={question.id} index={index} question={question} />
      ))}
    </ul>
  );
}
