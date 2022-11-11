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
const db_1 = require("../../db");
const fs_1 = require("fs");
const examList = ["test-exam.json"];
var ExamType;
(function (ExamType) {
    ExamType[ExamType["TECHNICIAN"] = 0] = "TECHNICIAN";
    ExamType[ExamType["GENERAL"] = 1] = "GENERAL";
    ExamType[ExamType["EXTRA"] = 2] = "EXTRA";
})(ExamType || (ExamType = {}));
(function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            for (const examFile of examList) {
                const data = (0, fs_1.readFileSync)(examFile, { encoding: "utf-8" });
                const questionList = JSON.parse(data);
                const questionIds = [];
                for (const question of questionList) {
                    questionIds.push({ questionId: question.questionId });
                    // console.log(`Adding ${question.questionId}`);
                }
                yield db_1.prisma.generatedExam.create({
                    data: {
                        examId: ExamType.TECHNICIAN,
                        QuestionList: {
                            create: questionIds
                        }
                    }
                });
                console.log("Exam Created");
            }
        }
        catch (e) {
            console.log(e);
        }
    });
})();
