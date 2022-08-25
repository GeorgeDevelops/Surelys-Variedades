// Imports
import './App.css';
import './others.css';
import './responsive.css';
import './new.css';
import React, { useState, useEffect } from 'react';
import NavBar from './components/navbar';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faShoppingCart, faUpload, faUser, faSignOutAlt, faTrashAlt, faBars,
faChevronLeft, faChevronRight, faTrashCan, faAt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from 'react-router-dom';
import { jwtDecoded } from './services/jwtDecode';
import loginService from './services/loginService';
import cartService from './services/cartService';

// Context 
import currentUserContext from './context/AppContext';
import { cartContext } from './context/AppContext';

// Components
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

library.add( faAt, faPhone, faEnvelope, faTrashCan, faShoppingCart, faUpload, faUser, faSignOutAlt, faTrashAlt, faBars, faChevronLeft, faChevronRight );

function App() {

  const [user, setUser] = useState(null);
  const [count, setCount] = useState([]);

  async function getCurrentUser(customerId){
    const user = await loginService.getCurrentUser(customerId);
    setUser(user);
    setCount(user.data.cart);
  } 

  async function addToCart(product){
    const previous = [...count];
    setCount(prev => [...prev, product]);

   try {
    const response = await cartService.add(product);
    if (response.status && response.status === 200) return toast.success(response.data); 
   } catch (ex) {
    setCount(previous);
    return toast.error(ex.response.data);
   }
  }

  async function removeFromCart(e){
    const arrayOfItems = [...count];
    const newItems = arrayOfItems.filter(item => item._id !== e.target.id)
    setCount(newItems);

    try {
        const res = await cartService.delete(e.target.id);
        if (res.status === 200){ 
            return toast.success(res.data);}
    } catch (ex) {
        setCount(arrayOfItems);
        return toast.error(ex.response.data)
    }
}

  useEffect(() => {

  }, [])

  useEffect(() => {
    const isLogin = localStorage.getItem('isLogin');

      if (isLogin) {
      toast.success("Has iniciado sesión correctamente", {autoClose: 5000});
      localStorage.removeItem("isLogin");
    }
  }, []);

  useEffect(()=>{
    try {
      const jwt = localStorage.getItem('token'); 
    if(jwt){
      let decoded = jwtDecoded(jwt); 
      getCurrentUser(decoded._id);
    }

    } catch (ex) { console.log("ERROR --> " + ex)}

  }, []);

  return (
   <React.Fragment>
    <cartContext.Provider value={{ count: count.length, add: addToCart, remove: removeFromCart, items: count}}>
    <currentUserContext.Provider value={user}>

      <ToastContainer 
      autoClose={6000}
      pauseOnHover={false}
      />

      <NavBar />

      <main style={{ marginTop: '200px' }}>
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

    </currentUserContext.Provider>
    </cartContext.Provider>
   </React.Fragment>
  );
}

export default App;
