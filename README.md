# Ham Exam Practice

Next.js version of the ham exam practice. Start with SQLite DB but will switch to Postgres.

Things to use or check out:

- Prisma
- Zod
- React Query
- Jotai

## Database

---

**Exam**

- Exam ID
- Exam Name
- Subelements that make up the exam
- Required Score
- Number of Questions

**Subelements**

- Subelement ID
- Description
- Groups in the Subelement

**Groups**

- Group ID
- Description

**Questions**

- Question ID
- Question Text
- Choices
- Correct Answer
- Group ID
- Subelement ID
- Possible links to info on the question to help with studying

## API

---

*Refer to the schema.prisma for the types that are used for the models.*

### Get Details about an exam:

```
/api/exam/[examname]
```
Exam name must be one of: Technician, General, Extra

### Get a single question:

```
/api/question/[questionId]
```
questionId is the ID of the question which must be uppercase and five characters long. Such as: T1F05 or T2A01. 

### Get a list of questions:

```
/api/questions/questions?q=[question list]
```

questionList is a comma seperated list of questions. This enpoint returns an array of questions.

### Get all questions from a group:

```
/api/questions/group?g=[groupId]
```

groupId is the three character group Id, such as T1A. This endpoint will return an array of questions.

### Get all questions from a subelement:

```
/api/questions/subelement?s=[subelementId]
```

subelementId is the id of the subelement to get. This endpoint will return an array of questions.


## Prisma

---

## Steps for updating the database and creating the Prisma client:

1.  Create (or update) the schema in prisma/schema.prisma file.

2.  Run
    ```shell
    $ npx prisma migrate dev --name [name_of_the_migration]
    ```
3.  Create the Prisma Client
    [Refer to the docs](https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/generating-prisma-client):

    _make sure @prisma/client is installed_
    This also has to be run after **git clone** or **npm install** because the prisma client is stored in node_modules which does not get checked into git.

    DATABASE_URL="file:./dev.db also has to be set in the .env file (which also isn't checked into git)

    ```shell
    $ npx prisma generate
    ```

4.  Use the Prisma Client in the code:
    ```typescript
    import { PrismaClient } from "@prisma/client";
    ```

--- 

## The Database Tools 

In the db_util/tools directory there are tools for adding the JSON data files (question data, subelement data and groups data) to
the database using Prisma.

**They should only be run when the database needs to be completely rebuilt. There are three scripts:**

    1. insert-questions.ts - this is for adding the questions from the JSON question files. 
    
    2. insert-subelements.ts - this will add the subelements to the database. It MUST be 
       run before insert-groups.ts (the next script) because it has a relationship to the subelements.
    
    3. insert-groups.ts should run last. It adds the group data to the database.

*As of right now only the Technician questions are added. Once that is working the other tests will be added and the scripts (or the JSON) files
 will have to be changed because the scripts are manually importing the tech-question JSON files.*


