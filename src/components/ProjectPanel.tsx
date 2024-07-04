import styles from './ProjectPanel.module.scss';

export default function ProjectPanel(){
    return <div class={styles.container}>
        <h2>MY PROJECTS</h2>
        <ul class={styles.projects}>
            <li>Test1</li>
            <li>Test2</li>
            <li>Test3</li>
        </ul>
    </div>;
}