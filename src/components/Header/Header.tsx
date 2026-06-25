import { FC, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaGithub, FaYoutube } from "react-icons/fa";
import { photoCollections } from "../../config/photoCollections";
import styles from './Header.module.css';
import 'bootstrap/dist/css/bootstrap.css';

const Header: FC = () => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

const closeMenu = () => setExpanded(false);

const handleSelect = (path: string) => {
    navigate(path);
    closeMenu();
};

const handleExternalLink = (url: string) => {
    window.open(url, "_blank");
    closeMenu();
};

return (
    <Navbar
        fixed="top"
        expand="lg"
        expanded={expanded}
        className={styles.navbar}
    >
        <div className="container-fluid">

      <Navbar.Brand
        as={Link}
        to="/"
        className={styles.brand}
        onClick={closeMenu}
      >
        <span className={styles.brandName}>
          Kevan Wiegand
        </span>

        <span className={styles.brandTagline}>
          Software Engineer • Photographer
        </span>
      </Navbar.Brand>
      <div className={styles.socialLinks}>
        <a
          href="https://github.com/kwiegak"
          target="_blank"
          rel="noreferrer"
          className={styles.iconLink}
        >
          <FaGithub />
        </a>

        <a
          href="https://www.youtube.com/channel/UCpE3knGP4Fh9YFXpD49c8iw"
          target="_blank"
          rel="noreferrer"
          className={styles.iconLink}
        >
          <FaYoutube />
        </a>
      </div>
            <Navbar.Toggle
                aria-controls="navbar-nav"
                onClick={() => setExpanded(!expanded)}
            />

            <Navbar.Collapse id="navbar-nav">
        <Nav className="ms-auto align-items-lg-center">
          {photoCollections.map((c) => (
            <Nav.Link
              key={c.key}
              onClick={() => handleSelect(`/${c.key}`)}
              className={styles.navLink}
            >
              {c.label}
            </Nav.Link>
          ))}
          
        </Nav>

            </Navbar.Collapse>

        </div>
    </Navbar>
);


};

export default Header;
