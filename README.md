# Ham Exam Practice

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
