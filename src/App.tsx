import { Routes, Route } from "react-router-dom";
import Header from './components/Header/Header';
import './App.css';
import Gallery from './features/gallery/components/Gallery/Gallery';

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