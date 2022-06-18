import React, {useEffect, useState} from 'react';
import { jwtDecoded } from '../services/jwtDecode';

const Portal = () => {

    useEffect(() => {
        const jwt = localStorage.getItem('token');
        if (jwt){
            const { isAdmin } = jwtDecoded(jwt);
            if (!isAdmin){
                window.location = '/';
            }
        }
    }, []);

    return (<React.Fragment>
        <div>
        <h1 style={{ textAlign: 'center',
                     margin: '50px',
                     color: '#ccc'
                     }}>Esta seccion aun no esta disponible</h1>
        </div>
    </React.Fragment>);
}
 
export default Portal;