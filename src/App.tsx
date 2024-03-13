import React, { ChangeEvent, useEffect, useState } from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import HomePage from './Components/home/HomePage';
import About from './Components/about/About';
import Header from './Components/common/Header';
import Photos from './Components/photos/Photos';

function App() {
  return (
    <div className="App">
        <Header/>
        <Routes>
        <Route index element = {<HomePage/>}/>
        <Route path = "/about" element = {<About/>}/>
        <Route path="/photos" element={<Photos />} />
      </Routes>        
    </div>
  );
}

export default App;