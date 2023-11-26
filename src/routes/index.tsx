import { A, Title } from "solid-start";
import Counter from "~/components/Counter";
import "../styles/Home.css";
import Projects from "~/components/ProjectMap";

export default function Home() {
  return (
    <>
      <Title>Fabian Mild</Title>
      <header>
        <A href="/">Home</A>
        <a href="https://github.com/m-ue-d" target="_blank">Github</a>
      </header>
      <main>
        <div class="animate">
          <h1>MÜD</h1>
          <p>It's about the fun!!!</p>
        </div>
        <Projects></Projects>
      </main>
      <footer>
        
      </footer>
    </>
  );
}
