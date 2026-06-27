import { Routes, Route } from "react-router-dom";
import Header from './components/Header/Header';
import Home from './features/home/components/Home/Home';
import Gallery from './features/gallery/components/Gallery/Gallery';
import './App.css';
import Footer from "./components/Footer/Footer";

function App() {
  return (<div className="App"> <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/"
        element={<Home />}
      />
      <Route
        path="/:category"
        element={<Gallery />}
      />
    </Routes>
    <Footer/>
  </div>
  );
}

export default App;
