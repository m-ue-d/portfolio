import styles from './Homepage.module.scss';
import MusicPanel from '../components/MusicPanel';
import ProjectPanel from '../components/ProjectPanel';
import logo from '../assets/logo.png';
import Footer from '../components/Footer';
import HoverLink from '../components/HoverLink';
import { createSignal, onCleanup, onMount } from 'solid-js';
import Github from "../assets/github-mark.svg";
import SoundCloud from "../assets/soundcloud-svgrepo-com.svg";

export default function Homepage(){
    const [showLinks, setShowLinks] = createSignal(false);
    let imgWrapperRef!: HTMLDivElement;

    onMount(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setShowLinks(true);
                    } else {
                        setShowLinks(false);
                    }
                });
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.66
            }
        );

        if (imgWrapperRef) {
            observer.observe(imgWrapperRef);
        }

        onCleanup(() => {
            if (imgWrapperRef) {
                observer.unobserve(imgWrapperRef);
            }
        });
    });

    return <div class={styles.mainPage}>
        <div class={styles.animatedTitle}>
            <h1>MÜD</h1>
            <p>always excels himself</p>
        </div>
        
        <div class={styles.introduction}>
            <p>Software Engineer and Music Producer</p>
            <div 
                class={styles.imgWrapper} 
                ref={imgWrapperRef}>
                <img draggable="false" src={logo} alt="My Logo" />
                <ul class={styles.hoverWrapper}>
                    <li><HoverLink imageUrl={Github} active={showLinks()} href="https://github.com/m-ue-d" name="github/m-ue-d"/></li>
                    <li><HoverLink imageUrl={SoundCloud} active={showLinks()} href="https://soundcloud.com/m-ue-d" name="soundcloud/m-ue-d"/></li>
                </ul>
            </div>
        </div>

        <div class={styles.gradient}>
            <ProjectPanel></ProjectPanel>
            <MusicPanel></MusicPanel>
        </div>
        <Footer></Footer>
    </div>
}
