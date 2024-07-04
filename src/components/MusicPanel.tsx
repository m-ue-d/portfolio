import styles from './MusicPanel.module.scss';

export default function MusicPanel(){
    return <div class={styles.container}>
        <h2>MY MUSIC</h2>
        <ul class={styles.songs}>
            {/* fetch songs from soundcloud */}
            <li><iframe width="35%" height="166" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1783453722&color=%23111b16&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/m-ue-d" title="m-ue-d" target="_blank" style="color: #cccccc; text-decoration: none;">m-ue-d</a> · <a href="https://soundcloud.com/m-ue-d/surrogate" title="Surrogate" target="_blank" style="color: #cccccc; text-decoration: none;">Surrogate</a></div></li>
            <li><iframe width="35%" height="166" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1783453722&color=%23111b16&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/m-ue-d" title="m-ue-d" target="_blank" style="color: #cccccc; text-decoration: none;">m-ue-d</a> · <a href="https://soundcloud.com/m-ue-d/surrogate" title="Surrogate" target="_blank" style="color: #cccccc; text-decoration: none;">Surrogate</a></div></li>
        </ul>   
    </div>;
}