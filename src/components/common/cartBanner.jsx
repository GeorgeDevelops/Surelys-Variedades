import React, { useEffect, useState, useContext } from "react";
import { cartContext } from "../../context/AppContext";

const Banner = (props) => {
  //Context
  const cart = useContext(cartContext);

  const { name, price, amount, productId } = props;
  const [size, setSize] = useState(window.innerWidth);

  function handleResize() {
    setSize(window.innerWidth);
  }

  const deviceWidth = window.innerWidth;

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, [deviceWidth]);

  return (
    <React.Fragment>
      <div id="bannerCart">
        <p className="productName">{name}</p>
        <div className="btns">
          <span id={productId._id} onClick={cart.remove} className="btn remove">
            X
          </span>
          <span className="badge qty">{`Cantidad: ${amount}`}</span>
          <span className="badge success"> {`RD$ ${price}`}</span>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Banner;
