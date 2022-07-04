import React, {useState, useEffect}  from 'react';
import orderService from '../../services/orderService';
import { toast } from 'react-toastify';
import { getCurrentUser } from '../../services/loginService';
import { jwtDecoded } from '../../services/jwtDecode';

const OrderItem = (props) => {
    const { name, status, date,  id, callback} = props;
    const [user, setUser] = useState(null);
    const [admin, setAdmin] = useState(null);
    const [owner, setOwner] = useState(null);
    const [phone, setPhone] = useState(null);

    function style(status){
        if (status === "Pendiente") return "#8E44AD";
        if (status === "En progreso") return "#3498DB";
        if (status === "Cancelado") return "#E74C3C";
        if (status === "Completado") return "#28B463";
        return;
    }

    function renderCancel(status){
        if (status === "Pendiente") return "inline-block";
        if (status === "Cancelado") return "none";
        if (status === "Completado") return "none";
        return "inline-block";
    }

    function renderConfirm(status){
        if (status === "Pendiente") return "inline-block";
        if (status === "En progreso") return "none";
        if (status === "Cancelado") return "none";
        if (status === "Completado") return "none";
        return "none";
    }

    function renderComplete(status){
        if (status === "Pendiente") return "none";
        if (status === "Cancelado") return "none";
        if (status === "Completado") return "none";
        return "inline-block";
    }

    async function handleCancel({currentTarget: button}){
        try {
            const res = await orderService.update(name, id, button.value);
            if (res.status === 200){
                toast.success("Estado de pedido actualizado.");
            }
            callback();
        } catch (ex) {
            toast.error(ex.response.data);
        }
    }

    async function handleConfirm({currentTarget: button}){
        try {
            const res = await orderService.update(name, id, button.value);
            if (res.status === 200){
                toast.success("Estado de pedido actualizado.");
            }
            callback();
        } catch (ex) {
            toast.error(ex.response.data);
        }
    }

    async function handleComplete({currentTarget: button}){
        try {
            const res = await orderService.update(name, id, button.value);
            if (res.status === 200){
                toast.success("Estado de pedido actualizado.");
            }
            callback();
        } catch (ex) {
            toast.error(ex.response.data);
        }
    }

    async function getNowUser(id){
        const { data } = await getCurrentUser(id);
        setUser(data);
    }

    function getAdmin(){
        if(user.isAdmin) return setAdmin(true);
        return;
    }

    async function getOwner(){
        const { data } = await getCurrentUser(name);
        let user = data.username;
        return setOwner(user); 
    }

    async function getPhone(){
        const { data } = await getCurrentUser(name);
        let phone = data.phone;
        return setPhone(phone); 
    }

    useEffect(() => {
        if (user){
          getAdmin();
          getOwner();
          getPhone();
        } else {
          return null;
        }
      }, [user]);

    useEffect(() => {
        let token  = localStorage.getItem('token');
        if (token && !user){
            let { _id } = jwtDecoded(token);
            getNowUser(_id);
        }
    }, []);

    return ( <React.Fragment>
                <li style={{opacity: status === "Cancelado" ? 0.5 : 1}}>
                   <div className='info'>
                   { admin && <p>Cliente ID: <br/>{ owner }</p> }
                   <p>Telefono: <br/>{ phone }</p>
                   <p>Pedido ID: <br/>{ id }</p>
                   <p>Fecha: <br/>{ date }</p>
                   <p className='status'>estado de la orden: <br/><span style={{color: style(status)}}>{ status }</span></p>
                   </div>

                    {
                        admin && <div>
                        <button 
                        value="Cancelado"
                        style={{display: renderCancel(status)}}
                        onClick={handleCancel}
                        className='red'>Cancelar</button>
     
                        <button 
                        value="En progreso"
                        style={{display: renderConfirm(status)}}
                        onClick={handleConfirm}
                        className='blue'>Confirmar</button>
     
                        <button 
                        value="Completado"
                        style={{display: renderComplete(status)}}
                        onClick={handleComplete}
                        className='green'>Completar</button>
                        </div>
                    }
               </li>
    </React.Fragment> );
}
 
export default OrderItem;