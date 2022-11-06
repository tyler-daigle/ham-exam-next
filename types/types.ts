import { Question as PrismaQuestion, Choice } from "@prisma/client"
export interface QuestionWithChoices extends PrismaQuestion {
  choices: Choice[]
}