import { Component } from 'react';
import { Routes, Route } from "react-router-dom";
import { Amplify } from 'aws-amplify';
import Header from './components/common/Header';
import config from './amplifyconfiguration.json';
import './App.css';
import Gallery from './components/gallery/Gallery';

Amplify.configure(config);


class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Routes>
          <Route path="/:category" element={<Gallery />} />
          <Route path="/" element={<Gallery />} />
        </Routes>
      </div>
    );
  }
}

export default App;