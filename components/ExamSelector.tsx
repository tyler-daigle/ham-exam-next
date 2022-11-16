import styles from "@/styles/ExamSelector.module.css";

import Button from "./UI/Button";

export default function ExamSelector() {
  return (
    <ul className={styles.selectorContainer}>
      <li className={styles.examItem}>
        <Button>Technician</Button>
        <p className={styles.examDetails}>
          This is the first level of amateur license.
        </p>
      </li>

      <li className={styles.examItem}>
        <Button>General</Button>
        <p className={styles.examDetails}>
          <strong>General</strong> is your next step after <strong>Technician</strong>.
        </p>
      </li>

      <li className={styles.examItem}>
        <Button>Extra</Button>
        <p className={styles.examDetails}>
          <strong>Extra</strong> is obtainable after <strong>General</strong>.
        </p>
      </li>


    </ul>
  )
}