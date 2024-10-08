import './App.css';

import './i18n/index.js'

import { Routes, Route } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/pt-br';

import Menu from './components/Menu';
import MenuForm from './components/MenuForm';
import Home from './components/Home';
import Orders from './components/Orders';
import OrdersForm from './components/OrdersForm';
import Layout from './components/common/Layout';
import Login from './components/Login';
import PrivateRoute from './components/common/PrivateRoute';
import Customer from './components/Customer';

function App() {

  return (
    <>
      <Layout>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
          <Routes>
              <Route path="/login" element={<Login />} />

              <Route element={<PrivateRoute />}>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/menu/create" element={<MenuForm />} />
                <Route path="/menu/:id" element={<MenuForm />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/orders/new" element={<OrdersForm />} />
                <Route path="/customers" element={<Customer />} />
              </Route>
              
          </Routes>
        </LocalizationProvider>
      </Layout>
    </>
  );
}

export default App;
