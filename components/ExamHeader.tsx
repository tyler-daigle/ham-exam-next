import styles from "../../styles/ExamHeader.module.css";

export default function ExamHeader({ children }) {
  return <h2 className={styles.examHeader}>{children}</h2>;
}
