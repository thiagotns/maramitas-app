import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';  

import { Routes, Route } from 'react-router-dom';
import Menu from './menu/Menu';
import Home from './home/Home';
import Layout from './common/Layout';

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
