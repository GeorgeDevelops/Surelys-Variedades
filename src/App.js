
import './App.css';
import './others.css';
import './responsive.css';
import React, { useState, useEffect } from 'react';
import NavBar from './components/navbar';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faShoppingCart, faUpload, faUser, faSignOutAlt, faTrashAlt, faBars,
faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from 'react-router-dom';
import { jwtDecoded } from './services/jwtDecode';

import Signup from './components/signup';
import Feed from './components/feed';
import Login from './components/login';
import Section from './components/section';
import ProductDetails from './components/productDetails';
import CartComponent from './components/cartPage';
import Orders from './components/orders';
import CreateProduct from './components/createProduct';
import OrderConfirmation from './components/orderConfirmation';
import Profile from './components/profile';
import Footer from './components/footer';
import Portal from './components/portal';

library.add( faShoppingCart, faUpload, faUser, faSignOutAlt, faTrashAlt, faBars, faChevronLeft, faChevronRight );

function App() {
  const [user, setUser] = useState(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const isLogin = localStorage.getItem('isLogin');

      if (isLogin) {
      toast.success("Has iniciado sesión correctamente", {autoClose: 5000});
      localStorage.removeItem("isLogin");
    }
  }, []);

  useEffect(()=>{
    try {
      const jwt = localStorage.getItem('token'); //

    if(jwt){
      let decoded = jwtDecoded(jwt);
      setUser(decoded);
    }

    } catch (ex) { console.log("ERROR --> " + ex)}

  }, []);

  return (
   <React.Fragment>
     <ToastContainer 
      autoClose={6000}
      pauseOnHover={false}
      />
      <NavBar
      count={count} 
      setCount={setCount}
      />
      <main>
      <Routes>
        <Route path="/" exact element={<Feed />} />
        <Route path="/home" exact element={<Feed />} />
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/:section" exact element={<Section />} />
        <Route path="/product-details/:productId" exact element={<ProductDetails user={user} count={count} setCount={setCount} />} />
        <Route path="/cart" exact element={<CartComponent setCount={setCount} count={count} />} />
        <Route path="/orders" exact element={<Orders />} />
        <Route path="/new/product" exact element={<CreateProduct />} />
        <Route path="/confirmation/:id" exact element={<OrderConfirmation />} />
        <Route path="/perfil" exact element={<Profile />} />
        <Route path="/portal" exact element={<Portal />} />
      </Routes>  
      </main>
      <Footer />
   </React.Fragment>
  );
}

export default App;
