import { FC, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { photoCollections } from "../../config/photoCollections";
import { FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";
import styles from './Header.module.css';

interface HeaderProps { }

const Header: FC<HeaderProps> = () => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const handleSelect = (path: string) => {
    navigate(path);
    setExpanded(false); // collapse the navbar
  };

  const handleExternalLink = (url: string) => {
    window.open(url, "_blank");
    setExpanded(false); // collapse the navbar after click
  };

  return (
    <Navbar
      bg="dark"
      data-bs-theme="dark"
      fixed="top"
      expand="lg"
      expanded={expanded}
      className={styles.navbar}
    >
      <div className="container-fluid">
        <Navbar.Brand
          as={Link}
          to="/"
          className={styles["navbar-brand"]}
          onClick={() => setExpanded(false)}
        >
          Photo Gallery
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="navbar-nav"
          onClick={() => setExpanded(expanded ? false : true)}
        />

        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Themes" id="basic-nav-dropdown">
              {photoCollections.map((c) => (
                <NavDropdown.Item
                  key={c.key}
                  onClick={() => handleSelect(`/${c.key}`)}
                >
                  {c.label}
                </NavDropdown.Item>
              ))}
            </NavDropdown>

            <NavDropdown title="Kevan Wiegand" id="social-nav-dropdown">
              <NavDropdown.Item onClick={() => handleExternalLink('https://www.linkedin.com/in/kevan-wiegand-0742b12ba/')}>
                <FaLinkedin className="me-2" /> LinkedIn
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleExternalLink('https://www.youtube.com/channel/UCpE3knGP4Fh9YFXpD49c8iw')}>
                <FaYoutube className="me-2" /> YouTube
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleExternalLink('https://www.github.com/kwiegak')}>
                <FaGithub className="me-2" /> GitHub
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default Header;
