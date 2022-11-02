import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Ham Exam</h1>
      <Link href="/question/T1A01">Question</Link>
      <Link href="/details">Details</Link>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, nobis!
        Laboriosam eos necessitatibus laborum assumenda?
      </p>
    </div>
  );
}
