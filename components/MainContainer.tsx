import styles from "@/styles/MainContainer.module.css";

export interface Props {
  children: React.ReactNode
}

export default function MainContainer({ children }: Props) {
  return <div className={styles.mainContainer}>{children}</div>;
}
