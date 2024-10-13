import { FC } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import styles from './Header.module.css';

interface HeaderProps { }

const Header: FC<HeaderProps> = () => (
  <Navbar bg="dark" data-bs-theme="dark" fixed='top'>
    <Nav className="me-auto">
      <Nav.Link href="/kevanwiegand">Kevan Wiegand</Nav.Link>
      <NavDropdown title="Photo Collection" id="basic-nav-dropdown">
        <NavDropdown.Item href="/dallas">Dallas</NavDropdown.Item>
        <NavDropdown.Item href="/germany">Germany</NavDropdown.Item>
        <NavDropdown.Item href="/misc">Albany/Miscellaneous</NavDropdown.Item>
        <NavDropdown.Item href="/nyc">New York City</NavDropdown.Item>
        <NavDropdown.Item href="/rhcp">Red Hot Chili Peppers</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  </Navbar>
);

export default Header;
