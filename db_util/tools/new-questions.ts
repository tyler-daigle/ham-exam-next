import questionsJSON from "./tech-questions.json";

// read each question
// add the question to the database
// get the question's ID
// add the choices to the database and set each ones questionID to the questionID we just got.



function addQuestions() {
  const choices = [];

  for(let question of questionsJSON) {
    const questionId = question.id;
    // add the question

    for(let choice of question.choices) {
      // add the choice using the questionID
      
    }

  }  


}