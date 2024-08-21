import styles from './MusicPanel.module.scss';

export default function MusicPanel(){
    return <div class={styles.container}>
        <h2>MY MUSIC</h2>
        <ul class={styles.songs}>
            {/* fetch songs from soundcloud */}
            <li>
                <iframe allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1783453722&color=%23111b16&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"/>
                <div class={styles.links}>
                    <a href="https://soundcloud.com/m-ue-d" title="m-ue-d" target="_blank">m-ue-d</a> · <a href="https://soundcloud.com/m-ue-d/surrogate" title="Surrogate" target="_blank">Surrogate</a>
                </div>
            </li>
        </ul>   
    </div>;
}