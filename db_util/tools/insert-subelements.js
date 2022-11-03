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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tech_subelements_json_1 = __importDefault(require("./tech-subelements.json"));
const db_1 = require("../db");
console.log(tech_subelements_json_1.default[0]);
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const subelements = tech_subelements_json_1.default;
        try {
            subelements.forEach((subelement) => __awaiter(this, void 0, void 0, function* () {
                yield db_1.prisma.subelement.create({
                    data: {
                        subelementId: subelement.subelementId,
                        name: subelement.name,
                        numExamQuestions: subelement.numExamQuestions,
                        numGroups: subelement.numGroups,
                        numTotalQuestions: subelement.numTotalQuestions
                    }
                });
            }));
        }
        catch (e) {
            console.log(`Error adding subelement`);
        }
    });
}
main();
