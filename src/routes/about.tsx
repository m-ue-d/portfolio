import { A, Title } from "solid-start";
import Counter from "~/components/Counter";

export default function About() {
  return (
    <main>
      <Title>About</Title>
      <A href="/">Home</A>
      <A href="/about">About</A>
      <h1>Hello world!</h1>
      <Counter />
      <p>
        Visit{" "}
        <a href="https://start.solidjs.com" target="_blank">
          start.solidjs.com
        </a>{" "}
        to learn how to build SolidStart apps.
      </p>
    </main>
  );
}
