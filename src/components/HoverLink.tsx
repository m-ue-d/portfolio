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
        <a href={props.href}><img src={props.imageUrl} />{props.name}</a>
    </div>
}