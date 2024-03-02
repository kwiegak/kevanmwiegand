import React, { FC, useState, useEffect  } from 'react';
// import styles from './HomePage.module.css';

interface HomePageProps {}
const initialFormState = { name: "", description: "", image: "" };
const HomePage: FC<HomePageProps> = () => (
  <div>
    <div>
      <div className="jumbotron">
        <h1>Kevan M. Wiegand</h1>
        <p>Software Engineer, Author, and Musician.</p>
      </div>
    </div>
  </div>
);

export default HomePage;
