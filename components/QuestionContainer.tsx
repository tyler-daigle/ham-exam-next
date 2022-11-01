import styles from "@/styles/QuestionContainer.module.css";

export interface Props {
  children: React.ReactNode
}
export default function QuestionContainer({ children }: Props) {
  return <li className={styles.questionContainer}>{children}</li>;
}
