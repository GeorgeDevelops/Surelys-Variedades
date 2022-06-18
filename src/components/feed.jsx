import React, { useEffect, useState} from "react";
import Slider from './slider';
import Card from "./common/cards";

const Feed = (props) => {
  const [size, setSize] = useState();

  function handleResize (){
    setSize(window.innerWidth);
  }
  
  const deviceWidth = window.innerWidth;

  useEffect(()=>{
    window.addEventListener('resize', handleResize);
  }, [deviceWidth]);

      const images = [
      { url: "https://firebasestorage.googleapis.com/v0/b/surelys-variedades-shop.appspot.com/o/images%2Fjeans-min.jpga5ada9e4-9578-44f0-80db-c621306ed738?alt=media&token=29e24ff0-7e65-4916-a687-ed24039c64a1"},
      { url: "https://firebasestorage.googleapis.com/v0/b/surelys-variedades-shop.appspot.com/o/images%2Fportal.jpgf2bc016d-3340-4d54-a33e-f807e453c42d?alt=media&token=fefa78a1-2dc4-48cb-89e5-8869532ba85c"}
    ]

  return (
    <React.Fragment>
        <Slider 
         slideWidth={'95%'}
         slideHeight={700}
         images={images}
         autoPlay={null}
         horizontal={85}
         vertical={310}
         showBullets={true}
         bulletsColor={"#b6488b"}
         objectFit={'cover'}
         />
      <div id="feed-banner">
        <p>
          El estilo es una expresión profundamente personal de quién eres, y
          cada vez que te vistes, afirmas una parte de ti misma.
        </p>
        <p>- Nina Garcia -</p>
      </div>
      <div id="cards-banner">
        <Card />
      </div>
    </React.Fragment>
  );
};

export default Feed;
