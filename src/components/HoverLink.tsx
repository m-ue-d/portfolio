import { Accessor, Show } from "solid-js";
import styles from "./HoverLink.module.scss";

export interface HoverLinkProps {
    href: string;
    name: string;
    imageUrl: string;
    active: Accessor<boolean>;
}

export default function HoverLink(props: HoverLinkProps) {

    return <div class={styles.container} data-show={props.active()}>
        <img src={props.imageUrl} />
        <a href={props.href}>{props.name}</a>
    </div>
}