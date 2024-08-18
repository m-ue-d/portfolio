import styles from './ProjectPanel.module.scss';
import HeastLogo from '../assets/logo.png';
import { Project } from '../model/project';
import { For, Setter, createSignal, onCleanup, onMount } from 'solid-js';

//the following 29 lines of code were mostly taken from https://github.com/FabianHummel/Retro-Portfolio/commit/3374903ef0ef0ddbd761be5fbbdb80dbfe3c0710; thank you Fabi <3
const username = "m-ue-d";
const endpoint = "https://api.github.com/users";

async function fetchUser(name: string) {
    const user = localStorage.getItem("user");
    if(user)
        return JSON.parse(user);
    const response = await (await fetch(`${endpoint}/${name}`)).json();
    localStorage.setItem("user", JSON.stringify(response));
    return response;
}

async function fetchRepos() {
    const repos = localStorage.getItem("repos");
    if(repos)
        return JSON.parse(repos);
    const response = await (await fetch(`${endpoint}/${username}/repos`)).json();
    localStorage.setItem("repos", JSON.stringify(response));
    return response;
}

async function fetchStarred() {
    const starred = localStorage.getItem("starred");
    if(starred)
        return JSON.parse(starred);
    const response = await (await fetch(`${endpoint}/${username}/starred`)).json();
    localStorage.setItem("starred", JSON.stringify(response));
    return response;
}

let user;
let repos: any[];
let starred;

user = await fetchUser(username);
repos = await fetchRepos();
repos = repos.filter((r: { fork: any; }) => !r.fork);
starred = await fetchStarred();

export default function ProjectPanel() {

    const [projects, setProjects] = createSignal<Project[]>([]);

    const [selectedProject, setSelectedProject] = createSignal<Project|null>(null);

    const calculatePosition = (index: number, total: number, time: number) => {
        const sizeMult = 0.34;
        const angle = (index / total) * 2 * Math.PI + time / 100000;
        const radius = 30;
        const x = sizeMult * radius * Math.cos(angle) * 2;
        const y = sizeMult * radius * Math.sin(angle) * 0.4;
        const zMult = 5;
        const z = sizeMult * Math.sin(angle) * zMult;

        const maxZ = 2 * zMult;
        const minOpacity = 0.1;
        const maxOpacity = 1.0;
        const opacity = minOpacity + (maxOpacity - minOpacity) * ((z + zMult) / maxZ);
        return { x, y, z, opacity };
    };

    let inter = 0;

    onMount(() => {
        setProjects(repos.map(repo => new Project(repo.name)));
        inter = setInterval(() => {
            const time = Date.now();
            setProjects(prevProjects => prevProjects.map(project => ({ ...project, time })));
        }, 1);
    });

    onCleanup(() => {
        clearInterval(inter);
    });

    return <div class={styles.container}>
        <h2>MY PROJECTS</h2>
        <div class={styles.wrapper}>
            <ul class={styles.projects}>
                <For each={projects()}>{(project,idx) => {
                    const position = calculatePosition(idx(), projects().length, Date.now());
                    return <li 
                        onMouseDown={(e)=>{
                            if(e.shiftKey) {    //TODO: JUST FOR TESTING
                                setSelectedProject(null);
                                return;
                            }
                            console.log(`pos: x=${position.x}, y=${position.y}, z=${position.z}`);
                            //TODO: let project fly to the middle and back if clicked again =)
                            setSelectedProject(project);
                        }} 
                        style={{ opacity: selectedProject()?.name===project.name? "0" : position.opacity, transform: `translate3d(${position.x}em, ${position.y}em, ${position.z}em)` }}>
                            <img src={HeastLogo} alt="Test with Heast logo"/>
                            <p style={{color: "white"}}>{repos[idx()]?.name}</p>
                        </li>
                    }}
                </For>
            </ul>
        </div>
    </div>;
}