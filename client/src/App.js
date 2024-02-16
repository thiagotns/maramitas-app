import './App.css';

import { Routes, Route } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/pt-br';

import Menu from './components/Menu';
import MenuForm from './components/MenuForm';
import Home from './components/Home';
import Orders from './components/Orders';
import Layout from './components/common/Layout';
import Login from './components/Login';

function App() {
  return (
    <>
      <Layout>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/menu/create" element={<MenuForm />} />
              <Route path="/menu/:id" element={<MenuForm />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/login" element={<Login />} />
          </Routes>
        </LocalizationProvider>
      </Layout>
    </>
  );
}

export default App;
