import styles from './ProjectPanel.module.scss';
import NoImage from '../assets/no-image-svgrepo-com.svg';
import { For, Setter, Show, createSignal, onCleanup, onMount } from 'solid-js';
import { Project } from '../model/project';
import HoverLink from './HoverLink';

//the following 59 lines of code were slightly modified from https://github.com/FabianHummel/Retro-Portfolio/blob/master/src/pages/Github.tsx; thank you Fabi <3
const username = "m-ue-d";
const userEndpoint = "https://api.github.com/users";
const repoEndpoint = "https://api.github.com/repos";

const lastUpdated = new Date(localStorage.getItem("github-last-updated") ?? 0);

if (lastUpdated && new Date().getTime() - lastUpdated.getTime() < 1000 * 60 * 60) {
    console.log("Using cached data.");
    var reposCache = JSON.parse(window.localStorage.getItem("github-repos")!);
} else {
    console.log("Fetching new data.");
    window.localStorage.setItem("github-last-updated", new Date().toISOString());
}

async function fetchRepos() {
    const repos = localStorage.getItem("github-repos");
    if(repos)
        return JSON.parse(repos);
    const response = await (await fetch(`${userEndpoint}/${username}/repos`)).json();

    localStorage.setItem("github-repos", JSON.stringify(response));
    return response;
}

async function fetchRepoLogos(repos: any[]) {
    const logos: Record<string, string> = {};
    for (const repo of repos) {
        const logo = localStorage.getItem(`github-${repo.name}-logo`);
        if (logo) {
            logos[repo.name] = logo;
        } else {
            try {
                let response = await (await fetch(`${repoEndpoint}/${username}/${repo.name}/contents/logo.svg`, {
                    headers: {
                        'Accept': 'application/vnd.github.v3.raw',
                        'Content-Type': 'application/json',
                    },
                })).text();
                if(response.includes('"message": "Not Found"') && await (await fetch(`${repoEndpoint}/${username}/${repo.name}/contents/logo.png`, {headers: {'Accept': 'application/vnd.github.v3.raw','Content-Type': 'application/json',},})).text()){
                    response = `https://github.com/${username}/${repo.name}/blob/${repo.default_branch}/logo.png?raw=true`;
                }
                localStorage.setItem(`github-${repo.name}-logo`, response);
                logos[repo.name] = response;
            } catch (error) {
                console.error(`Failed to fetch logo for ${repo.name}:`, error);
            }
        }
    }
    return logos;
}

let repos: any[] = reposCache || await fetchRepos();
let logos = await fetchRepoLogos(repos);
repos = repos.filter((r: { fork: any; }) => !r.fork);

export default function ProjectPanel() {
    const [projects, setProjects] = createSignal<Project[]>([]);
    const [selectedProject, setSelectedProject] = createSignal<Project|null>(null);
    let selectedRef!: HTMLDivElement;
    const [animationClass, setAnimationClass] = createSignal("");
    let animationFrame: number;
    let projectsWrapperRef!: HTMLDivElement;

    const calculatePosition = (index: number, total: number, time: number, opac: number) => {
        const sizeMult = 0.34;
        const angle = (index / total) * 2 * Math.PI + time / (1000 * projects().length);
        const radius = 30;
        const xMult = 2;
        const yMult = screen.width<=1200? 2 : 0.4;
        const zMult = 5;
        const x = sizeMult * radius * Math.cos(angle) * xMult;
        const y = sizeMult * radius * Math.sin(angle) * yMult;
        const z = sizeMult * Math.sin(angle) * zMult;

        const maxZ = 2 * zMult;
        const minOpacity = 0.1; 
        const maxOpacity = opac;
        const opacity = minOpacity + (maxOpacity - minOpacity) * ((z + zMult) / maxZ);
        return { x, y, z, opacity };
    };

    const animate = () => {
        if(screen.width <= 700){
            const projectElements = document.querySelectorAll(`.${styles.projects} li`);
            projectElements.forEach((el, idx) => {
                const element = el as HTMLElement;
                element.style.transform = `none`;
                element.style.opacity = "1";
            });
            animationFrame = requestAnimationFrame(animate);
            return;
        }
        const time = Date.now();
        const projectElements = document.querySelectorAll(`.${styles.projects} li`);
        projectElements.forEach((el, idx) => {
            const element = el as HTMLElement;
            const position = calculatePosition(idx, projectElements.length, time, +element.getAttribute("data-opacity")!);
            element.style.transform = `translate3d(${position.x}em, ${position.y}em, ${position.z}em)`;
            element.style.opacity = position.opacity.toString();
        });
        animationFrame = requestAnimationFrame(animate);
    };

    onMount(() => {
        setProjects(repos.map(repo => new Project(repo, logos[repo.name])));
        animationFrame = requestAnimationFrame(animate);


        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (selectedProject() && entry.isIntersecting) {
                        setAnimationClass("enter");
                    } else {
                        setAnimationClass("leave");
                    }
                });
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.66
            }
        );
        if (projectsWrapperRef) {
            observer.observe(projectsWrapperRef);
        }

        onCleanup(() => {
            cancelAnimationFrame(animationFrame);


            if (projectsWrapperRef) {
                observer.unobserve(projectsWrapperRef);
            }
        });
    });

    return (
        <div class={styles.container}>
            <h2 class={styles.projectH2}>MY PROJECTS</h2>
            {/* Currently Selected Project */}
            <Show when={selectedProject()}>
                <div class={`${styles.selectedProject} ${styles[animationClass()]}`} ref={selectedRef} onClick={async (e) => {
                        e.stopPropagation();
                        selectedRef.style.pointerEvents = "none";
                        setAnimationClass("leave");
                        setTimeout(() => {
                            if(animationClass() === "leave")
                                setSelectedProject(null);
                        }, 1000);
                    }}>
                    <div class={styles.selectedHead}>
                        <HoverLink active={true} href={selectedProject()!.repo.html_url} name={selectedProject()!.name} imageUrl={selectedProject()!.logo ?? "<svg/>"} />
                    </div>
                    <div class={styles.selectedBody}>
                        <div class={styles.language}>{selectedProject()?.repo.language}</div>
                        <div class={styles.description}>{selectedProject()?.repo.description}</div>
                    </div>
                </div>
            </Show>
            
            {/* All Projects */}
            <div class={styles.wrapper} ref={projectsWrapperRef}>
                <ul class={styles.projects}>
                    <For each={projects()}>{(project, idx) => {
                        if(project.repo.topics.includes("m-ue-d"))
                            return <li 
                                onMouseDown={(e) => {
                                    e.stopPropagation();
                                    setSelectedProject(project);
                                    selectedRef.style.pointerEvents = "auto";
                                    setTimeout(() => {
                                        setAnimationClass("enter");
                                    }, 100);
                                }} data-opacity={selectedProject()?.repo.name === project.repo.name && animationClass() != "leave" ? 0.005 : 1} >
                                    {project.logo?.startsWith("<") && <div class={styles.img} innerHTML={project?.logo}/>}
                                    {project.logo?.startsWith("https") && <img class={styles.logoContainer} src={project.logo}></img>}
                                    {project.logo?.includes('"message": "Not Found"') && <div class={styles.noImg}><div>{project.repo.name}</div></div>}
                                </li>
                            }}
                    </For>
                </ul>
            </div>
        </div>
    );
}
