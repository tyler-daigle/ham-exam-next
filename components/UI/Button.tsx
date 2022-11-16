import styles from "@/styles/Button.module.css";

export interface Props {
  children: React.ReactNode;
  onClick: React.MouseEventHandler;
  disabled?: boolean;
}

export default function Button({ children, onClick, disabled }: Props) {
  if (disabled) {
    return <button onClick={(e) => e.preventDefault()} className={`${styles.button} ${styles.disabledButton}`}>{children}</button>;
  }
  return <button onClick={onClick} className={`${styles.button} ${styles.primaryButton}`}>{children}</button>;
}
