export interface Props {
  children: React.ReactNode;
}

export default function SmallText({ children }: Props) {
  return <p style={{ fontSize: ".8rem", margin: ".5rem 0" }}>{children}</p>;
}
