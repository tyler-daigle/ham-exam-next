import style from "@/styles/PageHeader.module.css";

export interface Props {
  children: React.ReactNode;
}

export default function PageHeader({ children }: Props) {
  return (
    <h1 className={style.pageHeader}>{children}</h1>
  )
}