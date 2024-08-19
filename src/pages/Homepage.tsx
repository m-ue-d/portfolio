import styles from './Homepage.module.scss';
import MusicPanel from '../components/MusicPanel';
import ProjectPanel from '../components/ProjectPanel';
import { A } from '@solidjs/router';
import logo from '../assets/logo.png';
import Footer from '../components/Footer';
import HoverLink from '../components/HoverLink';
import { createSignal } from 'solid-js';
import Github from "../assets/github-mark.svg";
import SoundCloud from "../assets/soundcloud-svgrepo-com.svg";

export default function Homepage(){
    const [showLinks, setShowLinks] = createSignal(false);

    return <div class={styles.mainPage}>
        <div class={styles.animatedTitle}>
            <h1>MÜD</h1>
            <p>always excels himself</p>
        </div>
        
        <div class={styles.introduction}>
            <p>Software Engineer and Music Producer</p>
            <div class={styles.imgWrapper}>
                <img draggable="false" src={logo} alt="My Logo" 
                    // onMouseOver={(e) => {
                    //     e.stopPropagation();
                    //     setShowLinks(true);
                    // }} 
                    // onMouseLeave={(e) => {
                    //     e.stopPropagation();
                    //     setShowLinks(false);
                    // }}
                    onClick={(e) => {
                        e.stopPropagation();
                        if(showLinks()){
                            setShowLinks(false);
                            return;
                        }
                        setShowLinks(true);
                    }} />
                <ul class={styles.hoverWrapper}>
                    <li><HoverLink imageUrl={Github} active={showLinks} href="https://github.com/m-ue-d" name="github/m-ue-d"/></li>
                    <li><HoverLink imageUrl={SoundCloud} active={showLinks} href="https://soundcloud.com/m-ue-d" name="soundcloud/m-ue-d"/></li>
                </ul>
            </div>
        </div>

        <div class={styles.gradient}>
            <ProjectPanel></ProjectPanel>
            <MusicPanel></MusicPanel>
            <A href="/friends">Friends</A>
        </div>
        <Footer></Footer>
    </div>
}