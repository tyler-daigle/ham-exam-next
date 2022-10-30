# Ham Exam Practice

Next.js version of the ham exam practice. Start with SQLite DB but will switch to Postgres.

Things to use or check out:

- Prisma
- Zod
- React Query
- Jotai

## Database

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

## API

```
/api/exam/[examname]
```

Returns details about the exam.
