import { Question as PrismaQuestion, Choice } from "@prisma/client"

export interface QuestionWithChoices extends PrismaQuestion {
  choices: Choice[]
}

export enum ExamTypes {
  TECHNICIAN = "technician",
  GENERAL = "general",
  EXTRA = "extra"
};