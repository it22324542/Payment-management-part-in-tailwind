import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import CreatePayments from './pages/CreatePayments';
import DeletePayment from './pages/DeletePayment';
import EditPayment from './pages/EditPayment';
import ShowPayment from './pages/ShowPayment';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/payments/create' element={<CreatePayments/>} />
      <Route path='/payments/details/:id' element={<ShowPayment/>} />
      <Route path='/payments/edit/:id' element={<EditPayment/>} />
      <Route path='/payments/delete/:id' element={<DeletePayment/>} />
    </Routes>
  );
};

export default App;
