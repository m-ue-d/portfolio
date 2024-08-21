import { A } from "@solidjs/router";
import styles from "./Footer.module.scss";

export default function Footer(){
    
    
    return <div class={styles.footer}>
        <div class={styles.copyright}>© Mild Fabian 2024</div>
        <A href="/friends" class={styles.friends}>My Friends</A>
    </div>
}