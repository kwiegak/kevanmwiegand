import React, { FC, useState, useEffect  } from 'react';
import styles from './HomePage.module.css';
import 'bootstrap/dist/css/bootstrap.css'; 
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { Image } from "react-bootstrap";

interface HomePageProps {}

const HomePage: FC<HomePageProps> = (useState) => (
  <div className={styles.HomePage}>
        <div className="jumbotron">
          <h1>Kevan M. Wiegand</h1>
          <p>Software Engineer, Author, and Musician.</p>
          <Image src="./images/logo512.png" rounded/>
        </div>
    <CardGroup>
      <Card>
       <Card.Img src="./images/logo512.png" style={{ width: '2rem', height: '2rem' }}/>
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text>
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
      </Card>
      <Card>
        <Card.Img src="./images/logo512.png"  style={{ width: '2rem', height: '2rem' }}/>
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text>
            This card has supporting text below as a natural lead-in to
            additional content.{' '}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
      </Card> 
      <Card>
        <Card.Img src="./images/logo512.png"  style={{ width: '2rem', height: '2rem' }}/>
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text>
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This card has even longer content than the
            first to show that equal height action.
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
      </Card>
    </CardGroup> 
  </div>
);

export default HomePage;
