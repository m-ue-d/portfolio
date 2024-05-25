import styles from './Homepage.module.scss';
import MusicPanel from '../components/MusicPanel';
import ProjectPanel from '../components/ProjectPanel';
import { A } from '@solidjs/router';
import logo from '../assets/logo.png';
import Footer from '../components/Footer';

export default function Homepage(){
    

    return <div class={styles.mainPage}>
        <div class={styles.animatedTitle}>
            <h1>MÜD</h1>
            <p>always excels himself</p>
        </div>
        
        <div class={styles.introduction}>
            <p>Software Engineer and Music Producer</p>
            <img src={logo} alt="My Logo" />
        </div>

        <div class={styles.gradient}>
            <ProjectPanel></ProjectPanel>
            <MusicPanel></MusicPanel>
            <A href="/friends">Friends</A>
        </div>
        <Footer></Footer>
    </div>
}