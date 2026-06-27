import { FC } from "react";
import { FaGithub, FaYoutube } from "react-icons/fa";

import styles from "./Footer.module.css";

const Footer: FC = () => {

    return (

        <footer className={styles.footer}>

            <div className={styles.container}>

                <div className={styles.left}>

                    <h3>
                        Kevan Wiegand
                    </h3>

                    <p>
                        Software Engineer • Photographer
                    </p>

                </div>

                <div className={styles.center}>

                    <p>
                        © {new Date().getFullYear()} Kevan Wiegand
                    </p>

                    <small>
                        Built with React, TypeScript & Bootstrap
                    </small>

                </div>

                <div className={styles.right}>

                    <a
                        href="https://github.com/kwiegak"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <FaGithub />
                    </a>

                    <a
                        href="https://www.youtube.com/channel/UCpE3knGP4Fh9YFXpD49c8iw"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <FaYoutube />
                    </a>

                </div>

            </div>

        </footer>

    );

};

export default Footer;