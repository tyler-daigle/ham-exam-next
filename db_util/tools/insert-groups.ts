import groupJSON from "./tech-groups.json";
import { prisma } from "../db";



const getSubelement = (groupId: string) => groupId.substring(0, 2);

async function main() {
  const groups = groupJSON;

  try {
    groups.forEach(async group => {
      await prisma.group.create({
        data: {
          groupId: group.groupId,
          description: group.description,
          subelementId: getSubelement(group.groupId)
        }
      });
    })
  } catch (e) {
    console.log(`Error adding subelement`);
  }
}


main();