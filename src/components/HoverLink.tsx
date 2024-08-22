import styles from "./HoverLink.module.scss";

export interface HoverLinkProps {
    href: string;
    name: string;
    imageUrl: string;
    active: boolean;
}

export default function HoverLink(props: HoverLinkProps) {

    return <div class={styles.container} data-show={props.active}>
        <a href={props.href}>{props.imageUrl.startsWith("<") && <div class={styles.logoContainer} innerHTML={props.imageUrl} />}{props.imageUrl.startsWith("https") && <img class={styles.logoContainer} src={props.imageUrl}></img>}{props.name}</a>
    </div>
}