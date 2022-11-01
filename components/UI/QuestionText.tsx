export interface Props {
  children: React.ReactNode
}

export default function QuestionText({ children }: Props) {
  return (
    <p style={{ lineHeight: "1.35rem", fontWeight: "bold" }}>{children}</p>
  );
}
