import React, { FC, useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { NavLink } from "react-router-dom";
import styles from './Header.module.css';
import 'bootstrap/dist/css/bootstrap.css'; 
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

interface HeaderProps {}
const initialFormState = { name: "", description: "", image: "" };
const Header: FC<HeaderProps> = () => (

  // <nav className="navbar-dark bg-dark">
  //   <NavLink to="/">Home</NavLink>{" | "}
  //   <NavLink to="/about">About</NavLink>{" | "}
  //   <NavLink to="/photos">Photos</NavLink>
  // </nav>

        <Navbar bg="dark" data-bs-theme="dark">
        {/* <Container> */}
          {/* <Navbar.Brand href="#home">Navbar</Navbar.Brand> */}
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="photos">Photos</Nav.Link>
          </Nav>
        {/* </Container> */}
      </Navbar>
);

export default Header;
