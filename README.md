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

```
/api/exam/[examname]
```

Returns details about the exam.

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
