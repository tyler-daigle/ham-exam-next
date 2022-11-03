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
const tech_groups_json_1 = __importDefault(require("./tech-groups.json"));
const db_1 = require("../db");
const getSubelement = (groupId) => groupId.substring(0, 2);
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const groups = tech_groups_json_1.default;
        try {
            groups.forEach((group) => __awaiter(this, void 0, void 0, function* () {
                yield db_1.prisma.group.create({
                    data: {
                        groupId: group.groupId,
                        description: group.description,
                        subelementId: getSubelement(group.groupId)
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
