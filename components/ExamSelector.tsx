import { useState } from "react";
import Link from "next/link";
import styles from "@/styles/ExamSelector.module.css";
import { ExamTypes } from "@/types/types";

import { examAtom } from "state/atoms";
import { useAtom } from "jotai";

import Button from "./UI/Button";

export default function ExamSelector() {
  const [visibleExam, setVisibleExam] = useState(false);
  const [examType, setExamType] = useAtom(examAtom);

  const toggleExamType = (examName: ExamTypes) => {
    console.log("Ok");
    setVisibleExam(true);
    setExamType(examName);
  };

  return (
    <>

      <ul className={styles.selectorContainer}>
        <li className={styles.examItem}>
          <Button onClick={() => toggleExamType(ExamTypes.TECHNICIAN)}>Technician</Button>
          <p className={styles.examDetails}>
            This is the first level of amateur license.
          </p>
        </li>

        <li className={styles.examItem}>
          <Button onClick={() => toggleExamType(ExamTypes.GENERAL)} >General</Button>
          <p className={styles.examDetails}>
            <strong>General</strong> is your next step after <strong>Technician</strong>.
          </p>


        </li>

        <li className={styles.examItem}>
          <Button onClick={() => toggleExamType(ExamTypes.EXTRA)} disabled>Extra</Button>
          <p className={styles.examDetails}>
            <strong>Extra</strong> is obtainable after <strong>General</strong>.
          </p>
        </li>
      </ul>

      {visibleExam && (
        <div className={styles.examDirections}>
          <p>
            You have chosen the <strong>{examType}</strong> exam.
          </p>
          <Link className={styles.examLink} href="/exam">Click here to begin the {examType} exam.</Link>
        </div>
      )}


    </>
  )
}