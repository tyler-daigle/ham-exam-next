// TODO: Get rid of this once the styles are moved somewhere else


import styles from "@/styles/QuestionItem.module.css";

import QuestionText from "@/components/QuestionText";
import { Choice, Question as PrismaQuestion } from "@prisma/client";
import { QuestionWithChoices } from "@/types/types";
import React from "react";

export interface Props {
  question: QuestionWithChoices;
  selectedAnswer: number | null;
  hideHelp: boolean
}

export default function QuestionItemViewOnly({ question, selectedAnswer = null, hideHelp = false }: Props) {
  console.log(question);
  return (
    <QuestionItemViewOnlyContainer>
      <div className={styles.questionDetails} style={{ justifyContent: "flex-end" }}>
        <span className={styles.questionId} >{question.id}</span>
      </div>
      <QuestionText>{question.questionText}</QuestionText>
      <QuestionChoicesViewOnly choices={question.choices} correctAnswer={question.correctAnswer} selectedAnswer={selectedAnswer} />
      {!hideHelp && <span className={styles.helpLink}>Get help with this question.</span>}
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

interface QuestionChoicesViewOnlyProps extends React.PropsWithChildren {
  choices: Choice[];
  correctAnswer: number | null;
  selectedAnswer: number | null;
}

function QuestionChoicesViewOnly({ choices, correctAnswer, selectedAnswer }: QuestionChoicesViewOnlyProps) {

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

  return (
    <ol style={style as React.CSSProperties}>
      {choices.map((choice, index) => <QuestionChoiceItem key={`${choice.id}${index}`} choiceText={choice.text} correct={correctAnswer === index} wrong={correctAnswer !== selectedAnswer && index === selectedAnswer} />)}
    </ol>
  )
}

interface QuestionChoiceProps {
  choiceText: string;
  correct: boolean;
  wrong: boolean;
}

function QuestionChoiceItem({ choiceText, correct, wrong }: QuestionChoiceProps) {
  const correctStyle = {
    border: "dashed 2px var(--bright-green)",
    padding: "0.5rem",
    marginLeft: "-0.5rem",
    borderRadius: "5px"
  };

  const wrongStyle = {
    border: "dashed 2px var(--bright-red)",
    padding: "0.5rem",
    marginLeft: "-0.5rem",
    borderRadius: "5px"
  }

  let style = {};
  if (correct) {
    style = correctStyle;
  } else if (wrong) {
    style = wrongStyle;
  }


  return <li><div style={style}>{choiceText}</div></li>
}

function QuestionLegend() {

  const correct = {
    color: "white",
    fontWeight: "bold",
    padding: "0.5rem",
    border: "dashed 2px var(--bright-green)",
    borderRadius: "5px"
  };

  const wrong = {
    color: "white",
    fontWeight: "bold",
    padding: "0.5rem",
    border: "dashed 2px var(--bright-red)",
    borderRadius: "5px"
  };

  return (
    <div style={{ display: "flex", gap: "1rem", marginLeft: "1rem" }}>
      <span style={correct}>Correct Answer</span>
      <span style={wrong}>Your Answer</span>
    </div>
  )
}