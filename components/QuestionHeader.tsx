export interface Props {
  children: React.ReactNode;
}

export default function QuestionHeader({ children }: Props) {
  const style = {
    display: "flex",
    justifyContent: "space-between",
    margin: "0 0 1rem 0"
  };

  return (
    <div style={style}>
      {children}
    </div>
  )
}