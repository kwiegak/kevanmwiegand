import { FC } from 'react';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { photoCollections } from "../../config/photoCollections";
import { FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";
import styles from './Header.module.css';

interface HeaderProps { }

const Header: FC<HeaderProps> = () => (
  <Navbar bg="dark" data-bs-theme="dark" fixed="top" expand="lg" className={styles.navbar}>
    <div className="container-fluid">
      <Navbar.Brand as={Link} to="/" className={styles["navbar-brand"]}>My Photo Gallery</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        <Nav className="me-auto">
          <NavDropdown title="Photo Collection" id="basic-nav-dropdown">
            {photoCollections.map(c => (
              <NavDropdown.Item as={Link} to={`/${c.key}`} key={c.key}>
                {c.label}
              </NavDropdown.Item>
            ))}
          </NavDropdown>
          <NavDropdown title="@Kevan Wiegand" id="social-nav-dropdown">
            <NavDropdown.Item onClick={() => window.open('https://www.linkedin.com/in/kevan-wiegand-0742b12ba/')}>
              <FaLinkedin className="me-2" /> LinkedIn
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => window.open('https://www.youtube.com/channel/UCpE3knGP4Fh9YFXpD49c8iw')}>
              <FaYoutube className="me-2" /> YouTube
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => window.open('https://www.github.com/kwiegak')}>
              <FaGithub className="me-2" /> GitHub
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </div>
  </Navbar>
);

export default Header;
