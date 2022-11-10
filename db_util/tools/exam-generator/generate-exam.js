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
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const examName = "Technician";
        const questionList = [];
        try {
            // get the exam data and the subelements
            const res = yield db_1.prisma.exam.findFirst({
                where: {
                    name: examName
                },
                include: {
                    subelements: {
                        include: {
                            groups: {
                                orderBy: {
                                    groupId: "asc"
                                }
                            },
                        },
                        orderBy: {
                            subelementId: "asc"
                        }
                    }
                }
            });
            if (res === null) {
                throw new Error("Response was null");
            }
            // loop through all the subelements 
            for (const subelement of res.subelements) {
                // loop through each group and get all the questions from that 
                // group - Randomly select one and add it to the questionList array
                for (const group of subelement.groups) {
                    // get questions from the group
                    const questions = yield db_1.prisma.question.findMany({
                        where: {
                            group: group.groupId
                        }
                    });
                    const chosenQuestion = questions[Math.floor(Math.random() * questions.length)];
                    questionList.push(chosenQuestion);
                }
            }
        }
        catch (e) {
            console.log("SOMETHING WENT WRONG!!!", e);
        }
        console.log(JSON.stringify(questionList));
        console.log("Number of questions: ", questionList.length);
    });
}
main();
