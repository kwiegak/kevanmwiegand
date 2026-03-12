import { Routes, Route } from "react-router-dom";
import Header from './components/common/Header';
import './App.css';
import Gallery from './components/gallery/Gallery';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/:category?" element={<Gallery />} />
      </Routes>
    </div>
  );
}

export default App;