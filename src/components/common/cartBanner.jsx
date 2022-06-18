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
                <span id={productId._id} onClick={handleDelete} className='btn btn-danger'>X</span>
                <span className='badge bg-warning m-1 p-2'>{ size <= 650 && `${amount}` }{ size > 650 && `Cantidad: ${ amount }` }</span>
                <span className='badge bg-success m-1'> { size <= 650 && `RD$ ${price}` }{ size > 650 && `Precio: RD$ ${ price }` }</span>
            </div>
        </div>
    </React.Fragment> );
}
 
export default Banner;