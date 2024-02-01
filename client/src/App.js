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
        Hello
      </Layout>
    </>
  );
}

export default App;
