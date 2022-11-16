import { useState } from "react";
import Link from "next/link";
import styles from "@/styles/ExamSelector.module.css";

import Button from "./UI/Button";

export default function ExamSelector() {
  const [techVisible, setTechVisible] = useState(false);
  const [generalVisible, setGeneralVisible] = useState(false);
  const [extraVisible, setExtraVisible] = useState(false);

  return (
    <ul className={styles.selectorContainer}>
      <li className={styles.examItem}>
        <Button onClick={() => setTechVisible(!techVisible)}>Technician</Button>
        <p className={styles.examDetails}>
          This is the first level of amateur license.
        </p>

        <div className={techVisible ? `${styles.examDirections} ${styles.examDirectionsToggle}` : styles.examDirections}>
          <p>
            There are <strong>35 questions</strong> on the Technician Exam. You must get at least <strong>26 correct</strong> in order
            to pass.
          </p>
          <Link className={styles.examLink} href="/exam">Click here to begin the exam.</Link>
        </div>

      </li>

      <li className={styles.examItem}>
        <Button onClick={() => setGeneralVisible(!generalVisible)} disabled>General</Button>
        <p className={styles.examDetails}>
          <strong>General</strong> is your next step after <strong>Technician</strong>.
        </p>
      </li>

      <li className={styles.examItem}>
        <Button onClick={() => setExtraVisible(!extraVisible)} disabled>Extra</Button>
        <p className={styles.examDetails}>
          <strong>Extra</strong> is obtainable after <strong>General</strong>.
        </p>
      </li>


    </ul>
  )
}