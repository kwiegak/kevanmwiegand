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
      <Image style={{ width: '25rem', height: '10rem' }} src="./images/3.jpg"/>
      </section>
      
    <div className="jumbotron">
        <h1 style={{ color: 'white' }}>Kevan Mathias Wiegand</h1>
        <p style={{ color: 'white' }}>Software Engineer, Author, and Musician.</p>
      </div>
      
    <CardGroup>
      <Card text='dark' bg={'light'} border={'dark'} onClick={() => window.open('https://www.linkedin.com/in/kevan-wiegand-0742b12ba/')}  style={{maxWidth: '320px', display: 'inline-block', textAlign: 'left', margin: '0.5rem', verticalAlign: 'top'}}>
       <Card.Img src="./images/linkedin.jpg" style={{ width: '2rem', height: '2rem' }}/>
        <Card.Body>
          <Card.Title>Linkedin</Card.Title>
        </Card.Body>
      </Card>

      <Card text='dark' bg={'light'} border={'dark'}  onClick={() => window.open('https://www.youtube.com/channel/UCpE3knGP4Fh9YFXpD49c8iw')} style={{maxWidth: '320px', display: 'inline-block', textAlign: 'left', margin: '0.5rem', verticalAlign: 'top'}}>
        <Card.Img src="./images/youtube.jpg"  style={{ width: '2rem', height: '2rem' }}/>
        <Card.Body>
          <Card.Title>YouTube</Card.Title>
        </Card.Body>
      </Card> 

      <Card text='dark' bg={'light'} border={'dark'} onClick={() => window.open('https://www.github.com/kwiegak')}  style={{maxWidth: '320px', display: 'inline-block', textAlign: 'left', margin: '0.5rem', verticalAlign: 'top'}}>
        
        <Card.Img src="./images/github.png"  style={{ width: '2rem', height: '2rem' }}/>
        <Card.Body>
          <Card.Title>GitHub</Card.Title>
        </Card.Body>
      </Card>
    </CardGroup> 
 
    </div>
   
     </div>
);

export default HomePage;
