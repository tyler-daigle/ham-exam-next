import { useState } from "react";
import { useQuery } from "react-query";
import QuestionList from "@/components/QuestionList";

// TODO: move these types into the type file
interface SubelementDetails {
  subelementId: string;
  name: string;
  numExamQuestions: number;
  numGroups: number;
  numTotalQuestion: number;
}

interface IExamData {
  examId: number;
  name: string;
  numberQuestions: number;
  requiredCorrect: number;
  subelements: SubelementDetails[];
}

interface RawQuestion {
  questionId: string;
  questionText: string;
  answer: number;
  choice0: string;
  choice1: string;
  choice2: string;
  choice3: string;
}

async function getExamData(): Promise<IExamData> {
  const examName = "Technician";
  const res = await fetch(`http://localhost:3000/api/exams/${examName}`);
  const json = await res.json();
  return json;
}

export default function QuestionBrowser() {
  const { data, isLoading, isError } = useQuery("techExam", getExamData);
  const [selectedSubelement, setSelectedSubelement] = useState<string>();

  if (isLoading) {
    return <span>Loading...</span>;
  }
  if (isError) {
    return <span>Error loading the exam data</span>;
  }

  const examData = data!;
  const subelements: SubelementDetails[] = examData.subelements;

  return (
    <div>
      <h1>This is the question browser</h1>
      <h2>{examData.name}</h2>

      <ol>
        {subelements.map(
          element => {
            return (
              <li
                onClick={() => setSelectedSubelement(element.subelementId)}
                key={element.subelementId}
                style={{
                  backgroundColor: selectedSubelement === element.subelementId ? "red" : "",
                  cursor: "pointer"

                }}
              >{element.subelementId}: {element.name}
              </li>
            )
          })
        }
      </ol>

      {selectedSubelement && <QuestionListBrowser subelementId={selectedSubelement} />}
    </div>
  )
}


function QuestionListBrowser({ subelementId }: { subelementId: string }) {
  const { data, isLoading, isError } = useQuery(subelementId, async () => {
    const res = await fetch(`http://localhost:3000/api/questions/subelement?s=${subelementId}`);
    const json = await res.json();
    return json;
  })

  if (!subelementId) {
    return <span>Choose a subelement</span>;
  }

  if (isLoading) return <span>Loading Questions...</span>;

  return (
    <div>
      <QuestionListRaw questions={data!.questions} />
    </div>
  )
}

// TODO: fix the api so that it combines the choices into one array like everything else uses.

function QuestionListRaw({ questions }: { questions: RawQuestion[] }) {
  return (
    <div>
      {questions.map(question => {
        return (
          <div style={{ margin: "1rem 0" }}>
            <span>{question.questionId}</span>
            <p>{question.questionText}</p>
            <ol style={{ listStyleType: "upper-alpha", padding: "2rem" }}>
              <li>{question.choice0}</li>
              <li>{question.choice1}</li>
              <li>{question.choice2}</li>
              <li>{question.choice3}</li>
            </ol>
          </div>
        )

      })}
    </div>
  )
}