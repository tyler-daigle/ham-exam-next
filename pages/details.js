export default function Details({title, desc}) {
  return (
    <div>
      <h1>{title}</h1>
      <p>{desc}</p>
    </div>
  )
}

export async function getStaticProps() {
  return {
    props: {
      title: "This is a test",
      desc: "I am not sure how static sites work with the <Link> component"
    }
  };
}