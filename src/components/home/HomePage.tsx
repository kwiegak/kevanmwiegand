import React, { FC, useState, useEffect  } from 'react';
import styles from './HomePage.module.css';
import 'bootstrap/dist/css/bootstrap.css'; 
import CardGroup from 'react-bootstrap/CardGroup';
import { Image } from "react-bootstrap";
import Card from 'react-bootstrap/Card';

interface HomePageProps { }

const HomePage: FC<HomePageProps> = (useState) => (
  <div>
    <div>
    <section className={styles.landingPageImage}>
      <Image style={{ width: '25rem', height: '10rem' }} src="./images/DSC02237.jpg"/>
    </section>
    <div className="jumbotron">
        <h1 style={{ color: 'white' }}>Kevan M. Wiegand</h1>
        <p style={{ color: 'white' }}>Software Engineer, Author, and Musician.</p>
          <Image src="./images/logo192.png" style={{ width: '2rem', height: '2rem'  }}/>
    </div>
    <CardGroup>
      <Card text='light' bg={'dark'} border={'primary'} onClick={() => window.open('https://www.linkedin.com/in/kevan-wiegand-0742b12ba/')}  style={{maxWidth: '320px', display: 'inline-block', textAlign: 'left', margin: '0.5rem', verticalAlign: 'top'}}>
       <Card.Img src="./images/linkedin.jpg" style={{ width: '2rem', height: '2rem' }}/>
        <Card.Body>
          <Card.Title>Linkedin</Card.Title>
          <Card.Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
              deserunt mollit anim id est laborum.
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">asd</small>
        </Card.Footer>
      </Card>

      <Card text='light' bg={'dark'} border={'primary'}  onClick={() => window.open('https://www.youtube.com/channel/UCpE3knGP4Fh9YFXpD49c8iw')} style={{maxWidth: '320px', display: 'inline-block', textAlign: 'left', margin: '0.5rem', verticalAlign: 'top'}}>
        <Card.Img src="./images/youtube.jpg"  style={{ width: '2rem', height: '2rem' }}/>
        <Card.Body>
          <Card.Title>YouTube</Card.Title>
          <Card.Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
              deserunt mollit anim id est laborum.
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">YouTube</small>
        </Card.Footer>
      </Card> 

      <Card text='light' bg={'dark'} border={'primary'} onClick={() => window.open('https://www.github.com/kwiegak')}  style={{maxWidth: '320px', display: 'inline-block', textAlign: 'left', margin: '0.5rem', verticalAlign: 'top'}}>
        
        <Card.Img src="./images/github.png"  style={{ width: '2rem', height: '2rem' }}/>
        <Card.Body>
          <Card.Title>GitHub</Card.Title>
          <Card.Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
              deserunt mollit anim id est laborum.
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">GitHub</small>
        </Card.Footer>
      </Card>
    </CardGroup> 
 
    </div>
   
     </div>
);

export default HomePage;
