import styles from './ProjectPanel.module.scss';
import NoImage from '../assets/no-image-svgrepo-com.svg';
import { For, Setter, Show, createSignal, onCleanup, onMount } from 'solid-js';
import { Project } from '../model/project';

//the following 29 lines of code were mostly taken from https://github.com/FabianHummel/Retro-Portfolio/commit/3374903ef0ef0ddbd761be5fbbdb80dbfe3c0710; thank you Fabi <3
const username = "m-ue-d";
const userEndpoint = "https://api.github.com/users";
const repoEndpoint = "https://api.github.com/repos";

async function fetchUser(name: string) {
    const user = localStorage.getItem("user");
    if(user)
        return JSON.parse(user);
    const response = await (await fetch(`${userEndpoint}/${name}`)).json();
    localStorage.setItem("user", JSON.stringify(response));
    return response;
}

async function fetchRepos() {
    const repos = localStorage.getItem("repos");
    if(repos)
        return JSON.parse(repos);
    const response = await (await fetch(`${userEndpoint}/${username}/repos`)).json();

    localStorage.setItem("repos", JSON.stringify(response));
    return response;
}

async function fetchStarred() {
    const starred = localStorage.getItem("starred");
    if(starred)
        return JSON.parse(starred);
    const response = await (await fetch(`${userEndpoint}/${username}/starred`)).json();
    localStorage.setItem("starred", JSON.stringify(response));
    return response;
}

async function fetchRepoLogos(repos: any[]) {
    const logos: Record<string, string> = {};
    for (const repo of repos) {
        const logo = localStorage.getItem(`${repo.name}-logo`);
        if (logo) {
            logos[repo.name] = logo;
        } else {
            try {
                const response = await (await fetch(`${repoEndpoint}/${username}/${repo.name}/contents/logo.svg`, {
                    headers: {
                        'Accept': 'application/vnd.github.v3.raw',
                        'Content-Type': 'application/json',
                    },
                })).text();
                localStorage.setItem(`${repo.name}-logo`, response);
                logos[repo.name] = response;
            } catch (error) {
                console.error(`Failed to fetch logo for ${repo.name}:`, error);
            }
        }
    }
    return logos;
}

let user;
let repos: any[];
let starred;
let logos: Record<string, string>;

user = await fetchUser(username);
repos = await fetchRepos();
logos = await fetchRepoLogos(repos);
repos = repos.filter((r: { fork: any; }) => !r.fork);
starred = await fetchStarred();

export default function ProjectPanel() {
    const [projects, setProjects] = createSignal<Project[]>([]);
    const [selectedProject, setSelectedProject] = createSignal<Project|null>(null);
    let animationFrame: number;

    const calculatePosition = (index: number, total: number, time: number) => {
        const sizeMult = 0.34;
        const angle = (index / total) * 2 * Math.PI + time / 40000;
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

    const animate = () => {
        const time = Date.now();
        const projectElements = document.querySelectorAll(`.${styles.projects} li`);
        projectElements.forEach((el, idx) => {
            const element = el as HTMLElement;
            const position = calculatePosition(idx, projectElements.length, time);
            element.style.transform = `translate3d(${position.x}em, ${position.y}em, ${position.z}em)`;
            element.style.opacity = position.opacity.toString();
        });
        animationFrame = requestAnimationFrame(animate);
    };

    onMount(() => {
        setProjects(repos.map(repo => new Project(repo, logos[repo.name])));
        animationFrame = requestAnimationFrame(animate);
    });

    onCleanup(() => {
        cancelAnimationFrame(animationFrame);
    });

    return (
        <div class={styles.container}>
            <h2>MY PROJECTS</h2>
            <Show when={selectedProject()}>
                <div class={styles.selectedProject} onClick={() => setSelectedProject(null)}>
                    <div class={styles.selectedHead}>
                        <Show when={selectedProject()?.logo?.startsWith("<")}>
                            <div class={styles.logoContainer} innerHTML={selectedProject()?.logo} />
                        </Show>
                        {selectedProject()?.repo.name}
                    </div>
                    <div class={styles.selectedBody}>
                        <div class={styles.language}>{selectedProject()?.repo.language}</div>
                        <div class={styles.description}>{selectedProject()?.repo.description}</div>
                    </div>
                </div>
            </Show>
            <div class={styles.wrapper}>
                <ul class={styles.projects}>
                    <For each={projects()}>{(project, idx) => {
                        const position = calculatePosition(idx(), projects().length, Date.now());
                        return <li 
                            onMouseDown={(e) => {
                                e.stopPropagation();
                                setSelectedProject(project);
                            }} 
                            style={{ opacity: selectedProject()?.repo.name === project.repo.name ? "0.08" : "1" }}>
                                {project.logo?.startsWith("<")? <div class={styles.img} innerHTML={project?.logo}></div> : <div class={styles.noImg}><div>{project.repo.name}</div></div>}
                            </li>
                        }}
                    </For>
                </ul>
            </div>
        </div>
    );
}
