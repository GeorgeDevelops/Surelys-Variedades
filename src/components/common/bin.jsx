import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Bin = (props) => {
    const { handleClick } = props;
    return ( 
        <FontAwesomeIcon onClick={ handleClick } id="bin" icon="fa-solid fa-trash-can" />
    );
}
 
export default Bin;