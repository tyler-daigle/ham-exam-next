import { ExamTypes, QuestionWithChoices } from "@/types/types";
import { atom } from "jotai";

// examAtom is used to store the exam type
export const examAtom = atom(ExamTypes.TECHNICIAN);

// answersAtom holds the answers that user has selected
export const answersAtom = atom(new Map<string, number>());

// correctAnswersAtom holds the correct answers
export const correctAnswersAtom = atom(new Map<string, number>());

export const allQuestionsAtom = atom<QuestionWithChoices[]>([]);
