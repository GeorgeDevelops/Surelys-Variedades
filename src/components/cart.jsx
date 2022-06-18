import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

const Cart = (props) => {
    const { count, setCount } = props;
    const navigate = useNavigate();

    function goToCart () {
        navigate('/cart');
    }

    useEffect(() => {
        window.onload = function(){
            let cart = localStorage.getItem("cart");
            if(cart){
                setCount(cart);
            }
        }

    }, []);

    return ( 
        <React.Fragment>
            <FontAwesomeIcon className='icon' onClick={ goToCart } icon="fa-solid fa-cart-shopping" />
            <span className='badge'>{ count }</span>
        </React.Fragment>
     );
}
 
export default Cart;