import React from 'react';
import { useNavigate, useParams } from 'react-router-dom'

const OrderConfirmation = () => {
    const navigate = useNavigate();
    const params = useParams();

    function backToHome(){
        return navigate('/home');
    }

    return ( <React.Fragment>
        <div id='confirmation'>
        <div>
        <p className='confirmed'>Tu pedido ha sido enviado con exito.</p>
        <p className='thanks'>Gracias por preferirnos.<br/>
        Dentro de las próximas 24 a 48 horas serás contactado por whatsapp para la confirmación final y tramitar la entrega de su pedido
        <br />Numero de orden: {params.id}
        </p>
        <button onClick={ backToHome }>Volver</button>
        </div>
        </div>

    </React.Fragment> );
}
 
export default OrderConfirmation;