import { A, Title } from "solid-start";
import Counter from "~/components/Counter";
import "../styles/Home.css";
import "../styles/ProjectMap.css";

export default function Projects() {
  return (
    <div class="projects">
      <div class="card" style={{left: "51px", top: "845.91px", transform: "rotate(-15.85deg)"}}>
        <h2>Portal Radio</h2>
        <p>Explored:</p>
        <ul>
          <li>Raspberry PI</li>
          <li>3D Printing</li>
          <li>Python</li>
        </ul>
        <div class="subcard" style={{left: "-35px", bottom:"-20px", transform: "rotate(18.85deg)"}}>
          <a href="https://github.com/m-ue-d/portal-radio" target="_blank">github.com/m-ue-d/portal-radio</a>
        </div>
      </div>
      <div class="card" style={{left: "300px", top: "986px", transform: "rotate(17deg)"}}>
      <h2>Squavy</h2>
        <p>Explored:</p>
        <ul>
          <li>modular Synthesization</li>
          <li>web frameworks {"("}Web Audio API, Websockets, etc.{")"}</li>
          <li>Python</li>
        </ul>
        <img src="src/assets/squavy-logo.png" alt="Squavy Logo" class="squavy"/>
        <div class="subcard" style={{left: "45px", bottom:"-10px", transform: "rotate(-8.85deg)"}}>
          <a href="https://github.com/HarmonyHub-DAW" target="_blank">github.com/HarmonyHub-DAW</a>
        </div>
      </div>
      <div class="card" style={{left: "658px", top: "911px", transform: "rotate(-15.85deg)"}}>
      <h2>Heast Messenger</h2>
        <p>Explored:</p>
        <ul>
          <li>Networking</li>
          <li>Cybersecurity</li>
          <li>Clean Java Solutions</li>
        </ul>
        <img src="src/assets/heast-logo.png" alt="Heast Logo" class="heast"/>
        <div class="subcard" style={{left: "-15px", bottom:"-10px", transform: "rotate(11.85deg)"}}>
          <a href="https://github.com/Heast-Messenger" target="_blank">github.com/Heast-Messenger</a>
        </div>
      </div>
      <div class="card" style={{left: "1100px", top: "890px", transform: "rotate(2.85deg)"}}>
        <div class="subcard">

        </div>
      </div>
    </div>
  );
}
