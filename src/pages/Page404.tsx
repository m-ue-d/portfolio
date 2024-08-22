import { A } from '@solidjs/router';
import styles from './Page404.module.scss';

export default function Page404(){
    

    return <div class={styles.container}>
        <h1>𝄞 404 Page not found 𝄞</h1>
        <p>𝄢 You may return to 𝆱 <A href="/" class={styles.link}>Here & Now</A></p>
    </div>
}