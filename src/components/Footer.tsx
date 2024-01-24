import { FaGithub, FaLinkedin } from "react-icons/fa";
import { footerHeight } from "../constants";

export function Footer() {
    return (
        <footer
            className="flex justify-end items-center static bottom-0 bg-secondary p-[16px]"
            style={{
                height: footerHeight,
            }}
        >
            <a
                href="https://www.linkedin.com/in/elvis-hernandez-dev/"
                target="_blank"
                className="mr-[24px]"
            >
                <FaLinkedin className="scale-[2]" />
            </a>
            <a
                href="https://github.com/ElvisHernandez/HomeTrack-Assignment"
                target="_blank"
            >
                <FaGithub className="scale-[2]" />
            </a>
        </footer>
    );
}
