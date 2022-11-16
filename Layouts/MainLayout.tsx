import MainContainer from "@/components/UI/MainContainer";
import ExamHeader from "@/components/ExamHeader";

export interface Props {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <>
      <ExamHeader>Amateur-Radio.School</ExamHeader>
      <MainContainer>
        {children}
      </MainContainer>
    </>
  )
}