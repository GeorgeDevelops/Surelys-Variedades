
import React, {useEffect, useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import currentUserContext from '../context/AppContext';

const Profile = (props) => {
    const [user, setUser] = useState('');
    const navigate = useNavigate();

    // Context 
    const currentUser = useContext(currentUserContext);

    function deleteAccount(){
        const delet = window.confirm("Seguro que quieres eliminar tu cuenta?");
        if (delet) return alert("Esta accion no esta disponible por el momento.");
        return;
    }

    useEffect(()=>{
        if (currentUser){
        const data = currentUser.data;
        setUser(data);
        }
    }, [currentUser]);

    return ( <React.Fragment>
        <div id='profile'>
            <h2 className='profile'>Perfil</h2>

            <p>Nombre  <FontAwesomeIcon icon="fa-solid fa-user" /> <span><br /></span> <span className='profile-info'>{ user.username }</span></p>
            <p>Correo  <FontAwesomeIcon icon="fa-solid fa-envelope" /> <span><br /></span> <span className='profile-info'>{ user.email }</span></p>
            <p>Telefono  <FontAwesomeIcon icon="fa-solid fa-phone" /> <span><br /></span> <span className='profile-info'>{ user.phone }</span></p>

            {
                user.isAdmin && <button className="green" onClick={() => navigate('/new/product')}>Nuevo producto</button>
            }

            {
                user.isAdmin && <button className="blue" onClick={() => navigate('/portal')}>Cambiar foto de portada</button>
            }
            <button className="yellow" onClick={()=> navigate('/orders')}>Pedidos</button>
            <button className="red" onClick={ deleteAccount }>Eliminar cuenta</button>
        </div>
    </React.Fragment> );
}
 
export default Profile;