import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { cartContext } from '../context/AppContext';

const Cart = (props) => {
    const navigate = useNavigate();
    const [cartCount, setCartCount] = useState(null);

    // Context 
    const cart = useContext(cartContext);

    function goToCart () {
        navigate('/cart');
    }

    useEffect(()=>{
        if (cart) {
            setCartCount(cart.count);
        }
    }, [cart]);

    return ( 
        <React.Fragment>
            <FontAwesomeIcon className='icon' onClick={ goToCart } icon="fa-solid fa-cart-shopping" />
            <span className='badge'>{ cartCount }</span>
        </React.Fragment>
     );
}
 
export default Cart;