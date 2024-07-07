import styles from './ProjectPanel.module.scss';
import HeastLogo from '../assets/logo.png';
import { Project } from '../model/project';
import { For, createSignal, onCleanup, onMount } from 'solid-js';

export default function ProjectPanel(){

    const [projects, setProjects] = createSignal([
        new Project("Heast Msg"),
        new Project("Squavy"),
        new Project("Test1"),
        new Project("Test2"),
        new Project("Test3"),
        new Project("Test4"),
        new Project("Test5"),
        new Project("Test6"),
        new Project("Test7"),
        new Project("Test8"),
        new Project("Test9"),
        new Project("Test10"),
    ]);

    const calculatePosition = (index: number, total: number, time: number) => {
        const angle = (index / total) * 2 * Math.PI + time / 100000;
        const radius = 30;
        const x = radius * Math.cos(angle) * 2;
        const y = radius * Math.sin(angle) * 0.4;
        const zMult = 5;
        const z = Math.sin(angle) * zMult;

        const maxZ = 2 * zMult;
        const minOpacity = 0.1;
        const maxOpacity = 1.0;
        const opacity = minOpacity + (maxOpacity - minOpacity) * ((z + zMult) / maxZ);
        return { x, y, z, opacity };
    };

    let inter = 0;

    onMount(() => {
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
        <ul class={styles.projects}>
            <For each={projects()}>{(project,idx) => {
                const position = calculatePosition(idx(), projects().length, Date.now());
                return <li style={{ opacity: position.opacity, 
                    transform: `translate3d(${position.x}rem, ${position.y}rem, ${position.z}rem)` }}>
                        <img src={HeastLogo} alt="Test with Heast logo"/>
                    </li>
                }}
            </For>
        </ul>
    </div>;
}