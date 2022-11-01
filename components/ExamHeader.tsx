import styles from "@/styles/ExamHeader.module.css";

export interface Props {
  children: React.ReactNode
}
export default function ExamHeader({ children }: Props) {
  return <h2 className={styles.examHeader}>{children}</h2>;
}
