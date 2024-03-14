import { FC } from 'react';
import 'bootstrap/dist/css/bootstrap.css'; 
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

interface HeaderProps {}

const Header: FC<HeaderProps> = () => (
        <Navbar bg="dark" data-bs-theme="dark">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="photos">Photos</Nav.Link>
          </Nav>
      </Navbar>
);

export default Header;
