import MainContainer from "@/components/UI/MainContainer";
import ExamHeader from "@/components/ExamHeader";
import Link from "next/link";

export interface Props {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <>
      <ExamHeader><Link href="/">Amateur-Radio.School</Link></ExamHeader>
      <MainContainer>
        {children}
      </MainContainer>
    </>
  )
}