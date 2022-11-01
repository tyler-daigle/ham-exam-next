import styles from "../styles/QuestionContainer.module.css";

export default function QuestionContainer({ children }) {
  return <li className={styles.questionContainer}>{children}</li>;
}
