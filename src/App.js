import React, { useContext, useEffect, useState } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from './Component/navbar/navbar';
import Home from './Component/Pages/home';
import DetailProduct from './Component/Pages/detailProduct';
import AddProduct from './Component/Pages/addProduct';
import Profile from './Component/Pages/Profile'
import IncomeTransaction from './Component/Pages/income.js';
import ListProduct from './Component/Pages/listProduct';
import Cart from './Component/Pages/cart';
import ModalLogin from './Component/navbar/ModalLogin/ModalLogin';
import ModalRegister from './Component/navbar/ModalLogin/ModalRegister';
import { UserContext } from './Component/context/UserContext';
import { API, setAuthToken } from './config/api';
import { useQuery } from 'react-query';
import EditProduct from './Component/Pages/editProduct';

function App() {
  const [show, setShow] = useState(false);
  const [showRegis, setShowRegis] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseRegis = () => setShowRegis(false);
  const handleShowRegis = () => setShowRegis(true);

  const [state, dispatch] = useContext(UserContext)

  const { data: cartData, refetch } = useQuery("cartCache", async () => {
    try {
        const response = await API.get("/carts");
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
});

  
    useEffect(() => {

      if (localStorage.token) {
        setAuthToken(localStorage.token);
      }
  }, [state]);
  
  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth');
      let payload = response.data.data;
      payload.token = localStorage.token;
  
      dispatch({
        type: 'USER_SUCCESS',
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    checkUser();
  }, []);
  return (
      <Router>
        <Navbar handleShowRegis={handleShowRegis} handleShow={handleShow} cartData={cartData} />
        <ModalLogin show={show} handleClose={handleClose} handleShow={handleShow} handleShowRegis={handleShowRegis}/>
        <ModalRegister show={showRegis} handleClose={handleCloseRegis} handleShow={handleShow}/>
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/detail-product/:id' element={<DetailProduct length={refetch} />} />
          <Route exact path='/add-product' element={<AddProduct/>} />
          <Route exact path='/edit-product/:id' element={<EditProduct/>} />
          <Route exact path='/profile/:id' element={<Profile/>} />
          <Route exact path='/income' element={<IncomeTransaction/>} />
          <Route exact path='/list-product' element={<ListProduct/>} />
          <Route exact path='/cart' element={<Cart length={refetch}/>} />
        </Routes>
      </Router>
  );
}

export default App;
