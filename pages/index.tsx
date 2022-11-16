import ExamHeader from "@/components/ExamHeader";
import PageHeader from "@/components/PageHeader";
import MainContainer from "@/components/UI/MainContainer";
import ExamSelector from "@/components/ExamSelector";

export default function Index() {
  return (
    <>
      <ExamHeader>Amateur-Radio.School</ExamHeader>
      <MainContainer>
        <section>
          <PageHeader>Amateur Radio Practice Exams</PageHeader>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam accusantium quam officia distinctio officiis laboriosam, cupiditate placeat quis quasi tempora architecto hic dolorum doloribus voluptas iste fugit vero non expedita aspernatur aperiam soluta error! Nesciunt fugit libero nulla fugiat corrupti similique. Aut veniam voluptatibus, at in facere ut. Deserunt, quas!
          </p>
        </section>

        <section>
          <h2>Choose your exam level:</h2>
          <ExamSelector />
        </section>

        <section>
          <h2>Helpful Tools:</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui eligendi ipsum facilis deserunt labore esse, numquam aliquid ad blanditiis excepturi?
          </p>
        </section>
      </MainContainer>
    </>
  )
}