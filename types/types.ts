export interface IQuestion {
  id: string;
  text: string;
  choices: string[];
  answer: number;
  subelement: string;
  group: string;
}

export interface ISubelement {
  subelementId: string;
  name: string;
  numExamQuestions: number;
  numGroups: number;
  numTotalQuestions: number;
  groups: string[]
}

export interface IGroup {
  groupId: string;
  description: string;  
}