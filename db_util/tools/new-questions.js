"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
// read each question
// add the question to the database
// get the question's ID
// add the choices to the database and set each ones questionID to the questionID we just got.
function addQuestions() {
    return __awaiter(this, void 0, void 0, function* () {
        const questionId = "1234";
        try {
            yield db_1.prisma.question.create({
                data: {
                    questionId: "1235",
                    questionText: "This is a question",
                    subelement: "T1",
                    group: "T1A",
                    correctAnswer: 2,
                    choices: {
                        create: [
                            {
                                answerIndex: 0,
                                text: "This is the first choice"
                            },
                            { answerIndex: 1, text: "This is the 2nd choice" },
                            { answerIndex: 2, text: "This is the 3rd choice" },
                            { answerIndex: 3, text: "This is the 4th choice" },
                        ]
                    }
                }
            });
        }
        catch (e) {
            console.log("Not ok: ", e);
        }
        console.log("ok");
    });
}
function getQuestion() {
    return __awaiter(this, void 0, void 0, function* () {
        const q = yield db_1.prisma.question.findFirst({ include: { choices: true } });
        return q;
    });
}
(function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield addQuestions();
        // const q = await getQuestion();
        // console.log(q?.questionText);
        // q?.choices.forEach((choice, index) => console.log(`${index}: `, choice));
        // console.log(q?.correctAnswer);
    });
})();
