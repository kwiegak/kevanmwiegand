import React, { FC, useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
// import styles from './Header.module.css';

interface HeaderProps {}
const initialFormState = { name: "", description: "", image: "" };
const Header: FC<HeaderProps> = () => (
    <nav>
      <NavLink to="/">
        Home
      </NavLink>
      {" | "}
      <NavLink to="/about">
        About
      </NavLink>
      {" | "}
      <NavLink to="/photos">
        Photos
      </NavLink>
    </nav>
);

export default Header;
