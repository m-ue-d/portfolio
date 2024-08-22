import styles from "./HoverLink.module.scss";

export interface HoverLinkProps {
    href: string;
    name: string;
    imageUrl: string;
    active: boolean;
}

export default function HoverLink(props: HoverLinkProps) {

    return <div class={styles.container} data-show={props.active}>
        <a href={props.href}>{props.imageUrl.startsWith("/src/") && <img src={props.imageUrl} />}{props.imageUrl.startsWith("<svg") && <div class={styles.logoContainer} innerHTML={props.imageUrl} />}{props.name}</a>
    </div>
}