import styles from "@/styles/GradeDisplay.module.css";
import GreenText from "./UI/GreenText";
import SmallText from "./UI/SmallText";

interface GradeProps {
  numCorrect: number,
  numTotal: number
};

export default function GradeDisplay({ numCorrect, numTotal }: GradeProps) {
  const passingGrade = 78;

  if (numTotal === 0) {
    throw new Error("There are Zero total questions in the exam.");
  }
  const grade = Math.floor((numCorrect / numTotal) * 100)

  return (
    <div className={styles.gradeContainer}>
      <GreenText><strong>You got {numCorrect} correct out of {numTotal}.</strong></GreenText>
      <div className={styles.gradeDisplay}>
        <span>{grade}%</span>
      </div>

      <p className={styles.gradeDetails}>
        {grade >= passingGrade ?
          <SmallText><GreenText><strong>{grade}%</strong></GreenText> is a passing grade. Congratulations!</SmallText> :
          <SmallText><GreenText><strong>{grade}%</strong></GreenText> is not a passing grade. Keep studying and try again.</SmallText>
        }
      </p>
    </div>
  )
};