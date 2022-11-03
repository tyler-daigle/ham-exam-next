-- CreateTable
CREATE TABLE "Group" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "groupId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "subelementId" TEXT NOT NULL,
    CONSTRAINT "Group_subelementId_fkey" FOREIGN KEY ("subelementId") REFERENCES "Subelement" ("subelementId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Subelement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "subelementId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "numExamQuestions" INTEGER NOT NULL,
    "numGroups" INTEGER NOT NULL,
    "numTotalQuestions" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Group_groupId_key" ON "Group"("groupId");

-- CreateIndex
CREATE UNIQUE INDEX "Subelement_subelementId_key" ON "Subelement"("subelementId");
