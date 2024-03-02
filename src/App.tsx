import React, { ChangeEvent, useEffect, useState } from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import HomePage from './components/home/HomePage';

function App() {
  return (
      <div className="App">
        <Routes>
          <Route index element={<HomePage />} />
        </Routes>
    </div>
  );
}

export default App;