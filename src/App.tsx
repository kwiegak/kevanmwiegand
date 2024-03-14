import React, { ChangeEvent, useEffect, useState } from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import HomePage from './components/home/HomePage';
import Header from './components/common/Header';
import Photos from './components/photos/Photos';

function App() {
  return (
    <div className="App">
        <Header/>
        <Routes>
        <Route index element = {<HomePage/>}/>
        <Route path="/photos" element={<Photos />} />
      </Routes>        
    </div>
  );
}

export default App;