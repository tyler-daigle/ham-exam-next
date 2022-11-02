import styles from "@/styles/QuestionItem.module.css";

import QuestionText from "@/components/QuestionText";
import { IQuestion } from "@/types/types";
import React from "react";

export interface Props {
  question: IQuestion;
}

export default function QuestionItemViewOnly({ question }: Props) {
  return (
    <QuestionItemViewOnlyContainer>
      <div className={styles.questionDetails} style={{ justifyContent: "flex-end" }}>
        <span className={styles.questionId} >{question.id}</span>
      </div>
      <QuestionText>{question.text}</QuestionText>
      <QuestionChoicesViewOnly choices={question.choices} />
    </QuestionItemViewOnlyContainer>);
}

function QuestionItemViewOnlyContainer({ children }: { children: React.ReactNode }) {
  const style = {
    border: "solid 1px var(--question-container-border)",
    backgroundColor: "var(--question-container-bg)",
    padding: "1rem",
    borderRadius: "10px"
  };

  return (
    <div style={style}>
      {children}
    </div>
  )
}

function QuestionChoicesViewOnly({ choices }: { choices: string[] }) {

  const style = {
    listStyleType: "upper-alpha",
    paddingLeft: "2rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    margin: "1rem",
  };

  // using style={style as React.CSSProperties} because for some reason 
  // there is a typescript error on the flexDirection property if the style object is not cast

  // TODO: Highlight the correct answer
  return (
    <ol style={style as React.CSSProperties}>
      {choices.map(choice => <li>{choice}</li>)}
    </ol>
  )
}