import React, { ChangeEvent, useEffect, useState } from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import HomePage from './components/home/HomePage';
import Header from './components/common/Header';
import Photos from './components/photos/Photos';
import { Amplify } from 'aws-amplify';
import config from './amplifyconfiguration.json';

Amplify.configure(config, {
  API: {
    GraphQL:  {
      headers: async () => ({
        'My-Custom-Header': 'my value'
      })
    }
  }
});

function App() {
  return (
    <div className="App">
        <Header/>
        <Routes>
          <Route path='*' element= {<HomePage/>} />
          <Route path="/photos" element={<Photos />} />
      </Routes>   
    </div>
  );
}

export default App;