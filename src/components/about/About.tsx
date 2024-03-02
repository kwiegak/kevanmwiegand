import React, { FC, useState, useEffect  } from 'react';
// import styles from './About.module.css';

interface AboutProps {}
const initialFormState = { name: "", description: "", image: "" };
const About: FC<AboutProps> = () => (
  <div>
    <div>
      <div className="jumbotron">
        <h1>Kevan M. Wiegand</h1>
        <p>About me</p>
      </div>
    </div>
  </div>
);

export default About;
