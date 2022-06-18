import React, { useState, useEffect } from 'react';
import OrderItem from './common/orderItem';
import httpService from '../services/httpService';
import { jwtDecoded } from '../services/jwtDecode';

const Orders = () => {
    const [sort, setSort] = useState("Todos");
    const [orders, setOrders] = useState([]);
    const [sorted, setSorted] = useState([]);
    const jwt = localStorage.getItem('token');
    const { _id } = jwtDecoded(jwt);
    const url = `${process.env.REACT_APP_URL}/users/${_id}`;
    const [onlyOnce, setOnlyOnce] = useState(null);

    async function handleChange({currentTarget: input}){
        setSort(input.value);
    }

    async function getOrders(){
        const { data } = await httpService.get(url);
        setOrders([...data.orders]);
        setSorted([...data.orders]);
        return data.orders;
    }

    async function getOrdersAdmin(){
        const { data } = await httpService.get(`${process.env.REACT_APP_URL}/orders/all`);
        setOrders([...data]);
        setSorted([...data]);
        return data;
    }

    async function callback(){
        console.log("callback was called")
        // const jwt = localStorage.getItem('token');
        // const { isAdmin } = jwtDecoded(jwt);

        // const { data } = await httpService.get(isAdmin ? `${process.env.REACT_APP_URL}/orders/all` : url);
        // console.log(data)
        // setOrders(data.orders);
        // return setSorted(data.orders);
        // setSort(sort);
        return window.location = '/orders';
    }

    useEffect(()=>{
        if(sort === "Todos") return setSorted(orders);

        let filtered = [];
        orders.forEach(o => {
            if(o.status === sort){
                filtered.push(o)
            }
        });
        return setSorted(filtered);
     },[sort, orders, sorted]);

    if (!onlyOnce) {
        console.log("onlyOnce was called");
        const jwt = localStorage.getItem('token');
        const { isAdmin } = jwtDecoded(jwt);
        if(jwt && !isAdmin){
            getOrders()
        } else if (jwt && isAdmin){
            getOrdersAdmin()
        }
        setOnlyOnce(true);
    }

    return ( 
    <React.Fragment>
        <div id='ordersHolder'>
            <h2>Pedidos -&nbsp; 
            <select onChange={ handleChange } name="sort" id="sort">
                <option value="Todos">Todos</option>
                <option value="Pendiente">Pendientes</option>
                <option value="En progreso">En progreso</option>
                <option value="Completado">Completados</option>
                <option value="Cancelado">Cancelados</option>
            </select> 
            </h2>

           <ul>
               {
                   orders.length < 1 ? <p className='noFound'>No hay pedidos existentes</p> : sorted.map(o => <OrderItem 
                    name={ o.customer }
                    id={o._id}
                    status={o.status}
                    key={o._id}
                    callback={callback}
                    date={o.date}
                   />)
               }
           </ul>
        </div>
    </React.Fragment> );
}
 
export default Orders;