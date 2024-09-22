import { Component } from 'react';
import { Routes, Route } from "react-router-dom";
import { Amplify } from 'aws-amplify';
import Header from './components/common/Header';
import Dallas from './components/dallas/Dallas';
import config from './amplifyconfiguration.json';
import './App.css';
import RedHot from './components/redhotchilipeppers/RedHot';

Amplify.configure(config);


class App extends Component {

  render() {
    return (
      <div className="App">
         <Header/>
         <Routes>
           <Route path='*' element= {<RedHot/>} />
           <Route path="/dallas" element={<Dallas />} />
        </Routes>
      </div>
    );
  }
}

export default App;