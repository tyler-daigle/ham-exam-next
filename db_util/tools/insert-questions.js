"use strict";
/*
  WARNING!!!

  Running this file will add all the questions from tech-questions.json
  to the database!

*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tech_questions_json_1 = __importDefault(require("./tech-questions.json"));
const db_1 = require("../db");
function addQuestion(question) {
    return __awaiter(this, void 0, void 0, function* () {
        yield db_1.prisma.question.create({
            data: {
                questionId: question.id,
                questionText: question.text,
                answer: question.answer,
                subelement: question.subelement,
                group: question.group,
                choice0: question.choices[0],
                choice1: question.choices[1],
                choice2: question.choices[2],
                choice3: question.choices[3]
            }
        });
        console.log(`Added question ${question.id}.`);
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        tech_questions_json_1.default.forEach((question) => __awaiter(this, void 0, void 0, function* () {
            yield addQuestion(question);
            console.log(`Added question ${question.id}`);
        }));
    });
}
main();
