export interface SingleQuestion {
   category: string,
   value: number,
   question: string,
   answer: string,
   round: string,
   map:any, // why is this needed?
}

export interface QuestionList {
  questions: Array<SingleQuestion>;
  currentRound: number;
  gridArr: any;
  gridNumbers: any;
  showQuestion: any;
}