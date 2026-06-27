import { FC, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {
  FaGithub,
  FaYoutube,
  FaCamera
} from "react-icons/fa";

import { photoCollections } from "../../config/photoCollections";

import styles from "./Header.module.css";
import "bootstrap/dist/css/bootstrap.css";

const Header: FC = () => {

  const [expanded, setExpanded] = useState(false);

  const closeMenu = () => setExpanded(false);

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
          onClick={closeMenu}
          className={styles.brand}
        >

          <span className={styles.brandName}>
            Kevan Wiegand
          </span>

          <span className={styles.brandTagline}>
            Software Engineer • Photographer
          </span>

        </Navbar.Brand>



        <Navbar.Toggle
          aria-controls="navbar-nav"
          onClick={() => setExpanded(!expanded)}
        />

        <Navbar.Collapse id="navbar-nav">

          <Nav className="ms-auto align-items-lg-center">

            {photoCollections.map((collection) => (

              <NavLink
                key={collection.key}
                to={`/${collection.key}`}
                onClick={closeMenu}
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navLink} ${styles.navLinkActive}`
                    : styles.navLink
                }
              >
                <FaCamera className={styles.cameraIcon} />
                {collection.label}
              </NavLink>

            ))}

          </Nav>

        </Navbar.Collapse>

      </div>

    </Navbar>

  );

};

export default Header;