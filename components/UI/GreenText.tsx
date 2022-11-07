export interface Props {
  children: React.ReactNode;
}
export default function GreenText({ children }: Props) {
  return (
    <span style={{ color: "#4be574" }}>{children}</span>
  )
}