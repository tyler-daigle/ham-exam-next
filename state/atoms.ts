import { ExamTypes } from "@/types/types";
import { atom } from "jotai";

export const examAtom = atom(ExamTypes.TECHNICIAN);
export const answersAtom = atom(new Map<string, number>());
