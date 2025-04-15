import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import Home from './components/pages/Home/Home';
import Service from './components/pages/Service/Service'
import SignUp from './components/pages/SignUp/SignUp'
import SignIn from './components/pages/SignIn/SignIn'
import Cart from './components/pages/Cart/Cart'
import ListProducts from './components/pages/Catalog/ListProducts'
import Product from './components/pages/Product/ProductPage'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

export default () => (
  <Layout>
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path='/services' element={<Service />} />
      <Route exact path='/user/signup' element={<SignUp />} />
      <Route exact path='/user/signin' element={<SignIn />} />
      <Route exact path='/cart' element={<Cart />} />
      <Route exact path='/catalog/' element={<ListProducts />} />
      < Route exact path='/p' element={<Product />} />
    </Routes>
  </Layout>
);