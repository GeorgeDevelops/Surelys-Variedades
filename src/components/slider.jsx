import React, {useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Slider = (props) => {
   const {slideWidth, slideHeight, images,
    autoPlay, horizontal, vertical,
    showBullets, bulletsColor, bulletsBorderColor, topRelative,
    leftRelative, objectFit } = props;

   const [size, setSize] = useState(window.innerWidth);
   const [width, setWidth] = useState(window.innerWidth);
   const [currentIndex, setCurrentIndex] = useState(0);


   function handleResize(){
      setSize(window.innerWidth);
      setWidth(size - 200);
    }
  
    function nextArrow() {
      if (images.length === currentIndex + 1) {
        return setCurrentIndex(0);
      } else if (currentIndex < images.length){
        return setCurrentIndex(currentIndex + 1);
      }
    }

    function prevArrow() {
      if (currentIndex === 0){
        return setCurrentIndex(images.length - 1);
      } else if (currentIndex > 0){
        return setCurrentIndex(currentIndex - 1);
      }
    }

    function slideSlider(time){
      setInterval(()=>{
        console.log("autoplay")
        nextArrow();
      }, time);
    }

    function setBulletPositon(index){
      setCurrentIndex(index)
    }

    const deviceWidth = window.innerWidth;

    useEffect(()=>{
      window.addEventListener('resize', handleResize);
    }, [deviceWidth]);

    autoPlay && slideSlider(autoPlay);

    return ( 
        <React.Fragment>
          <div className="sliderContainer" style={{ width: slideWidth, height: slideHeight, top: topRelative,
          left: leftRelative  }}>
            <img 
            src={images[currentIndex || 0].url}
            alt=""
            id='slider'
            width={slideWidth} 
            height={slideHeight}
            style={{ objectFit: objectFit, display: 'flex'}}
             />
             <FontAwesomeIcon onClick={ prevArrow } style={{ left: horizontal, top: vertical }} className='arrow left' icon="fa-solid fa-chevron-left" />
             <FontAwesomeIcon onClick={ nextArrow } style={{ right: horizontal, top: vertical }} className='arrow right' icon="fa-solid fa-chevron-right" />
         
              {
                showBullets && <div id='bulletsContainer'>
                {
                  Array.from({ length: images.length }).map((item, index) => <div 
                  key={index} 
                  className={currentIndex === index ? "dot active" : "dot"}
                  onClick={ () => setBulletPositon(index) }
                  style={{backgroundColor: bulletsColor, borderColor: bulletsBorderColor}}></div> )
                }
              </div>
              }
          </div>
        </React.Fragment>
     );
}
 
export default Slider;