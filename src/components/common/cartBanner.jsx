import React, {useEffect, useState} from 'react';

const Banner = (props) => {
    const { name, price, amount,  handleDelete, productId } = props;
    const [size, setSize] = useState(window.innerWidth);



    function handleResize (){
        setSize(window.innerWidth);
      }
  
      const deviceWidth = window.innerWidth;
  
      useEffect(()=>{
        window.addEventListener('resize', handleResize);
      }, [deviceWidth]);

    return ( 
    <React.Fragment>
        <div id='bannerCart'>
            <p className='productName'>{ name }</p>
            <div className='btns'>
                <span id={productId._id} onClick={handleDelete} className='btn btn-danger'>Quitar</span>
                <span className='badge bg-info'>{ `# ${ amount }` }</span>
                <span className='badge bg-success'> { `RD$ ${ price }` }</span>
            </div>
        </div>
    </React.Fragment> );
}
 
export default Banner;