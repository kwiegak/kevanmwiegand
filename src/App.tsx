import { Component } from 'react';
import { Routes, Route } from "react-router-dom";
import { Amplify } from 'aws-amplify';
import Header from './components/common/Header';
import Dallas from './components/dallas/Dallas';
import NewYork from './components/newyork/NewYork';
import RedHot from './components/redhotchilipeppers/RedHot';
import config from './amplifyconfiguration.json';
import './App.css';
import HomePage from './components/home/HomePage';
import Germany from './components/germany/Germany';
import Misc from './components/misc/Misc';

Amplify.configure(config);


class App extends Component {

  render() {
    return (
      <div className="App">
        <Header />
        <Routes>
          <Route path='/*' element={<NewYork />} />
          <Route path='/misc' element={<Misc />} />
          <Route path='/nyc' element={<NewYork />} />
          <Route path='/germany' element={<Germany />} />
          <Route path='/rhcp' element={<RedHot />} />
          <Route path="/dallas" element={<Dallas />} />
        </Routes>
      </div>
    );
  }
}

export default App;