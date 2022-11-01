import styles from "@/styles/Button.module.css";

export interface Props {
  children: React.ReactNode
}

export default function Button({ children }: Props) {
  return <button className={styles.primaryButton}>{children}</button>;
}
