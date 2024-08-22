import { createSignal, onCleanup, onMount } from 'solid-js';
import styles from './MusicPanel.module.scss';

interface Track {
    title: string;
    url: string;
    artist: string;
    artistUrl: string;
}

export function loadSoundCloudSdk(): Promise<void> {
    return new Promise((resolve, reject) => {
        if (document.querySelector('script[src="https://w.soundcloud.com/player/api.js"]')) {
            //SDK is already loaded
            resolve();
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://w.soundcloud.com/player/api.js';
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load SoundCloud SDK'));
        document.head.appendChild(script);
    });
}

export default function MusicPanel() {
    const [tracks, setTracks] = createSignal<Track[]>([]);
    const [isPaused, setIsPaused] = createSignal(false);

    onMount(async () => {
        await loadSoundCloudSdk();

        const fetchedTracks: Track[] = [
            {
                title: 'Surrogate',
                url: 'https://api.soundcloud.com/tracks/1783453722',
                artist: 'm-ue-d',
                artistUrl: 'https://soundcloud.com/m-ue-d',
            },
            //hardcode tracks because soundclouds API is doesnt take requests for API keys currently :skullemoji:
        ];
        setTracks([...fetchedTracks, ...fetchedTracks, ...fetchedTracks]);

        function initSoundCloudWidgets() {
            const iframes = document.querySelectorAll('iframe');
            iframes.forEach(iframe => {
                const widget = SC.Widget(iframe);
                widget.bind(SC.Widget.Events.PLAY, () => setIsPaused(true));
                widget.bind(SC.Widget.Events.PAUSE, () => setIsPaused(false));
            });
        }

        initSoundCloudWidgets();
    });

    return (
        <div class={styles.container}>
            <h2 class={styles.musicH2}>MY MUSIC</h2>
            <div class={styles.scroller}>
                <ul class={isPaused() ? `${styles.songs} ${styles.paused}` : styles.songs}>
                    {tracks().map((track) => (
                        <li>    
                            <iframe
                                allow="autoplay"
                                src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(track.url)}&color=%23111b16&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`}
                            />
                            <div class={styles.links}>
                                <a href={track.artistUrl} title={track.artist} target="_blank">
                                    {track.artist}
                                </a>
                                {' · '}
                                <a href={track.url} title={track.title} target="_blank">
                                    {track.title}
                                </a>
                            </div>
                        </li>
                    ))}
                </ul>
                <ul class={isPaused() ? `${styles.songs} ${styles.after} ${styles.paused}` : `${styles.songs} ${styles.after}`}>
                    {tracks().map((track) => (
                        <li>
                            <iframe
                                allow="autoplay"
                                src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(track.url)}&color=%23111b16&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`}
                            />
                            <div class={styles.links}>
                                <a href={track.artistUrl} title={track.artist} target="_blank">
                                    {track.artist}
                                </a>{' '}
                                ·{' '}
                                <a href={track.url} title={track.title} target="_blank">
                                    {track.title}
                                </a>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
