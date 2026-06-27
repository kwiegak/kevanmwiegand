import { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const Home: FC = () => {
    return (<div className={styles.home}>

  
        <section className={styles.hero}>

            <div className={styles.heroContent}>
                <h1>
                    Kevan Wiegand
                </h1>

                <h2>
                    Software Engineer • Photographer • Traveler
                </h2>

                <p>
                    Building software for nearly a decade while
                    exploring the world through photography.
                </p>

                <Link
                    to="/thailand"
                    className={styles.ctaButton}
                >
                    View Photography
                </Link>
            </div>

        </section>

        <section className={styles.section}>

            <h2>About Me</h2>

            <p>
                I'm a software engineer based in Texas with
                experience building enterprise applications,
                cloud-native solutions, APIs, and modern web
                applications.

                Outside of work I enjoy travel, photography,
                technology, and learning new things.
            </p>

        </section>

        <section className={styles.section}>

            <h2>Career Highlights</h2>

            <ul>
                <li>Nearly 10 years of software engineering experience</li>
                <li>Enterprise banking platforms</li>
                <li>Cloud modernization initiatives</li>
                <li>Full stack application development</li>
                <li>AWS and Kubernetes deployments</li>
            </ul>

        </section>
        
        <section className={styles.section}>

            <h2>Technologies</h2>

            <div className={styles.badges}>
                <span>Java</span>
                <span>Spring Boot</span>
                <span>React</span>
                <span>TypeScript</span>
                <span>AWS</span>
                <span>Docker</span>
                <span>Kubernetes</span>
                <span>SQL</span>
            </div>

        </section>
    </div>
    );


};

export default Home;
