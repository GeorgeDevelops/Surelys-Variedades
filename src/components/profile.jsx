
import React, {useEffect, useState} from 'react';
import { jwtDecoded } from '../services/jwtDecode';
import httpService from '../services/httpService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'

const Profile = (props) => {
    const [user, setUser] = useState('');
    const navigate = useNavigate();

    function deleteAccount(){
        const delet = window.confirm("Seguro que quieres eliminar tu cuenta?");
        if (delet) return alert("Esta accion no esta disponible por el momento.")
    }

    useEffect(()=>{
       try {
        const jwt = localStorage.getItem('token');

        if (jwt){
            const { _id } = jwtDecoded(jwt);
            const url = `${process.env.REACT_APP_URL}/users/${_id}`;
            const headers = { 'x-auth-token': jwt };
    
            async function getUser(){
            const { data } = await httpService.get(url, { headers });
            setUser(data);
            }
    
            getUser();
        }

       } catch (ex) {
           console.log("Algo ha salido mal : ", ex);
       }
    },[]);


    return ( <React.Fragment>
        <div id='profile'>
            <h2 className='profile'>Perfil</h2>

            <p>Nombre: <span>{ user.username }</span></p>
            <p>Correo: <span>{ user.email }</span></p>
            <p>Telefono: <span>{ user.phone }</span></p>

            {
                user.isAdmin && <button className="green" onClick={()=> navigate('/new/product')}>Nuevo producto</button>
            }

            {
                user.isAdmin && <button className="blue" onClick={()=> toast.info("Esta seccion no esta disponible.")}>Cambiar foto de portada</button>
            }
            <button className="yellow" onClick={()=> navigate('/orders')}>Pedidos</button>
            <button className="red" onClick={ deleteAccount }>Eliminar cuenta</button>
        </div>
    </React.Fragment> );
}
 
export default Profile;