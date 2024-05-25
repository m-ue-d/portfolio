import styles from './Friendpage.module.scss';
import MusicPanel from '../components/MusicPanel';
import { onMount } from 'solid-js';

export default function Friendpage(){
    
    onMount(()=> {
        console.log("HELLO FRIEND");
    });

    return <div class={styles.mainPage}>

        <div class={styles.gradient}>
            <h2>MY FRIENDS</h2>
            <a href="https://fabianhummel.dev" target='blank'>Fabian Hummel</a>
            <a href="https://konradsimlinger.dev" target='blank'>Konrad Simlinger</a>
        </div>
    </div>
}