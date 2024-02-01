import './App.css';
import { Routes, Route } from 'react-router-dom';
import Menu from './menu/Menu';
import Home from './home/Home';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
      </Routes>
    </>
  );
}

export default App;
