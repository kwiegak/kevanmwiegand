import { FC } from 'react';
import 'bootstrap/dist/css/bootstrap.css'; 
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styles from './Header.module.css';

interface HeaderProps {}

const Header: FC<HeaderProps> = () => (
  <Navbar bg="dark" data-bs-theme="dark" fixed='top'>
  <Nav className="me-auto">
          <Nav.Link href="/">New York City</Nav.Link>
          <Nav.Link href="/rhcp">Red Hot Chili Peppers</Nav.Link>
          <Nav.Link href="/dallas">Dallas</Nav.Link>
        </Nav>
    </Navbar>
);

export default Header;
