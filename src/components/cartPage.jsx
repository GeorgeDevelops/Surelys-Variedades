
import React, { useState, useEffect, useContext } from 'react';
import Banner from './common/cartBanner';
import Input from './common/input';
import { useNavigate } from 'react-router-dom';
import loginService from '../services/loginService';
import { toast } from 'react-toastify';
import orderService from '../services/orderService';
import { jwtDecoded } from '../services/jwtDecode';
import { cartContext } from '../context/AppContext';

const CartComponent = (props) => {
    // Context 
    const cart = useContext(cartContext);

    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [terms, setTerms] = useState(null);
    const [user, setUser] = useState(null);
    const toastId = React.useRef(null);

    async function submitOrder(){
        toastId.current = toast.info("Enviando pedido..., Por favor espere.", {autoClose: false});
        if (!terms) return toast.update(toastId.current, 
            {render:"No puedes enviar pedido sin antes aceptar los terminos y condiciones.", 
        type: toast.TYPE.ERROR, autoClose: 3000});

        if (items.length < 1) return toast.update(toastId.current, 
            {render:"Agregue un articulo al carrito para someter orden.", 
        type: toast.TYPE.ERROR, autoClose: 3000});

        if (!user) return toast.update(toastId.current, 
            {render:"Debes iniciar seccion o registrarte para poder someter orden.", 
        type: toast.TYPE.ERROR, autoClose: 3000});


        const order = {
            customerId: user._id,
            product: items,
            phone: user.phone,
        }

        const res = await orderService.send(order);
        if (res.status === 200){
            toast.update(toastId.current, {render: res.data.message, type: toast.TYPE.SUCCESS, autoClose: 3000});

            localStorage.setItem('cart', 0);
            
            setTimeout(()=>{
                return navigate(`/confirmation/${res.data.id}`);
            }, 2000);
        }
    }

    function handleChange({currentTarget: input}){
        if(input.checked) return setTerms(true);
        return setTerms(null);
    }

    async function getUser(user){
        const { data } = await loginService.getCurrentUser(user);
        setUser(data);
    }

    useEffect(() => {
        setItems(cart.items)
    }, [cart]);

    useEffect(()=>{
        const token = localStorage.getItem('token');

        if (token){
            const { _id } = jwtDecoded(token);
            getUser(_id);
        }
    },[]);

    return ( 
        <React.Fragment>
            <div id='cartPageContainer'>
                <p className='carrito'>Carrito</p>

                <div id='cartScroll'>
                    {
                        items.length < 1 ? <p className='noFound'>No hay articulos en el carrito</p> :items.map(item => <Banner 
                            key={item._id} 
                            price={item.total} 
                            amount={item.amount} 
                            name={item.product.name}
                            productId={item}
                            />)
                    }
                </div>
            </div>
            <div id='cartOrder'>
                <h2 className='moreInfo'>Mas Informacion</h2><br/>

                <Input 
                type='text'
                name="cliente"
                label="- Nombre del cliente:"
                readOnly={true}
                value={ user ? user.username : "Guest"}
                classes="clientInfo"
                labelStyle="labelStyle"
                handleChange={handleChange}
                /><br />

                <Input 
                type='text'
                name="cliente"
                label="- Telefono del cliente:"
                readOnly={true}
                value={ user ? user.phone : '0000000000'}
                classes="clientInfo"
                labelStyle="labelStyle"
                handleChange={handleChange}
                />

                <div id='terms'>
                        <input className='terms' type="checkbox" onChange={handleChange} name="terms" />
                        <label className='termsLabel' htmlFor="terms">Acepto los terminos y condiciones. 
                        <a target={'_blank'} style={{ textDecoration: 'none' }} href="https://firebasestorage.googleapis.com/v0/b/surelys-variedades-shop.appspot.com/o/images%2Fterminos.pdf?alt=media&token=9bba7a71-2081-4d6e-9777-540fd280fa49">
                             Terminos & Condiciones</a></label>
                    <button onClick={ submitOrder } id='sendOrder'>Enviar pedido</button>
                </div>
            </div>
        </React.Fragment>
     );
}
 
export default CartComponent;