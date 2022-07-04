import React from 'react';
import Bin from './../common/bin';

const Preview = (props) => {
    const { img, handleClick, alt, imgId } = props;
    return ( 
        <React.Fragment>
            <img src={img} alt={ alt } />
            <Bin handleClick={ () => handleClick(imgId) } />
        </React.Fragment>
     );
}
 
export default Preview;