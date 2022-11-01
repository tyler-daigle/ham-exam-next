export interface IQuestion {
  id: string;
  text: string;
  choices: string[];
  answer: number;
  subelement: string;
  group: string;
}