import './App.css';

import { Routes, Route } from 'react-router-dom';
import Menu from './menu/Menu';
import MenuForm from './menu/MenuForm';
import Home from './home/Home';
import Orders from './orders/Orders';
import Layout from './common/Layout';

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/menu/create" element={<MenuForm />} />
          <Route path="/menu/:id" element={<MenuForm />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
